//js file for console input/output handeling

var directions = ['north','south','west','east','help','read','look','map'];

var helpstr = 'HELP - Commands\
                    \n\nDirections:\
                    \nDesitinations are determined by your current position. Any direction can be prefaced with the term \'go\'\
                    \n\'south\'\
                    \n\'north\'\
                    \n\'west\'\
                    \n\'east\'\
                    \n\nCommands:\
                    \n\'look\': details your current location\
                    \n\'map\': provides a map of the site\
                    \n\'read\': to download my resume\
                    \n\'help\': to display this help page';

var intro = 'Welcome to the house of Devon Hopes resume.\
            \n\nRead the explanations carefully and decide which direction to move in. Each direction leads to a new section of the resume.';

var readdisc = 'In your front pocket is a copy of my resume, enter \'read\' to download.';
//bools for varisou things
var readbool = false;
//figure out how to do this
var northbool = false;
var southhbool = false;
var westbool = false;
var eastbool = false;

var helpdisc = 'Use \'help\' to display commands.';

var homelk = 'You are standing in the main foyer of the Home.\
            \nTo the North is the hall of Projects.\
            \nTo the West is the office of Work.\
            \nTo the East is the den of Education.\
            \nTo the South is the library of Memes.';

var projlk = 'You are gazing in the hall of Projects.\
              \nTo the South is the main foyer of the Home.\
              \nTo the West is the office of Work.\
              \nTo the East is the den of Education.\
              \nTo the North is a wall.';

var worklk = 'You are focused in the office of Work.\
            \nTo the North is the hall of Projects.\
            \nTo the West is a window.\
            \nTo the East is the main foyer of the Home.\
            \nTo the South is the library of Memes.';

var edulk = 'You are sitting in the den of Education.\
            \nTo the North lies the hall of Projects.\
            \nTo the West is the main foyer of the Home.\
            \nTo the East is another wall, with a small crack.\
            \nTo the South is the library of Memes.';

var memelk = 'You are standing in the library of Memes.\
            \nTo the North lies the main foyer of the Home.\
            \nTo the West is the office of Work.\
            \nTo the East is the den of Education.\
            \nTo the South is half eaten sandwich on an endtable.';

var map = '..............--PROJECTS--...........\
           ..........-------------------...........\
           .......------------------------.........\
           .....----------------------------......\
           ....WORK----------HOME---EDUCATION....\
           .....----------------------------......\
           .......-------------------------.........\
           ..........--------------------...........\
           ...............--MEMES--.................';

var destidict = {
    "PROJECTS": "You have entered the hall of Projects.",
    "MEMES": "You have entered the library of Memes.",
    "EDUCATION": "You have entered the den of Education.",
    "WORK": "You have entered the office of Work.",
    "rh": "You have returned to the foyer of the Home.",
    "den": "I too wish to walk through walls.",
    "dew": "That is a wall.",
    "dee": "There is a window here, you can see a bird (chirp-chirp).",
    "des": "You cannot go through walls."
};

var descdict = {
    "HOME": {
        "north": "PROJECTS",
        "west": "WORK",
        "east": "EDUCATION",
        "south": "MEMES"
    }, "PROJECTS": {
        "north": "den",
        "west": "WORK",
        "east": "EDUCATION",
        "south": "rh"
    }, "WORK": {
        "north": "PROJECTS",
        "west": "dew",
        "east": "rh",
        "south": "MEMES"
    }, "EDUCATION": {
        "north": "PROJECTS",
        "west": "rh",
        "east": "dee",
        "south": "MEMES"
    }, "MEMES": {
        "north": "rh",
        "west": "WORK",
        "east": "EDUCATION",
        "south": "des"
    }
};

//setup process
function setup(){
    var cons = document.getElementById('consout');
    var curarea = document.getElementById('calbl');
    var arlbl = document.getElementById('arlbl');
    var inp = document.getElementById('in');
    //set console start output

    cons.value = intro+"\n\n"+homelk+"\n"+readdisc+"\n\n"+helpdisc;
    curarea.innerHTML = 'HOME';
    arlbl.innerHTML = '>';
    inp.value = '';
    document.getElementById('in').focus();
}

//check for return carridge
function onEnter(e){
    if(e.which === 13){
        cmdloop();
    }
}

//cmd loop
function cmdloop() {
    //get the input value
    var inp = document.getElementById('in');
    //get the textare value
    var cons = document.getElementById('consout');

    //choices
    var rval = val(inp);
    var value = "";
    if (rval.includes('help')) {
        value = helpstr;
    } else if (rval.includes('look')) {
        value = lookat();
    } else if (rval.includes('map')) {
        value = map;
    } else if (rval.includes('read') && !readbool) {
        download();
        value = 'Downloaded.';
        readbool = true;
    } else if (rval.includes('read') && readbool) {
        value = 'Already downloaded.';
    } else if (rval !== false) {
        value = desc(rval);
    } else {
        value = 'Command not recognized, use \'help\' to print usable commands.';
    }

    //add returned values to consout
    var newcons = cons.value +"\n\n> "+ rval+"\n\n"+value;
    cons.value = newcons;
    //set scroll bar to bottom
    cons.scrollTop = cons.scrollHeight;
    inp.value = '';
}

//validate input string
function val(inp) {
    var linp = inp.value.toLowerCase();
    linp = linp.replace(/[^0-9a-z]/gi, '');
    if (directions.some(substring => linp.includes(substring))) {
        if (linp.includes('go')) {
            return linp.split(' ')[1];
        } else {
            return linp;
        }
    } else {
        return false;
    }
}

function lookat() {
    var ca = document.getElementById('calbl').innerHTML;
    if (ca === 'HOME') {
        return homelk;
    } else if (ca === 'WORK') {
        return worklk;
    } else if (ca === 'PROJECTS') {
        return projlk;
    } else if (ca === 'EDUCATION') {
        return edulk;
    } else if (ca === 'MEMES') {
        return memelk;
    }
}

function download() {
    var link = document.createElement('a');
    link.href = 'assets/DevonHope_Resume.pdf';
    link.download = 'DevonHope_Resume.pdf';
    link.dispatchEvent(new MouseEvent('click'));
}

function desc(inp) {
    var val;
    var ca = document.getElementById('calbl');
    for (area in descdict) {
        console.log("area: "+area);
        if (ca.innerHTML === area) {
            console.log("descdict[area]: "+descdict[area]);
            for (dir in descdict[area]) {
                console.log("dir: " + dir);
                if (inp === dir) {
                    if (descdict[area][dir].match(/[a-z]/)) {
                        console.log("descdict[area][dir]: " + descdict[area][dir]);
                        val = destidict[descdict[area][dir]];
                        if (descdict[area][dir] === 'rh') {
                            ca.innerHTML = 'HOME';
                        } else {
                            ca.innerHTML = area;
                        }
                        return val;
                    } else {
                        console.log("descdict[area][dir]: " + descdict[area][dir]);
                        val = destidict[descdict[area][dir]];
                        ca.innerHTML = descdict[area][dir];
                        return val;
                    }
                } 
            }
        }
    }
}