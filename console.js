//js file for console input/output handeling

//setup process
function setup(){
    var cons = document.getElementById('consout');
    var curarea = document.getElementById('calbl');
    var inp = document.getElementById('in');
    //set console start output
    var intro = new String('Welcome to the house of Devon Hopes resume.\
                            Read the explanations carefully and decide which direction to move in.\
                            Each direction leads to a new section of the resume.\
                            You are standing in the main entrance way. \
                            To the North lies the hall of Projects.\
                            To the East is the office of Work.\
                            To the West is the den of Education.\
                            To the South is the library of Memes.');

    cons.value = intro;
    curarea.innerHTML = 'HOME';
    inp.value = '> ';
}
//get values enetered
