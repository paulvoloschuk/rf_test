import React, { Component } from 'react';
import './style.css';


class Filter extends Component {

  render() {

    return (
      <div className="filter wrapper">
        <input type="text" placeholder="filter..."/>
      </div>
    );
  }
}

export default Filter;
