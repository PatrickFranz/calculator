var screen = document.getElementById('screen');
var buttons = document.getElementsByClassName('button');
var screenVal = screen.innerHTML;
var hasDecimal = false;
var inputs = [];
var MAX_LENGTH = 12;

onload = function setListeners(){
  for(node in buttons){
    if(buttons[node].nodeType === Node.ELEMENT_NODE){
      buttons[node].addEventListener('click', function(){
        processClick(this.innerHTML);
        processScreen();
      });
    }
  }
}

function processClick(inp){
  switch(inp){
    //Numbers
    case '0':
      screenVal += '0';
      break;
    case '1':
      screenVal += '1';
      break;
    case '2':
      screenVal += '2';
      break;
    case '3':
      screenVal += '3';
      break;
    case '4':
      screenVal += '4';
      break;
    case '5':
      screenVal += '5';
      break;
    case '6':
      screenVal += '6';
      break;
    case '7':
      screenVal += '7';
      break;
    case '8':
      screenVal += '8';
      break;
    case '9':
      screenVal += '9';
      break;
    case '.':
      if(hasDecimal){
        break;
      } else {
        screenVal += '.';
      }
      break;

    //Math functions
    case '=':
      calculate();
      break;
    case '+':
      makeExpr('+');
      break;
    case '-':
      makeExpr('-');
      break;
    case 'x':
      makeExpr('*');
      break;
    case String.fromCharCode(parseInt('00f7', 16))://divide
      makeExpr('/');
      break;
    
    //Calc functions
    case 'DEL':
      screenVal = screenVal.slice(0, screenVal.length -1);
      break;
    case 'CLS':
      screenVal = '0';
      break;
    case 'CLR':
      inputs = [];
      break;
    
    case 'M+':
      console.log('MEM +');
      break;  
    default: 
      console.log("err: shouldn't get here.");
      break;
  }
}

function processScreen(){ 
  //remove uneeded leading zeros.
  if(screenVal.charAt(0) === '0'){
    if(screenVal.charAt(1) === "" ){
      screenVal = '0';
    } else if(screenVal.charAt(1) !== '.'){
      screenVal = screenVal.slice(1);
    }
  }

  //Ensure only 1 decimal.
  hasDecimal = false;
  for(var i=0; i < screenVal.length; i++){
    if(screenVal.charAt(i) === '.'){
      hasDecimal = true;
    }
  }

  //Ensure input is less than MAX_LENGTH.
  if(screenVal.length > MAX_LENGTH){
    screenVal = screenVal.slice(0, MAX_LENGTH);
  }

  //Update calc's screen.
  screen.innerHTML = screenVal;
}

function makeExpr(op){
  inputs.push(screenVal);
  inputs.push(op);
  screenVal = '0';
}

function calculate(){
  inputs.push(screenVal);
  result = eval(inputs.join(''));
  inputs = [];
  screenVal = result.toString();
}
