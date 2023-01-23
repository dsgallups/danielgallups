/**
 * THIS SCRIPT RENDERS THE PAGE.
 */

/**
 * HELPER FUNCTIONS, credit to @gblazex
 * https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
 */
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {37: 1, 38: 1, 39: 1, 40: 1}

function preventDefault(e) {
  e.preventDefault()
  
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true } 
  }))
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

function disableScroll() {
    document.body.classList.add("stop-scrolling")
    document.getElementById("main-container").classList.add("stop-scrolling")
    window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false)
}
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
    window.removeEventListener('touchmove', preventDefault, wheelOpt)
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
    document.body.classList.remove("stop-scrolling")
    document.getElementById("main-container").classList.remove("stop-scrolling")
}
let smallMandelbrots = document.querySelectorAll('.mandelbrot-small')
let cyan = document.getElementById("cyan")
let yellow = document.getElementById("yellow")
let magenta = document.getElementById("magenta")
let big = document.getElementById("big-dark")
let page1 = document.getElementById("page-1")
let page2 = document.getElementById("page-2")
let page3 = document.getElementById("page-3")
let mW = document.getElementById("big-white")
let notifyArrows = document.getElementById("notifier-arrows")
let notifier = document.getElementById('mandelbrot-notifier')
let animateArrows = null
let page2Nav = document.getElementById('page-2-nav')
let notifyArrowsTwo = document.getElementById("notifier-arrows-2")
let animateArrowsTwo = null
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
        'IT Specialist',
        'Printer Fixer',
        'Intelligence Gatherer',
        'Code Writer',
        'Coffee Maker',
        'Unit Tester',
        'Fullstack Engineer',
        'GRC Intern',
        'Red Teamer',
        'Team Member',
        'Cyberforensics Analyst',
        'Game Developer',
        'Frontend Developer',
        'Backend Developer',
        'Infrastructure Engineer',
        'Bug Fixer',
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


    if (skills.length == 0) {
        skills = allSkills.slice()
    }
    //choose a color and a random skill
    let chosenSkillIndex = Math.floor(skills.length * Math.random())
    let chosenSkill = skills[chosenSkillIndex]
    skills.splice(chosenSkillIndex, 1)
    let color = colorsOnWhite[Math.floor(colorsOnWhite.length * Math.random())]
    document.getElementById("skills-intro").innerHTML = "I'm your <span id=\"skill-replaceable\" style=\"color: "+ color +"\"></span><span id=\"text-cursor\">|</span>"   

    //very poor programming practice. This makes sense to me right now. gross.
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

const fP = {
    "top": 90,
    "left": 75,
}
const mbTranslations = {
    left: 1.5,
    top: -25
}
let newMouse = false;
let lastClientX = 0;


