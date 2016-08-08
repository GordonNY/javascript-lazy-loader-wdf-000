"use strict";

// this is the base API url
var baseUrl = "http://mimeocarlisting.azurewebsites.net/api/cars/";

function formatCars(carsJSON) {
  // this function shold return a string of properly formatted html
  // refer to app/views/index.erb lines 16 - 22 for an example of how
  // to format three cars, each in a div with a class "col-md-4", in a
  // div with a class "row"
  // <div class="col-md-4 car">
  //   <h2>Chevrolet</h2>
  //   <p><strong>Model:</strong> Tahoe</p>
  //   <p><strong>Year:</strong> 2012</p>
  // </div>
  var rowDiv = "<div class=\"row\">";
  $.each(carsJSON, function(index, car) {
    rowDiv += "<div class=\"col-md-4 car\">";
    rowDiv += `<h2>${car.Make}</h2>`;
    rowDiv += `<p><strong>Model:</strong> ${car.Model}</p>`;
    rowDiv += `<p><strong>Year:</strong> ${car.Year}</p>`;
    rowDiv += "</div>";
  });
  rowDiv += "</div>";
  return rowDiv;
}

function addCarsToDOM(carsJSON) {
  // this function should pass carsJSON to formatCars() and then
  // add the resulting HTML to the div with an id of "cars"
  var html = formatCars(carsJSON);
  $('#cars').append(html);
}

function fetchJSON() {
  // this function will make the ajax call
  // on success of the ajax call, it will pass the returned data
  // to addCarsToDOM()
  window.index ? window.index ++ : window.index = 1;
  let url = baseUrl + `${window.index}/6`;
  $.ajax({
    url: url,
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(data) {
      addCarsToDOM(data);
    },
    error: function(response) {
      $('body').text("Sorry, there was an error with the request. Please refresh the page.")
    }
  });
}
