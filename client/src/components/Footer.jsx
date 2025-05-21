const Footer = () => {
  return (
    <footer className="p-4 flex justify-between text-center bg-white dark:bg-gray-900 dark:text-gray-300 shadow-md">
      <p className="text-sm sm:text-base">
        © {new Date().getFullYear()} Multi Role Authantication. All rights reserved.
      </p>
      <p className="text-sm sm:text-base flex items-center gap-2">
        Made by
        <a
          className="text-blue-500 font-semibold"
          href="https://whoisbunny.vercel.app/"
          target="_blank"
        >
          whoisbunny
        </a>
      </p>
    </footer>
  );
};

export default Footer;
