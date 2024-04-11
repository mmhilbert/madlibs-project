console.log("madlib");
const madLibsApiUrl = "https://madlibs-api.vercel.app/api/random";

fetch(`https://octoproxymus.herokuapp.com?secret=walrus&url=${madLibsApiUrl}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    console.log(data);
  })
  .catch((error) => {
    // Handle errors here
    console.error("Error:", error);
  });

function searchUnsplashImages(query, clientId, perPage) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=${perPage}`;
  const headers = {
    "Accept-Version": "v1",
    Authorization: `Client-ID ${clientId}`,
  };

  return fetch(url, { headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch images: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      return data.results;
    });
}

// Example usage:
const clientId = "z54n1ORKwgZ-TGu3-dTFhRFLTKXy1Mw7LGrS_yKL1vE";
const query = "landscape";
const perPage = 10;

searchUnsplashImages(query, clientId, perPage)
  .then((images) => {
    images.forEach((image, index) => {
      console.log(`Image ${index + 1}: ${image.urls.regular}`);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
