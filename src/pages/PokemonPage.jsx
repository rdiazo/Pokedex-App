import { useParams } from "react-router-dom"
import useFecth from "../hooks/useFecth"
import { useEffect } from "react"
import './styles/PokemonPage.css'

const PokemonPage = () => {
  
  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [pokemon, getPokemon] = useFecth(url)

  useEffect(() => {
    getPokemon()
  }, [])

  console.log(pokemon)

  return (
    <div>
      <img className="pokemon__img__container" src="src\img\headerPoke.png" alt="" />
      <img className="pokemon__img__name" src="src\img\pokedex.png" alt="" />
      <div className='pokemon__box__back'>
        <a href='/#/pokedex' class="btn">Back</a>
      </div>
      <div className="pokemon__card">
        <div className="pokemen__card__card">
          <header className={`pokemon__header__img ${pokemon?.types[0].type.name}-gradient`}>
            <img className="pokemon__img__pokemon" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
          </header>
          <section className='pokemon__section'>
            <span className='pokemon__item'>
              <h3 className='pokemon__order'>{pokemon?.order}</h3>
            </span>
            <h2 className='pokemon__name__title'>{pokemon?.name}</h2>
            <ul className='pokemon__section__dimensions'>
              <span className='pokemon__height'> Height</span>
              <li className='pokemon__item__height'>{pokemon?.height}</li>
              <span className='pokemon__weight'> Weight </span>
              <li className='pokemon__item__weight'>{pokemon?.weight}</li>
            </ul>
            <div className='pokemon__container__skills'>
              <h3 className='pokemon__skills'>Skills</h3>
              <ul className='pokemon__item__skills'>
                {
                  pokemon?.abilities.map(abilitieInfo => (
                    <li className='card__item__li' key={abilitieInfo.ability.url}>{abilitieInfo.ability.name}</li>
                  ))
                }
              </ul>
              <h3 className='pokemon__type'>Type</h3>
              <ul className='pokemon__item__type'>
                {
                  pokemon?.types.map(typeInfo => (
                    <li className='pokemon__box__li' key={typeInfo.type.url}>{typeInfo.type.name}</li>
                  ))
                }
              </ul>
            </div>
            <h3 className='pokemon__item__stat'>Stats</h3>
            <ul className='pokemon__item__stats'>
              <li className='pokemon__item__hp'>Hp</li>
              <li className='pokemon__item__style'>
                <span className="pokemon__style1" style={{ '--w': `${pokemon?.stats[0].base_stat}%` }}>%</span> <span className='style__por'> {pokemon?.stats[0].base_stat}/150</span>
              </li>
              <li className='pokemon__item__hp'>Attack</li>
              <li className='pokemon__item__style'>
                <span className="pokemon__style1" style={{ '--w': `${pokemon?.stats[1].base_stat}%` }}>%</span><span className='style__por'> {pokemon?.stats[1].base_stat}/150</span>
              </li>
              <li className='pokemon__item__hp'>Defense</li>
              <li className='pokemon__item__style'>
                <span className="pokemon__style1" style={{ '--w': `${pokemon?.stats[2].base_stat}%` }}>%</span><span className='style__por'>{pokemon?.stats[2].base_stat}/150</span>
              </li>
              <li className='pokemon__item__hp'>Special-Attack</li>
              <li className='pokemon__item__style'>
                <span className="pokemon__style1" style={{ '--w': `${pokemon?.stats[3].base_stat}%` }}>%</span><span className='style__por'>{pokemon?.stats[3].base_stat}/150</span>
              </li>
              <li className='pokemon__item__hp'>Special-Defense</li>
              <li className='pokemon__item__style'>
                <span className="pokemon__style1" style={{ '--w': `${pokemon?.stats[4].base_stat}%` }}>%</span><span className='style__por'>{pokemon?.stats[4].base_stat}/150</span>
              </li>
              <li className='pokemon__item__hp'>Speed</li>
              <li className='pokemon__item__style'>
                <span className="pokemon__style1" style={{ '--w': `${pokemon?.stats[3].base_stat}%` }}>%</span><span className='style__por'>{pokemon?.stats[5].base_stat}/150</span>
              </li>
            </ul>
          </section>
        </div >
      </div>
      <div>
        <section className='pokemon__section__second'>
          <ul className='card__item__movements'>
            <h2 className='pokemon__item__title'>Movements</h2>
            {
              pokemon?.moves.map(movesInfo => (
                <li className='pokemon__group' key={movesInfo.move.url}>{movesInfo.move.name}</li>
              ))
            }
          </ul>
        </section >
      </div>
    </div>
  )
}

export default PokemonPage