import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import useFecth from "../hooks/useFecth"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')

  const trainerName = useSelector(states => states.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
  const [ pokemons, getPokemons, getTypePokemon ] = useFecth(url)

  useEffect(() => {
    if(typeSelected === 'allPokemons') {
      getPokemons()
    } else {
      getTypePokemon(typeSelected)
    }
    getPokemons()
  }, [typeSelected])

  const inputName = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputName.current.value.trim().toLowerCase())
  }

  const cdFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)

  return (
    <div className="pokedexpage">
      <h2>Hi <span>{trainerName}</span>, here you can find your favorite pokemon</h2>
      <form onSubmit={handleSearch}>
        
        <input ref={inputName} type="text" />
        <SelectType setTypeSelected={setTypeSelected}/>
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