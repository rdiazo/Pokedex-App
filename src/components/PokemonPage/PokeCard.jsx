import { useEffect } from "react"
import useFecth from "../../hooks/useFecth"

const PokeCard = ({ url }) => {

    const [ pokemon, getPokemon ] = useFecth(url)

    useEffect(() => {
        getPokemon()
    }, [])

    console.log(pokemon)

  return (
    <div>PokeCard</div>
  )
}

export default PokeCard