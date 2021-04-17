import { useState, useEffect } from 'react';
import Api from '../../services/api';
// import ShowMore from 'react-simple-show-more';
import s from './MovieReviews.module.css';
import PropTypes from 'prop-types';

export default function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    Api.fetchReviewsById(id).then(data => {
      setReviews(data.results);
    });
  }, [id]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map(item => {
            return (
              <li className={s.item} key={item.id}>
                <h3 className={s.tittle}>{item.author}</h3>
                <p className={s.text}>
                  {/* <ShowMore
                    length={400}
                    style={{
                      cursor: 'pointer',
                      color: 'tomato',
                      fontWeight: 'bold',
                    }}
                    text={item.content}
                  /> */}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3 className={s.noReviews}>No reviews was found</h3>
      )}
    </>
  );
}

Reviews.propTypes = {
  id: PropTypes.string.isRequired,
};
