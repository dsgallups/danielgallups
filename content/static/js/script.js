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

            const movements = [700, 200, 100, 500, 700, 400, 1500]
            
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

            setTimeout(() => {
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
                big.style.transition = "all .5s ease-in-out"
                big.style.opacity = '1'
                

            }, getTiming(2))

            //halfway frame
            setTimeout(() => {

                smallMandelbrots.forEach((el) =>  {
                    el.style.transition = "all 1.8s ease-in-out"
                })
                //cyan
                cyan.style.left = '60%'
                //yellow. This is bugged due to interaction with official frame 3
                yellow.style.top = '-10px'
                //magenta
                magenta.style.left = '40%'


            }, getTiming(3) - 350)
            
            //reparameterize our sets to zoom in correctly
            setTimeout(() => {
                //document.querySelector(".name").style.color = 'red';
                if (viewportWidth >= 750) {
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
                
            }, getTiming(3) - 100)
            

            
            //zoom into the mandelbrot
            setTimeout(() => {
                //document.querySelector(".name").style.color = 'green';
                big.style.transition = "all 1.4s ease-in-out"
                big.style.top = '-70vw'
                //big.style.transform = 'translate(0, -1200px)'
                if (viewportWidth >= 750) {

                }
                big.style.width = (viewportWidth * 4) + 'px'
                
                /*
                    we must manually set yellow here
                */
                smallMandelbrots.forEach((el) =>  {
                    el.style.transition = "all 1.4s ease-in-out"
                    el.style.width = (viewportWidth * 4) + 'px'
                })
                cyan.style.top = '-70vw'
                yellow.style.top = '-70vw'
                magenta.style.top = '-70vw'
                
            }, getTiming(3))

            //Now we just adjust the background to be black and scroll to page 2
            setTimeout(() => {
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
                page2.style["margin-top"] = '200px';
            }, getTiming(5) + 100)
            
            
            
            //Finally release the return to reenable the scroll
            
            setTimeout(() => {
                allowScrollEvent()
            }, getTiming(6))
            

            break
        case 1:
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
                    allowScrollEvent()
                }, getTiming(2))
            } else {

            }
            break
        case 2:
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