document.addEventListener('DOMContentLoaded', function() {
    const koiContainer = document.getElementById('koi');
    const follower = document.getElementById('follower'); // Ensure this element exists
    const counterElement = document.getElementById('visitorCounter');
    const modal = document.getElementById("paymentOptions");
    const btn = document.getElementById("donateButton");
    let lastX, lastY; // Variables to store the last mouse position

    // Create dynamic koi GIFs with direction and color
    function createDynamicGifElement(color, direction, container) {
        const gif = document.createElement('img');
        gif.src = `${color}${direction}.gif`;
        gif.className = 'koi';
        const size = Math.random() * (180 - 80) + 80;
        gif.style.width = `${size}px`;
        gif.style.position = 'absolute';

        // Set initial random position
        resetPositionAndAnimation(gif, direction);
        // Re-apply animation each time it ends for continuous movement
        gif.addEventListener('animationend', () => resetPositionAndAnimation(gif, direction));
        container.appendChild(gif);
    }

    // Reset position and reapply animation for continuous looping
    function resetPositionAndAnimation(gif, direction) {
        gif.style.top = `${Math.random() * (window.innerHeight - 20)}px`;
        gif.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
        applyAnimation(gif, direction);
    }

    // Apply animation based on direction
    function applyAnimation(gif, direction) {
        switch (direction) {
            case 'LR': gif.style.animation = 'driftRight 20s infinite linear'; break;
            case 'RL': gif.style.animation = 'driftLeft 20s infinite linear'; break;
            case 'UD': gif.style.animation = 'driftDown 20s infinite linear'; break;
            case 'DU': gif.style.animation = 'driftUp 20s infinite linear'; break;
            case 'BLTR': gif.style.animation = 'driftBLTR 20s infinite linear'; break;
            case 'BRTL': gif.style.animation = 'driftBRTL 20s infinite linear'; break;
            case 'TLBR': gif.style.animation = 'driftTLBR 20s infinite linear'; break;
            case 'TRBL': gif.style.animation = 'driftTRBL 20s infinite linear'; break;
        }
    }

    // Initialize koi elements
    const colors = ['Gold', 'Blue', 'Red', 'Green', 'Purple', 'Orange', 'Pink', 'Grey'];
    const directions = ['LR', 'RL', 'UD', 'DU', 'BLTR', 'BRTL', 'TLBR', 'TRBL'];
    for (let i = 0; i < 100; i++) {
        const color = getRandomElement(colors);
        const direction = getRandomElement(directions);
        createDynamicGifElement(color, direction, koiContainer);
    }

    // Mouse move event to update the position of the follower GIF
    document.addEventListener('mousemove', function(event) {
        if (follower) { // Check if follower is not null
            follower.style.left = `${event.pageX - (follower.offsetWidth / 2)}px`;
            follower.style.top = `${event.pageY - (follower.offsetHeight / 2)}px`;
        }
    });

    // Define the start date and calculate the difference in days
    const startDate = new Date('2024-01-01');
    const currentDate = new Date();
    const differenceInTime = currentDate - startDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    let visitors = 1000 + differenceInDays * (Math.floor(Math.random() * 100) + 1);
    counterElement.innerText = `Visitors: ${Math.round(visitors)}`;

    function incrementVisitorCount() {
        visitors++;
        counterElement.innerText = `Visitors: ${Math.round(visitors)}`;
        const nextTimeout = Math.floor(Math.random() * (900000 - 1000) + 1000);
        setTimeout(incrementVisitorCount, nextTimeout);
    }

    incrementVisitorCount();

    btn.onclick = function() {
        modal.style.display = "block";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    function closeModal() {
        modal.style.display = "none";
    }
});

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
