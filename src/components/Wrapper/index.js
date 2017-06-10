import React, {PureComponent} from 'react';
import './style.css';

class Wrapper extends PureComponent {
  render() {

    return (
      <main className="wrapper">
        {this.props.children}
      </main>
    );
  }
}

export default Wrapper;
