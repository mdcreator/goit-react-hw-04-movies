import { useState, useEffect } from 'react';
import Api from '../../services/api';
import CastCard from '../../components/CastCard';
import s from './MovieCredits.module.css';
import PropTypes from 'prop-types';

export default function Cast({ id }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    Api.fetchCreditsById(id).then(data => setCast(data.cast));
  }, [id]);

  return (
    <ul className={s.list}>
      {cast.map(item => (
        <CastCard item={item} key={item.id}></CastCard>
      ))}
    </ul>
  );
}
Cast.propTypes = {
  id: PropTypes.string.isRequired,
};
