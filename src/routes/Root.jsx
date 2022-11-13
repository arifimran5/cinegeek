import { Outlet } from 'react-router-dom';
import Wrapper from '../components/layout/Wrapper';

export default function Root() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
