/* eslint-disable no-console */
const Joi = require('@hapi/joi');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const fs = require('fs');
const path = require('path');
const util = require('util');
const _ = require('lodash');

const stockSchema = Joi.object({
  name: Joi.string()
    .required()
    .example('Apple Inc.'),
  symbol: Joi.string()
    .required()
    .example('AAPL'),
  cusip: Joi.string()
    .required()
    .example('369604103'),
  isin: Joi.string()
    .required()
    .example('US0378331005'),
  open: Joi.number()
    .required()
    .example(100),
  close: Joi.number()
    .required()
    .example(105),
  high: Joi.number()
    .required()
    .example(110),
  low: Joi.number()
    .required()
    .example(95),
}).label('Stock');

const init = async () => {
  const raw = await util.promisify(fs.readFile)(
    path.join(__dirname, 'data.json'),
  );
  const data = JSON.parse(raw);
  console.log('Loaded %d stocks', data.length);

  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Accept', 'Content-Type'],
      },
    },
  });

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Frontend Screening API',
        },
      },
    },
  ]);

  // create delay to simulate latency of accessing a real api
  server.ext('onRequest', async (request, h) => {
    if (request.path !== '/documentation') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return h.continue;
  });

  // log requests
  server.events.on('response', ({ method, path: pth, response }) => {
    console.log(`${method.toUpperCase()} ${pth} -> ${response.statusCode}`);
  });

  server.route({
    method: 'GET',
    path: '/status',
    options: {
      tags: ['api'],
      description: 'Get status',
      response: {
        status: {
          200: Joi.object({
            status: Joi.string().example('OK'),
          }).label('Status'),
        },
      },
    },
    handler: () => ({ status: 'OK' }),
  });
  server.route({
    method: 'GET',
    path: '/stocks',
    options: {
      tags: ['api'],
      description: 'List Stocks',
      notes:
        'Returns an array of stocks based on search, limit and skip inputs',
      validate: {
        query: Joi.object({
          limit: Joi.number()
            .integer()
            .min(1)
            .max(data.length)
            .default(20)
            .description('Limit the number of stocks in response'),
          skip: Joi.number()
            .integer()
            .min(0)
            .max(data.length - 1)
            .default(0)
            .description('Skip n number of stocks in response'),
          search: Joi.string()
            .min(3)
            .default('')
            .description(
              'Query by search string that trys to match name, symbol, CUSIP and/or ISIN',
            ),
          sort: Joi.string()
            .valid(
              'name',
              'symbol',
              'cusip',
              'isin',
              'open',
              'close',
              'high',
              'low',
              'change',
            )
            .default('name')
            .description('Parameter by which to sort by'),
          increasing: Joi.bool()
            .default(false)
            .description('Sort increasing'),
        }),
      },
      response: {
        status: {
          200: Joi.object({
            stocks: Joi.array()
              .items(stockSchema)
              .label('Stocks'),
            total: Joi.number().example(346),
          }).label('GetStocksResponse'),
        },
      },
    },
    handler: (request) => {
      const {
        limit, skip, search, sort, increasing,
      } = request.query;
      const filtered = search
        ? data.filter((s) => `${s.name}${s.symbol}${s.cusip}${s.isin}`
          .toLowerCase()
          .includes(search))
        : data;
      const sorted = sort === 'change'
        ? filtered.sort((a, b) => (a.close / a.open) - (b.close / b.open))
        : _.sortBy(filtered, (s) => {
          const prop = s[sort];
          return typeof prop === 'string'
            ? prop.toLowerCase()
            : prop;
        });
      const ordered = increasing ? sorted : sorted.reverse();
      return {
        stocks: ordered.slice(skip, skip + limit),
        total: ordered.length,
      };
    },
  });
  server.route({
    method: 'GET',
    path: '/stocks/{cusip}',
    options: {
      tags: ['api'],
      description: 'Get Stock',
      notes: 'Returns a single stock matching the given CUSIP',
      validate: {
        params: Joi.object({
          cusip: Joi.string().required(),
        }),
      },
      response: {
        status: {
          200: stockSchema,
        },
      },
    },
    handler: (request, h) => {
      const { cusip } = request.params;
      const stock = data.find((s) => s.cusip === request.params.cusip);
      if (!stock) {
        return h
          .response(`Stock with cusip "${cusip}" does not exist`)
          .code(404);
      }
      return stock;
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
