import './App.css'
import { ExchangeRateChart } from './components/ExchangeRateChart';
import Navbar from './components/NavBar';
import ChartFiltersCard from './components/ChartFiltersCard';

function App() {
  return (
  <div className="flex flex-col">
  <Navbar/>
  <div className="flex flex-row p-8 h-full">
    <ChartFiltersCard/>
    <ExchangeRateChart />
  </div>
  </div>  
  )
}

export default App;