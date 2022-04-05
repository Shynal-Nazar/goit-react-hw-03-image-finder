import React, { Component } from 'react';
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchbar: '',
  };

  onFormSubmit = searchName => {
    if (searchName) {
      this.setState({ searchbar: searchName });
    }
    return;
  };

  render() {
    return (
      <Container>
        <Searchbar submit={this.onFormSubmit} />
      </Container>
    );
  }
}
