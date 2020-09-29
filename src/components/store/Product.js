import React from 'react';
import img from '../../assets/product_image_placeholder.png';
import '../../styles.css';

class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      added: false
    };
  }

  toggleAdded = () => {
    this.setState({
      added: !this.state.added
    });
  };

  render() {
    const { product, handleClick } = this.props;
    const { added } = this.state;
    return (
      <div className='product'>
        <h4 className='product-name'>{product.name}</h4>
        <img src={img}
             className='product-placeholder'
             alt='product placeholder'
        />
        <div className='price-row'>
          <span className='price'>{product.price}</span>
          <button
            className={ added ? 'add-to-cart added' : 'add-to-cart' }
            onClick={() => {
              handleClick(added);
              this.toggleAdded();
            }}
          >
            add to cart
          </button>
        </div>
      </div>
    )
  }
}

export default Product;
