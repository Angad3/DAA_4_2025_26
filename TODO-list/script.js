function addTask() {
    let input = document.getElementById("taskInput");
    if (input.value === "") return;

    let li = document.createElement("li");
    li.innerText = input.value;

    let del = document.createElement("span");
    del.innerText = " ×";
    del.className = "delete";
    del.onclick = function () {
        li.remove();
    };

    li.appendChild(del);
    document.getElementById("taskList").appendChild(li);
    input.value = "";
}
