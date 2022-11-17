import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Form, useFetcher, useSearchParams } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import MovieList from '../components/MovieList';

export async function action({ request }) {
  const { page, category } = request.query;
  console.log(page, category);
  // const { id: categoryId, page } = params;
  // const res = await fetch(
  //   `https://api.themoviedb.org/3/movie/${categoryId}?page=${page}&api_key=${
  //     import.meta.env.VITE_TMDB_API
  //   }`
  // );
  // const data = await res.json();
  // if (data && data.results) {
  //   return {
  //     title: `${categoryId} Movies`,
  //     component: <List />,
  //     loaderData: data,
  //   };
  // } else {
  //   return { redirect: '/' };
  // }
}

export async function loader({ request, params }) {
  // get url search params from request.url
  const { genre_id } = params;
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  let page = searchParams.get('page') || 1;
  let category = searchParams.get('category') || 'popular';

  const fetchData = async () => {
    let url;
    if (!genre_id) {
      url = `https://api.themoviedb.org/3/movie/${category}?page=${page}&api_key=${
        import.meta.env.VITE_TMDB_API
      }`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre_id}&page=${page}&api_key=${
        import.meta.env.VITE_TMDB_API
      }`;
    }
    const res = await fetch(url);
    return await res.json();
  };
  return fetchData();
}

const List = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [searchParams] = useSearchParams();
  let page = searchParams.get('page');
  let category = searchParams.get('category');
  let genreName = searchParams.get('name');

  const { genre_id } = useParams();

  useEffect(() => {
    if ((!genre_id && !category) || !page) {
      navigate('/?category=popular&page=1');
    }
    window.scrollTo(0, 0);
  }, [searchParams]);

  const handleNextPage = () => {
    if (genre_id) {
      navigate(
        `/genre/${genre_id}?name=${genreName}&page=${parseInt(page) + 1}`
      );
    } else {
      navigate(`/?category=${category}&page=${page * 1 + 1}`);
    }
  };
  const handlePrevPage = () => {
    if (genre_id) {
      navigate(
        `/genre/${genre_id}?name=${genreName}&page=${parseInt(page) - 1}`
      );
    } else {
      navigate(`/?category=${category}&page=${page * 1 - 1}`);
    }
  };

  if (!genreName) {
    if (category === 'now_playing') {
      category = 'Now Playing';
    } else if (category === 'top_rated') {
      category = 'Top Rated';
    }
  }

  return (
    <div>
      <h1 className='capitalize text-2xl sm:text-3xl font-bold my-6 lg:mt-8'>
        {genreName ? genreName : category}{' '}
        <span className='block font-light text-base'>Movies</span>
      </h1>

      <MovieList data={data.results} category={category} />

      <div className='flex justify-end items-center space-x-2 sm:space-x-6 pb-4 pt-6 font-semibold '>
        <button
          onClick={handlePrevPage}
          className={`px-5 py-2 bg-gray-100  text-primary_dark rounded-md ${
            page == 1 ? 'bg-gray-400 cursor-not-allowed' : ''
          } `}
          disabled={page == 1}
        >
          Prev
        </button>

        <button
          onClick={handleNextPage}
          className={`px-5 py-2 bg-accent text-primary_light rounded-md ${
            page == 500
              ? 'bg-gray-400 text-primary_dark cursor-not-allowed'
              : ''
          } `}
          disabled={page == 500}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
