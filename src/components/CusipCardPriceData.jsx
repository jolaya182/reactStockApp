/**
 * title: CusipCardPriceData.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component displays the stock attributes
 */
import React from 'react';
import Proptypes from 'prop-types';
import DataCell from './DataCell';

/**
 *
 *
 * @param {*} props
 * @returns element
 */
const CusipCardPriceData = props => {
  const { open, close, change, high, low } = props;
  return (
    <div>
      <div className="stockRowStart">
        <DataCell stockAtt="open" stockAttData={`$${open}`} />
        <DataCell stockAtt="close" stockAttData={`$${close}`} />
        <DataCell
          stockAtt="change"
          stockAttData={
            change > 0 ? `↑ ${Math.abs(change)}%` : `↓ ${Math.abs(change)}%`
          }
        />
      </div>
      <div className="stockRowStart">
        <DataCell stockAtt="high" stockAttData={`$${high}`} />
        <DataCell stockAtt="low" stockAttData={`$${low}`} />
        <DataCell stockAtt="" stockAttData="" />
      </div>
    </div>
  );
};

export default CusipCardPriceData;

CusipCardPriceData.propTypes = {
  open: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  close: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  change: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  high: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  low: Proptypes.oneOfType([Proptypes.string, Proptypes.number])
};

CusipCardPriceData.defaultProps = {
  open: null,
  close: null,
  change: null,
  high: null,
  low: null
};
