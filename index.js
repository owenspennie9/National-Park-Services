'use strict';

// put your own value below!
const apiKey = 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=7jyzutj3vs0GqpCC5Isw50MEzxr5YDdkj92AKvcO'; 
const BaseURL ='developer.nps.gov/api/v1';
function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.items[i].snippet.title}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getItems(query, maxResults=10) {
  const params = {
    key: apiKey,
    q: query,
    part: '',
    maxResults,
    type: ''
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + 'url' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getItems() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getItems(searchTerm, maxResults);
  });
}
    
};
$(getItems);