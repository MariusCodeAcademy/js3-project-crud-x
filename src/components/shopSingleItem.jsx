import React, { Component } from 'react';
import Button from './common/button/button';
import SocialLinks from './common/socialLinks';
import YouMayAlsoLike from './youMayAlsoLike';
import Price from './common/price/price';
import { getSingleItem, addToCart } from '../utils/requests';
import { toast } from 'react-toastify';

class ShopSingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: '',
      images: [],
      currentItemId: '',
      currentItem: {
        sizeQty: [],
      },
      selectedSize: 'small',
      selectedColor: 'green',
      currentUserId: '',
    };
  }

  setCurrentUserId() {
    const currentUserId = sessionStorage.getItem('loggedInUserId');
    currentUserId && this.setState({ currentUserId: currentUserId });
  }

  async componentDidMount() {
    this.setCurrentUserId();
    const currentItemId = this.props.match.params.id;
    const item = await getSingleItem(currentItemId);
    const { images, image } = item;
    const imagesRequired = images.map(
      (imgNo) => require(`../static/shop/${image}${imgNo}.jpg`).default
    );

    // const images = require(`../static/shop/${image}3.jpg`).default
    // nustatyti default image
    // atvaozduoti main image componente
    // pakeisti main image su paspaudimu ant nuotraukos
    // padaryti kad images butu nedidli ir tilptu 3 po nuotrauka
    this.setState({
      images: imagesRequired,
      mainImage: imagesRequired[2],
      currentItem: item,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentUserId } = this.state;
    if (currentUserId !== sessionStorage.getItem('loggedInUserId')) {
      console.log('update');
      this.setCurrentUserId();
    }
  }

  handleSize = (event) => {
    toast.info(`size set to ${event.target.value}`);
    this.setState({ selectedSize: event.target.value });
  };
  handleColor = (event) => {
    toast.info(`color is now ${event.target.value}`);
    this.setState({ selectedColor: event.target.value });
  };

  handleMainImage = (img) => {
    this.setState({ mainImage: img });
  };

  getQuantity() {
    const { currentItem: item, selectedSize } = this.state;
    if (item.sizeQty.length === 0) return;
    const { quantity } = item.sizeQty.find((i) => i.size === selectedSize);
    // console.log(quantity);
    return quantity;
  }

  handleAddToCart = async () => {
    const { currentUserId, currentItem, selectedColor, selectedSize } = this.state;
    console.log('add to cart please');
    // siusti i back end itema irasymui i cart
    const ats = await addToCart(currentUserId, {
      title: currentItem.title,
      image: currentItem.image,
      itemId: currentItem._id,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      sku: currentItem.sku,
      price: currentItem.salePrice || currentItem.price,
    });
    // pasitikriname ar gavom atsakyma
    if (!ats) {
      toast.error('error adding item');
    } else {
      toast.success('Item added to cart');
      // this.props.onCartCount(currentUserId);
    }
    console.log('ats', ats);
  };

  render() {
    const { socialLinksData, items } = this.props;
    const { currentItem: item } = this.state;
    return (
      <div className="single-item ">
        <div className="d-flex">
          <div className="single__images-part w-50 pos-rel">
            {item.salePrice && <span className="sale">Sale</span>}
            <h2>currentUserId: {this.state.currentUserId}</h2>
            <img className="single__main-image" src={this.state.mainImage} alt="main item" />
            <div className="single__photos d-flex flex-wrap">
              {this.state.images.map((img) => (
                <img
                  onClick={() => this.handleMainImage(img)}
                  key={img}
                  className="single__item-image"
                  src={img}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="single__item-info-part">
            <h2 className="item-info__title">{item.title}</h2>
            <Price salePrice={item.salePrice}>{item.price}</Price>
            <div className="item-info__options d-flex ">
              <div>
                <label htmlFor="colors">Colors</label>
                <br />
                <select
                  onChange={this.handleColor}
                  value={this.state.selectedColor}
                  name="colors"
                  id="colors"
                >
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                </select>
              </div>
              <div>
                <label htmlFor="sizes">Sizes</label>
                <br />
                <select
                  onChange={this.handleSize}
                  value={this.state.selectedSize}
                  name="sizes"
                  id="sizes"
                >
                  {item.sizeQty &&
                    item.sizeQty.map((i) => (
                      <option key={i._id} value={i.size}>
                        {i.size}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <h4>In stock</h4>
                <p>{item.sizeQty && this.getQuantity()}</p>
              </div>
            </div>
            <Button onClick={this.handleAddToCart} outline>
              Add to cart
            </Button>
            <br />
            <Button>Buy it now</Button>
            <SocialLinks titles socialLink={socialLinksData} />
          </div>
        </div>
        <p className="single-item__description">
          Our navy S.P.C.C logo flat peak cap is crafted from high quality Acrylic twill with a
          contrast white 3D S.P.C.C embroidery on the crown. The crown is cut from six panels for
          the perfect shape and has an adjustable PU back strap with metal clip to ensures a
          comfortable fit. Our Flat Peak cap is finished off with an SPCC metal clip label, an SPCC
          woven label, twill sweatband and the tonal embroidered eyelets ensure ventilation.
        </p>
        <YouMayAlsoLike relatedItems={items} />
      </div>
    );
  }
}

export default ShopSingleItem;
