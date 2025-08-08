//js file for console input/output handeling

const resumePath = 'assets/DevonHope_resume.pdf'
const yamlPath = 'assets/resume.yaml'

// Global variable to store parsed YAML data
let resumeData = null;

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

// Function to load and parse YAML data
async function loadResumeData() {
    try {
        // Detect if we're on a page in the pages/ subdirectory
        const isSubPage = window.location.pathname.includes('/pages/');
        const yamlPathToUse = isSubPage ? "../assets/resume.yaml" : yamlPath;
        
        const response = await fetch(yamlPathToUse);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const yamlText = await response.text();
        resumeData = jsyaml.load(yamlText);
        console.log('Resume data loaded successfully:', resumeData);
        return resumeData;
    } catch (error) {
        console.error('Error loading YAML data:', error);
        // Fall back to static data if YAML loading fails
        return null;
    }
}

// Function to generate dynamic content based on YAML data
function generateDynamicContent() {
    if (!resumeData) {
        console.warn('No resume data available, using static content');
        return getStaticContent();
    }

    return {
        'PROJECTS': {
            'html': generateProjectsHTML(),
            'height': '2200px'
        },
        'WORK': {
            'html': generateWorkHTML(),
            'height': '1300px'
        },
        'EDUCATION': {
            'html': generateEducationHTML(),
            'height': '1000px'
        },
        'ABOUT': {
            'html': generateAboutHTML(),
            'height': '1200px'
        }
    };
}

// Generate Projects HTML - uses static content (will use separate projects YAML later)
function generateProjectsHTML() {
    return `<label class="pagehead"> PROJECTS</label >
                <div class="subhead">3D Modelling</div>
                <div id="slideshow-wrapper">
                    <button class="arrow left" onclick="scrollSlideshow(-1)" title="Previous model/slide">&#9664;</button>
                    <div id="slideshow">
                        <canvas id="modelCanvas"></canvas>
                    </div>
                    <button class="arrow right" onclick="scrollSlideshow(1)" title="Next model/slide">&#9654;</button>
                </div>
                <div id="slideshow-controls" style="text-align: center; margin: 10px 0;">
                    <button onclick="previousSlide()" style="margin: 0 5px; padding: 5px 10px; background: #333; border: 1px solid #666; color: #FFA584; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; cursor: pointer;">Previous Project</button>
                    <button onclick="nextSlide()" style="margin: 0 5px; padding: 5px 10px; background: #333; border: 1px solid #666; color: #FFA584; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; cursor: pointer;">Next Project</button>
                    <button onclick="cycleColorScheme()" style="margin: 0 5px; padding: 5px 10px; background: #444; border: 1px solid #666; color: #FFA584; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; cursor: pointer;" title="Change color scheme">Colors</button>
                    <button onclick="toggleFullscreen()" style="margin: 0 5px; padding: 5px 10px; background: #444; border: 1px solid #666; color: #FFA584; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; cursor: pointer;" title="Toggle fullscreen viewer">Fullscreen</button>
                    <button onclick="toggleExplodeView()" style="margin: 0 5px; padding: 5px 10px; background: #444; border: 1px solid #666; color: #FFA584; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; cursor: pointer;" title="Explode/collapse view">Explode</button>
                </div>

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
                <div class="subsubsub">Status: Complete</div>`;
}

// Generate Work HTML from YAML data
function generateWorkHTML() {
    let html = `<label class="pagehead">WORK</label>`;

    if (resumeData.experience) {
        resumeData.experience.forEach((job, index) => {
            html += `<div class="subsub" style="margin-bottom: 2px !important;">${job.company}</div>
                    <div class="subsubsub" style="margin-bottom: 0px !important; margin-top: 0px !important;">${job.title}</div>`;
            
            if (job.location) {
                html += `<div class="subsubsub" style="margin-bottom: 0px !important; margin-top: 2px !important;">Location: ${job.location}</div>`;
            }
            
            html += `<div class="subsubsub" style="margin-bottom: 15px !important; margin-top: 2px !important;">From: ${job.start} - ${job.end}</div>`;
            
            if (job.bullets) {
                job.bullets.forEach(bullet => {
                    html += `<div class="subsubsub" style="margin-bottom: 0px !important; margin-top: 2px !important;">• ${bullet}</div>`;
                });
            }

            // Add horizontal line between jobs (except after the last job)
            if (index < resumeData.experience.length - 1) {
                html += `<hr style="border: none; border-top: 1px solid #666; margin: 20px 0 15px 0; width: 100%;">`;
            }
        });
    }

    return html;
}

// Generate Education HTML from YAML data
function generateEducationHTML() {
    let html = `<label class="pagehead">EDUCATION</label>`;

    if (resumeData.education) {
        resumeData.education.forEach(edu => {
            html += `<div class="subsub">${edu.institution}</div>
                    <div class="subsubsub" style="margin-bottom: 0px !important; margin-top: 2px !important;">Degree: ${edu.degree}</div>`;
            
            if (edu.location) {
                html += `<div class="subsubsub" style="margin-bottom: 0px !important; margin-top: 2px !important;">Location: ${edu.location}</div>`;
            }
            
            html += `<div class="subsubsub" style="margin-bottom: 15px !important; margin-top: 2px !important;">From: ${edu.start} - ${edu.end}</div>`;
            
            if (edu.bullets) {
                edu.bullets.forEach(bullet => {
                    html += `<div class="subsubsub" style="margin-bottom: 0px !important; margin-top: 2px !important;">• ${bullet}</div>`;
                });
            }
        });
    }

    return html;
}

// Generate About HTML from YAML data
function generateAboutHTML() {
    let html = `<label class="pagehead">ABOUT</label>`;

    if (resumeData.summary) {
        html += `<div class="subhead">
                ${resumeData.summary}
            </div>`;
    }

    if (resumeData.github) {
        html += `<div class="subhead">Github: <a href="${resumeData.github}" target="_blank" rel="noopener noreferrer">${resumeData.github}</a></div>`;
    }

    if (resumeData.skills) {
        html += `<div class="subhead"></div>
                <div class="subhead">Technical Skills</div>`;

        Object.keys(resumeData.skills).forEach(category => {
            const skills = resumeData.skills[category];
            html += `<div class="subsub">${category.charAt(0).toUpperCase() + category.slice(1)}:</div>
                    <ul class="lisub">`;
            
            skills.forEach(skill => {
                html += `<li>${skill}</li>`;
            });
            
            html += `</ul>`;
        });
    }

    return html;
}

// Fallback to static content if YAML fails to load
function getStaticContent() {
    return inhtml;
}

// Function to get content (dynamic or static)
function getContentData() {
    return resumeData ? generateDynamicContent() : inhtml;
}

