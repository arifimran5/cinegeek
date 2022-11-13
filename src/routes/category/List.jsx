import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Form } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import MovieList from '../../components/MovieList';

export async function action({ params }) {
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

export async function loader({ params, request }) {
  let { id: categoryId, page } = params;
  categoryId = categoryId ? categoryId : 'popular';

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/movie/${categoryId}?page=${page}&api_key=${
      import.meta.env.VITE_TMDB_API
    }`;

    const res = await fetch(url);
    return await res.json();
  };
  return fetchData();
}

const List = () => {
  const { id: categoryId, page } = useParams();

  const navigate = useNavigate();
  const data = useLoaderData();

  useEffect(() => {
    if (!categoryId || !page) {
      navigate('/category/popular/1');
    }
  }, [categoryId]);

  return (
    <div>
      <h1 className='capitalize text-3xl sm:text-4xl font-bold my-5 sm:my-8 md:mt-12 lg:mt-16'>
        {categoryId} Movies
      </h1>
      <MovieList data={data.results} />

      <div className='flex justify-end items-center space-x-2 sm:space-x-6 pb-4 pt-6'>
        <Form action={`/category/${categoryId}/${page * 1 - 1}`} method='post'>
          <button
            className={`px-5 py-2 bg-gray-100 text-primary_dark rounded-md ${
              page == 1 ? 'bg-gray-400 cursor-not-allowed' : ''
            } `}
            disabled={page == 1}
          >
            Prev
          </button>
        </Form>

        <Form action={`/category/${categoryId}/${page * 1 + 1}`} method='post'>
          <button
            className={`px-5 py-2 bg-accent text-primary_light rounded-md ${
              page == 500
                ? 'bg-gray-400 text-primary_dark cursor-not-allowed'
                : ''
            } `}
            disabled={page == 500}
          >
            Next
          </button>
        </Form>
      </div>
    </div>
  );
};

export default List;