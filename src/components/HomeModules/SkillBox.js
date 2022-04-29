const SkillBox = ({ section }) => {
    return (
    <div className={"textbox skill-container " + section.className}>
        <div className={"skill-header small-header " + (section.isDark ? "skill-header-dark" : "")}>
            <img src={section.icon} alt={section.class} style={{height:"3em", width: "3em"}}/>
            <span>{section.title}</span>
        </div>
        <div className="small-text">
            {section.description}
        </div>
    </div>
    );
}

export default SkillBox;