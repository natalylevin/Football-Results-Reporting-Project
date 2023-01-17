import React from 'react';
import { rowTableLeaguesSX } from './styles/common';
import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const ResultsTable = props => {
  const cellHeaders = [
    { name: 'Home Team' },
    { name: 'Foreign Team' },
    { name: 'Home Scores' },
    { name: 'Foreign Scores' }
  ];

  const GREEN = 'rgba(3,107,68,0.87)';
  const YELLOW = 'rgb(140,145,34)';
  const RED = 'rgb(138,30,49)';

  let whoWon = function (homeScore, foreignScore) {
    if (homeScore > foreignScore) {
      return 'homeWon';
    }

    if (homeScore < foreignScore) {
      return 'homeLost';
    }

    return 'even';
  };

  return (
    <>
      {props.games.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {
                  <>
                    {cellHeaders.map(({ name }, index) => (
                      <TableCell key={index} align="center">
                        {name}
                      </TableCell>
                    ))}
                  </>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {props.games.map(game => {
                const status = whoWon(game.homeScore, game.foreignScore);
                const homeWon = status === 'homeWon';
                const homeLost = status === 'homeLost';
                return (
                  <TableRow sx={rowTableLeaguesSX} key={game.id}>
                    <TableCell align="center">
                      <span
                        style={{
                          color: homeWon ? GREEN : homeLost ? RED : YELLOW
                        }}
                      >
                        {game.homeTeam}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          color: homeWon ? RED : homeLost ? GREEN : YELLOW
                        }}
                      >
                        {game.foreignTeam}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{game.homeScore}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{game.foreignScore}</span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert sx={{ marginTop: 5 }} severity="warning">
          No live games yet
        </Alert>
      )}
    </>
  );
};

export default ResultsTable;
