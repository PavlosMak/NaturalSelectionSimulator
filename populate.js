//Example script for putting the entities on the screen

coordinates = [[30,50],[234,556],[344,445],[223,55]];

function populate(){
    var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < coordinates.length; i++){
        ctx.fillStyle = "#FF0000"; //Color to fill rectangle
        ctx.fillRect(coordinates[i][0], coordinates[i][1], 24, 24);
        ctx.stroke();
    }

}
