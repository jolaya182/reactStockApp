/**
 * title: StockSearchform.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component handles the search of the form intputs in order
 * to fetch information about that search stock
 */
import React from 'react';
import Proptypes from 'prop-types';

/**
 *
 *
 * @param {*} props
 * @returns element
 */
const StockSearchform = props => {
  const { typeHandler, searchSubmission } = props;
  return (
    <form className="" onSubmit={searchSubmission}>
      <input
        type="text"
        onChange={typeHandler}
        placeholder="SEARCH                       🔎"
      />
    </form>
  );
};

export default StockSearchform;

StockSearchform.propTypes = {
  typeHandler: Proptypes.func,
  searchSubmission: Proptypes.func
};

StockSearchform.defaultProps = {
  typeHandler: null,
  searchSubmission: null
};
