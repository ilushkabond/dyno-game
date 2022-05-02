class Game {
    constructor(parent) {
        const wrapper = document.createElement('div');
        wrapper.tabIndex = 1;
        wrapper.onkeydown = (event) => {
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
                if (!this.lastTime) {
                    this.lastTime = timeStamp;
                }
        
                const delta = this.lastTime - timeStamp;
                this.lastTime = timeStamp;
                obstacle1.setPosition(obstacle1.position + delta);
                if (obstacle1.position < -100) {
                    obstacle1.setPosition(700);
                }
                dyno.tick(timeStamp);
                const isCollided = dyno.collision(obstacle1.getRect());
                if (isCollided) {
                    console.log(isCollided);
                }
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
            this.setPosition(this.position - 0.1 * delta);
        } else {
            this.setPosition(200);
        }
    }

    jump() {
        this.setPosition(0);
    }

    collision(rect) {
        // console.log(rect);
        return inBox({ x: 50, y: this.position + 50 }, rect);
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

    getRect() {
        return { left: this.position, top: 200, width: 100, height: 100 }
    }
}

new Game(document.body);

const areRectanglesOverlap = (rect1, rect2) => {
    let [left1, top1, right1, bottom1] = [rect1[0], rect1[1], rect1[2], rect1[3]],
        [left2, top2, right2, bottom2] = [rect2[0], rect2[1], rect2[2], rect2[3]];
    // The first rectangle is under the second or vice versa
    if (top1 < top2 || left1 < left2 || right1 < right2 || bottom1 < bottom2) {
      return false;
    }
    // Rectangles overlap
    return true;
  }

function inBox(point, rect) {
    return point.x > rect.left
    && point.x < rect.left + rect.width
    && point.y > rect.top
    && point.y < rect.top + rect.height;
}

console.log(
    inBox({ x: 50, y: 50 }, { left: 0, top: 0, width: 100, height: 100 } )
)

console.log(
    inBox({ x: 150, y: 50 }, { left: 0, top: 0, width: 100, height: 100 } )
)