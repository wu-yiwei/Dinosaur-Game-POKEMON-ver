document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

let isDoubleJumpAvailable = false;
let isJumping = false;
let isDoubleJumping = false;

function jump() {
    let dino = document.getElementById('dino');
    if (!isJumping) {
        isJumping = true;
        dino.classList.add('jump');
        setTimeout(function() {
            dino.classList.remove('jump');
            isJumping = false;
            isDoubleJumping = false; // 重置雙跳
        }, 700); // 與CSS中的跳躍動畫時間保持一致
    } else if (isDoubleJumpAvailable && !isDoubleJumping) {
        isDoubleJumping = true;
        dino.classList.add('double-jump');
        setTimeout(function() {
            dino.classList.remove('double-jump');
        }, 700); // 與CSS中的跳躍動畫時間保持一致
    }
}

let score = 0;
let highScore = 0;

function updateScore() {
    score++;
    document.getElementById('score').innerText = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        document.getElementById('high-score').innerText = `High Score: ${highScore}`;
    }
}

function resetScore() {
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
}

function resetGame() {
    resetScore();
    isDoubleJumpAvailable = false;
    isJumping = false;
    isDoubleJumping = false;
    let item = document.getElementById('item');
    item.style.display = 'none';
    item.style.animation = 'none'; // 停止道具動畫
    void item.offsetWidth; // 觸發重繪
    item.style.animation = ''; // 重新啟動動畫
}

let isAlive = setInterval(function() {
    let dino = document.getElementById('dino');
    let cactus = document.getElementById('cactus');
    let item = document.getElementById('item');

    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();

    // 更精確的碰撞檢測
    if (
        dinoRect.x < cactusRect.x + cactusRect.width &&
        dinoRect.x + dinoRect.width > cactusRect.x &&
        dinoRect.y < cactusRect.y + cactusRect.height &&
        dinoRect.height + dinoRect.y > cactusRect.y
    ) {
        alert('Game Over!');
        resetGame();
    }

    // 檢測與道具的碰撞
    if (
        item.style.display === 'block' &&
        dinoRect.x < itemRect.x + itemRect.width &&
        dinoRect.x + dinoRect.width > itemRect.x &&
        dinoRect.y < itemRect.y + itemRect.height &&
        dinoRect.height + dinoRect.y > itemRect.y
    ) {
        item.style.display = 'none';
        isDoubleJumpAvailable = true; // 獲得二段跳能力
    }

}, 100);

setInterval(function() {
    updateScore();
}, 1000);

// 隨機出現道具
setInterval(function() {
    let item = document.getElementById('item');
    if (Math.random() < 0.3) { // 30%的概率出現道具
        item.style.display = 'block';
        item.style.animation = 'moveItem 5s linear';
        item.style.right = '0px'; // 重置位置
    }
}, 5000);
