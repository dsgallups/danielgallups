/**
 * THIS SCRIPT RENDERS THE PAGE.
 */

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
let ticking = false
let currentPage = 0
let newMouse = false
let lastClientX = 0
const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let mWTopPos = -480

const fP = {
    "top": 90,
    "left": 75,
}

const mbTranslations = {
    left: 1.5,
    top: -25
}

/**
 * -------------------------------------
 *  BEGIN UNIVERSAL HELPER FUNCTIONS
 *  ------------------------------------
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

var supportsPassive = false     // modern Chrome requires { passive: false } when adding event

try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true } 
  }))
} catch(e) {}
var wheelOpt = supportsPassive ? { passive: false } : false
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

/**
 * Re-enables scroll events. Taken from Stackoverflow
 * credit to @gblazex
 * https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
 */
function allowScrollEvents() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
    window.removeEventListener('touchmove', preventDefault, wheelOpt)
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
    document.body.classList.remove("stop-scrolling")
    document.getElementById("main-container").classList.remove("stop-scrolling")
    ticking = false
}

/**
 * Disables as many scroll events as possible. Taken from Stackoverflow
 * @credit to gblazex
 * https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
 */
function disableScrollEvents() {
    document.body.classList.add("stop-scrolling")
    document.getElementById("main-container").classList.add("stop-scrolling")
    window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false)
    ticking = true
}


/**
 * Resets a page based on its configuration when viewed.
 * @param {int} pageNo 
 */
const setFinalPage = pageNo => {
    switch (pageNo) {
        case 0:
            smallMandelbrots.forEach(el => {
                el.style = null
            })
            big.style = null
            page1.style = null
            page2.style = null
            page3.style = null
            mW.style = null
            notifier.style = null
            page2Nav.style = null
            document.getElementById("main-container").style = null
            window.scrollTo(0, 0)
            animatePageOneMandelbrot()
            break
        case 1:
            page2Nav = document.getElementById('page-2-nav')
            big.style = null
            page3.style = null
            mW.style = null
            notifier.style = null
            page2Nav.style = null

            page2.style.transition = "1s ease-in-out 0s"
            page2.style.top = "200px"
            page2Nav.style.opacity = '0'
            page2Nav.style.transition = 'all 1s linear'
            page2Nav.style.opacity = '1'
            mW.style.display = 'initial'
            window.scrollTo(0, 200)
            break
        case 2:
            break
        default:
            break
    }
}
const getTiming = (movements, frameNo) => {
    let cum = 0
    for (let i = 0; i <= frameNo; i++) {
        cum += movements[i]
    }
    return cum
}
/**
 * A commonly used pattern that provides a translation from the standard location defines in fP.
 * @param {float} deltaLeft 
 * @param {int} deltaTop 
 */
const translateBrots = (deltaLeft, deltaTop) => {
    //cyan
    cyan.style.left = -deltaLeft + fP.left + '%'
    //yellow
    yellow.style.top = deltaTop + fP.top + 'px'
    //magenta
    magenta.style.left = deltaLeft + fP.left + '%'
}
/**
 * -------------------------------------
 *  END UNIVERSAL HELPER FUNCTIONS
 *  ------------------------------------
 */


/**
 * -------------------------------------
 *  BEGIN PAGE ONE FUNCTIONS
 *  ------------------------------------
 */

/**
 * Animates a fake typer on the first page
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
    const typeSpeed = 50
    const displayTime = 1000
    const eraseSpeed = 30
    const clearedSpeed = 600


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

/**
 * Animates the page one mandelbrot set based on the cursor distance from the mandelbrot
 * @param {event} e 
 */
const animateOnMouseMove = e => {

        //just so the animation doesn't jerk when user leaves one side of the window
        //and enters another
        if (Math.abs(lastClientX - e.clientX) > 220) {
            newMouse = true
        }

        lastClientX = e.clientX
        
        if (newMouse) {

            smallMandelbrots.forEach(el =>  {
                el.style.transition = "all .2s ease-in-out"
            })
            setTimeout(() => {
                smallMandelbrots.forEach(el =>  {
                    el.style.transition = "all 0s"
                })
            }, 200)
            newMouse = false
            
        }
        let mouse = {
            x: e.clientX,
            y: e.clientY
        }
        
        let mandelbrotRect = big.getBoundingClientRect()
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
                translateBrots(
                    mbTranslations.left * (1 - Math.pow(percentageAway, 2)), 
                    mbTranslations.top * (1 - Math.pow(percentageAway, 2))
                )
            }
        } else if (mouse.x - give.x <= 0) {
            translateBrots(0, 0)
        } else if ( mouse.x >= mb.x ) {
            translateBrots(mbTranslations.left, mbTranslations.top)
        }
}

