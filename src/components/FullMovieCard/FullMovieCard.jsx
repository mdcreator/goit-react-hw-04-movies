import s from './FullMovieCard.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

import noImage from '../../image/bg-error.png';

export default function FullMovieCard({ movie }) {
  const [loading, setLoading] = useState(true);
  const toggleLoadind = () => {
    setLoading(prev => !prev);
  };
  return (
    <div className={s.card}>
      {loading && <Loader />}
      <img
        onLoad={toggleLoadind}
        className={s.img}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : noImage
        }
        alt={movie.title && movie.original_name}
        width="300px"
        height="450px"
      />
      <div className={s.description}>
        <h2 className={s.title}>{movie.title}</h2>
        <p>User Score: {movie.popularity}</p>
        <h3 className={s.subTitle}>Overview</h3>
        <p className={s.overview}>{movie.overview}</p>
        <h3 className={s.subTitle}>Genres</h3>
        <ul className={s.genresList}>
          {movie.genres.map(genre => (
            <li className={s.genre} key={genre.id}>
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

FullMovieCard.propTypes = {
  movie: PropTypes.object,
};
