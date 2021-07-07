import css from './price.module.css';
const Price = (props) => {
  const { salePrice, children } = props;
  return (
    <p className="">
      <span className={salePrice ? css.salePrice : ''}>{salePrice}</span>{' '}
      <span className={salePrice ? css.price : ''}>{children}</span> eur
    </p>
  );
};

function formatPrice(price) {
  return price + ' eur';
}

export default Price;
