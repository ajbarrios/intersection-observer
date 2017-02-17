const IntersectionDemo = (() => {
    'use strict';
    
    let circlesCounter = 0;
    let intervalId;

    const MAX_CIRCLE_COUNTER = Infinity;

    const intersectionObserverCallback = entries => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio <= 0) {
                entry.target.classList.add('dirty');
            }
        });
    }

    const options = {
        root: document.querySelector('.intersection-scrollable'),
        rootMargin: '0px',
        threshold: [0, 0.5]
    };

    const intersectionObservers = [];

    const drawingAreaElement = document.getElementById('drawing-area');

    const renderCircle = () => {
        let circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.position = 'relative';
        circle.style.top = `${Math.floor(Math.random() * 100)}%`;
        circle.style.left = `${Math.floor(Math.random() * 100)}%`;
        circle.appendChild(document.createTextNode(circlesCounter++));
        circle.addEventListener('click', (event) => {
            event.target.classList.remove('dirty');
        });
        return circle; 
    };

    const start = () => {
        intervalId = setInterval(() => {
            if (circlesCounter < MAX_CIRCLE_COUNTER) {
                let newCircle = renderCircle();
                drawingAreaElement.appendChild(newCircle);

                let io = new IntersectionObserver(intersectionObserverCallback, options);
                io.observe(newCircle);
                intersectionObservers.push(io);
            } else {
                clearInterval(intervalId);
                alert('FINISH!');
            }
        }, 1000);
    };
    
    const stop = () => {
        clearInterval(intervalId);
        document.querySelectorAll('.circle').forEach((circle) => {
            circle.parentNode.removeChild(circle);
        });
        intersectionObservers.splice(0);
    };

    return {
        start: start,
        stop: stop
    };

})();
