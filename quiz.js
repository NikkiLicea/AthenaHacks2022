//this would be the object shape for storing the questions  
 //you can change the questions to your own taste or even add more questions..
 const questions = [
  {
      question: "Who was the first woman to run for President of the United States (1872)?",
      optionA: "Elizabeth Blackwell",
      optionB: "Victoria Woodhull",
      optionC: "Katherine Graham",
      optionD: "Hillary Clinton",
      correctOption: "optionB"
  },

  {
      question: "Who wrote the first version of the Equal Rights Amendment, in 1923?",
      optionA: "Mary McLeod Bethune",
      optionB: "Shirley Chisholm",
      optionC: "Toni Morrison",
      optionD: "Rosa Parks",
      correctOption: "optionB"
  },

  {
      question: "Who was the first Chinese-American woman ever elected to hold a statewide office in the United States?",
      optionA: "Elaine Chao",
      optionB: "Michelle Chau",
      optionC: "Peiying Ye",
      optionD: "March Fong Eu",
      correctOption: "optionD"
  },

  {
      question: "Who is the creator of the FLOW-MATIC programming language?",
      optionA: "Ada Lovelace",
      optionB: "Katherine Johnson",
      optionC: "Grace Hopper",
      optionD: "Adele Goldberg",
      correctOption: "optionC"
  },

  {
      question: "Who was the first female artist to win a Grammy for Album of the Year?",
      optionA: "Ella Fitzgerald",
      optionB: "Taylor Swift",
      optionC: "Liza Minnelli",
      optionD: "Judy Garland",
      correctOption: "optionD"
  },

  {
      question: "Who was the first woman to earn a medical degree in the United States?",
      optionA: "Elizabeth Blackwell",
      optionB: "Mary Keller",
      optionC: "Marie Curie",
      optionD: "Virgina Apgar",
      correctOption: "optionA"
  },

  {
      question: "The first Women's History Day was held in _____?",
      optionA: "1926",
      optionB: "1878",
      optionC: "1909",
      optionD: "1899",
      correctOption: "optionC"
  },

  {
      question: "Women Providing Healing, Promoting Hope is the _____ Women's History Month theme.",
      optionA: "2022",
      optionB: "2021",
      optionC: "2020",
      optionD: "2019",
      correctOption: "optionA"
  },

  {
      question: "Women couldn't get credit cards on their own until _____?",
      optionA: "1958",
      optionB: "1962",
      optionC: "1985",
      optionD: "1974",
      correctOption: "optionD"
  },

  {
      question: "Nancy Johnson created the _____.",
      optionA: "Fridge",
      optionB: "Microwave",
      optionC: "Toaster",
      optionD: "Ice Cream Maker",
      correctOption: "optionD"
  },

  {
      question: "Women make up _____ percent of the labor force.",
      optionA: "62.3",
      optionB: "51.1",
      optionC: "57.8",
      optionD: "47,9",
      correctOption: "optionC"
  }
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
  //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
  while (shuffledQuestions.length <= 9) {
      const random = questions[Math.floor(Math.random() * questions.length)]
      if (!shuffledQuestions.includes(random)) {
          shuffledQuestions.push(random)
      }
  }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
  handleQuestions()
  const currentQuestion = shuffledQuestions[index]
  document.getElementById("question-number").innerHTML = questionNumber
  document.getElementById("player-score").innerHTML = playerScore
  document.getElementById("display-question").innerHTML = currentQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
  const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
  let correctOption = null

  options.forEach((option) => {
      if (option.value === currentQuestionAnswer) {
          //get's correct's radio input with correct answer
          correctOption = option.labels[0].id
      }
  })

  //checking to make sure a radio input has been checked or an option being chosen
  if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
      document.getElementById('option-modal').style.display = "flex"
  }

  //checking if checked radio button is same as answer
  options.forEach((option) => {
      if (option.checked === true && option.value === currentQuestionAnswer) {
          document.getElementById(correctOption).style.backgroundColor = "green"
          playerScore++ //adding to player's score
          indexNumber++ //adding 1 to index so has to display next question..
          //set to delay question number till when next question loads
          setTimeout(() => {
              questionNumber++
          }, 1000)
      }

      else if (option.checked && option.value !== currentQuestionAnswer) {
          const wrongLabelId = option.labels[0].id
          document.getElementById(wrongLabelId).style.backgroundColor = "red"
          document.getElementById(correctOption).style.backgroundColor = "green"
          wrongAttempt++ //adds 1 to wrong attempts 
          indexNumber++
          //set to delay question number till when next question loads
          setTimeout(() => {
              questionNumber++
          }, 1000)
      }
  })
}



