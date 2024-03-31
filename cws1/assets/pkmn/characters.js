class Character {
    constructor(name, level, owner, maxhealth, moves, img, elem) {
        this.name = name;
        this.level = level;
        this.owner = owner;
        this.health = maxhealth;
        this.maxhealth = maxhealth;
        this.moves = moves;
        this.img = img;
        this.elem = elem;
        this.alive = true;
    }

    decrementHealth(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            if (this.owner == 'player') {
                player = this.faint(playerChar)
            }
            if (this.owner == 'enemy') {
                enemy = this.faint(enemyChar)
            }
        }
        if (this.health > this.maxhealth) {
            this.health = this.maxhealth;
        }
    }
    attack(target, move) {
        if (move.target == 'self') {
            this.decrementHealth(Math.round(this.maxhealth * move.damage));
        } else {
            target.decrementHealth(move.damage);
        }
    }
    faint(currentChar) {
        if (this.health <= 0) {
            console.log('fainted');
            this.alive = false;
            return currentChar
        }
    }
};

let moves = {
    'growl': {
        name: 'GROWL',
        damage: 20,
        target: 'enemy'
    },
    'bark': {
        name: 'BARK',
        damage: 25,
        target: 'enemy'
    },
    'play it cool': {
        name: 'PLAY IT COOL',
        damage: 35,
        target: 'enemy'
    }
}

let player = new Character(
    'CHICKEN',
    28,
    'player',
    100,
    [moves['growl'], moves['bark'], moves['play it cool']],
    './assets/img/chickenBack.jpg',
    'chickenimg'
);
let enemy = new Character(
    'BIG DOG',
    28,
    'enemy',
    100,
    [moves['growl'], moves['bark']],
    './assets/img/bigDogFront.jpg',
    'bigdogimg'
);

