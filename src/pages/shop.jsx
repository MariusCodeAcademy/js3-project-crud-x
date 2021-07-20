import React, { Component } from 'react';
import ShopList from '../components/shopList';
import ShopSingleItem from '../components/shopSingleItem';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/common/socialLinks';
import Cart from '../components/cart/cart';
import { getUsers } from '../utils/requests';
import Button from '../components/common/button/button';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    const users = await getUsers();
    this.setState({ users: users });
  }

  // sukurti metoda kuris atspausdina kategorijos
  // pavadinima ant kurios paspausta
  selectCategory = (cat) => {
    console.log('you have selected ', cat);
  };

  render() {
    const { socialLinksData, shopCategories, items, cart } = this.props.shop;
    // get cartCount prop and display
    return (
      <div className="shop-page ">
        <div className="shop-search-cart d-flex space-between mb-1">
          <div className="shop-search">
            <i className="fa fa-search"></i>
            <input type="search" placeholder="Search" />
          </div>
          <Link to="/shop/cart" className="shop-cart">
            <i className="fa fa-shopping-cart"></i> Cart (
            {this.props.cartCount && this.props.cartCount})
          </Link>
        </div>
        <div className="hr"></div>
        <div className="d-flex aside-main-container">
          <aside className="categories-aside">
            <div className="categories">
              <ul>
                {shopCategories.map((item) => (
                  <li key={item._id} className="category-item">
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
            <SocialLinks socialLink={socialLinksData} />
            <div className="hr"></div>
            <div className="users">
              <h3 className="mb-2">Our Users</h3>
              <ul className="unstyled-list">
                {this.state.users.map(({ _id, name, email }) => (
                  <li key={_id}>
                    <p>
                      {name}, {email}
                    </p>
                    <Button onClick={() => this.props.onLogin(_id, email)} size="medium">
                      Login
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <main className="shop-items-part">
            <Route
              path="/shop/item/:id"
              render={(props) => (
                <ShopSingleItem
                  onCartCount={this.props.onCartCount}
                  socialLinksData={socialLinksData}
                  items={items}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/shop/cart"
              render={(props) => (
                <Cart onCartCount={this.props.onCartCount} cartItems={cart} {...props} />
              )}
            />
            <Route exact path="/shop" render={(props) => <ShopList items={items} {...props} />} />
          </main>
        </div>
      </div>
    );
  }
}

export default Shop;

// shop-item atvaizduoti 1 preke panasiai kaip yra pavyzdyje
