import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TopNav from './TopNav';
import LeagueTableScreen from '../pages/LeagueTableScreen';
import LeagueTableLive from '../pages/LeagueTableLive';
import { Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './LoginForm';
import LiveResults from '../pages/LiveResults';
import { useAppContext } from '../hooks';
import { ManageGames } from './ManageGames';

const AppContainer = () => {
  const [state, setState] = useAppContext();
  const { isLogged } = state;

  return isLogged ? (
    <>
      <ToastContainer />
      <TopNav />
      <Container>
        <Routes>
          <Route path={'/'} element={<LiveResults />} />
          <Route path={'/league-table'} element={<LeagueTableScreen />} />
          <Route path={'/league-table-live'} element={<LeagueTableLive />} />
          <Route path={'/games'} element={<ManageGames />} />
        </Routes>
      </Container>
    </>
  ) : (
    <>
      <ToastContainer />
      <LoginForm
        onToken={() =>
          setState({
            ...state,
            isLogged: true
          })
        }
      />{' '}
    </>
  );
};

export default AppContainer;