
import './NavBar.css';
const NavBar = () => {
    return (
        <div className="navbar">
            <div className="title">
                Daniel Gallups
            </div>
            <div className="navbar-item">
                <a href="/">Home</a>
            </div>
            <div className="navbar-item">
                <a href="/about">About</a>
            </div>
            <div className="navbar-item">
                <a href="/contact">Contact</a>
            </div>
        </div>
    );
}
export default NavBar;