const animateOnMouseMove = e => {

        //just so the animation doesn't jerk when user leaves one side of the window
        //and enters another
        if (Math.abs(lastClientX - e.clientX) > 220) {
            newMouse = true
        }

        lastClientX = e.clientX
        
        if (newMouse) {

            smallMandelbrots.forEach((el) =>  {
                el.style.transition = "all .2s ease-in-out"
            })
            setTimeout(() => {
                smallMandelbrots.forEach((el) =>  {
                    el.style.transition = "all 0s"
                })
            }, 200)
            newMouse = false
            
        }
        //console.log(e)
        let mouse = {
            x: e.clientX,
            y: e.clientY
        }
        
        let mandelbrotRect = big.getBoundingClientRect();
        let mb = {
            x: mandelbrotRect.x + (mandelbrotRect.width / 2),
            y: mandelbrotRect.y + (mandelbrotRect.height / 2)
        }

        const give = {
            x: mandelbrotRect.x + ((mb.x - mandelbrotRect.x) / 2),
            y: mandelbrotRect.y,
            //endX: mb.x - (mb.x / 9)
            endX: mb.x
        }
        
        //let distance = Math.sqrt(Math.pow(mb.x - mouse.x, 2) + Math.pow(mb.y - mouse.y, 2))
        let distance = give.endX - mouse.x

        //const maxDistance = Math.sqrt(Math.pow(mb.x - give.x, 2) + Math.pow(mb.y - give.y, 2))
        const maxDistance = give.endX - give.x

        //So, we will get the percentage of the max distance away
        let percentageAway = distance / maxDistance
        

        //Now we want to follow a logarithmic curve on the percentageAway function.
        if (mouse.x - give.x > 0 && mouse.x < mb.x) {

            //Now we will animate each mandelbrot accordingly
            if (percentageAway <= 1 && percentageAway >= 0) {
                //cyan
                cyan.style.left = (-mbTranslations.left * (1 - Math.pow(percentageAway, 2))) + fP.left + '%'
                //yellow
                yellow.style.top = (mbTranslations.top * (1 - Math.pow(percentageAway, 2))) + fP.top + 'px'
                //magenta
                magenta.style.left = (mbTranslations.left * (1 - Math.pow(percentageAway, 2))) + fP.left + '%'
            }
        } else if (mouse.x - give.x <= 0) {
            //cyan
            cyan.style.left = fP.left + '%'
            //yellow
            yellow.style.top = fP.top + 'px'
            //magenta
            magenta.style.left = fP.left + '%'
        } else if ( mouse.x >= mb.x ) {
            //cyan
            cyan.style.left = -mbTranslations.left + fP.left + '%'
            //yellow
            yellow.style.top = mbTranslations.top + fP.top + 'px'
            //magenta
            magenta.style.left = mbTranslations.left + fP.left + '%'
        }
}

function animatePageOneMandelbrot() {
    disableScrollEvents()
    const movements = [300, 400, 800, 300]
    //final positions
    //top is in px, left is in %
    let p = 0
    function getTiming(frameNo) {
        let cum = 0
        for (let i = 0; i <= frameNo; i++) {
            cum += movements[i]
        }
        return cum
    }
    
    window.scrollTo(0,0)

    smallMandelbrots.forEach((el) =>  {
        el.style.opacity = '0'
        el.style.transition =" all .0s ease-out"
    })
    
    //cyan
    cyan.style.left = -mbTranslations.left + fP.left + '%'
    //yellow
    yellow.style.top = mbTranslations.top + fP.top + 'px'
    //magenta
    magenta.style.left = mbTranslations.left + fP.left + '%'

    let opacities = 0
    let deltaOpacity = .01
    //animate opacity in
    setTimeout(() => {
        let opacities = 0
        //we start the animation at movements[1], but
        //our internal fadein is different.
        let timing = 400
    
        /*smallMandelbrots.forEach((el) =>  {
            //el.style.transition =" all .7s ease-out"
        })*/
        /*
            if we want 1000 millisecond animation
            deltaOpacity is .05
    
            calculation is (delta per frame * total frames = full opacity)
            To get total frames, we take (full opacity (1) and divide by (deltaOpacity))
            x = 1 / .05
            which would equal 20. So then to make it 40
            we multiple 20 by 2, so we take the timing (1000), divide by 1000
            timing / 1000 = time
    
            so if we have 1% delta opacity to 100%, we want it to run for 4 seconds
            we get the frames (100) = (1/.01)
    
            we need to display 100 frames over four seconds
            so for 4000 milliseconds, each frame much stand for 40 milliseconds
            4000 / 100 which is equal to timing / ( 1 / deltaOpacity)
        */
        let animateOpacity = setInterval(() => {
            opacities += deltaOpacity
            big.style.opacity = opacities
            if (opacities >= 1) {
                clearInterval(animateOpacity)
            }
        }, timing / (1 / deltaOpacity))
        
    
        window.scrollTo(0,0)
    }, getTiming(0))
    
    setTimeout(() => {
        let opacities = 0

        let timing = 800
        let deltaOpacity = .01

        let animateOpacity = setInterval(() => {
            opacities += deltaOpacity
            smallMandelbrots.forEach(el => {
                el.style.opacity = opacities
            })
            if (opacities >= 1) {
                clearInterval(animateOpacity)
            }
        }, timing / (1 / deltaOpacity))
    
        window.scrollTo(0,0)

        //animate the arrows prior to their opacity increasing
        let notifyArrows = document.getElementById("notifier-arrows")
        notifyArrows.style.transition = 'all 1s ease-in-out'
        let down = true
        let animateArrows = setInterval(() => {
            down ? notifyArrows.style['margin-top'] = '10px' : notifyArrows.style['margin-top'] = '0px'
            down = !down
        }, 1000)

    }, getTiming(1))

    setTimeout(() => {
        //Fadein our scroll notifier and transition those colored mandelbrots inward
        smallMandelbrots.forEach((el) =>  {
            el.style.transition = "all .3s ease-in-out 0s"
        })
        //cyan
        cyan.style.left = fP.left + '%'
        //yellow
        yellow.style.top = fP.top + 'px'
        //magenta
        magenta.style.left = fP.left + '%'



        //fadein scroll notifier
        notifier = document.getElementById('mandelbrot-notifier')
        let opacities = 0
        let timing = 400

        let animateOpacity = setInterval(() => {
            opacities += deltaOpacity
            notifier.style.opacity = opacities
            if (opacities >= 1) {
                clearInterval(animateOpacity)
            }
        }, timing / (1 / deltaOpacity))

    }, getTiming(2))


    setTimeout(() => {

        console.log("here")
        //calculate the center of the image, get the cursor x and y, and then mandelbrots based on radius.
        //get these values
        smallMandelbrots.forEach((el) =>  {
            //el.style.transition = "all .5s  linear 0s"
            el.style.transition = "all 0s"
        })


        addEventListener('mousemove', animateOnMouseMove)
        allowScrollEvent()
        
    }, getTiming(3))
    
    
}

