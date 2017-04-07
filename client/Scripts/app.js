/*  
  File name: app.js
  Group Number: Group 6
  Web App name: Survey Ocean
  Description: Custom javascripts
*/

//global variable
var question = 1;
//function to add new question
function addNewQ_fields(){
    question++;
    var objTo = document.getElementById('question_fields');
    var divElement = document.createElement("div");
    divElement.setAttribute("class","form-group "+ question);
    
    if(question <=10)
    {    
    divElement.innerHTML='<label for="inputQuestion1" class="control-label col-md-2">Question '+ question +': </label>' +
            '<div class="col-md-10">' +
              '<input type="text" class="form-control" id="inputQuestion'+question+'">' +
              '<div class="col-md-12">' +
                '<label for="inputChoice1" class="control-label col-md-1">a: </label>' +
                    '<div class="col-md-2">' +
                      '<input type="text" class="form-control" id="inputChoice1">' +
                     '</div>' +
                    '<label for="inputChoice2" class="control-label col-md-1">b: </label>' +
                    '<div class="col-md-2">' +
                      '<input type="text" class="form-control" id="inputChoice2"></div>' +
                    '<label for="inputChoice3" class="control-label col-md-1">c: </label>' +
                    '<div class="col-md-2">' +
                      '<input type="text" class="form-control" id="inputChoice3"></div>' +
                    '<label for="inputChoice4" class="control-label col-md-1">d: </label>' +
                    '<div class="col-md-2">' +
                      '<input type="text" class="form-control" id="inputChoice4"></div>' +
                      '<button type="button" class="btn btn-danger remove" onclick="delQ_field();"><span class="glyphicon glyphicon-minus"></span></button></div></div></div>';

    objTo.appendChild(divElement)
    } else {
        window.alert("only 10 questions max!");
    }
    console.log(question);
}
//function to delete question
function delQ_field(){
    $("div").remove(".form-group." + question);
    question--;
    console.log(question);
}