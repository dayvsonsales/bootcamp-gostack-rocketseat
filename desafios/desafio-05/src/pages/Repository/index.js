import React, { Component } from 'react';

import queryString from 'query-string';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Loading, Owner, IssueList, Select, Page, ButtonPage } from './styles';
import api from '../../services/api';

import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    status: 'all',
    page: 1,
  };

  async componentDidMount() {
    const search = this.props.location.search;

    if (search) {
      const values = queryString.parse(search);

      await this.setState({
        page: Number(values.page),
        status: values.status,
      });
    }

    this.loadIssues();
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { status, page } = this.state;

    this.setState({
      loading: true,
    });

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: status,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  };

  handleSelect = async e => {
    await this.setState({
      status: e.target.value,
      page: 1,
    });

    this.updateQueryParams();

    this.loadIssues();
  };

  handlePage = async offset => {
    await this.setState({
      page: this.state.page + offset,
    });

    this.updateQueryParams();

    this.loadIssues();
  };

  updateQueryParams = () => {
    const { status, page } = this.state;

    this.props.history.push({
      search: `?page=${page}&status=${status}`,
    });
  };

  render() {
    const { repository, issues, loading, status, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Select onChange={this.handleSelect} value={status}>
          <option value="all">Todos</option>
          <option value="open">Aberto</option>
          <option value="closed">Fechado</option>
        </Select>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login}></img>
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Page>
          <ButtonPage
            type="button"
            onClick={() => this.handlePage(1)}
            disabled={page === 1}
          >
            Anterior
          </ButtonPage>
          <ButtonPage type="button" onClick={() => this.handlePage(1)}>
            Próxima
          </ButtonPage>
        </Page>
      </Container>
    );
  }
}
