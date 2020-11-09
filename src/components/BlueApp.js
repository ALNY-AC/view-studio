import Random from '../lib/tool/Random'
import BlueNode from './BlueNode';
import BluePic from './BluePic';

export default class BlueApp {
    static BlueNode = BlueNode;
    static BluePic = BluePic;
    id = new Random().getRandom();
    nodes = [];
    two = null;
    mouse = {
        x: 0,
        y: 0,
        down: false,
    }

    downNode = null;
    moveNode = null;
    $el = null;
    pics = [];

    init(scene) {
        this.$el = scene;
        this.initTwo();
        this.initEvent();
        this.buildScene();
    }
    update() {
        this.nodes.forEach(node => {
            node.update();
        });
    }
    render() {
        this.nodes.forEach(node => {
            node.render();
        });
    }

    initTwo() {
        let params = { fullscreen: true };
        this.two = new Two(params).appendTo(this.$el);
    }
    /**
     * 
     * @param {BlueNode} blueNode 要添加的node
     */
    addNodes(blueNode) {
        blueNode.app = this;
        let rect = this.two.makeRoundedRectangle(
            blueNode.x,
            blueNode.y,
            blueNode.width,
            blueNode.height,
            10
        );

        this.two.update();



        // rect._renderer.elem.addEventListener('touchstart', (e) => {
        //     this.downNode = blueNode;
        //     blueNode.mousedown(e);
        // });
        // rect._renderer.elem.addEventListener('touchmove', (e) => {
        //     this.moveNode = blueNode;
        //     blueNode.mousemove(e);
        // });
        // rect._renderer.elem.addEventListener('touchend', (e) => {
        //     this.downNode = null;
        //     blueNode.mouseup(e);
        // });



        rect._renderer.elem.addEventListener('mousedown', (e) => {
            this.downNode = blueNode;
            blueNode.mousedown(e);
        });

        rect._renderer.elem.addEventListener('mouseup', (e) => {
            this.downNode = null;
            blueNode.mouseup(e);
        });


        rect._renderer.elem.addEventListener('mousemove', (e) => {
            this.moveNode = blueNode;
            blueNode.mousemove(e);
        });


        rect._renderer.elem.addEventListener('mouseover', (e) => {
            this.moveNode = blueNode;
            blueNode.mouseover(e);
        });


        rect._renderer.elem.addEventListener('mouseout', (e) => {
            this.moveNode = null;
            this.downNode = null;
            blueNode.mouseout(e);
        });


        blueNode.$el = rect;

        this.nodes.push(blueNode);
        blueNode.start();

    }
    initEvent() {

        // window.addEventListener('touchmove', e => {
        //     console.warn(e);
        //     this.mouse.x = e.touches[0].clientX;
        //     this.mouse.y = e.touches[0].clientY;
        // });

        // window.addEventListener('touchstart', e => {
        //     console.warn(e);
        //     this.mouse.x = e.touches[0].clientX;
        //     this.mouse.y = e.touches[0].clientY;
        //     this.mouse.down = true;
        // });

        // window.addEventListener('touchend', e => {
        //     this.mouse.down = false;
        // });

        window.addEventListener('mousemove', e => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        window.addEventListener('mousedown', e => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
            this.mouse.down = true;
        });
        window.addEventListener('mouseup', e => {
            this.mouse.down = false;
        });
    }
    buildScene() {
        let scene = this.$el

        let w = scene.offsetWidth;
        let h = scene.offsetHeight;

        for (let i = 0; i < w; i++) {
            if ((i * 30) < w) {
                let line = this.two.makeLine(i * 30, 0, i * 30, h);
                line.stroke = 'rgb(77,77,77)';
                line.linewidth = 1;
            } else {
                break;
            }
        }

        for (let i = 0; i < h; i++) {
            if ((i * 30) < h) {
                let line = this.two.makeLine(0, i * 30, w, i * 30);
                line.stroke = 'rgb(77,77,77)';
                line.linewidth = 1;
            } else {
                break;
            }
        }


    }
}