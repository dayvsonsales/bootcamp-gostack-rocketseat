import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.View`
  margin-top: 20px;
  background: black;
`;

export const Product = styled.View`
  margin: 0 20px 30px;
  background-color: white;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 4px;
  width: 220px;
`;

export const ProductAmount = styled.View`
  flex-direction: row;
  padding: 12px;
  border-radius: 4px;
  background-color: ${darken(0.03, '#7151c1')};

  flex-direction: row;
  align-items: center;
`;

export const ProductAmountText = styled.Text`
  color: white;
  margin: 0px 4px 0px 10px;
`;

export const AddButtonText = styled.Text`
  color: white;
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

export const Image = styled.Image``;

export const ProductTitle = styled.Text`
  font-size: 16px;
`;

export const Price = styled.Text`
  margin: 14px 0px;
  font-size: 20px;
  margin-bottom: 14px;
  font-weight: bold;
`;

export const AddButton = styled.TouchableOpacity`
  background: #7151c1;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
`;

export const NoProducts = styled.View`
  flex: 1;
`;
