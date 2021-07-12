import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderX from './components/headerX';
import Home from './pages/home';
import Shop from './pages/shop';
import 'font-awesome/css/font-awesome.css';
import Footer from './components/footer';
import { getCategories, getItems } from './utils/requests';
import Admin from './pages/admin';

class App extends Component {
  state = {
    currentUser: {},
    navLinks: [
      { to: '/', title: 'Home' },
      { to: '/shop', title: 'Shop' },
      { to: '/admin', title: 'Admin' },
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
    this.logInUserIfInSession();
    // console.log('ar promisas ar data ', request.getCategories());
    const shopCopy = { ...this.state.shop };
    shopCopy.shopCategories = await getCategories();
    shopCopy.items = await getItems();
    this.setState({ shop: shopCopy });
  }

  logInUserIfInSession() {
    // pasitikrinti ar yra user sessijoj, ir nustatyti  jei yra
    const currentUserInSession = sessionStorage.getItem('loggedInUserId');
    const currentUserInSessionEmail = sessionStorage.getItem('loggedInUserEmail');
    if (currentUserInSession) {
      this.setState({
        currentUser: { _id: currentUserInSession, email: currentUserInSessionEmail },
      });
    }
  }

  handleLogin = (userId, email) => {
    // autetifikuoti useri
    sessionStorage.setItem('loggedInUserId', userId);
    sessionStorage.setItem('loggedInUserEmail', email);
    this.setState({ currentUser: { _id: userId, email: email } });
  };

  render() {
    const { navLinks, shop, currentUser } = this.state;
    return (
      <div className="App">
        <ToastContainer />
        <HeaderX currentUser={currentUser} navLinks={navLinks} />
        <div className="container">
          <Switch>
            {/* kai reikia perduoti props i route  mes tai darom su sekancia sintaxe */}
            <Route
              path="/shop"
              render={(props) => <Shop onLogin={this.handleLogin} shop={shop} {...props} />}
            />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
        <Footer navLinks={navLinks} />
      </div>
    );
  }
}

export default App;
