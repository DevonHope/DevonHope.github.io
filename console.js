//js file for console input/output handeling

//setup process
function setup(){
    var cons = document.getElementById('consout');
    var curarea = document.getElementById('calbl');
    var arlbl = document.getElementById('arlbl');
    var inp = document.getElementById('in');
    //set console start output
    var intro = new String('Welcome to the house of Devon Hopes resume.\
                            \n\nRead the explanations carefully and decide which direction to move in. Each direction leads to a new section of the resume.\
                            \n\nYou are standing in the main entrance way. \
                            To the North lies the hall of Projects.\
                            To the East is the office of Work.\
                            To the West is the den of Education.\
                            To the South is the library of Memes.\
                            In your front pocket is a copy of my resume, enter \'read\' to download.\
                            \n\nUse \'help\' to display commands.');

    cons.value = intro;
    curarea.innerHTML = 'HOME';
    arlbl.innerHTML = '\>';
    inp.value = '';
}

//check for return carridge
function onEnter(e){
    if(e.which == 13){
        cmdloop();
    }
}

//cmd loop
function cmdloop(){
    //get the input value
    var inp = document.getElementById('in');
    //get the textare value
    var cons = document.getElementById('consout');

    //choices
    var linp = inp.value.toLowerCase();
    var value = "";
    //check if command is prefaced
    if (linp.split(' ')[0] === 'go') {
        linp = linp.split(' ')[1];
        value = maindesc(linp);
    } else if (linp === 'south' || linp == 'north' || linp == 'west' || linp == 'east' || linp == 'read') {
        value = maindesc(linp);
    } else if (linp === 'help') {
        value = help();
    } else if (linp === 'read') {
        download();
    }else {
        value = 'Command not recognized, use \'help\' to print usable commands.';
    }

    //add returned values to consout
    var newcons = cons.value +"\n\n\> "+ linp+"\n\n"+value;
    cons.value = newcons;
    //set scroll bar to bottom
    cons.scrollTop = cons.scrollHeight;
    inp.value = '';
}

function download() {
    var link = document.createElement('a');
    link.href = url;
    link.download = 'assets/DevonHope_Resume.pdf';
    link.dispatchEvent(new MouseEvent('click'));
}

function help(){
    var helpstr = 'HELP - Commands\
                    \n\nDirections:\
                    \nDesitinations are determined by your current position. Any direction can be prefaced with the term \'go\'\
                    \n\'south\'\
                    \n\'north\'\
                    \n\'west\'\
                    \n\'east\'\
                    \n\nCommands:\
                    \n\'read\': to download my resume\
                    \n\'help\': to display this help page';
    return helpstr;
}

function maindesc(inp){
    var curar = document.getElementById('calbl');
    var val = "";
    if(curar = 'HOME'){
        val = home(inp);
    }else if(curar = 'PROJECTS'){
        val = project(inp);
    }else if(curar = 'WORK'){
        val = work(inp);
    }else if(curar = 'EDUCATION'){
        val = education(inp);
    }else if(curar = 'MEMES'){
        val = memes(inp);
    }
    return val;
}

function home(inp){
    var value = "";
    if(inp == 'north'){
        value = "You have entered the hall of Projects."
    }
    return value;
}

function project(inp){

}

function work(inp){

}

function education(inp){

}

function memes(inp){

}
