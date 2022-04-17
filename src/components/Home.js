import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Face from '../resources/face.jpg';
import ReactComment from './ReactComment';
import Typist from 'react-typist';
import './Home.css';
import { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
const Home = () => {
    return (
        <div>
            <Parallax pages={2}>
                <ParallaxLayer offset={0} speed={2.5} factor={1}>
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

                <ParallaxLayer offset={1} speed={.5} factor={1}
                    style={{ background: '#f00' }} 
                >
                Test
                </ParallaxLayer>
            </Parallax>
        </div>
    );

}

export default Home;