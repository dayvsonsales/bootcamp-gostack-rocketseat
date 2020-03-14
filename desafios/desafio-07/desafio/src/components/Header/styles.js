import styled from 'styled-components';

import logo from '../../assets/images/logo.png';

export const Wrapper = styled.SafeAreaView`
  flex: 0;
  background-color: black;
  flex-direction: row;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  padding: 20px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;

export const BasketContainer = styled.TouchableOpacity`
  flex-direction: row;
`;

export const ItemCount = styled.Text`
  background: #7159c1;
  text-align: center;
  min-width: 18px;
  min-height: 18px;
  color: #fff;
  font-size: 12px;
  border-radius: 9px;
  overflow: hidden;
  top: -8px;
  right: -8px;
  position: absolute;
`;
