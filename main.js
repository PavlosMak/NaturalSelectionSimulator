var mutation_chance;
var generations;
var background_color;


//Sets background-color and mutation_rate
function initialize(){
    background_color = document.getElementById("color_field").value;
    //alert(color);
    document.body.style.backgroundColor = background_color;
    mutation_chance = document.getElementById("mutation_field").value;
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
