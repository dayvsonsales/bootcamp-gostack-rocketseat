import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

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

function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    getProducts();
  }, []);

  function handleAddProduct(product) {
    dispatch(CartActions.addToCartRequest(product.id));
  }

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
            <AddButton onPress={() => handleAddProduct(item)}>
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

export default Home;
