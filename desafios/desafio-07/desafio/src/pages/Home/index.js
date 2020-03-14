import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

import { bindActionCreators } from 'redux';

import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';

import { FlatList } from 'react-native';

import {
  Container,
  Product,
  Image,
  Price,
  AddButton,
  ProductTitle,
  ProductAmount,
  AddButtonText,
  ProductAmountText,
} from './styles';

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
      <Container>
        <FlatList
          horizontal
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Product>
              <Image
                source={{ uri: item.image }}
                style={{ width: 200, height: 200 }}
              />
              <ProductTitle numberOfLines={2}>{item.title}</ProductTitle>
              <Price>{formatPrice(item.price)}</Price>
              <AddButton onPress={() => this.handleAddProduct(item)}>
                <ProductAmount>
                  <Icon name="add-shopping-cart" color="#FFF" size={20} />
                  <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
                </ProductAmount>
                <AddButtonText>ADICIONAR</AddButtonText>
              </AddButton>
            </Product>
          )}
        />
      </Container>
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
