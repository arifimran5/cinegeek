import { Link } from 'react-router-dom';

const MovieList = ({ data }) => {
  return (
    <section>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center '>
        {data.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className='w-[70%] sm:w-full'
          >
            <article className='p-4 bg-gradient-to-b from-orange-200/20 to-accent/30 rounded-lg'>
              <div className='shadow-lg overflow-hidden cursor-pointer'>
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
                    />
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className='rounded-lg object-cover hover:scale-105 transition-transform duration-200 ease-out'
                    />
                  </picture>
                )}
              </div>
              <div className='w-full pt-4 text-center '>
                <h1 className='title-font text-sm font-bold text-primary_light '>
                  {movie.title}
                </h1>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MovieList;
