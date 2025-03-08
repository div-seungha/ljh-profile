import { Link } from "@remix-run/react";

const Header = () => {
  return (
    <header>
      <div>
        <span>
          <Link to="/">Lee Jihoon</Link>
        </span>
        <nav>
          <ul>
            <li>Profile</li>
            <li>
              <Link to="/education">Education</Link>
            </li>
            <li>
              <Link to="/works">Work Experiences</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/tutoring">Tutoring</Link>
            </li>
            <li>
              <Link to="publishing">Publishing</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
