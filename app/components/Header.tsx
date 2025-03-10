import { Link } from "@remix-run/react";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import useStore, { useColorStore } from "~/store/store";

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

  const lang = useStore((state) => state.lang);
  const setLang = useStore((state) => state.setLang);

  const color = useColorStore((state) => state.color);
  const setColor = useColorStore((state) => state.setColor);

  const handleLangChange = () => {
    if (lang === "ko") {
      setLang("en");
      return;
    }
    setLang("ko");
  };
  const handleColorChange = () => {
    if (color === "dark") {
      setColor("light");
      return;
    }
    setColor("dark");
  };

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
          <ul className="category">
            {categories &&
              categories.length &&
              categories.map((v: string, i: number) => {
                return (
                  <li key={i}>
                    <Link to={"/" + `${v}`} viewTransition>
                      {v}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <ul>
            <li>
              <button
                className="nav-icon-container"
                onClick={handleColorChange}
              >
                {color === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            </li>
            <li>
              <button className="nav-icon-container" onClick={handleLangChange}>
                <GrLanguage />
              </button>
            </li>
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
