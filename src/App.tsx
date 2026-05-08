import './App.css'
import { ExchangeRateChart } from './components/ExchangeRateChart';
import Navbar from './components/NavBar';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar/>
      <div className="items-center justify-center m-10">
        <ExchangeRateChart />
      </div>
    </div>
  )
}

export default App;