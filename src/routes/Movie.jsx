import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

export async function loader({ request, params }) {
  const { id } = params;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${
    import.meta.env.VITE_TMDB_API
  }`;
  const res = await fetch(url);
  return await res.json();
}

const Movie = () => {
  const movie = useLoaderData();

  console.log(movie);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='mt-4'>
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
      <h1 className='text-3xl mt-6'>{movie.title}</h1>
      <p className='mt-2 '>{movie.overview}</p>
    </div>
  );
};

export default Movie;
