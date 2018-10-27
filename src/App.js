import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import MenuItem from './components/MenuItem';
import Order from './components/Order';
// import { menuData } from './data/menuData';

class App extends Component {
  state = {
    data: [],
    order: [],
    total: 0
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:4000')  // get res/data from Node server
    const { data } = await response.json()
    this.setState({ data })
  }

  handleUpdate = (name, price) => {
    const newItem = { name, price };
    this.setState(({ order, total }) => ({
      order: [...order, newItem],
      total: total + price
    }));
  };

  resetOrder = () => {
    this.setState({
      order: [],
      total: 0
    });
  };

  submitOrder = () => {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(
      `Welcome to emoji eats. You have ordered ${this.state.order.map(
        item => item.name
      )}. This come to a total of ${this.state.total} dollars`
    );
    synth.speak(utterThis);
  };

  render() {
    const { order, total, data } = this.state;
    return (
      <div className="App">
        <Header />
        <div className="menu">
          <div className="menuitems">
            {data.length > 0 && data.map((item, i) => (
              <MenuItem
                key={i} // keys required for react when iterating
                updateOrder={this.handleUpdate}
                emoji={item.emoji}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            ))}
          </div>
          <Order
            order={order}
            total={total}
            handleResetClick={this.resetOrder}
            handleSubmitClick={this.submitOrder}
          />
        </div>
      </div>
    );
  }
}

export default App;
