//js file for console input/output handeling

const resumePath = 'assets/DevonHope_resume.pdf'

const directions = ['north','south','west','east','help','read','look','map'];

const helpstr = 'HELP - Commands\
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

const intro = 'Welcome to my website.\
            \n\nRead the explanations carefully and decide which direction to move in. Each direction leads to a new section of the website.';

const readdisc = 'In your front pocket is a copy of my resume, enter \'read\' to download.';
//bools for varisou things
var readbool = false;
//figure out how to do this
var PROJECTS = false;
var WORK = false;
var EDUCATION = false;
var MEMES = false;

const helpdisc = 'Use \'help\' to display commands.';

const destinations = ['PROJECTS', 'WORK', 'EDUCATION', 'MEMES'];

const lkdict = {
    'HOME': 'You are standing in the main foyer of the Home.\
            \nTo the North is the hall of Projects.\
            \nTo the West is the office of Work.\
            \nTo the East is the library of Education.\
            \nTo the South is the den of Memes.',
    'PROJECTS': 'You are gazing in the hall of Projects.\
              \nTo the South is the main foyer of the Home.\
              \nTo the West is the office of Work.\
              \nTo the East is the library of Education.\
              \nTo the North is a wall.',
    'WORK': 'You are focused in the office of Work.\
            \nTo the North is the hall of Projects.\
            \nTo the West is a window.\
            \nTo the East is the main foyer of the Home.\
            \nTo the South is the den of Memes.',
    'EDUCATION': 'You are sitting in the den of Education.\
            \nTo the North lies the hall of Projects.\
            \nTo the West is the main foyer of the Home.\
            \nTo the East is another wall, with a small crack.\
            \nTo the South is the den of Memes.',
    'MEMES': 'You are standing in the library of Memes.\
            \nTo the North lies the main foyer of the Home.\
            \nTo the West is the office of Work.\
            \nTo the East is the library of Education.\
            \nTo the South is half eaten sandwich on an endtable.'

};

const map =    '...........-P-...........\
              \n........---------........\
              \n.....---------------.....\
              \n..---------------------..\
              \n-W----------H----------E-\
              \n..---------------------..\
              \n.....---------------.....\
              \n........---------........\
              \n...........-M-...........\
              \nLEGEND: \
              \n P - PROJECTS \
              \n W - WORK \
              \n E - EDUCATION \
              \n M - MEMES ';

const destidict = {
    "PROJECTS": "You have entered the hall of Projects.",
    "MEMES": "You have entered the den of Memes.",
    "EDUCATION": "You have entered the library of Education.",
    "WORK": "You have entered the office of Work.",
    "rh": "You have returned to the foyer of the Home.",
    "den": "I too wish to walk through walls.",
    "dew": "That is a wall.",
    "dee": "There is a window here, you can see a bird (chirp-chirp).",
    "des": "You cannot go through walls."
};

