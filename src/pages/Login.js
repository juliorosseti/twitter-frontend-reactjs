import React, { Component } from 'react';
import AlertMessage from '../components/AlertMessage';
import api from '../services/api';
import { Link } from 'react-router-dom';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {

  state = {
    email: '',
    pass: '',
    alert: {
      type: '',
      text: '',
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    let self = this;

    const { email, pass } = this.state;

    if (!email.length && !pass.length) return;

    await api.post('/authenticate', {
      email: email,
      password: pass
    }).then(function (response) {

      self.setState({
        alert: {
          type: 'success',
          text: 'Login successful, you token is: ' + response.data.token
        },
        email: '',
        pass: ''
      })
    })
    .catch(function (error) {
      self.setState({
        alert: {
          type: 'error',
          text: error.response.data.message
        }
      })
    });

      // localStorage.setItem('@Twitter:email', email);

    // this.props.history.push('/timeline');
  };

  handleInputEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleInputPassChange = (e) => {
    this.setState({ pass: e.target.value });
  };

  render() {
    return (
      <div className="login-wrapper">

        <img src={twitterLogo} alt="Twitter" />
        <h2>Login</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.email}
            onChange={this.handleInputEmailChange}
            placeholder="Usuário / E-mail"
          />
          <input
            value={this.state.pass}
            onChange={this.handleInputPassChange}
            placeholder="Senha"
            type="password"
          />
          <button type="submit">Entrar</button>
          <Link to="/register">Registrar-se</Link>

          <AlertMessage text={this.state.alert.text} type={this.state.alert.type} />

        </form>

      </div>
    );
  }
}