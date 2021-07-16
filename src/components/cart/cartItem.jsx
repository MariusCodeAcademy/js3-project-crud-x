import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSingleItem } from '../../utils/requests';
import Button from '../common/button/button';

class CartItem extends Component {
  state = {
    qty: 0,
    image: '',
    total: null,
    maxItemInStock: null,
  };

  /** gauti individualu kiek itemu ir irasyti ji i maxItemInStock
   * @returns {Number} items left in stock
   */
  async getCurrentWarehouseStock() {
    // pasinaudoti getSingleItem funkcija ir gauti item kieki
    const shopItem = await getSingleItem(this.props.item.itemId);
    // console.log('shopItem', shopItem.quantity);
    return shopItem.quantity;
  }

  getTotal() {
    return this.state.qty * this.props.item.price;
  }

  /**
   * Do not alow to add to stock more than maxItemInStock + qty
   */
  fixMaxItemStock(newCartQuantity) {
    // debugger;
    const { qty: itemsInCart, maxItemInStock } = this.state;
    // what is total item qty
    const itemQtyCartAndWarehose = +itemsInCart + maxItemInStock;
    // if we try to set it to more return max
    if (newCartQuantity > itemQtyCartAndWarehose) {
      // jei bandom ivesti daugiau nei turim krepselyje ir liko sandelyje tai grazinam maximalu kieki
      return itemQtyCartAndWarehose;
    }
    return newCartQuantity;
  }

  handleQty = ({ target }) => {
    if (target.value < 0) return;
    this.setState({ qty: this.fixMaxItemStock(target.value) });

    // jei bandom ivesti didesne reiksme nei liko stocke(maxItemInStock) tai norim palikti
    //maximalia reiksme
    // ir pranesti su toasty kad pasiem max item limit

    // cia iskviesti updateQuantity ir paduoti id ir nauja value
    this.props.onQuantity(this.props.item._id, this.fixMaxItemStock(target.value));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.qty !== this.state.qty) {
      this.setState({ total: this.getTotal() });
    }
    // call fixMaxItemStock
  }

  componentDidMount() {
    // IFFE - imediately invoked function expresion
    (async () => {
      const warehouseQty = await this.getCurrentWarehouseStock();
      console.log({ warehouseQty });

      const { image, quantity } = this.props.item;
      // dynamic import
      // import(`../../static/shop/${image}1.jpg`).then((img) => {
      // import { getSingleItem } from '../../utils/requests';

      // });
      const imgImported = require(`../../static/shop/${image}1.jpg`).default;
      await this.setState({
        qty: quantity,
        image: imgImported,
        total: this.getTotal(),
        maxItemInStock: warehouseQty,
      });
    })();
  }
  render() {
    const { price, title, color, size, itemId } = this.props.item;
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
            <Button onClick={() => this.props.onDelete(itemId)} link>
              remove
            </Button>
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
          <h3 className="price-total">{this.state.total && +this.state.total.toFixed(2)} eur</h3>
        </div>
      </div>
    );
  }
}

export default CartItem;
