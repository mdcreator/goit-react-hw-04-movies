import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
// import NotFoundView from '../../views/NotFoundView';
import Api from '../../services/api';
// import ShowMore from 'react-simple-show-more';
import s from './MovieReviews.module.css';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(Status.PENDING);
    Api.fetchReviewsById(id)
      .then(data => {
        setReviews(data.results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('Oops... Something went wrong');
        setStatus(Status.REJECTED);
      });
  }, [id]);

  return (
    <>
      {reviews.length > 0 ? (
        // {status === Status.PENDING && <Loader />}
        // {status === Status.REJECTED && <NotFoundView message={error.message} />}
        // {
        //   status === Status.RESOLVED && (
        <ul>
          {reviews.map(review => {
            return (
              <li className={s.item} key={review.id}>
                <h3 className={s.tittle}>Author: {review.author}</h3>
                <p className={s.text}>
                  {review.content}
                  {/* <ShowMore
                      text={review.content}
                      length={400}
                      showMoreLabel=" Show more >>"
                      showLessLabel=" Show less <<"
                      style={{
                        cursor: 'pointer',
                        color: '#ea0042',
                        fontWeight: 'bold',
                      }}
                    /> */}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3 className={s.noReviews}>This information was not found</h3>
      )}
    </>
  );
}

Reviews.propTypes = {
  id: PropTypes.string.isRequired,
};