const inhtml = {
    'PROJECTS': {
        'html': `<label class="pagehead"> PROJECTS</label >
                <div class="subhead">3D Modelling</div>
                <div id="slideshow-wrapper">
                    <button class="arrow left" onclick="scrollSlideshow(-1)" title="Previous model/slide">&#9664;</button>
                    <div id="slideshow">
                        <canvas id="modelCanvas"></canvas>
                    </div>
                    <button class="arrow right" onclick="scrollSlideshow(1)" title="Next model/slide">&#9654;</button>
                </div>
                <div id="slideshow-controls" style="text-align: center; margin: 10px 0;">
                    <button onclick="previousSlide()" style="margin: 0 5px; padding: 5px 10px; background: #333; border: 1px solid #666; color: #FFA584; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; cursor: pointer;">Previous Project</button>
                    <button onclick="nextSlide()" style="margin: 0 5px; padding: 5px 10px; background: #333; border: 1px solid #666; color: #FFA584; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; cursor: pointer;">Next Project</button>
                    <button onclick="cycleColorScheme()" style="margin: 0 5px; padding: 5px 10px; background: #444; border: 1px solid #666; color: #FFA584; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; cursor: pointer;" title="Change color scheme">Colors</button>
                    <button onclick="toggleFullscreen()" style="margin: 0 5px; padding: 5px 10px; background: #444; border: 1px solid #666; color: #FFA584; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; cursor: pointer;" title="Toggle fullscreen viewer">Fullscreen</button>
                </div>

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
            <div class="subsub">Daydream Adventures Toronto</div>
            <div class="subsubsub">Position: Software & Hardware Engineer - Custom PCBs, software, and 3D models for escape room props</div>
            <div class="subsubsub">From: 2024-Present</div>

            <div class="subsub">Fright Ideas</div>
            <div class="subsubsub">Position: Product Designer - Custom in-house solutions for rapid testing of custom PCBs</div>
            <div class="subsubsub">From: 2023-2024</div>
            
            <div class="subsub">RegistrationSafe</div>
            <div class="subsubsub">Position: Fullstack web devevloper, desiging and implementing a full frontend + demo backend with API/PgSQL DB/RedHat server</div>
            <div class="subsubsub">From: 2022-2023</div>

            <div class="subsub">Haunted House Creations</div>
            <div class="subsubsub">Position: CNC Machine Operator/3D Modeler/Product Designer</div>
            <div class="subsubsub">From: 2022-2023</div>

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
async function setup(page){
    if (page == 0){
        // Load YAML data first
        await loadResumeData();
        
        var cons = document.getElementById('consout');
        var curarea = document.getElementById('calbl');
        var arlbl = document.getElementById('arlbl');
        var inp = document.getElementById('in');
        //set console start output

        cons.value = intro+"\n\n"+lkdict['HOME']+"\n"+readdisc+"\n\n"+helpdisc;
        curarea.innerHTML = 'HOME';
        arlbl.innerHTML = '>';
        inp.value = '';
        
        // Initialize auto-scroll behavior
        initializeAutoScroll();
        
        // Auto-scroll to bottom and focus input
        scrollConsoleToBottom();
        document.getElementById('in').focus();
    } else {
        // Load YAML data if not already loaded
        if (!resumeData) {
            await loadResumeData();
        }
        
        var p = setupDict[page]
        var res = document.getElementById(p.id)
        const contentData = getContentData();
        res.innerHTML = contentData[p.html]['html']
        if (page == 2){
            // load 3D model scene
            setupSlideshow();
        }
    }
}

// Color generation utilities for random model coloring
function generateRandomColors(count) {
    const colors = [];
    const usedHues = new Set();
    
    for (let i = 0; i < count; i++) {
        let hue, saturation, lightness, color;
        let attempts = 0;
        
        do {
            // Generate HSL color for better control over vibrancy
            hue = Math.random() * 360;
            saturation = 0.6 + Math.random() * 0.4; // 60-100% saturation for vibrant colors
            lightness = 0.4 + Math.random() * 0.3;  // 40-70% lightness for good visibility
            
            // Convert HSL to RGB for Babylon.js
            color = hslToRgb(hue, saturation, lightness);
            attempts++;
            
            // Ensure colors are distinct by checking hue separation
        } while (attempts < 10 && hasNearbyHue(hue, usedHues, 30));
        
        usedHues.add(Math.round(hue / 30) * 30); // Group hues into 30-degree buckets
        colors.push(new BABYLON.Color3(color.r, color.g, color.b));
        
        console.log(`Generated color ${i + 1}: HSL(${hue.toFixed(1)}, ${(saturation * 100).toFixed(1)}%, ${(lightness * 100).toFixed(1)}%) = RGB(${color.r.toFixed(2)}, ${color.g.toFixed(2)}, ${color.b.toFixed(2)})`);
    }
    
    return colors;
}

function hasNearbyHue(hue, usedHues, minDistance) {
    for (let usedHue of usedHues) {
        const distance = Math.min(
            Math.abs(hue - usedHue),
            360 - Math.abs(hue - usedHue)
        );
        if (distance < minDistance) {
            return true;
        }
    }
    return false;
}

function hslToRgb(h, s, l) {
    h /= 360;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h * 12) % 12;
        return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };
    return { r: f(0), g: f(8), b: f(4) };
}

// Alternative color schemes for variety
function generateColorScheme(type, count) {
    switch (type) {
        case 'rainbow':
            return generateRainbowColors(count);
        case 'warm':
            return generateWarmColors(count);
        case 'cool':
            return generateCoolColors(count);
        case 'vibrant':
        default:
            return generateRandomColors(count);
    }
}

function generateRainbowColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = (i / count) * 360;
        const color = hslToRgb(hue, 0.8, 0.5);
        colors.push(new BABYLON.Color3(color.r, color.g, color.b));
    }
    return colors;
}

function generateWarmColors(count) {
    const warmHues = [0, 30, 60, 300, 330]; // Reds, oranges, yellows, magentas
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = warmHues[i % warmHues.length] + (Math.random() - 0.5) * 20;
        const color = hslToRgb(hue, 0.7 + Math.random() * 0.3, 0.4 + Math.random() * 0.3);
        colors.push(new BABYLON.Color3(color.r, color.g, color.b));
    }
    return colors;
}

function generateCoolColors(count) {
    const coolHues = [180, 210, 240, 270, 120, 150]; // Blues, cyans, greens, purples
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = coolHues[i % coolHues.length] + (Math.random() - 0.5) * 20;
        const color = hslToRgb(hue, 0.7 + Math.random() * 0.3, 0.4 + Math.random() * 0.3);
        colors.push(new BABYLON.Color3(color.r, color.g, color.b));
    }
    return colors;
}

function setupSlideshow() {
    // Detect if we're on a page in the pages/ subdirectory
    const isSubPage = window.location.pathname.includes('/pages/');
    const basePath = isSubPage ? "../assets/3D-models/" : "assets/3D-models/";
    
    // Manual slideshow configuration - each folder becomes a slide with all its models
    const modelFolders = [
        {
            folderName: "Multipass",
            displayName: "Multipass ID Card", // Optional: custom display name
            color: new BABYLON.Color3(1, 1, 1), // White (default)
            models: [] // Will be populated from file list
        },
        {
            folderName: "Multi-Directional Eye Puzzle Mech",
            displayName: "Eye Puzzle Mechanism", // Shorter display name
            color: new BABYLON.Color3(0.8, 0.9, 1), // Light blue
            models: [] // Will be populated from file list
        },
        {
            folderName: "Ghost Hunting Gadget",
            displayName: "Ghost Hunting Device", // Shorter display name
            color: new BABYLON.Color3(0.8, 1, 0.8), // Light green
            models: [] // Will be populated from file list
        },
        {
            folderName: "Chicken Animatronic",
            displayName: "Animatronic Chicken Head", // Shorter display name
            color: new BABYLON.Color3(1, 0.8, 0.8), // Light green
            models: [] // Will be populated from file list
        },
        // Add more folders here:
        // {
        //     folderName: "YourFolderName",
        //     displayName: "Display Name", // Optional
        //     color: new BABYLON.Color3(1, 0.8, 0.8), // Light red
        //     models: []
        // },
    ];

    // Populate models from known file lists
    populateModelsFromKnownFiles(modelFolders, basePath);

    // Store globally for slideshow navigation
    window.currentSlideIndex = 0;
    window.currentModelIndex = 0; // Not used anymore but kept for compatibility
    window.slideList = modelFolders;
    window.currentEngine = null;
    window.currentScene = null;
    
    // Load the first slide with all its models
    if (modelFolders.length > 0 && modelFolders[0].models.length > 0) {
        loadSlide(0);
        updateSlideInfo();
    } else {
        console.warn("No models found in any folder");
    }
}

// Simple manual file listing system with random color assignment
function populateModelsFromKnownFiles(modelFolders, basePath) {
    const supportedExtensions = ['.glb', '.gltf', '.stl'];
    
    for (let folder of modelFolders) {
        const folderPath = basePath + folder.folderName + "/";
        
        // Get the known files for this folder
        const knownFiles = getKnownFilesForFolder(folder.folderName);
        
        // Filter supported files first
        const supportedFiles = knownFiles.filter(fileName => {
            const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
            return supportedExtensions.includes(extension);
        });
        
        // Generate random colors for all models in this folder
        console.log(`Generating ${supportedFiles.length} random colors for ${folder.folderName}`);
        
        // Choose color scheme - you can change this for different effects
        const colorSchemes = ['vibrant', 'rainbow', 'warm', 'cool'];
        const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        const randomColors = generateColorScheme(randomScheme, supportedFiles.length);
        
        console.log(`Using ${randomScheme} color scheme for ${folder.folderName}`);
        
        // Assign models with their individual random colors
        supportedFiles.forEach((fileName, index) => {
            folder.models.push({
                fileName: fileName,
                fullPath: folderPath + fileName,
                color: randomColors[index], // Each model gets its own random color
                colorScheme: randomScheme   // Track which scheme was used
            });
            
            console.log(`${folder.folderName}: ${fileName} assigned color ${index + 1} (${randomScheme})`);
        });
    }
}

// Manual file listings - UPDATE THIS when you add new files
function getKnownFilesForFolder(folderName) {
    const knownFolderContents = {
        "Multipass": [
            "ID Card Slot & Cover.stl",
            "ID Card V2 - Bottom.stl", 
            "ID Card V2 - Top.stl",
            "ID Card V2 - Yellow Bar.stl"
        ],
        "Multi-Directional Eye Puzzle Mech": [
            "EMAcrylic 4in Dome.stl",
            "EMPlate VA-4.stl",
            "EyeLid V3-2.stl",
            "Joystick.stl",
            "JS Box.stl",
            "JS Manager V3.stl",
            "Center Gromet.stl",
            "Knob.stl",
            "Small Ring Mount.stl"
        ],
        "Ghost Hunting Gadget": [
            "Circle Acrylic.stl",
            "Gadget Body.stl",
            "Gadget Shell.stl",
            "Octogon Acrylic Mount.stl",
            "Octogon Acrylic.stl"
        ],
        "Chicken Animatronic": [
            "CHICKEN MOUTH LEFT HINGE.stl",
            "CHICKEN MOUTH RIGHT HINGE.stl",
            "CHICKEN-MOUTH.stl",
            "CHP Comb.stl",
            "CHP HEAD BACK.stl",
            "CHP HEAD FRONT.stl",
            "CHP Top Beak.stl",
            "CHP Wattles.stl",
            "Head Plate.stl"
        ]
        // Add more folders and their files here:
        // "YourFolderName": ["model1.stl", "model2.glb", "model3.gltf"],
    };
    
    return knownFolderContents[folderName] || [];
}

// Function to load a specific slide with ALL models from that folder
function loadSlide(slideIndex, modelIndex = 0) {
    const slide = window.slideList[slideIndex];
    if (!slide || !slide.models || slide.models.length === 0) {
        console.error("No models found for slide", slideIndex);
        return;
    }
    
    // Reset explosion state for this slide when reloading
    if (slideExplodeStates[slideIndex] === true) {
        console.log(`Resetting explode state for slide ${slideIndex} on reload`);
        slideExplodeStates[slideIndex] = false;
        slideOriginalPositions[slideIndex] = [];
        // Reset camera radius if it was stored
        if (window.slideOriginalCameraRadius && window.slideOriginalCameraRadius[slideIndex]) {
            delete window.slideOriginalCameraRadius[slideIndex];
        }
    }
    
    // Load ALL models from the slide folder into one scene
    babylonLoadAllModelsInSlide("modelCanvas", slide);
    
    // Update global indices
    window.currentSlideIndex = slideIndex;
    window.currentModelIndex = 0; // Reset to 0 since we're showing all models
}

// Function to update slide information display
function updateSlideInfo() {
    const slide = window.slideList[window.currentSlideIndex];
    if (!slide) return;
    
    const displayName = slide.displayName || slide.folderName;
    const modelCount = slide.models.length;
    
    // Get the color scheme used for this slide (from first model)
    const colorScheme = slide.models.length > 0 ? slide.models[0].colorScheme || 'default' : 'none';
    
    // Add or update slide info display
    let slideInfo = document.getElementById('slideInfo');
    if (!slideInfo) {
        slideInfo = document.createElement('div');
        slideInfo.id = 'slideInfo';
        slideInfo.style.cssText = `
            text-align: center;
            margin: 10px 0;
            font-size: 14px;
            color: #FFA584;
            font-family: 'IBM Plex Mono', monospace;
        `;
        
        const slideWrapper = document.getElementById('slideshow-wrapper');
        if (slideWrapper && slideWrapper.parentNode) {
            slideWrapper.parentNode.insertBefore(slideInfo, slideWrapper.nextSibling);
        }
    }
    
    slideInfo.innerHTML = `${displayName}<br>All ${modelCount} models (${colorScheme} colors)`;
}

// Function to load ALL models from a slide folder into one Babylon.js scene
function babylonLoadAllModelsInSlide(canvasId, slide) {
    const canvas = document.getElementById(canvasId);
    
    if (!canvas) {
        console.error(`Canvas with id ${canvasId} not found`);
        return;
    }

    // Firefox-specific canvas setup
    const isFirefoxBrowser = navigator.userAgent.toLowerCase().includes('firefox');
    if (isFirefoxBrowser) {
        canvas.width = canvas.clientWidth || 800;
        canvas.height = canvas.clientHeight || 600;
        console.log(`Firefox: Canvas dimensions set to ${canvas.width}x${canvas.height}`);
    }

    // Construct the base path
    const isSubPage = window.location.pathname.includes('/pages/');
    const basePath = isSubPage ? "../assets/3D-models/" : "assets/3D-models/";
    const folderPath = basePath + slide.folderName + "/";

    // Dispose of existing scene and engine
    if (window.currentScene) {
        window.currentScene.dispose();
    }
    if (window.currentEngine) {
        window.currentEngine.dispose();
    }

    // Engine options (same as before)
    const engineOptions = {
        antialias: true,
        stencil: true,
        preserveDrawingBuffer: isFirefoxBrowser,
        premultipliedAlpha: false,
        alpha: false,
        doNotHandleContextLost: true,
        doNotHandleTouchAction: false,
        audioEngine: false,
        disableWebGL2Support: isFirefoxBrowser,
        deterministicLockstep: false,
        lockstepMaxSteps: 4,
        timeStep: 1/60,
        adaptToDeviceRatio: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: "default"
    };

    console.log(`Loading slide: ${slide.displayName || slide.folderName} with ${slide.models.length} models`);

    // Firefox WebGL extension pre-setup
    if (isFirefoxBrowser) {
        console.log('Firefox: Pre-enabling WebGL extensions...');
        const gl = canvas.getContext('webgl', engineOptions) || canvas.getContext('experimental-webgl', engineOptions);
        
        if (gl) {
            const criticalExtensions = ['WEBGL_color_buffer_float', 'EXT_color_buffer_half_float'];
            const additionalExtensions = ['OES_texture_float', 'OES_texture_half_float', 'WEBGL_depth_texture', 'EXT_texture_filter_anisotropic', 'OES_standard_derivatives'];
            
            [...criticalExtensions, ...additionalExtensions].forEach(extName => {
                try {
                    const ext = gl.getExtension(extName);
                    if (ext) {
                        console.log(`Firefox: Enabled extension ${extName}`);
                    }
                } catch (e) {
                    console.log(`Firefox: Error enabling extension ${extName}:`, e.message);
                }
            });
        }
    }

    const engine = new BABYLON.Engine(canvas, true, engineOptions);
    window.currentEngine = engine;
    
    if (isFirefoxBrowser) {
        engine.setHardwareScalingLevel(1);
    }
    
    const scene = new BABYLON.Scene(engine);
    window.currentScene = scene;
    
    scene.clearColor = new BABYLON.Color4(0.05, 0.05, 0.05, 1);

    const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 3,
        200,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);
    
    // Mobile-specific zoom speed enhancement
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    if (isMobile) {
        camera.wheelPrecision = 10; // Faster wheel zoom (default ~50)
        camera.pinchPrecision = 3; // Faster pinch zoom (default ~12)
        camera.panningSensibility = 500; // Faster panning (default ~1000, lower = faster)
    } else {
        camera.wheelPrecision = 3; // Standard desktop zoom speed
        camera.pinchPrecision = 12; // Standard pinch zoom
    }

    // Enhanced lighting setup
    const ambientLight = new BABYLON.HemisphericLight("AmbientLight", new BABYLON.Vector3(0, 1, 0), scene);
    ambientLight.intensity = 0.7;
    
    const keyLight = new BABYLON.DirectionalLight("KeyLight", new BABYLON.Vector3(-1, -1, -1), scene);
    keyLight.intensity = 1.2;
    
    const fillLight = new BABYLON.DirectionalLight("FillLight", new BABYLON.Vector3(1, 0, -0.5), scene);
    fillLight.intensity = 0.6;
    
    const rimLight = new BABYLON.DirectionalLight("RimLight", new BABYLON.Vector3(0, 0, 1), scene);
    rimLight.intensity = 0.8;

    // Counter for tracking loaded models
    let modelsLoaded = 0;
    const totalModels = slide.models.length;
    let allMeshes = [];

    // Function to handle when all models are loaded
    function onAllModelsLoaded() {
        console.log(`All ${totalModels} models loaded for slide: ${slide.displayName || slide.folderName}`);
        
        // DEBUG: Print coordinate summary for all loaded models
        console.log("=== COORDINATE SUMMARY ===");
        allMeshes.forEach((mesh, index) => {
            console.log(`${index + 1}. ${mesh.name}:`, {
                position: `(${mesh.position.x.toFixed(3)}, ${mesh.position.y.toFixed(3)}, ${mesh.position.z.toFixed(3)})`,
                rotation: `(${mesh.rotation.x.toFixed(3)}, ${mesh.rotation.y.toFixed(3)}, ${mesh.rotation.z.toFixed(3)})`,
                scaling: `(${mesh.scaling.x.toFixed(3)}, ${mesh.scaling.y.toFixed(3)}, ${mesh.scaling.z.toFixed(3)})`,
                boundingBox: mesh.getBoundingInfo() ? {
                    min: mesh.getBoundingInfo().boundingBox.minimum,
                    max: mesh.getBoundingInfo().boundingBox.maximum,
                    center: mesh.getBoundingInfo().boundingBox.center
                } : "No bounding info"
            });
        });
        console.log("=== END COORDINATE SUMMARY ===");
        
        // Auto-fit camera to show all models
        if (allMeshes.length > 0) {
            try {
                let min = null;
                let max = null;
                
                allMeshes.forEach(mesh => {
                    const boundingInfo = mesh.getBoundingInfo();
                    if (boundingInfo) {
                        const meshMin = boundingInfo.boundingBox.minimumWorld;
                        const meshMax = boundingInfo.boundingBox.maximumWorld;
                        
                        if (!min) {
                            min = meshMin.clone();
                            max = meshMax.clone();
                        } else {
                            min = BABYLON.Vector3.Minimize(min, meshMin);
                            max = BABYLON.Vector3.Maximize(max, meshMax);
                        }
                    }
                });
                
                if (min && max) {
                    const center = BABYLON.Vector3.Center(min, max);
                    const size = max.subtract(min);
                    const maxSize = Math.max(size.x, size.y, size.z);
                    
                    camera.target = center;
                    camera.radius = maxSize * 1.8; // Closer view for multiple models (was 2.5)
                    camera.alpha = Math.PI / 4;
                    camera.beta = Math.PI / 3;
                    
                    console.log(`Camera fitted to ${allMeshes.length} meshes: radius=${camera.radius}, center=${center}`);
                    
                    // Check if we're in fullscreen mode and adjust for mobile
                    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                                     window.innerWidth <= 768;
                    const slideshowWrapper = document.getElementById('slideshow-wrapper');
                    const isInFullscreen = slideshowWrapper && (slideshowWrapper.classList.contains('pseudo-fullscreen') || 
                                          document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
                    
                    if (isMobile && isInFullscreen) {
                        // Store the normal radius and apply mobile fullscreen adjustment
                        window.originalMobileRadius = camera.radius;
                        camera.radius = camera.radius * 1.6;
                        console.log(`Mobile: Applied mobile fullscreen zoom on slide change: ${camera.radius}`);
                    }
                }
            } catch (error) {
                console.warn("Could not auto-fit camera to all models:", error);
                camera.radius = 12; // Closer default for multiple models (was 15)
                
                // Check if we're in fullscreen mode and adjust for mobile (fallback case)
                const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                                 window.innerWidth <= 768;
                const slideshowWrapper = document.getElementById('slideshow-wrapper');
                const isInFullscreen = slideshowWrapper && (slideshowWrapper.classList.contains('pseudo-fullscreen') || 
                                      document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
                
                if (isMobile && isInFullscreen) {
                    // Store the normal radius and apply mobile fullscreen adjustment
                    window.originalMobileRadius = camera.radius;
                    camera.radius = camera.radius * 1.6;
                    console.log(`Mobile: Applied mobile fullscreen zoom on slide change (fallback): ${camera.radius}`);
                }
            }
        }

        // Firefox-specific rendering fixes
        if (isFirefoxBrowser) {
            console.log('Firefox: Applying final rendering fixes for all models...');
            scene.render();
            engine.resize();
            
            setTimeout(() => {
                scene.render();
                console.log('Firefox: Final delayed render completed for all models');
            }, 200);
        }
    }

    // Load each model in the slide
    slide.models.forEach((model, index) => {
        const fileExtension = model.fileName.toLowerCase().substring(model.fileName.lastIndexOf('.'));
        console.log(`Loading model ${index + 1}/${totalModels}: ${model.fileName}`);
        
        // Ensure STL loader for STL files
        if (fileExtension === '.stl') {
            if (typeof BABYLON.STLFileLoader !== 'undefined') {
                try {
                    BABYLON.SceneLoader.RegisterPlugin(new BABYLON.STLFileLoader());
                } catch (e) {
                    // Plugin might already be registered
                }
            }
        }

        // Load the model
        BABYLON.SceneLoader.Append(
            folderPath,
            model.fileName,
            scene,
            function () {
                console.log(`Model loaded: ${model.fileName} (${modelsLoaded + 1}/${totalModels})`);
                
                // Find the newly added meshes (meshes added since last load)
                const newMeshes = scene.meshes.filter(mesh => 
                    mesh.name.includes(model.fileName.split('.')[0]) || 
                    mesh.id.includes(model.fileName.split('.')[0]) ||
                    !allMeshes.includes(mesh)
                );
                
                // Apply color and positioning to new meshes
                newMeshes.forEach(mesh => {
                    if (mesh.geometry || mesh.getVerticesData) {
                        // Save original coordinates before any transformations
                        saveOriginalCoordinates(mesh);
                        
                        allMeshes.push(mesh);
                        
                        // Log original position data for debugging
                        console.log(`Model ${model.fileName} loaded at original position:`, {
                            position: {x: mesh.position.x, y: mesh.position.y, z: mesh.position.z},
                            rotation: {x: mesh.rotation.x, y: mesh.rotation.y, z: mesh.rotation.z},
                            scaling: {x: mesh.scaling.x, y: mesh.scaling.y, z: mesh.scaling.z}
                        });
                        
                        // Apply model-specific coloring with enhanced debugging
                        console.log(`Attempting to apply color to ${model.fileName}:`, model.color);
                        
                        if (model.color) {
                            // Force material creation for STL files (which typically don't have materials)
                            if (!mesh.material || mesh.material.name === "default material") {
                                console.log(`Creating new material for ${mesh.name} (STL file)`);
                                const newMaterial = new BABYLON.StandardMaterial(`${mesh.name}_material`, scene);
                                newMaterial.diffuseColor = model.color;
                                newMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
                                newMaterial.ambientColor = new BABYLON.Color3(0.2, 0.2, 0.2);
                                mesh.material = newMaterial;
                                console.log(`Created and applied new StandardMaterial to ${mesh.name}`);
                            } else if (mesh.material) {
                                console.log(`Mesh ${mesh.name} has existing material:`, mesh.material.constructor.name);
                                
                                // Handle different material types
                                if (mesh.material instanceof BABYLON.PBRMaterial) {
                                    mesh.material.baseColor = model.color;
                                    console.log(`Applied baseColor to PBR material for ${mesh.name}`);
                                } else if (mesh.material instanceof BABYLON.StandardMaterial) {
                                    mesh.material.diffuseColor = model.color;
                                    console.log(`Applied diffuseColor to Standard material for ${mesh.name}`);
                                } else if (mesh.material.subMaterials) {
                                    // Handle multi-materials
                                    mesh.material.subMaterials.forEach((subMat, subIndex) => {
                                        if (subMat instanceof BABYLON.PBRMaterial) {
                                            subMat.baseColor = model.color;
                                        } else if (subMat instanceof BABYLON.StandardMaterial) {
                                            subMat.diffuseColor = model.color;
                                        }
                                        console.log(`Applied color to sub-material ${subIndex} for ${mesh.name}`);
                                    });
                                } else {
                                    console.log(`Unknown material type for ${mesh.name}:`, mesh.material.constructor.name);
                                    // Fallback: try to set diffuseColor anyway
                                    try {
                                        mesh.material.diffuseColor = model.color;
                                        console.log(`Applied fallback diffuseColor to ${mesh.name}`);
                                    } catch (e) {
                                        console.warn(`Could not apply color to ${mesh.name}:`, e.message);
                                    }
                                }
                            }
                        } else {
                            console.warn(`No color assigned to model ${model.fileName}`);
                        }
                        
                        // COORDINATE PRESERVATION OPTIONS:
                        // Option 1: Preserve original coordinates exactly (recommended for CAD files)
                        // This respects the coordinate system from the original CAD software
                        // mesh.position = mesh.position; // Keep original position (no change needed)
                        
                        // Option 2: Apply slide-specific transformation
                        // You can define custom positioning per slide/project
                        applySlideSpecificTransform(mesh, model, slide, index);
                        
                        mesh.setEnabled(true);
                        mesh.isVisible = true;
                        
                        if (isFirefoxBrowser) {
                            mesh.refreshBoundingInfo();
                        }
                    }
                });
                
                modelsLoaded++;
                
                // Check if all models are loaded
                if (modelsLoaded === totalModels) {
                    onAllModelsLoaded();
                }
            },
            null,
            function (scene, message) {
                console.error(`Error loading ${model.fileName}:`, message);
                modelsLoaded++; // Still increment to avoid hanging
                
                if (modelsLoaded === totalModels) {
                    onAllModelsLoaded();
                }
            }
        );
    });

    // Enhanced render loop
    engine.runRenderLoop(() => {
        if (scene && scene.activeCamera) {
            scene.render();
        }
    });

    // Firefox initialization fixes
    if (isFirefoxBrowser) {
        setTimeout(() => {
            if (scene && engine) {
                engine.resize();
                scene.render();
            }
        }, 100);
    }

    // Canvas event handling
    canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
    });

    window.addEventListener("resize", () => {
        if (window.currentEngine) {
            window.currentEngine.resize();
        }
    });
}

// Function to apply slide-specific transformations while preserving original coordinates
function applySlideSpecificTransform(mesh, model, slide, modelIndex) {
    // Get the original file name without extension for identification
    const fileName = model.fileName.toLowerCase();
    const slideFolder = slide.folderName;
    
    console.log(`Applying transform for ${fileName} in ${slideFolder} (index: ${modelIndex})`);
    
    // PROJECT-SPECIFIC COORDINATE HANDLING
    if (slideFolder === "Multipass") {
        applyMultipassTransforms(mesh, fileName, modelIndex);
    } else if (slideFolder === "Multi-Directional Eye Puzzle Mech") {
        applyEyePuzzleTransforms(mesh, fileName, modelIndex);
    } else {
        // Default: preserve original coordinates exactly
        applyDefaultTransforms(mesh, fileName, modelIndex);
    }
}

// Multipass ID Card project transformations
function applyMultipassTransforms(mesh, fileName, modelIndex) {
    // For the Multipass project, we want to preserve the original CAD coordinates
    // since the parts were likely designed in their correct relative positions
    
    if (fileName.includes("id-card-v2.glb")) {
        // Main GLB model - keep at origin or slight adjustment
        // mesh.position stays as original
        console.log("Multipass: Main GLB model at original position");
        
    } else if (fileName.includes("slot") && fileName.includes("cover")) {
        // ID Card Slot & Cover - keep original position
        console.log("Multipass: Slot & Cover at original position");
        
    } else if (fileName.includes("bottom")) {
        // Bottom part - keep original position
        console.log("Multipass: Bottom part at original position");
        
    } else if (fileName.includes("top")) {
        // Top part - keep original position  
        console.log("Multipass: Top part at original position");
        
    } else if (fileName.includes("yellow") && fileName.includes("bar")) {
        // Yellow bar - keep original position
        console.log("Multipass: Yellow bar at original position");
    }
    
    // Optional: Apply a small scale factor if needed
    // mesh.scaling = new BABYLON.Vector3(1, 1, 1);
}

// Eye Puzzle Mechanism project transformations
function applyEyePuzzleTransforms(mesh, fileName, modelIndex) {
    // For the Eye Puzzle, we want to preserve the mechanical relationships
    // These parts were likely designed in their operational positions
    
    if (fileName.includes("js manager")) {
        // Main manager component
        console.log("Eye Puzzle: JS Manager at original position");
        
    } else if (fileName.includes("center") && fileName.includes("gromet")) {
        // Center gromet
        console.log("Eye Puzzle: Center Gromet at original position");
        
    } else if (fileName.includes("emplate")) {
        // EMPlate component
        console.log("Eye Puzzle: EMPlate at original position");
        
    } else if (fileName.includes("js box")) {
        // JS Box component
        console.log("Eye Puzzle: JS Box at original position");
        
    } else if (fileName.includes("knob")) {
        // Knob component
        console.log("Eye Puzzle: Knob at original position");
    }
    
    // All parts keep their original coordinates to maintain mechanical relationships
}

// Default transformation for other projects
function applyDefaultTransforms(mesh, fileName, modelIndex) {
    // For unknown projects, preserve original coordinates but add minimal separation if needed
    console.log(`Default transform for ${fileName}: preserving original coordinates`);
    
    // Optional: Very small offset only if models are perfectly overlapping
    if (modelIndex > 0) {
        // Check if this mesh is overlapping with previous meshes
        const hasOverlap = checkForOverlap(mesh);
        if (hasOverlap) {
            console.log(`Detected overlap for ${fileName}, applying minimal offset`);
            const minimalOffset = new BABYLON.Vector3(
                modelIndex * 0.01, // Very small offset
                0,
                0
            );
            mesh.position.addInPlace(minimalOffset);
        }
    }
}

// Helper function to detect if meshes are overlapping
function checkForOverlap(mesh) {
    // Simple overlap detection based on bounding box
    const boundingInfo = mesh.getBoundingInfo();
    if (!boundingInfo) return false;
    
    const center = boundingInfo.boundingBox.center;
    const threshold = 0.001; // Very small threshold for overlap detection
    
    // Check if position is very close to origin (indicating potential overlap)
    return (Math.abs(center.x) < threshold && 
            Math.abs(center.y) < threshold && 
            Math.abs(center.z) < threshold);
}

// UTILITY FUNCTIONS FOR COORDINATE DEBUGGING AND MANIPULATION

// Function to reset all models to their original coordinates (useful for testing)
function resetToOriginalCoordinates() {
    if (window.currentScene && window.currentScene.meshes) {
        console.log("Resetting all models to original coordinates...");
        window.currentScene.meshes.forEach(mesh => {
            if (mesh.metadata && mesh.metadata.originalPosition) {
                mesh.position = mesh.metadata.originalPosition.clone();
                mesh.rotation = mesh.metadata.originalRotation.clone();
                mesh.scaling = mesh.metadata.originalScaling.clone();
                console.log(`Reset ${mesh.name} to original position`);
            }
        });
    }
}

// Function to save original coordinates (call this when models are first loaded)
function saveOriginalCoordinates(mesh) {
    if (!mesh.metadata) mesh.metadata = {};
    mesh.metadata.originalPosition = mesh.position.clone();
    mesh.metadata.originalRotation = mesh.rotation.clone();
    mesh.metadata.originalScaling = mesh.scaling.clone();
}

// Function to apply custom coordinate transformations for testing
function applyCustomTransform(meshName, position, rotation, scaling) {
    if (!window.currentScene) return;
    
    const mesh = window.currentScene.meshes.find(m => m.name.includes(meshName));
    if (mesh) {
        if (position) mesh.position = new BABYLON.Vector3(position.x, position.y, position.z);
        if (rotation) mesh.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z);
        if (scaling) mesh.scaling = new BABYLON.Vector3(scaling.x, scaling.y, scaling.z);
        console.log(`Applied custom transform to ${mesh.name}`);
    } else {
        console.warn(`Mesh containing "${meshName}" not found`);
    }
}

// Function to export current coordinate data for backup/reference
function exportCoordinateData() {
    if (!window.currentScene) return;
    
    const coordData = {};
    window.currentScene.meshes.forEach(mesh => {
        if (mesh.geometry || mesh.getVerticesData) {
            coordData[mesh.name] = {
                position: {x: mesh.position.x, y: mesh.position.y, z: mesh.position.z},
                rotation: {x: mesh.rotation.x, y: mesh.rotation.y, z: mesh.rotation.z},
                scaling: {x: mesh.scaling.x, y: mesh.scaling.y, z: mesh.scaling.z}
            };
        }
    });
    
    console.log("Current coordinate data:");
    console.log(JSON.stringify(coordData, null, 2));
    return coordData;
}

// Function to force material creation and color application for all meshes
function forceApplyColors() {
    if (!window.currentScene || !window.slideList || window.currentSlideIndex === undefined) {
        console.warn("No scene or slide data available");
        return;
    }
    
    const currentSlide = window.slideList[window.currentSlideIndex];
    if (!currentSlide || !currentSlide.models) {
        console.warn("No models in current slide");
        return;
    }
    
    console.log("Force applying colors to all meshes...");
    
    window.currentScene.meshes.forEach(mesh => {
        if (mesh.geometry || mesh.getVerticesData) {
            // Find the model this mesh belongs to
            const model = currentSlide.models.find(m => 
                mesh.name.includes(m.fileName.split('.')[0]) ||
                mesh.id.includes(m.fileName.split('.')[0])
            );
            
            if (model && model.color) {
                console.log(`Applying color to ${mesh.name} from model ${model.fileName}`);
                
                // Force create material if needed
                if (!mesh.material || mesh.material.name === "default material") {
                    const newMaterial = new BABYLON.StandardMaterial(`${mesh.name}_forced_material`, window.currentScene);
                    newMaterial.diffuseColor = model.color;
                    newMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
                    newMaterial.ambientColor = new BABYLON.Color3(0.2, 0.2, 0.2);
                    mesh.material = newMaterial;
                    console.log(`Force created material for ${mesh.name}`);
                } else {
                    // Update existing material
                    if (mesh.material instanceof BABYLON.StandardMaterial) {
                        mesh.material.diffuseColor = model.color;
                    } else if (mesh.material instanceof BABYLON.PBRMaterial) {
                        mesh.material.baseColor = model.color;
                    }
                    console.log(`Updated existing material for ${mesh.name}`);
                }
            } else {
                console.log(`No color found for mesh ${mesh.name}`);
            }
        }
    });
    
    console.log("Color force-application complete!");
}

// Function to regenerate colors for all models (useful for testing different schemes)
function regenerateColors(colorScheme = null) {
    if (!window.slideList) {
        console.warn("No slideshow loaded to regenerate colors for");
        return;
    }
    
    console.log("Regenerating random colors for all models...");
    
    window.slideList.forEach(slide => {
        if (slide.models && slide.models.length > 0) {
            // Choose a random color scheme if none specified
            const colorSchemes = ['vibrant', 'rainbow', 'warm', 'cool'];
            const scheme = colorScheme || colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
            
            const newColors = generateColorScheme(scheme, slide.models.length);
            
            slide.models.forEach((model, index) => {
                model.color = newColors[index];
                model.colorScheme = scheme;
            });
            
            console.log(`Regenerated ${slide.models.length} colors for ${slide.folderName} using ${scheme} scheme`);
        }
    });
    
    // Reload current slide to apply new colors
    if (window.currentSlideIndex !== undefined) {
        console.log("Reloading current slide with new colors...");
        loadSlide(window.currentSlideIndex);
        updateSlideInfo();
    }
}

// Function to change color scheme for a specific slide
function changeSlideColorScheme(slideIndex, colorScheme) {
    if (!window.slideList || !window.slideList[slideIndex]) {
        console.warn("Invalid slide index");
        return;
    }
    
    const slide = window.slideList[slideIndex];
    const newColors = generateColorScheme(colorScheme, slide.models.length);
    
    slide.models.forEach((model, index) => {
        model.color = newColors[index];
        model.colorScheme = colorScheme;
    });
    
    console.log(`Changed ${slide.folderName} to ${colorScheme} color scheme`);
    
    // Reload if this is the current slide
    if (slideIndex === window.currentSlideIndex) {
        loadSlide(slideIndex);
    }
}

// Function to cycle through color schemes for the current slide
function cycleColorScheme() {
    if (!window.slideList || window.currentSlideIndex === undefined) {
        console.warn("No slides available or no current slide");
        return;
    }
    
    const currentSlide = window.slideList[window.currentSlideIndex];
    if (!currentSlide || !currentSlide.models || currentSlide.models.length === 0) {
        console.warn("No models in current slide");
        return;
    }
    
    // Available color schemes
    const colorSchemes = ['vibrant', 'rainbow', 'warm', 'cool'];
    const currentScheme = currentSlide.models[0].colorScheme || 'vibrant';
    
    // Find next scheme in cycle
    const currentIndex = colorSchemes.indexOf(currentScheme);
    const nextIndex = (currentIndex + 1) % colorSchemes.length;
    const nextScheme = colorSchemes[nextIndex];
    
    // Generate new colors
    const newColors = generateColorScheme(nextScheme, currentSlide.models.length);
    
    // Update all models in current slide
    currentSlide.models.forEach((model, index) => {
        model.color = newColors[index];
        model.colorScheme = nextScheme;
    });
    
    console.log(`Changed ${currentSlide.folderName} from ${currentScheme} to ${nextScheme} color scheme`);
    
    // Update slide info to show new scheme
    updateSlideInfo();
    
    // Reload the current slide to apply new colors
    loadSlide(window.currentSlideIndex);
}

// Explode view functionality - State machine for individual slides
let slideExplodeStates = {}; // Track explosion state per slide
let slideOriginalPositions = {}; // Track original positions per slide

function toggleExplodeView() {
    if (!window.currentScene || !window.currentScene.meshes) {
        console.log("No scene or meshes available for explode view");
        return;
    }

    // Debug: Log all meshes in the scene
    console.log("All meshes in scene:", window.currentScene.meshes.map(mesh => mesh.name));

    // Filter for actual geometry meshes (exclude cameras, lights, etc.)
    const meshes = window.currentScene.meshes.filter(mesh => 
        mesh.geometry || mesh.getVerticesData || 
        (mesh.name && !mesh.name.includes('__root__') && !mesh.name.includes('Camera') && !mesh.name.includes('Light'))
    );
    
    console.log("Filtered meshes for explode:", meshes.map(mesh => mesh.name));
    
    if (meshes.length === 0) {
        console.log("No valid meshes found for explode view");
        return;
    }

    const camera = window.currentScene.activeCamera;
    if (!camera) {
        console.log("No active camera found");
        return;
    }

    // Get current slide identifier
    const currentSlideId = window.currentSlideIndex;
    if (currentSlideId === undefined) {
        console.log("No current slide identified");
        return;
    }

    // Initialize state for this slide if it doesn't exist
    if (slideExplodeStates[currentSlideId] === undefined) {
        slideExplodeStates[currentSlideId] = false;
        slideOriginalPositions[currentSlideId] = [];
    }

    const isCurrentlyExploded = slideExplodeStates[currentSlideId];
    console.log(`Slide ${currentSlideId} current state: ${isCurrentlyExploded ? 'exploded' : 'collapsed'}`);

    if (!isCurrentlyExploded) {
        // Store original positions for this slide
        slideOriginalPositions[currentSlideId] = meshes.map(mesh => ({
            mesh: mesh,
            position: mesh.position.clone()
        }));
        
        // Store original camera radius for this slide
        if (camera.radius !== undefined) {
            if (!window.slideOriginalCameraRadius) {
                window.slideOriginalCameraRadius = {};
            }
            window.slideOriginalCameraRadius[currentSlideId] = camera.radius;
        }
        
        // Find the largest mesh (reference point)
        let largestMesh = meshes[0];
        let largestSize = 0;
        
        meshes.forEach(mesh => {
            const boundingInfo = mesh.getBoundingInfo();
            const size = boundingInfo.boundingSphere.radius;
            if (size > largestSize) {
                largestSize = size;
                largestMesh = mesh;
            }
        });
        
        console.log(`Using ${largestMesh.name} as reference (largest mesh) for slide ${currentSlideId}`);
        
        // Calculate explode positions
        const referencePosition = largestMesh.position;
        const explodeDistance = largestSize * 1.5; // Closer spacing (was 3)
        
        // Animate each mesh to its exploded position
        meshes.forEach((mesh, index) => {
            if (mesh === largestMesh) return; // Keep reference mesh in place
            
            // Calculate direction from reference mesh
            let direction = mesh.position.subtract(referencePosition).normalize();
            
            // If mesh is at same position as reference, create a random direction
            if (direction.length() === 0) {
                const angle = (index / meshes.length) * Math.PI * 2;
                direction = new BABYLON.Vector3(Math.cos(angle), 0, Math.sin(angle));
            }
            
            // Calculate target position
            const targetPosition = referencePosition.add(direction.scale(explodeDistance));
            
            // Animate to exploded position with easing
            BABYLON.Animation.CreateAndStartAnimation(
                `explode_${mesh.name}_slide${currentSlideId}`,
                mesh,
                "position",
                30, // fps
                20, // duration frames (about 0.67 seconds at 30fps)
                mesh.position.clone(),
                targetPosition,
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                new BABYLON.BezierCurveEase(0.25, 0.1, 0.25, 1) // Smooth easing
            );
        });
        
        // Animate camera to fit exploded view
        if (camera.radius !== undefined && window.slideOriginalCameraRadius && window.slideOriginalCameraRadius[currentSlideId]) {
            const newRadius = window.slideOriginalCameraRadius[currentSlideId] * 2; // Zoom out to fit exploded view
            BABYLON.Animation.CreateAndStartAnimation(
                `camera_explode_slide${currentSlideId}`,
                camera,
                "radius",
                30, // fps
                25, // slightly longer duration for camera
                camera.radius,
                newRadius,
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                new BABYLON.SineEase()
            );
        }
        
        slideExplodeStates[currentSlideId] = true;
        console.log(`Models exploding with animation for slide ${currentSlideId}...`);
        
    } else {
        // Animate back to original positions
        const originalPositions = slideOriginalPositions[currentSlideId];
        if (originalPositions && originalPositions.length > 0) {
            originalPositions.forEach(({ mesh, position }) => {
                BABYLON.Animation.CreateAndStartAnimation(
                    `collapse_${mesh.name}_slide${currentSlideId}`,
                    mesh,
                    "position",
                30, // fps
                20, // duration frames
                mesh.position.clone(),
                position.clone(),
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                new BABYLON.BezierCurveEase(0.25, 0.1, 0.25, 1) // Smooth easing
            );
            });
        }
        
        // Animate camera back to original radius
        if (camera.radius !== undefined && window.slideOriginalCameraRadius && window.slideOriginalCameraRadius[currentSlideId]) {
            BABYLON.Animation.CreateAndStartAnimation(
                `camera_collapse_slide${currentSlideId}`,
                camera,
                "radius",
                30, // fps
                25, // slightly longer duration for camera
                camera.radius,
                window.slideOriginalCameraRadius[currentSlideId],
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                new BABYLON.SineEase()
            );
        }
        
        slideExplodeStates[currentSlideId] = false;
        console.log(`Models collapsing back with animation for slide ${currentSlideId}...`);
    }
}// Function to toggle fullscreen mode for the slideshow viewer
function toggleFullscreen() {
    console.log('=== FULLSCREEN TOGGLE START ===');
    const slideshowWrapper = document.getElementById('slideshow-wrapper');
    const slideshow = document.getElementById('slideshow');
    const canvas = document.getElementById('modelCanvas');
    
    console.log('Elements found:', {
        slideshowWrapper: !!slideshowWrapper,
        slideshow: !!slideshow,
        canvas: !!canvas
    });
    
    if (!slideshowWrapper || !canvas) {
        console.warn("Slideshow elements not found");
        return;
    }
    
    // Check for mobile device
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    
    // Store original styles if not already stored
    if (!window.originalViewerStyles) {
        const computedSlideshow = window.getComputedStyle(slideshow);
        const computedCanvas = window.getComputedStyle(canvas);
        
        window.originalViewerStyles = {
            wrapperHeight: slideshowWrapper.style.height || '',
            wrapperWidth: slideshowWrapper.style.width || '',
            wrapperDisplay: slideshowWrapper.style.display || '',
            slideshowHeight: computedSlideshow.height, // Use computed style to get actual rendered height
            slideshowWidth: computedSlideshow.width,   // Use computed style to get actual rendered width
            canvasHeight: computedCanvas.height,       // Use computed style to get actual rendered height
            canvasWidth: computedCanvas.width          // Use computed style to get actual rendered width
        };
        console.log('Stored original dimensions:', {
            slideshow: `${computedSlideshow.width} x ${computedSlideshow.height}`,
            canvas: `${computedCanvas.width} x ${computedCanvas.height}`
        });
    }
    
    // Check if already in fullscreen
    const isCurrentlyFullscreen = document.fullscreenElement || document.webkitFullscreenElement || 
                                  document.mozFullScreenElement || slideshowWrapper.classList.contains('pseudo-fullscreen');
    
    console.log('Fullscreen state check:', {
        isCurrentlyFullscreen: isCurrentlyFullscreen,
        documentFullscreenElement: !!document.fullscreenElement,
        hasPseudoFullscreenClass: slideshowWrapper.classList.contains('pseudo-fullscreen')
    });
    
    if (isCurrentlyFullscreen) {
        console.log('=== EXITING FULLSCREEN ===');
        
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        
        // Remove pseudo-fullscreen class and exit button
        slideshowWrapper.classList.remove('pseudo-fullscreen');
        const exitButton = document.getElementById('exit-fullscreen-btn');
        if (exitButton) {
            exitButton.remove();
        }
        
        // Remove fullscreen control buttons
        const colorButton = document.getElementById('fullscreen-color-btn');
        if (colorButton) {
            colorButton.remove();
        }
        
        const explodeButton = document.getElementById('fullscreen-explode-btn');
        if (explodeButton) {
            explodeButton.remove();
        }
        
        // Remove fullscreen overlay and restore page scrolling
        const fullscreenOverlay = document.getElementById('fullscreen-overlay');
        if (fullscreenOverlay) {
            fullscreenOverlay.remove();
        }
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Force restore original styles
        setTimeout(() => {
            const original = window.originalViewerStyles;
            
            slideshowWrapper.style.height = original.wrapperHeight;
            slideshowWrapper.style.width = original.wrapperWidth;
            slideshowWrapper.style.display = original.wrapperDisplay;
            slideshowWrapper.style.position = '';
            slideshowWrapper.style.top = '';
            slideshowWrapper.style.left = '';
            slideshowWrapper.style.right = '';
            slideshowWrapper.style.bottom = '';
            slideshowWrapper.style.zIndex = '';
            slideshowWrapper.style.backgroundColor = '';
            slideshowWrapper.style.margin = '';
            slideshowWrapper.style.padding = '';
            slideshowWrapper.style.flexDirection = '';
            slideshowWrapper.style.alignItems = '';
            slideshowWrapper.style.justifyContent = '';
            slideshowWrapper.style.boxSizing = '';
            slideshowWrapper.style.minWidth = '';
            slideshowWrapper.style.minHeight = '';
            
            // Restore exact original dimensions for all devices
            slideshow.style.height = original.slideshowHeight;
            slideshow.style.width = original.slideshowWidth;
            slideshow.style.flex = '';
            slideshow.style.position = '';
            slideshow.style.maxWidth = '';
            slideshow.style.maxHeight = '';
            slideshow.style.order = '';
            slideshow.style.minWidth = '';
            slideshow.style.minHeight = '';
            slideshow.style.overflow = '';
            
            canvas.style.cssText = ''; // Clear all canvas styles
            console.log('=== CANVAS STYLES CLEARED ===');
            console.log('Canvas rect after clearing styles:', canvas.getBoundingClientRect());
            
            console.log('Restored to original dimensions:', {
                slideshow: `${original.slideshowWidth} x ${original.slideshowHeight}`,
                canvas: `${original.canvasWidth} x ${original.canvasHeight}`
            });
            
            // Reset arrow button positions
            const leftArrow = slideshowWrapper.querySelector('.arrow.left');
            const rightArrow = slideshowWrapper.querySelector('.arrow.right');
            if (leftArrow) {
                leftArrow.style.position = '';
                leftArrow.style.top = '';
                leftArrow.style.left = '';
                leftArrow.style.bottom = '';
                leftArrow.style.right = '';
                leftArrow.style.order = '';
                leftArrow.style.zIndex = '';
                leftArrow.style.transform = '';
                leftArrow.style.fontSize = '';
                leftArrow.style.padding = '';
                leftArrow.style.background = '';
                leftArrow.style.borderRadius = '';
                leftArrow.style.color = '';
            }
            if (rightArrow) {
                rightArrow.style.position = '';
                rightArrow.style.top = '';
                rightArrow.style.right = '';
                rightArrow.style.bottom = '';
                rightArrow.style.left = '';
                rightArrow.style.order = '';
                rightArrow.style.zIndex = '';
                rightArrow.style.transform = '';
                rightArrow.style.fontSize = '';
                rightArrow.style.padding = '';
                rightArrow.style.background = '';
                rightArrow.style.borderRadius = '';
                rightArrow.style.color = '';
            }
            
            console.log("Exited fullscreen mode - styles restored");
            
            // Force canvas resize after style restoration
            setTimeout(() => {
                if (window.currentEngine) {
                    window.currentEngine.resize();
                    console.log("Canvas resized after fullscreen exit");
                    
                    // Restore original camera radius for mobile
                    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                                     window.innerWidth <= 768;
                    if (isMobile && window.originalMobileRadius && window.currentScene && window.currentScene.activeCamera) {
                        const camera = window.currentScene.activeCamera;
                        if (camera.radius !== undefined) {
                            camera.radius = window.originalMobileRadius;
                            console.log("Mobile: Restored mobile camera radius:", camera.radius);
                            window.originalMobileRadius = null; // Clear stored value
                        }
                    }
                }
            }, 150);
        }, 100);
        
    } else {
        console.log('=== ENTERING FULLSCREEN ===');
        console.log('Mobile detection:', isMobile);
        
        // Enter fullscreen
        let fullscreenSuccess = false;
        
        if (!isMobile) {
            console.log('Attempting native fullscreen for desktop...');
            // Try native fullscreen API for desktop
            const element = slideshowWrapper;
            if (element.requestFullscreen) {
                element.requestFullscreen().then(() => { fullscreenSuccess = true; }).catch(() => {});
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
                fullscreenSuccess = true;
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
                fullscreenSuccess = true;
            }
        }
        
        // For mobile or if native fullscreen fails, use pseudo-fullscreen
        setTimeout(() => {
            if (!fullscreenSuccess || isMobile) {
                slideshowWrapper.classList.add('pseudo-fullscreen');
                
                // Create and add fullscreen overlay to hide page content
                const fullscreenOverlay = document.createElement('div');
                fullscreenOverlay.id = 'fullscreen-overlay';
                fullscreenOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100vw;
                    height: 100vh;
                    background: #000;
                    z-index: 99998;
                    margin: 0;
                    padding: 0;
                `;
                document.body.appendChild(fullscreenOverlay);
                
                // Enhanced mobile fullscreen positioning (higher z-index than overlay)
                slideshowWrapper.style.position = 'fixed';
                slideshowWrapper.style.top = '0';
                slideshowWrapper.style.left = '0';
                slideshowWrapper.style.right = '0';
                slideshowWrapper.style.bottom = '0';
                slideshowWrapper.style.zIndex = '99999';
                slideshowWrapper.style.backgroundColor = '#000';
                slideshowWrapper.style.margin = '0';
                slideshowWrapper.style.padding = '0';
                
                // Prevent page scrolling while in fullscreen
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
                
                console.log("Using pseudo-fullscreen mode for mobile/fallback");
            }
            
            // Apply fullscreen styles
            slideshowWrapper.style.height = '100vh !important';
            slideshowWrapper.style.width = '100vw !important';
            slideshowWrapper.style.display = 'flex';
            slideshowWrapper.style.flexDirection = isMobile ? 'column' : 'row'; // Column layout for mobile
            slideshowWrapper.style.alignItems = 'center';
            slideshowWrapper.style.justifyContent = 'center';
            slideshowWrapper.style.boxSizing = 'border-box';
            slideshowWrapper.style.minWidth = '100vw';
            slideshowWrapper.style.minHeight = '100vh';
            
            if (isMobile) {
                // Mobile: slideshow should fill the wrapper completely
                slideshow.style.height = '100% !important';
                slideshow.style.width = '100% !important';
                slideshow.style.maxWidth = 'none !important';
                slideshow.style.maxHeight = 'none !important';
                slideshow.style.minWidth = '100% !important';
                slideshow.style.minHeight = '100% !important';
                slideshow.style.flex = 'none';
                slideshow.style.position = 'relative';
                slideshow.style.order = '2'; // Put slideshow in middle
                slideshow.style.margin = '0 !important';
                slideshow.style.padding = '0 !important';
                console.log('Applied mobile slideshow styles (fill wrapper)');
                
                // Position arrows in the middle of the screen on mobile
                const leftArrow = slideshowWrapper.querySelector('.arrow.left');
                const rightArrow = slideshowWrapper.querySelector('.arrow.right');
                if (leftArrow) {
                    leftArrow.style.position = 'absolute';
                    leftArrow.style.top = '50%';
                    leftArrow.style.left = '20px';
                    leftArrow.style.bottom = 'auto';
                    leftArrow.style.right = 'auto';
                    leftArrow.style.order = '1';
                    leftArrow.style.zIndex = '100000';
                    leftArrow.style.transform = 'translateY(-50%)';
                    leftArrow.style.fontSize = '24px';
                    leftArrow.style.padding = '15px';
                    leftArrow.style.background = 'rgba(0, 0, 0, 0.7)';
                    leftArrow.style.borderRadius = '50%';
                    leftArrow.style.color = '#FFA584';
                }
                if (rightArrow) {
                    rightArrow.style.position = 'absolute';
                    rightArrow.style.top = '50%';
                    rightArrow.style.right = '20px';
                    rightArrow.style.bottom = 'auto';
                    rightArrow.style.left = 'auto';
                    rightArrow.style.order = '3';
                    rightArrow.style.zIndex = '100000';
                    rightArrow.style.transform = 'translateY(-50%)';
                    rightArrow.style.fontSize = '24px';
                    rightArrow.style.padding = '15px';
                    rightArrow.style.background = 'rgba(0, 0, 0, 0.7)';
                    rightArrow.style.borderRadius = '50%';
                    rightArrow.style.color = '#FFA584';
                }
            } else {
                // Desktop: position arrows with high z-index
                slideshow.style.height = '100vh !important';
                slideshow.style.width = 'calc(100vw - 120px) !important';
                slideshow.style.flex = '1';
                
                // Position desktop arrows above the canvas
                const leftArrow = slideshowWrapper.querySelector('.arrow.left');
                const rightArrow = slideshowWrapper.querySelector('.arrow.right');
                if (leftArrow) {
                    leftArrow.style.position = 'fixed';
                    leftArrow.style.top = '50%';
                    leftArrow.style.left = '20px';
                    leftArrow.style.zIndex = '100000';
                    leftArrow.style.transform = 'translateY(-50%)';
                    leftArrow.style.background = 'rgba(0, 0, 0, 0.7)';
                    leftArrow.style.color = '#FFA584';
                    leftArrow.style.borderRadius = '5px';
                    leftArrow.style.padding = '10px 15px';
                    leftArrow.style.fontSize = '20px';
                }
                if (rightArrow) {
                    rightArrow.style.position = 'fixed';
                    rightArrow.style.top = '50%';
                    rightArrow.style.right = '20px';
                    rightArrow.style.zIndex = '100000';
                    rightArrow.style.transform = 'translateY(-50%)';
                    rightArrow.style.background = 'rgba(0, 0, 0, 0.7)';
                    rightArrow.style.color = '#FFA584';
                    rightArrow.style.borderRadius = '5px';
                    rightArrow.style.padding = '10px 15px';
                    rightArrow.style.fontSize = '20px';
                }
            }
            
            slideshow.style.position = 'relative';
            slideshow.style.maxWidth = 'none !important';
            slideshow.style.maxHeight = 'none !important';
            
            // WORKING CANVAS RESIZE: Keep arrows visible
            console.log('=== CANVAS RESIZE WITH ARROWS ===');
            
            // Clear ALL existing styles first
            canvas.style.cssText = '';
            
            if (isMobile) {
                // Mobile: Use direct pixel dimensions to avoid viewport unit issues
                canvas.style.cssText = ''; // Clear all existing styles first
                
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                
                canvas.style.position = 'fixed';
                canvas.style.top = '0px';
                canvas.style.left = '0px';
                canvas.style.width = screenWidth + 'px';
                canvas.style.height = screenHeight + 'px';
                canvas.style.maxWidth = 'none !important';
                canvas.style.maxHeight = 'none !important';
                canvas.style.minWidth = screenWidth + 'px';
                canvas.style.minHeight = screenHeight + 'px';
                canvas.style.zIndex = '10000';
                canvas.style.margin = '0';
                canvas.style.padding = '0';
                canvas.style.border = 'none';
                canvas.style.outline = 'none';
                
                // Force mobile browser to recognize viewport dimensions
                console.log('Mobile viewport detected:', {width: screenWidth, height: screenHeight});
                console.log('Applied mobile canvas styles (fixed positioning with pixel dimensions)');
            } else {
                // Desktop: Full screen canvas (arrows will overlay on top)
                canvas.style.position = 'fixed';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.width = '100vw';
                canvas.style.height = '100vh';
                canvas.style.zIndex = '9999';
                console.log('Applied desktop canvas styles (fixed positioning)');
            }
            
            canvas.style.background = '#111';
            
            console.log('Applied fullscreen styles with arrow space');
            console.log('=== FULLSCREEN DEBUGGING ===');
            console.log('Mobile mode:', isMobile);
            console.log('Viewport:', {width: window.innerWidth, height: window.innerHeight});
            console.log('Canvas rect:', canvas.getBoundingClientRect());
            console.log('Canvas computed style:', {
                width: getComputedStyle(canvas).width,
                height: getComputedStyle(canvas).height,
                position: getComputedStyle(canvas).position,
                top: getComputedStyle(canvas).top,
                left: getComputedStyle(canvas).left
            });
            console.log('Slideshow rect:', slideshow.getBoundingClientRect());
            console.log('Wrapper rect:', slideshowWrapper.getBoundingClientRect());
            console.log('=== END DEBUGGING ===');
            
            // Create exit fullscreen button
            const exitButton = document.createElement('button');
            exitButton.id = 'exit-fullscreen-btn';
            exitButton.innerHTML = '✕ Exit Fullscreen';
            exitButton.style.cssText = `
                position: ${isMobile ? 'fixed' : 'absolute'};
                top: ${isMobile ? '10px' : '20px'};
                right: ${isMobile ? '10px' : '20px'};
                z-index: 20000;
                background: rgba(51, 51, 51, 0.9);
                border: 1px solid #666;
                color: #FFA584;
                border-radius: 3px;
                font-family: 'IBM Plex Mono', monospace;
                cursor: pointer;
                padding: ${isMobile ? '12px 16px' : '8px 12px'};
                font-size: ${isMobile ? '16px' : '14px'};
                backdrop-filter: blur(5px);
                transition: background 0.3s ease;
                touch-action: manipulation;
            `;
            
            // Add hover/touch effects
            exitButton.onmouseenter = exitButton.ontouchstart = () => {
                exitButton.style.background = 'rgba(68, 68, 68, 0.9)';
            };
            exitButton.onmouseleave = exitButton.ontouchend = () => {
                exitButton.style.background = 'rgba(51, 51, 51, 0.9)';
            };
            
            exitButton.onclick = toggleFullscreen;
            slideshowWrapper.appendChild(exitButton);
            
            // Create color scheme button for fullscreen
            const colorButton = document.createElement('button');
            colorButton.id = 'fullscreen-color-btn';
            colorButton.innerHTML = 'Colors';
            colorButton.style.cssText = `
                position: ${isMobile ? 'fixed' : 'absolute'};
                top: ${isMobile ? '60px' : '20px'};
                right: ${isMobile ? '10px' : '200px'};
                z-index: 20000;
                background: rgba(68, 68, 68, 0.9);
                border: 1px solid #666;
                color: #FFA584;
                border-radius: 3px;
                font-family: 'IBM Plex Mono', monospace;
                cursor: pointer;
                padding: ${isMobile ? '12px 16px' : '8px 12px'};
                font-size: ${isMobile ? '16px' : '14px'};
                backdrop-filter: blur(5px);
                transition: background 0.3s ease;
                touch-action: manipulation;
            `;
            
            // Add hover/touch effects for color button
            colorButton.onmouseenter = colorButton.ontouchstart = () => {
                colorButton.style.background = 'rgba(85, 85, 85, 0.9)';
            };
            colorButton.onmouseleave = colorButton.ontouchend = () => {
                colorButton.style.background = 'rgba(68, 68, 68, 0.9)';
            };
            
            colorButton.onclick = cycleColorScheme;
            slideshowWrapper.appendChild(colorButton);
            
            // Create explode button for fullscreen
            const explodeButton = document.createElement('button');
            explodeButton.id = 'fullscreen-explode-btn';
            explodeButton.innerHTML = 'Explode';
            explodeButton.style.cssText = `
                position: ${isMobile ? 'fixed' : 'absolute'};
                top: ${isMobile ? '110px' : '20px'};
                right: ${isMobile ? '10px' : '300px'};
                z-index: 20000;
                background: rgba(68, 68, 68, 0.9);
                border: 1px solid #666;
                color: #FFA584;
                border-radius: 3px;
                font-family: 'IBM Plex Mono', monospace;
                cursor: pointer;
                padding: ${isMobile ? '12px 16px' : '8px 12px'};
                font-size: ${isMobile ? '16px' : '14px'};
                backdrop-filter: blur(5px);
                transition: background 0.3s ease;
                touch-action: manipulation;
            `;
            
            // Add hover/touch effects for explode button
            explodeButton.onmouseenter = explodeButton.ontouchstart = () => {
                explodeButton.style.background = 'rgba(85, 85, 85, 0.9)';
            };
            explodeButton.onmouseleave = explodeButton.ontouchend = () => {
                explodeButton.style.background = 'rgba(68, 68, 68, 0.9)';
            };
            
            explodeButton.onclick = toggleExplodeView;
            slideshowWrapper.appendChild(explodeButton);
        }, isMobile ? 50 : 100);
        
        console.log("Entered fullscreen mode");
    }
    
    // Resize canvas when fullscreen changes
    setTimeout(() => {
        console.log("Fullscreen resize timeout triggered");
        console.log("Current engine:", window.currentEngine);
        console.log("Current scene:", window.currentScene);
        
        // Try to find the canvas element
        const canvas = document.getElementById('modelCanvas');
        console.log("Canvas element found:", canvas);
        console.log("Canvas dimensions:", canvas ? `${canvas.width}x${canvas.height}` : "N/A");
        
        if (window.currentEngine) {
            console.log("Attempting to resize engine...");
            window.currentEngine.resize();
            console.log("Canvas resized for fullscreen");
            
            // Force a render to ensure the canvas updates
            if (window.currentScene) {
                window.currentScene.render();
                console.log("Forced scene render after fullscreen");
            }
            
            // Set canvas internal dimensions for both mobile and desktop
            if (canvas) {
                // Calculate target dimensions based on platform
                const targetWidth = isMobile ? window.innerWidth : window.innerWidth;
                const targetHeight = window.innerHeight;
                
                // Set internal canvas resolution
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                
                console.log(`Set canvas internal dimensions to ${canvas.width}x${canvas.height} (viewport: ${window.innerWidth}x${window.innerHeight})`);
                console.log(`Canvas actual size: ${canvas.style.width} x ${canvas.style.height}`);
            }
            
            // Adjust camera for mobile fullscreen (zoom out a bit)
            if (isMobile && window.currentScene && window.currentScene.activeCamera) {
                const camera = window.currentScene.activeCamera;
                if (camera.radius !== undefined) {
                    // Store original radius if not already stored
                    if (!window.originalMobileRadius) {
                        window.originalMobileRadius = camera.radius;
                    }
                    // Zoom out by 60% for better mobile fullscreen view
                    camera.radius = window.originalMobileRadius * 1.6;
                    console.log("Mobile: Adjusted mobile camera for fullscreen:", camera.radius);
                }
            }
        } else {
            console.warn("No current engine found for fullscreen resize");
            
            // Try to find and resize the canvas manually
            const canvas = document.getElementById('modelCanvas');
            if (canvas) {
                console.log("Attempting manual canvas resize");
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                
                // Try to trigger a redraw if there's a scene
                if (window.currentScene) {
                    console.log("Triggering scene render without engine resize");
                    window.currentScene.render();
                }
            }
        }
    }, isMobile ? 150 : 200);
    
    // Additional resize attempt for desktop after a longer delay
    if (!isMobile) {
        setTimeout(() => {
            console.log("Desktop: Additional resize attempt");
            
            // Set canvas internal dimensions again for both platforms
            const canvas = document.getElementById('modelCanvas');
            if (canvas) {
                const targetWidth = window.innerWidth;
                const targetHeight = window.innerHeight;
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                
                console.log(`Delayed resize: Set canvas internal dimensions to ${canvas.width}x${canvas.height}`);
                console.log('Delayed resize canvas rect:', canvas.getBoundingClientRect());
            }
            
            if (window.currentEngine) {
                window.currentEngine.resize();
                console.log("Desktop: Second engine resize completed");
            }
            if (window.currentScene) {
                window.currentScene.render();
                console.log("Desktop: Second scene render completed");
            }
        }, 500);
    }
}

