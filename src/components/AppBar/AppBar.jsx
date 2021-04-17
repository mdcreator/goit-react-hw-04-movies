import { NavLink } from 'react-router-dom';
import s from './AppBar.module.css';

export default function AppBar() {
  return (
    <header className={s.header}>
      <nav className={s.navHeader}>
        <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
          Home
        </NavLink>

        <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
