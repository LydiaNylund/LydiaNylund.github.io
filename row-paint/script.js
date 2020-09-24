let row = document.getElementsByClassName("row");
let buttons = document.getElementById("buttons");




let i = 0;
while (i < row.length) {
    row[i].addEventListener("click", rowClicked);
    i++;
}






function rowClicked(choose) {
    let color = choose.target;

    if(color.style.backgroundColor=="black") {

        color.style.backgroundColor="white";
    }
    else {
        color.style.backgroundColor="black";
    }

}

