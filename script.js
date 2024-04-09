console.log("madlib")
const madLibsApiUrl = 'https://madlibs-api.vercel.app/api/random'

fetch(`https://octoproxymus.herokuapp.com?secret=walrus&url=${madLibsApiUrl}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the response data here
    console.log(data);
  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });
