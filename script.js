var blueTeam = [0,0,0,0,0,0,0,0];
var greenTeam = [0,0,0,0,0,0,0,0];
var computerGess = [0,0,0,0,0,0,0,0];
var flag_start_game = 0;
var flag_game_ended = 0;
var flag_computer_first_red = 0;


function startGame(){
    
    //location.reload();
    for(i=0;i<8;i++){
        a = document.getElementById(i+"-r");
        a.style.visibility='visible';
        a.style.background = '#3385ff';
        b = document.getElementById(i+"-l").style.visibility='visible';
        blueTeam[i] = 0;
        greenTeam[i] = 0;
        computerGess[i] = 0;
    }
    flag_computer_first_red = 0;
    show_message(0);
    flag_start_game = 1;
}

// *****ClickeAble Methods*****

function makeMove(clicked_id){
    if(flag_start_game){
        if(checkNoOnesBlueTeam()){ // if true , means no red circle 
            makeRed(clicked_id);
            if(flag_computer_first_red == 0){
                makeRedComputer(); // computer make red;
            }
            flag_computer_first_red = 1;
        }
        else{
            alert("Please try to gess from the green team");
        }
        
    }
    else{
        alert("Please click 'Start Game'");
    }
}

function makeGess(clicked_id){
    if(flag_start_game){
        if(checkNoOnesBlueTeam()){
            alert("Please select one circle from the blue team");
        }
        else{
            var a;
            if(greenTeam[clicked_id[0]] == 1){
                alert('You gess right');
                greenTeam[clicked_id[0]] == -1;
                a = document.getElementById(clicked_id).style.visibility='hidden';
                makeRedComputer();
                if(checkGreenTeam()){
                    ComputerMakeMove();
                }
            }
            else{
                 alert('Wrong.');
                 ComputerMakeMove();
            }
        }
    }
    else{
       alert("Please click 'Start Game'"); 
    }
    
}


// *************End Of ClickeAble Methods**************

function show_message(temp){
    var place_red = document.getElementById("place_red");

    if(temp == 0){
        place_red.textContent = 'Please select one pieces from the blue team.';
    }
    else if(temp == 1){
        place_red.textContent = 'Try to gess which circle the computer choose to be the red one.';
    }
    else if(temp == 2){
        place_red.textContent = '';

    }
}

function makeRed(id){
    var a = document.getElementById(id).style.background = "red";
    blueTeam[id[0]] = 1; // take the index from the id
    show_message(1);
}

function makeRedComputer(){
    var r = Math.floor(Math.random() * 8);
    if(checkGreenTeam()){
        while(greenTeam[r] != 0){
            var r = Math.floor(Math.random() * 8);
        }
        greenTeam[r] = 1;
        console.log("computer red : "+r);
        show_message(1);
    }
    else{
        alert("You Win!!!");
        finishedGame();
    }
    
}

function ComputerMakeMove(){
    var r = Math.floor(Math.random() * 8);
     while(blueTeam[r] == -1 || computerGess[r] == 1){ 
         // while we choose a circle that already hidden or computer already gess.
         r = Math.floor(Math.random() * 8);
     } 
    // saggestion : i can give the computer advantage by taking two gessing.
    computerGess[r] = 1;
    if(blueTeam[r] == 1){
        alert("Computer gess your red Circle");
        var a = document.getElementById(r+"-r").style.visibility='hidden';
        blueTeam[r] = -1;
        for(i=0;i<8;i++){ // reset the gessing list
            computerGess[i] = 0;
        }
        if(!checkBlueTeam()){
            alert("Computer Win!!!");
            finishedGame();
        }
        show_message(0);

    }
    else{
        alert("Computer gess wrong. Your turn again.");
    }
    
}


function checkBlueTeam(){ // Verify there are still peices on board.
    for (i=0;i<8;i++){
        if(blueTeam[i] == 0)
            return true;
    }
    
    return false;
}

function checkGreenTeam(){ // Verify there are still peices on board.
    for (i=0;i<8;i++){
        if(greenTeam[i] == 0)
            return true;
    }
    
    return false;
}

function checkNoOnesBlueTeam(){
    for (i=0;i<8;i++){
        if(blueTeam[i] == 1)
            return false;
    }
    
    return true;
}

function checkNoOnesGreenTeam(){
    for (i=0;i<8;i++){
        if(greenTeam[i] == 1)
            return false;
    }
    
    return true;
}


function finishedGame(){
    var a;
    var b;
    flag_game_ended = 1;
    flag_computer_first_red = 0;
    for(i=0;i<8;i++){
        a = document.getElementById(i+"-r");
        a.style.visibility='hidden';
        a.style.background = '#3385ff';
        b = document.getElementById(i+"-l").style.visibility='hidden';
        blueTeam[i] = 0;
        greenTeam[i] = 0;
        computerGess[i] = 0;
    }
    show_message(2);
    alert("click 'Start Game' to start again");
    
}

function aboutAlert(){
    alert("Welcome to 'Catch & Win'.\nIn this game you want to erase all your competitor circles.\nYou need to select one circle from the blue team and make it red.\nNow you need to gess who is the red circle in the green team.\nIf you gess right the circle disapear and the green team select another circle, if you worng the computer get the chance to gess your red circle.\nBest of luck! ");
}