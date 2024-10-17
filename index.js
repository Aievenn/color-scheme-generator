const schemeAreaEl= document.getElementById("scheme-area")
const colorGenBtnEl=document.getElementById("color-gen-btn")
const copyPupupEl = document.getElementById("copy-popup")
let colorsArray = []


 


colorGenBtnEl.addEventListener("click", function(e){

  e.preventDefault()

    const seedColor= (document.getElementById("seed-color").value).substring(1)
    const schemePicked = document.getElementById("scheme").value

  
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&format=json&mode=${schemePicked}`, {method:"GET"})
      .then(res => res.json())
      .then(data => {
        console.log(data)
        colorsArray = data.colors
        let hexColors = colorsArray.map(colors => {
          return   `
          <div class="scheme-color" style="background-color:${colors.hex.value}">
              <div class="scheme-hex-val">${colors.hex.value}</div>
          </div>
          
          `
          
        }).join("")
        
        renderColors(hexColors)
        
        copy()
        
        
      })

})

function renderColors(array){

  schemeAreaEl.innerHTML = ""
  schemeAreaEl.innerHTML += array
}

function copy(){

  let clickableTextColor = document.querySelectorAll(".scheme-color");
  clickableTextColor.forEach((clickable) => clickable.addEventListener("click", () => {
    navigator.clipboard.writeText(clickable.textContent)
    copyPopup()
    

  }))
}
function copyPopup(){

  if(copyPupupEl.classList.contains("hidden")){
    copyPupupEl.classList.remove("hidden")
     setTimeout(() =>
        copyPupupEl.classList.add("hidden"),1500 )
  }else{
     copyPupupEl.classList.add("hidden")
   
  }
}


