function rgb_to_array(){
    var rgb_string = "RGB(233,134,344)";

    //Get colors from RGB string as strings
    var red = rgb_string.slice(4, 7);
    var green = rgb_string.slice(8, 11);
    var blue = rgb_string.slice(12,15);

    //Changes color values from strings to ints
    red = parseInt(red);
    green = parseInt(green);
    blue = parseInt(blue);

    var rgb_array = [red,green,blue];
    alert(rgb_array);
}
