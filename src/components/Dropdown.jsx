import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useOnClickOutside } from '../hooks/useClickOutside';
export default function Dropdown({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const outerRef = useRef();
  useOnClickOutside(outerRef, handleClose);

  return (
    <div ref={outerRef} className='relative inline-block text-left dropdown'>
      <div className=''>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type='button'
          className='hover:border-b-2 hover:transition-all hover:duration-100'
          // className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded={isOpen}
        >
          {title}
          {/* Heroicon name: solid/chevron-down */}
          {/* <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg> */}
        </button>
        {isOpen && <DropdownOptions options={options} onClose={handleClose} />}
      </div>
    </div>
  );
}

const DropdownOptions = ({ options, onClose }) => {
  return (
    <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[999] '>
      <div
        className='py-1'
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='options-menu'
        onClick={onClose}
      >
        {options.map((option) => (
          <NavLink
            key={option.title}
            to={option.link}
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            role='menuitem'
          >
            {option.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
