/**
 * title: SelectAtr.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component handles the slection of the type of name sorting the user selects
 */
import React from 'react';
import Proptypes from 'prop-types';

/**
 *
 *
 * @param {*} props
 * @returns
 */
const SelectAtr = props => {
  const { sortSocks } = props;
  const StockAtr = ['SORT', 'SORT ↑', 'SORT ↓'];
  return (
    <select type="button" className="" onChange={sortSocks}>
      {StockAtr &&
        StockAtr.map((atr, indx) => <option key={indx}>{`${atr}`}</option>)}
    </select>
  );
};

export default SelectAtr;

SelectAtr.propTypes = {
  sortSocks: Proptypes.func
};

SelectAtr.defaultProps = {
  sortSocks: null
};
