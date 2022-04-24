import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Face from '../../resources/face.jpg';
import ReactComment from '../ReactComment';
import Typist from 'react-typist';
import './Home.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Resume from '../../resources/DanielGallupsResume.pdf';


const Home = () => {
    return (
        <div>
            <NavBar page={this} />
            <Parallax pages={3}>
                <ParallaxLayer offset={0} speed={3} factor={1} className="layer-1-background" style={{ height: '2100px' }}>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0} factor={1}>
                    <div className="constrict-80p">
                        <div className="content-body">
                            <div className="picture">
                                <img src={Face} alt="face" className="face" />
                            </div>
                            <div className="summary">
                                    <div className="header">Hi, I'm Dan</div>
                                    <div className="subheader">A glimpse into my world</div>
                                    <div className="paragraph">Cybersecurity Student at <span style={{color:"#ceb888"}}>Purdue University</span>.</div> 
                                    <Typist avgTypingDelay={25} cursor={{show: false}}>
                                        <Typist.Delay ms={3000} />
                                        <div className="paragraph">If you aren't here to check out my talents, perhaps you should try finding my secret webpage...</div>
                                    </Typist>

                                    <ReactComment text="Nice try, but it's not here :("/>
                                    <div className="update">Last updated: April 23rd, 2022</div>
                                </div>
                        </div>
                        <Footer/>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={.8} speed={1} factor={1}>
                    <div className="scroll-down">
                        <span className="scroll-text">
                            Scroll Down To Check Out My Skills
                        </span>
                        <div className="scroll-arrow">
                            V
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={.99} speed={2} factor={1}
                    style={{ background: '#FFFFFF' }} 
                >
                    <div className="skills-layout">
                        <div className="skills-header">
                            Skills and Interests
                        </div>
                        <div className="skills-container">
                            <div className="skills-body-left">
                                <div className="skills-body-left-top skill">
                                    <div className="skills-body-left-top-header skill-header">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                                        style={{
                                            height: "3em",
                                            width: "3em"
                                        }}><path d="M414.8 40.79L286.8 488.8C281.9 505.8 264.2 515.6 247.2 510.8C230.2 505.9 220.4 488.2 225.2 471.2L353.2 23.21C358.1 6.216 375.8-3.624 392.8 1.232C409.8 6.087 419.6 23.8 414.8 40.79H414.8zM518.6 121.4L630.6 233.4C643.1 245.9 643.1 266.1 630.6 278.6L518.6 390.6C506.1 403.1 485.9 403.1 473.4 390.6C460.9 378.1 460.9 357.9 473.4 345.4L562.7 256L473.4 166.6C460.9 154.1 460.9 133.9 473.4 121.4C485.9 108.9 506.1 108.9 518.6 121.4V121.4zM166.6 166.6L77.25 256L166.6 345.4C179.1 357.9 179.1 378.1 166.6 390.6C154.1 403.1 133.9 403.1 121.4 390.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4L121.4 121.4C133.9 108.9 154.1 108.9 166.6 121.4C179.1 133.9 179.1 154.1 166.6 166.6V166.6z"/></svg>
                                        <span>Software Development</span>
                                    </div>
                                    <div className="skills-body-left-top-body skill-body">
                                        Building products that improve people's lives is an intrinsic motivator. I am most experienced in Web Development stacks, and I commonly use Rust for more intensive applications.
                                    </div>
                                </div>
                                <div className="skills-body-left-bottom skill">
                                    <div className="skills-body-left-bottom-header skill-header">
                                        Mathematics
                                    </div>
                                    <div className="skills-body-left-bottom-body skill-body">
                                        Mathematics is a powerful tool for solving problems, and I have a particular interest in the field of Cryptography.
                                    </div>
                                </div>
                            </div>
                            <div className="skills-body-divider">
                            </div>
                            <div className="skills-body-right">
                                <div className="skills-body-right-top skill">
                                    <div className="skills-body-right-top-header skill-header">
                                        Cybersecurity
                                    </div>
                                    <div className="skills-body-right-top-body skill-body">
                                        As a part of Purdue's CTF club, I have gained modest red-team experience. You will find my future writeups on a separate page.
                                    </div>
                                </div>
                                <div className="skills-body-right-bottom skill">
                                    <div className="skills-body-right-bottom-header skill-header">
                                        Data Visualization
                                    </div>
                                    <div className="skills-body-right-bottom-body skill-body">
                                        A fascinating visualization is one that can articulate data in a meaningful way. I work on some projects using D3.js.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={3} speed={1} factor={1}>

                </ParallaxLayer>

                <ParallaxLayer offset={4} speed={1} factor={1}
                    style={{ background: '#0f0'}}>
                    <Document file={Resume}>
                        <Page pageNumber={1} />
                    </Document>
                </ParallaxLayer> 
            </Parallax>
        </div>
    );

}

export default Home;