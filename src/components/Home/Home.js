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
import TextBox from '../HomeModules/TextBox';
import { defineHidden } from '@react-spring/shared';
import Social from '../HomeModules/Social';
import NavBar from '../NavBar/NavBar';
import SkillBox from '../HomeModules/SkillBox';
import ProjectBox from '../HomeModules/ProjectBox';
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
            - alt: Alternate name for missing image
        
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
            "className": "textbox-dark summary regular-text",
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
                    link: "https://github.com/dsgallups/Pathfinder",
                    alt: "Pathfinder Icon"
                },
                "iamboredatpurdue": {
                    icon: PurdueIcon,
                    title: "iamboredatpurdue",
                    body: "Where is the bell tower? Why don't I have any homework? Why would I ever leave this place? If you're asking these questions, you're probably not a student at Purdue. But if you are, join us at iamboredatpurdue to find comfort in your boredom!",
                    link: "https://github.com/dsgallups/iamboredatpurdue",
                    alt: "iamboredatpurdue Icon"
                },
                "boilerchess": {
                    icon: ChessBoardIcon,
                    title: "BoilerChess",
                    body: "If you're like me, then you would think that chess absolutely deserves a new piece. Behold! Boilerchess is a 9x9 tiled game that incorporates a new piece: The Boiler.",
                    link: "https://github.com/dsgallups/CNIT251-Final-Project",
                    alt: "boilerchess Icon"
                },
                "it": {
                    icon: PurdueIcon,
                    title: "IT Infrastructure",
                    body: "At Purdue, we had to build four different network topologies using several technologies. These requirements included physical routing, Cisco iOS, STP, DHCP, VyOS, and HP Aruba iOS. Additionally, we had to implement virtual networks using VMware, Windows AD, BIND, and postfix.",
                    link: "#",
                    alt: "Networking Icon"

                },
                "cyberforensics": {
                    icon: PurdueIcon,
                    title: "Cyberforensics Analysis",
                    body: "Purdue introduces students to the field of Cyberforensics. As a TA, I redesigned and developed a semester-long case study analyzing a suspect's workstation, behavior, and network activity.",
                    link: "#",
                    alt: "Cyberforensics Icon"
                }

            }
        },
        "resume": {
            title: "Resume",
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
            <Breakpoint at='isMobile'>
                <div className="mobile-flex layer-1-background">
                    <TextBox section={sections.intro}/>
                    <div className="textbox socials">
                        <Social platform={sections.github}/>
                        <Social platform={sections.linkedin}/>
                        <Social platform={sections.medium}/>
                        <Social platform={sections.instagram}/>
                    </div>
                    <TextBox section={sections.summary}/>

                    <div className="projects-container">
                        <div className="projects-header large-header">{sections.projects.title}</div>
                        <div className="projects-body">
                            <ProjectBox section={sections.projects.body.pathfinder}/>
                            <ProjectBox section={sections.projects.body.iamboredatpurdue}/>
                            <ProjectBox section={sections.projects.body.boilerchess} add={{marginTop: '5px', marginBottom:'0px'}}/>
                        </div>
                    </div>

                    <div className="interests-container">
                        <div className="interests-header large-header">{sections["interests header"].body}</div>
                        <div className="interests-body">
                            <SkillBox section={sections["software dev"]}/>
                            <SkillBox section={sections["math"]}/>
                            <SkillBox section={sections["cybersecurity"]}/>
                            <SkillBox section={sections["data"]}/>
                        </div>
                    </div>

                    
                    
                    <div className="resume-container">
                        <div className="resume-header large-header">{sections.resume.title}</div>
                        <a href={sections.resume.link} target="_blank" className="resume-document" rel="noreferrer">
                            <img src={sections.resume.icon} alt="Resume"/>
                        </a>
                    </div>

                 
                </div>
            </Breakpoint>
            <Breakpoint at ="isDesktop">
                <>
                <NavBar handleScroll={handleScroll} />
                <Parallax pages={5} ref={ref} id="parallax" >
                <ParallaxLayer offset={0} speed={1} factor={9} className="layer-1-background" style={{ ...alignStart, backgroundRepeat: "repeat" }}/>
                <div className="max-width-for-content">
                    <ParallaxLayer offset={.15} speed={2} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <img src={Headshot} alt="face" className="face"/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={.05} speed={2} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <TextBox section={sections.intro}/>
                    </ParallaxLayer>
                    <ParallaxLayer offset={.4} speed={1.2} factor={1} horizontal={false} style={{...alignStart, justifyContent: 'flex-start'}}>
                        <TextBox section={sections.summary}/>
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
                        <TextBox section={sections.update}/>
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
                        <TextBox section={sections["interests header"]}/>
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
                    
                    <ParallaxLayer offset={2} speed={1.2} style={{...alignStart, justifyContent: 'flex-end'}}>
                        <div className="projects-container">
                            <div className="projects-header">
                                {sections.projects.title}
                            </div>
                            <div className="projects-body">
                                <ProjectBox section={sections.projects.body.pathfinder}/>
                                <ProjectBox section={sections.projects.body.iamboredatpurdue}/>
                                <ProjectBox section={sections.projects.body.boilerchess} add={{marginTop: '5px', marginBottom:'0px'}}/>
                                <ProjectBox section={sections.projects.body.it}/>
                                <ProjectBox section={sections.projects.body.cyberforensics}/>
                            </div>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={3} speed={1.2} style={{...alignStart, justifyContent: 'center', width: '80%', margin: '0 auto'}}>
                        <div className="resume-frame">
                            <div className="resume-container">
                                <a href={sections.resume.link} target="_blank" className="resume-document" rel="noreferrer"><img src={sections.resume.icon} alt="Resume"/></a>
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