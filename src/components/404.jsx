import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-screen grid place-content-center text-white  '>
      <h1 className='text-4xl'>404 Not Found</h1>
      <Link
        to={'/'}
        className=' mt-5 px-6 py-2 bg-accent rounded-md w-max text-2xl'
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
