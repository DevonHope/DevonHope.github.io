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
                    <button class="arrow left" onclick="scrollSlideshow(-1)">&#9664;</button> <!-- Left Arrow -->
                    <div id="slideshow">
                        <canvas id="modelCanvas"></canvas>
                    </div>
                    <button class="arrow right" onclick="scrollSlideshow(1)">&#9654;</button> <!-- Right Arrow -->
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
                    <button class="arrow left" onclick="scrollSlideshow(-1)">&#9664;</button> <!-- Left Arrow -->
                    <div id="slideshow">
                        <canvas id="modelCanvas"></canvas>
                    </div>
                    <button class="arrow right" onclick="scrollSlideshow(1)">&#9654;</button> <!-- Right Arrow -->
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
    
    // Slideshow configuration - single canvas, single model for now
    const models = [
        { modelPath: basePath, modelFile: "ID-Card-V2.glb" },
    ];

    // Store models globally for slideshow navigation
    window.currentModelIndex = 0;
    window.modelList = models;
    window.currentEngine = null;
    window.currentScene = null;
    
    // Load the first model
    babylonLoadScene("modelCanvas", models[0].modelPath, models[0].modelFile);
}

function babylonLoadScene(canvasId, modelPath, modelFile) {
    const canvas = document.getElementById(canvasId); // Get the canvas element
    
    if (!canvas) {
        console.error(`Canvas with id ${canvasId} not found`);
        return;
    }

    // Dispose of existing scene and engine
    if (window.currentScene) {
        window.currentScene.dispose();
    }
    if (window.currentEngine) {
        window.currentEngine.dispose();
    }

    // Configure engine options to avoid Firefox deprecation warnings
    const engineOptions = {
        antialias: true,
        stencil: true,
        preserveDrawingBuffer: false,
        premultipliedAlpha: false,
        alpha: false,
        doNotHandleContextLost: true,
        doNotHandleTouchAction: false,
        audioEngine: false,
        disableWebGL2Support: false,
        deterministicLockstep: false,
        lockstepMaxSteps: 4,
        timeStep: 1/60
    };

    const engine = new BABYLON.Engine(canvas, true, engineOptions); // Create Babylon engine with options
    window.currentEngine = engine;
    
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

    // Load the model
    BABYLON.SceneLoader.Append(
        modelPath,
        modelFile,
        scene,
        function () {
            console.log(`${modelFile} loaded successfully on ${canvasId}`);
            
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
        },
        null,
        function (scene, message) {
            console.error(`Error loading ${modelFile} on ${canvasId}:`, message);
            
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

    // Render loop
    engine.runRenderLoop(() => {
        scene.render();
    });

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
    if (!window.modelList || window.modelList.length === 0) {
        console.error("No models available for slideshow");
        return;
    }

    // Update the current index
    window.currentModelIndex += direction;

    // Ensure the index stays within bounds
    if (window.currentModelIndex < 0) {
        window.currentModelIndex = 0; // Prevent going past the first model
    } else if (window.currentModelIndex >= window.modelList.length) {
        window.currentModelIndex = window.modelList.length - 1; // Prevent going past the last model
    }

    // Load the new model
    const currentModel = window.modelList[window.currentModelIndex];
    babylonLoadScene("modelCanvas", currentModel.modelPath, currentModel.modelFile);
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
