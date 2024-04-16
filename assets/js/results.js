const imageUrl = localStorage.getItem("imageurl");
const storyArray = JSON.parse(localStorage.getItem("storytext"));
const inputArray = JSON.parse(localStorage.getItem("submittedData"));
const storyTitle = localStorage.getItem("storyTitle");
const imageEl = document.querySelector("img");
const storyEl = document.querySelector("#story-text");
const titleEl = document.querySelector("#madlib-title");

console.log(imageUrl);
console.log(storyArray);
console.log(inputArray);

// Build the Mad Libs story using the story and user input arrays
function buildStory() {
  let storyText = "";

  for (let i = 0; i < storyArray.length; i++) {
    storyText += storyArray[i];

    if (i < inputArray.length) {
      storyText += inputArray[i];
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
console.log(`Story: ${storyText}`);
storyEl.innerText = storyText;
