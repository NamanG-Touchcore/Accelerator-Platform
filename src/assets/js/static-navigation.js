/*function next() {
    var questionElements = document.querySelectorAll('#questions>div');
   
    for (var i = 0; i < questionElements.length; i++) {
        if (questionElements[i].style.display != 'none') {
            questionElements[i].style.display = 'none';
            if (i == questionElements.length - 1) {
                questionElements[0].style.display = 'block';
            }
  
       else if (i === questionElements.length) {
            
        document.getElementById("completed").style.display = 'block';
        document.getElementById("cancel").innerHTML = "Done";
        document.getElementById("next").disabled = true;
      }
   
     
      else {
        questionElements[i + 1].style.display = 'block';	
      //  document.getElementById("next").disabled = false;
            }
            break;
        }
    } 
  
  }
  */
  
  function scrollToTop(){
    $(window).scrollTop(0);
  }
  
  function previous() {
    var questionElements = document.querySelectorAll('#questions>div');
    $(window).scrollTop(0);
    for (var i = 0; i < questionElements.length; i++) {
        if (questionElements[i].style.display != 'none') {
            questionElements[i].style.display = 'none';
            if (i == questionElements.length + 1) {
                questionElements[0].style.display = 'block';
  
              
   
            } 
      else if(i == questionElements.length < 0) {
        questionElements[0].style.display = 'block';
            }
      else{
        questionElements[i - 1].style.display = 'block';
    
      }
            break;
        }
    }      
  }



