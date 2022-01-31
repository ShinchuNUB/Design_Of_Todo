let arr = [undefined];
let checkedarr = [];
let cnt = 0;
let isFromEdit = 0;
let GlobalIndex = -1;
var Todoname = document.getElementById("todo_name");
let btn = document.getElementById("addBtn");

function AddValue()
{
	
	Todoname.blur();
	isFromEdit == 0 ? PushValue() : EditValue();
	Todoname.value="";
	displayDetails();
}
function PushValue()
{	
	Todoname.value.trim() == "" ? alertify.alert("TextBox Is Empty...!","Sorry..! You Have To Enter Task In Box..!") : arr.push(Todoname.value);

}
function EditValue()
{
	arr[GlobalIndex] = Todoname.value;
	alertify.alert("Changes May Applied...!","Your Task Is Updated Successfuly...!");
	btn.value = "+ Add";
	isFromEdit = 0;
}
function justCall(index)
{
	alertify.confirm('Deleting Task...!',`Are you Sure You Want To Delete ${arr[index]}..?`, function(){ arr[index]=undefined; displayDetails()}
	, function(){ "" });
}
function displayDetails()
{
	Todoname.value= "";
	btn.value="+ Add";
	var tag = document.getElementById("todocontainer");
	tag.innerHTML = '';
	for(let increment=0; increment<arr.length; increment++)
	{
		letssee(increment) > 0 && arr[increment] != undefined
		?
		tag.innerHTML += '<div class="list" id="list">	<input type="checkbox" id="'+increment+'" onClick="CheckTask('+increment+')" checked/> <input type="text" class="TaskDone" id="'+arr[increment]+'" value="'+arr[increment]+'" disabled />	<button class="edit" onClick="editTask('+increment+')"><i class="fa fa-edit" style="color:white; font-size: 25px;"></i></button><button class="delete" id="" onClick="justCall('+increment+')"><i class="fa fa-trash" style="color:white; font-size: 25px;"></i></button></div>'
		: 
		arr[increment] != undefined 
		?
		tag.innerHTML += '<div class="list" id="list">	<input type="checkbox" id="'+increment+'" onClick="CheckTask('+increment+')"/> <input type="text" id="'+arr[increment]+'" value="'+arr[increment]+'" disabled />	<button class="edit" onClick="editTask('+increment+')"><i class="fa fa-edit" style="color:white; font-size: 25px;"></i></button><button class="delete" id="" onClick="justCall('+increment+')"><i class="fa fa-trash" style="color:white; font-size: 25px;"></i></button></div>'
		:
		tag.innerHTML += "";
		;
	}
	if(tag.innerHTML == ""){ tag.innerHTML = "<h1>No Tasks</h1>"};
}
function letssee(index)
{
	cnt = 0;
	return checkedarr.filter(val => val == index, cnt++);
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
	checkbox.checked == true ? alertify.alert('Keep It Up...!',`Congrats...! You Done Your ${arr[index]}...!`) : "";
	checkbox.checked == true ? thm.classList.add("TaskDone") : thm.classList.remove("TaskDone");
	checkedarr.push(index);
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