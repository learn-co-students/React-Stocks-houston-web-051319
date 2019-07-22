import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state={
    stocks: [],
    myStocks: [],
    sort: "",
    filter: "All"
  }

  render() {
    let desiredStocks=this.state.stocks
    if(this.state.sort === "Price"){
      desiredStocks.sort( (a,b) => b.price-a.price )
    }else if(this.state.sort === "Alphabetically"){
      desiredStocks.sort( (a,b) => a.name.toUpperCase()>b.name.toUpperCase() ? 1 : a.name.toUpperCase()<b.name.toUpperCase() ? -1 : 0 )
    }

    if(this.state.filter!=="All"){
      desiredStocks = desiredStocks.filter( (stock)=> stock.type===this.state.filter)
    }

    return (
      <div>
        <SearchBar sortType={this.state.sort} changeSort={this.changeSort} changeFilter={this.changeFilter} />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={desiredStocks} buyStock={this.buyStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer myStocks={this.state.myStocks} sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stocks => this.setState({ stocks }))
  }

  buyStock = (value) => {
    let myIDs = this.state.myStocks.map( (stock)=> stock.id )
    if(!myIDs.includes(value.id)){
      this.setState({ myStocks: [...this.state.myStocks, value] })
    }
  }

  sellStock = (value) => {
    this.setState({ myStocks: this.state.myStocks.filter((stock)=> stock.id !== value.id) })
  }

  changeSort = (value) => this.setState({ sort: value})

  changeFilter = (value) => this.setState({ filter: value })

}

export default MainContainer;
