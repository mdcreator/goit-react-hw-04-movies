import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick, title, status = false }) {
  return (
    <button
      type="button"
      className={s.button}
      onClick={onClick}
      disabled={status}
    >
      {title}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  status: PropTypes.bool,
};
