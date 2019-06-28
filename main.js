//Main javascript file

var mutation_chance;

function initialize(){
    var color = document.getElementById("color_field").value;
    //alert(color);
    document.body.style.backgroundColor = color;
    var mutation_rate = document.getElementById("mutation_field").value;
    mutation_chance = mutation_rate;
}
