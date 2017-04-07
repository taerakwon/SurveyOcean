var question = 1;
function addNewQ_fields(){
    question++;
    var objTo = document.getElementById('question_fields')
    var divElement = document.createElement("div");
    divElement.setAttribute("class","form-group removeclass"+ question);
    var rdiv= 'removeclass' + question;
    divElement.innerHTML='<label for="inputQuestion1" class="control-label col-md-2">Question '+ question +': </label>' +
            '<div class="col-md-10">' +
              '<input type="text" class="form-control" id="inputQuestion1">' +
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
                      '<input type="text" class="form-control" id="inputChoice4">' +
                    '</div></div></div></div>';

    objTo.appendChild(divElement)
    console.log("message shows after clicking add new question");
}