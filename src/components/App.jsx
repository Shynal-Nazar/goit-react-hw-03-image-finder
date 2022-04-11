import React, { Component } from 'react';
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const searchbar = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ToastContainer autoClose={3000} />
        <ImageGallery searchbar={searchbar} />
      </Container>
    );
  }
}
