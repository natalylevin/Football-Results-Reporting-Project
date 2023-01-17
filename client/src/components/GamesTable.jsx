import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import * as api from '../services/api';
import { Alert } from '@mui/material';
import {useState, useEffect} from "react";

const columns = [
  { field: 'session', headerName: '#', width: 90 },
  {
    field: 'homeTeam',
    headerName: 'Home Team',
    width: 150,
    editable: true
  },
  {
    field: 'foreignTeam',
    headerName: 'Foreign Team',
    width: 150,
    editable: true
  },
  {
    field: 'homeScore',
    headerName: 'Home Score',
    type: 'number',
    width: 110,
    editable: true
  },
  {
    field: 'foreignScore',
    headerName: 'Foreign Score',
    type: 'number',
    width: 110,
    editable: true
  }
];

export function GamesTable() {
  const [liveGames, setLiveGames] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const _liveGames = await api.getLiveGames();
      setLiveGames(_liveGames);
    };

    fetchData().catch(console.error);
    // let intervalId = setInterval(() => fetchData().catch(console.error), 2000);
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {liveGames ? (
        <Box sx={{ height: 400, width: '100%' }} mt={5}>
          <DataGrid
            rows={liveGames}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      ) : (
        <Alert sx={{ marginTop: 5 }} severity="warning">
          No live games yet
        </Alert>
      )}
    </>
  );
}
