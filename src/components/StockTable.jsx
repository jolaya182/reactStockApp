/**
 * title: StockTable.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component handles all the stocks retrieved displays the stocks with a pagination component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import StockRow from './StockRow';
import MyPagination from './MyPagination';
import SelectAtr from './SelectAtr';

/**
 *
 *
 * @param {*} props
 * @returns element
 */
const StockTable = props => {
  const {
    stocks,
    sortSocks,
    selectStock,
    endPoint,
    startPoint,
    paginateLeft,
    paginateRight,
    currPageNum,
    paginationNumbers
  } = props;
  return (
    <div className="tablePad">
      <div className="page">
        <div className="row">
          <div className="column">
            <div className="stockRow">
              <div className="column">STOCKS</div>
              <div className=" sortButton">
                <SelectAtr sortSocks={sortSocks} />
              </div>
            </div>
            {stocks &&
              stocks.map((stock, index) => {
                return index >= startPoint && index < endPoint ? (
                  <Link
                    key={index}
                    style={{ textDecoration: 'none' }}
                    to={`/${stock.cusip}`}
                    onClick={() => selectStock(stock)}
                  >
                    <StockRow stock={stock} key={index} />
                  </Link>
                ) : null;
              })}
            <MyPagination
              paginationNumbers={paginationNumbers}
              paginateLeft={paginateLeft}
              paginateRight={paginateRight}
              currPageNum={currPageNum}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTable;

StockTable.propTypes = {
  stocks: Proptypes.arrayOf(Proptypes.object),
  sortSocks: Proptypes.func,
  selectStock: Proptypes.func,
  endPoint: Proptypes.number,
  startPoint: Proptypes.number,
  paginateLeft: Proptypes.func,
  paginateRight: Proptypes.func,
  currPageNum: Proptypes.func,
  paginationNumbers: Proptypes.objectOf(Proptypes.number)
};

StockTable.defaultProps = {
  stocks: null,
  sortSocks: null,
  selectStock: null,
  endPoint: null,
  startPoint: null,
  paginateLeft: null,
  paginateRight: null,
  currPageNum: null,
  paginationNumbers: null
};
