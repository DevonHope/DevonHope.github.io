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

var intro = 'Welcome to the house of Devon Hope\'s resume.\
            \n\nRead the explanations carefully and decide which direction to move in. Each direction leads to a new section of the resume.';

var readdisc = 'In your front pocket is a copy of my resume, enter \'read\' to download.';
//bools for varisou things
var readbool = false;
//figure out how to do this
var PROJECTS = false;
var WORK = false;
var EDUCATION = false;
var MEMES = false;

var helpdisc = 'Use \'help\' to display commands.';

var destinations = ['PROJECTS', 'WORK', 'EDUCATION', 'MEMES'];

var lkdict = {
    'HOME': 'You are standing in the main foyer of the Home.\
            \nTo the North is the hall of Projects.\
            \nTo the West is the office of Work.\
            \nTo the East is the den of Education.\
            \nTo the South is the library of Memes.',
    'PROJECTS': 'You are gazing in the hall of Projects.\
              \nTo the South is the main foyer of the Home.\
              \nTo the West is the office of Work.\
              \nTo the East is the den of Education.\
              \nTo the North is a wall.',
    'WORK': 'You are focused in the office of Work.\
            \nTo the North is the hall of Projects.\
            \nTo the West is a window.\
            \nTo the East is the main foyer of the Home.\
            \nTo the South is the library of Memes.',
    'EDUCATION': 'You are sitting in the den of Education.\
            \nTo the North lies the hall of Projects.\
            \nTo the West is the main foyer of the Home.\
            \nTo the East is another wall, with a small crack.\
            \nTo the South is the library of Memes.',
    'MEMES': 'You are standing in the library of Memes.\
            \nTo the North lies the main foyer of the Home.\
            \nTo the West is the office of Work.\
            \nTo the East is the den of Education.\
            \nTo the South is half eaten sandwich on an endtable.'

};

var map = '...........-P-..........\
           \n........--------........\
           \n.....--------------.....\
           \n..--------------------..\
           \n-W----------H---------E-\
           \n..--------------------..\
           \n.....--------------.....\
           \n........--------........\
           \n...........-M-..........';

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

//format of resuts pages
var respages = {
    'PROJECTS': {
        'Software Dev': {
            'DevonHope.github.io': {
                'desc': 'A website to promote and display my educational, professional and personal experience through a small text based adventure game.',
                'status': 'in development',
                'link': 'https://devonhope.github.io/'
            }, 'Bookstore-Webapp': {
                'desc': 'A bookstore of sorts aimed at providing a community based website to share digital copies of books, only accessible through a QR code that would be stapled in said community. Languages: PostGreSQL, python, latex, css, html, js',
                'status': 'in development',
                'link': 'https://github.com/DevonHope/Online-Bookstore-Webapp'
            }, 'pdfcombine': {
                'desc': 'Python script, originally a latex script, to combine all pdfs in a given folder.',
                'status': 'complete',
                'link': 'https://github.com/DevonHope/pdfcombine'
            }, 'Python-CSV-Parser': {
                'desc': 'A python script to parse csv given in a specific format, can be modified for any format.',
                'status': 'complete',
                'link': 'https://github.com/DevonHope/Python_CSV_Parser'
            }, 'Meme-to-CC': {
                'desc': 'A python script using the reddit-API to scrape set subreddits for memes and then format and crop those memes to fit the standard size requirments of a Google Chromecast, to be used as a set of wallpapers.',
                'status': 'roadblock: google-api for google photos only allows the upload of photos to newly created albums, and chromecast requires the manual setting of photos folder to use.',
                'link': 'https://github.com/DevonHope/Meme-to-CC'
            }
        }, 'Hardware Integration Development': {
            'Smart Home Monitoring System': {
                'desc': 'A DIY smart home montioring system, comprised of three externerl cameras,\
                        two external door senors and a central computer used to process the \
                        information and handle events. The computer is a Raspberry PI 3, \
                        running custom adaptations of a linux apache server to communicate with the devices.',
                'status':'in development, 2 cameras and 2 door sensors are operational'
            }, 'Custom Ad-blocking Pi-hole': {
                'desc': 'A raspberry pi running a modified version of the latest Pi-hole software to block specific apps and ads from accessing a home network.',
                'status':'in development: All device ad-blocking is operational, all device app blocking is not.'
            }, 'Racing Simulator': {
                'desc': 'A frabricated wooden and aluminum frame housing a fanatecs racing wheel, pedals, gear shift, and racing seat.',
                'status':'complete'
            }, 'PC Builds': {
                'Sharky': {
                    'desc': {
                        'CPU': 'AMD Ryzen 7 3800x',
                        'CPU Cooler':''
                    }
                }, 'Walter White': {
                    
                }
            }
        }
    }
}

