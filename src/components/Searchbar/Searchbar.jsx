import React, { Component } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  SearchLable,
  SearchInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchbar: '',
  };

  submit = e => {
    e.preventDefault();
    this.props.submit(this.state.searchbar);
    this.reset();
  };
  inputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ searchbar: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.submit}>
          <SearchButton type="submit">
            <SearchLable>Search</SearchLable>
          </SearchButton>

          <SearchInput
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            name="searchbar"
            value={this.state.searchbar}
            onChange={this.inputChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;
