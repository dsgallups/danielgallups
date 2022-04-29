const ProjectBox = ({ section, add }) => {
    return (
        <div className="project-container">
            <div className="project-header">
                <img src={section.icon} alt={section.alt} className="project-icon" style={add}/>
                <div className="small-header">{section.title}</div>
            </div>
            <div className="project-body small-text">
                <span>{section.body}</span>
                <a href={section.link} target="_blank" rel="noreferrer"><div>Click here to learn more &gt;&gt;</div></a>
            </div>
        </div>
    )
}

export default ProjectBox;