import { useState, useEffect } from "react";
import { searchGame } from "../service/gamesService";
import { Search,Library,X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "../app/features/Search/searchSlice";

const Header = () => {
  const dispatch = useDispatch()
  const isSearching = useSelector(state => state.search.isSearching)
  useEffect(() => {
     /*used deepseek here for top the body scroll behavior  */
    if (isSearching) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearching]);



  return (
    <div className="d-flex justify-content-around p-4 align-items-center position-fixed w-100">
      <div className="fw-bolder fs-5">RAWG</div>
      <div>
        <button className="border-0 bg-transparent" onClick={() => dispatch(toggleSearch())}>
        {  !isSearching ? <Search /> :  <X />}
        </button>
      </div>
      <div className="d-flex align-items-center gap-1">
        <Library />
      <span>Library</span></div>
      <SearchComponent isSearching = {isSearching}/>
     
    </div>
  );
};

export default Header;


const SearchComponent = ({isSearching}) => {
  const searchBoxStyles = {
    position: "fixed",
    top: "80px",
    left: "50%",
    borderRadius : "12px",
    backgroundColor : "aliceblue",
    transform: "translateX(-50%)",
    width: "90%", 
    padding: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "opacity 0.3s ease-in-out",
    opacity: isSearching ? 1 : 0,
    pointerEvents: isSearching ? "auto" : "none",
    overflow : "auto"
  };
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query) {
        setLoading(true);
        const data = await searchGame(query);
        setSearchResults(data.results || []);
        setLoading(false);
      }
    }, 300); // Debounce time (300ms)

    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  return (
 <div style={searchBoxStyles} >
 <input
   type="text"
   value={query}
   onChange={(e) => setQuery(e.target.value)}
   className="form-control mb-2"
   placeholder="Search games..."
 />

 {/* Show Loading Indicator */}
 {loading && <div className="text-center">Loading...</div>}

 {/* Search Results */}
 <div  style={{ 
        overflowY: "auto",
        maxHeight: "70vh", 
        paddingRight: "8px"
      }}>
   {searchResults.length > 0 ? (
     searchResults.map((game, index) => (
       <div key={index} className="d-flex align-items-center justify-content-between border-bottom p-2">
         <div>{game.name}</div>
       </div>
     ))
   ) : (
     !loading && query && <div className="text-center">No results found.</div>
   )}
 </div>
  </div>
  )
}