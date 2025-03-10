import { Link } from "@remix-run/react";

const Header = ({ categories }: { categories: string[] }) => {
  return (
    <header>
      <div>
        <span>
          <Link to="/">Lee Jihoon</Link>
        </span>
        <nav>
          <ul>
            {categories &&
              categories.length &&
              categories.map((v: string, i: number) => {
                return (
                  <li key={i}>
                    <Link to={"/" + `${v}`}>{v}</Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
