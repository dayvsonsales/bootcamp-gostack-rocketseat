import React from 'react';

import { connect } from 'react-redux';

import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Wrapper, Logo, BasketContainer, ItemCount } from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Header = ({ navigation, cartSize }) => {
  return (
    <Wrapper>
      <Container>
        <TouchableHighlight onPress={() => navigation.navigate('Home')}>
          <Logo />
        </TouchableHighlight>
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
};

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
