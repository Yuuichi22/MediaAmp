import { fetchGames, setErrors, setGames } from "../app/features/game/gameSlice";

const BASE_URL = import.meta.env.VITE_RAWG_BASE_URI
const API_KEY = import.meta.env.VITE_RAWG_API_KEY


export const searchGame = async (searchInput) => {
    const params = new URLSearchParams({ key : API_KEY,search: searchInput });
    const res = await fetch(`${BASE_URL}/games?${params}`)
    if(res.ok)
   {
    const data = await res.json()
    return data
   }
    return null
}

export const getGameInfo = async (id) => {
    const params = new URLSearchParams({ key : API_KEY});
    const res = await fetch(`${BASE_URL}/games/${id}?${params}`)
    if(res.ok) {
        const data = await res.json();
//console.log(data)
        return data;
    }
    return null;
}
export const getListOfGames = async (dispatch, genres, tags,page,orderBy) => {
    const params = new URLSearchParams({ key: API_KEY,page : page});
    if (genres.length > 0) {
      params.append('genres', genres.join(','));
    }
    if (tags.length > 0) {
      params.append('tags', tags.join(','));
    }
    if(orderBy) params.append('ordering',`-${orderBy}`)
    try {
      dispatch(fetchGames()); 
      
      const res = await fetch(`${BASE_URL}/games?${params.toString()}`);
      
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      
      const { results } = await res.json();
      dispatch(setGames(results));
      return results; 
      
    } catch (error) {
      console.error("Error fetching games:", error);
      dispatch(setErrors(error.message));
       
    }
  };