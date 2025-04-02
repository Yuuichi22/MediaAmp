const GameCard = ({name,background_image,desc,category}) => {
    return (
        <div>
        <div>
            <img src={background_image} alt="" />
        </div>
        <div>
            <div>{name}</div>
            <div>{desc}</div>
            <div>{category}</div>
        </div>
        </div>
     
    )

}

export default GameCard