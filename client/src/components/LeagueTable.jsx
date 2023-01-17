import React from 'react';
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

const LeagueTable = props => {
  const cellHeaders = [
    { name: 'Team' },
    { name: 'Played' },
    { name: 'Won' },
    { name: 'Draw' },
    { name: 'Lost' },
    { name: 'For' },
    { name: 'Against' },
    { name: 'GD' },
    { name: 'Points' }
  ];

  return (
    <>
      {props.leagues.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <>
                  {cellHeaders.map(({ name }, index) => (
                    <TableCell key={index} align="center">
                      {name}
                    </TableCell>
                  ))}
                </>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.leagues.map(
                (
                  {
                    teamName,
                    wins,
                    losses,
                    gamesPlayed,
                    draws,
                    goalsFor,
                    goalsAgainst,
                    goalsDiff,
                    points
                  },
                  index
                ) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <span>{teamName}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{gamesPlayed}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{wins}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{draws}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{losses}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{goalsFor}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{goalsAgainst}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{goalsDiff}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{points}</span>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert sx={{ marginTop: 5 }} severity="warning">
          Nothing to show
        </Alert>
      )}
    </>
  );
};

export default LeagueTable;
