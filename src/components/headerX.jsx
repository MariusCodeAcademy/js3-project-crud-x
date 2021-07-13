import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './common/button/button';
class HeaderX extends Component {
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
          <button className="mobile-burger">
            <i className="mobile-burger__icon  fa fa-bars"></i>
          </button>
          {this.props.currentUser._id && (
            <div className="logged-in">Logged in: {this.props.currentUser.email}</div>
          )}
        </div>
      </header>
    );
  }
}

export default HeaderX;
