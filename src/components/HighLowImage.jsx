/**
 * title: HighLowImage.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component handles
 */
import React from 'react';
import Proptypes from 'prop-types';
import CurrentPriceDot from './CurrentPriceDot';
import HighLow from './HighLow';

/**
 *
 *
 * @param {*} props
 * @returns element
 */
const HighLowImage = props => {
  const { high, low, dotPosition } = props;
  return (
    <HighLow className="column" high={high} low={low}>
      <CurrentPriceDot dotPosition={dotPosition} />
    </HighLow>
  );
};

export default HighLowImage;

HighLowImage.propTypes = {
  high: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  low: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  dotPosition: Proptypes.number
};

HighLowImage.defaultProps = {
  high: null,
  low: null,
  dotPosition: null
};
