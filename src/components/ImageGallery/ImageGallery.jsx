import { Component } from 'react';
import Api from 'components/services/api';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { ImageGalleryList } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.searchbar.searchbar;
    const nextSearch = this.props.searchbar.searchbar;
    const page = 1;
    if (prevSearch !== nextSearch) {
      this.setState({ status: 'pending', page: 1 });

      Api.fatchImage(nextSearch, page)
        .then(images => {
          if (images.total === 0) {
            toast.error('No any picture');
            this.setState({ error: 'No any picture', status: 'rejected' });
          } else {
            this.setState({
              images: images.hits,
              status: 'resolved',
              page: 1,
              searchbar: nextSearch,
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMore = () => {
    const page = this.state.page + 1;

    Api.fatchImage(this.state.searchbar, page)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          page: prevState.page + 1,
        }))
      )
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }));
  };

  modalOpen = (moduleUrl, moduleAlt) => {
    console.log('clic');
    this.setState({
      largeImageURL: moduleUrl,
      alt: moduleAlt,
    });
  };

  modalClose = () => {
    this.setState({ largeImageURL: '', alt: '' });
  };

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return <p>Enter the name of the picture</p>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <p>{this.state.error}</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryList>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  tags={image.tags}
                  webformatURL={image.webformatURL}
                  largeImageURL={image.largeImageURL}
                  modalOpen={this.modalOpen}
                />
              );
            })}
          </ImageGalleryList>
          <Button onClick={this.loadMore} />
          {this.state.largeImageURL && (
            <Modal
              largeImageURL={this.state.largeImageURL}
              alt={this.state.alt}
              onClick={this.modalClose}
            />
          )}
        </>
      );
    }
  }
}
