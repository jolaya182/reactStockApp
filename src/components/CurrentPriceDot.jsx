/**
 * title: CurrentPriceDot.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component holds the svg dipicting the current price
 */
import React from 'react';
import Proptypes from 'prop-types';

/**
 * CurrentPriceDot the circle on the x and y axis of the svg shape
 *
 * @param {*} props
 * @returns element
 */
const CurrentPriceDot = props => {
  const { dotPosition } = props;
  return (
    <svg height="25" width="110">
      <circle cx={dotPosition} cy={12.5} r={5} fill="black" />
      <line x1="0" y1="12.5" x2="110" y2="12.5" stroke="black" />
    </svg>
  );
};

export default CurrentPriceDot;
CurrentPriceDot.propTypes = {
  dotPosition: Proptypes.number
};

CurrentPriceDot.defaultProps = {
  dotPosition: null
};
