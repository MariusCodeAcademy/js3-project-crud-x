const Price = (props) => {
  return (
    <p className="price">
      {props.children} eur sale price: {props.salePrice}
    </p>
  );
};

export default Price;