/**
 * Fades in four mandelbrots and snaps the four mandelbrots into a single black mandelbrot
 */
function animatePageOneMandelbrot() {
    disableScrollEvents()
    const movements = [300, 400, 800, 300]

    
    window.scrollTo(0,0)

    smallMandelbrots.forEach(el =>  {
        el.style.opacity = '0'
        el.style.transition =" all .0s ease-out"
    })
    
    translateBrots(mbTranslations.left, mbTranslations.top)

    //animate opacity in
    setTimeout(() => {
        big.style.transition = 'all .4s linear'
        big.style.opacity = '1'
        setTimeout(() => {
        
        }, 300)
        window.scrollTo(0,0)
        
    }, getTiming(movements, 0))
    
    setTimeout(() => {
        window.scrollTo(0,0)
        smallMandelbrots.forEach(el => {
            el.style.transition = 'all .8s linear'
            el.style.opacity = '1'
        })
        //animate the arrows prior to their opacity increasing
        let notifyArrows = document.getElementById("notifier-arrows")
        notifyArrows.style.transition = 'all 1s ease-in-out'
        let down = true
        let animateArrows = setInterval(() => {
            down ? notifyArrows.style['margin-top'] = '10px' : notifyArrows.style['margin-top'] = '0px'
            down = !down
        }, 1000)

    }, getTiming(movements, 1))

    setTimeout(() => {
        //Fadein our scroll notifier and transition those colored mandelbrots inward
        smallMandelbrots.forEach(el =>  {
            el.style.transition = "all .3s ease-in-out 0s"
        })

        translateBrots(0, 0)

        //fadein scroll notifier
        notifier = document.getElementById('mandelbrot-notifier')
        notifier.style.transition = "all .4s linear"
        notifier.style.opacity = 1

    }, getTiming(movements, 2))


    setTimeout(() => {

        //calculate the center of the image, get the cursor x and y, and then mandelbrots based on radius.
        //get these values
        smallMandelbrots.forEach(el =>  {
            //el.style.transition = "all .5s  linear 0s"
            el.style.transition = "all 0s"
        })


        addEventListener('mousemove', animateOnMouseMove)
        allowScrollEvents()
        
    }, getTiming(movements, 3))
    
    
}

/**
 * -------------------------------------
 *  END PAGE ONE FUNCTIONS
 *  ------------------------------------
 */

/**
 * This function defines the behavior when scrolling between pages
 * @param {int} cP the current page
 * @param {int} nP the next page
 * @returns null
 */
