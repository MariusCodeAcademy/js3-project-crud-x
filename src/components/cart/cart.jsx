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

    // patikrinti ar cartItems.data yra tuscuas objektas
    // jei taip tai norim nenaujinti state
    if (Object.keys(cartItems).length !== 0) {
      console.log('cartItems.data', cartItems);
      console.log('total', this.calculateTotal(cartItems));
      this.setState({ currentCart: cartItems, cartTotal: this.calculateTotal(cartItems) });
    }
  }
  getUserIdFromSession() {
    const id = sessionStorage.getItem('loggedInUserId');
    return id ? id : console.error('no id in session');
  }

  updateQuantity = (itemId, newQty) => {
    console.log('updateQuantity');
    console.log(itemId, newQty);

    // iskviesti is cartItem el
    // sendUpdateQty('this.getUserIdFromSession()', 'itemId', 5);
    // aprasyti ja  requests.js kur iskonsolinam visas reiksmes

    // kreiptis per request.js funcija i backenda kuris turetu atnaujinti
    // kieki pagal paduotus parametrus
  };

  // suskaiciuoti cart total cart komponente
  calculateTotal(items) {
    // debugger;
    return items.reduce((acc, curr) => acc + curr.quantity * (curr.salePrice || curr.price), 0);
  }

  render() {
    return (
      <div>
        <div className="cartList mb-2 ">
          <CartList onQuantity={this.updateQuantity} cartItems={this.state.currentCart} />
        </div>
        <div className="d-flex">
          <div className="cart__instructions">
            <label htmlFor="instructions mb-1">Special instructions for seller</label>
            <br /> <br />
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
