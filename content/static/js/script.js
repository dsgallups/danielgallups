/**
 * THIS SCRIPT RENDERS THE PAGE.
 */

/**
 * HELPER FUNCTIONS, credit to @gblazex
 * https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
 */
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
  
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    document.body.classList.add("stop-scrolling")
    document.getElementById("main-container").classList.add("stop-scrolling")
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false)
}
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    document.body.classList.remove("stop-scrolling")
    document.getElementById("main-container").classList.remove("stop-scrolling")
}

/**
 * Our page is divided into 4 pages.
 * page 1 is the first thing they see.
 * page 2 is what happens when they scroll once
 * Elements that do not belong to a page are unbounded.
 */

const pageOneTypeWriter = () => {
    const allSkills = [
        'Problem Solver',
        'Problem Creator',
        'Cybersecurity Analyst',
        'Data Analyst',
        'DNN Researcher',
        'Software Developer',
        'Penetration Tester',
        'CTF Competitor',
        'Code Documenter',
        'Forensic Analyst',
        'Rockstar',
        'IT Specialist',
        'Printer Fixer',
        'Intelligence Gatherer',
        'Code Writer',
        'Coffee Maker',
        'Unit Tester',
        'Backend Engineer',
        'GRM Intern',
        'Red Teamer'
    ]
    
    let skills = allSkills.slice()
    
    const colorsOnWhite = [
        '#CC0',
        '#0DD',
        '#F0F'
    ]
    let typeSpeed = 50
    const displayTime = 1000
    let eraseSpeed = 30
    let clearedSpeed = 600

    //so we will have text made based on our skills
    //then we will call type to type it, the erase it.
    //then we will 


    if (skills.length == 0) {
        skills = allSkills.slice()
    }
    //choose a color and a random skill
    let chosenSkillIndex = Math.floor(skills.length * Math.random())
    let chosenSkill = skills[chosenSkillIndex]
    skills.splice(chosenSkillIndex, 1)
    let color = colorsOnWhite[Math.floor(colorsOnWhite.length * Math.random())]
    document.getElementById("skills-intro").innerHTML = "I'm your <span id=\"skill-replaceable\" style=\"color: "+ color +"\"></span><span id=\"text-cursor\">|</span>"   

    //very poor programming practice. JS sucks, but this makes sense to me right now. gross.
    const setNewSkill = () => {
        if (skills.length == 0) {
            skills = allSkills.slice()
        }
        chosenSkillIndex = Math.floor(skills.length * Math.random())
        chosenSkill = skills[chosenSkillIndex]
        skills.splice(chosenSkillIndex, 1)
        color = colorsOnWhite[Math.floor(colorsOnWhite.length * Math.random())]
        document.getElementById("skills-intro").innerHTML = "I'm your <span id=\"skill-replaceable\" style=\"color: "+ color +"\"></span><span id=\"text-cursor\">|</span>"
    }
    //let skillText = staticText + " " + chosenSkill

    //sets cursor speed
    let show = true
    setInterval(() => {
        show ? document.getElementById("text-cursor").setAttribute("style", "display: inline")
            : document.getElementById("text-cursor").setAttribute("style", "display: none")
        
        show = !show
    }, 600)

    let i = 0
    //sets an interval for typing
    const typeForward = () => {
        let el = document.getElementById("skill-replaceable")
        if (i < chosenSkill.length) {
            el.innerHTML += chosenSkill.charAt(i)
            i++
        } else if (i == chosenSkill.length) {
            clearInterval(typeEvents)
            //now we run a function to erase the text
            setTimeout(() => {
                const eraseTyping = setInterval(() => {
                    if (i == 0) {
                        clearInterval(eraseTyping)
                        //typeEvents = setInterval(typeForward, typeSpeed)
                        setNewSkill()
                        setTimeout(() => {
                            typeEvents = setInterval(typeForward, typeSpeed)
                        }, clearedSpeed)
                    }
                    el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1)
                    i -= 1
                }, eraseSpeed)
                
            }, displayTime)
        }
    }


    let typeEvents = setInterval(typeForward, typeSpeed)

}

const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

let mWTopPos = -480;


