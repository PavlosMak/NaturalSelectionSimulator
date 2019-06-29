var mutation_chance;
var generations;
var background_color;
var init_entities_num;

var entity_width = 24
var entity_height = 24

var canvas_width = 600;
var canvas_height = 600;

var entities = [];

function disable_button(id){
    document.getElementById(id).disabled = true;
}

function enable_button(id){
    document.getElementById("myBtn").disabled = false;
}

function array_to_rgb(rgb_array){
    //converts rgb arrays to strings
    return 'rgb(' + rgb_array.join(', ') + ')';
}

function rgb_to_array(rgb_string){
    // converts rgb strings to arrays

    //Get colors from RGB string as strings
    var first_comma_position = rgb_string.search(',');
    var red = rgb_string.slice(4, first_comma_position);
    var without_red = rgb_string.slice(first_comma_position+1,rgb_string.length);

    var second_comma_position = without_red.search(',');
    var green = without_red.slice(0, second_comma_position+1);
    var blue = without_red.slice(second_comma_position+1, without_red.length);

    //Changes color values from strings to ints
    red = parseInt(red);
    green = parseInt(green);
    blue = parseInt(blue);

    var rgb_array = [red,green,blue];

    return rgb_array;
}


class Entity {
	//entity class
	constructor(color) {
		// creates an entity
		this.position = [Math.floor(Math.random() * (canvas_width-entity_width)),
			Math.floor(Math.random() * (canvas_height-entity_height))
		];
        this.color = color;
        this.distance = 
            ((this.color[0]-background_color[0])**2 + 
            (this.color[1]-background_color[1])**2 + 
            (this.color[2]-background_color[2])**2)**(1/2);
	}
}

function populate() {
	var canvas = document.getElementById("Canvas");
	var ctx = canvas.getContext("2d");
	for (ent of entities) {
		//gets the color from the entity
		ctx.fillStyle = array_to_rgb(ent.color);
		ctx.fillRect(ent.position[0],
			ent.position[1],
			entity_width,
			entity_height);
		ctx.stroke();
	}
}

//Sets background-color and mutation_rate
function initialize() {
	//sets the background color
	background_color = document.getElementById("color_field").value;
    document.getElementById("Canvas").style.backgroundColor = background_color;
    background_color = rgb_to_array(background_color);
	//imports the mutation chance and the initial entities number from the user
	mutation_chance = document.getElementById("mutation_field").value;
	init_entities_num = document.getElementById("init_entities_num").value;

	//creates a bunch of entities
	for (var i = 0; i < init_entities_num; i++) {
		entities.push(new Entity([Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255)
        ]));
    }
    //disables the "start button"
    disable_button("start");
	//initially populates
	populate();
}

function generation() {
    generations++;
    entities.sort(
        function(a,b) {
            return a.distance - b.distance;
        }
    );
    for (; i < (entities.length / 2); ){
        //kills the 50 "worst" entities
        entities.pop();
    }
    
}