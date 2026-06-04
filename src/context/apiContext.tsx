import { createContext, useEffect, useState } from "react";
import axios from "axios"
import type { Series } from "../types";

type ApiContextType = {
  seriesData: Series[];
  isLoading: boolean;
}

//Come up with a better name
export const ApiContext = createContext<ApiContextType | undefined>(
  {seriesData: [], isLoading: false}
);

export default function ApiContextProvider({children}){
  const [seriesData, setSeriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchSeries(){
      try {
        const res = await axios.get("http://127.0.0.1:3000/series");
        setSeriesData(res.data);

      } catch (error) {
        console.log(error)
        setSeriesData([]);

      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSeries();
  }, []);

  return (
   <ApiContext.Provider value = {{seriesData, isLoading}}>
     {children}
   </ApiContext.Provider>
  )
}
