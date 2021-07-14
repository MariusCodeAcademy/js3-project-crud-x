import React, { Component } from 'react';
import { getCartItems } from '../../utils/requests';
import CartItem from './cartItem';

class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCart: [],
    };
  }

  // perkelti currrentCart state i cart componenta

  // perkelti susijusias funckijas isisitkinti kad current cartas veikia cart componente

  // perduoti current cart i cartList kaip props

  // atvaizduoti cart items is gauto props

  // suskaiciuoti cart total cart komponente

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
        <div className="cart-columns d-flex">
          <h3 className="cart-col first">Product</h3>
          <h3 className="cart-col">Price</h3>
          <h3 className="cart-col">Quantity</h3>
          <h3 className="cart-col">Total</h3>
        </div>
        {this.state.currentCart.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    );
  }
}

export default CartList;
