import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      menuHeight: '0px',
    };
    // sukuriam nuoroda i el pan kaip su getElbyId
    this.mainNavRef = React.createRef();
  }

  // padaryti kad paspaudus nat burgerio iskvvieciam funkcija kuri kazka islogina
  toggleBurger = () => {
    // vietoj logini funkcija keicia showNav savybe i priesinga
    const currentStateNav = this.state.showNav;
    this.setState({
      showNav: !currentStateNav,
      menuHeight: !this.state.showNav ? this.mainNavRef.current.scrollHeight : 0,
    });
  };

  // kai showNav === true mes prideam open clase prie main-nav

  render() {
    return (
      <header className="header mb-1">
        <div className="container d-flex space-between">
          <Link to="/" className="logo">
            JS3<strong>Shop</strong>X
          </Link>
          <nav
            style={{ maxHeight: this.state.menuHeight }}
            ref={this.mainNavRef}
            className={`main-nav ${this.state.showNav ? 'open' : ''} `}
          >
            {this.props.navLinks.map((item) => (
              <Link key={item.title} className="nav-link-item" to={item.to}>
                {item.title}
              </Link>
            ))}
          </nav>
          <button onClick={this.toggleBurger} className="mobile-burger">
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
