/**
 * Reply to user
 */
const reply = (req='', res='')=>{
  let speechBubble = document.getElementById('response');
  let response = ''
  if(res!=='') {
    response = res;
   }
   speechBubble.innerHTML = response;
   speechBubble.style.visibility = 'visible';
}

let currentColor = 0;
let pressCounter = 0;
/**
 * This functions change the color of elements on page by adding class to body
 */
const changeColor = ()=>{
  let newBackground = 0;
  pressCounter ++;
  if(currentColor<4) {
    currentColor++;
    newBackground =`color-${currentColor}`;
  } else {
    currentColor=0;
    newBackground =`color-${currentColor}`;
  }

  if(pressCounter > 10){
    reply('', 'Settle on a color will you!!!')
  }
  
  const body = document.getElementsByTagName('body')[0];
  // Replace class
  body.className = body.className.replace(/\bcolor-[0-9]\b/g , '' ) + newBackground;
}

const defaultConversation = [
  'Hi there',
  'I\'m <b>Rafi</b>',
  'I\'m Developer',
  'Who works mostly in <b>JavaScript</b> and <b>Python</b>',
  'In my free time I contribute to <b>Open source</b> and talk tech',
  'Actually I just realized I\'m just a bot',
  'Ask me whatever you want human'
]

const standardResponse = {
  'open github': ()=> { window.open('https://github.com/Rafi993', '_blank').focus() },
  'open stackoverflow': ()=> { window.open('https://stackoverflow.com/users/2445295/user93', '_blank').focus() }, 
  'open blog': ()=> {window.open('https://medium.com/@notsohuman','_blank').focus()},
  'mail me': ()=> {window.open('https://medium.com/@notsohuman','_blank').focus()}
}

const talk = i=>{
  if(defaultConversation[i]!== undefined) {
    setTimeout(()=> {
      reply('', defaultConversation[i])
      talk(i+1)
    }, 2000)
  }
}

let model = {};
tf.loadModel('./chat/model.json')
.then(data=>{
  console.log(data)
  model = data
})

talk(0);


//  TODO: Remove hard-coded response and add bot api
document.getElementById("talk")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      if(standardResponse[event.target.value] !== undefined) {
        standardResponse[event.target.value]();
      } else {
        const prediction = model.predict(event.target.value);
        reply('', prediction)
        console.log(prediction)
      }
    }
});


console.log('There is nothing here the code for this repo is at https://github.com/Rafi993/portfolio')
