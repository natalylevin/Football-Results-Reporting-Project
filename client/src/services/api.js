import axios from 'axios';

export const getTeams = () =>
  axios.get('/api/team/all').then(res => {
    return res.data;
  });

export const getLiveGames = () =>
  axios.get('/api/game/lives').then(res => {
    return res.data;
  });

export const getAllGames = () =>
  axios.get('/api/game/lives').then(res => {
    return res.data;
  });

export const updateGame = (game) => {
    return axios.put('/api/game', game).then( res => {
        return res.data;
    })
}

export const addGame = (game) => {
    return axios.post('/api/game', game).then( res => {
        return res.data;
    })
}

export const getLeagueTable = (includeLiveGames = false) => {
  let withLiveGames = includeLiveGames ? '?includeLive' : '';
  return axios.get('/api/game/leagueTable/' + withLiveGames).then(res => {
    return sortTableData(res.data);
  });
};

function sortTableData(data){
   return data.sort((t1,t2)=>{
        if (t1.points < t2.points) return 1;
        if (t1.points > t2.points) return -1;

        if (t1.goalsDiff < t2.goalsDiff) return 1;
        if (t1.goalsDiff > t2.goalsDiff) return -1;

        if (t1.teamName.toString().toLowerCase() > t2.teamName.toString().toLowerCase()) return 1;
        if (t1.teamName.toString().toLowerCase() < t2.teamName.toString().toLowerCase()) return -1;

        console.warn('Table data has duplicate team names');
        return 0;
    });
}
