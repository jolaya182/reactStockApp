/**
 * title: Pagination.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component handles rendeing of the pagination and its actions.
 */
import React from 'react';
import { Pagination } from 'react-bootstrap';
import Proptypes from 'prop-types';

/**
 *
 *
 * @param {*} props
 * @returns element
 */
const MyPagination = props => {
  const { paginationNumbers, paginateLeft, paginateRight } = props;
  const { left, middle, right, currPageNum } = paginationNumbers;

  return (
    <Pagination className="paginationRow">
      <Pagination.Item onClick={paginateLeft}>{`<`}</Pagination.Item>
      {left && (
        <Pagination.Item className={currPageNum === left ? 'currPageNum' : ''}>
          {left}
        </Pagination.Item>
      )}

      {middle && (
        <Pagination.Item
          className={currPageNum === middle ? 'currPageNum' : ''}
        >
          {`${middle}`}
        </Pagination.Item>
      )}

      {right && (
        <Pagination.Item className={currPageNum === right ? 'currPageNum' : ''}>
          {right}
        </Pagination.Item>
      )}
      <Pagination.Item onClick={paginateRight}>{`>`}</Pagination.Item>
    </Pagination>
  );
};

export default MyPagination;

MyPagination.propTypes = {
  paginationNumbers: Proptypes.objectOf(Proptypes.number),
  paginateLeft: Proptypes.func,
  paginateRight: Proptypes.func,
  left: Proptypes.number,
  middle: Proptypes.number,
  right: Proptypes.number,
  currPageNum: Proptypes.number
};

MyPagination.defaultProps = {
  paginationNumbers: null,
  paginateLeft: null,
  paginateRight: null,
  left: null,
  middle: null,
  right: null,
  currPageNum: null
};
