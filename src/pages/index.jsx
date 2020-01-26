/**
 * title: index.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component handles
 */
import React from 'react';
import StockHome from '../components/StockHome';
import CusipCard from '../components/CusipCard';

export const Home = () => {
  return <StockHome />;
};

export const CusipCardComp = () => {
  return <CusipCard />;
};
