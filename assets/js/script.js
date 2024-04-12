console.log("madlib");
const madLibsApiUrl = "https://madlibs-api.vercel.app/api/random";
const formEl = document.querySelector("#form-el");

fetch(`https://octoproxymus.herokuapp.com?secret=walrus&url=${madLibsApiUrl}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    const clientId = "z54n1ORKwgZ-TGu3-dTFhRFLTKXy1Mw7LGrS_yKL1vE";
    const perPage = 1;
    const imgData = data.title;

    console.log(data);
    console.log(imgData);
    searchUnsplashImages(imgData, clientId, perPage)
      .then((images) => {
        images.forEach((image, index) => {
          console.log(`Image ${index + 1}: ${image.urls.regular}`);
        });
      })
      .then(buildForm(data))
      .catch((error) => {
        console.error("Error:", error);
      });

    // Add the appropriate number of blanks to fill in on the input modal
    function buildForm(apiResponse) {
      for (let i = 0; i < apiResponse.blanks.length; i++) {
        // Create input div
        const inputDivEl = document.createElement("div");

        // Create input label
        const inputLabelEl = document.createElement("label");
        inputLabelEl.classList.add(
          "block",
          "text-gray-700",
          "text-sm",
          "font-bold",
          "mb-2"
        );
        inputLabelEl.setAttribute("for", `form-input-${i}`);
        inputLabelEl.innerText = `Enter a(n) ${apiResponse.blanks[i]}`;

        // Create input element
        const inputElement = document.createElement("input");
        inputElement.setAttribute("id", `form-input-${i}`);
        inputElement.setAttribute("type", "text");

        // Append label & input elements to div
        inputDivEl.appendChild(inputLabelEl);
        inputDivEl.appendChild(inputElement);

        // Append div to form
        formEl.appendChild(inputDivEl);
      }
    }
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
