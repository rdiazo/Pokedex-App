import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import useFecth from "../hooks/useFecth"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import './styles/PokedexPage.css'
import { current } from "@reduxjs/toolkit"


const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')
  const trainerName = useSelector(states => states.trainer)
  const url = `https://pokeapi.co/api/v2/pokemon?limit=500&offset=1`
  const [pokemons, getPokemons, getTypePokemon] = useFecth(url)
 
  useEffect(() => {
    if (typeSelected === 'allPokemons') {
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

 //const cdFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)
 //const cdFilter = (pokeInfo) => pokemons?.results.filter(pokeInfo => pokeInfo.name.includes(inputValue))
 const pokeFiltered = pokemons?.results.filter(pokeInfo => pokeInfo.name.includes(inputValue))

  const [currentPage, setCurrentPage] = useState(1)
  const pokemonsPerPage = 12

  const lastIndex = pokemonsPerPage * currentPage
  const firstIndex = lastIndex - pokemonsPerPage

  const pokemonsPaginated = pokemons?.results.length


  return (

    <div className="pokedexpage">
      <div className="pokedexpage__img__container">
        <img className="pokedexpage__img" src="/headerPoke.png" alt="" />
        <img className="pokedexpage__img__name" src="/pokedex.png" alt="" />
      </div>
      <h2 className="pokedexpage__title"><span className="pokedexpage__span__trainer">Hi {trainerName}</span>, here you can find your favorite pokemon</h2>
      <form className="pokedexpage__form" onSubmit={handleSearch}>

        <input className="pokedexpage__input" ref={inputName} type="text" placeholder="Look for your favorite pokemon" />
        <button className="pokedexpage__button" >Search</button>
        <SelectType setTypeSelected={setTypeSelected} />
      </form>
      <div className="pokedex__card">
        {
          pokeFiltered?.slice(firstIndex, lastIndex, pokemonsPaginated).map(pokeInfo => (
            <PokeCard
              key={pokeInfo.url}
              url={pokeInfo.url}
            />
          ))
        }
      </div >
            <div className='pokedexpage__pagination'>
              {
                 <button className='btn__last' onClick={() => setCurrentPage (currentPage - 1)}>Previus</button>
              }
                 <p>{currentPage} de {Math.floor(pokemonsPaginated/12)}</p> 
                <button className='pokedexpage__pagination__next' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
    </div>
  )
}

export default PokedexPage