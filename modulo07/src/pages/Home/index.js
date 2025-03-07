import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import { bindActionCreators } from 'redux';

import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';

import { ProductList, NoProducts } from './styles';

import { formatPrice } from '../../util/format';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = product => {
    const { addToCartRequest } = this.props;

    addToCartRequest(product.id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <>
        {products.length === 0 ? (
          <NoProducts>
            <p>Infelizmente não há produtos cadastrados :(</p>
          </NoProducts>
        ) : (
          <ProductList>
            {products.map(product => (
              <li key={product.id}>
                <img src={product.image} alt={product.title} />

                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>

                <button
                  type="button"
                  onClick={() => this.handleAddProduct(product)}
                >
                  <div>
                    <MdAddShoppingCart size={16} color="#FFF" />
                    {amount[product.id] || 0}
                  </div>

                  <span>ADICIONAR AO CARRINHO</span>
                </button>
              </li>
            ))}
          </ProductList>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
