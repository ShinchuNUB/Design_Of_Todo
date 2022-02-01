let titlearr = [];
let taskarr = [];
let listofdonetask = [];
let isFromEdit = 0;
var title = document.getElementById("title");
var textarea = document.getElementById("textarea");
title.focus();


function AddValue()
{
	alertify.set('notifier','position', 'top-center');
	title.value.trim() == "" 
	? 
	title.focus()
	:
	textarea.value.trim() == ""
	?
	textarea.focus()
	:
	isFromEdit == 0 ? PushValue() : EditValue();
}

function PushValue()
{	
	
	if (localStorage.getItem('tasklist') === null) {
		titlearr = [];
		taskarr = [];
		listofdonetask = [];
	} else {
		titlearr = JSON.parse(localStorage.getItem('titlelist'));
		taskarr = JSON.parse(localStorage.getItem('tasklist'));
	}
	
	titlearr.push(title.value);
	taskarr.push(textarea.value);
		
	localStorage.setItem('titlelist',JSON.stringify(titlearr));
	localStorage.setItem('tasklist', JSON.stringify(taskarr));
	
	title.value = "";
	textarea.style.height = "";
	textarea.value = "";
		
	displayDetails();
}/*
function EditValue()
{
	arr[GlobalIndex] = Todoname.value;
	alertify.alert("Changes May Applied...!","Your Task Is Updated Successfuly...!");
	btn.value = "+ Add";
	isFromEdit = 0;
}*/
function justcall(index)
{
	if(confirm(`Removing Task...! Are you Sure You Want To Remove ${titlearr[index]}..?`))
	{
		listofdonetask = listofdonetask.filter(val => val != titlearr[index]);
		delete titlearr[index];
		delete taskarr[index];
		
		localStorage.setItem('titlelist',JSON.stringify(titlearr));
		localStorage.setItem('tasklist', JSON.stringify(taskarr));
		localStorage.setItem('listofdonetask',JSON.stringify(listofdonetask));
	
		alertify.success("Task Removed...!");
		displayDetails();
	}
}
function displayDetails()
{


	titlearr = JSON.parse(localStorage.getItem('titlelist'));
	taskarr = JSON.parse(localStorage.getItem('tasklist'));
	if(localStorage.getItem('listofdonetask') !== null)
	{
	listofdonetask = JSON.parse(localStorage.getItem('listofdonetask'));
	listofdonetask = listofdonetask.filter(val => val != null);
	}
	taskarr = taskarr.filter(val => val != null);
	titlearr = titlearr.filter(val => val != null);
	

	var tag = document.getElementById("container");
	tag.innerHTML = '';

	for(increment=titlearr.length-1; increment>=0; increment--)
	{
		tag.innerHTML += 
		`<div class="card"> <div class="box" id="box${increment}" > <div class="content">  <h3>${titlearr[increment]}</h3> <p> ${taskarr[increment]}</p>	<button id="${increment}" onClick="taskDone(${increment})">Done</button> <button id="${increment}" onClick="justcall(${increment})">Delete</button></div> </div> </div>`
		alreadyDone(increment);
	}
	title.focus();
}

function taskDone(index)
{
	if (localStorage.getItem('listofdonetask') === null) {
		listofdonetask = [];
	} else {
		listofdonetask = JSON.parse(localStorage.getItem('listofdonetask'));
	}

	listofdonetask.push(titlearr[index]);
	var getingBox = document.getElementById(`box${index}`);
	getingBox.style.background = "rgb(48, 87, 128)";		
	localStorage.setItem('listofdonetask',JSON.stringify(listofdonetask));

}
function alreadyDone(index)
{
	if (localStorage.getItem('listofdonetask') === null) {
		listofdonetask = [];
	} else {
		listofdonetask = JSON.parse(localStorage.getItem('listofdonetask'));
	}
	for(let i=0; i<listofdonetask.length; i++)
	{
		if(titlearr[index] == listofdonetask[i])
		{
			var getingBox = document.getElementById(`box${index}`);
			getingBox.style.background = "rgb(48, 87, 128)";
		}
	}
}
/*
function editTask(index)
{
	isFromEdit = 1;
	Todoname.value = arr[index];
	Todoname.focus();
	GlobalIndex = index;
	btn.value = '* Edit';
}
function CheckTask(index)
{
	let checkbox = document.getElementById(index);
	let thm = document.getElementById(arr[index]);
	checkbox.checked == true ? alertify.alert('Keep It Up...!',`Congrats...! You Done Your ${arr[index]}...!`) : "";
	if(checkbox.checked == true){ thm.classList.add("TaskDone"); checkedarr.push(index);}else{ thm.classList.remove("TaskDone"); checkedarr = checkedarr.filter(val => val != index)}	
	}

//For the "ENTER" keypress button event
Todoname.addEventListener("keyup", function (event) {
    let enKey = event.which;
    if (enKey === 13) {
        document.getElementById("addBtn").click();
    }
});

function DelAll()
{
	location.reload();
}
function focusontxtbx()
{
	Todoname.focus();
}*/
textarea.oninput = function() {
  textarea.style.height = "";
  /* textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px"; */
textarea.style.height = textarea.scrollHeight + "px"
};