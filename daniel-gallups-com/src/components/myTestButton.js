import './myTestButton.css';
import useState from 'react';

const myTestButton = ({ otherWay }) => {
    const [color, setColor] = useState("red");
    return (
        <div className="myButton">
            <h1>{props.title}</h1>
            <h1>{otherWay}</h1>
        </div>
    )
}


Headers.defaultProps = {
    title: "Empty Button Title!",
}

Headers.propTypes = {
    otherWay: PropTypes.string
}
export default myTestButton
