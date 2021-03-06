import Random from '../lib/tool/Random'
import BluePic from './BluePic';

export default class BlueNode {


    id = new Random().getRandom();
    app = null;
    $el = null;
    x = 0;
    y = 0;
    width = 150;
    height = 100;
    fillColor = 'rgba(255, 255,255, 0.75)';
    strokeColor = "rgba(0, 0, 0,0.2)";
    linewidth = 3;
    down = false;

    inputPics = [];
    outputPics = [];

    start() { }
    /**
     * 
     * @param {BluePic} pic 
     */
    addPic(pic) {
        pic.node = this;
        pic.app = this.app;

        if (pic.type == BluePic.PIC_LEFT) {
            this.inputPics.push(pic);
        }
        if (pic.type == BluePic.PIC_RIGHT) {
            this.outputPics.push(pic);
        }
        pic.start();
        return this;
    }
    update() {
        this.inputPics.forEach((pic, i) => {
            pic.update();
            let originY = (this.y - this.height / 2) + 10;
            pic.y = originY + i * 30;
            pic.x = this.x - this.width / 2 + pic.width / 2;

        });
        this.outputPics.forEach((pic, i) => {
            pic.update();
            let originY = (this.y - this.height / 2) + 10;
            pic.y = originY + i * 30;
            pic.x = this.x + this.width / 2 - + pic.width / 2;
        });
        //===
        if (this.app.mouse.down) {
            if (this.down) {
                this.x = this.app.mouse.x + this.mw;
                this.y = this.app.mouse.y + this.mh;
            }
        } else {
            this.mw = this.x - this.app.mouse.x;
            this.mh = this.y - this.app.mouse.y;
        }
    }

    render() {

        this.inputPics.forEach(pic => { pic.render() });
        this.outputPics.forEach(pic => { pic.render() });
        //===
        this.$el.position.x = this.x;
        this.$el.position.y = this.y;
        this.$el.fill = this.fillColor
        this.$el.stroke = this.strokeColor;
        this.$el.linewidth = this.linewidth;
    }
    /**
     * 鼠标移动
     * @param {MouseEvent} e 
     */
    mousemove(e) {
    }
    /**
     * 鼠标进入
     * @param {MouseEvent} e 
     */
    mouseover(e) {
        this.strokeColor = "rgb(240, 173, 78)";
    }
    /**
     * 鼠标离开
     * @param {MouseEvent} e 
     */
    mouseout(e) {
        this.strokeColor = "rgba(0, 0, 0,0.2)";

    }
    /**
     * 鼠标按下
     * @param {MouseEvent} e 
     */
    mousedown(e) {
        this.down = true;
    }
    /**
     * 鼠标抬起
     * @param {MouseEvent} e 
     */
    mouseup(e) {
        this.down = false;
    }
}