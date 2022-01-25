let arr = [];
let isFromEdit = 0;
let GlobalIndex = -1;
var Todoname = document.getElementById("todo_name");
let btn = document.getElementById("addBtn");

function AddValue()
{
	isFromEdit == 0 ? PushValue() : EditValue();
	Todoname.value="";
	displayDetails();
}
function PushValue()
{	
	Todoname.value == "" ? alert("Null Not Allowed..!") : arr.push(Todoname.value);	
}
function EditValue()
{
	arr[GlobalIndex] = Todoname.value;
	btn.value = "+ Add";
	isFromEdit = 0;
}
function justCall(index)
{
	confirm(`Are you Sure You Want To Delete ${arr[index]}..?`) ? delete arr[index] : "";
	displayDetails();	
}
function displayDetails()
{
	var tag = document.getElementById("todocontainer");
	tag.innerHTML = '';
	arr = arr.filter(val => val != undefined)
	for(let increment=0; increment<arr.length; increment++)
	{
		tag.innerHTML += '<div class="list" id="list">	<input type="checkbox" id="'+increment+'" onClick="CheckTask('+increment+')"/> <input type="text" id="'+arr[increment]+'" value="'+arr[increment]+'" disabled />	<button class="edit" onClick="editTask('+increment+')"><i class="fa fa-edit" style="color:white; font-size: 25px;"></i></button><button class="delete" id="" onClick="justCall('+increment+')"><i class="fa fa-trash" style="color:white; font-size: 25px;"></i></button></div>';
	}
}
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
	checkbox.checked == true ? alert(`Congrats...! You Done Your ${arr[index]}`) : "";
	checkbox.checked == true ? thm.classList.add("TaskDone") : thm.classList.remove("TaskDone");
}