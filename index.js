import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

// Highlight Options Function & Event Listener
const highlightCheckedOption = (e) => {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
};

emotionRadios.addEventListener("change", highlightCheckedOption);

// Close Modal Function & Event Listener
const closeModal = () => {
  memeModal.style.display = "none";
};

memeModalCloseBtn.addEventListener("click", closeModal);

// Function to RenderCat & Event Listener
const renderCat = () => {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `;
  memeModal.style.display = "flex";
};

getImageBtn.addEventListener("click", renderCat);

// Function to get Matching Cats Array
const getMatchingCatsArray = () => {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector(
            'input[type="radio"]:checked'
        ).value;
        const isGif = gifsOnlyOption.checked;
        
        const matchingCatsArray = catsData.filter(function (cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
            } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

// Function to get a Matching Cat from the Array.
const getSingleCatObject = () => {
  const catsArray = getMatchingCatsArray();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNumber];
  }
}

// Function to get Emotions Array
const getEmotionsArray = (cats) => {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
};

// Function to Render Radio input
const renderEmotionsRadios = (cats) => {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
