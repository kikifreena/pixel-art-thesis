$( document ).ready(function(){
    $('#errorJavascript').hide();
    $('#use').css('background','white')
    $('#stop').css('background','yellow')

    $('#light').css('background','white')
    $('#dark').css('background','yellow')
    updateAll();
    $('body').on("click", "td", function(){
        supportiveMessage(this);
        changeColor(this);
    })
    $("#color").change(function(){
        $('.changed').removeClass('changed')
    })
})

var pastTense = {
    sad: "sad",
    disgust: "disgusted",
    fear: "afraid",
    anger: "angry",
    surprise: "surprised",
    happy: "happy"
}

var clear = false;
var mode = true;

function updateAll(){
    var width = Math.abs($("#width").val());
    var size = Math.abs($("#size").val());
    createEmotions(["sad", "disgust", "fear", "anger", "surprise", "happy", "other"]);
}

function erase(){
    $('#use').css('background','yellow')
    $('#stop').css('background','white')
    clear = true
}

function unerase(){
    $('#use').css('background','white')
    $('#stop').css('background','yellow')
    clear = false
}

function light(){
    $('#light').css('background','yellow')
    $('#dark').css('background','white')
    mode = false
}

function dark(){
    $('#dark').css('background','yellow')
    $('#light').css('background','white')
    mode = true
}

function validate(){
    var lod = $("#lightordark").val();
    if (parseInt(lod) == NaN || lod > 256 || lod < 0){
        alert("Error: amount must be between 0 and 255.")
        return false;
    }
    else {
        return lod
    }
}

function hexToInt(hexString){
    var letters = {A: 10, B: 11, C: 12, D: 13, E: 14, F: 15,
    1: 1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8: 8, 9: 9}   
    var rgb = []
    for (var i = 1; i < hexString.length; i+=2){
        var hexDec = hexString.slice(i,i+2)
        var hexA = hexDec.charAt(0).toUpperCase()
        var hexB = hexDec.charAt(1).toUpperCase()
        rgb.push((letters[hexA]*16 + letters[hexB] ))
    }
    return rgb
}

function darkenColor(color, amount){
    if (mode == false){
        amount *= -1
    }
    finalColors = []
    if (String(color).charAt(0) == '#'){
        var colors = hexToInt(color)
    }
    else if (color.slice(0, 3) == 'rgb'){
        var colors = color.slice(4,-1)
        colors = colors.split(", ")
    }
    else {
        var colors = color
    }
    for (var i = 0; i < colors.length; i++){
        var finalAmount = parseInt(colors[i]) - amount
        if (finalAmount < 0){
            finalColors.push(0)
        }
        else if (finalAmount > 255){
            finalColors.push(255)
        }
        else {
            finalColors.push(finalAmount)
        }
    }
    return finalColors
}

function changeColor(selector){
    var color = $("#color").val();
    var currentColor = $(selector).css('background-color')
    var level = validate();
    if (clear == true){
        $(selector).css('background', '#ffffff');
    }
    else {
        if ($(selector).attr('class') == 'changed' && validate()){
            color = String( 'rgb(' + darkenColor(currentColor, level) + ')')
        }    
        else {
            $(selector).addClass('changed');
        }
    }
    $(selector).css('background', color);
}

function createEmotions (emotionList){
    var width = Math.abs($("#width").val());
    var size = Math.abs($("#size").val());
    for (var i = 0; i < emotionList.length; i++){
        var emotion = emotionList[i]
        var emotionTitle = emotion.charAt(0).toUpperCase() + emotion.substr(1);
        var htmlString = ''
        var selector = "#" + emotion;
        var msg = supportiveMessage();
        htmlString += "<h2>" + emotionTitle + "</h2>"
        htmlString += "<span class=\"" + emotion + " message\">" + "<br/>" + '</span>'
        htmlString += "<table>" + createTable(width, size) + "</table>";
        htmlString += "<p>Write about a time that you were " + pastTense[emotion] + ", and draw it above. What did you create? Why did you choose these colors?</p>";
        htmlString += "<textarea cols=\"50\" rows=\"10\"></textarea><br/><hr/>"
        $(selector).html(htmlString);
    }
}

function createTable (width, padding){
    var htmlString = ''
    for (i = 0; i < width; i++){
        htmlString +="\n<tr>";
        for (j=0; j < width; j++ ){
            htmlString += "\n\t<td></td>";
        }
        htmlString +="\n</tr>";
    }
    $('td').css('padding', padding);
    return htmlString;
}

function supportiveMessage(selector){
    // note: selector is the cell that is being clicked
    var messages = [
        'Thank you!',
        'Nice choice!',
        'Awesome!',
    ]
    var selector = $(selector).parents("table").siblings(".message");
    var randomItem = messages[Math.floor(Math.random()*messages.length)];
    $(selector).html(randomItem);
    return randomItem;
}