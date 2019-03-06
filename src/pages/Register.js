import React, { Component } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

import twitterLogo from '../twitter.svg';
import './Register.css';

export default class Register extends Component {

  state = {
    name : '',
    email: '',
    pass : '',
    errorMessage: ''
  };

  handleSubmit = async e => {

    e.preventDefault();

    let self = this;

    const { name, email, pass } = this.state;

    if (!name.length && !pass.length && !email.length) return;

    await api.post('/register', {
      name: name,
      email: email,
      password: pass
    }).then(function (response) {

      self.setState({
        errorMessage: 'Register successful, you token is: ' + response.data.token,
        name : '',
        email: '',
        pass : ''
      })
    })
    .catch(function (error) {
      self.setState({ errorMessage: error.response.data.message })
    });
  };

  handleInputNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleInputPassChange = (e) => {
    this.setState({ pass: e.target.value });
  };

  handleInputEmailChange = (e) => {
    this.setState( { email: e.target.value });
  };

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="Twitter" />
        <h2>Registrar-se</h2>
        <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.name}
          onChange={this.handleInputNameChange}
          placeholder="Nome completo"
        />
        <input
          value={this.state.email}
          onChange={this.handleInputEmailChange}
          placeholder="E-mail"
        />
        <input
          value={this.state.pass}
          onChange={this.handleInputPassChange}
          placeholder="Senha"
          type="password"
        />
        <button type="submit">Registrar</button>
        <Link to="/">Login</Link>
        </form>
      </div>
    );
  }
}