const scrollToPage = (cP, nP) => {
    if (nP < 0 || nP > 3) return cP
    console.log('From %d to %d', cP, nP);
    
    let smallMandelbrots = document.querySelectorAll('.mandelbrot-small')
    let cyan = document.getElementById("cyan")
    let yellow = document.getElementById("yellow")
    let magenta = document.getElementById("magenta")
    let big = document.getElementById("big-dark")
    let page1 = document.getElementById("page-1")
    let page2 = document.getElementById("page-2")
    let page3 = document.getElementById("page-3")
    let mW = document.getElementById("big-white")

    switch (cP) {
        case 0:
            /**
             * This animation will spawn three mandelbrots of different pigments, which combine to black.
             *      Yellow comes from the top
             *      Cyan comes from the left
             *      Magenta comes from the right
             *      This will be manipulated via the top and left parameters.
             *  
             * Then, the black of that set zooms in to make an entirely black background.
             * Finally, page 2 is revealed.
             * 
             * 
             */

            /*
                Due to using CSS animations, we have to time the animation according to what
                is defined in the stylesheet.
            */
            //css animations suck
            //transition: all .5s ease-in-out;

            const movements = [700, 200, 100, 500, 800, 400, 1500]
            let p = 0;
            function getTiming(frameNo) {
                let cum = 0;
                for (let i = 0; i <= frameNo; i++) {
                    cum += movements[i];
                }
                return cum;
            }
            

        
            window.scrollTo(0,0)
            //First part, they overshoot by a little
            smallMandelbrots.forEach((el) =>  {
                el.style.transition =" all .7s ease-out"
            })
            
            
            //cyan
            cyan.style.left = '53%'
            //yellow
            yellow.style.top = '250px'
            //magenta
            magenta.style.left = '43%'

            window.scrollTo(0,0)

            setTimeout(() => {
                window.scrollTo(0,0)
                console.log("action", p++);
                smallMandelbrots.forEach((el) =>  {
                    el.style.transition ="all .2s ease-in-out"
                })
                //cyan
                cyan.style.left = '48.5%'
                //yellow
                yellow.style.top = '175px'
                //magenta
                magenta.style.left = '51.5%'
            }, getTiming(0))

            
            setTimeout(() => {
                window.scrollTo(0,0)
                console.log("action ", p++);
                smallMandelbrots.forEach((el) =>  {
                    el.style.transition = "all .1s ease-in-out"
                })
                //cyan
                cyan.style.left = '50%'
                //yellow
                yellow.style.top = '200px'
                //magenta
                magenta.style.left = '50%'
            }, getTiming(1)) 

            //Now display the real boy, and extend the mandelbrots out a lil bit
            
            setTimeout(() => {
                //big.style.transition = "all 1s ease-in-out"
                //big.style.opacity = '.5'
                let bigOpacity = 0;
                //animate opacity
                
                let animateOpacity = setInterval(() => {
                    bigOpacity += .01
                    big.style.opacity = bigOpacity
                    if (bigOpacity >= 1) {
                        clearInterval(animateOpacity);
                    }
                }, 2)
                
                smallMandelbrots.forEach((el) =>  {
                    el.style.transition = "all 1.8s ease-in-out"
                    //el.style.opacity = '1'
                })

                
                setTimeout(() => {
                    console.log("action ", p++);
                    if (viewportWidth >= 750) {
                        console.log("true");
                        big.style.transition = null
                        big.style.width = '750px'
                    }
                    big.style['max-width'] = 'initial'
                    
                    smallMandelbrots.forEach((el) =>  {
                        if (viewportWidth >= 750) {
                            el.style.transition = null
                            el.style.width = '750px'
                        }
                        el.style['max-width'] = 'initial'
                    })
                }, 200);


            }, getTiming(2))        
            
            //zoom into the mandelbrot
            
            setTimeout(() => {
                
                console.log("action ", p++);
                //document.querySelector(".name").style.color = 'green';
                big.style.transition = "all 1.4s ease-in-out"
                big.style.top = '-70vw'
                //big.style.transform = 'translate(0, -1200px)'
                if (viewportWidth >= 750) {

                }
                big.style.width = (viewportWidth * 4) + 'px'
                
                smallMandelbrots.forEach((el) =>  {
                    el.style.transition = "all 1.4s ease-in-out"
                    el.style.width = (viewportWidth * 4) + 'px'
                })
                cyan.style.top = '-70vw'
                cyan.style.left = '100%'

                yellow.style.top = '-150vw'

                magenta.style.top = '-70vw'
                magenta.style.left = '-100%'
                
            }, getTiming(3))

            //Now we just adjust the background to be black and scroll to page 2
            setTimeout(() => {
                page1.style.transition = null;
                page1.style["background-color"] = "#000"
            }, getTiming(4) - 200)
            setTimeout(() => {
                document.getElementById("main-container").style["background-color"] = "#000"
                big.style = null
                smallMandelbrots.forEach(el => el.style = null)
                
                page1.style.transition = "all 1s ease-in-out"
                page1.style.top = '-100vh';
            }, getTiming(4))

            setTimeout(() => {
                window.scrollTo(0, 200)
            }, getTiming(5))

            setTimeout(() => {                
                page2.style.transition = "all 1s ease-in-out"
                page2.style["top"] = '200px';
            }, getTiming(5) + 100)
            
            
            
            //Finally release the return to reenable the scroll
            
            setTimeout(() => {
                allowScrollEvent()
            }, getTiming(6))
            

            break
        case 1:
            /**
             * This is for page 1 scrolling up or down
             * 
             * 
             * 
             */
            if (nP == 0) {
                const movements = [700, 1000, 2000]
                
                function getTiming(frameNo) {
                    let cum = 0;
                    for (let i = 0; i <= frameNo; i++) {
                        cum += movements[i];
                    }
                    return cum;
                }
                
                //first for reverse
                page2.style.transition = null
                page2.style["margin-top"] = "0vh"
                window.scrollTo(0, 0)
                page2.style.transition = "all 1s ease-in-out"
                page2.style["margin-top"] = '200vh';

                setTimeout(() => {
                    //bring back big
                    //big.style.top = '-70vw'
                    //big.style.width = (viewportWidth * 4) + 'px'
                    //document.getElementById("main-container").style["background-color"] = "#fff"
                    page1.style.transition = "all 1s ease-in-out"
                    page1.style.top = '0vh';
                    big.style.transition = "all 0s"
                    big.style.opacity = '1'
                    big.style.top = '-50vw'
                    big.style['max-width'] = 'initial'
                    big.style.width = (viewportWidth * 3) + 'px'
                    let acc = -50;
                    let leftAcc = 0;
                    smallMandelbrots.forEach((el) =>  {
                        el.style.transition = "all 0s"
                        el.style.top = -50 + acc + 'vw'
                        el.style.left = 30 + leftAcc + '%' 
                        el.style['max-width'] = 'initial'
                        el.style.width = (viewportWidth * 1) + 'px'
                        //acc -= 10
                        leftAcc += 20
                    })
                    document.getElementById("main-container").style["background-color"] = "#fff"
                    page1.style["background-color"] = "inherit"
                }, getTiming(0))


                
                setTimeout(() => {
                    //mandelbrot comes out
                    big.style.transition = "all 1s ease-in-out"
                    big.style.top = '250vh'
                    //big.style.width = '750px'
                    smallMandelbrots.forEach((el) =>  {
                        el.style.transition = "all 1.5s cubic-bezier(.76,.05,1,.6) 0s"
                        el.style.top = '200vh'
                    })
                    

                }, getTiming(1))
                
                
    
                setTimeout(() => {
                    smallMandelbrots.forEach(el => {
                        el.style = null
                    })
                    big.style = null
                    page1.style = null
                    page2.style = null
                    allowScrollEvent()
                }, getTiming(2))
            } else {
                //from page 2 to page 3
                /**
                 * So the animation will have the white mandelbrot come up
                 * Then, when it hits a certain point, it will take the content of page 2 with it
                 * The mandelbrot will continue downwards to the needle
                 * then the needle will become a solid 1px divider
                 * then at the end of this divider is the resume (for now)
                 */
                const movements = [200, 1000, 300, 1500];
                function getTiming(frameNo) {
                    let cum = 0;
                    for (let i = 0; i <= frameNo; i++) {
                        cum += movements[i];
                    }
                    return cum;
                }
                
                //So first set up our white mandelbrot to be just below the view height
                mW.style.opacity = "1"
                mW.style.top = "100vh"

                //mWTopPos = -370;
                
                

                setTimeout(() => {
                    mW.style.transition = "all 1s ease-in"
                    mW.style.top = mWTopPos + "px"
                }, getTiming(0));

                //now bring everything with it >:)
                setTimeout(() => {
                    //the size of the page is 713 about
                    mW.style.transition = "all .3s linear"
                    page2.style.transition = "all .3s linear"
                    let page2Top = -800
                    mWTopPos += page2Top
                    page2.style.top = page2Top + "px"
                    mW.style.top = mWTopPos + "px"
                    
                }, getTiming(1))

                setTimeout(() => {
                    mW.style.transition = "all 1.5s cubic-bezier(.05,.61,.09,1) 0s"
                    mWTopPos += -4600
                    mW.style.top = mWTopPos + "px"
                    console.log("mwTopPos = ", mWTopPos)
                }, getTiming(2))

                setTimeout(() => {
                    page3.style.transition = "all 1s ease-out"
                    page3.style["top"] = '200px'
                }, getTiming(3) - 1000)

                setTimeout(() => {
                    allowScrollEvent()
                }, getTiming(3))
            
            }
            break
        case 2:
            //can only scroll up for now..
            if (nP == 1) {
                
                const movements = [1500, 300, 1000];
                function getTiming(frameNo) {
                    let cum = 0;
                    for (let i = 0; i <= frameNo; i++) {
                        cum += movements[i];
                    }
                    return cum;
                }

                //move the resume down
                page3.style.transition = "all 1s ease-in"
                page3.style["top"] = "200vh";
                //this is the literal reverse
                mW.style.transition = "all 1.5s cubic-bezier(.61,.05,1,.09) 0s"
                console.log("mwTopPos is ", mWTopPos)
                mWTopPos += 4600
                mW.style.top = mWTopPos + "px"
                console.log("mwTopPos is ", mWTopPos)

                //begin the reverse
                setTimeout(() => {
                    //all 1.5s cubic-bezier(0.09, 1.03, 0.05, 0.61) 0s
                    mW.style.transition = "all .3s linear"
                    page2.style.transition = "all .3s linear"
                    let page2Top = 200
                    mWTopPos += page2Top
                    page2.style.top = page2Top + "px"
                    mW.style.top = mWTopPos + "px"
                }, getTiming(0));

                //send the mandelbrot down
                setTimeout(() => {
                    mW.style.transition = "all 1s ease-out"
                    mW.style.top = "100vh"
                }, getTiming(1))

                setTimeout(() => {
                    mWTopPos = -480;
                    mW.style = null
                    page3.style = null
                    page2.style.transition = "1s ease-in-out 0s"
                    page2.style.top = "200px"
                    allowScrollEvent()
                }, getTiming(2))

            }
            break
        case 3:
            break
    }


    return nP
}







/**
 * This is our main function for loading
 * 
 */
window.addEventListener('load', (e) => {
    console.log("Loaded!!!")
    pageOneTypeWriter()
    
})


let ticking = false
let currentPage = 0
function allowScrollEvent() {
    enableScroll();
    ticking = false
    console.log('scrolling re-enabled!')
}
function disableScrollEvents() {
    disableScroll();
    ticking = true
}


document.addEventListener("scroll", (event) => {
    let scrollUp = this.oldScroll > this.scrollY
    this.oldScroll = this.scrollY
    event.preventDefault()
    if (!ticking) {
        disableScrollEvents();

        console.log(`Scrolled up: `, scrollUp)
        //perform the animation
        scrollUp ? 
            currentPage = scrollToPage(currentPage, currentPage - 1) : 
            currentPage = scrollToPage(currentPage, currentPage + 1)

        //for testing
        //currentPage = 0;
        
    }
  
})


/*
window.onscroll = function(e) {
    // print "false" if direction is down and "true" if up
    console.log(this)
    console.log(this.oldScroll > this.scrollY)
    this.oldScroll = this.scrollY
  }
*/