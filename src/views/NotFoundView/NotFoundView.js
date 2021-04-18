import PropTypes from 'prop-types';
import bgError from '../../image/bg-error.png';
// import s from './NotFoundView.module.css';

export default function NotFoundView({ message }) {
  return (
    <div>
      <img src={bgError} alt="404 page not found"></img>
      <p text={message}>{message}</p>
    </div>
  );
}

NotFoundView.propTypes = {
  message: PropTypes.string.isRequired,
};
