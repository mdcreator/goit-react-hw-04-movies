import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Searchbar from '../../components/Searchbar';
import SmallMovieCard from '../../components/SmallMovieCard';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Api from '../../services/api';
import s from './MoviesPage.module.css';
import slugify from 'slugify';

const makeSlug = string => slugify(string, { lower: true });

export default function MoveisPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(-1);

  const [loadedImages, setLoadedImages] = useState(0);
  const toggleLoadind = () => {
    setLoadedImages(prev => prev + 1);
  };

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get('query'));
    setPage(Number(new URLSearchParams(location.search).get('page')));
  }, [location.search]);

  useEffect(() => {
    if (page === 0) {
      setTotalPage(-1);
      setMovies([]);
    }
  }, [page]);

  useEffect(() => {
    if (!query) return;

    Api.fetchQuery(query, page)
      .then(data => {
        setMovies(data.results);
        setTotalPage(data.total_pages);
      })
      .catch(error => {
        console.log(error);
      });
  }, [page, query]);

  const handleSearchForm = searchQuery => {
    setMovies([]);
    setTotalPage(0);
    setLoadedImages(0);
    history.push({ ...location, search: `query=${searchQuery}&page=1` });
  };

  const prevHandler = () => {
    setLoadedImages(0);
    history.push({ ...location, search: `query=${query}&page=${page - 1}` });
  };
  const nextHandler = () => {
    setLoadedImages(0);
    history.push({ ...location, search: `query=${query}&page=${page + 1}` });
  };

  return (
    <>
      {loadedImages < movies.length && <Loader />}
      <Searchbar onSubmit={handleSearchForm} />

      <ul className={s.moviesList}>
        {movies.map(movie => {
          return (
            <li key={movie.id} className={s.movieCard}>
              <Link
                className={s.link}
                to={{
                  pathname: `${url}/${makeSlug(`${movie.title} ${movie.id}`)}`,
                  state: {
                    from: {
                      location,
                      label: 'Back to Movies',
                    },
                  },
                }}
              >
                <SmallMovieCard onload={toggleLoadind} movie={movie} />
              </Link>
            </li>
          );
        })}
      </ul>
      {totalPage >= page && (
        <div className={s.buttons}>
          <Button
            onClick={prevHandler}
            title="prev page"
            status={!(page > 1)}
          />
          <Button
            onClick={nextHandler}
            title="next page"
            status={page >= totalPage}
          />
        </div>
      )}
    </>
  );
}
