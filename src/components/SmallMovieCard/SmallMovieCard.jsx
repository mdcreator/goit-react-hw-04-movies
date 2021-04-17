import s from './SmallMovieCard.module.css';
import PropTypes from 'prop-types';

import noImage from '../../image/bg-error.png';

export default function SmallMovieCard({
  onload,
  movie,
  imgWidth = '176px',
  imgHeight = '264px',
}) {
  return (
    <>
      <img
        onLoad={onload}
        className={s.img}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : noImage
        }
        alt={movie.title && movie.original_name}
        width={imgWidth}
        height={imgHeight}
      />
      <p className={s.cardTitle}>{movie.title}</p>
    </>
  );
}

SmallMovieCard.propTypes = {
  onload: PropTypes.func,
  movie: PropTypes.object.isRequired,
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
};
