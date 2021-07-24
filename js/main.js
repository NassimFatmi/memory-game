let counter, seconds;

document.querySelector('.control-buttons span').onclick = function() {
    let yourName = prompt('Enter your name');
    yourName == null || yourName.trim() == '' ?
        document.querySelector('.name span').innerHTML = 'Unknown' :
        document.querySelector('.name span').innerHTML = yourName;
    reset();
    document.querySelector('.control-buttons').style.display = 'none';
    seconds = 90;
    counter = setInterval(countTime, 1000);

}

let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-block');

let blocks = Array.from(document.querySelectorAll('.memory-game-block .game-block'));

let orderRange = [...Array(blocks.length).keys()];


function shuffle(array) {
    let current = array.length,
        temp, random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;

}

function flipBack(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    // Get flipped blocks
    let flippedBlocks = blocks.filter(block => block.classList.contains('is-flipped'));
    if (flippedBlocks.length === 2) {
        stopClicking();
        matchBlocks(flippedBlocks[0], flippedBlocks[1]);
    }
}

function stopClicking() {
    // Add class no clicking to main container
    blocksContainer.classList.add('no-clicking');
    setTimeout(function() {
        blocksContainer.classList.remove('no-clicking');

        // flippedBlocks.forEach(block => block.classList.remove('is-flipped'));
    }, duration);
}

function matchBlocks(blockOne, blockTwo) {
    let tries = document.querySelector('.tries span');
    if (blockOne.dataset.technology === blockTwo.dataset.technology) {

        blockOne.classList.remove('is-flipped');
        blockTwo.classList.remove('is-flipped');

        blockOne.classList.add('has-matched', 'no-clicking');
        blockTwo.classList.add('has-matched', 'no-clicking');

        document.getElementById('success').play();

    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {
            blockOne.classList.remove('is-flipped');
            blockTwo.classList.remove('is-flipped');
        }, duration);
        document.getElementById('fail').play();
    }
}

// timer
// bg music

function countTime() {
    if (seconds > 0) {
        seconds--;
        setTimeClock();
    } else {
        document.querySelector('.control-buttons span').innerHTML = 'Restart';
        clearInterval(counter);
        document.querySelector('.timer').innerHTML = 'Time end..';
        document.querySelector('.control-buttons').style.display = 'block';
    }
}

function setTimeClock() {
    let minutes = Math.floor(seconds / 60);
    let remSeconds = seconds % 60;
    if (remSeconds < 10) {
        remSeconds = '0' + remSeconds;
    }

    document.querySelector('.timer').innerHTML = '0' + minutes + ':' + remSeconds;
}

function reset() {
    shuffle(orderRange);

    blocks.forEach((block, index) => {
        block.classList.remove('has-matched', 'is-flipped', 'no-clicking');
        block.style.order = orderRange[index];
        block.onclick = function() {
            flipBack(block);
        };
    });
}