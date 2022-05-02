class Game {
    constructor() {
        const wrapper = document.createElement('div');
        const dyno = new Dyno(wrapper);
    }
}

class Dyno {
    constructor(parent) {
        const wrapper = document.createElement('div');
        wrapper.classname = 'dyno';
        parent.append(wrapper);
    }
}

class Obstacle {
    constructor(parent) {
        const wrapper = document.createElement('div');
        wrapper.classname = 'obstacle';
        parent.append(wrapper);
    }
}