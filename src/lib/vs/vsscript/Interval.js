import vs from '../vs'


export default class Interval extends vs.VSComponent {
    interval = null;
    _time = 1000;
    name = 'Interval';
    count = 0;
    properties = {
        time: {
            default: 5000,
            type: Number
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
        }, this._time);
    }
    update() {
        if (this._time != this.time) {
            this._time = this.time;
            this.restart();
        }
    }
}

vs.Class(Interval)