//called when the next button is called
function handleNextQuestion() {
  checkForAnswer() //check if player picked right or wrong option
  unCheckRadioButtons()
  //delays next question displaying for a second just for some effects so questions don't rush in on player
  setTimeout(() => {
      if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
          NextQuestion(indexNumber)
      }
      else {
          handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
      }
      resetOptionBackground()
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
      document.getElementById(option.labels[0].id).style.backgroundColor = ""
  })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
      options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null
  let remarkColor = null

  // condition check for player remark and remark color
  if (playerScore <= 3) {
      remark = "Bad Grades, Keep Practicing."
      remarkColor = "red"
  }
  else if (playerScore >= 4 && playerScore < 7) {
      remark = "Average Grades, You can do better."
      remarkColor = "orange"
  }
  else if (playerScore >= 7) {
      remark = "Excellent, Keep the good work going."
      remarkColor = "green"
  }
  const playerGrade = (playerScore / 10) * 100

  //data to display to score board
  document.getElementById('remarks').innerHTML = remark
  document.getElementById('remarks').style.color = remarkColor
  document.getElementById('grade-percentage').innerHTML = playerGrade
  document.getElementById('wrong-answers').innerHTML = wrongAttempt
  document.getElementById('right-answers').innerHTML = playerScore
  document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
  questionNumber = 1
  playerScore = 0
  wrongAttempt = 0
  indexNumber = 0
  shuffledQuestions = []
  NextQuestion(indexNumber)
  document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
  document.getElementById('option-modal').style.display = "none"
}


// (function(){
//     // Functions
//     function buildQuiz(){
//       // variable to store the HTML output
//       const output = [];
  
//       // for each question...
//       myQuestions.forEach(
//         (currentQuestion, questionNumber) => {
  
//           // variable to store the list of possible answers
//           const answers = [];
  
//           // and for each available answer...
//           for(letter in currentQuestion.answers){
  
//             // ...add an HTML radio button
//             answers.push(
//               `<label>
//                 <input type="radio" name="question${questionNumber}" value="${letter}">
//                 ${letter} :
//                 ${currentQuestion.answers[letter]}
//               </label>`
//             );
//           }
  
//           // add this question and its answers to the output
//           output.push(
//             `<div class="slide">
//               <div class="question"> ${currentQuestion.question} </div>
//               <div class="answers"> ${answers.join("")} </div>
//             </div>`
//           );
//         }
//       );
  
//       // finally combine our output list into one string of HTML and put it on the page
//       quizContainer.innerHTML = output.join('');
//     }
  
//     function showResults(){
  
//       // gather answer containers from our quiz
//       const answerContainers = quizContainer.querySelectorAll('.answers');
  
//       // keep track of user's answers
//       let numCorrect = 0;
  
//       // for each question...
//       myQuestions.forEach( (currentQuestion, questionNumber) => {
  
//         // find selected answer
//         const answerContainer = answerContainers[questionNumber];
//         const selector = `input[name=question${questionNumber}]:checked`;
//         const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
//         // if answer is correct
//         if(userAnswer === currentQuestion.correctAnswer){
//           // add to the number of correct answers
//           numCorrect++;
  
//           // color the answers green
//           answerContainers[questionNumber].style.color = 'lightgreen';
//         }
//         // if answer is wrong or blank
//         else{
//           // color the answers red
//           answerContainers[questionNumber].style.color = 'red';
//         }
//       });
  
//       // show number of correct answers out of total
//       resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
//     }
  
//     function showSlide(n) {
//       slides[currentSlide].classList.remove('active-slide');
//       slides[n].classList.add('active-slide');
//       currentSlide = n;
//       if(currentSlide === 0){
//         previousButton.style.display = 'none';
//       }
//       else{
//         previousButton.style.display = 'inline-block';
//       }
//       if(currentSlide === slides.length-1){
//         nextButton.style.display = 'none';
//         submitButton.style.display = 'inline-block';
//       }
//       else{
//         nextButton.style.display = 'inline-block';
//         submitButton.style.display = 'none';
//       }
//     }
  
//     function showNextSlide() {
//       showSlide(currentSlide + 1);
//     }
  
//     function showPreviousSlide() {
//       showSlide(currentSlide - 1);
//     }
  
//     // Variables
//     const quizContainer = document.getElementById('quiz');
//     const resultsContainer = document.getElementById('results');
//     const submitButton = document.getElementById('submit');
//     const myQuestions = [
//       {
//         question: "Who invented JavaScript?",
//         answers: {
//           a: "Douglas Crockford",
//           b: "Sheryl Sandberg",
//           c: "Brendan Eich"
//         },
//         correctAnswer: "c"
//       },
//       {
//         question: "Which one of these is a JavaScript package manager?",
//         answers: {
//           a: "Node.js",
//           b: "TypeScript",
//           c: "npm"
//         },
//         correctAnswer: "c"
//       },
//       {
//         question: "Which tool can you use to ensure code quality?",
//         answers: {
//           a: "Angular",
//           b: "jQuery",
//           c: "RequireJS",
//           d: "ESLint"
//         },
//         correctAnswer: "d"
//       }
//     ];
  
//     // Kick things off
//     buildQuiz();
  
//     // Pagination
//     const previousButton = document.getElementById("previous");
//     const nextButton = document.getElementById("next");
//     const slides = document.querySelectorAll(".slide");
//     let currentSlide = 0;
  
//     // Show the first slide
//     showSlide(currentSlide);
  
//     // Event listeners
//     submitButton.addEventListener('click', showResults);
//     previousButton.addEventListener("click", showPreviousSlide);
//     nextButton.addEventListener("click", showNextSlide);
//   })();