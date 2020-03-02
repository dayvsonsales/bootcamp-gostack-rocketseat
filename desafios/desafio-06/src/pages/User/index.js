import React, { Component } from 'react';
import { ActivityIndicator, TouchableHighlight } from 'react-native';

import { PropTypes } from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false,
  };

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    this.loadStarred();
  }

  loadMore = async () => {
    const { page } = this.state;

    await this.setState({ page: page + 1, refreshing: true });
    this.loadStarred();
  };

  loadStarred = async () => {
    const { route } = this.props;
    const { stars, page } = this.state;
    const user = route.params;

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({
      stars: [...stars, ...response.data],
      loading: false,
      refreshing: false,
    });
  };

  refreshList = async () => {
    await this.setState({ page: 1, refreshing: true, stars: [] });
    this.loadStarred();
  };

  handlePress = item => {
    console.tron.log('aqui');
    const { navigation } = this.props;
    navigation.push('Repository', item.html_url);
  };

  render() {
    const { stars, loading, refreshing } = this.state;

    const { route } = this.props;
    const user = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio || 'Usuário sem biografia'}</Bio>
        </Header>
        {loading ? (
          <Loading>
            <ActivityIndicator size="large" color="#7159c1" />
          </Loading>
        ) : (
          <Stars
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={this.loadMore} // Função que carrega mais itens
            onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
            refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
            loading={loading}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => this.handlePress(item)}>
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </TouchableHighlight>
            )}
          />
        )}
      </Container>
    );
  }
}
