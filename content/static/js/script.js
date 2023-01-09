/**
 * THIS SCRIPT RENDERS THE PAGE.
 */


/**
 * Our page is divided into 4 pages.
 * page 1 is the first thing they see.
 * page 2 is what happens when they scroll once
 * Elements that do not belong to a page are unbounded.
 */
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
]

let skills = allSkills.slice();

const colorsOnWhite = [
    '#CC0',
    '#0DD',
    '#F0F'
]

const main = () => {
    console.log("working");
}

const pageOneTypeWriter = () => {
    const staticText = "I'm your";
    let typeSpeed = 50;
    const displayTime = 1000;
    let eraseSpeed = 30;
    let clearedSpeed = 1000;
    let usedSkills = [];

    //so we will have text made based on our skills
    //then we will call type to type it, the erase it.
    //then we will 


    if (skills.length == 0) {
        skills = allSkills.slice();
    }
    //choose a color and a random skill
    let chosenSkillIndex = Math.floor(skills.length * Math.random());
    let chosenSkill = skills[chosenSkillIndex];
    skills.splice(chosenSkillIndex, 0);
    let color = colorsOnWhite[Math.floor(colorsOnWhite.length * Math.random())]
    document.getElementById("skills-intro").innerHTML = "I'm your <span id=\"skill-replaceable\" style=\"color: "+ color +"\"></span><span id=\"text-cursor\">|</span>";   

    //very poor programming practice. JS sucks, but this makes sense to me right now. gross.
    const setNewSkill = () => {
        if (skills.length == 0) {
            skills = allSkills.slice();
        }
        chosenSkillIndex = Math.floor(skills.length * Math.random());
        chosenSkill = skills[chosenSkillIndex];
        skills.splice(chosenSkillIndex, 0);
        color = colorsOnWhite[Math.floor(colorsOnWhite.length * Math.random())];
        document.getElementById("skills-intro").innerHTML = "I'm your <span id=\"skill-replaceable\" style=\"color: "+ color +"\"></span><span id=\"text-cursor\">|</span>";
    }
    //let skillText = staticText + " " + chosenSkill;

    //sets cursor speed
    let show = true;
    setInterval(() => {
        show ? document.getElementById("text-cursor").setAttribute("style", "display: inline")
            : document.getElementById("text-cursor").setAttribute("style", "display: none");
        
        show = !show;
    }, 600);

    let i = 0;
    //sets an interval for typing
    const typeForward = () => {
        console.log("typing");
        let el = document.getElementById("skill-replaceable");
        if (i < chosenSkill.length) {
            el.innerHTML += chosenSkill.charAt(i);
            i++;
        } else if (i == chosenSkill.length) {
            clearInterval(typeEvents);
            console.log("done typing");
            //now we run a function to erase the text
            setTimeout(() => {
                const eraseTyping = setInterval(() => {
                    if (i == 0) {
                        clearInterval(eraseTyping);
                        console.log("beginning new type");
                        //typeEvents = setInterval(typeForward, typeSpeed);
                        setNewSkill();
                        setTimeout(() => {
                            typeEvents = setInterval(typeForward, typeSpeed);
                        }, clearedSpeed);
                    }
                    el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1);
                    i -= 1
                }, eraseSpeed);
                
            }, displayTime);
        }
    };


    let typeEvents = setInterval(typeForward, typeSpeed);

}
/**
 * This is our main function
 * 
 */
window.addEventListener('load', (e) => {
    console.log("Loaded!!!")
    pageOneTypeWriter();
    
});