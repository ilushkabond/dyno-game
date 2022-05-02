class Game {
    constructor(parent) {
        const wrapper = document.createElement('div');
        wrapper.tabIndex = 1;
        wrapper.onkeydown = (event) => {
            console.log(event);
            if (event.code === 'Space') {
                dyno.jump();
            }
        }
        wrapper.className = 'game';
        const dyno = new Dyno(wrapper);
        parent.append(wrapper);
        const obstacle1 = new Obstacle(wrapper);
        const render = (time) => {
            requestAnimationFrame(timeStamp => {
                obstacle1.setPosition(obstacle1.position - timeStamp / 10000);
                dyno.tick(timeStamp);
                render(timeStamp);
            });
        }
        render(Date.now());
    }
}

class Dyno {
    constructor(parent) {
        const wrapper = document.createElement('div');
        wrapper.className = 'dyno';
        parent.append(wrapper);
        this.element = wrapper;
        this.position = 200;
        this.element.style.top = this.position + 'px';
    }

    setPosition(position) {
        this.position = position;
        this.element.style.top = this.position + 'px';
    }

    tick(time) {
        if (!this.lastTime) {
            this.lastTime = time;
        }

        const delta = this.lastTime - time;
        this.lastTime = time;
        if (this.position < 200) {
            this.setPosition(this.position - 1 * delta);
        } else {
            this.setPosition(200);
        }
    }

    jump() {
        this.setPosition(0);
    }
}

class Obstacle {
    constructor(parent) {
        const wrapper = document.createElement('div');
        wrapper.className = 'obstacle';
        parent.append(wrapper);
        this.position = parent.clientWidth;
        this.element = wrapper;
        this.element.style.top = '200px';
    }
    
    setPosition(position) {
        this.position = position;
        this.element.style.left = this.position + 'px';
    }
}

new Game(document.body);