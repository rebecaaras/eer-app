import './App.css'
import { ExchangeRateChart } from './components/ExchangeRateChart';
import ChartFiltersCard from './components/ChartFiltersCard';
import { ApiContext } from './context/apiContext';
import { useContext, useState } from 'react';
import type { ChartDataPoint } from './types';

export default function App() {
  const {isLoading} = useContext(ApiContext);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [seriesKeys, setSeriesKeys] = useState<string[]>([]);

  if (isLoading) {
    return(
      <div className="flex flex-col h-screen">
        <div className='flex flex-row p-8 h-full'>
          <p>Loading...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row p-8 h-full">
        <ChartFiltersCard
          onFilterChange={(data, keys) => {
            setChartData(data);
            setSeriesKeys(keys);
          }}
        />
        <ExchangeRateChart data={chartData} seriesKeys={seriesKeys} />
      </div>
    </div>
  )
}