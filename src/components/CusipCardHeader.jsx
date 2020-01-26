/**
 * title: CusipCardHeader.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component the display of the stock name
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
const CusipCardHeader = props => {
  const { symbol, name } = props;
  return (
    <div className="row">
      <div className="column">
        <div className="stockRowStart">
          <DataCell stockAtt="" stockAttData={symbol} />
        </div>
        <div className="stockRowStart">
          <DataCell stockAtt="" stockAttData={name} />
        </div>
      </div>
    </div>
  );
};

export default CusipCardHeader;
CusipCardHeader.propTypes = {
  symbol: Proptypes.string,
  name: Proptypes.string
};

CusipCardHeader.defaultProps = {
  symbol: null,
  name: null
};
