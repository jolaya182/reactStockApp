/**
 * title: CusipCard.jsx
 *
 * date: 1/7/2020
 *
 * author: javier olaya
 *
 * description: this component contains the stock prices and a card header
 */
import React from 'react';
import TopBar from './TopBar';
import BackButton from './BackButton';
import CusipCardHeader from './CusipCardHeader';
import CusipCardPriceData from './CusipCardPriceData';

/**
 *
 *
 * @export
 * @class CusipCard
 * @extends {React.Component}

 * @stock object
 * 
 */
export default class CusipCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {
        symbol: '',
        open: 0,
        close: 0,
        high: 0,
        low: 0,
        change: '',
        name: ''
      }
    };
  }

  componentDidMount() {
    const stock = this.convertToStock(sessionStorage.getItem('stock'));
    this.setState({ stock });
  }

  convertToStock = stk => {
    return JSON.parse(stk);
  };

  render() {
    const { stock } = this.state;
    const { symbol, open, close, change, high, low, name } = stock;

    return (
      <div>
        <TopBar>
          <BackButton />
        </TopBar>
        <div className="page">
          <div className="column tablePad">
            <CusipCardHeader symbol={symbol} name={name} />
            <CusipCardPriceData
              open={open}
              close={close}
              change={change}
              high={high}
              low={low}
            />
          </div>
        </div>
      </div>
    );
  }
}
