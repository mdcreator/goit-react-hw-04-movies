import { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTyps from 'prop-types';
import Loader from '../Loader';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static PropTyps = {
    largeImageURL: PropTyps.string.isRequired,
  };

  state = {
    isLoading: false,
    showModal: false,
  };

  componentDidMount() {
    // this.setState({ isLoading: true });
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  toggleLoad = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  onOpenModal = e => {
    this.setState({ largeImageURL: e.target.dataset.source });
    this.toggleModal();
  };
  // handleImageLoaded = e => {
  //     this.setState({ isLoading: false });
  //   }
  // };

  handleBackdropClick = e => {
    if (e.currentTarget === e.turget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          {/* {this.props.children} */}
          <img
            src={this.props.largeImageURL}
            alt={this.props.alt}
            onClose={this.toggleModal}
            onLoad={this.toggleLoad}
          />
          {this.state.isLoading && (
            <Loader type="Grid" color="#3f51b5" height={80} width={80} />
          )}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
