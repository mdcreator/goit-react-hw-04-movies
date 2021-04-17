import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Api from '../../services/api';

import Button from '../../components/Button';
import FullMovieCard from '../../components/FullMovieCard';
import AddInfo from '../../components/AddInfo';
import Loader from '../../components/Loader';
import s from './MovieDetailsPage.module.css';

const MovieCredits = lazy(() =>
  import('../MovieCredits' /* webpackChunkName: "Cast" */),
);
const MovieReviews = lazy(() =>
  import('../MovieReviews' /* webpackChunkName: "Reviews" */),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { path } = useRouteMatch();
  const { slug } = useParams();
  const movieId = slug.match(/[0-9]+$/)[0];
  const [movie, setMovie] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    Api.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  return (
    // <div
    //   className={s.backdrop}
    //   style={
    //     movie?.backdrop_path && {
    //       background: `url("https://image.tmdb.org/t/p/w780${movie.backdrop_path}") center /cover no-repeat`,
    //     }
    //   }
    // >
    <div className={s.moviePage}>
      <Button
        onClick={handleGoBack}
        title={location?.state?.from?.label ?? 'Home'}
      />
      {movie && (
        <>
          <FullMovieCard movie={movie} />
          <AddInfo />
        </>
      )}
      <Suspense fallback={<Loader />}>
        <Route path={`${path}/cast`}>
          <MovieCredits id={movieId} />
        </Route>
        <Route path={`${path}/reviews`}>
          <MovieReviews id={movieId} />
        </Route>
      </Suspense>
    </div>
    // </div>
  );
}