function babylonLoadScene(canvasId, modelFolder, modelFile, modelColor = null) {
    const canvas = document.getElementById(canvasId); // Get the canvas element
    
    if (!canvas) {
        console.error(`Canvas with id ${canvasId} not found`);
        return;
    }

    // Firefox-specific canvas setup
    const isFirefoxBrowser = navigator.userAgent.toLowerCase().includes('firefox');
    if (isFirefoxBrowser) {
        // Force canvas dimensions for Firefox
        canvas.width = canvas.clientWidth || 800;
        canvas.height = canvas.clientHeight || 600;
        console.log(`Firefox: Canvas dimensions set to ${canvas.width}x${canvas.height}`);
    }

    // Construct the full path
    const isSubPage = window.location.pathname.includes('/pages/');
    const basePath = isSubPage ? "../assets/3D-models/" : "assets/3D-models/";
    const modelPath = basePath + modelFolder;

    // Dispose of existing scene and engine
    if (window.currentScene) {
        window.currentScene.dispose();
    }
    if (window.currentEngine) {
        window.currentEngine.dispose();
    }

    // Configure engine options to avoid Firefox deprecation warnings
    // Firefox-specific engine configuration
    const engineOptions = {
        antialias: true,
        stencil: true,
        preserveDrawingBuffer: isFirefoxBrowser, // Firefox may need this
        premultipliedAlpha: false,
        alpha: false,
        doNotHandleContextLost: true,
        doNotHandleTouchAction: false,
        audioEngine: false,
        disableWebGL2Support: isFirefoxBrowser, // Disable WebGL2 for Firefox compatibility
        deterministicLockstep: false,
        lockstepMaxSteps: 4,
        timeStep: 1/60,
        adaptToDeviceRatio: true, // Help with display scaling
        // Additional Firefox-specific options
        failIfMajorPerformanceCaveat: false,
        powerPreference: "default"
    };

    console.log(`Browser: ${isFirefoxBrowser ? 'Firefox' : 'Other'}, Engine options:`, engineOptions);

    // Firefox-specific WebGL context pre-setup
    if (isFirefoxBrowser) {
        console.log('Firefox: Pre-enabling WebGL extensions before engine creation...');
        
        // Get WebGL context directly from canvas before Babylon.js takes over
        const gl = canvas.getContext('webgl', engineOptions) || canvas.getContext('experimental-webgl', engineOptions);
        gl.getParameter(gl.RENDERER);
        
        if (gl) {
            console.log('Firefox: WebGL context obtained, enabling extensions...');
            
            // Enable extensions that Firefox warns about - do this BEFORE Babylon.js engine creation
            const criticalExtensions = [
                'WEBGL_color_buffer_float',      // Required for framebuffer operations
                'EXT_color_buffer_half_float'    // Required for efficient rendering
            ];
            
            // Additional recommended extensions
            const additionalExtensions = [
                'OES_texture_float',
                'OES_texture_half_float',
                'WEBGL_depth_texture',
                'EXT_texture_filter_anisotropic',
                'OES_standard_derivatives',
                'WEBGL_lose_context',            // For debugging
                'OES_vertex_array_object'        // Performance
            ];
            
            // Enable critical extensions first
            criticalExtensions.forEach(extName => {
                try {
                    const ext = gl.getExtension(extName);
                    if (ext) {
                        console.log(`Firefox: ✓ Enabled critical extension ${extName}`);
                    } else {
                        console.warn(`Firefox: ✗ Critical extension ${extName} not available`);
                    }
                } catch (e) {
                    console.warn(`Firefox: Error enabling critical extension ${extName}:`, e.message);
                }
            });
            
            // Enable additional extensions
            additionalExtensions.forEach(extName => {
                try {
                    const ext = gl.getExtension(extName);
                    if (ext) {
                        console.log(`Firefox: Enabled extension ${extName}`);
                    } else {
                        console.log(`Firefox: - Extension ${extName} not available (optional)`);
                    }
                } catch (e) {
                    console.log(`Firefox: Error enabling extension ${extName}:`, e.message);
                }
            });
            
            // Avoid deprecated WEBGL_debug_renderer_info
            console.log('Firefox: Skipping deprecated WEBGL_debug_renderer_info extension');
            
        } else {
            console.error('Firefox: Could not get WebGL context for extension pre-setup');
        }
    }

    const engine = new BABYLON.Engine(canvas, true, engineOptions); // Create Babylon engine with options
    window.currentEngine = engine;
    
    // Firefox-specific engine post-setup
    if (isFirefoxBrowser) {
        engine.setHardwareScalingLevel(1); // Force 1:1 scaling for Firefox
        console.log('Firefox: Engine created with pre-enabled extensions');
    }
    
    const scene = new BABYLON.Scene(engine);
    window.currentScene = scene;
    
    scene.clearColor = new BABYLON.Color4(0.05, 0.05, 0.05, 1); // Slightly lighter background for better contrast

    const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 3,
        200,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);
    
    // Mobile-specific zoom speed enhancement
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    if (isMobile) {
        camera.wheelPrecision = 10; // Faster wheel zoom (default ~50)
        camera.pinchPrecision = 20; // Faster pinch zoom (default ~12)
        camera.panningSensibility = 500; // Faster panning (default ~1000, lower = faster)
        console.log("Mobile: Enhanced mobile camera controls applied");
    } else {
        camera.wheelPrecision = 50; // Standard desktop zoom speed
        camera.pinchPrecision = 12; // Standard pinch zoom
    }

    // Enhanced lighting setup for better model visibility
    
    // Main ambient light - provides overall illumination
    const ambientLight = new BABYLON.HemisphericLight("AmbientLight", new BABYLON.Vector3(0, 1, 0), scene);
    ambientLight.intensity = 0.7;
    ambientLight.diffuse = new BABYLON.Color3(1, 1, 1);
    ambientLight.specular = new BABYLON.Color3(0.2, 0.2, 0.2);
    
    // Key light - main directional light from front-top-left
    const keyLight = new BABYLON.DirectionalLight("KeyLight", new BABYLON.Vector3(-1, -1, -1), scene);
    keyLight.intensity = 1.2;
    keyLight.diffuse = new BABYLON.Color3(1, 1, 1);
    keyLight.specular = new BABYLON.Color3(0.5, 0.5, 0.5);
    
    // Fill light - softer light from the right to fill shadows
    const fillLight = new BABYLON.DirectionalLight("FillLight", new BABYLON.Vector3(1, 0, -0.5), scene);
    fillLight.intensity = 0.6;
    fillLight.diffuse = new BABYLON.Color3(0.9, 0.9, 1.0);
    
    // Rim light - adds definition to edges from behind
    const rimLight = new BABYLON.DirectionalLight("RimLight", new BABYLON.Vector3(0, 0, 1), scene);
    rimLight.intensity = 0.8;
    rimLight.diffuse = new BABYLON.Color3(0.8, 0.8, 1.0);

    // Load the model with enhanced Firefox debugging
    const fileExtension = modelFile.toLowerCase().substring(modelFile.lastIndexOf('.'));
    console.log(`Firefox Debug: Loading ${modelFile} (${fileExtension}) from ${modelPath}`);
    
    // Special handling for STL files
    if (fileExtension === '.stl') {
        // Verify STL loader class is available
        if (typeof BABYLON.STLFileLoader === 'undefined') {
            console.error('STL loader class not found. Please check if babylon.stlFileLoader.min.js is loaded.');
            // Show error on canvas
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#333';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#FFA584';
                ctx.font = '16px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('STL Loader Error', canvas.width / 2, canvas.height / 2 - 20);
                ctx.fillText('STL plugin not loaded', canvas.width / 2, canvas.height / 2);
                ctx.fillText('Check browser console', canvas.width / 2, canvas.height / 2 + 20);
            }
            return;
        } else {
            console.log('Firefox Debug: STL loader class is available');
            // Try to ensure STL loader is registered
            try {
                BABYLON.SceneLoader.RegisterPlugin(new BABYLON.STLFileLoader());
                console.log('Firefox Debug: STL loader plugin registered successfully');
            } catch (e) {
                // Plugin might already be registered, which is fine
                console.log('Firefox Debug: STL loader registration attempt:', e.message);
            }
        }
    }

    BABYLON.SceneLoader.Append(
        modelPath,
        modelFile,
        scene,
        function () {
            console.log(`Firefox Debug: ${modelFile} loaded successfully on ${canvasId}`);
            console.log(`Firefox Debug: Scene has ${scene.meshes.length} meshes after loading`);
            
            // Debug mesh information
            scene.meshes.forEach((mesh, index) => {
                console.log(`Firefox Debug: Mesh ${index}: ${mesh.name}, visible: ${mesh.isVisible}, enabled: ${mesh.isEnabled()}`);
                if (mesh.geometry) {
                    console.log(`Firefox Debug:   - Has geometry: ${mesh.getTotalVertices()} vertices`);
                }
                if (mesh.material) {
                    console.log(`Firefox Debug:   - Material: ${mesh.material.constructor.name}`);
                }
            });
            
            // Firefox-specific mesh setup
            if (isFirefoxBrowser) {
                console.log('Firefox Debug: Applying Firefox-specific mesh optimizations...');
                scene.meshes.forEach(mesh => {
                    if (mesh.geometry || mesh.getVerticesData) {
                        // Force mesh visibility and enable state
                        mesh.setEnabled(true);
                        mesh.isVisible = true;
                        
                        // Force bounding info refresh for Firefox
                        mesh.refreshBoundingInfo();
                        
                        // Check if mesh has valid data
                        const vertices = mesh.getTotalVertices();
                        console.log(`Firefox Debug: Mesh ${mesh.name} has ${vertices} vertices`);
                    }
                });
            }
            
            // Apply custom coloring if specified
            if (modelColor) {
                console.log('Firefox Debug: Applying custom color:', modelColor);
                scene.meshes.forEach(mesh => {
                    if (mesh.material) {
                        // For PBR materials (most common in .glb files)
                        if (mesh.material instanceof BABYLON.PBRMaterial) {
                            mesh.material.baseColor = modelColor;
                        }
                        // For standard materials
                        else if (mesh.material instanceof BABYLON.StandardMaterial) {
                            mesh.material.diffuseColor = modelColor;
                        }
                        // For multi-materials
                        else if (mesh.material.subMaterials) {
                            mesh.material.subMaterials.forEach(subMat => {
                                if (subMat instanceof BABYLON.PBRMaterial) {
                                    subMat.baseColor = modelColor;
                                } else if (subMat instanceof BABYLON.StandardMaterial) {
                                    subMat.diffuseColor = modelColor;
                                }
                            });
                        }
                    }
                });
            }
            
            // Auto-fit the camera to show the entire model
            if (scene.meshes.length > 0) {
                try {
                    // Get the bounding box of all meshes
                    const meshes = scene.meshes.filter(mesh => mesh.geometry || mesh.getVerticesData);
                    
                    if (meshes.length > 0) {
                        // Calculate scene bounding box
                        let min = null;
                        let max = null;
                        
                        meshes.forEach(mesh => {
                            const boundingInfo = mesh.getBoundingInfo();
                            if (boundingInfo) {
                                const meshMin = boundingInfo.boundingBox.minimumWorld;
                                const meshMax = boundingInfo.boundingBox.maximumWorld;
                                
                                if (!min) {
                                    min = meshMin.clone();
                                    max = meshMax.clone();
                                } else {
                                    // Use the correct Vector3 methods for min/max
                                    min = BABYLON.Vector3.Minimize(min, meshMin);
                                    max = BABYLON.Vector3.Maximize(max, meshMax);
                                }
                            }
                        });
                        
                        if (min && max) {
                            const center = BABYLON.Vector3.Center(min, max);
                            const size = max.subtract(min);
                            const maxSize = Math.max(size.x, size.y, size.z);
                            
                            // Set camera to look at the center of the model
                            camera.target = center;
                            camera.radius = maxSize * 1.6; // Closer view (was 2.0)
                            camera.alpha = Math.PI / 4; // Angle around Y axis (45 degrees)
                            camera.beta = Math.PI / 3;  // Angle from Y axis (60 degrees)
                            
                            console.log(`Firefox Debug: Camera positioned at: radius=${camera.radius}, center=${center}`);
                        }
                    }
                } catch (error) {
                    console.warn("Could not auto-fit camera:", error);
                    // Use default camera position if auto-fit fails
                    camera.radius = 8; // Closer default (was 10)
                    camera.alpha = Math.PI / 4;
                    camera.beta = Math.PI / 3;
                }
            }
            
            // Firefox-specific rendering fixes
            if (isFirefoxBrowser) {
                console.log('Firefox Debug: Applying Firefox-specific rendering fixes...');
                
                // Force a render to ensure visibility
                scene.render();
                
                // Ensure all meshes are visible and enabled
                scene.meshes.forEach(mesh => {
                    if (mesh.geometry || mesh.getVerticesData) {
                        mesh.setEnabled(true);
                        mesh.isVisible = true;
                        
                        // Force refresh of bounding info for Firefox
                        mesh.refreshBoundingInfo();
                    }
                });
                
                // Force engine resize for Firefox
                engine.resize();
                
                // Additional render after setup
                setTimeout(() => {
                    scene.render();
                    console.log('Firefox Debug: Delayed render completed');
                }, 100);
            }
        },
        null,
        function (scene, message) {
            console.error(`Firefox Debug: Error loading ${modelFile} on ${canvasId}:`, message);
            
            // Enhanced error handling for Firefox
            if (isFirefoxBrowser) {
                console.error('Firefox Debug: Additional error context:', {
                    modelPath: modelPath,
                    modelFile: modelFile,
                    fileExtension: fileExtension,
                    canvasSize: `${canvas.width}x${canvas.height}`,
                    isSTL: fileExtension === '.stl',
                    hasSTLLoader: typeof BABYLON.STLFileLoader !== 'undefined'
                });
            }
            
            // Show error message on canvas
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#333';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#FFA584';
                ctx.font = '16px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('3D Model Error', canvas.width / 2, canvas.height / 2 - 20);
                ctx.fillText('Please serve from HTTP server', canvas.width / 2, canvas.height / 2);
                ctx.fillText('(CORS protection active)', canvas.width / 2, canvas.height / 2 + 20);
            }
        }
    );

    // Enhanced render loop with Firefox compatibility
    engine.runRenderLoop(() => {
        if (scene && scene.activeCamera) {
            scene.render();
        }
    });

    // Firefox-specific initialization fixes
    if (isFirefoxBrowser) {
        // Force initial render for Firefox
        setTimeout(() => {
            console.log('Firefox Debug: Force initial render');
            if (scene && engine) {
                engine.resize();
                scene.render();
            }
        }, 50);
        
        // Additional delayed render for Firefox
        setTimeout(() => {
            console.log('Firefox Debug: Additional delayed render');
            if (scene && engine) {
                scene.render();
            }
        }, 200);
        
        // Even more aggressive Firefox render attempts
        setTimeout(() => {
            console.log('Firefox Debug: Extended delayed render');
            if (scene && engine) {
                // Force canvas to be visible
                canvas.style.display = 'block';
                canvas.style.visibility = 'visible';
                
                // Force WebGL context refresh
                engine.resize();
                scene.render();
                
                // Check if anything is actually rendered
                const renderCanvas = engine.getRenderingCanvas();
                const gl = renderCanvas ? renderCanvas.getContext('webgl') || renderCanvas.getContext('experimental-webgl') : null;
                
                if (gl) {
                    console.log('Firefox Debug: WebGL context active, checking render state...');
                    try {
                        console.log('Firefox Debug: Viewport:', gl.getParameter(gl.VIEWPORT));
                        console.log('Firefox Debug: Scene meshes:', scene.meshes.length);
                    } catch (e) {
                        console.log('Firefox Debug: Error checking WebGL state:', e.message);
                    }
                } else {
                    console.warn('Firefox Debug: WebGL context not available for debugging');
                }
            }
        }, 500);
    }

    // Prevent page scrolling when the cursor is over the canvas
    canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
    });

    // Resize canvas on window resize
    window.addEventListener("resize", () => {
        if (window.currentEngine) {
            window.currentEngine.resize();
        }
    });
    
    // Force initial resize to handle responsive canvas
    setTimeout(() => {
        if (window.currentEngine) {
            window.currentEngine.resize();
        }
    }, 100);
}

