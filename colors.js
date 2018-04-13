$( document ).ready(function(){
    $('#errorJavascript').hide();
    $('#use').css('background','white')
    $('#stop').css('background','yellow')
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

function hexToInt(hexString){
    null
}

function changeColor(selector){
    var color = $("#color").val();
    if (clear == true){
        $(selector).css('background', '#ffffff');
    }
    else {
        if ($(selector).attr('class') == 'changed'){
            console.log(color)
        }    
        else {
            $(selector).addClass('changed');
            $(selector).css('background', color);
        }
    }
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