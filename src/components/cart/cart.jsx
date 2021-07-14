import React, { Component } from 'react';
import Button from '../common/button/button';
import CartList from './cartList';
import { getCartItems } from '../../utils/requests';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: 0,
      currentCart: [],
    };
  }

  async componentDidMount() {
    // console.log('componentDidMount -- cartList');
    // get all cart items for current user
    const cartItems = await getCartItems(this.getUserIdFromSession());
    console.log('cartItems.data', cartItems.data);
    // patikrinti ar cartItems.data yra tuscuas objektas
    // jei taip tai norim nenaujinti state
    if (Object.keys(cartItems.data).length !== 0) {
      this.setState({ currentCart: cartItems.data });
    }
  }
  getUserIdFromSession() {
    const id = sessionStorage.getItem('loggedInUserId');
    return id ? id : console.error('no id in session');
  }

  render() {
    return (
      <div>
        <div className="cartList">
          <CartList cartItems={this.state.currentCart} />
        </div>
        <div className="d-flex">
          <div className="cart__instructions">
            <label htmlFor="instructions">Special instructions for seller</label>
            <br />
            <textarea name="" id="instructions" cols="30" rows="10"></textarea>
          </div>
          <div className="cart-info">
            <h4 className="cart__title">
              Subtotal <span>{this.state.cartTotal} eur</span>
            </h4>
            <i>Taxes and shipping calculated at checkout</i>
            <Button outline>Continue Shopping</Button>
            <br />
            <Button>Checkout</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
