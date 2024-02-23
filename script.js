document.addEventListener('DOMContentLoaded', function() {
    const koiContainer = document.getElementById('koi');
    const symbolsContainer = document.getElementById('symbols');
    const follower = document.getElementById('follower'); // Ensure this element exists in your HTML
    const counterElement = document.getElementById('visitorCounter');
    const modal = document.getElementById("paymentOptions");
    const btn = document.getElementById("donateButton");
    let lastX, lastY; // Declare variables to store the last mouse position

    // For dynamic koi gifs with direction and color
    function createDynamicGifElement(color, direction, container) {
        const gif = document.createElement('img');
        gif.src = `${color}${direction}.gif`;
        gif.className = 'koi';
        const size = Math.random() * (180 - 80) + 80;
        gif.style.width = `${size}px`;
        gif.style.position = 'absolute';
        gif.style.animationDuration = `${Math.random() * (60 - 20) + 20}s`;
        gif.style.top = `${Math.random() * (window.innerHeight - 20)}px`;
        gif.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
        
        // Define animation direction based on the gif direction
        switch (direction) {
            case 'LR':
                gif.style.animationName = 'driftRight';
                break;
            case 'RL':
                gif.style.animationName = 'driftLeft';
                break;
            case 'UD':
                gif.style.animationName = 'driftDown';
                break;
            case 'DU':
                gif.style.animationName = 'driftUp';
                break;
            case 'BLTR':
                gif.style.animationName = 'driftBLTR';
                break;
            case 'BRTL':
                gif.style.animationName = 'driftBRTL';
                break;
            case 'TLBR':
                gif.style.animationName = 'driftTLBR';
                break;
            case 'TRBL':
                gif.style.animationName = 'driftTRBL';
                break;
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
    
    document.addEventListener('mousemove', function(event) {
        if (typeof lastX === 'undefined' || typeof lastY === 'undefined') {
            lastX = event.clientX;
            lastY = event.clientY;
            return;
        }

        const diffX = event.clientX - lastX;
        const diffY = event.clientY - lastY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            document.body.style.cursor = `url('collector.png'), auto`;
            follower.src = diffX > 0 ? 'Boat3.gif' : 'Boat1.gif';
        } else {
            document.body.style.cursor = `url('collector.png'), auto`;
            follower.src = diffY > 0 ? 'Boat4.gif' : 'Boat2.gif';
        }

        follower.style.display = 'block';
        follower.style.left = `${event.pageX - halfWidth}px`;
        follower.style.top = `${event.pageY - halfHeight}px`;

        lastX = event.clientX;
        lastY = event.clientY;
    });

    document.addEventListener('mouseleave', function() {
        document.body.style.cursor = 'auto';
        follower.style.display = 'none';
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
