const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");




loadEventListener();

function loadEventListener(){
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click" , clearTask);
    filter.addEventListener("keyup", filterTask);
}


//get tasks 

function getTasks(){
    
    let tasks;

    if (localStorage.getItem("tasks") === null)
    {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){

    const li = document.createElement("li");
    
    li.className = "collection-item";

   //create text node
    
   li.appendChild(document.createTextNode(task));


    const link = document.createElement("a");
   link.className = "delete-item secondary-content";
// set link innerHTML

   link.innerHTML = '<i class="fa fa-remove"></i>';
   
// append link to li
   li.appendChild(link);
// append li to ul
   taskList.appendChild(li);

    })



}

function addTask(e){
  if (taskInput.value === ""){
      alert("Add a task");
  }
    e.preventDefault();


    const li = document.createElement("li");
    
    li.className = "collection-item";

   //create text node
    
   li.appendChild(document.createTextNode(taskInput.value));


    const link = document.createElement("a");
   link.className = "delete-item secondary-content";
// set link innerHTML

   link.innerHTML = '<i class="fa fa-remove"></i>';
   
// append link to li
   li.appendChild(link);
// append li to ul
   taskList.appendChild(li);
//store is LS
 storeTaskInLocalStorage(taskInput.value);
//clear input
   taskInput.value = "";

}

//store in LS Function

function storeTaskInLocalStorage(task){

    let tasks;

    if (localStorage.getItem("tasks") === null)
    {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

//remove task

function removeTask(e){

    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are You Sure")){
            e.target.parentElement.parentElement.remove();

            //remove from Local Storage

            removeFromLs(e.target.parentElement.parentElement);
        }
    }

}

//remove from Local Storage

function removeFromLs(taskItem){
    let tasks;

    if (localStorage.getItem("tasks") === null)
    {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index){
        if (taskItem.textContent === task){
            tasks.splice(index,1);
        }
    })

    localStorage.setItem("tasks",JSON.stringify(tasks));




}


//clear task

function clearTask() {

 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        
    }

    clearTaskFromLocalStorage();
}


//clear from Local Storage

function clearTaskFromLocalStorage(){
    localStorage.clear();
}

//filter task

function filterTask(e){

    const text = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll(".collection-item");
    console.log(tasks);
     

    tasks.forEach(function(task){

        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1){
           task.style.display = "block";
        }
        else{
            task.style.display = "none";    
        }
    })

}