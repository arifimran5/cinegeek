import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { BiStats, BiTimer, BiCaretRightCircle } from 'react-icons/bi';

const movieOptions = [
  {
    title: 'Popular',
    category: 'popular',
    link: '/?category=popular&page=1',
    icon: <AiFillHeart />,
  },
  {
    title: 'Top Rated',
    category: 'top_rated',
    link: '/?category=top_rated&page=1',
    icon: <BiStats />,
  },
  {
    title: 'Upcoming',
    category: 'upcoming',
    link: '/?category=upcoming&page=1',
    icon: <BiTimer />,
  },
];

const SideBar = ({ isOpen, handleClose }) => {
  const [searchParams] = useSearchParams();
  let category = searchParams.get('category');

  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    //abbort controller
    const abortController = new AbortController();
    const fetchGenres = async () => {
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${
        import.meta.env.VITE_TMDB_API
      }`;
      const res = await fetch(url, { signal: abortController.signal });
      const data = await res.json();
      setGenres(data.genres);
      setIsLoading(false);
    };
    fetchGenres().catch((err) => {
      if (err.name === 'AbortError') {
        console.log('fetch aborted');
      } else {
        console.log(err);
      }
    });
    return () => abortController.abort();
  }, []);

  return (
    <aside
      className={`bg-accent flex flex-col min-w-[15em] xl:min-w-[18em] min-h-screen h-max sticky top-0 
      ${
        isOpen
          ? 'max-h-screen overflow-y-scroll overflow-x-hidden'
          : 'overflow-hidden'
      } `}
    >
      <div className='mx-auto my-12'>
        <NavLink onClick={handleClose} to={'/'}>
          <div>
            <img src='/logo.png' alt='Logo of cingeek' />
          </div>
        </NavLink>
      </div>
      <nav className='flex flex-col '>
        <h2 className='text-md font-bold mb-1 ml-2 pl-6 py-3 bg-primary_dark rounded-full -mr-6 shadow-lg'>
          Categories
        </h2>
        <div className='space-y-1 px-4 xl:px-6'>
          {movieOptions.map((option) => {
            const active = option.category === category;
            // console.log(active);
            return (
              <NavLink
                onClick={handleClose}
                key={option.title}
                to={option.link}
                data-active={active}
                className={`flex items-center gap-2 text-orange-300 py-1 px-6 hover:underline hover:rounded-2xl data-[active=true]:text-teal-500`}
              >
                {option.icon}
                {option.title}
              </NavLink>
            );
          })}
        </div>
        <div className='mt-2'>
          <h2 className='text-md font-bold mb-1 ml-2 pl-6 py-3 bg-primary_dark rounded-full -mr-6 shadow-lg'>
            Genres
          </h2>
          <div className='space-y-1 px-4 xl:px-6'>
            {!isLoading &&
              genres.map((genre) => {
                return (
                  <NavLink
                    onClick={handleClose}
                    key={genre.id}
                    to={`/genre/${genre.id}?page=1`}
                    className={`flex items-center gap-2 text-orange-300  py-1 px-6 hover:underline hover:rounded-2xl`}
                  >
                    <BiCaretRightCircle />
                    {genre.name}
                  </NavLink>
                );
              })}
          </div>
        </div>
      </nav>

      <div className='text-center my-4'>
        <h2 className='mx-auto p-3 text-orange-300 bg-violet-600 rounded-lg w-max hover:shadow-lg'>
          <a href='https://www.themoviedb.org/'>Powered by TMDB</a>
        </h2>
      </div>
    </aside>
  );
};

export default SideBar;
