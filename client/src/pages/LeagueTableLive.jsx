import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import LeagueTable from '../components/LeagueTable';

const LeagueTableLive = () => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const leagueTable = await api.getLeagueTable(true);
      setTableData(leagueTable);
    };

    fetchData().catch(console.error);

    const interval = setInterval(() => {
      fetchData().catch(console.error);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{tableData && <LeagueTable leagues={tableData} />}</div>;
};

export default LeagueTableLive;
