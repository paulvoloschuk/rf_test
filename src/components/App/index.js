import React, { Component } from 'react';
import './style.css';

import initialState from '../../state';
import Wrapper from '../Wrapper/';
import Header from '../Header/';
import Item from '../Item/';

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  render() {
    let items = this.state.items
      .sort((a, b) => b.discount - a.discount)
      .map((item, index) => <Item key={index} data={item} index={index} />);
    return (
      <div className="app">
        <Header />
        <Wrapper>
          {items}
        </Wrapper>
      </div>
    );
  }
}

export default App;
