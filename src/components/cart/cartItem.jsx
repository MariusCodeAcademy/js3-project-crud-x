import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/button/button';

class CartItem extends Component {
  state = {
    qty: 1,
    image: '',
    total: 0,
  };

  getTotal() {
    return this.state.qty * this.props.item.price;
  }

  handleQty = ({ target }) => {
    target.value >= 0 && this.setState({ qty: target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.qty !== this.state.qty) {
      this.setState({ total: this.getTotal() });
    }
  }

  componentDidMount() {
    const { image, quantity } = this.props.item;
    // dynamic import
    // import(`../../static/shop/${image}1.jpg`).then((img) => {
    //   console.log(img.default);
    // });
    const imgImported = require(`../../static/shop/${image}1.jpg`).default;
    this.setState({ qty: quantity, image: imgImported, total: this.getTotal() });
  }
  render() {
    const { price, title, color, size } = this.props.item;
    return (
      <div className="cart-item d-flex">
        <div className="item-preview d-flex cart-col first">
          <Link to="/">
            <img src={this.state.image} alt="sdsds" />
          </Link>
          <div className="order-item-info">
            <Link to="/">
              <h4>{title}</h4>
            </Link>
            <p>
              {color} / {size}
            </p>
            <Button link>remove</Button>
          </div>
        </div>
        <div className="cart-col">
          <h3 className="d-upto-800">Price</h3>
          <h3 className="price">{+price.toFixed(2)} eur</h3>
        </div>
        <div className="cart-col">
          <h3 className="d-upto-800">Quantity</h3>
          <input
            min="0"
            className="cart-qty"
            type="number"
            value={this.state.qty}
            onChange={this.handleQty}
          />
        </div>
        <div className="cart-col">
          <h3 className="d-upto-800">Total</h3>
          <h3 className="price-total">{+this.state.total.toFixed(2)} eur</h3>
        </div>
      </div>
    );
  }
}

export default CartItem;
