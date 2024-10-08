  const words = [
    "Hello, World!", "Hola, Mundo!", "Bonjour, monde!", "!مرحبا, بالعالم",
    "你好，世界！", "Привет, мир!", "Hallo, Welt!", "안녕, 세계!", "Ciao, Mondo!",
    "Olá, Mundo!", "こんにちは、世界！", "Hallo, Wereld!", "Hej, världen!",
    "नमस्ते, दुनिया!", "Merhaba, Dünya!", "Cześć, Świecie!", "Hei, Verden!"
  ];

  let index = 0;        // Keeps track of the current word
  let charIndex = 0;    // Keeps track of the current character in the word
  const typingSpeed = 100; // Typing speed in milliseconds
  const pauseBetweenWords = 1000; // Pause before moving to the next word

  // Function to display each character one by one (typing animation)
  function typeWord() {
    const word = words[index];
    if (charIndex < word.length) {
      // Display next character
      document.getElementById("word").innerHTML = word.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWord, typingSpeed); // Type next character after a delay
    } else {
      // After finishing typing the word, wait for a pause and move to the next word
      setTimeout(() => {
        charIndex = 0;  // Reset the character index for the next word
        index = (index + 1) % words.length; // Move to the next word (cyclic)
        typeWord(); // Start typing the next word
      }, pauseBetweenWords);
    }
  }

  // Start the typing animation
  typeWord();
  
  document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById("checkbox");
    const body = document.body;
    const githubIcon = document.getElementById('github-icon');
    const resumeIcon = document.getElementById('resume-icon');
  
    // Apply saved theme from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        checkbox.checked = true;  // Keep the toggle switch in dark mode position
    }
  
    // Toggle dark mode when the checkbox changes
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
  
    function enableDarkMode() {
        body.classList.add('dark-mode');
        githubIcon.style.color = "white";  // Change GitHub icon color to white
        resumeIcon.style.color = "white";  // Change resume icon color to white
        localStorage.setItem('darkMode', 'enabled');  // Save dark mode state
    }
  
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        githubIcon.style.color = "black";  // Change GitHub icon color to black
        resumeIcon.style.color = "black";  // Change resume icon color to black
        localStorage.setItem('darkMode', null);  // Clear dark mode state
    }
  });
