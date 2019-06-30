var mutation_chance;
var generations = 0;
var total_mutations = 0;
var background_color;
var init_entities_num;

var entity_width = 24
var entity_height = 24

var canvas_width = 600;
var canvas_height = 600;

var entities = [];
var mean_color = [];

var mutation_list;
var weight;

var mutation_change_range;

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

var rand = function(min, max) {
    return Math.random() * (max - min) + min;
};

var get_random_item = function(list, weight) {
    var total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    });

    var random_num = rand(0, total_weight);
    var weight_sum = 0;

    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);

        if (random_num <= weight_sum) {
            return list[i];
        }
    }
};

function log() {

    var table = document.getElementById("log");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);

    cell1.innerHTML = generations;
    cell2.innerHTML = entities.length; //Should stay stable but that may change in a later version
    cell3.innerHTML = total_mutations;
    cell4.innerHTML = mean_of_colors(entities);;
    cell5.innerHTML = background_color;
	cell6.innerHTML = [Math.abs(background_color[0]-mean_of_colors(entities)[0]).toFixed(2),
						Math.abs(background_color[1]-mean_of_colors(entities)[1]).toFixed(2),
						Math.abs(background_color[2]-mean_of_colors(entities)[2]).toFixed(2)];

}

function disable_button(id){
    document.getElementById(id).disabled = true;
}

function enable_button(id){
    document.getElementById(id).disabled = false;
}

//initially disables the generation button
disable_button("generation");

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

function populate() {
	var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas_width,canvas_height);
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

function mean_of_colors(entities_list){
	var sum_of_reds = 0;
	var sum_of_greens = 0;
	var sum_of_blues = 0;
	for (ent of entities){
		sum_of_reds +=  ent.color[0];
		sum_of_greens += ent.color[1];
		sum_of_blues +=  ent.color[2];
		//console.log(ent.color[0]);
	}
	//console.log([sum_of_reds/entities_list.length,sum_of_blues/entities_list.length,sum_of_greens/entities_list.length]);

	var mean_color = [(sum_of_reds/entities_list.length).toFixed(2),
		(sum_of_blues/entities_list.length).toFixed(2),
			(sum_of_greens/entities_list.length).toFixed(2)]; //Mean color up to 2 decimals

	return mean_color;
}

//renamed to "generation_pass" because "generation"
//is reserved.
function generation_pass() {
    //temporary disabling of the generation button
    //so that the user cant spam it
    disable_button("generation");
    generations++;
	//alert(generations);
    //sorting the entities list by distance from the
    //background color
    entities.sort(
        function(a,b) {
            return a.distance - b.distance;
        }
    );
    //kills the "worst" entities, the ones
    //with the bigger difference from the bg color
    ent_length = entities.length;
    for (var i = 0; i < (ent_length / 2); i++){
        entities.pop();
    }

    var new_ent
    //clones entities list
    var entities_clone = entities.slice(0);
    for (ent of entities_clone) {
        if (get_random_item(mutation_list,weight)){
            mutation_plus_r = Math.random() * mutation_change_range;
            mutation_plus_g = Math.random() * mutation_change_range;
            mutation_plus_b = Math.random() * mutation_change_range;

            new_ent = new Entity([ent.color[0]+mutation_plus_r,
                ent.color[1]+mutation_plus_g,
                ent.color[2]+mutation_plus_b]);
            entities.push(new_ent);
			total_mutations += 1;
        } else {
            new_ent = new Entity([ent.color[0],ent.color[1],ent.color[2]]);
            entities.push(new_ent);
        }
    }
    populate();
    enable_button('generation');
	log();
}

function many_gen(n){
    //this function helps pass many generations once
    for (var i = 0; i < n; i++){
        generation_pass();
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
    //imports the mutation change range
    mutation_change_range = document.getElementById("mutation_change_field").value;

    mutation_list = [true,false];
    weight = [2*(mutation_chance/100), 1-2*(mutation_chance/100)];

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
    //enables the generation button
    enable_button("generation");
}