const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

let mWTopPos = -480


const scrollToPage = (cP, nP) => {
    console.log('From %d to %d', cP, nP)
    disableScrollEvents()
    if (nP < 0 || nP > 3) {
        console.log("nP is outside of bounds: ", nP)
        allowScrollEvent()
        currentPage = cP
    }
    

    switch (cP) {
        case 0:
            
            
            //zoom into the mandelbrot
            const movements = [800, 100, 500, 1000]

            removeEventListener('mousemove', animateOnMouseMove)

            function getTiming(frameNo) {
                let cum = 0
                for (let i = 0; i <= frameNo; i++) {
                    cum += movements[i]
                }
                return cum
            }
            notifier = document.getElementById('mandelbrot-notifier')
            notifier.style = null
            clearInterval(animateArrows)
                            
            //document.querySelector(".name").style.color = 'green';
            const bigTop = '-900px'
            const bigLeft = '50%'
            big.style.transition = "all .8s ease-in"
            big.style.top = bigTop
            big.style.left = bigLeft
            //big.style.transform = 'translate(0, -1200px)'
            big.style.width = (viewportWidth * 4) + 'px'
            
            smallMandelbrots.forEach((el) =>  {
                el.style.transition = "all .8s ease-in"
                el.style.width = (viewportWidth * 4) + 'px'
            })
            cyan.style.top = bigTop
            cyan.style.left = '0%'

            yellow.style.top = '-1500px'
            yellow.style.left = bigLeft

            magenta.style.top = bigTop
            magenta.style.left = '100%'
            

            //Now we just adjust the background to be black and scroll to page 2
            setTimeout(() => {
                page1.style.transition = null
                page1.style["background-color"] = "#000"
            }, getTiming(0))

            setTimeout(() => {
                document.getElementById("main-container").style["background-color"] = "#000"
                big.style = null
                smallMandelbrots.forEach(el => el.style = null)
                
                page1.style.transition = "all .6s ease-in"
                page1.style.top = '-100vh'
            }, getTiming(1))

            setTimeout(() => {
                window.scrollTo(0, 200)
            }, getTiming(2))

            setTimeout(() => {                
                notifier.style = null
                page2.style.transition = "all .6s ease-out"
                page2.style["top"] = '200px'
            }, getTiming(2) + 100)
            
            
            
            //Finally release the return to reenable the scroll
            
            setTimeout(() => {
                let page2Nav = document.getElementById('page-2-nav')
                page2Nav.style.opacity = '0'
                page2Nav.style.transition = 'all 1s linear'
                page2Nav.style.opacity = '1'
                //also give big-white a display value
                let notifyArrowsTwo = document.getElementById("notifier-arrows-2")
                notifyArrowsTwo.style.transition = 'all 1s ease-in-out'
                let down = true
                page2Nav.addEventListener('click', scrollToPage.bind(null, 1, 2))
                let animateArrowsTwo = setInterval(() => {
                    down ? notifyArrowsTwo.style['margin-top'] = '5px' : notifyArrowsTwo.style['margin-top'] = '0px'
                    down = !down
                }, 1000)

                mW.style.display = 'initial'
                window.scrollTo(0, 200)
                allowScrollEvent()
            }, getTiming(3))
            

            break
        case 1:
            
            if (nP == 0) {
                /**
                 * Page 1 to Page 0 (scroll up)
                 */
                const movements = [600, 1000, 1700]
                
                function getTiming(frameNo) {
                    let cum = 0
                    for (let i = 0; i <= frameNo; i++) {
                        cum += movements[i]
                    }
                    return cum
                }
                
                //first for reverse
                page2Nav.style = null
                page2.style.transition = null
                window.scrollTo(0, 0)
                page2.style.top = "0px"
                clearInterval(animateArrowsTwo)

                setTimeout(() => {
                    console.log("point 0 fired")
                    page2.style.transition = "all 1s ease-in-out"
                    page2.style.top = '200vh'
                }, 100)
                

                setTimeout(() => {
                    console.log("point 1 fired")
                    page1.style.transition = "all 1s ease-in-out"
                    page1.style.top = '0vh'

                    big.style.transition = "all 0s"
                    big.style["background-color"] = "black"
                    big.style.opacity = '1'
                    big.style.top = '-600px'
                    big.style['min-width'] = '4000px'
                    big.style.width = (viewportWidth*3) + 'px'

                    let acc = -50
                    let leftAcc = 0
                    smallMandelbrots.forEach((el) =>  {
                        el.style.transition = "all 0s"
                        el.style.top = -50 + acc + 'vw'
                        el.style.left = 30 + leftAcc + '%' 
                        el.style.width = (viewportWidth * 1) + 'px'
                        el.style.opacity = '1'
                        leftAcc += 20
                    })
                    document.getElementById("main-container").style["background-color"] = "#fff"
                    page1.style["background-color"] = "inherit"
                }, getTiming(0))


                
                setTimeout(() => {
                    console.log("point 2 fired")
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
                    mW.style = null
                    document.getElementById("main-container").style = null
                    window.scrollTo(0, 0)
                    console.log('point 3 fired')
                    animatePageOneMandelbrot()
                    setTimeout(() =>  allowScrollEvent(), 700)
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
                window.scrollTo(0, 200)
                const movements = [200, 1000, 300, 1500]
                function getTiming(frameNo) {
                    let cum = 0
                    for (let i = 0; i <= frameNo; i++) {
                        cum += movements[i]
                    }
                    return cum
                }
                
                page2Nav.style = null
                clearInterval(animateArrowsTwo)
                //So first set up our white mandelbrot to be just below the view height
                mW.style.opacity = "1"
                mW.style.top = "100vh"

                setTimeout(() => {
                    mW.style.transition = "all 1s ease-in"
                    mW.style.top = mWTopPos + "px"
                    window.scrollTo(0, 200)
                }, getTiming(0))

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
                    page3.style.top = '200px'
                }, getTiming(3) - 1000)

                setTimeout(() => {
                    window.scrollTo(0, 200)
                    setTimeout(() =>  allowScrollEvent(), 300)
                }, getTiming(3))
                
            }
            break
        case 2:
            //can only scroll up for now..
            if (nP == 1) {
                
                const movements = [1500, 300, 1000]
                function getTiming(frameNo) {
                    let cum = 0
                    for (let i = 0; i <= frameNo; i++) {
                        cum += movements[i]
                    }
                    return cum
                }

                //move the resume down
                page3.style.transition = "all 1s ease-in"
                page3.style["top"] = "200vh"
                //this is the literal reverse
                mW.style.transition = "all 1.5s cubic-bezier(.61,.05,1,.09) 0s"

                mWTopPos += 4600
                mW.style.top = mWTopPos + "px"


                //begin the reverse
                setTimeout(() => {
                    //all 1.5s cubic-bezier(0.09, 1.03, 0.05, 0.61) 0s
                    mW.style.transition = "all .3s linear"
                    page2.style.transition = "all .3s linear"
                    let page2Top = 200
                    mWTopPos += page2Top
                    page2.style.top = page2Top + "px"
                    mW.style.top = mWTopPos + "px"
                }, getTiming(0))

                //send the mandelbrot down
                setTimeout(() => {
                    mW.style.transition = "all 1s ease-out"
                    mW.style.top = "100vh"
                }, getTiming(1))

                setTimeout(() => {
                    mWTopPos = -480
                    mW.style = null
                    page3.style = null
                    page2.style.transition = "1s ease-in-out 0s"
                    page2.style.top = "200px"
                    mW.style.display = 'initial'
                    window.scrollTo(0, 200)

                    let page2Nav = document.getElementById('page-2-nav')
                    page2Nav.style.opacity = '0'
                    page2Nav.style.transition = 'all 1s linear'
                    page2Nav.style.opacity = '1'
                    console.log("here we are 2")
                    //also give big-white a display value
                    let notifyArrowsTwo = document.getElementById("notifier-arrows-2")
                    notifyArrowsTwo.style.transition = 'all 1s ease-in-out'
                    let down = true
                    let animateArrowsTwo = setInterval(() => {
                        down ? notifyArrowsTwo.style['margin-top'] = '5px' : notifyArrowsTwo.style['margin-top'] = '0px'
                        down = !down
                    }, 1000)

                    setTimeout(() =>  allowScrollEvent(), 300)
                }, getTiming(2))

            } else {
                window.scrollTo(0, 200)
                setTimeout(() =>  allowScrollEvent(), 300)
                currentPage = cP
            }
            break
        case 3:
            break
    }


    currentPage = nP
}





