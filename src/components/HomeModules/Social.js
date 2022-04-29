const SocialIcon = ({ platform }) => {
    return (<a href={platform.link} arget="_blank" rel="noreferrer" className="social-icon"><img src={platform.icon} alt="github"/></a>);
};
export default SocialIcon;