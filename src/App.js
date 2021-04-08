import { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
// import Modal from './components/Modal';
import Api from './services/api';

import errorImage from './components/error.jpg';
import cover from './components/cover.jpg';
import Container from './components/Container';

class App extends Component {
  state = {
    query: '',
    gallery: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const page = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ gallery: [], page: 1, error: null });

      Api.fetchImage(nextQuery, page)
        // .then(query => this.setState({ query, status: 'resolved' }))
        .then(data => {
          if (data.total < 1) {
            return Promise.reject(
              new Error(`По вашему запрсу "${nextQuery}" не найдено`),
            );
          }

          this.setState(prevState => {
            return {
              gallery: data.hits,
              status: 'resolved',
              page: prevState.page + 1,
            };
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleSearchForm = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  // inputQuery = () => {
  //   const { nextQuery } = this.state;
  //   if (nextQuery.trim() === '') {
  //     // return toast.info('Введите запрос');
  //     return alert('Введите запрос');
  //   }
  // };

  //   // if (nextQuery.trim() === '') {
  //   //   const notify = () => toast.error('Введите запрос');
  //   //   notify();
  //   // }

  handleLoadMore = () => {
    const nextQuery = this.state.query;
    const page = this.state.page;

    this.setState({
      // status: 'pending',
    });
    Api.fetchImage(nextQuery, page)
      .then(data => {
        this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...data.hits],
            // status: 'resolved',
            page: prevState.page + 1,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'reject' }));
  };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  render() {
    const { status, gallery, error } = this.state;

    if (status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchForm} />
          <div>
            <p> Проверим? 😜</p>
            <img src={cover} alt="cover" />
          </div>
        </Container>
      );
    }

    if (status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchForm} />
          <ImageGallery gallery={gallery} />
          <Button />
          <Loader />
        </Container>
      );
    }

    if (status === 'rejected') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchForm} />
          <div>
            <p>{error.message}</p>
            <img src={errorImage} alt="oops" />
          </div>
          {/* <ToastContainer /> */}
        </Container>
      );
    }

    if (status === 'resolved') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchForm} />
          <ImageGallery gallery={gallery} onClose={this.props.toggleModal} />
          <Button onClick={this.handleLoadMore} />

          {/* {this.state.showModal && (
            <Modal>
              <img
                src={this.state.largeImageURL}
                alt={this.props.alt}
                // onLoad={this.toggleLoad}
              />
     
            </Modal>
          )} */}
          {/* {this.state.showModal && (
            <Modal
              onClose={this.props.toggleModal}
              largeImageURL={this.state.largeImageURL}
            />
          )} */}
        </Container>
      );
    }
  }
}

export default App;
