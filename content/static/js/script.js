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
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    document.body.classList.remove("stop-scrolling")
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

const scrollToPage = (cP, nP) => {
    if (nP < 0 || nP > 3) return cP
    console.log('From %d to %d', cP, nP);
    
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
            let smallMandelbrots = document.querySelectorAll('.mandelbrot-small')
            let cyan = document.getElementById("cyan")
            let yellow = document.getElementById("yellow")
            let magenta = document.getElementById("magenta")
            let big = document.getElementById("big-dark")

            const movements = [700, 200, 100]

        

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
            }, movements[0])


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
            }, movements[0] + movements[1]) 

            //Now display the real boy and remove the old mandelbrots
            setTimeout(() => {

            })
            setTimeout(() => {

                big.style.opacity = '100%';
                smallMandelbrots.forEach((el) =>  {
                    el.style.transition = null
                    el.style.left = null
                    el.style.top = null
                })


            }, movements[0] + movements[1] + movements[2])


            break
        case 1:
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

document.addEventListener("scroll", (event) => {
    let scrollUp = this.oldScroll > this.scrollY
    this.oldScroll = this.scrollY
    event.preventDefault()
    if (!ticking) {
        document.body.classList.add("stop-scrolling")
        disableScroll();
        ticking = true

        console.log(`Scrolled up: `, scrollUp)
        //perform the animation
        scrollUp ? 
            currentPage = scrollToPage(currentPage, currentPage - 1) : 
            currentPage = scrollToPage(currentPage, currentPage + 1)

        //for testing
        currentPage = 0;
        setTimeout(() => {
            //Perform a certain animation based on the current page and
            //the next page            
            enableScroll();
            ticking = false
        }, 1000)
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