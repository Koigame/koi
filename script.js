document.addEventListener('DOMContentLoaded', function() {
    const koiContainer = document.getElementById('koi');
    const abcContainer = document.getElementById('abc');
    const symbolsContainer = document.getElementById('symbols');

    // For dynamic koi gifs with direction and color
    function createDynamicGifElement(color, direction, container) {
        const gif = document.createElement('img');
        gif.src = `${color}${direction}.gif`; // Assumes naming convention like GoldLR.gif
        gif.className = 'koi';
        const size = Math.random() * (160 - 80) + 80;
        gif.style.width = `${size}px`;
        gif.style.position = 'absolute';
        gif.style.animationDuration = `${Math.random() * (60 - 20) + 20}s`;
        gif.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        gif.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
        // Define animation direction based on the gif direction
        switch (direction) {
            case 'LR':
                gif.style.animationName = 'driftRight';
                break;
            case 'RL':
                gif.style.animationName = 'driftLeft';
                break;
            // Add cases for other directions
        }
        container.appendChild(gif);
    }

    const colors = ['Gold', 'Blue', 'Red', 'Green', 'Purple', 'Orange', 'Pink', 'Grey'];
    const directions = ['LR', 'RL', 'UD', 'DU', 'BLTR', 'BRTL', 'TLBR', 'TRBL'];

    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    for (let i = 0; i < 100; i++) {
        const color = getRandomElement(colors);
        const direction = getRandomElement(directions);
        createDynamicGifElement(color, direction, koiContainer);
    }

    // For creating abc and symbol gifs
    function createStaticGifElement(src, className, container) {
        const gif = document.createElement('img');
        gif.src = src;
        gif.className = className;
        const size = Math.random() * (160 - 80) + 80;
        gif.style.width = `${className === 'abc' ? size : size / 2}px`;
        gif.style.animationDuration = `${Math.random() * (60 - 20) + 20}s`;
        gif.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        container.appendChild(gif);
    }

    // Adjusted to demonstrate creating 'abc' gifs
    for (let i = 0; i < 20; i++) { 
        createStaticGifElement('abc.gif', 'abc', abcContainer);
    }
    
    // Create coin and Eth symbols
    for (let i = 0; i < 40; i++) {
        createStaticGifElement('coin.gif', 'symbol', symbolsContainer);
    }
    for (let i = 0; i < 30; i++) {
        createStaticGifElement('Eth.gif', 'symbol', symbolsContainer);
    }

document.addEventListener('mousemove', function(event) {
    if (typeof lastX === 'undefined' || typeof lastY === 'undefined') {
        lastX = event.clientX;
        lastY = event.clientY;
        return;
    }

    const diffX = event.clientX - lastX;
    const diffY = event.clientY - lastY;
    const bodyElement = document.querySelector('body');

    if (Math.abs(diffX) > Math.abs(diffY)) {
        bodyElement.style.cursor = `url(${diffX > 0 ? 'boat.png' : 'boat.png'}), auto`;
        follower.src = diffX > 0 ? 'boat3.gif' : 'boat1.gif';
    } else {
        bodyElement.style.cursor = `url(${diffY > 0 ? 'boat.png' : 'boat.png'}), auto`;
        follower.src = diffY > 0 ? 'boat4.gif' : 'boat2.gif';
    }

    follower.style.display = 'block';
    const halfWidth = 64; // Half the width of the follower GIF
    const halfHeight = 64; // Half the height of the follower GIF
    follower.style.left = `${event.pageX - halfWidth}px`;
    follower.style.top = `${event.pageY - halfHeight}px`;

    lastX = event.clientX;
    lastY = event.clientY;
});

document.addEventListener('mouseleave', function() {
    document.querySelector('body').style.cursor = 'auto';
    follower.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.getElementById('visitorCounter');
    
    // Define the start date
    const startDate = new Date('2024-01-01');
    const currentDate = new Date();
    
    // Calculate the difference in days
    const differenceInTime = currentDate - startDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
    // Generate a random value between 1 and 100 for each day
    const randomIncrement = differenceInDays * (Math.floor(Math.random() * 100) + 1);
    
    // Starting number (could be adjusted based on your preference)
    let visitors = 1000 + randomIncrement;
    
    // Display the initial visitor count
    counterElement.innerText = `Visitors: ${Math.round(visitors)}`;

    // Function to increment the visitor count at random intervals
    function incrementVisitorCount() {
        visitors++;
        counterElement.innerText = `Visitors: ${Math.round(visitors)}`;

        // Calculate the next timeout duration: between 1 second (1000ms) and 15 minutes (900000ms)
        const nextTimeout = Math.floor(Math.random() * (900000 - 1000 + 1)) + 1000;

        // Set the timeout for the next increment
        setTimeout(incrementVisitorCount, nextTimeout);
    }

    // Start the first increment after a random interval
    incrementVisitorCount();
});


// Modal functionality
var modal = document.getElementById("paymentOptions");
var btn = document.getElementById("donateButton");

btn.onclick = function() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

createabcAndSymbols();
