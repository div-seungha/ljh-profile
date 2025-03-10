import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";

const Lnb = ({
  categories,
  onHamburgerClick,
}: {
  categories: string[];
  onHamburgerClick: () => void;
}) => {
  return (
    <div>
      <button onClick={onHamburgerClick}>
        <HiMenu />
      </button>
      <nav>
        <ul>
          {categories &&
            categories.length &&
            categories.map((v: string, i: number) => {
              return (
                <li key={i}>
                  <Link to={"/" + `${v}`} viewTransition reloadDocument>
                    {v}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

const Header = ({ categories }: { categories: string[] }) => {
  const [isShowLnb, setIsShowLnb] = useState(false);
  const handleHamburgerClick = () => {
    setIsShowLnb(!isShowLnb);
  };
  const handleBackdropClick = () => {
    setIsShowLnb(false);
  };
  //   useEffect(() => {
  //     const hideLnb = () => {
  //       if (isShowLnb) {
  //         setIsShowLnb(false);
  //       }
  //     };
  //     window.addEventListener("click", hideLnb);
  //     return () => window.removeEventListener("click", hideLnb);
  //   }, []);

  return (
    <header>
      <div>
        <div>
          <span className="nav-home">
            <Link to="/">Lee Jihoon</Link>
          </span>
          <button onClick={handleHamburgerClick} className="nav-hamburger">
            <HiMenu />
          </button>
        </div>
        <nav>
          <ul>
            {categories &&
              categories.length &&
              categories.map((v: string, i: number) => {
                return (
                  <li key={i}>
                    <Link to={"/" + `${v}`} viewTransition reloadDocument>
                      {v}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
      {isShowLnb && (
        <button className="lnb-background" onClick={handleBackdropClick}>
          <aside className={"lnb"}>
            <Lnb
              categories={categories}
              onHamburgerClick={handleHamburgerClick}
            />
          </aside>
        </button>
      )}
    </header>
  );
};

export default Header;
