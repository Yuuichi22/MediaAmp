import { useEffect, useState } from "react"
import { getListOfGames } from "../service/gamesService"
import GameCard from "../components/GameCard"
import { Col, Container,Row } from "react-bootstrap"
import { useSelector } from "react-redux"

 const Main = () => {
    const {list,error,isLoading} = useSelector(state => state.games)
    console.log(list);
    return isLoading ? <h3 className="text-center">Loading...</h3> : (
        <Container>
            <Row>
              {list.map((game) => <GameCard {...game} />
            )}
            </Row>
        </Container>
        
     
    )
}

export default Main