import { React, useRef } from 'react';
import '../NavBar/NavBar.css';
import Headshot from '../../resources/headshot-dan.jpg';
import ReactComment from '../ReactComment';
import Typist from 'react-typist';
import './Home.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Resume from '../../resources/DanielGallupsResume.png';
import MediumIcon from '../../resources/icons8-medium.svg';
import GithubIcon from '../../resources/icons8-github.svg';
import LinkedInIcon from '../../resources/icons8-linkedin.svg';
import InstagramIcon from '../../resources/icons8-instagram.svg';
import PathfinderIcon from '../../resources/pathfinder-logo.png';
import PurdueIcon from '../../resources/Purdue_Boilermakers_logo.svg';
import ChessBoardIcon from '../../resources/Chess_Board.svg';
import MathIcon from '../../resources/math.svg';
import DataIcon from '../../resources/data.svg';
import SecurityIcon from '../../resources/security.svg';
import SoftwareIcon from '../../resources/software.svg';
import Breakpoint from '../Breakpoint';
import Textbox from '../HomeModules/Textbox';
import { defineHidden } from '@react-spring/shared';
import Social from '../HomeModules/Social';
import NavBar from '../NavBar/NavBar';
import SkillBox from '../HomeModules/SkillBox';
/*
    TODO:
    - Time to refactor code
    - minimize these import statements please
*/

