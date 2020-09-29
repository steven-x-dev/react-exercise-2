import React from 'react';
import Product from './Product';
import cart from '../../assets/cart.png';

class Store extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: {},
      cartCount: 0
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/products')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(`${response.status} ${response.statusText}`);
      }
    })
    .then(fetchedProducts => {
      const fetchedCategories = this.categorize(fetchedProducts);
      this.setState({ categories: fetchedCategories });
    })
    .catch(err => {
      console.log(err);
    });
  }

  categorize = products => {
    const { categories } = this.state;
    return products.reduce((acc, prod) => {
      const { name, price } = prod;
      acc[prod.category] = acc[prod.category] || [];
      acc[prod.category].push({ name, price });
      return acc;
    }, categories);
  };

  render() {
    const { categories, cartCount } = this.state;
    return (
      <div className="store-container">
        <header>
          <h1 className='store-title'>Store</h1>
          <span className='cart'>
            <img
              src={cart}
              className='cart-icon'
              alt='cart icon'
            />
            <span className='cart-count'>
              {cartCount}
            </span>
          </span>
        </header>
        {Object.entries(categories).map(entry => this.renderCategory(entry))}
      </div>
    );
  }

  handleClick = (prevAdded) => {
    const { cartCount } = this.state;
    const updatedCount = prevAdded ? cartCount - 1 : cartCount + 1;
    this.setState({
      cartCount: updatedCount
    });
  };

  renderCategory = ([name, products]) => {
    return (
      <div key={name} className='category'>
        <h3 className='category-title'>{name}</h3>
        {products.map(p =>
          <Product
            key={p.name}
            product={p}
            handleClick={this.handleClick}
          />)}
      </div>
    );
  };

}

export default Store;
