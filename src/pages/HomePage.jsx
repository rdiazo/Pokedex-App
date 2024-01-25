import { useRef } from "react"
import { setTrainerG } from "../store/states/trainer.state"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import './styles/HomePage.css'

const HomePage = () => {

  const inputTrainer = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerG(inputTrainer.current.value.trim()))
    navigate('/pokedex')
  }

  return (
    <div className="homepage">
      <div className="homepage__img__container">
        <img className="homepage__img__header" src="/pokedex.png" alt="" />
      </div>
      <h2 className="homepage__title">Hi Trainer!</h2>
      <p className="homepage__subtitle">to start this app, give me your trainer name</p>
      <form className="homepage__form" onSubmit={handleSubmit}>
        <input className="homepage__input" ref={inputTrainer} type="text" placeholder="Your name" />
        <button className="homepage__button">Catch them all</button>
      </form>
      <img className="homepage__img__footer" src="/homeFooter.png" alt="" />
    </div>
  )
}

export default HomePage