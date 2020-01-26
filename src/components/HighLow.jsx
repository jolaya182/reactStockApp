/**
 * title: HighLow.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component handles the display of sock hi, low and jsx element that shows a stock graphical metric
 */
import React from 'react';
import Proptypes from 'prop-types';

/**
 *
 *
 * @param {*} props
 * @returns element
 */
const HighLow = props => {
  const { high, low, children } = props;
  return (
    <div className="column">
      <div className="stockRow">
        <div className="column">
          <div className="stockRowSpaceAround">
            <div className="">{`${high}`}</div>
            <div className="">{`${low}`}</div>
          </div>
          {children && (
            <div className="stockRow ">
              <div className=" dataCellCenter">{children}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighLow;

HighLow.propTypes = {
  high: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  low: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  children: Proptypes.element
};

HighLow.defaultProps = {
  high: null,
  low: null,
  children: null
};
