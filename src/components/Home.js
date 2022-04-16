import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Face from '../resources/face.jpg';
import ReactComment from './ReactComment';
import './Home.css';
const Home = () => {
    return (
        <>
            <div class="constrict-80p">
                <NavBar page={this} />
                <div class="content-body">
                    <div class="picture">
                        <img src={Face} alt="face" class="face" />
                    </div>
                    <div class="summary">
                            <div class="header">Welcome to the Pad</div>
                            <div class="subheader">A glimpse inside my world</div>
                            <div class="paragraph">I am a rising senior in Cybersecurity at Purdue University.</div>
                            <div class="paragraph">Here you can find all my information, including resume, CTF writeups, CS projects, and other points of interest!</div> 
                            <div class="paragraph">Perhaps you might even find my secret webpage...</div>
                            <ReactComment text="Nice try, but it's not here :("/>
                            <div class="update">Last updated: April 16th, 2022</div>
                        </div>
                </div>
                <Footer/>
            </div>
        </>
    );

}

export default Home;