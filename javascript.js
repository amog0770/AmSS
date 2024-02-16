// control of timer start

//control of timer end
let timerInterval;
        let startTime;
        let endTime;
        let elapsedTime = 0;
        let timerRunning = false;
        var TimerDataToPass=1;
        var TemperatureDataToPass=1;

        function startTimer() {
            if (!timerRunning) {
                const durationInSeconds = (combination.Timer*60);
                const currentTime = Date.now();
                startTime = currentTime;
                endTime = currentTime + durationInSeconds * 1000; // Convert seconds to milliseconds
                timerInterval = setInterval(updateTimer, 1000);
                timerRunning = true;
                updateTimer(); // Update immediately to avoid delay
            }
        }

        function stopTimer() {
            clearInterval(timerInterval);
            timerRunning = false;
        }

        function resetTimer() {
            clearInterval(timerInterval);
            timerRunning = false;
            elapsedTime = 0;
            updateTimer();
        }

        function updateTimer() {
            const currentTime = Date.now();
            elapsedTime = endTime - currentTime;

            if (elapsedTime <= 0) {
                stopTimer();
                elapsedTime = 0;
            }

            displayTime();
        }

        function displayTime() {
            const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
            const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

            document.getElementById('timer').innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
        }

        function formatTime(time) {
            return time < 10 ? '0' + time : time;
        }

// cobination starts 
const mainBlocks = ['Prakriti', 'Vyadi', 'Desh', 'Rutu'];
const subBlocks = {
  'Prakriti': ['Vat', 'Pitta', 'Kapshi'],
  'Vyadi': ['Vatagulm', 'Pratisjay', 'Shwas', 'Vatvyadhi'],
  'Desh': ['Jangal', 'Anup', 'Sadhara'],
  'Rutu': ['Hemant', 'Shishir', 'Vasanta', 'Greesham', 'Varsha', 'Sharad']
};

// Define an object to store combination pairs with temperature and timer values
const combinations = [];

// Define fixed temperature and timer values
const fixedTemperature = 40; // in degrees Celsius
const fixedTimer = 10 * 60; // 10 minutes in seconds

// Generate combinations
for (let prakriti of subBlocks['Prakriti']) {
  for (let vyadi of subBlocks['Vyadi']) {
    for (let desh of subBlocks['Desh']) {
      for (let rutu of subBlocks['Rutu']) {
         const combination = {
          'Prakriti': prakriti,
          'Vyadi': vyadi,
          'Desh': desh,
          'Rutu': rutu,
          'Temperature': getRandomTemperature(),
          'Timer': getRandomTimer()
        };
        combinations.push(combination);
      }
    }
  }
}

// Function to get a random temperature value within a range
function getRandomTemperature() {
  // Example: Generate a random temperature between 35 and 45 degrees Celsius
  return Math.floor(Math.random() * (45 - 35 + 1)) + 35;
}

function getRandomTimer() {
    // Example: Generate a random temperature between 35 and 45 degrees Celsius
    return Math.floor(Math.random() * 6) + 10;
  }


// Print combinations
// console.log(combinations);
//===================================

//combination stops
let combination;
/* changing the timer and temperature value*/ 
function updateDisplay() {
    const prakriti = document.getElementById('prakriti').value;
    const vyadi = document.getElementById('vyadi').value;
    const desh = document.getElementById('desh').value;
    const rutu = document.getElementById('rutu').value;

    // Find the combination with the selected values
     combination = combinations.find((comb) => comb.Prakriti == prakriti && comb.Vyadi == vyadi && comb.Desh == desh && comb.Rutu == rutu);
    // Update the display with temperature and timer values
    if (combination) {
        document.getElementById('temperature').innerText = combination.Temperature + '°C';
        document.getElementById("timercount").innerText = combination.Timer;
        resetTimer(combination.Timer);
     // Log the combination object for debugging
    }
}

// Function to reset the timer
function resetTimer(timerValue) {
    clearInterval(timerInterval);
    timerRunning = false;
    elapsedTime = 0;
    displayTime(timerValue);
}

// Add event listeners to update display when user selects different options
document.getElementById('prakriti').addEventListener('change', updateDisplay);
document.getElementById('vyadi').addEventListener('change', updateDisplay);
document.getElementById('desh').addEventListener('change', updateDisplay);
document.getElementById('rutu').addEventListener('change', updateDisplay);

//Update display initially when the page loads
let displayed = document.getElementById("displayed");
displayed.addEventListener("click",()=>{
    updateDisplay();
     startTimer(combination.Timer);
})


/* ends timer and temperature value*/


/*increment or decrement the timer */
// Function to handle incrementing the temperature value
function incrementTemperature() {
  if (combination) {
      // Check if incrementing by 2 keeps the temperature within the range
      if (combination.Temperature + 2 <= 45) {
          combination.Temperature += 2;
      }
  }
  // Update the display with the new temperature value
  updateDisplay();
}

// Function to handle decrementing the temperature value
function decrementTemperature() {
  if (combination) {
      // Check if decrementing by 2 keeps the temperature within the range
      if (combination.Temperature - 2 >= 35) {
          combination.Temperature -= 2;
      }
  }
  // Update the display with the new temperature value
  updateDisplay();
}

// Add event listeners to the increment and decrement buttons
document.getElementById('increment').addEventListener('click', incrementTemperature);
document.getElementById('decrement').addEventListener('click', decrementTemperature);

/* ends incremtent and decrement*/ 

let dataed =document.getElementById("SendData");
function sending()
{
  TimerDataToPass=combination.Timer;
  TemperatureDataToPass=combination.Temperature;
  console.log(`Timer data to pass = ${TimerDataToPass} -- Temperature data to pass = ${TemperatureDataToPass}`);
}

dataed.addEventListener("click",()=>{
  sending();
})