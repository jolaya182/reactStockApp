/**
 * title: StockRow.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component displays a single stock with its attributes
 */
import React from 'react';
import Proptypes from 'prop-types';
import DataCell from './DataCell';
import HighLowImage from './HighLowImage';

/**
 *
 *
 * @param {*} props
 * @returns element
 */
const StockRow = props => {
  const { stock } = props;
  const { symbol, open, close, change, dotPosition } = stock;
  return (
    <div className="stockRow stockRowBorder">
      <DataCell stockAtt="symbol" stockAttData={symbol} center />
      <DataCell stockAtt="open" stockAttData={open} center />
      <DataCell stockAtt="close" stockAttData={close} center />
      <DataCell stockAtt="change" stockAttData={change} center />
      <HighLowImage high="High" low="Low" dotPosition={dotPosition} />
    </div>
  );
};

export default StockRow;
// stock is obj of strings and numbers
// dotPosition is number

StockRow.propTypes = {
  dotPosition: Proptypes.number,
  stock: Proptypes.objectOf(
    Proptypes.oneOfType([Proptypes.string, Proptypes.number])
  ),
  symbol: Proptypes.string,
  open: Proptypes.number,
  close: Proptypes.number,
  change: Proptypes.number
};

StockRow.defaultProps = {
  dotPosition: null,
  stock: null,
  symbol: null,
  open: null,
  close: null,
  change: null
};
