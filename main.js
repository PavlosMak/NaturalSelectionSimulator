var mutation_chance;
var generations;


//Sets background-color and mutation_rate 
function initialize(){
    var color = document.getElementById("color_field").value;
    //alert(color);
    document.body.style.backgroundColor = color;
    var mutation_rate = document.getElementById("mutation_field").value;
    mutation_chance = mutation_rate;
}

//creates a bunch of entities
entities = []
for (var i = 0; i < 100; i++) {
	entities.push([Math.floor(Math.random() * 255),
				   Math.floor(Math.random() * 255),
				   Math.floor(Math.random() * 255)]);
}

console.log(entities);

class Entity {
	constructor(color){
		// creates an entity
		this.position = [Math.floor(Math.random() * 200),
						 Math.floor(Math.random() * 200)];
		this.color = color;
	}
}

function generation(entities) {
	for (var i = 0; i < entities.length; i++) {

	}
}