const Home = () => {

    /*Sections will be an abstraction on a particular piece of information. 
        You can pass the following values to a section:
            - title: the title of the section, if it requires one.
            - body: the content of the section. This is default if choosing between title and body.
            - className: the classNames of the section. This may not be necessary in the event the section is specially styled when passed into its component.
            - icon: the icon to represent the section
            - link: the link to the section
            - isDark: is the section going to be dark?
        
        The following modules accepts sections as a parameter:
            Textbox
            Social
            Skillbox
    */
    const sections = {
        "title": {
            "title": "Daniel Gallups",
            "description": "I am a software engineer with a passion for creating software that solves problems."
        },
        "intro": {
            "body": "Hi, I'm Dan.",
            "className": "large-header intro",
        },
        "summary": {
            "body": ["I am a Cybersecurity Student at ", <span style={{color:"#ceb888"}}>Purdue University</span>, "."],
            "className": "textbox-dark summary",
            "isDark": true
        },
        "secret": {
            "body": "If you aren't here to check out my talents, perhaps you should try finding the flag.",
            "className": "regular-text secret",
            "isDark": true
        },
        "interests header" : {
            "body": "Interests",
            "className": "skills-header large-header"
        },
        "update": {
            "body": "Last updated: April 29th, 2022",
            "className": "update",
        },
        "notepad": {
            "title": "The Gist",
            "body": [
                "Fullstack Developer",
                "Looking for Summer Internship Opportunities",
                "Below, you will find my interests, projects, and contact information.",
                "I am currently updating my website, so stay tuned!"
            ]
        },
        "github": {
            "icon": GithubIcon,
            "link": "https://github.com/dsgallups"
        },
        "linkedin": {
            "icon": LinkedInIcon,
            "link": "https://www.linkedin.com/in/daniel-gallups-942a38170/"
        },
        "medium": {
            "icon": MediumIcon,
            "link": "https://medium.com/@dsgallups"
        },
        "instagram": {
            "icon": InstagramIcon,
            "link": "https://www.instagram.com/dsgallups/"
        },
        "software dev": {
            icon: SoftwareIcon,
            title: "Software Development",
            description: "Building products that improve people's lives is my intrinsic motivation.",
            className: "sdev"
        },
        "math": {
            icon: MathIcon,
            title: "Mathematics",
            description: "As the language to define reality, most informed decisions require math. I have a particular interest in the field of Cryptography.",
            className: "math",
            isDark: true
        },
        "cybersecurity": {
            icon: SecurityIcon,
            title: "Cybersecurity",
            description: "As a part of Purdue's CTF club, I have gained modest red-team experience. You will find my future writeups on a separate page.",
            className: "csec",
            isDark: true
        },
        "data": {
            icon: DataIcon,
            title: "Data Visualization",
            description: "A fascinating visualization is one that can articulate data in a meaningful way. I have some experience with D3.js.",
            className: "dvis"
        },
        "projects": {
            title: "Projects",
            body: {
                "pathfinder": {
                    icon: PathfinderIcon,
                    title: "Pathfinder",
                    body: "No longer are the days of inaccurate college scheduling! Pathfinder enables students to optimize their plans of study. Features include quicker paths to graduation, search for certificates based on fewest credits, and much more.",
                    link: "https://github.com/dsgallups/Pathfinder"
                },
                "iamboredatpurdue": {
                    icon: PurdueIcon,
                    title: "iamboredatpurdue",
                    body: "Where is the bell tower? Why don't I have any homework? Why would I ever leave this place? If you\'re asking these questions, you\'re probably not a student at Purdue. But if you are, join us at iamboredatpurdue to find comfort in your boredom!",
                    link: "https://github.com/dsgallups/iamboredatpurdue"
                },
                "boilerchess": {
                    icon: ChessBoardIcon,
                    title: "BoilerChess",
                    body: "If you're like me, then you would think that chess absolutely deserves a new piece. Behold! Boilerchess is a 9x9 tiled game that incorporates a new piece: The Boiler.",
                    link: "https://github.com/dsgallups/CNIT251-Final-Project"
                }

            }
        },
        "resume": {
            link: "https://danielgallupsbucket.s3.us-east-2.amazonaws.com/DanielGallupsResume.pdf",
            icon: Resume
        }
    }
    let ref = useRef();
    const alignStart = { display: 'flex', alignItems: 'flex-start'};
    const handleScroll = (page) => {
        if ('current' in ref && ref.current !== undefined) {
            ref.current.scrollTo(page);
        }
    }
    return (
        <>
            <Breakpoint at ='isMobile'>
                <>
                <div style={{textAlign:'center'}}>
                    MOBILE VERSION TO BE WRITTEN!
                </div>
                <Textbox section={sections.intro}/>
                <div className="textbox socials">
                    <a href="https://github.com/dsgallups" target="_blank" rel="noreferrer" className="social-icon"><img src={GithubIcon} alt="github"/></a>
                    <a href="https://www.linkedin.com/in/daniel-gallups-942a38170/" rel="noreferrer" target="_blank" className="social-icon"><img src={LinkedInIcon} alt="linkedin"/></a>
                    <a href="https://medium.com/@dsgallups" target="_blank" rel="noreferrer" className="social-icon"><img src={MediumIcon} alt="medium"/></a>
                    <a href='https://www.instagram.com/danielgallups/' target="_blank" rel="noreferrer" className="social-icon"><img src={InstagramIcon} alt="instagram"/></a>
                </div>
                <div className="textbox textbox-dark summary">
                    I am a Cybersecurity Student at <span style={{color:"#ceb888"}}>Purdue University</span>. 
                </div>
                <div className="textbox general-container">
                    <div className="small-header" style={{width:"100%",fontWeight:'600',borderBottom:'1px solid white'}}>The Gist:</div>
                    <ul className="regular-text">
                    </ul>
                </div>
                </>
            </Breakpoint>
            <Breakpoint at ="isDesktop">
                <>
                <NavBar handleScroll={handleScroll} />
                <Parallax pages={3.5} ref={ref} id="parallax" >
                <ParallaxLayer offset={0} speed={1} factor={7} className="layer-1-background" style={{ ...alignStart, backgroundRepeat: "repeat" }}/>
                <div className="max-width-for-content">
                    <ParallaxLayer offset={.15} speed={2} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <img src={Headshot} alt="face" className="face"/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={.05} speed={2} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <Textbox section={sections.intro}/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={.4} speed={1.2} factor={1} horizontal={false} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <Textbox section={sections.summary}/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={.55} speed={3} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                        <div className="textbox regular-text secret">
                            <Typist avgTypingDelay={25} cursor={{show: false}}>
                                <Typist.Delay ms={0} />
                                If you aren't here to check out my talents, perhaps you should try finding the flag.
                            </Typist>
                            <ReactComment text="Nice try, but it's not here :("/>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={.87} speed={5} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                        <Textbox section={sections.update}/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={.15} speed={0} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                        <div className="textbox general-container">
                            <div className="small-header" style={{width:"100%",fontWeight:'600',borderBottom:'1px solid white'}}>{sections.notepad.title}</div>
                            <ul className="regular-text">
                                {sections.notepad.body.map((k) => <li>{k}</li>)}
                            </ul>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={.6} speed={.8} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <div className="textbox socials">
                            <Social platform={sections.github}/>
                            <Social platform={sections.linkedin}/>
                            <Social platform={sections.medium}/>
                            <Social platform={sections.instagram}/>
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={.8} speed={1} factor={1} style={{...alignStart}}>
                        <div className="textbox scroll-down">
                            <span className="scroll-text">
                                Check Out My Webpage
                            </span>
                            <div className="scroll-arrow">
                                V
                            </div>
                        </div>
                    </ParallaxLayer>
                </div>
                    <ParallaxLayer sticky={{start:1, end: 1.2}} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <Textbox section={sections["interests header"]}/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1.2} speed={.4} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <SkillBox section={sections["software dev"]}/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1.2} speed={.8} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <SkillBox section={sections["math"]}/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1.2} speed={1.6} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                        <SkillBox section={sections["cybersecurity"]}/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1.2} speed={1.2} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                        <SkillBox section={sections["data"]}/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={1.15} speed={3} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                        <div className="dotted-divider"></div>
                    </ParallaxLayer>
                

                    {/*Third page*/}
                    
                    <ParallaxLayer offset={1.8} speed={1.2} style={{...alignStart, justifyContent: 'flex-end'}}>
                        <div className="projects-container">
                            <div className="projects-header">
                                {sections.projects.title}
                            </div>
                            <div className="projects-body">
                                <div className="project-container">
                                    <div className="project-header">
                                        <img src={sections.projects.body.pathfinder.icon} alt="Pathfinder Logo" style={{width: '80px', height: '80px', marginBottom: '-10px'}}/>
                                        <div className="small-header">{sections.projects.body.pathfinder.title}</div>
                                    </div>
                                    <div className="project-body small-text">
                                        <span>{sections.projects.body.pathfinder.body}</span>
                                        <a href={sections.projects.body.pathfinder.link} target="_blank" rel="noreferrer"><div>Click here to learn more &gt;&gt;</div></a>
                                    </div>
                                </div>

                                <div className="project-container">
                                    <div className="project-header">
                                        <img src={sections.projects.body.iamboredatpurdue.icon} alt="Purdue Icon" style={{width: '80px', height: '80px', marginBottom: '-10px'}}/>
                                        <div className="small-header">{sections.projects.body.iamboredatpurdue.title}</div>
                                    </div>
                                    <div className="project-body small-text">
                                        <span>{sections.projects.body.iamboredatpurdue.body}</span>
                                        <a href={sections.projects.body.iamboredatpurdue.link} target="_blank" rel="noreferrer"><div>Click here to learn more &gt;&gt;</div></a>
                                    </div>
                                </div>

                                <div className="project-container">
                                    <div className="project-header">
                                        <img src={sections.projects.body.boilerchess.icon} alt="Chessboard Icon" style={{width: '80px', height: '80px', marginTop: '5px', marginBottom: '0px'}}/>
                                        <div className="small-header">{sections.projects.body.boilerchess.title}</div>
                                    </div>
                                    <div className="project-body small-text">
                                        <span>{sections.projects.body.boilerchess.body}</span>
                                        <a href={sections.projects.body.boilerchess.link} target="_blank" rel="noreferrer"><div>Click here to learn more &gt;&gt;</div></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={2} speed={1.2} style={{...alignStart, justifyContent: 'center', width: '80%', margin: '0 auto'}}>
                        <div className="resume-frame">
                            <div className="resume-container">
                                <a href={sections.resume.link} target="_blank" className="resume-document"><img src={sections.resume.icon} alt="Resume"/></a>
                            </div>
                        </div>
                    </ParallaxLayer>
                </Parallax>
                </>
            </Breakpoint>
        </>
    );

}

export default Home;