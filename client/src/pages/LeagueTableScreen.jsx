import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import LeagueTable from '../components/LeagueTable';

const LeagueTableScreen = () => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const leagueTable = await api.getLeagueTable();
      setTableData(leagueTable);
    };

    fetchData().catch(console.error);
  }, []);

  return <div>{tableData && <LeagueTable leagues={tableData} />}</div>;
};

export default LeagueTableScreen;
