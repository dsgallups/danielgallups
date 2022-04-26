import { React, useRef } from 'react';
import NavBar from '../NavBar/NavBar';
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

const Home = () => {

    const ref = useRef();
    const alignStart = { display: 'flex', alignItems: 'flex-start'};

    return (
        <div>
            <NavBar page={this} ref={ref} />
            <Parallax pages={3.5} ref={ref} id="parallax" >
            <ParallaxLayer offset={0} speed={1} factor={7} className="layer-1-background" style={{ ...alignStart, backgroundRepeat: "repeat" }}>
            </ParallaxLayer>
            <div className="max-width-for-content">
                <ParallaxLayer offset={.15} speed={2} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                    <img src={Headshot} alt="face" className="face"/>
                </ParallaxLayer>
                <ParallaxLayer offset={.05} speed={2} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                    <div className="textbox large-header intro">
                        Hi, I'm Dan.{/*} <button onClick={(e) => {
                            console.log('clicked', document.getElementById('parallax').scrollTop);
                        ref.current.scrollTo(1)}}>Scroll</button>*/}
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={.4} speed={1.2} factor={1} horizontal={false} style={{...alignStart, justifyContent: 'flex-start'}}>
                    <div className="textbox textbox-dark summary">
                        I am a Cybersecurity Student at <span style={{color:"#ceb888"}}>Purdue University</span>. 
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={.55} speed={3} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                    <div className="textbox regular-text secret">
                        <Typist avgTypingDelay={25} cursor={{show: false}}>
                            <Typist.Delay ms={0} />
                            If you aren't here to check out my talents, perhaps you should try finding my secret webpage...
                        </Typist>
                        <ReactComment text="Nice try, but it's not here :("/>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={.87} speed={5} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                    <div className="textbox update">
                        Last updated: April 23rd, 2022
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={.15} speed={0} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                    <div className="textbox general-container">
                        <div className="small-header" style={{width:"100%",fontWeight:'600',borderBottom:'1px solid white'}}>The Gist:</div>
                        <ul className="regular-text">
                            <li>Fullstack Developer</li>
                            <li>Looking for Summer Internship Opportunities</li>
                            <li>I am currently updating my website with projects, so stay tuned</li>
                            <li>Below, you will find my interests, projects, and contact information.</li>
                        </ul>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={.6} speed={.8} style={{...alignStart, justifyContent: 'flex-start'}}>
                    <div className="textbox socials">
                        <a href="https://github.com/dsgallups" target="_blank" rel="noreferrer" className="social-icon"><img src={GithubIcon} alt="github"/></a>
                        <a href="https://www.linkedin.com/in/daniel-gallups-942a38170/" rel="noreferrer" target="_blank" className="social-icon"><img src={LinkedInIcon} alt="linkedin"/></a>
                        <a href="https://medium.com/@dsgallups" target="_blank" rel="noreferrer" className="social-icon"><img src={MediumIcon} alt="medium"/></a>
                        <a href='https://www.instagram.com/danielgallups/' target="_blank" rel="noreferrer" className="social-icon"><img src={InstagramIcon} alt="instagram"/></a>
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
                <ParallaxLayer sticky={{start:1, end: 1.2}} style={{...alignStart, justifyContent: 'flex-start'}}>\
                    <div className="textbox skills-header large-header">
                        Interests
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={1.2} speed={.4} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                    <div className="textbox skill-container sdev">
                        <div className="skill-header small-header">
                            <img src={SoftwareIcon} alt="software" style={{height:"3em", width: "3em"}}/>
                            <span>Software Development</span>
                        </div>
                        <div className="small-text">
                            Building products that improve people's lives is an intrinsic motivator. 
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={1.2} speed={.8} factor={1} style={{...alignStart, justifyContent: 'flex-start'}}>
                    <div className="textbox skill-container math">
                        <div className="skill-header small-header">
                            <img src={MathIcon} alt="math" style={{height: "3em", width: "3em"}}/>
                            <span>Mathematics</span>
                        </div>
                        <div className="small-text">
                            As the language to define reality, most informed decisions require math. I have a particular interest in the field of Cryptography.
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={1.2} speed={1.6} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                    <div className="textbox skill-container csec">
                        <div className="skill-header small-header">
                            <img src={SecurityIcon} alt="security" style={{height: "3em", width: "3em"}}/>
                            <span>Cybersecurity</span>
                        </div>
                        <div className="small-text">
                            As a part of Purdue's CTF club, I have gained modest red-team experience. You will find my future writeups on a separate page.
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={1.2} speed={1.2} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                    <div className="textbox skill-container dvis">
                        <div className="skill-header small-header">
                            <img src={DataIcon} alt="data" style={{height: "3em", width: "3em"}}/>
                            <span>Data Visualization</span>
                        </div>
                        <div className="small-text">
                        A fascinating visualization is one that can articulate data in a meaningful way. I work on some projects using D3.js.
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={1.15} speed={3} factor={1} style={{...alignStart, justifyContent: 'flex-end'}}>
                    <div className="dotted-divider"></div>
                </ParallaxLayer>
               

                {/*Third page*/}
                
                <ParallaxLayer offset={1.8} speed={1.2} style={{...alignStart, justifyContent: 'flex-end'}}>
                    <div className="projects-container">
                        <div className="projects-header">
                            Projects
                        </div>
                        <div className="projects-body">
                            <div className="project-container">
                                <div className="project-header">
                                    <img src={PathfinderIcon} alt="Pathfinder Logo" style={{width: '80px', height: '80px', marginBottom: '-10px'}}/>
                                    <div className="small-header">Pathfinder</div>
                                </div>
                                <div className="project-body small-text">
                                    <span>No longer are the days of inaccurate college scheduling! Pathfinder enables students
                                    to optimize their plans of study. Features include quicker paths to graduation,
                                    search for certificates based on fewest credits, and much more.</span>
                                    <a href="#"><div>Click here to learn more &gt;&gt;</div></a>
                                </div>
                            </div>

                            <div className="project-container">
                                <div className="project-header">
                                    <img src={PurdueIcon} style={{width: '80px', height: '80px', marginBottom: '-10px'}}/>
                                    <div className="small-header">iamboredatpurdue</div>
                                </div>
                                <div className="project-body small-text">
                                    <span>Where is the bell tower? Why don't I have any homework? Why would I ever leave this place?
                                        If you're asking these questions, you're probably not a student at Purdue. But if you are,
                                        join us at iamboredatpurdue to find comfort in your boredom!
                                    </span>
                                    <a href="#"><div>Click here to learn more &gt;&gt;</div></a>
                                </div>
                            </div>

                            <div className="project-container">
                                <div className="project-header">
                                    <img src={ChessBoardIcon} style={{width: '80px', height: '80px', marginTop: '5px', marginBottom: '0px'}}/>
                                    <div className="small-header">Boilerchess</div>
                                </div>
                                <div className="project-body small-text">
                                    <span>If you're like me, then you would think that chess absolutely deserves a new piece.
                                        Behold! Boilerchess is a 9x9 tiled game that incorporates a new piece: The Boiler.
                                    </span>
                                    <a href="#"><div>Click here to learn more &gt;&gt;</div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={2} speed={1.2} style={{...alignStart, justifyContent: 'center', width: '80%', margin: '0 auto'}}>
                    <div className="resume-frame">
                        <div className="resume-container">
                            <a href='https://danielgallupsbucket.s3.us-east-2.amazonaws.com/DanielGallupsResume.pdf' target="_blank" className="resume-document"><img src={Resume} alt="Resume"/></a>
                        </div>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    );

}

export default Home;