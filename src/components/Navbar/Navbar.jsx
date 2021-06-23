import "./Navbar.css";
import Hacker from "../../assests/hacker.png";

export default function Navbar()  
  {
    return(
    <header className='navbar'>
       <img src={Hacker} alt="hacker"></img>
        <h1 className='navbar__title'>HACK IT </h1>     
    </header>
  
      )
};