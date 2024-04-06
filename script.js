const inputBox = document.getElementById("input-box");
const inputBox2 = document.getElementById("input-box2");
const fridgeContainer = document.getElementById("fridge-container");
const groceryContainer = document.getElementById("grocery-container");
const dropZone = document.querySelector(".drop-zone");

function addTask(){
  if(inputBox.value === ''){
    alert("go buy something");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    fridgeContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    li.id = "list-item" + Date.now();
    inputBox.value = "";
    saveData();
    makeDraggable(li);
  }
}

function addTask2(){
    if(inputBox2.value === ''){
    alert("write something");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox2.value;
    groceryContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox2.value = "";
  saveData();
}

fridgeContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    setTimeout(function() {
      e.target.style.opacity = '0';
      saveData();
      }, 1000);
    setTimeout(function(){
      groceryContainer.appendChild(e.target);
      e.target.classList.remove("checked")
      e.target.style.opacity = '100';
      saveData();
      }, 1000);
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
  }
}, false);


groceryContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    setTimeout(function() {
      e.target.style.opacity = '0';
      saveData();
      }, 1000);
    setTimeout(function(){
      fridgeContainer.appendChild(e.target);
      e.target.classList.remove("checked");
      e.target.style.opacity = '100';
      makeDraggable(e.target)
      saveData();
      }, 1000);
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
  }
}, false);

dropZone.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    setTimeout(function() {
      e.target.style.opacity = '0';
      saveData();
      }, 1000);
    setTimeout(function(){
      groceryContainer.appendChild(e.target);
      e.target.classList.remove("checked")
      e.target.style.opacity = '100';
      saveData();
      }, 1000);
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
  }
}, false);


function saveData(){
  localStorage.setItem("fridgeData", fridgeContainer.innerHTML);
  localStorage.setItem("groceryData", groceryContainer.innerHTML);
  localStorage.setItem("freezerData", dropZone.innerHTML);
}

function showTask(){
  fridgeContainer.innerHTML = localStorage.getItem("fridgeData");
  groceryContainer.innerHTML = localStorage.getItem("groceryData");
  document.querySelectorAll('.draggable li').forEach(makeDraggable);
  dropZone.innerHTML = localStorage.getItem("freezerData")
}


function makeDraggable(element){
  element.setAttribute('draggable', true);
  element.addEventListener('dragstart', handleDragStart);
  element.addEventListener('dragover', handleDragOver);
  element.addEventListener('drop', handleDrop);
}

function handleDragStart(event){
  event.dataTransfer.setData('text/plain', event.target.id)
}
function handleDragOver(event){
  event.preventDefault();
}
function handleDrop(event){
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(data);
  if (draggedElement && draggedElement.nodeType === Node.ELEMENT_NODE){
    dropZone.appendChild(draggedElement);
    saveData();
  }
  else{
    console.error("dragged element is not valid or doesn't exist");
  }
}

dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleDrop);
fridgeContainer.addEventListener("dragover", handleDragOver);
fridgeContainer.addEventListener("drop", handleDrop);

showTask();
