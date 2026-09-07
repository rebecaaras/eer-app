import axios from "axios"
import type { SeriesDetail } from "../types"

export const API_BASE_URL = "http://127.0.0.1:3000"

export async function getSeriesById(id: number): Promise<SeriesDetail> {
  const res = await axios.get(`${API_BASE_URL}/series/${id}`)
  return res.data
}
