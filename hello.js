// a key map of allowed keys
var allowedKeys = {
  72: 'h',
  69: 'e',
  76: 'l',
  79: 'o',
};

// the sequence
var nohelloCode = ['h', 'e', 'l', 'l', 'o'];

// a variable to remember the 'position' the user has reached so far.
var nohelloCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function (e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the code
  var requiredKey = nohelloCode[nohelloCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {
    // move to the next key in the  sequence
    nohelloCodePosition++;

    // if the last key is reached, activate wut
    if (nohelloCodePosition == nohelloCode.length) {
      activateWut();
      nohelloCodePosition = 0;
    }
  } else {
    nohelloCodePosition = 0;
  }
});

function activateWut() {
  document.body.style.backgroundImage = "url('img/why.gif')";

  document.getElementById('wholesite').style.cssText = 'color:white !important';

  document.getElementsByTagName('p')[0].style.cssText =
    'color:white !important';
  document.getElementsByTagName('p')[1].style.cssText =
    'color:white !important';
  document.getElementsByTagName('p')[2].style.cssText =
    'color:white !important';
  document.getElementsByTagName('p')[3].style.cssText =
    'color:white !important';
  document.getElementsByTagName('p')[4].style.cssText =
    'color:white !important';
  document.getElementsByTagName('p')[5].style.cssText =
    'color:white !important';
  document.getElementsByTagName('p')[6].style.cssText =
    'color:white !important';
  document.getElementsByTagName('p')[7].style.cssText =
    'color:white !important';

  document.getElementsByTagName('ul')[0].style.cssText =
    'color:white !important';
  document.getElementsByTagName('ul')[1].style.cssText =
    'color:white !important';

  document.getElementsByTagName('footer')[0].style.cssText =
    'background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 45%) !important; color:white !important';

  document.getElementsByClassName('one')[0].style.cssText =
    'box-shadow: -20px 20px 60px #000000, 20px -20px 60px #000000 !important';
  document.getElementsByClassName('two')[0].style.cssText =
    'box-shadow: -20px 20px 60px #000000, 20px -20px 60px #000000 !important';

  document.getElementsByClassName('subtitle')[0].style.cssText =
    'color:white !important; opacity: 50%';
}
