import React, { Component } from 'react';
import api from '../services/api';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {

  state = {
    user: '',
    pass: '',
    errorMessage: ''
  };

  handleSubmit = async e => {
    e.preventDefault();
    let self = this;

    const { user, pass } = this.state;

    if (!user.length && !pass.length) return;

    await api.post('/authenticate', {
      email: user,
      password: pass
    }).then(function (response) {

      self.setState({
        errorMessage: 'Login successful, you token is: ' + response.data.token,
        user: '',
        pass: ''
      })
    })
    .catch(function (error) {
      self.setState({ errorMessage: error.response.data.message })
    });

      // localStorage.setItem('@Twitter:user', user);

    // this.props.history.push('/timeline');
  };

  handleInputUserChange = (e) => {
    this.setState({ user: e.target.value });
  };

  handleInputPassChange = (e) => {
    this.setState({ pass: e.target.value });
  };

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="Twitter" />
        <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.user}
          onChange={this.handleInputUserChange}
          placeholder="Usuário / E-mail"
        />
        <input
          value={this.state.pass}
          onChange={this.handleInputPassChange}
          placeholder="Senha"
          type="password"
        />
        <button type="submit">Entrar</button>
        <div className="">{this.state.errorMessage}</div>
        </form>
      </div>
    );
  }
}