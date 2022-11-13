import { Link } from 'react-router-dom';

const MovieList = ({ data }) => {
  return (
    <section>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center '>
        {data.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className='w-[70%] sm:w-full'
          >
            <div className='bg-secondary_dark  rounded-lg shadow-lg overflow-hidden relative cursor-pointer'>
              {!movie.poster_path && (
                <img
                  className='h-full'
                  src='https://via.placeholder.com/300.png/?text=%22Not%20found%22'
                  alt='Not found'
                />
              )}
              {movie.poster_path && (
                <picture>
                  <source
                    srcSet={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    media='(min-width: 640px)'
                    className='w-full object-cover object-center '
                  />
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className='w-full h-full object-cover hover:scale-105 transition-transform duration-200 ease-out'
                  />
                </picture>
              )}
              {/* <img
                className='w-full object-cover object-center hover:scale-105 transition-transform duration-200 ease-out'
                src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                alt={movie.title}
              /> */}
              <div className='backdrop-blur-[2px] w-full py-4 px-6 absolute bottom-0 left-0 bg-primary_dark/10'>
                {/* <h2 className='tracking-widest text-xs title-font font-medium text-gray-50 mb-1'>
              {movie.release_date}
            </h2> */}
                <h1 className='title-font text-lg font-bold text-primary_light '>
                  {movie.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MovieList;
