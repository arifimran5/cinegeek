import SideBar from './SideBar';

const Wrapper = ({ children }) => {
  return (
    <div className='bg-primary_dark text-primary_light flex gap-5'>
      <SideBar />

      <main className='min-h-screen px-4 md:px-12 overflow-scroll'>
        {children}
      </main>
    </div>
  );
};

export default Wrapper;
