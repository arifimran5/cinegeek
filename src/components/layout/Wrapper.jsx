import { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import { CgMenuLeft } from 'react-icons/cg';

const Wrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative bg-primary_dark'>
      <div
        className={`lg:hidden py-4 px-6 sticky top-0 left-0 right-0 bg-primary_dark border-b-[2px] border-gray-700/50 z-50 ${
          isOpen ? 'hidden' : ''
        }`}
      >
        <div className='text-white'>
          <button onClick={() => setIsOpen(true)} className='text-2xl'>
            <CgMenuLeft />
          </button>
        </div>
      </div>

      <div className='bg-primary_dark text-primary_light flex gap-5 relative'>
        <div
          className={`${
            isOpen ? 'translate-x-0' : '-translate-x-[110%]'
          } absolute lg:translate-x-0 lg:sticky lg:top-0 z-50 transition-all duration-300 ease-out`}
        >
          <SideBar handleClose={handleClose} isOpen={isOpen} />
        </div>

        <div
          onClick={handleClose}
          className={`absolute inset-0 bg-primary_dark/70 ${
            isOpen ? 'translate-x-0' : '-translate-x-[110%]'
          } transition-all duration-200 ease-out`}
        ></div>
        <main
          className={`min-h-screen px-4 md:px-12  ${
            isOpen ? 'max-h-screen overflow-hidden' : 'overflow-scroll'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Wrapper;
