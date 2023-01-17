import React from 'react';
import { useEffect, useState } from 'react';
import * as api from '../services/api';
import ResultsTable from '../components/ResultsTable';

const LiveResults = props => {
  const [liveGames, setLiveGames] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const _liveGames = await api.getLiveGames();
      setLiveGames(_liveGames);
    };

    fetchData().catch(console.error);
    let intervalId = setInterval(() => fetchData().catch(console.error), 2000);
    return () => clearInterval(intervalId);
  }, []);

  return <>{liveGames && <ResultsTable games={liveGames} />}</>;
};

export default LiveResults;
