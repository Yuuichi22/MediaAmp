import { fetchGames, setErrors, setGames } from "../app/features/Game/gameSlice";

const BASE_URL = import.meta.env.VITE_RAWG_BASE_URI
const API_KEY = import.meta.env.VITE_RAWG_API_KEY


export const searchGame = async (searchInput) => {
    const params = new URLSearchParams({ key : API_KEY,search: searchInput });
    const res = await fetch(`${BASE_URL}/games?${params}`)
   const data = await res.json()
    return data
}

export const getGameInfo = async (id) => {
    const params = new URLSearchParams({ key : API_KEY});
    const res = await fetch(`${BASE_URL}/games/${id}?${params}`)
    if(res.ok) {
        const data = await res.json();
        console.log(data)
        return data;
    }
    return null;
}
export const getListOfGames = async (dispatch, genres, tags,page,orderBy) => {
    const params = new URLSearchParams({ key: API_KEY,page : page});
    
    // Add genres if they exist
    if (genres.length > 0) {
      params.append('genres', genres.join(','));
    }
    
    // Add tags if they exist
    if (tags.length > 0) {
      params.append('tags', tags.join(','));
    }
    console.log("orderby",orderBy)
    if(orderBy) params.append('ordering',`-${orderBy}`)
    try {
      dispatch(fetchGames()); // Dispatch loading state
      console.log(BASE_URL+'/games?'+params.toString());
      
      const res = await fetch(`${BASE_URL}/games?${params.toString()}`);
      
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      
      const { results } = await res.json();
      dispatch(setGames(results)); // Dispatch success with data
      return results; // Return the results for potential use
      
    } catch (error) {
      console.error("Error fetching games:", error);
      dispatch(setErrors(error.message)); // Dispatch error state
       // Re-throw for component to handle if needed
    }
  };