let questions = ["questionId", "question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
let question;


function startSurvey() {
  var hiddenElements = ["question1Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
for(i = 0; i < hiddenElements.length; i++) {
   document.getElementById(hiddenElements[i]).style.display = "none";
}
  question = document.getElementById("question2Id");
  question.style.display = "block";
  document.getElementById("surveyQuestion2").onclick = function(){
  var hiddenElements = ["question1Id","question2Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
    for(i = 0; i < hiddenElements.length; i++) {
       document.getElementById(hiddenElements[i]).style.display = "none";
    }
    question = document.getElementById("question3Id")
    question.style.display = 'block'
   
  }
    document.getElementById("surveyQuestion3").onclick = function(){
   var hiddenElements = ["question1Id","question2Id","question3Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
   for(i = 0; i < hiddenElements.length; i++) {
      document.getElementById(hiddenElements[i]).style.display = "none";
   }
    question = document.getElementById("question4Id")
    question.style.display = 'block'
  }
    document.getElementById("surveyQuestion4").onclick = function(){
    var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
    for(i = 0; i < hiddenElements.length; i++) {
       document.getElementById(hiddenElements[i]).style.display = "none";
    }
      question = document.getElementById("question5Id")
      question.style.display = 'block'
  }
  document.getElementById("surveyQuestion5").onclick = function(){
   var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
   for(i = 0; i < hiddenElements.length; i++) {
      document.getElementById(hiddenElements[i]).style.display = "none";
   }
    question = document.getElementById("question6Id")
    question.style.display = 'block'
}
document.getElementById("surveyQuestion6").onclick = function(){
 var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
 for(i = 0; i < hiddenElements.length; i++) {
    document.getElementById(hiddenElements[i]).style.display = "none";
 }
  question = document.getElementById("question7Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion7").onclick = function(){
var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
  for(i = 0; i < hiddenElements.length; i++) {
     document.getElementById(hiddenElements[i]).style.display = "none";
  }
  question = document.getElementById("question8Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion8").onclick = function(){
 var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
 for(i = 0; i < hiddenElements.length; i++) {
    document.getElementById(hiddenElements[i]).style.display = "none";
 }
  question = document.getElementById("question9Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion9").onclick = function(){
  var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
  for(i = 0; i < hiddenElements.length; i++) {
     document.getElementById(hiddenElements[i]).style.display = "none";
  }
  question = document.getElementById("question10Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion10").onclick = function(){
 var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
 for(i = 0; i < hiddenElements.length; i++) {
    document.getElementById(hiddenElements[i]).style.display = "none";
 }
  question = document.getElementById("question11Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion11").onclick = function(){
 var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
 for(i = 0; i < hiddenElements.length; i++) {
    document.getElementById(hiddenElements[i]).style.display = "none";
 }
  question = document.getElementById("question12Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion12").onclick = function(){
  var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question14Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
  for(i = 0; i < hiddenElements.length; i++) {
     document.getElementById(hiddenElements[i]).style.display = "none";
  }
  question = document.getElementById("question13Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion13").onclick = function(){
 var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question15Id","question16Id","question17Id","question18Id","question19Id"];
 for(i = 0; i < hiddenElements.length; i++) {
    document.getElementById(hiddenElements[i]).style.display = "none";
 }
  question = document.getElementById("question14Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion14").onclick = function(){
  var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question16Id","question17Id","question18Id","question19Id"];
  for(i = 0; i < hiddenElements.length; i++) {
     document.getElementById(hiddenElements[i]).style.display = "none";
  }
  question = document.getElementById("question15Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion15").onclick = function(){
 var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question17Id","question18Id","question19Id"];
 for(i = 0; i < hiddenElements.length; i++) {
    document.getElementById(hiddenElements[i]).style.display = "none";
 }
  question = document.getElementById("question16Id")
  question.style.display = 'block';
}
document.getElementById("surveyQuestion16").onclick = function(){ 
  var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question18Id","question19Id"];
  for(i = 0; i < hiddenElements.length; i++) {
     document.getElementById(hiddenElements[i]).style.display = "none";
  }
  question = document.getElementById("question17Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion17").onclick = function(){
  var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question19Id"];
  for(i = 0; i < hiddenElements.length; i++) {
     document.getElementById(hiddenElements[i]).style.display = "none";
  }
  question = document.getElementById("question18Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion18").onclick = function(){
  var hiddenElements = ["question1Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id"];
  for(i = 0; i < hiddenElements.length; i++) {
     document.getElementById(hiddenElements[i]).style.display = "none";
  }
  question = document.getElementById("question19Id")
  question.style.display = 'block'
}
document.getElementById("surveyQuestion19").onclick = function(){
 var hiddenElements = ["question19Id","question2Id","question3Id","question4Id","question5Id","question6Id","question7Id","question8Id","question9Id","question10Id","question11Id","question12Id","question13Id","question14Id","question15Id","question16Id","question17Id","question18Id"];
 for(i = 0; i < hiddenElements.length; i++) {
    document.getElementById(hiddenElements[i]).style.display = "none";
 }
  question = document.getElementById("question1Id")
  question.style.display = 'block'
}
}
function emailValidate() {
  var email_x = document.getElementById("email").value;
  filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(email.value)) {
    document.getElementById("errorMessage").style.display = "none"; 
    document.getElementById("surveyQuestion11").removeAttribute("disabled"); 
    document.getElementById("surveyQuestion11").onclick = function(){
      question = document.getElementById("question11Id")
      question.style.display = "none";
      question = document.getElementById("question12Id")
      question.style.display = 'block'    
    }    
  } 
  else {
      document.getElementById("errorMessage").style.display = "block"; 
      document.getElementById("surveyquestion11").disabled = "true"; 
  }
}
var inputQuantity = [];
    $(function() {     
      $(".input-number").on("keyup", function (e) {
        var $field = $(this),
            val=this.value,
            $thisIndex=parseInt($field.data("idx"),10); 
        if (this.validity && this.validity.badInput || isNaN(val) || $field.is(":invalid") ) {
            this.value = inputQuantity[$thisIndex];
            return;
        } 
        if (val.length > Number($field.attr("maxlength"))) {
          val=val.slice(0, 5);
          $field.val(val);
        }
        inputQuantity[$thisIndex]=val;
      });      
    });
function validateEmail() {
  var email_xx = document.getElementById("email-validate").value;
  filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
      if (filter.test(email_xx)) {
   
        document.getElementById("surveyQuestion15").removeAttribute("disabled"); 
        document.getElementById("surveyQuestion15").removeAttribute("data-toggle","modal");
        document.getElementById("surveyQuestion15").removeAttribute("data-target","#validateEmailModal");
       
        document.getElementById("surveyQuestion15").onclick = function(){
          question = document.getElementById("question15Id")
          question.style.display = "none";
          question = document.getElementById("question16Id")
          question.style.display = 'block';
          document.getElementsByClassName("modal-backdrop").classList.remove("show");

        }    
      } else {

        document.getElementById("surveyQuestion15").setAttribute("data-toggle","modal");
        document.getElementById("surveyQuestion15").setAttribute("data-target","#validateEmailModal");
        document.getElementById("invalidemail").innerHTML = email_xx;
        document.getElementById("surveyQuestion15").onclick = function(){
          question = document.getElementById("question15Id")
          question.style.display = "block";
          question = document.getElementById("question16Id")
          question.style.display = 'none'  ;
       
  
        }  
      }
    }
