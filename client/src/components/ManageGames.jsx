import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer
} from '@mui/x-data-grid';
import * as api from '../services/api';
import { Typography } from '@mui/material';

function EditToolbar(props) {
  const { setLiveGames, setRowModesModel } = props;
  console.log('edit toolbar props', props);

  const handleClick = () => {
    const id = ' ';
    setLiveGames(oldRows => [
      ...oldRows,
      {
        id: ' ',
        homeTeam: '',
        foreignTeam: '',
        homeScore: '',
        foreignScore: ''
      }
    ]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'homeTeam' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        ADD GAME
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired
};

export function ManageGames() {
  const [liveGames, setLiveGames] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const teams = React.useRef(null);

  function getValidTeams(currentTeam, exclude) {
    if (!teams.current) {
      return [];
    }
    const usedTeams = [];
    liveGames.forEach(g => {
      usedTeams.push(g.foreignTeam);
      usedTeams.push(g.homeTeam);
    });

    const validTeams = teams.current.filter(t => !usedTeams.includes(t));
    validTeams.push(currentTeam);
    return validTeams;
  }

  const fetchData = async () => {
    const _liveGames = await api.getLiveGames();
    setLiveGames(_liveGames);
  };

  useEffect(() => {
    fetchData().catch(console.error);
    api.getTeams().then(data => {
      teams.current = data.map(t => t.name);
    });
  }, []);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleEndGameClick = id => () => {
    const gameToEnd = liveGames.find(game => game.id === id);
    api.updateGame({ ...gameToEnd, live: false }).then(() => {
      const updatedGames = liveGames.filter(game => game.id !== id);
      setLiveGames(updatedGames);
    });
  };

  const handleCancelClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = liveGames.find(row => row.id === id);
    if (editedRow.id === ' ') {
      setLiveGames(liveGames.filter(row => row.id !== id));
    }
  };

  const processRowUpdate = async newRow => {
    if (newRow.id === ' ') {
      newRow.live = true;
      const addedGame = await api.addGame(newRow);
      const updated = liveGames.filter(game => game.id !== ' ');
      updated.push(addedGame);
      setLiveGames(updated);
    } else {
      await api.updateGame(newRow);
    }
  };

  const columns = [
    {
      field: 'homeTeam',
      headerName: 'Home Team',
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: ({ row }) => getValidTeams(row.homeTeam)
    },
    {
      field: 'foreignTeam',
      headerName: 'Foreign Team',
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: ({ row }) => {
        return getValidTeams(row.foreignTeam);
      }
    },
    {
      field: 'homeScore',
      headerName: 'Home Score',
      type: 'number',
      flex: 1,
      editable: true
    },
    {
      field: 'foreignScore',
      headerName: 'Foreign Score',
      type: 'number',
      flex: 1,
      editable: true
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            title={'Edit game'}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            title={'End game'}
            icon={<DoneOutlineIcon />}
            label="Delete"
            onClick={handleEndGameClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  return (
    <Box>
      <Box
        mt={3}
        sx={{
          height: 500,
          display: 'flex',
          '& .actions': {
            color: 'text.secondary'
          },
          '& .textPrimary': {
            color: 'text.primary'
          }
        }}
      >
        <DataGrid
          rows={liveGames}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={newModel => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={{
            Toolbar: EditToolbar
          }}
          componentsProps={{
            toolbar: { setLiveGames, setRowModesModel }
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
}
