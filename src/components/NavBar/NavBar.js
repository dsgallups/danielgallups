
import './NavBar.css';
const NavBar = (props) => {
    let myRef = props.thisRef;
    return (
        <div className="navbar">
            <div className="constrict-80p">
                <div className="navbar-flex">
                    <div className="title">
                        Daniel Gallups
                    </div>
                    <div className="navbar-items">
                        <div className="navbar-item">
                            <button onClick={ref.current.scrollTo(0)}>Home</button>
                        </div>
                        <div className="navbar-item">
                            <button onClick={ref.current.scrollTo(1)}>Interests</button>
                        </div>
                        <div className="navbar-item">
                            <button onClick={ref.current.scrollTo(1.8)}>Projects</button>
                        </div>
                        <div className="navbar-item">
                            <button onClick={ref.current.scrollTo(2)}>Resume</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NavBar;