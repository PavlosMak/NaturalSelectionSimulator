var mutation_chance;
var generations;
var background_color;
var init_entities_num;

var entity_width = 24
var entity_height = 24

var canvas_width = 600;
var canvas_height = 600;

var entities = [];

class Entity {
	//entity class
	constructor(color){
		// creates an entity
		this.position = [Math.floor(Math.random() * canvas_width),
						 Math.floor(Math.random() * canvas_height)];
		this.color = color;
	}
}

function populate(){
    var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < 100; i++){
		//gets the color from the entity
                ctx.fillStyle = to_hex(entities[i].color);
		ctx.fillRect(entities[i].position[0],
			entities[i].position[1],
			entity_width,
			entity_height);
                ctx.stroke();
    }
}

//Sets background-color and mutation_rate
function initialize(){
	//sets the background color
        background_color = document.getElementById("color_field").value;
	document.getElementById("Canvas").style.backgroundColor = background_color;
	//imports the mutation chance and the initial entities number from the user
	mutation_chance = document.getElementById("mutation_field").value;
	init_entities_num = document.getElementById("init_entities_num").value;

	//creates a bunch of entities
	for (var i = 0; i < init_entities_num; i++) {
		entities.push(new Entity([Math.floor(Math.random() * 255),
					Math.floor(Math.random() * 255),
					Math.floor(Math.random() * 255)]));
	}

	//initially populates
	populate();
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function to_hex(rgb) {
	//transforms rgb to hex
	return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
  }


function generation(entities) {
	for (var i = 0; i < entities.length; i++) {
        //Check populate.js
	}
}
