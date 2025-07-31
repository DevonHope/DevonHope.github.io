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
            folderName: "Directional Touch Eye Puzzle Mech",
            displayName: "Eye Puzzle Mechanism", // Shorter display name
            color: new BABYLON.Color3(0.8, 0.9, 1), // Light blue
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
    window.currentModelIndex = 0;
    window.slideList = modelFolders;
    window.currentEngine = null;
    window.currentScene = null;
    
    // Load the first slide
    if (modelFolders.length > 0 && modelFolders[0].models.length > 0) {
        loadSlide(0, 0);
        updateSlideInfo();
    } else {
        console.warn("No models found in any folder");
    }
}

// Simple manual file listing system  
function populateModelsFromKnownFiles(modelFolders, basePath) {
    const supportedExtensions = ['.glb', '.gltf', '.stl'];
    
    for (let folder of modelFolders) {
        const folderPath = basePath + folder.folderName + "/";
        
        // Get the known files for this folder
        const knownFiles = getKnownFilesForFolder(folder.folderName);
        
        knownFiles.forEach(fileName => {
            const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
            if (supportedExtensions.includes(extension)) {
                folder.models.push({
                    fileName: fileName,
                    fullPath: folderPath + fileName,
                    color: folder.color
                });
            }
        });
    }
}

// Manual file listings - UPDATE THIS when you add new files
function getKnownFilesForFolder(folderName) {
    const knownFolderContents = {
        "Multipass": [
            "ID-Card-V2.glb",
            "ID Card Slot & Cover.stl",
            "ID Card V2 - Bottom.stl", 
            "ID Card V2 - Top.stl",
            "ID Card V2 - Yellow Bar.stl"
        ],
        "Directional Touch Eye Puzzle Mech": [
            "JS Manager V3.stl",
            "Center Gromet.stl",
            "EMPlate VA-4.stl", 
            "JS Box.stl",
            "Knob.stl"
        ],
        // Add more folders and their files here:
        // "YourFolderName": ["model1.stl", "model2.glb", "model3.gltf"],
    };
    
    return knownFolderContents[folderName] || [];
}

// Function to load a specific slide and model
function loadSlide(slideIndex, modelIndex = 0) {
    const slide = window.slideList[slideIndex];
    if (!slide || !slide.models || slide.models.length === 0) {
        console.error("No models found for slide", slideIndex);
        return;
    }
    
    const model = slide.models[modelIndex];
    babylonLoadScene("modelCanvas", slide.folderName + "/", model.fileName, model.color);
    
    // Update global indices
    window.currentSlideIndex = slideIndex;
    window.currentModelIndex = modelIndex;
}

// Function to update slide information display
function updateSlideInfo() {
    const slide = window.slideList[window.currentSlideIndex];
    if (!slide) return;
    
    const displayName = slide.displayName || slide.folderName;
    const modelCount = slide.models.length;
    const currentModel = window.currentModelIndex + 1;
    
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
    
    slideInfo.innerHTML = `${displayName}<br>Model ${currentModel} of ${modelCount}`;
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
                        console.log(`Firefox: ✓ Enabled extension ${extName}`);
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
                            camera.radius = maxSize * 2.0; // Good distance to see the whole model
                            camera.alpha = Math.PI / 4; // Angle around Y axis (45 degrees)
                            camera.beta = Math.PI / 3;  // Angle from Y axis (60 degrees)
                            
                            console.log(`Firefox Debug: Camera positioned at: radius=${camera.radius}, center=${center}`);
                        }
                    }
                } catch (error) {
                    console.warn("Could not auto-fit camera:", error);
                    // Use default camera position if auto-fit fails
                    camera.radius = 10;
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

    const currentSlide = window.slideList[window.currentSlideIndex];
    
    if (direction > 0) {
        // Moving forward
        if (window.currentModelIndex < currentSlide.models.length - 1) {
            // More models in current slide
            window.currentModelIndex++;
        } else if (window.currentSlideIndex < window.slideList.length - 1) {
            // Move to next slide
            window.currentSlideIndex++;
            window.currentModelIndex = 0;
        } else {
            // At the end, wrap to beginning
            window.currentSlideIndex = 0;
            window.currentModelIndex = 0;
        }
    } else {
        // Moving backward
        if (window.currentModelIndex > 0) {
            // Previous model in current slide
            window.currentModelIndex--;
        } else if (window.currentSlideIndex > 0) {
            // Move to previous slide, last model
            window.currentSlideIndex--;
            window.currentModelIndex = window.slideList[window.currentSlideIndex].models.length - 1;
        } else {
            // At the beginning, wrap to end
            window.currentSlideIndex = window.slideList.length - 1;
            window.currentModelIndex = window.slideList[window.currentSlideIndex].models.length - 1;
        }
    }

    // Load the new model
    loadSlide(window.currentSlideIndex, window.currentModelIndex);
    updateSlideInfo();
}

// Additional navigation functions for direct slide control
function previousSlide() {
    if (!window.slideList || window.slideList.length === 0) return;
    
    window.currentSlideIndex = (window.currentSlideIndex - 1 + window.slideList.length) % window.slideList.length;
    window.currentModelIndex = 0; // Start at first model of the slide
    
    loadSlide(window.currentSlideIndex, window.currentModelIndex);
    updateSlideInfo();
}

function nextSlide() {
    if (!window.slideList || window.slideList.length === 0) return;
    
    window.currentSlideIndex = (window.currentSlideIndex + 1) % window.slideList.length;
    window.currentModelIndex = 0; // Start at first model of the slide
    
    loadSlide(window.currentSlideIndex, window.currentModelIndex);
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
