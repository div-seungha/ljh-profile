const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full h-[52px] flex justify-center">
      <div className="flex">
        &copy;{" " + year + " "} Publshed by{"    "}
        <a
          href="https://beonanotherplanet.com"
          target="_blank"
          rel="noreferrer"
          className="mx-1"
        >
          {" "}
          Seungha Kim.
        </a>
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
