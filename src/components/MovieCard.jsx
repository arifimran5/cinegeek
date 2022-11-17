import React from 'react';
import { Link, useNavigation } from 'react-router-dom';
import { IoIosStats } from 'react-icons/io';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie?id=${movie.id}&page=1`} key={movie.id} className=''>
      <article className='p-4 bg-gradient-to-b from-orange-200/20 to-accent/30 rounded-lg max-w-[18em]'>
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
                className='max-w-full mx-auto rounded-lg hover:scale-105 transition-transform duration-200 ease-out'
              />
            </picture>
          )}
        </div>
        <div className='w-full pt-4'>
          <h1 className='title-font text-sm font-semibold text-primary_light '>
            {movie.title}
          </h1>
          {/* add vote average of movie*/}
          <div className='flex flex-col xs:flex-row xs:items-center xs:justify-between mt-2'>
            <div className=' flex items-center gap-2 text-gray-400 text-xs'>
              <IoIosStats />
              {movie.vote_average} / 10
            </div>
            <p className='text-xs text-gray-400'>{movie.release_date}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