const scrollToPage = (cP, nP) => {
    console.log('From %d to %d', cP, nP)
    disableScrollEvents()
    if (nP < 0 || nP > 2) {
        console.log("nP is outside of bounds: ", nP)
        setTimeout(() => allowScrollEvents(), 300)
        currentPage = cP
        return
    }
    

    switch (cP) {
        case 0:
            
            
            //zoom into the mandelbrot
            const movements = [800, 100, 500, 1000]

            removeEventListener('mousemove', animateOnMouseMove)

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
            
            smallMandelbrots.forEach(el =>  {
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
            }, getTiming(movements, 0))

            setTimeout(() => {
                document.getElementById("main-container").style["background-color"] = "#000"
                big.style = null
                smallMandelbrots.forEach(el => el.style = null)
                
                page1.style.transition = "all .6s ease-in"
                page1.style.top = '-100vh'
            }, getTiming(movements, 1))

            setTimeout(() => {
                window.scrollTo(0, 200)
            }, getTiming(movements, 2))

            setTimeout(() => {                
                notifier.style = null
                page2.style.transition = "all .6s ease-out"
                page2.style["top"] = '200px'
            }, getTiming(movements, 2) + 100)
            
            
            
            //Finally release the return to reenable the scroll
            
            setTimeout(() => {
                setFinalPage(1)
                allowScrollEvents()
            }, getTiming(movements, 3))
            

            break
        case 1:
            
            if (nP == 0) {
                /**
                 * Page 1 to Page 0 (scroll up)
                 */
                const movements = [600, 1000, 1700]
                
                //first for reverse
                page2Nav.style = null
                page2.style.transition = null
                window.scrollTo(0, 0)
                page2.style.top = "0px"
                clearInterval(animateArrowsTwo)

                setTimeout(() => {
                    page2.style.transition = "all 1s ease-in-out"
                    page2.style.top = '200vh'
                }, 100)
                

                setTimeout(() => {
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
                    smallMandelbrots.forEach(el =>  {
                        el.style.transition = "all 0s"
                        el.style.top = -50 + acc + 'vw'
                        el.style.left = 30 + leftAcc + '%' 
                        el.style.width = (viewportWidth * 1) + 'px'
                        el.style.opacity = '1'
                        leftAcc += 20
                    })
                    document.getElementById("main-container").style["background-color"] = "#fff"
                    page1.style["background-color"] = "inherit"
                }, getTiming(movements, 0))


                
                setTimeout(() => {
                    //mandelbrot comes out
                    big.style.transition = "all 1s ease-in-out"
                    big.style.top = '250vh'
                    //big.style.width = '750px'
                    smallMandelbrots.forEach(el =>  {
                        el.style.transition = "all 1.5s cubic-bezier(.76,.05,1,.6) 0s"
                        el.style.top = '200vh'
                    })
                    

                }, getTiming(movements, 1))
                
                
    
                setTimeout(() => {
                    setFinalPage(0)
                    setTimeout(() =>  allowScrollEvents(), 700)
                }, getTiming(movements, 2))
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
                
                page2Nav.style = null
                clearInterval(animateArrowsTwo)
                //So first set up our white mandelbrot to be just below the view height
                mW.style.opacity = "1"
                mW.style.top = "100vh"

                setTimeout(() => {
                    mW.style.transition = "all 1s ease-in"
                    mW.style.top = mWTopPos + "px"
                    window.scrollTo(0, 200)
                }, getTiming(movements, 0))

                //now bring everything with it >:)
                setTimeout(() => {
                    //the size of the page is 713 about
                    mW.style.transition = "all .3s linear"
                    page2.style.transition = "all .3s linear"
                    let page2Top = -800
                    mWTopPos += page2Top
                    page2.style.top = page2Top + "px"
                    mW.style.top = mWTopPos + "px"
                    
                }, getTiming(movements, 1))

                setTimeout(() => {
                    mW.style.transition = "all 1.5s cubic-bezier(.05,.61,.09,1) 0s"
                    mWTopPos += -4600
                    mW.style.top = mWTopPos + "px"
                }, getTiming(movements, 2))

                setTimeout(() => {
                    page3.style.transition = "all 1s ease-out"
                    page3.style.top = '200px'
                }, getTiming(movements, 3) - 1000)

                setTimeout(() => {
                    window.scrollTo(0, 200)
                    setTimeout(() =>  allowScrollEvents(), 300)
                }, getTiming(movements, 3))
                
            }
            break
        case 2:
            //can only scroll up for now..
            if (nP == 1) {
                
                const movements = [1500, 300, 1000]
                

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
                }, getTiming(movements, 0))

                //send the mandelbrot down
                setTimeout(() => {
                    mW.style.transition = "all 1s ease-out"
                    mW.style.top = "100vh"
                }, getTiming(movements, 1))

                setTimeout(() => {
                    mWTopPos = -480                    
                    setFinalPage(1)
                    setTimeout(() =>  allowScrollEvents(), 300)
                }, getTiming(movements, 2))

            } else {
                window.scrollTo(0, 200)
                setTimeout(() =>  allowScrollEvents(), 300)
                currentPage = cP
            }
            break
        case 3:
            break
    }


    currentPage = nP
}

/**
 * -------------------------------------
 *  BEGIN I/O FUNCTIONS
 *  ------------------------------------
 */
window.addEventListener('load', e => {

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

    let down = true
    setInterval(() => {
        down ? notifyArrowsTwo.style['margin-top'] = '5px' : notifyArrowsTwo.style['margin-top'] = '0px'
        down = !down
    }, 1000)
    
    pageOneTypeWriter()
    setTimeout(() => animatePageOneMandelbrot(), 600)
})


document.addEventListener("scroll", event => {
    let scrollUp = this.oldScroll > this.scrollY
    this.oldScroll = this.scrollY
    event.preventDefault()
    if (!ticking) {
        disableScrollEvents()

        //perform the animation
        scrollUp ? 
            scrollToPage(currentPage, currentPage - 1) : 
            scrollToPage(currentPage, currentPage + 1)

        //for testing
        //currentPage = 0;
        
    }
  
})

/**
 * -------------------------------------
 *  END I/O FUNCTIONS
 *  ------------------------------------
 */