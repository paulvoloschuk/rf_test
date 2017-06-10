import React, {Component} from 'react';
import './style.css';

class Item extends Component {
  componentWillMount() {
    if (!!this.props.data.expires){
      this.counterUpdate();
      this.setState({counter: setInterval(this.counterUpdate.bind(this), 1000)});
    } else this.setState({expires: ''});
  }
  componentWillUnmount() {
    this.setState({counter: null});
  }
  counterUpdate() {
    this.setState({expires: (date => {
      let currentDate = Date.now(),
          expiresDate = new Date(date).getTime(),
          difference = Math.floor((expiresDate - currentDate) / 1000),  //in seconds
          time = {},
          days = 0;

        if (difference < 0) return 'expired';
        else {
          days = Math.floor(Math.floor(Math.floor(difference / 60) / 60) / 24);
          time.hours = Math.floor(Math.floor(difference / 60) / 60) % 24;
          time.minutes = Math.floor(difference / 60) % 60;
          time.seconds = difference % 60;

          return <span>{((days > 0) ? days + ' day(s) ' : '') +
                   Object.keys(time)
                      .map(item => (time[item].toString().length === 1) ? '0' + time[item] : time[item])
                      .join(':')}</span>;
        }

      })(this.props.data.expires)
    });
  }
  render() {
    let {...data} = this.props.data,
        greenChanel = Number(Math.floor((100 - data.discount) * 2.55)).toString(16).toUpperCase(),
        expired = (this.state.expires === 'expired'),
        color = expired ? 'lightgray' : '#FF' + greenChanel + '20',
        price = (
          <div className="item__row">
            <span className="item__newprice" style={{color: color}}>${data.price.new}</span>
            <span className="item__oldprice">${data.price.old}</span>
            <span className="item__from">{data.from}</span>
          </div>
        );
    return (
      <div className="item__margin">
        <a href={(expired) ? '' : data.url} className={`item ${expired && this.state.expires}`} style={{outlineColor: color}}>
          <div className="item__discount" style={{background: color}}>
            {data.discount}%<br /> off
          </div>
          <div className="item__image">
            <img src={data.src} alt="product image"/>
          </div>
          <div className="item__content">
            {!!this.props.index || price}
            <div className="item__row">
              <p className="item__description">{data.description}</p>
            </div>
            {!this.props.index || price}
            <div className="item__row">
              {data.options.map(item => <span>{item}</span>)}
              {this.state.expires}
            </div>
          </div>
        </a>
      </div>
    );
  }
}


export default Item;
