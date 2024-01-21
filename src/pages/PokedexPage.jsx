import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import useFecth from "../hooks/useFecth"
import PokeCard from "../components/PokemonPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')

  const trainerName = useSelector(states => states.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
  const [ pokemons, getPokemons ] = useFecth(url)

  useEffect(() => {
    getPokemons()
  }, [])

  const inputName = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputName.current.value.trim().toLowerCase())
  }

  console.log(pokemons)

  const cdFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)

  return (
    <div>
      <h2>Hi <span>{trainerName}</span>, here you can find your favorite pokemon</h2>
      <form onSubmit={handleSearch}>
        <SelectType />
        <input ref={inputName} type="text" />
        <button>Search</button>
      </form>
      <div>
        {
          pokemons?.results.filter(cdFilter).map(pokeInfo => (
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