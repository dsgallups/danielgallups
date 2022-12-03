
import './NavBar.css';
const NavBar = (props) => {
    let handleScroll = props.handleScroll;
    return (
        <div className="navbar">
            <div className="notice">
                This Website is Old! My port to WASM is under development.
            </div>
            <div className="constrict-80p">
                <div className="navbar-flex">
                    <div className="title">
                        Daniel Gallups
                    </div>
                    <div className="navbar-items">
                        <div className="navbar-item">
                            <button onClick={() => handleScroll(0)}>Home</button>
                        </div>
                        <div className="navbar-item">
                            <button onClick={() => handleScroll(1)}>Interests</button>
                        </div>
                        <div className="navbar-item">
                            <button onClick={() => handleScroll(2)}>Projects</button>
                        </div>
                        <div className="navbar-item">
                            <button onClick={() => handleScroll(3)}>Resume</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NavBar;