/**
 * title: StockHome.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component acts a container for all the stocks being retrieved
 * and rendering the home page with all stocks or one searched stock
 */
import React from 'react';
import TopBar from './TopBar';
import StockSearchform from './StockSearchform';
import StockTable from './StockTable';

/**
 *
 *
 * @export
 * @class StockHome
 * @extends {React.Component}
 *
 * @urlStock
 * @urlCusip
 * @searchText
 * @searchTextSubmission
 * @currPageNum
 * @rowColCoord
 * @stocks
 * @currStock
 * @stocksTotal
 * @pageSize
 * @firstDisplayStockNum
 * @endPoint
 * @startPoint
 * @paginationNumbers
 * @sortTypes
 */
export default class StockHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlStock: 'http://localhost:4000/stocks',
      urlCusip: 'http://localhost:4000/stocks/',
      searchText: '',
      searchTextSubmission: '',
      currPageNum: 1,
      rowColCoord: null,
      stocks: [],
      currStock: null,
      stocksTotal: 20,
      pageSize: 5,
      firstDisplayStockNum: 1,
      endPoint: 0,
      startPoint: 0,
      paginationNumbers: {},
      sortTypes: {
        'SORT ↑': { fn: (a, b) => a.symbol.localeCompare(b.symbol) },
        'SORT ↓': { fn: (a, b) => b.symbol.localeCompare(a.symbol) }
      }
    };
  }

  /**
   * find if there was a stored stock through sessionstorage
   * if so then rerender with that stock
   * if not than make a fetch request for a new batch of stocks
   *
   * @param
   * @returns
   */
  componentDidMount() {
    // find if there was a stored stock through sessionstorage
    // if so then rerender with that stock
    // if not than make a fetch request for a new batch of stocks
    const stocks = sessionStorage.getItem('stocks');

    if (stocks) {
      const currPageNum = sessionStorage.getItem('currPageNum');
      const paginationNumbers = sessionStorage.getItem('paginationNumbers');
      const startPoint = sessionStorage.getItem('startPoint');
      const endPoint = sessionStorage.getItem('endPoint');

      this.setState({
        stocks: this.convertToObjectArray(stocks),
        currPageNum: this.convertToNumber(currPageNum),
        paginationNumbers: this.convertStringToObject(paginationNumbers),
        startPoint: this.convertToNumber(startPoint),
        endPoint: this.convertToNumber(endPoint)
      });
      return;
    }
    const { urlStock } = this.state;
    this.fetchData(urlStock, this.fetchStocksCallback);
  }

  /**
   * store current clicked stock and currentPage number
   *
   * @param
   * @returns
   */
  componentDidUpdate() {
    const { currPageNum, currStock } = this.state;
    sessionStorage.setItem('currStock', currStock);
    sessionStorage.setItem('currPageNum', currPageNum);
  }

  /**
   * converts the stocks objects into a string and pushes it into an array
   * so that it is storable for the SesssionStorage variable
   *
   * @param array
   * @returns array
   */
  convertToStringArray = stocks => {
    return stocks.map((stock, index, ary) => {
      if (index < ary.length - 1) return `${JSON.stringify(stock)}*`;
      return `${JSON.stringify(stock)}*, `;
    });
  };

  /**
   * converts the objects into a string and returns
   *
   * @param object
   * @returns string
   */
  convertObjectToString = obj => {
    return `${JSON.stringify(obj)}*`;
  };

  /**
   * converts the string into a object and returns
   *
   * @param string
   * @returns object
   */
  convertStringToObject = objst => {
    const objAry = objst.split('*');
    return JSON.parse(objAry[0]);
  };

  /**
   * converts the stocks objects into a string and pushes it into an array
   * so that it is storable for the SesssionStorage variable
   *
   * @param string
   * @returns number
   */
  convertToNumber = stg => {
    return Number.parseInt(stg, 10);
  };

  /**
   * converts stringed object into an object and pushes it into an array
   * so that it is readable when passing the props
   *
   * @param string
   * @returns object
   */
  convertToObjectArray = st => {
    const stocks = st.split('*,');
    stocks.pop();
    const retArry = stocks.map(stock => {
      return JSON.parse(stock);
    });

    return retArry;
  };

  /**
   * Generic fetch method
   *
   * @param string
   * @returns array
   */
  fetchData = (url, callback) => {
    const options = {
      METHOD: 'GET'
    };
    fetch(url, options)
      .then(
        response => {
          return response.json();
        },
        err => this.errorHandler('server problem', err)
      )
      .then(
        json => {
          if (json.status >= 400 || json.status <= 499) {
            return this.errorHandler(
              'your request is giving the server problems',
              json.status
            );
          }
          if (json.status >= 500 || json.status <= 599) {
            return this.errorHandler(
              'server is having request problems',
              json.status
            );
          }
          return callback(json);
        },
        err => this.errorHandler('server could not help with my request', err)
      )
      .catch(err => this.errorHandler('request Failed due to', err));
  };

  /**
   * gets all of the stock attributes and calculates change and current price coordinate for
   * each stock
   *
   * @param array, string
   * @returns
   */
  processStocks = (stks, sText) => {
    const { stocks } = stks;
    const processedStocks = [];
    if (sText) {
      const searchText = sText.toUpperCase();
      const stockFound = stocks.find(stock => {
        return stock.name.startsWith(searchText) ? stock : false;
      });

      if (stockFound) {
        processedStocks.push({
          name: stockFound.name,
          symbol: stockFound.symbol,
          cusip: stockFound.cusip,
          isin: stockFound.isin,
          open: Number.parseFloat(stockFound.open).toFixed(0),
          close: Number.parseFloat(stockFound.close).toFixed(0),
          high: Number.parseFloat(stockFound.high).toFixed(0),
          low: Number.parseFloat(stockFound.low).toFixed(0),
          change: this.calculatePriceChange(stockFound.close, stockFound.open),
          dotPosition: this.calculateCurrPrice(
            stockFound.close,
            stockFound.high,
            stockFound.low
          )
        });
      }
      return processedStocks;
    }

    return stocks.map(stock => {
      const processedStock = {
        name: stock.name,
        symbol: stock.symbol,
        cusip: stock.cusip,
        isin: stock.isin,
        open: Number.parseFloat(stock.open).toFixed(0),
        close: Number.parseFloat(stock.close).toFixed(0),
        high: Number.parseFloat(stock.high).toFixed(0),
        low: Number.parseFloat(stock.low).toFixed(0),
        change: this.calculatePriceChange(stock.close, stock.open),
        dotPosition: this.calculateCurrPrice(stock.close, stock.high, stock.low)
      };
      return processedStock;
    });
  };

  /**
   *  the type of fetch call back that handles the retrieved stocks
   *
   * @param array
   * @returns
   */
  fetchStocksCallback = stocks => {
    const { searchText } = this.state;
    const processedStocks = this.processStocks(stocks, searchText);
    sessionStorage.setItem(
      'stocks',
      this.convertToStringArray(processedStocks)
    );
    const { startPoint, endPoint, len, currPageNum } = this.getEndpoints(
      processedStocks
    );
    const paginationNumbers = this.getPaginationNumbers(len, currPageNum);
    this.setState({
      currPageNum: 1,
      stocks: processedStocks,
      stocksTotal: processedStocks.total,
      startPoint,
      endPoint,
      paginationNumbers
    });
  };

  /**
   * displays error messages
   *
   * @param string,, string
   * @returns
   */
  errorHandler = (mess, err) => {
    console.log(mess, err);
  };

  /**
   * handles the form inputs on each keystroke
   *
   * @param event
   * @returns
   */
  typeHandler = e => {
    e.preventDefault();
    const { value } = e.target;
    const newText =
      typeof value === 'string' && value.length < 1 ? null : value;
    this.setState({ searchText: newText });
  };

  /**
   * handles the form submission
   *
   * @param event
   * @returns
   */
  searchSubmission = e => {
    e.preventDefault();
    const { searchText, urlStock } = this.state;
    this.setState({ searchTextSubmission: searchText });
    this.fetchData(urlStock, this.fetchStocksCallback);
  };

  /**
   *  sorts the stocks based on the symbol attribute
   *
   * @param event
   * @returns
   */
  sortSocks = e => {
    const sortValue = e.target.value;
    const { stocks } = this.state;
    const { sortTypes } = this.state;

    if (!sortTypes[sortValue]) return;

    const sortedStocks = stocks
      .sort(sortTypes[sortValue].fn)
      .map(stock => stock);

    const { startPoint, endPoint, numberOfPages } = this.getEndpoints(
      sortedStocks
    );
    const paginationNumbers = this.getPaginationNumbers(numberOfPages, 1);

    this.setState({
      stocks: sortedStocks,
      currPageNum: 1,
      startPoint,
      endPoint,
      paginationNumbers
    });
  };

  /**
   *  gets the type of sort action
   *
   * @param array
   * @returns
   */
  selectStock = stock => {
    sessionStorage.setItem('stock', JSON.stringify(stock));
    const {
      currPageNum,
      endPoint,
      startPoint,
      numberOfPages
    } = this.getEndpoints();
    const paginationNumbers = this.getPaginationNumbers(
      numberOfPages,
      currPageNum
    );
    sessionStorage.setItem('currPageNum', currPageNum);
    sessionStorage.setItem(
      'paginationNumbers',
      this.convertObjectToString(paginationNumbers)
    );
    sessionStorage.setItem('startPoint', startPoint);
    sessionStorage.setItem('endPoint', endPoint);
  };

  /**
   *  calculates the difference  between the close and open attribute
   *
   * @param number, number
   * @returns number
   */
  calculatePriceChange = (close, open) => {
    return (
      Number.parseFloat(close).toFixed(0) - Number.parseFloat(open.toFixed(0))
    );
  };

  /**
   * gets the reference as to where the currPrices should be displayed on y axis of the metric svg graph
   *
   * @param number,number,number
   * @returns number
   */
  calculateCurrPrice = (close, high, low) => {
    if (close < low) {
      return 0;
    }
    if (close >= high) {
      return 9;
    }

    const numDif = high - close;
    const difTotal = high - low;
    const result = Math.floor((numDif * 100) / difTotal);
    return result + 5;
  };

  /**
   * handler for when the user clicks on the left button of the pagination
   *
   * @param
   * @returns
   */
  paginateLeft = () => {
    const {
      currPageNum,
      endPoint,
      startPoint,
      groupedStocks,
      numberOfPages
    } = this.getEndpoints();
    const newCurrPage = currPageNum - 1;
    if (newCurrPage <= 0) return;

    const paginationNumbers = this.getPaginationNumbers(
      numberOfPages,
      newCurrPage
    );
    sessionStorage.setItem('currPageNum', newCurrPage);
    sessionStorage.setItem(
      'paginationNumbers',
      this.convertObjectToString(paginationNumbers)
    );
    sessionStorage.setItem('startPoint', startPoint);
    sessionStorage.setItem('endPoint', endPoint);

    this.setState({
      currPageNum: newCurrPage,
      endPoint: endPoint - groupedStocks,
      startPoint: startPoint - groupedStocks,
      paginationNumbers
    });
  };

  /**
   * handler for when the user clicks on the right button of the pagination
   *
   * @param
   * @returns
   */
  paginateRight = () => {
    const {
      currPageNum,
      endPoint,
      startPoint,
      numberOfPages,
      groupedStocks
    } = this.getEndpoints();
    const newCurrPage = currPageNum + 1;
    if (newCurrPage > numberOfPages) return;

    const paginationNumbers = this.getPaginationNumbers(
      numberOfPages,
      newCurrPage
    );
    sessionStorage.setItem('currPageNum', newCurrPage);
    sessionStorage.setItem('paginationNumbers', paginationNumbers);
    sessionStorage.setItem('startPoint', startPoint);
    sessionStorage.setItem('endPoint', endPoint);

    this.setState({
      currPageNum: newCurrPage,
      endPoint: endPoint + groupedStocks,
      startPoint: startPoint + groupedStocks,
      paginationNumbers
    });
  };

  /**
   *  calulates what numbers to display on the paination components
   *
   * @param array
   * @returns object
   */
  getEndpoints = stks => {
    const { stocks } = this.state;
    const Allstocks = stks || stocks;
    const { currPageNum, pageSize } = this.state;
    const len = Allstocks.length;
    const numberOfPages = Math.ceil(len / pageSize);
    const groupedStocks =
      pageSize >= len
        ? len / Math.ceil(len / pageSize)
        : len / Math.floor(len / pageSize);
    const endPoint = currPageNum * groupedStocks;
    const startPoint = endPoint - pageSize;

    return {
      endPoint,
      startPoint,
      currPageNum,
      numberOfPages,
      groupedStocks,
      len
    };
  };

  /**
   * determanines the left middle and end numbers that should display on the pagniation components
   *
   * @param number, number
   * @returns objects
   */
  getPaginationNumbers = (numberOfPages, currPageNum) => {
    switch (numberOfPages) {
      case 0:
        return { left: null, middle: null, right: null, currPageNum };
      case 1:
        return { left: 1, middle: null, right: null, currPageNum };
      case 2:
        return { left: 1, middle: 2, right: null, currPageNum };
      case 3:
        return { left: 1, middle: 2, right: 3, currPageNum };
      default:
    }
    if (currPageNum === 1) {
      return { left: 1, middle: 2, right: 3, currPageNum };
    }
    if (currPageNum === numberOfPages) {
      return {
        left: currPageNum - 2,
        middle: currPageNum - 1,
        right: currPageNum,
        currPageNum
      };
    }
    return {
      left: currPageNum - 1,
      middle: currPageNum,
      right: currPageNum + 1,
      currPageNum
    };
  };

  render() {
    const { stocks, endPoint, startPoint, paginationNumbers } = this.state;
    const {
      typeHandler,
      searchSubmission,
      sortSocks,
      calculateCurrPrice,
      selectStock,
      paginateLeft,
      paginateRight,
      currPageNum
    } = this;
    return (
      <div>
        <TopBar>
          <StockSearchform
            typeHandler={typeHandler}
            searchSubmission={searchSubmission}
          />
        </TopBar>
        <StockTable
          stocks={stocks}
          sortSocks={sortSocks}
          calculateCurrPrice={calculateCurrPrice}
          selectStock={selectStock}
          endPoint={endPoint}
          startPoint={startPoint}
          paginateLeft={paginateLeft}
          paginateRight={paginateRight}
          currPageNum={currPageNum}
          paginationNumbers={paginationNumbers}
        />
      </div>
    );
  }
}
