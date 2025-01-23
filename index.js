// handle install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});                    



const EasyURL = "https://opentdb.com/api.php?amount=10&difficulty=easy";
const MediumURL = "https://opentdb.com/api.php?amount=10&difficulty=medium";
const HardURL = "https://opentdb.com/api.php?amount=10&difficulty=hard";



const animalURL = "https://opentdb.com/api.php?amount=10&category=27";
const animeURL = "https://opentdb.com/api.php?amount=10&category=31";
const cartoonURL = "https://opentdb.com/api.php?amount=10&category=32";
const celebritiesURL = "https://opentdb.com/api.php?amount=10&category=26";
const natureURL = "https://opentdb.com/api.php?amount=10&category=17";
const comicURL = "https://opentdb.com/api.php?amount=10&category=29";
const videogameURL = "https://opentdb.com/api.php?amount=10&category=15";
const musicURL = "https://opentdb.com/api.php?amount=10&category=12";
const bookURL = "https://opentdb.com/api.php?amount=10&category=10";
const generalknowledgeURL = "https://opentdb.com/api.php?amount=10&category=9";
const computerURL = "https://opentdb.com/api.php?amount=10&category=18";
const mathURL = "https://opentdb.com/api.php?amount=10&category=19";



let triviaURL;
let currentImage;

var startTime;
var startSeconds;
var myVar;

// Function to start the game
function startGame() {
    const difficulty = document.getElementById('levels').value;
    switch (difficulty) {
        case 'easy':
            triviaURL = EasyURL;
            break;
        case 'medium':
            triviaURL = MediumURL;
            break;
        case 'hard':
            triviaURL = HardURL;
            break;


            
    }


    const catagories = document.getElementById('catagories').value;
    switch (catagories) {

        case 'easy':
            triviaURL = EasyURL;
            break;
        case 'medium':
            triviaURL = MediumURL;
            break;
        case 'hard':
            triviaURL = HardURL;
            break;

            
        case 'Animal':
            triviaURL = animalURL;
            break;
        case 'Anime':
            triviaURL = animeURL;
            break;
        case 'Cartoon':
            triviaURL = cartoonURL;
            break;



            case 'Celebrities':
                triviaURL = celebritiesURL;
                break;
            case 'Nature':
                triviaURL = natureURL;
                break;
            case 'Comic':
                triviaURL = comicURL;
                break;






                case 'Video Game':
                    triviaURL = videogameURL;
                    break;
                case 'Music':
                    triviaURL = musicURL;
                    break;
                case 'Book':
                    triviaURL = bookURL;
                    break;



                    case 'Genral Knowledge':
                        triviaURL = generalknowledgeURL;
                        break;
                    case 'Computers':
                        triviaURL = computerURL;
                        break;
                    case 'Math':
                        triviaURL = mathURL;
                        break;
    }
    fetchTrivia();
    startTimer();
}

function startTimer() {
    startTime = new Date();
    startSeconds = startTime.getSeconds();
    myVar = setInterval(function(){myTimer()},1000);
}

function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    // stops timer after 10 seconds
    if (d.getSeconds() - startSeconds > 10) clearInterval(myVar);
}

function stopTimer() {
    clearInterval(myVar);
}

async function fetchTrivia() {
    const triviaContainer = document.getElementById('trivia-container');
    triviaContainer.innerHTML = '<p>Loading trivia...</p>'; 

    try {
        const response = await fetch(triviaURL);
        const data = await response.json();
        console.log(data); 

        // trivia question and answers
        const question = data.results[0].question;
        const correctAnswer = data.results[0].correct_answer;
        const incorrectAnswers = data.results[0].incorrect_answers;
        fetchPexelsData(correctAnswer);

        // Shuffle answers
        const choices = [...incorrectAnswers, correctAnswer];
        choices.sort(() => Math.random() - 0.5);

        // question and choices on the webpage
        let triviaHTML = `
            <div class="question">${question}</div>
            <div class="choices">
                ${choices.map((choice, index) => 
                    `<div class="choice">
                        <input type="radio" name="answer" value="${choice}" id="choice${index}">
                        <label for="choice${index}">${choice}</label>
                    </div>`
                ).join('')}
            </div>
            <button id="correct" onclick="checkAnswer('${correctAnswer}')">Submit Answer</button>
            <div id="result"></div>
        `;
        triviaContainer.innerHTML = triviaHTML;

    } catch (error) {
        console.error('Error fetching trivia:', error);
        triviaContainer.innerHTML = '<p>Sorry, something went wrong while fetching trivia.</p>';
    }
}

function checkAnswer(correctAnswer) {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const resultContainer = document.getElementById('result');

    if (!selectedAnswer) {
        resultContainer.textContent = 'Please select an answer.';
        return;
    }

    if (selectedAnswer.value === correctAnswer) {
        resultContainer.textContent = 'I suppose You did okay.';
    } else {
        resultContainer.textContent = `Did you learn nothing! the answer is ACTUALLY: ${correctAnswer}`;
    }
}

async function fetchPexelsData(search) {
    const url = "https://api.pexels.com/v1/search?per_page=1&query=" + search;
        
            const headers = {
                "Authorization": "cDyX0VCLCHHSlrZGdb5C0JJYSb5ttc6hOB8ZeunaihOz1tviw2vcnQJ3"
            };
        
            try {
                const response = await fetch(url, { headers });
        
                if (!response.ok) {
                    throw new Error(`HTTPS error! Status: ${response.status}`);
                }
        
                const data = await response.json();
                console.log(data);
        
                // Remove the previous image
                if (currentImage) {
                    const previousImage = document.querySelector('img[src="' + currentImage + '"]');
                    if (previousImage) {
                        previousImage.remove();
                    }
                }
        
                // Display the new image
                const imageUrl = data.photos[0].src.medium;
                currentImage = imageUrl;
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.display = 'block';
                img.style.margin = '0 auto';
                document.body.appendChild(img);
        
                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
      
 // display a new image related to the question
 function displayNewImage(question) {
    // Remove the current image
    const currentImg = document.querySelector('img');
  
    currentImg.remove();

    // Display a new image related to the question
    fetchPexelsData(correctAnswer);
}

// Function to handle question answering
function answerQuestion(correctAnswer) {
    // Your code to handle question answering
    displayNewImage(correctAnswer);
}
// Initial image display


