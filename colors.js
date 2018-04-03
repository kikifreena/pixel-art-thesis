$( document ).ready(function(){
    $('#errorJavascript').hide();
    updateAll();
})

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

function changeColor(selector){
    var color = $("#color").val();
    console.log(color);
    $(selector).css('background', color);
}

function createTable (width, padding, selector){
    var htmlString = ''
    for (i = 0; i < width; i++){
        htmlString +="\n<tr>";
        for (j=0; j < width; j++ ){
            htmlString += "\n\t<td style=\"padding:" + padding + "px;\"" ;
            htmlString += "onclick=\"changeColor(this);\"></td>";
        }
        htmlString +="\n<tr/>";
    }
    //$(selector).html(htmlString);
    return htmlString;
}

function createEmotions (emotionList){
    var width = Math.abs($("#width").val());
    var size = Math.abs($("#size").val());
    for (i = 0; i < emotionList.length; i++){
        var emotion = emotionList[i]
        var htmlString = ''
        var selector = "#" + emotion;
        htmlString += "<h2>" + emotion + "</h2>"
        htmlString += "<span>" + supportiveMessage() + '</span>'
        htmlString += "<table>" + createTable(width, size, "#sad") + "</table>";
        htmlString += "<p>Write about a time that you were " + emotion + ", and draw it above. What did you draw? Why did you choose these colors?</p>";
        htmlString += "<textarea cols=\"50\" rows=\"10\"></textarea><hr/>"
        $(selector).html(htmlString);
        console.log('works')
    }
    
}
function supportiveMessage(){
    var messages = [
        'Thank you!',
        'Nice choice!',
        'Awesome!',
    ]

    var randomItem = messages[Math.floor(Math.random()*messages.length)];
    return randomItem;
}
// tactile aspect: therapeutic, the clicking
// clicking again: the color could get darker
// limiting to the boxes vs. using a line art - more abstract / higher level processing?