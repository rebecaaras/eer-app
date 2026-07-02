import { createContext, useEffect, useState } from "react";
import axios from "axios"
import type { ApiContextType } from "../types";

//Come up with a better name
export const ApiContext = createContext<ApiContextType | undefined>({
  seriesItems: [], 
  filteredSeriesItems: [], 
  setFilteredSeriesItems: useState, 
  filters: {
    referenceAreas: [],
    seriesType: "",
    basket: "",
    startDate: null,
    endDate: null,
  }, 
  setFilters: useState, 
  isLoading: false
});

export default function ApiContextProvider({children}){
  const [seriesItems, setseriesItems] = useState([]);
  const [filteredSeriesItems, setFilteredSeriesItems] = useState(seriesItems);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    referenceAreas: [],
    seriesType: "",
    basket: "",
    startDate: null,
    endDate: null,
  });
  
  async function fetchSeriesItems(params?){
    try {
      const res = await axios.get("http://127.0.0.1:3000/series", {params: params});
      setseriesItems(res.data);

    } catch (error) {
      console.log(error)
      setseriesItems([]);

    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {    
    fetchSeriesItems();
  }, []);

  return (
   <ApiContext.Provider
      value = {{
        seriesItems,
        filteredSeriesItems,
        setFilteredSeriesItems,
        filters,
        setFilters,
        isLoading
      }}>
     {children}
   </ApiContext.Provider>
  )
}