const descdict = {
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

//all page info in html

const inhtml = {
    'PROJECTS': {
        'html': `<label class="pagehead"> PROJECTS</label >
                <div class="subhead">Software Dev</div>
                <div class="subsub">DevonHope.github.io</div>
                <div class="subsubsub">Description: A website to promote and display my educational, professional and personal experience through a small text based adventure game.</div>
                <div class="subsubsub">Status: In development</div>
                <div class="subsubsub">Link: <a href="https://devonhope.github.io/" target="_blank" rel="noopener noreferrer">https://devonhope.github.io/</a></div>

                <div class="subsub">Bookstore-Webapp</div>
                <div class="subsubsub">Description: A bookstore of sorts aimed at providing a community based website to share digital copies of books, only accessible through a QR code that would be stapled in said community. Languages: PostGreSQL, python, latex, css, html, js</div>
                <div class="subsubsub">Status: In development</div>
                <div class="subsubsub">Link: <a href="https://github.com/DevonHope/Online-Bookstore-Webapp" target="_blank" rel="noopener noreferrer">https://github.com/DevonHope/Online-Bookstore-Webapp</a></div>

                <div class="subsub">pdfcombine</div>
                <div class="subsubsub">Description: Python script, originally a latex script, to combine all pdfs in a given folder.</div>
                <div class="subsubsub">Status: Complete</div>
                <div class="subsubsub">Link: <a href="https://github.com/DevonHope/pdfcombine" target="_blank" rel="noopener noreferrer">https://github.com/DevonHope/pdfcombine</a></div>

                <div class="subsub">Python-CSV-Parser</div>
                <div class="subsubsub">Description: A python script to parse csv given in a specific format, can be modified for any format.</div>
                <div class="subsubsub">Status: Complete</div>
                <div class="subsubsub">Link: <a href="https://github.com/DevonHope/Python_CSV_Parser" target="_blank" rel="noopener noreferrer">https://github.com/DevonHope/Python_CSV_Parser</a></div>

                <div class="subsub">Meme-to-CC</div>
                <div class="subsubsub">Description: A python script using the reddit-API to scrape set subreddits for memes and then format and crop those memes to fit the standard size requirments of a Google Chromecast, to be used as a set of wallpapers.</div>
                <div class="subsubsub">Status: roadblock: google-api for google photos only allows the upload of photos to newly created albums, and chromecast requires the manual setting of photos folder to use.</div>
                <div class="subsubsub">Link: <a href="https://github.com/DevonHope/Meme-to-CC" target="_blank" rel="noopener noreferrer">https://github.com/DevonHope/Meme-to-CC</a></div>

                <div class="subsub"></div>
                <div class="subhead">Hardware Integration Development</div>
                <div class="subsub">Smart Home Monitoring System</div>
                <div class="subsubsub">
                    Description: A DIY smart home montioring system, comprised of three externerl cameras,
                    two external door senors and a central computer used to process the
                    information and handle events. The computer is a Raspberry PI 3,
                    running custom adaptations of a linux apache server to communicate with the devices.
                </div>
                <div class="subsubsub">Status: in development, 2 cameras and 2 door sensors are operational</div>

                <div class="subsub">Custom Ad-blocking Pi-hole</div>
                <div class="subsubsub">Description: A raspberry pi running a modified version of the latest Pi-hole software to block specific apps and ads from accessing a home network.</div>
                <div class="subsubsub">Status: in development: All device ad-blocking is operational, all device app blocking is not.</div>

                <div class="subsub">Racing Simulator</div>
                <div class="subsubsub">Description: A frabricated wooden and aluminum frame housing a fanatecs racing wheel, pedals, gear shift, and racing seat.</div>
                <div class="subsubsub">Status: Complete</div>`,
        'height':'2200px'
    }, 'WORK': {
        'html': `<label class="pagehead">WORK</label>
            <div class="subsub">RegistrationSafe</div>
            <div class="subsubsub">Position: Fullstack web devevloper, desiging and implementing a full frontend + demo backend with API/PgSQL DB/RedHat server</div>
            <div class="subsubsub">From: 2022-Present</div>

            <div class="subsub">Haunted House Creations</div>
            <div class="subsubsub">Position: CNC Machine Operator/3D Modeler/Product Designer</div>
            <div class="subsubsub">From: 2022-Present</div>

            <div class="subsub">The Source</div>
            <div class="subsubsub">Position: Sales Rep</div>
            <div class="subsubsub">From: 2019-2020</div>

            <div class="subsub">Town of Aurora Summer Camp's</div>
            <div class="subsubsub">Position: Camp counselor/swim insrtructor</div>
            <div class="subsubsub">From: 2016-2018</div>

            <div class="subsub">Town of Aurora Pools</div>
            <div class="subsubsub">Position: Lifeguard/swim instructor</div>
            <div class="subsubsub">From: 2015-2017</div>

            <div class="subsub">Menchie's</div>
            <div class="subsubsub">Position: Sales Rep</div>
            <div class="subsubsub">From: 2015-2017</div>`,
        'height':'1300px'
    }, 'EDUCATION': {
        'html': `<label class="pagehead">EDUCATION</label>
            <div class="subsub">Carleton University</div>
            <div class="subsubsub">Degree: Bachelor of Computer Science</div>
            <div class="subsubsub">From: 2016-2022</div>

            <div class="subsub">Holy Trinity School</div>
            <div class="subsubsub">Degree: Highschol Diploma</div>
            <div class="subsubsub">From: 2012-2016</div>

            <div class="subhead"></div>
            <div class="subhead">EXPERIENCES</div>
            <div class="subsub">Carleton Hackathon Club</div>
            <div class="subsubsub">Position: Co-internal Director</div>
            <div class="subsubsub">From: 2017-2019</div>`,
        'height':'1000px'
    }, 'ABOUT' : {
        'html' : `<label class="pagehead">ABOUT</label>
            <div class="subhead">
                I am a computer science nerd, specializing in designing, developing, and implementing
                software and hardware solutions of any kind, anywhere. I love to make, listen and explore
                the powers of music in my free time and dabble in hardware design for
                PCs, synthesizers, pianos and music production hardware.
            </div>
            <div class="subhead">Github: <a href="https://github.com/DevonHope" target="_blank" rel="noopener noreferrer">https://github.com/DevonHope</a></div>
            <div class="subhead"></div>
            <div class="subhead">Hobbies</div>
            <div class="subsubsub">Hardware Integration</div>
            <div class="subsubsub">Software Dev</div>
            <div class="subsubsub">Music Creation</div>
            <div class="subsubsub">Synth Modifying</div>
            <div class="subsubsub">DIY Hardware Design</div>
            <div class="subhead"></div>
            <div class="subhead">Technical Skills</div>
            <div class="subsub">Web Dev:</div>
            <ul class="lisub">
                <li>HTML5</li>
                <li>SCSS,CSS</li>
                <li>Javascript</li>
            </ul>
            <div class="subsub">Mobile:</div>
            <ul class="lisub">
                <li>JDK</li>
                <li>Java 8-10</li>
            </ul>
            <div class="subsub">Runtime Environment:</div>
            <ul class="lisub">
                <li>Node.js</li>
            </ul>
            <div class="subsub">Script:</div>
            <ul class="lisub">
                <li>Python3.9</li>
            </ul>
            <div class="subsub">Command Line Interface:</div>
            <ul class="lisub">
                <li>Bash</li>
                <li>Windows PowerShell</li>
                <li>Batch</li>
            </ul>
            <div class="subsub">Multiparadigm:</div>
            <ul class="lisub">
                <li>C,C++</li>
                <li>Objective-C</li>
                <li>Python</li>
                <li>Racket</li>
            </ul>
            <div class="subsub">DB Query:</div>
            <ul class="lisub">
                <li>MongoDB</li>
                <li>MySQL</li>
                <li>PostGreSQL</li>
            </ul>
            <div class="subsub">Compiled Languages:</div>
            <ul class="lisub">
                <li>Haskell</li>
                <li>Scheme</li>
            </ul>
            <div class="subsub">Rule Based:</div>
            <ul class="lisub">
                <li>Prolog</li>
            </ul>`
    }
}

const setupDict = {
    1 : {
      id : 'work_res',
      html : 'WORK'
    },
    2 : {
      id : 'projects_res',
      html : 'PROJECTS'
    },
    3 : {
      id : 'education_res',
      html : 'EDUCATION'
    },
    4 : {
      id : 'about_res',
      html : 'ABOUT'
    }
}

//setup process
function setup(page){
    if (page == 0){
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
    } else {
      for (i in setupDict){
        if (page == i){
          var p = setupDict[i]
          var res = document.getElementById(p.id)
          res.innerHTML = inhtml[p.html]['html']
        }
      }
    }
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
        //ask if they want to download again
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
//for each page, the cons:height will have to be adjusted to fit properly
var resid = 'innerres';

function res() {
    var ca = document.getElementById('calbl').innerHTML;

    //check if old div exists
    if (document.getElementById(resid)) {
        removediv();
    }

    //check if the curarea is not home
    if (destinations.some(substring => ca.includes(substring))) {
        if (ca === destinations[3]) {
            window.open('https://imgur.com/t/memes', '_black');
        } else {
            //add the div
            adddiv(ca);
        }
    }
}

function adddiv(ca) {
    const di = document.createElement('div');
    di.id = resid;
    di.className = resid;
    di.style.gridArea = resid;
    for (i in inhtml) {
        if (ca === i) {
            di.innerHTML = inhtml[i]['html'];
            document.getElementsByClassName('cons')[0].style.height = inhtml[i]['height'];
            document.getElementsByClassName('cons')[0].style.paddingBottom = '30px';
            document.getElementById('res').appendChild(di);
            break;
        }
    }
}

function removediv() {
    if (document.getElementById(resid)) {
        var element = document.getElementById(resid);
        element.parentNode.removeChild(element);
        document.getElementsByClassName('cons')[0].style.height = '700px';
    }
}

//validate input string
function val(inp) {
    var linp = inp.value.toLowerCase();
    linp = linp.replace(/[^0-9a-z]/gi, '');
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
    link.href = resumePath;
    link.download = resumePath.substring(resumePath.lastIndexOf("/") + 1);
    link.dispatchEvent(new MouseEvent('click'));
    readbool = true;

    //launch mini game

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
                    }
                    if(!readbool){
                        val += "\n\n"+readdisc;
                    }
                    return val;
                }
            }
        }
    }
}

// add background changing pixel art for each room, and adventure
// add adventures
function change_bg(area){

}

// close sidenav from anywhere
//document.body.addEventListener('click', closeNav)

/*
document.addEventListener('click',function(e){
    var snav = document.getElementById("mySidenav");
    if (e.target.id !== snav.id && !snav.contains(e.target))
        document.getElementById("mySidenav").style.width = "0";
}, false);

window.onclick = function(){
    var sidenav = document.getElementById('mySidenav');
    var sideNavWidth = sidenav.style.width;

    // check to see if the event target was not the side nav
    // AND that the side nav is open
    if( event.target !== sidenav && sideNavWidth !== "0" ){
        document.getElementById("mySidenav").style.width = "0";
    }
}*/

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";
}

function menu(x) {
    x.classList.toggle("change");
    if (document.getElementById('mySidenav').style.width === '200px') {
        document.getElementById("mySidenav").style.width = "0";
    } else {
        document.getElementById("mySidenav").style.width = "200px";
    }
}
