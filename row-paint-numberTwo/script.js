const toolbarElement = document.getElementById("toolbar");
const rowContainerElement = document.getElementById("row-container");
let selectedColorElement;
let rowCount = 10;

let colors = ["green", "lime", "yellow", "black", "silver", "brown", "pink", "crimson", "purple", "red"];



colors.map(color => {
    let colorElement = document.createElement("a");
    colorElement.href = "#";
    colorElement.classList.add("color");
    colorElement.style.backgroundColor = color;
    colorElement.addEventListener("click", onSelectColor);

    toolbarElement.appendChild(colorElement);
});

let i = 0;
while(i<rowCount) {
    let rowElement = document.createElement("div");
    rowElement.classList.add("row");
    rowElement.addEventListener("click", onPaint);

    rowContainerElement.appendChild(rowElement);
    i++;
}



function onSelectColor(e) {
    e.preventDefault();
    if(selectedColorElement) {
        selectedColorElement.classList.remove('--selected');
    }
    selectedColorElement = e.target;
    selectedColorElement.classList.add("--selected");
}

function onPaint(e) {
    e.target.style.backgroundColor = selectedColorElement.style.backgroundColor;
}