let ticking = false
let currentPage = 0
function allowScrollEvent() {
    enableScroll()
    ticking = false
    console.log('scrolling re-enabled!')
}
function disableScrollEvents() {
    disableScroll()
    ticking = true
}

/**
 * This is our main function for loading
 * 
 */
window.addEventListener('load', (e) => {
    console.log("Loaded!!!")
    
    if (window.innerWidth < 810) {
        document.getElementById("main-container").innerHTML = "<div class=\"content-header\">Preview is unavailable on this device. Please refresh on browser with a width larger than 810px.</div>"
    }

    smallMandelbrots = document.querySelectorAll('.mandelbrot-small')
    cyan = document.getElementById("cyan")
    yellow = document.getElementById("yellow")
    magenta = document.getElementById("magenta")
    big = document.getElementById("big-dark")
    page1 = document.getElementById("page-1")
    page2 = document.getElementById("page-2")
    page3 = document.getElementById("page-3")
    mW = document.getElementById("big-white")
    notifier = document.getElementById('mandelbrot-notifier')
    notifyArrows = document.getElementById("notifier-arrows")
    page2Nav = document.getElementById('page-2-nav')
    notifyArrowsTwo = document.getElementById("notifier-arrows-2")
    notifier.addEventListener('click', scrollToPage.bind(null, 0, 1))
    page2Nav.addEventListener('click', scrollToPage.bind(null, 1, 2))
    
    pageOneTypeWriter()
    setTimeout(() => animatePageOneMandelbrot(), 600)

    addEventListener('click', (e) => {
        console.log(e)
    })
})


document.addEventListener("scroll", (event) => {
    let scrollUp = this.oldScroll > this.scrollY
    this.oldScroll = this.scrollY
    event.preventDefault()
    if (!ticking) {
        disableScrollEvents()

        console.log("scroll event:")
        console.log(event)
        //perform the animation
        scrollUp ? 
            scrollToPage(currentPage, currentPage - 1) : 
            scrollToPage(currentPage, currentPage + 1)

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