//js file for console input/output handeling
const cons = document.getElementById('con');
const curarea = document.getElementById('curarea');

//set console start output
const intro = new String('Welcome to the house of Devon Hopes resume. \n\
                        Read the explanations carefully and decide which direction to move in.\n\
                        Each direction leads to a new section of the resume.\n\n\
                        You are standing in the main entrance way. \n\
                        To the North lies the hall of Projects.\n\
                        To the East is the office of Work.\n\
                        To the West is the den of Education.\n\
                        To the South is the library of Memes.\n > ');

cons.value = '> ';
curarea.innerHTML = 'Home';

//get values enetered
