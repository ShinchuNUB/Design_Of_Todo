let titlearr = [];
let taskarr = [];
let listofdonetask = [];
let isFromEdit = -1;
var title = document.getElementById("title");
var textarea = document.getElementById("textarea");
title.focus();

function AddValue()
{
	
	alertify.set('notifier','position', 'top-center');
	title.value.trim() == "" ||	textarea.value.trim() == ""
	?
	alertify.error("Please Fill All Fields..!") 
	:
	nevermind();
}
function nevermind()
{
	if (localStorage.getItem('titlelist') === null) {
		titlearr = [];
	} else {
		titlearr = JSON.parse(localStorage.getItem('titlelist'));
	}
	
	titlearr = titlearr.filter(val => val != null);
	
	if(titlearr.length < 1)
	{
		isFromEdit == -1 ? PushValue() : EditValue();
	}
	else
	{
		let againstore = "" ;
		againstore = titlearr.filter(val => val == title.value);
		if(againstore != "")
		{
			alertify.error("Sorry Title Must be Unique..!");
		}
		else
		{
		isFromEdit == -1 ? PushValue() : EditValue();	
		}
	}
	
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
}
function justcall(index)
{
	alertify.set('notifier','position', 'top-center');
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
	taskarr = taskarr.filter(val => val != null);
	titlearr = titlearr.filter(val => val != null);
	

	var tag = document.getElementById("container");
	tag.innerHTML = '';

	for(increment=titlearr.length-1; increment>=0; increment--)
	{
		tag.innerHTML += 
		`<div class="card"> <div class="box" id="box${increment}" > <div class="content">  <h3>${titlearr[increment]}</h3> <p> ${taskarr[increment]}</p>	<button id="${increment}" onClick="taskDone(${increment})">Done</button> <button onClick="justcall(${increment})">Delete</button>  <button onClick="UpdatingValues(${increment})">Update</button> </div> </div> </div>`;
		alreadyDone(increment);	
	}

	title.focus();
}
function taskDone(index)
{
	let found = 0;
	if (localStorage.getItem('listofdonetask') === null) {
		listofdonetask = [];
	} else {
		listofdonetask = JSON.parse(localStorage.getItem('listofdonetask'));
	}
	for(let i=0; i<listofdonetask.length; i++)
	{
		if(titlearr[index] == listofdonetask[i])
		{	
			found = 1;
			delete listofdonetask[i];
			backtonormalcard(index);
		}
	}
	if(found == 0 )
	{
	listofdonetask.push(titlearr[index]);
	changingstyleofcards(index);
	}
	listofdonetask = listofdonetask.filter(val => val != null);
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
			changingstyleofcards(index);
		}
	}
	
}
function changingstyleofcards(index)
{
	var getingBox = document.getElementById(`box${index}`);
	var btnofdone = document.getElementById(`${index}`);
	getingBox.style.background = "rgb(48, 87, 128)";
	getingBox.style.textDecoration = "line-through";	
	getingBox.style.color = "red";
	btnofdone.innerHTML = "Undo";
}
function backtonormalcard(index)
{
	var getingBox = document.getElementById(`box${index}`);
	var btnofdone = document.getElementById(`${index}`);
	getingBox.style.background = "#2a2b2f";
	getingBox.style.textDecoration = "none";	
	getingBox.style.color = "";
	btnofdone.innerHTML = "Done";
}
function UpdatingValues(index)
{
	title.value = titlearr[index];
	textarea.value = taskarr[index];

	textarea.style.height = textarea.scrollHeight + "px";
	isFromEdit = index;
}
function EditValue()
{
	alertify.set('notifier','position', 'top-center');
	
	titlearr[isFromEdit] = title.value;
	taskarr[isFromEdit] = textarea.value;

	localStorage.setItem('titlelist',JSON.stringify(titlearr));
	localStorage.setItem('tasklist', JSON.stringify(taskarr));

	title.value = "";
	textarea.value = "";
	isFromEdit = -1;
	alertify.success("Task Updated...!");
	displayDetails();

}
textarea.oninput = function() {
  textarea.style.height = "";
  /* textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px"; */
textarea.style.height = textarea.scrollHeight + "px"
};
