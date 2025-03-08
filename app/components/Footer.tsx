const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full h-[52px] flex justify-center">
      <div className="flex">
        &copy;{year} Powered By Seungha Kim. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