function scrollSlideshow(direction) {
    if (!window.slideList || window.slideList.length === 0) {
        console.error("No slides available for slideshow");
        return;
    }

    // Since we're now showing all models per slide, we only navigate between slides (projects)
    if (direction > 0) {
        // Moving forward to next project
        if (window.currentSlideIndex < window.slideList.length - 1) {
            window.currentSlideIndex++;
        } else {
            // At the end, wrap to beginning
            window.currentSlideIndex = 0;
        }
    } else {
        // Moving backward to previous project
        if (window.currentSlideIndex > 0) {
            window.currentSlideIndex--;
        } else {
            // At the beginning, wrap to end
            window.currentSlideIndex = window.slideList.length - 1;
        }
    }

    // Load the new slide with all its models
    loadSlide(window.currentSlideIndex);
    updateSlideInfo();
}

// Additional navigation functions for direct slide control
function previousSlide() {
    if (!window.slideList || window.slideList.length === 0) return;
    
    window.currentSlideIndex = (window.currentSlideIndex - 1 + window.slideList.length) % window.slideList.length;
    
    loadSlide(window.currentSlideIndex);
    updateSlideInfo();
}

function nextSlide() {
    if (!window.slideList || window.slideList.length === 0) return;
    
    window.currentSlideIndex = (window.currentSlideIndex + 1) % window.slideList.length;
    
    loadSlide(window.currentSlideIndex);
    updateSlideInfo();
}