//setup process
function setup(){
    var cons = document.getElementById('consout');
    var curarea = document.getElementById('calbl');
    var arlbl = document.getElementById('arlbl');
    var inp = document.getElementById('in');
    //set console start output

    cons.value = intro+"\n\n"+lkdict['HOME']+"\n"+readdisc+"\n\n"+helpdisc;
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
    if (!rval) {
        value = 'Command not recognized, use \'help\' to print usable commands.';
    }else if (rval.includes('help')) {
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
    } 

    //add returned values to consout
    var newcons = cons.value + "\n\n> " + inp.value + "\n\n" + value;
    cons.value = newcons;
    //set scroll bar to bottom
    cons.scrollTop = cons.scrollHeight;
    inp.value = '';

    //open the results pages
    res();
}

//results page function
function res() {
    var ca = document.getElementById('calbl').innerHTML;
    if (destinations.some(substring => ca.includes(substring))) {
        if (ca === destinations[3]) {
            window.open('https://imgur.com/t/memes');
        } else if (ca === destinations[0]) {
            //open projects in res div

        }
    }
}

//validate input string
function val(inp) {
    var linp = inp.value.toLowerCase();
    linp = linp.replace(/[^0-9a-z]/gi, '');
    console.log(linp);
    if (directions.some(substring => linp.includes(substring))) {
        if (linp.includes('go')) {
            var v = linp.split('go')[1];
            return v;
        } else {
            return linp;
        }
    } else {
        return false;
    }
}

function lookat() {
    var ca = document.getElementById('calbl').innerHTML;
    for (n in lkdict) {
        if (ca === n) {
            return lkdict[n];
        }
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
        if (ca.innerHTML === area) {
            for (dir in descdict[area]) {
                if (inp === dir) {
                    //handle lowercase destinations
                    if (descdict[area][dir].match(/[a-z]/)) {
                        val = destidict[descdict[area][dir]];
                        if (descdict[area][dir] === 'rh') {
                            ca.innerHTML = 'HOME';
                        } else {
                            ca.innerHTML = area;
                        }
                        return val;
                    } else {
                        //handle first time visits to each destination
                        if (!PROJECTS || !WORK || !EDUCATION || !MEMES) {
                            if (descdict[area][dir] === 'PROJECTS' && !PROJECTS) {
                                PROJECTS = true;
                                val = lkdict['PROJECTS'];
                            } else if (descdict[area][dir] === 'WORK' && !WORK) {
                                WORK = true;
                                val = lkdict['WORK'];
                            } else if (descdict[area][dir] === 'EDUCATION' && !EDUCATION) {
                                EDUCATION = true;
                                val = lkdict['EDUCATION'];
                            } else if (descdict[area][dir] === 'MEMES' && !MEMES) {
                                MEMES = true;
                                val = lkdict['MEMES'];
                            } else {
                                val = destidict[descdict[area][dir]];
                            }
                        } else {
                            val = destidict[descdict[area][dir]];
                        }
                        ca.innerHTML = descdict[area][dir];
                        return val;
                    }   
                }
            }
        }
    }
}