function rgb_to_array(){
    var rgb_string = "RGB(2323,4,324)";

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

    //alert(rgb_array);
}
