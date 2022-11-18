import React, { useEffect } from 'react';
import { BiCaretRightCircle } from 'react-icons/bi';
import { NavLink, useLoaderData } from 'react-router-dom';

export async function loader({ request, params }) {
  const searchUrl = new URL(request.url);
  const searchParams = searchUrl.searchParams;
  const id = searchParams.get('id');

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${
    import.meta.env.VITE_TMDB_API
  }`;
  const res = await fetch(url);
  return await res.json();
}

const Movie = () => {
  const movie = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex flex-col sm:flex-row sm:gap-4 sm:mt-2 md:mt-4 lg:mt-16 '>
      <section className='mx-auto grow md:min-w-[20em]'>
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
              className=''
            />
          </picture>
        )}
      </section>
      <div className='sm:max-w-sm lg:max-w-xl'>
        <section className='text-center sm:text-left'>
          <h1 className='text-2xl mt-2 sm:text-xl md:text-4xl lg:text-5xl'>
            {movie.title}
          </h1>
          <span className='text-gray-400 italic lg:text-lg'>
            "{movie.tagline}"
          </span>
          <div className='flex justify-between gap-6 text-primary_light/50 font-semibold'>
            <div>{movie.vote_average.toFixed(1)}/10</div>
            <div>
              <span>{movie.runtime} mins / </span>
              <span>{movie.release_date.split('-')[0]}</span>
            </div>
          </div>
        </section>
        <section className='self-start mt-4'>
          <h2 className='text-lg sm:text-xl lg:text-2xl'>Genres</h2>
          <ul className='flex flex-wrap gap-3'>
            {movie.genres.map((genre) => (
              <li className='text-orange-400' key={genre.id}>
                <NavLink to={`/genre/${genre.id}?name=${genre.name}&page=1`}>
                  <span className='flex items-center gap-1'>
                    <BiCaretRightCircle />
                    {genre.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <section className='mt-4'>
          <h2 className='text-lg sm:text-xl lg:text-2xl'>The synopsis</h2>
          <p className='text-sm sm:text-base text-gray-400 lg:text-lg'>
            {movie.overview}
          </p>
        </section>

        <section className='mt-4'>
          <button className='bg-accent py-1 px-4 rounded-md'>
            <a
              target='_blank'
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
            >
              IMDB
            </a>
          </button>
        </section>
      </div>
    </div>
  );
};

export default Movie;
