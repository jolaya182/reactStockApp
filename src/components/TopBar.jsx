/**
 * title: TopBar.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component handles
 */
import React from 'react';
import PropTypes from 'prop-types';

const TopBar = props => {
  const { children } = props;
  return <div className="topBar">{children}</div>;
};

TopBar.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node
};
TopBar.defualtProps = {
  children: null
};

export default TopBar;
