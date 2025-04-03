import { use, useEffect, useState } from "react";
import { getListOfGames } from "../service/gamesService";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Menu = () => {
    const {page} = useParams()
    const dispatch = useDispatch()
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedGenres,setSelectedGenres] = useState([])
  const [orderBy,setOrderBy] = useState("")
  const [tags, setTags] = useState([
    { name: "SinglePlayer", isSelected: false },
    { name: "Multiplayer", isSelected: false },
    { name: "RPG", isSelected: false },
    { name: "Steam Achievements", isSelected: false },
    { name: "Steam Cloud", isSelected: false },
    { name: "Co-op", isSelected: false },
    { name: "Atmospheric", isSelected: false },
  ]);


  const [genres,setGenres] = useState([{
    name : "Action",
    isSelected : false
  },{
    name : "Adventure",
    isSelected : false
  },{
    name : "Indie",
    isSelected : false
  },{
    name : "Shooter",
    isSelected : false
  },{
    name : "Puzzle",
    isSelected : false
  },{
    name : "Simulation",
    isSelected : false
  },
  {
    name : "Casual",
    isSelected : false
  },
  {
    name : "Arcade",
    isSelected : false
  },
  {
    name : "Racing",
    isSelected : false
  },
  {
    name : "Fighting",
    isSelected : false
  },
  {
    name : "Board Games",
    isSelected : false
  }])
  const toggleSelection = (index, items, setItems, selectedItems, setSelectedItems) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  
    setSelectedItems((prev) => {
      const itemName = items[index].name;
      if (items[index].isSelected) {
        return prev.filter((item) => item !== itemName.toLowerCase());
      } else {
        return [...prev, itemName.toLowerCase()];
      }
    });
  };
  useEffect(() => {
        getListOfGames(dispatch,selectedGenres,selectedTags,page,orderBy)
  },[selectedGenres,selectedTags,page,orderBy])

  return (
    <div
      className="d-flex flex-column justify-content-evenly px-2 "
      style={{ height: "calc(100vh - 200px)" }}
    >
      <div>
        <h5>Filters</h5>
      </div>
      <div className="input-group gap-2">
        <span>Order By</span>
        <select value ={orderBy} onChange={(e) => setOrderBy(e.target.value)} className="rounded">
        <option value="">Choose...</option>
          <option value="released">Release Date</option>
          <option value = "rating">Popularity</option>
        </select>
      </div>
      <div>
        <span className="px-2">Tags</span>
        <div className="d-flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <div
              key={index}
              className={`rounded-pill px-2 ${
                tag.isSelected ? "bg-black text-white" : "bg-light"
              }`}
              onClick={() => toggleSelection(index, tags, setTags, selectedTags, setSelectedTags)}
              style={{ cursor: "pointer" }}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        <span className="px-2">Categories</span>
        <div className="d-flex flex-wrap gap-1">
          {genres.map((genre, index) => (
            <div key={index} className={`rounded-pill px-2 ${
                genre.isSelected ? "bg-black text-white" : "bg-light"
              }`} onClick={() => toggleSelection(index, genres, setGenres, selectedGenres, setSelectedGenres)}>
              {genre.name}
            </div>
          ))}
        </div>
      </div>
  
    </div>
  );
};

export default Menu;
