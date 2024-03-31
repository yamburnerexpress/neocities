let playerChar;
let enemyChar;

addListeners();
initGame();

function initGame() {
    playerChar = player;
    enemyChar = enemy;
	showCharacters();
}

function showCharacters() {
    document.getElementById('chickenimg').src = playerChar.img;
    document.getElementById('bigdogimg').src = enemyChar.img;

	// This animates the health bar when attacked
	var percentage = playerChar.health / playerChar.maxhealth;
    if (percentage <= 0) {percentage = 0}
    restoreHealth(percentage);
	document.getElementById('player-hp-bar').style.width = ((161 * percentage) + "px");
	percentage = enemyChar.health / enemyChar.maxhealth;
    if (percentage <= 0) {percentage = 0}
	document.getElementById('enemy-hp-bar').style.width = ((161 * percentage) + "px");
}

function typewriterLog(txt) {
    const textArray = txt.toString().split('');
    document.getElementById('text-log').innerHTML = '';
    textArray.forEach((letter, i) =>
        setTimeout(() => (document.getElementById('text-log').innerHTML += letter), 30 * i)
    );
}

function displayAction(char, action) {
    // document.getElementById('text-log').innerHTML = `${char} used ${action}!`;
    typewriterLog(`${char} used ${action}!`);
}

function clearConsole() {
    document.getElementById('text-log').innerHTML = '';
}

function checkFaint(char) {
    enemyChar.faint(enemyChar);
    if (!char.alive) {
        clearConsole();
        return true;
    }
    else {
        return false;
    }
}

function restoreHealth(playerPercentage) {
    if (playerPercentage <= .4) {
        removeListeners();
        clearConsole();
        setTimeout(function () {typewriterLog('CHICKEN is looking a little spooked!');}, 1000);
        setTimeout(function () {
            document.getElementById('chickenimg').style.animation = 'bounce 250ms 2';
            typewriterLog('CHICKEN uses TREAT to restore 40 HP!');
            playerChar.health += 40;
            let chickenPerc = playerChar.health / playerChar.maxhealth;
            document.getElementById('player-hp-bar').style.width = ((161 * chickenPerc) + "px");
        }, 3100);
        setTimeout(function () {
            clearConsole();
            addListeners();
        }, 5500);
    }
}

function growlButton() {
    removeListeners();
    document.getElementById('chickenimg').style.animation = 'bounce 250ms 2';
    displayAction(playerChar.name, 'GROWL');
    setTimeout(function() {
        playerChar.attack(enemyChar, playerChar.moves[0]);
    }, 1000);
    if (playerChar.moves[0].target != 'self') {
        document.getElementById('bigdogimg').style.animation = '';
        setTimeout(function () {
            document.getElementById('bigdogimg').style.animation = 'blink 0.15s 5';
            showCharacters();
        }, 1000);
        setTimeout(function () {
            clearConsole();
        }, 2000);
    }
    setTimeout(function () {
        if (checkFaint(enemyChar)) {
            typewriterLog(`The other dog scampers off!`);
            document.getElementById('bigdogimg').style.animation = 'move 0.5s 1';
            setTimeout(function () {document.getElementById('bigdogimg').style.opacity = 0;}, 400);
            setTimeout(function () {
                document.getElementById('continue').style.display = 'block';
                return;
            }, 1000);
        }
        else {
            enemyAttack();
            addListeners();
        }
    }, 3000);
}

function barkButton() {
    removeListeners();
    document.getElementById('chickenimg').style.animation = 'bounce 250ms 2';
    displayAction(playerChar.name, 'BARK');
    setTimeout(function() {
        playerChar.attack(enemyChar, playerChar.moves[1]);
    }, 1000);
    if (playerChar.moves[1].target != 'self') {
        document.getElementById('bigdogimg').style.animation = '';
        setTimeout(function () {
            document.getElementById('bigdogimg').style.animation = 'blink 0.15s 5';
            showCharacters();
        }, 1000);
        setTimeout(function () {
            clearConsole();
        }, 2000);
    }
    setTimeout(function () {
        if (checkFaint(enemyChar)) {
            typewriterLog(`The other dog scampers off!`);
            document.getElementById('bigdogimg').style.animation = 'move 0.5s 1';
            setTimeout(function () {document.getElementById('bigdogimg').style.opacity = 0;}, 400);
            setTimeout(function () {
                document.getElementById('continue').style.display = 'block';
                return;
            }, 1000);
        }
        else {
            enemyAttack();
            addListeners();
        }
    }, 3000);
}

function sniffButton() {
    document.getElementById('chickenimg').src = './assets/img/chickenQuestion.gif';
    removeListeners();
    displayAction(playerChar.name, 'SNIFF');
    setTimeout(function() {
        typewriterLog(`This dog is big but nervous, and you think he might need to poop`);
    }, 2000);
    setTimeout(function () {
        clearConsole();
        showCharacters()
        addListeners();
    }, 6000);
}

function playCoolButton() {
    removeListeners();
    document.getElementById('chickenimg').style.animation = 'bounce 250ms 2';
    displayAction(playerChar.name, 'PLAY IT COOL');
    setTimeout(function() {
        playerChar.attack(enemyChar, playerChar.moves[2]);
        typewriterLog(`CHICKEN is being nonchalant! BIG DOG is losing his cool!`);
    }, 1000);
    if (playerChar.moves[0].target != 'self') {
        document.getElementById('bigdogimg').style.animation = '';
        setTimeout(function () {
            document.getElementById('bigdogimg').style.animation = 'blink 0.15s 5';
            showCharacters();
        }, 3000);
        setTimeout(function () {
            clearConsole();
        }, 4000);
    }
    setTimeout(function () {
        if (checkFaint(enemyChar)) {
            typewriterLog(`The other dog scampers off!`);
            document.getElementById('bigdogimg').style.animation = 'move 0.5s 1';
            setTimeout(function () {document.getElementById('bigdogimg').style.opacity = 0;}, 400);
            setTimeout(function () {
                return;
            }, 1000);
        }
        else {
            enemyAttack();
            addListeners();
        }
    }, 5000);
}

function enemyAttack() {
    removeListeners();
    var attackMove = Math.floor(Math.random() * enemyChar.moves.length);
    document.getElementById('bigdogimg').style.animation = 'bounce 280ms 2';
    displayAction(enemyChar.name, enemyChar.moves[attackMove].name);
    setTimeout(function() {
        enemyChar.attack(playerChar, enemyChar.moves[attackMove]);
    }, 1000);
    if (enemyChar.moves[0].target != 'self') {
		document.getElementById('chickenimg').style.animation = '';
		setTimeout(function() {
			document.getElementById('chickenimg').style.animation = 'blink 0.15s 5';
            showCharacters();
        }, 1000);
        setTimeout(function () {
            clearConsole();
        }, 2000);
	}
    playerChar.faint(playerChar);
}

function addListeners() {
    document.getElementById('growl').addEventListener('click', growlButton);
    document.getElementById('bark').addEventListener('click', barkButton);
    document.getElementById('sniff').addEventListener('click', sniffButton);
    document.getElementById('playCool').addEventListener('click', playCoolButton);
}

function removeListeners() {
    document.getElementById('growl').removeEventListener('click', growlButton);
    document.getElementById('bark').removeEventListener('click', barkButton);
    document.getElementById('sniff').removeEventListener('click', sniffButton);
    document.getElementById('playCool').removeEventListener('click', playCoolButton);
}