// Function to refresh/reload the slideshow (useful for development)
function refreshSlideshow() {
    console.log("🔄 Refreshing slideshow...");
    setupSlideshow();
}

// Function to automatically scroll console to bottom
function scrollConsoleToBottom() {
    var cons = document.getElementById('consout');
    if (cons) {
        // Use setTimeout to ensure DOM has updated
        setTimeout(function() {
            cons.scrollTop = cons.scrollHeight;
        }, 10);
    }
}

// Function to initialize auto-scroll behavior
function initializeAutoScroll() {
    var cons = document.getElementById('consout');
    if (cons) {
        // Add event listener for content changes
        cons.addEventListener('input', scrollConsoleToBottom);
        
        // Also scroll on focus to ensure visibility
        cons.addEventListener('focus', scrollConsoleToBottom);
        
        // Observe changes to the console content
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    scrollConsoleToBottom();
                }
            });
        });
        
        observer.observe(cons, {
            childList: true,
            subtree: true,
            characterData: true
        });
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
    inp.value = '';
    
    //set scroll bar to bottom
    scrollConsoleToBottom();

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
    
    // Get content data (dynamic or static)
    const contentData = getContentData();
    
    for (i in contentData) {
        if (ca === i) {
            di.innerHTML = contentData[i]['html'];
            // Use min-height instead of fixed height to prevent overlap
            document.getElementsByClassName('cons')[0].style.minHeight = contentData[i]['height'];
            document.getElementsByClassName('cons')[0].style.height = 'auto';
            document.getElementsByClassName('cons')[0].style.paddingBottom = '50px';
            document.getElementById('res').appendChild(di);
            
            // Initialize 3D slideshow if this is the projects page
            if (ca === 'PROJECTS') {
                // Wait for DOM to update before initializing slideshow
                setTimeout(() => {
                    setupSlideshow();
                }, 100);
            }
            
            // Auto-scroll console after content is added
            scrollConsoleToBottom();
            break;
        }
    }
}

