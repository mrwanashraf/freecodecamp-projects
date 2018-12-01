var xhr = new XMLHttpRequest(); // intializing a new XMLHttpRequest object.
var random = document.getElementById("random"); // getting the random element.
var search = document.getElementById("search"); // getting the search element.
var textbox = document.getElementById("textbox"); // getting the textbox element.
var times = document.getElementById("times"); // getting the clear text element.
var section = document.getElementById("section"); // getting the section element.
var footer = document.getElementById("footer"); // getting footer element.
var result = document.getElementsByClassName("result");

 // making search and cleartext icons disappear until the need for them to appear.
search.style.display = "none";
times.style.display = "none";



// if the textbox is not empty then the search and clear text icons will appear.
function showButtons() {
  if ( textbox.value.length > 0 ) {
    times.style.display = "inline";
    search.style.display = "inline";
  }
  else {
    times.style.display = "none";
    search.style.display = "none";
  }
}

// when clicked it opens a new tab which redirects to a random wikipedia article.
function randomRedirect() {
  window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
}

// clearing the textbox.
function clearText() {
  textbox.value = "";
  times.style.display = "none";
  search.style.display = "none";
}

// when search icon is clicked it will send GET ajax request.
function sendData() {
  // removing previous search result if there is any.
  while ( result.length > 0 ) {
    result[0].parentNode.removeChild(result[0]);
  }
  // opening XHR GET request
  xhr.open('GET', 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+textbox.value+'&format=json&origin=*');
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var title = [];
      var content = [];
      var link = [];
      // push each array in the variable it belongs to.
      for ( i = 1; i <= response.length; i++ ) {
        switch ( i ) {
          case 1:
          title.push(response[1]);
          break;
          case 2:
          content.push(response[2]);
          break;
          case 3:
          link.push(response[3]);
          break;
        }
      }
      // orgainzing the 3 elements into 1 element and pushing it to the section element.
      for (var k = 0; k < title[0].length && k < content[0].length && k < link[0].length ; k++) {
        var data = '<a href='+link[0][k]+' target="_blank" class="result"><article><h1>'+title[0][k]+'</h1><p>'+content[0][k]+'</p></article></a>';
        section.insertAdjacentHTML("beforeend",data); // don't use innerHTML because it stops event listeners.
      }
    }
  };
  xhr.send();
}
// adding event listener to each ID and assigning to it it's appropriate function.
random.addEventListener("click",randomRedirect);
textbox.addEventListener("keyup",showButtons);
times.addEventListener("click", clearText);
search.addEventListener("click", sendData);
