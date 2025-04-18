import { useState, useEffect } from "react";
import { searchGame } from "../service/gamesService";
import { Search,Library,X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeSearch, toggleSearch } from "../app/features/search/searchSlice";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton,SignOutButton } from "@clerk/clerk-react";
import { Button } from "react-bootstrap";
import { resetLibrary } from "../app/features/library/librarySlice";
const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearching = useSelector(state => state.search.isSearching)
  useEffect(() => {
     /*used deepseek here for top the body scroll behavior  */
    if (isSearching) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isSearching]);



  return (
    <div className="d-flex justify-content-around px-md-4 py-4 align-items-center position-fixed w-100 oveflow-x-hidden">
      <div className="fw-bolder fs-5" onClick={() => navigate('/')}>RAWG</div>
     
      <SignedOut>
        <SignInButton>
          <Button variant="dark" className="rounded-pill">Sign in</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
      <div>
        <button className="border-0 bg-transparent" onClick={() => dispatch(toggleSearch())}>
        {  !isSearching ? <Search /> :  <X />}
        </button>
      </div>
      <div className="d-flex align-items-center gap-md-1" onClick={() => navigate('/library')}>
        <Library />
      <span>Library</span></div>
      <SignOutButton onClick={() => dispatch(resetLibrary())}>
      <button style={{border:"none",background:"none"}}>Logout</button>
      </SignOutButton>
      </SignedIn>
     
      <SearchComponent isSearching = {isSearching}/>
     
    </div>
  );
};

export default Header;


const SearchComponent = ({isSearching}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
       <div key={index} className="d-flex align-items-center justify-content-between border-bottom p-2" onClick={() => {
        dispatch(closeSearch())
        navigate(`/games/${game.id}`)}}>
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