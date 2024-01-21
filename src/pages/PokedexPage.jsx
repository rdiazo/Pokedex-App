import { useEffect } from "react"
import { useSelector } from "react-redux"
import useFecth from "../hooks/useFecth"
import PokeCard from "../components/PokemonPage/PokeCard"

const PokedexPage = () => {

  const trainerName = useSelector(states => states.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
  const [ pokemons, getPokemons ] = useFecth(url)

  useEffect(() => {
    getPokemons()
  }, [])

  return (
    <div>
      <h2>Hi <span>{trainerName}</span>, here you can find your favorite pokemon</h2>
      <div>
        {
          pokemons?.results.map(pokeInfo => (
            <PokeCard 
              key={pokeInfo.url}
              url={pokeInfo.url}
            />
          ))
        }
      </div>
    </div>
  )
}

export default PokedexPage