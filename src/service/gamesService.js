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
        return data;
    }
    return null;
}