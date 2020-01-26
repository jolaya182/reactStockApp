/**
 * title: DataCell.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component holds stock attribute and type of attribute and if needs to be centered
 */
import React from 'react';
import Proptypes from 'prop-types';

/**
 *
 *
 * @param {*} props
 * @returns element
 */
const DataCell = props => {
  const { stockAtt, stockAttData, center } = props;
  const justification = center ? 'stockRow' : 'row';
  return (
    <div className="column">
      <div className="row">
        <div className="column">
          <div className={justification}>{`${stockAtt}`}</div>
          <div className={justification}>{`${stockAttData}`}</div>
        </div>
      </div>
    </div>
  );
};

DataCell.propTypes = {
  stockAtt: Proptypes.string,
  stockAttData: Proptypes.oneOfType([Proptypes.number, Proptypes.string]),
  center: Proptypes.number
};

DataCell.defaultProps = {
  stockAtt: null,
  stockAttData: null,
  center: null
};

export default DataCell;

DataCell.propTypes = {
  stockAtt: Proptypes.string,
  stockAttData: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  center: Proptypes.bool
};

DataCell.defaultProps = {
  stockAtt: null,
  stockAttData: null,
  center: null
};
