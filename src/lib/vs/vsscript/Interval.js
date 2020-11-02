import VSComponent from '../core/VSComponent';
import vs from '../vs'


export default class Interval extends VSComponent {
    interval = null;
    name = 'Interval';
    count = 0;
    properties = {
        time: {
            default: 5000,
            type: Number,
            set() {
                this.restart();
            }
        }
    }

    start() {
        this.restart();
    }

    stop() {
        clearInterval(this.interval);
        this.count = 0;
    }
    restart() {
        this.stop();
        this.interval = setInterval(() => {
            this.node.components.forEach(el => {
                if (typeof el['onInterval'] == 'function') {
                    el['onInterval']();
                }
            });
            this.count++;
        }, this.time);
    }
    update() {
    }
}

vs.Class(Interval)