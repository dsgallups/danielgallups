import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Face from '../resources/face.jpg';
import ReactComment from './ReactComment';
import Typist from 'react-typist';
import './Home.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Resume from '../resources/DanielGallupsResume.pdf';

const Home = () => {
    return (
        <div>
            <Parallax pages={3}>
                <ParallaxLayer offset={0} speed={1} factor={1}>
                    <div class="constrict-80p">
                        <NavBar page={this} />
                        <div class="content-body">
                            <div class="picture">
                                <img src={Face} alt="face" class="face" />
                            </div>
                            <div class="summary">
                                    <div class="header">Welcome to my Website</div>
                                    <div class="subheader">A glimpse inside my world</div>
                                    <div class="paragraph">I am a rising senior in Cybersecurity at <span style={{color:"#ceb888"}}>Purdue University</span>.</div>
                                    <div class="paragraph">Here you can find all my information, including resume, CTF writeups, CS projects, and other points of interest!</div> 
                                    <Typist avgTypingDelay={25} cursor={{show: false}}>
                                    <div class="paragraph">Perhaps you might even find my secret webpage...</div>
                                    </Typist>

                                    <ReactComment text="Nice try, but it's not here :("/>
                                    <div class="update">Last updated: April 16th, 2022</div>
                                </div>
                        </div>
                        <Footer/>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={1} speed={1} factor={1}
                    style={{ background: '#f00' }} 
                >
                    <div class="skills-layout">
                        <div class="skills-header">
                        </div>
                        <div class="skills-body">
                            <div class="skills-body-left">
                                <div class="skills-body-left-top">
                                </div>
                                <div class="skills-body-left-bottom">
                                </div>
                            </div>
                            <div class="skills-body-divider">
                            </div>
                            <div class="skills-body-right">
                                <div class="skills-body-right-top">
                                </div>
                                <div class="skills-body-right-bottom">
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={2} speed={1} factor={1}
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