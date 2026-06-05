import './App.css'
import { ExchangeRateChart } from './components/ExchangeRateChart';
import ChartFiltersCard from './components/ChartFiltersCard';
import { ApiContext } from './context/apiContext';
import { useContext } from 'react';

export default function App() {
  const {isLoading} = useContext(ApiContext);

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
        <ChartFiltersCard/>
        <ExchangeRateChart />
      </div>
    </div>
  )
}