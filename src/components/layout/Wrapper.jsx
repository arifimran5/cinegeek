import { NavLink } from 'react-router-dom';
import Dropdown from '../Dropdown';

const movieOptions = [
  { title: 'Popular', link: '/category/popular/1' },
  { title: 'Top Rated', link: '/category/top_rated/1' },
  { title: 'Upcoming', link: '/category/upcoming/1' },
  { title: 'Now Playing', link: '/category/now_playing/1' },
];

const Wrapper = ({ children }) => {
  return (
    <div className='bg-primary_dark text-primary_light'>
      <nav className='bg-accent px-4 sm:px-5 md:px-12 py-4 flex justify-between items-center'>
        <NavLink to={'/category/popular/1'}>
          <div className='text-2xl font-bold'>cinegeek</div>
        </NavLink>
        <div className='flex items-center space-x-3 md:space-x-6 text-sm sm:text-base'>
          <div>
            <Dropdown title='Movies' options={movieOptions} />
          </div>
          <div>TV Shows</div>
        </div>
      </nav>

      <main className='max-w-6xl mx-auto min-h-screen px-4 md:px-12 xl:px-0'>
        {children}
      </main>
    </div>
  );
};

export default Wrapper;
