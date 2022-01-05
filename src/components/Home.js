import '../styles/Home.css'
import logo from '../assets/logofish.png'
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <h1>Bienvenue sur Fishing Simulator 1988</h1>
            <img className='logo' alt="logo poisson" src={logo}/>
            <h2 className='h2home'>Êtes-vous prêt à pêcher ?</h2>
            <button><Link className='buttonhome' to="/layout">Commencer à pêcher</Link></button>
        </div>
    )
}

export default Home