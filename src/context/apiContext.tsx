import { createContext, useEffect, useState } from "react";
import axios from "axios"
import type { ApiContextType } from "../types";

//Come up with a better name
export const ApiContext = createContext<ApiContextType | undefined>(
  {seriesItems: [], isLoading: false}
);

export default function ApiContextProvider({children}){
  const [seriesItems, setseriesItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchSeries(){
      try {
        const res = await axios.get("http://127.0.0.1:3000/series");
        setseriesItems(res.data);

      } catch (error) {
        console.log(error)
        setseriesItems([]);

      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSeries();
  }, []);

  return (
   <ApiContext.Provider value = {{seriesItems, isLoading}}>
     {children}
   </ApiContext.Provider>
  )
}
