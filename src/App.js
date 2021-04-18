import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Container from './components/Container';
import AppBar from './components/AppBar';
import Loader from './components/Loader';

// import HomePage from './views/HomePage';
// import MoviesPage from './views/MoviesPage';
// import MovieDetailsPage from './views/MovieDetailsPage';

// import NotFoundView from './views/NotFoundView';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */),
);

const NotFoundView = lazy(() =>
  import('./views/NotFoundView' /* webpackChunkName: "NotFoundView" */),
);

export default function App() {
  return (
    <>
      <Container>
        <AppBar />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/movies" exact>
              <MoviesPage />
            </Route>

            <Route path="/movies/:slug">
              <MovieDetailsPage />
            </Route>

            <Route>
              <NotFoundView />
            </Route>

            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}
