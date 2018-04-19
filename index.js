let currentColor = 0;
const changeColor = ()=>{
  let newBackground = 0;
  if(currentColor<4) {
    currentColor++;
    newBackground =`color-${currentColor}`;
  } else {
    currentColor=0;
    newBackground =`color-${currentColor}`;
  }
  
  const body = document.getElementsByTagName('body')[0];
  // Replace class
  body.className = body.className.replace(/\bcolor-[0-9]\b/g , '' ) + newBackground;
}