const madLibsApiUrl = "https://madlibs-api.vercel.app/api/random";
const formEl = document.querySelector("form");
const formInputDivEl = document.querySelector("#input-elements");
const submitButton = document.querySelector("#submit-btn");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();


  const formData = [];
  const inputs = formInputDivEl.querySelectorAll('input[type="text"]');
  inputs.forEach((input) => {
    formData.push(input.value);
  });

  let isEmpty = false;
 //loop for finding if any inputs are empty. pop modal if no input
  inputs.forEach((input) => {
    formData[input.id] = input.value;
    if (input.value.trim() === "") {
      isEmpty = true;
    }
  });

  if (isEmpty) {
    my_modal_1.showModal();
    return
  }

  const formDataJSON = JSON.stringify(formData);

  localStorage.setItem("submittedData", formDataJSON);

  console.log("Form data submitted and stored in local storage.");

  formEl.reset();
  window.location.href = "results.html";
});

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
    const storyTitle = data.title;

    

    // Save story title to local storage
    localStorage.setItem("storyTitle", storyTitle);

    searchUnsplashImages(storyTitle, clientId, perPage)
      .then((images) => {
        images.forEach((image, index) => {
          localStorage.setItem("imageurl", image.urls.regular);
          
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
          "accent"
        );
        inputDivEl.classList.add(`input-form`);
        inputLabelEl.setAttribute("for", `form-input-${i}`);

        let currentBlank = apiResponse.blanks[i];

        if(currentBlank.charAt(0) === 'a' || currentBlank.charAt(0) === 'e' || currentBlank.charAt(0) === 'i' || currentBlank.charAt(0) === 'o' || currentBlank.charAt(0) === 'u') {
          inputLabelEl.innerText = `Enter an ${currentBlank}`;
        } else {
          inputLabelEl.innerText = `Enter a ${currentBlank}`;
        }
        
        // Create input element
        const inputElement = document.createElement("input");
        inputElement.setAttribute("id", `form-input-${i}`);
        inputElement.setAttribute("type", "text");

        // Append label & input elements to div
        inputDivEl.appendChild(inputLabelEl);
        inputDivEl.appendChild(inputElement);

        // Append div to form
        formInputDivEl.appendChild(inputDivEl);
      }
      // Save story to local storage
      localStorage.setItem("storytext", JSON.stringify(apiResponse.text));
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


document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.toggle');
  
  if (localStorage.getItem('btn-theme') === 'true') {
    btn.checked = true;
  } else {
    btn.checked = false;
  }
  
  
  btn.addEventListener('change', function() {
    if (btn.checked) {
      localStorage.setItem('btn-theme', true);
    } else {
      localStorage.removeItem('btn-theme');
      localStorage.setItem('btn-theme', false);
    }
  });
});
