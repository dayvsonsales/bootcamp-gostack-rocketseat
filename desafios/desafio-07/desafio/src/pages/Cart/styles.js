import styled from 'styled-components';
import { darken } from 'polished';
import { Text } from 'react-native';

export const Container = styled.View`
  background-color: white;
  border-radius: 4px;
  padding: 10px;
  margin: 15px;
`;

export const ProductTable = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const ProductDetails = styled.View`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
`;

export const ProductName = styled.Text``;

export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-top: 5px;
`;

export const Footer = styled.View`
  background-color: #eee;
  flex-direction: row;
  border-radius: 4px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Amount = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const AmountInputText = styled.TextInput.attrs({
  readyonly: true,
})`
  min-width: 45px;
  background-color: white;
  padding-left: 5px;
  color: black;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-left: 5px;
  margin-right: 5px;
`;

export const SubTotal = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

export const Total = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 5px;
  margin-top: 20px;
`;

export const TotalPrice = styled.Text`
  font-weight: bold;
  font-size: 32px;
`;

export const TotalText = styled.Text`
  color: grey;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const DoOrder = styled.View`
  padding: 15px;
  align-items: center;
  border-radius: 4px;
  background-color: #7159c1;
  margin-top: 20px;
`;

export const DoOrderText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
`;

export const EmptyCart = styled.View``;
