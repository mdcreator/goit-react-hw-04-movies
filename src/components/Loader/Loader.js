import { Component } from 'react';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class Api extends Component {
  // state = {};
  render() {
    return (
      <Loader
        type="Grid"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000} //3 secs
      />
    );
  }
}

export default Api;
