const imageUrl = localStorage.getItem("imageurl");
const storyArray = JSON.parse(localStorage.getItem("storytext"));
const inputArray = JSON.parse(localStorage.getItem("submittedData"));

console.log(imageUrl);
console.log(storyArray);
console.log(inputArray);

// Build the Mad Libs story using the story and user input arrays
function buildStory() {
  let storyText = "";

  for (let i = 0; i < storyArray.length; i++) {
    storyText += storyArray[i];

    if (i <= inputArray.length) {
      storyText += inputArray[i];
    }
  }
  return storyText;
}

const storyText = buildStory();

console.log(`Story: ${storyText}`);
