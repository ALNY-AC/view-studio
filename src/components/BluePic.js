import Random from '../lib/tool/Random'
import BlueNode from './BlueNode';

export default class BluePic {
    static PIC_LEFT = 'left';
    static PIC_RIGHT = 'right';


    /**
     * 输入自
     */
    inputTarget = null;

    /**
     * 输出到
     */
    outputTarget = [];


    /**
     * 引脚所在节点
     */
    node = null;
    /**
     * 引脚所在app
     */
    app = null;

    /**
     * 引脚类型，左：输入节点，右：输出节点
     */
    type = null;

    /**
     * 线对象
     */
    path = null;

    /**
     * 点对象
     */
    spot = null;


    /**
     * 引脚在世界当中的x坐标
     */
    x = 0;

    /**
     * 引脚在世界当中的y坐标
     */
    y = 0;
    width = 5;
    /**
        * 创建引脚
        * 传入目标引脚，如果有则关联，否则不关联
        * @param {String} 自己的类型
        */
    constructor(selfType) {
        this.type = selfType;
    }

    /**
     * 将当前引脚与目标引脚建立关系
     * 会自动识别当前引脚与目标引脚的类型
    * @param {BluePic} pic
     * 
     */
    link(pic) {
        if (this.type == BluePic.PIC_LEFT) {
            if (pic.type == BluePic.PIC_RIGHT) {
                // 左---->>右
                this.inputTarget = pic;
                pic.outputTarget.push(this);
            }
        }

        if (this.type == BluePic.PIC_RIGHT) {

            if (pic.type == BluePic.PIC_LEFT) {
                // 右---->>左
                this.outputTarget.push(pic);
                pic.inputTarget = this;
            }

        }


    }

    start() {
        let two = this.app.two;






        let path = two.makePath([], true);
        // path.stroke = 'rgb(240, 173, 78)';
        path.stroke = '#fff';
        path.noFill();
        path.linewidth = 3;
        path.curved = true;
        path.cap = 'round';
        this.path = path;

        // =====


        let spot = two.makeCircle(0, 0, this.width);
        spot.fill = '#fff';
        spot.noStroke();
        this.spot = spot;


    }
    update() {


        if (this.type == BluePic.PIC_RIGHT) {






        }


        if (this.type == BluePic.PIC_LEFT) {


        }




    }
    render() {

        this.spot.position.x = this.x;
        this.spot.position.y = this.y;


        if (this.type == BluePic.PIC_LEFT) {
            /**
             * 画线都是从右往左画，左节点只能链接一个，但右节点可以输出到多个目标
             */


            let points = [
                new Two.Anchor(this.x, this.y, 0, 0, 0, 0),
                new Two.Anchor(this.inputTarget.x, this.inputTarget.y, 0, 0, 0, 0),
            ];

            this.path.vertices = points;

        }
    }
}