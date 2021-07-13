import { Link } from 'react-router-dom';
import Button from './common/button/button';
const Footer = (props) => {
  return (
    <footer className="container">
      <div className="hr"></div>
      <div className="foote-top d-flex space-between flex-column-upto-500">
        <div className="footer__links">
          <h4 className="footer__title">Links</h4>
          <nav>
            {props.navLinks.map(({ to, title }) => (
              <Link key={to} className="footer__nav-link d-block" to={to}>
                {title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer__cta">
          <h4 className="footer__title">Buy in the know</h4>
          <p>Promotions, new products and sales. Directly to your inbox</p>
          <div className="footer__input-group">
            <input type="text" placeholder="Your Email" />
            <Button size="medium">Subscibe</Button>
          </div>
        </div>
      </div>
      <div className="hr"></div>
      <div className="footer-bottom d-flex space-between flex-column-upto-500">
        <div className="footer__copy">Copyright © 2021, Simple. Powered by Shopify</div>
        <div className="footer__cards">Cards</div>
      </div>
    </footer>
  );
};

export default Footer;
