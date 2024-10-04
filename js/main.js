  // Array of words to display
  const words = [
    "Hello, World!", "Hola, Mundo!", "Bonjour, monde!", "مرحبا, بالعالم!",
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

  //Function to toggle dark mode on and off
  function generateSVGPath(textWidth) {
    const startX = 2;  // Starting x position
    const startY = 76.26;  // Starting y position for the line
    const pathSegments = [];  // Array to store the path commands
    
    // Add initial move and line commands for the underline
    pathSegments.push(`M${startX},${startY}`);  // Move to starting point
    pathSegments.push(`L${startX + textWidth},${startY}`);  // Line to underline the text
    
    // Add a full circle after the underline
    const circleRadius = 30;  // Radius of the circle
    const circleCenterX = startX + textWidth + circleRadius; // Center of the circle
    const circleCenterY = startY;
  
    // First half of the circle (clockwise)
    pathSegments.push(`M${circleCenterX},${circleCenterY - circleRadius}`); // Move to top of the circle
    pathSegments.push(`A${circleRadius},${circleRadius} 0 1,1 ${circleCenterX},${circleCenterY + circleRadius}`);  // Draw first half of the circle
    
    // Second half of the circle (clockwise)
    pathSegments.push(`A${circleRadius},${circleRadius} 0 1,1 ${circleCenterX},${circleCenterY - circleRadius}`);  // Draw second half of the circle
    
    return pathSegments.join(' ');  // Join the commands into a single path string
  }
  
  // Function to dynamically append the SVG with a generated path
  function appendDynamicSVG(container, textWidth) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("fill", "none");
    svg.setAttribute("viewBox", "0 0 600 100");  // Adjust viewbox size
    svg.setAttribute("xmlns", svgNamespace);
    
    const path = document.createElementNS(svgNamespace, "path");
    const dValue = generateSVGPath(textWidth);  // Dynamically generate the path
    path.setAttribute("d", dValue);
    path.setAttribute("stroke", "#228B22");  // Green color for the line
    path.setAttribute("stroke-width", "3");
    path.setAttribute("fill", "none");
    
    // Get the total length of the path for dynamic stroke-dasharray and stroke-dashoffset
    const totalLength = path.getTotalLength();
    path.setAttribute("stroke-dasharray", totalLength);
    path.setAttribute("stroke-dashoffset", totalLength);
  
    svg.appendChild(path);  // Append the path to the SVG
    
    container.appendChild(svg);  // Append the SVG to the container
  }
  
  // Example usage: Append dynamic SVG for a container with a certain text width
  const container = document.querySelector('.hero__animation-container');
  const textWidth = container.offsetWidth;  // Get the width of the text element
  
  appendDynamicSVG(container, textWidth);  // Append the SVG to the container
