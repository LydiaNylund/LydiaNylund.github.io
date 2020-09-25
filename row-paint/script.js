let row = document.getElementsByClassName("row");
let buttons = document.getElementById("buttons");
let bgColor;
let borderColor;
let selectedColorElement;




let i = 0;
while (i < row.length) {
    row[i].addEventListener("click", rowClicked);
    i++;
}

let children = buttons.children;
i = 0;
while (i < children.length) {
    children[i].addEventListener("click",buttonClicked);
    i++;
}




function rowClicked(choose) {
    let color = choose.target;

    if(color.style.backgroundColor==bgColor) {

        color.style.backgroundColor="white";
    }
    else {
        color.style.backgroundColor=bgColor;
    }

}

function buttonClicked(choose) {
    if (selectedColorElement) {
        selectedColorElement.style.border = null;
    }
    selectedColorElement = choose.target;
    selectedColorElement.style.border="1px solid white";

    bgColor = choose.target.style.backgroundColor;
}