function removediv() {
    if (document.getElementById(resid)) {
        var element = document.getElementById(resid);
        element.parentNode.removeChild(element);
        // Reset to auto height instead of fixed height
        document.getElementsByClassName('cons')[0].style.height = 'auto';
        document.getElementsByClassName('cons')[0].style.minHeight = 'auto';
        document.getElementsByClassName('cons')[0].style.paddingBottom = '40px';
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
    if (document.getElementById('mySidenav').style.width === '180px') {
        document.getElementById("mySidenav").style.width = "0";
    } else {
        document.getElementById("mySidenav").style.width = "180px";
    }
}

/*
=== 3D MODEL AUTO-DISCOVERY SYSTEM ===

🎉 AUTOMATIC SETUP! Your slideshow now auto-discovers models!

HOW IT WORKS:
✅ Automatically scans assets/3D-models/ folders
✅ Discovers .glb, .gltf, and .stl files
✅ Creates slides for each folder
✅ Assigns unique colors to each project
✅ Formats folder names for display

TO ADD NEW MODELS:
1. 📁 CREATE FOLDER: assets/3D-models/YourProjectName/
2. 📄 ADD FILES: Drop your .stl, .glb, or .gltf files in the folder
3. 🔄 REFRESH: The system will auto-discover them!

SUPPORTED FORMATS: .glb, .gltf, .stl

NAVIGATION:
- Left/Right arrows: Navigate through all models sequentially
- Previous/Next Project buttons: Jump between different projects
- Each folder becomes a "slide" with all its models

AUTO-DISCOVERY FEATURES:
🔍 Scans known project folders
🎨 Auto-assigns colors based on folder name
🏷️ Formats display names (removes underscores, title case)
⚡ Falls back to manual config if auto-discovery fails
🛠️ Console logging shows discovery process

FOLDER EXAMPLES:
- "Robot_Arm" → "Robot Arm" 
- "my-drone-project" → "My Drone Project"
- "WatchDesign" → "Watchdesign"

TROUBLESHOOTING:
- Check browser console for discovery logs
- Use refreshSlideshow() in console to reload
- Ensure files are in correct folder structure
- Server must allow HEAD requests for discovery

MANUAL OVERRIDE:
If auto-discovery fails, the system falls back to the getFallbackModelFolders() configuration.
You can modify this function to add specific projects manually.
*/
