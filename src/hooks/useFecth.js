import axios from "axios"
import { useState } from "react"

const useFecth = url => {

    const [response, setResponse] = useState()

    const getApi = () => {
        axios.get(url) //logica de carga de pantalla y errores por hacer
        .then(res => setResponse(res.data))
        .catch(err => console.log(err))
    }

    const getTypePokemon = (urlType) => {
        axios.get(urlType) 
        .then(res => {
            const obj = {
                results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
            }
            setResponse(obj)
        })
        .catch(err => console.log(err))
    }

    return [ response, getApi, getTypePokemon ]
}

export default useFecth