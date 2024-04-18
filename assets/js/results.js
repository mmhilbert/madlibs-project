const imageUrl = localStorage.getItem("imageurl");
const storyArray = JSON.parse(localStorage.getItem("storytext"));
const inputArray = JSON.parse(localStorage.getItem("submittedData"));
const storyTitle = localStorage.getItem("storyTitle");
const imageEl = document.querySelector("#story-img");
const storyEl = document.querySelector("#story-text");
const titleEl = document.querySelector("#madlib-title");



// Build the Mad Libs story using the story and user input arrays
function buildStory() {
  let storyText = "";

  for (let i = 0; i < storyArray.length; i++) {
    storyText += storyArray[i];

    if (i < inputArray.length) {
      storyText += `<span class="text-decor">${inputArray[i]}</span>`;
    }
  }
  return storyText;
}

// Setting the image to the correct source
imageEl.setAttribute("src", imageUrl);

// Set story title
titleEl.textContent = storyTitle;

// Setting the story to the stitched-together story text
const storyText = buildStory();

storyEl.innerHTML = storyText;



function generateStoryImage(storyText) {

  if(storyText) {
    const imageWrapper = document.getElementById('story-image-wrapper')
    imageWrapper.innerHTML = '<p>Loading...</p>'
    fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SECRETS.api_key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'model': 'dall-e-3',
        'prompt': `Please create an image to depict the following story. Please be dramatic ${storyText}`,
        'n': 1
      })
    }).then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw response.status
      }
    }).then(data => {
      console.log('success', data)
      let image_url = data.data[0].url
      let imageEl = document.createElement('img')
      imageEl.setAttribute('src', image_url)
      imageEl.setAttribute('alt', 'AI generated image')
      imageEl.classList.add(
        'h-96',
        'items-center',
        'justify-center',
        'mx-auto',
        'mt-10',
        'object-contain')

        imageWrapper.innerHTML= ""
        imageWrapper.appendChild(imageEl)
    
    }).catch(e => {
      imageWrapper.innerHTML = "<p>There was an error</p>"
    })
  }

}

document.addEventListener("DOMContentLoaded", function () {
  generateStoryImage(storyText)
  const btn = document.querySelector(".toggle");

  if (localStorage.getItem("btn-theme") === "true") {
    btn.checked = true;
  } else {
    btn.checked = false;
  }

  btn.addEventListener("change", function () {
    if (btn.checked) {
      localStorage.setItem("btn-theme", true);
    } else {
      localStorage.removeItem("btn-theme");
      localStorage.setItem("btn-theme", false);
    }
  });
});
