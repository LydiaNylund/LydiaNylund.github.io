const toolbarElement = document.getElementById("toolbar");
const gridContainerElement = document.getElementById("grid-container");
let selectedColorElement;
let gridCount = 16;
gridContainerElement.style.gridTemplateColumns = `repeat(${gridCount},1fr)`;

let colors = ["green", "lime", "yellow", "black", "silver", "brown", "pink", "crimson", "purple", "red", "white", "lightblue", "blue", "orange"];



colors.map(color => {
    let colorElement = document.createElement("a");
    colorElement.href = "#";
    colorElement.classList.add("color");
    colorElement.style.backgroundColor = color;
    colorElement.addEventListener("click", onSelectColor);

    toolbarElement.appendChild(colorElement);
});

let i = 0;
while(i<gridCount * gridCount) {
    let gridElement = document.createElement("div");
    gridElement.classList.add("grid");
    gridElement.addEventListener("click", onPaint);


    gridContainerElement.appendChild(gridElement);
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