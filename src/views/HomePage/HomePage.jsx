import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Api from '../../services/api';
import SmallMovieCard from '../../components/SmallMovieCard';
import Loader from '../../components/Loader';
import NotFoundView from '../../views/NotFoundView';
import s from './HomePage.module.css';
import slugify from 'slugify';

const makeSlug = string => slugify(string, { lower: true });
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  const toggleLoading = () => {
    setLoadedImages(prev => prev + 1);
  };

  useEffect(() => {
    setStatus(Status.PENDING);
    Api.fetchTrending()
      .then(data => {
        setMovies(data.results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('Sorry... Something went wrong');
        setStatus(Status.REJECTED);
      });
  }, []);

  return (
    <main className={s.basePage}>
      <h2>Trending today</h2>
      {/* {loadedImages < movies.length && <Loader />} */}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <NotFoundView message={error.message} />}
      {status === Status.RESOLVED && (
        <>
          <ul className={s.cardsList}>
            {movies.map(movie => {
              return (
                <li key={movie.id} className={s.card}>
                  <Link
                    className={s.link}
                    to={{
                      pathname: `movies/${makeSlug(
                        `${movie.title} ${movie.id}`,
                      )}`,
                      state: {
                        from: {
                          location,
                          label: 'Back to Home',
                        },
                      },
                    }}
                  >
                    <SmallMovieCard movie={movie} onLoad={toggleLoading} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </main>
  );
}
