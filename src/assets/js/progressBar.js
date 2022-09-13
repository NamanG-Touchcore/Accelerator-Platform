let clickOnCancel = false;
let clickOnDone = false;
function roundNumber(num) {
  return Math.round(num);
}
function pieTimer(perc, id) {
  if (perc > 100) {
    perc = 100
  }
  if (!id) {
    return 0;
  }
  if (id === undefined) {
    setTimeout(() => {
      pieTimer(perc, id);
    }, 100);
    return 1;
  } else if (!document.getElementById(id + "child1")) {
    setTimeout(() => {
      pieTimer(perc, id);
    }, 100);
    return 1;
  } else if (!document.getElementById(id + "child2")) {
    setTimeout(() => {
      pieTimer(perc, id);
    }, 100);
    return 1;
  }

  document.getElementById(id + "child1").innerHTML = "";
  var htmlContent = " ";
  var appendedHtmlContent = " ";

  function setPercentage(percent) {
    let wrapper = document.getElementById(id + "child2");
    if (!wrapper) {
      return;
    }
    if (percent <= 25 && percent >= 0) {
      var degree = percent * 3.6;
      wrapper.style.background = `linear-gradient(${270 + degree
        }deg, white 50%, transparent 50%),linear-gradient(270deg, #075296 50%, transparent 50%), linear-gradient(270deg, #075296 50%, white 50%)`;
    } else if (percent <= 50 && percent > 25) {
      var degree = (percent - 25) * 3.6;
      wrapper.style.background = `linear-gradient(${360 + degree
        }deg, white 50%, transparent 50%),linear-gradient(270deg, #075296 50%, transparent 50%), linear-gradient(270deg, #075296 50%, white 50%)`;
    } else if (percent <= 75 && percent > 50) {
      var degree = (percent - 50) * 3.6;
      wrapper.style.background = `linear-gradient(270deg, #075296 50%, transparent 50%),linear-gradient(270deg, #075296 50%, transparent 50%), linear-gradient(${270 + degree
        }deg, #075296 50%, white 50%)`;
    } else if (percent <= 100 && percent > 75) {
      var degree = (percent - 75) * 3.6;
      wrapper.style.background = `linear-gradient(${degree + 1
        }deg, #075296 50%, transparent 50%),linear-gradient(270deg, #075296 50%, transparent 50%), linear-gradient(0deg, #075296 50%, white 50%)`;

      appendedHtmlContent += `<style>
                    -webkit-transition: background-color 2s ease-out;
                    -moz-transition: background-color 2s ease-out;
                    -o-transition: background-color 2s ease-out;
                    transition: background-color 2s ease-out;
                    </style>`;

      wrapper.innerHTML = appendedHtmlContent;
    }
  }
  htmlContent = `
  <span class="progress-percentage-filled-wrapper float-left mt-1" id="${id}child2" 
  style=" position: absolute;
          width: 26px;
          height: 26px;
          overflow: hidden;
          margin: 3px auto;
          background-color: #fff;
          border-radius: 50%;
          z-index: 10000;
          right:4px;
          top: -0.2px;">
    <span class="leftHalf" id="leftId"></span>
    <span class="spinner" id="spinnerNo"></span>
    <span class="rightHalf" id="rightId"></span>
  </span>`;

  var obj = document.getElementById(id + "child1");
  $(htmlContent).appendTo(obj);

  animate(perc, null);




  function animate(i, next) {
    if (next) {
      setPercentage(i);
      if (i >= 50) {
        document.getElementById(id).classList.remove("p" + Math.round(i));
        document.getElementById(id).classList.add("over50");
        document.getElementById(id).classList.add("p" + Math.round(next));
      } else {
        document.getElementById(id).classList.remove("p" + Math.round(i));
        document.getElementById(id).classList.remove("p100");
        document.getElementById(id).classList.remove("over50");
        document.getElementById(id).classList.add("p" + Math.round(next));
      }
    } else {
        if (i != 0) setPercentage(i);
        if (!document.getElementById(id)) return;
        if (i >= 50) {
          document.getElementById(id).classList.add("over50");
          document.getElementById(id).classList.add("p" + Math.round(i));
        } else if (i != 0) {
          document.getElementById(id).classList.add("p" + Math.round(i));
        }
    }
  }
}

function fill(percent) {
  if (!document.getElementById("box")) {
    return 0;
  }
  var box = document.getElementById("box");
  var element = document.getElementById("ex");
  box.style.backgroundColor = "#d0d0d0";
  if (clickOnCancel || clickOnDone) {
    for (let i = 0; i <= previousPercent; i++) {
      animate(i, null);
    }
    clickOnCancel = false;
    clickOnDone = false;
  } else if (previousPercent === null || previousPercent === 0) {
    for (let i = 0; i <= percent; i++) {
      animate(i, null);
    }
    previousPercent = percent;
  } else {
    animate(previousPercent, percent);
    previousPercent = percent;
  }
  function setLinePercentage(i) {
    element.style["width"] = i + "%";
  }
  function animate(i, next) {
    if (next) {
      setLinePercentage(i);
      setLinePercentage(next);
    } else {
      setTimeout(function () {
        if (i != 0) setLinePercentage(i);
      }, 10 * i);
    }
  }
}

$(document).ready(function() {
  
  $(document).click(function() {
     $('.dropdown-menu.show').removeClass('show');
  });
  
  $('body').on('click','.apto-trigger-dropdown', function(e){
    
    e.stopPropagation();
    
   $(this).closest('.apto-dropdown-wrapper').find('.dropdown-menu').toggleClass('show');
  });
  
  
  $('body').on('click','.dropdown-item', function(e){
    
    e.stopPropagation();
    
    let $selectedValue = $(this).val(); 
    let $icon          = $(this).find('svg');
    let $btn           = $(this).closest('.apto-dropdown-wrapper').find('.apto-trigger-dropdown');
    
   $(this).closest('.apto-dropdown-wrapper').find('.dropdown-menu').removeClass('show').attr('data-selected', $selectedValue);
    
    $btn.find('svg').remove();
    
  });
  
});