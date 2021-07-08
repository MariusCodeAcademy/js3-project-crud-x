import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import HeaderX from './components/headerX';
import Home from './pages/home';
import Shop from './pages/shop';
import 'font-awesome/css/font-awesome.css';
import Footer from './components/footer';
import request from './utils/requests';

class App extends Component {
  state = {
    navLinks: [
      { to: '/', title: 'Home' },
      { to: '/shop', title: 'Shop' },
      { to: '/about', title: 'About' },
    ],
    shop: {
      shopCategories: [],
      items: [],
      socialLinksData: [
        { to: 'https://www.facebook.com', icon: 'fa fa-facebook', title: 'share' },
        { to: 'https://www.twitter.com', icon: 'fa fa-twitter', title: 'tweet' },
        { to: 'https://www.instagram.com', icon: 'fa fa-instagram', title: 'pin it' },
      ],
      cart: {
        randomId458: [
          {
            _id: 1,
            title: 'Green hat',
            price: 99.99,
            image: 'acc_hat_01_',
            color: 'green',
            size: 'normal',
            sku: 'hat_01',
            quantity: 1,
            // userId: 'links to user',
          },
          {
            _id: 2,
            title: 'Feather Slim Fit Denim Jeans',
            price: 1299.95,
            image: 'denim_01_',
            color: 'indigo',
            size: 'normal',
            sku: '01',
            quantity: 2,
          },
        ],
      },
      users: [
        {
          name: 'Bob Stone',
          email: 'stone@bob.com',
          password: 'pass',
        },
        // sukurti modeli User

        // sukurti route gauti visiems useriams

        // route gauti konkreciam user pagal id

        // route prideti nauja useri
      ],
    },
  };

  async componentDidMount() {
    console.log('app mounted');
    console.log('ar promisas ar data ', request.getCategories());
    const shopCopy = { ...this.state.shop };
    shopCopy.shopCategories = await request.getCategories();
    shopCopy.items = await request.getItems();
    this.setState({ shop: shopCopy });
  }
  render() {
    const { navLinks, shop } = this.state;
    return (
      <div className="App">
        <HeaderX navLinks={navLinks} />
        <div className="container">
          <Switch>
            {/* kai reikia perduoti props i route  mes tai darom su sekancia sintaxe */}
            <Route path="/shop" render={(props) => <Shop shop={shop} {...props} />} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
        <Footer navLinks={navLinks} />
      </div>
    );
  }
}

export default App;
