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
    let speed = 50;
    let usedSkills = [];

    //so we will have text made based on our skills
    //then we will call type to type it, the erase it.
    //then we will 

    while (true) {
        if (skills.length == 0) {
            break;
            skills = allSkills.slice();
        }
        //choose a color and a random skill
        let chosenSkillIndex = Math.floor(skills.length * Math.random());
        let chosenSkill = skills[chosenSkillIndex];
        let color = colorsOnWhite[Math.floor(colorsOnWhite.length * Math.random())]
        document.getElementById("skills-intro").innerHTML = "I'm your <span id=\"skill-replaceable\" style=\"color: "+ color +"\"></span><span id=\"text-cursor\">|</span>";   
        //let skillText = staticText + " " + chosenSkill;

        //sets cursor speed
        let show = true;
        setInterval(() => {
            show ? document.getElementById("text-cursor").setAttribute("style", "display: inline")
                : document.getElementById("text-cursor").setAttribute("style", "display: none");
            
            show = !show;
        }, 600);

        let i = 0;
        typeText();
        function typeText() {
            if (i < chosenSkill.length) {
                document.getElementById("skill-replaceable").innerHTML += chosenSkill.charAt(i);
                i++;
                setTimeout(typeText, speed);
            }
        }
        console.log("done");
        break;
    }
}
/**
 * This is our main function
 * 
 */
window.addEventListener('load', (e) => {
    console.log("Loaded!!!")
    pageOneTypeWriter();
    
});