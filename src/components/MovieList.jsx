import MovieCard from './MovieCard';

const MovieList = ({ data }) => {
  return (
    <section>
      <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4 justify-items-center '>
        {data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
