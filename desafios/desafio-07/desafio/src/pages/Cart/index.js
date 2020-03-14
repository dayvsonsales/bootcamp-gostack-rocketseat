import React from 'react';

import * as CartActions from '../../store/modules/cart/actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Container,
  ProductTable,
  ProductImage,
  ProductDetails,
  ProductName,
  ProductPrice,
  Total,
  TotalText,
  TotalPrice,
  Amount,
  SubTotal,
  Footer,
  DoOrder,
  DoOrderText,
  AmountInputText,
} from './styles';

import { FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

import { formatPrice } from '../../util/format';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Cart({ cart, removeFromCart, updateAmountRequest, total }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      <FlatList
        data={cart}
        keyExtractor={cart => cart.id.toString()}
        renderItem={({ item }) => (
          <>
            <ProductTable>
              <ProductImage source={{ uri: item.image }} />
              <ProductDetails>
                <ProductName>{item.title}</ProductName>
                <ProductPrice>{formatPrice(item.price)}</ProductPrice>
              </ProductDetails>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Icon name="delete-forever" size={24} color="#7159c1" />
              </TouchableOpacity>
            </ProductTable>
            <Footer>
              <Amount>
                <TouchableOpacity onPress={() => decrement(item)}>
                  <Icon
                    name="remove-circle-outline"
                    size={24}
                    color="#7159c1"
                  />
                </TouchableOpacity>
                <AmountInputText value={item.amount.toString()} />
                <TouchableOpacity onPress={() => increment(item)}>
                  <Icon name="add-circle-outline" size={24} color="#7159c1" />
                </TouchableOpacity>
              </Amount>
              <SubTotal>{item.subtotal}</SubTotal>
            </Footer>
          </>
        )}
      />
      <Total>
        <TotalText>TOTAL</TotalText>
        <TotalPrice>{total}</TotalPrice>
      </Total>
      <TouchableOpacity onPress={() => console.log('deu')}>
        <DoOrder>
          <DoOrderText>Finalizar Pedido</DoOrderText>
        </DoOrder>
      </TouchableOpacity>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
