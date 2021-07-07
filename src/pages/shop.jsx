import React, { Component } from 'react';
import ShopList from '../components/shopList';
import ShopSingleItem from '../components/shopSingleItem';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/common/socialLinks';
import Cart from '../components/cart/cart';
class Shop extends Component {
  render() {
    const { socialLinksData, shopCategories, items, cart } = this.props.shop;
    return (
      <div className="shop-page ">
        <div className="shop-search-cart d-flex space-between mb-1">
          <div className="shop-search">
            <i className="fa fa-search"></i>
            <input type="search" placeholder="Search" />
          </div>
          <Link to="/shop/cart" className="shop-cart">
            <i className="fa fa-shopping-cart"></i> Cart
          </Link>
        </div>
        <div className="hr"></div>
        <div className="d-flex">
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
          </aside>
          <main>
            <Route
              path="/shop/item/:id"
              render={(props) => (
                <ShopSingleItem
                  // item={items.find((i) => i._id === props.match.params.id)}
                  socialLinksData={socialLinksData}
                  items={items}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/shop/cart"
              render={(props) => <Cart cartItems={cart} {...props} />}
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
