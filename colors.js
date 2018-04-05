$( document ).ready(function(){
    $('#errorJavascript').hide();
    updateAll();
})
var pastTense = {
    "sad": "sad",
    disgust: "disgusted",
    fear: "afraid",
    anger: "angry",
    surprise: "surprised",
    happy: "happy",
}
// comic strip: draw themselves, or draw something bad that happened today
// art therapy: pixel art?
// lots of grids for pixel art: draw your emotions
// choose a color and fill in the grid according to the emotion
// six basic emotions, one color grid for each.
// Save the drawn artwork and send to therapist for interpretation

// make sure that you have at least three points from the literature and have it in the app
function updateAll(){
    var width = Math.abs($("#width").val());
    var size = Math.abs($("#size").val());
    createEmotions(["sad", "disgust", "fear", "anger", "surprise", "happy"]);
}

function createTable (width, padding){
    var htmlString = ''
    for (i = 0; i < width; i++){
        htmlString +="\n<tr>";
        for (j=0; j < width; j++ ){
            htmlString += "\n\t<td style=\"padding:" + padding + "px;\"" ;
            htmlString += "onclick=\"changeColor(this); supportiveMessage(this);\"></td>";
        }
        htmlString +="\n<tr/>";
    }
    return htmlString;
}

function changeColor(selector){
    var color = $("#color").val();
    console.log(color);
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
        htmlString += "<textarea cols=\"50\" rows=\"10\"></textarea><hr/>"
        $(selector).html(htmlString);
    }
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
// tactile aspect: therapeutic, the clicking
// clicking again: the color could get darker
// limiting to the boxes vs. using a line art - more abstract / higher level processing?