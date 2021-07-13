import ShopItem from './shopItem';
const YouMayAlsoLike = (props) => {
  return (
    <div className="you-may-like">
      <div className="hr"></div>
      <h3 className="title">You may also like</h3>
      <div className="d-flex you-may-like__container">
        {props.relatedItems.map((i) => (
          <ShopItem key={i._id} item={i} />
        ))}
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
