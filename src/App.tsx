import './App.css'
import { ExchangeRateChart } from './components/ExchangeRateChart';
import Navbar from './components/NavBar';
import ChartFiltersCard from './components/ChartFiltersCard';
import { useEffect, useState } from 'react';
import type { Series } from './types';

function App() {
  const [series, setSeries] = useState<Series[] | undefined>([]);

  useEffect(() => {
    fetchSeriesData();
  }, []);
  
  const fetchSeriesData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/series');
      const data = await response.json();
      setSeries(data)
      console.log(data)
    } catch (error) {
      console.error("seriesData couldn't be fetched.", error)
    }
  }

  return (
  <div className="flex flex-col h-screen">
    <Navbar/>
    {series && series.length > 0 &&  (
      <div className="flex flex-row p-8 h-full">
        <ChartFiltersCard data={series}/>
        <ExchangeRateChart />
      </div>
    )} 
  </div>  
  )
}

export default App;