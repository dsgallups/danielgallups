
import './NavBar.css';
const NavBar = () => {
    return (
        <div className="navbar">
            <div className="constrict-80p">
                <div className="navbar-flex">
                    <div className="title">
                        Daniel Gallups
                    </div>
                    <div className="navbar-items">
                        <div className="navbar-item">
                            <a href="/">Home</a>
                        </div>
                        <div className="navbar-item">
                            <a href="/basics">Basics</a>
                        </div>
                        <div className="navbar-item">
                            <a href="/ctf">CTFs</a>
                        </div>
                        <div className="navbar-item">
                            <a href="/policy">Policy</a>
                        </div>
                        <div className="navbar-item">
                            <a href="/contact">Resume</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NavBar;