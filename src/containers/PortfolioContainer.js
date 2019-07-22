import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.myStocks.map( (stock) => <Stock key={stock.id} ownership={true} stock={stock} sellStock={this.props.sellStock} />)}
      </div>
    );
  }

}

export default PortfolioContainer;
