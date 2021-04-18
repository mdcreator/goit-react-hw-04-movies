import s from './CastCard.module.css';
import PropTypes from 'prop-types';

import noImage from '../../image/no-img.jpg';

export default function SmallMovieCard({ item }) {
  return (
    <li className={s.castCard}>
      <img
        className={s.img}
        src={
          item.profile_path
            ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
            : noImage
        }
        alt={item.name}
        width="100px"
      />
      <h3 className={s.name}>{item.name}</h3>
      <p className={s.character}>{item.character}</p>
    </li>
  );
}

SmallMovieCard.propTypes = {
  item: PropTypes.object,
};
