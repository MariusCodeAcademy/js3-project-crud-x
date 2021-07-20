import React, { Component } from 'react';
import Button from '../common/button/button';
import CartList from './cartList';
import { getCartItems, sendUpdateQty, deleteItem } from '../../utils/requests';
import { toast } from 'react-toastify';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: 0,
      currentCart: [],
    };
  }

  removeItemFromCart = async (cartItemId) => {
    // console.log({ cartItemId });
    const deleteResult = await deleteItem(this.getUserIdFromSession(), cartItemId);
    console.log(deleteResult.cart);
    if (deleteResult.cart) {
      this.getCurrentCartItems();
      toast.error('Item removed from cart');
    }
  };

  async getCurrentCartItems() {
    // get all cart items for current user
    const cartItems = await getCartItems(this.getUserIdFromSession());
    // patikrinti ar cartItems.data yra tuscuas objektas
    // jei taip tai norim nenaujinti state
    if (Object.keys(cartItems).length !== 0) {
      // console.log('cartItems.data', cartItems);
      // console.log('total', this.calculateTotal(cartItems));
      this.setState({ currentCart: cartItems, cartTotal: this.calculateTotal(cartItems) });
    }
  }

  async componentDidMount() {
    this.getCurrentCartItems();
  }
  getUserIdFromSession() {
    const id = sessionStorage.getItem('loggedInUserId');
    return id ? id : console.error('no id in session');
  }

  updateQuantity = async (itemId, newQty) => {
    // iskviesti is cartItem el
    // aprasyti ja  requests.js kur iskonsolinam visas reiksmes
    // kreiptis per request.js funcija i backenda kuris turetu atnaujinti
    // kieki pagal paduotus parametrus
    const updateOk = await sendUpdateQty(this.getUserIdFromSession(), itemId, newQty);
    if (updateOk === true) {
      // atnaujinti itemus
      console.log('ruosiames antnaujinti itemus, nes panasu kad pasikeite kiekis');
      await this.getCurrentCartItems();
      return true;
    }
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
          <CartList
            onDelete={this.removeItemFromCart}
            onQuantity={this.updateQuantity}
            cartItems={this.state.currentCart}
          />
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
