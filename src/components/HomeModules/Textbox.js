/*
    How do we understand this component?
    So, the text to pass to this should be in props.children.
    the className and styling should be passed to it through a prop.
    There should be nothing here but structure for a textbox.
*/

const Textbox = (props) => {
    return (
        <div className={"textbox " + props.className}>
            {props.children}
        </div>
    );
}

export default Textbox;
