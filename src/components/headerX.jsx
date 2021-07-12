import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class HeaderX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: '',
    };
  }

  componentDidMount() {
    const isLoggedIn = sessionStorage.getItem('loggedInUserId');
    if (isLoggedIn) {
      this.setState({ loggedInUser: isLoggedIn });
    }
    // atvaizduoti prisijungusio vartotojo email
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('header x update');
  }

  render() {
    return (
      <header className="header mb-1">
        <div className="container d-flex space-between">
          <Link to="/" className="logo">
            JS3<strong>Shop</strong>X
          </Link>
          <nav className="main-nav">
            {this.props.navLinks.map((item) => (
              <Link key={item.title} className="nav-link-item" to={item.to}>
                {item.title}
              </Link>
            ))}
          </nav>
          {this.state.loggedInUser && (
            <div className="logged-in">Logged in: {this.state.loggedInUser}</div>
          )}
        </div>
      </header>
    );
  }
}

export default HeaderX;
