import React, { Component } from 'react';
import api from '../services/api';


import twitterLogo from "../twitter.svg";
import './Timeline.css';

export default class Timeline extends Component {

  state = {
    newTweet: '',
  };

  handleInputChange = e => {
    this.setState( {  newTweet: e.target.value })
  };

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem("@Twitter:user");

    await api.post('/tweets', { author, content })

    this.setState({ newTweet: '' })
};


  render() {
    return (
      <div height={24} className="timeline-wrapper">
        <img src={twitterLogo} alt="Twitter" />

        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          ></textarea>

        </form>

        <ul>

        </ul>
      </div>
    )
  }
}