import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Form, useSearchParams } from 'react-router-dom';
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

export async function loader({ request }) {
  // get url search params from request.url
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  let page = searchParams.get('page') || 1;
  let category = searchParams.get('category') || 'popular';

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/movie/${category}?page=${page}&api_key=${
      import.meta.env.VITE_TMDB_API
    }`;

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

  useEffect(() => {
    if (!category || !page) {
      navigate('/?category=popular&page=1');
    }
  }, [searchParams]);

  const handleNextPage = () => {
    navigate(`/?category=${category}&page=${page * 1 + 1}`);
  };
  const handlePrevPage = () => {
    navigate(`/?category=${category}&page=${page * 1 - 1}`);
  };

  if (category === 'now_playing') {
    category = 'Now Playing';
  }

  return (
    <div>
      <h1 className='capitalize text-2xl sm:text-3xl font-bold my-5 sm:my-8 md:mt-12 lg:mt-16'>
        {category} Movies
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