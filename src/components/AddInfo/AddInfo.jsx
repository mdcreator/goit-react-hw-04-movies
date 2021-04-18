import s from './AddInfo.module.css';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';

export default function AddInfo() {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <div>
      <h3 className={s.title}>Info</h3>
      <ul className={s.list}>
        <li>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { ...location.state },
            }}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { ...location.state },
            }}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
