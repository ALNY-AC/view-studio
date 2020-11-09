import Random from '../lib/tool/Random'
import BlueNode from './BlueNode';

export default class BluePic {
    static PIC_LEFT = 'left';
    static PIC_RIGHT = 'right';

    originNode = null;
    targetNode = null;
    node = null;
    app = null;
    type = null;
    path = null;

    constructor(originNode, targetNode) {
        this.originNode = originNode;
        this.targetNode = targetNode;
    }
    init() {
        let two = this.app.two;
        let path = two.makePath([], true);
        path.stroke = 'rgb(240, 173, 78)';
        path.noFill();
        path.linewidth = 5;
        path.curved = true;
        path.cap = 'round';
        this.path = path;
    }
    update() {

        if (this.type == BluePic.PIC_RIGHT) {


        }

    }
    render() {
        if (this.type == BluePic.PIC_RIGHT) {

            let node1 = this.originNode;
            let node2 = this.targetNode;

            let points = [
                new Two.Anchor(node1.x, node1.y, 0, 0, 0, 0),
                new Two.Anchor(node1.x + 50, node1.y + 20, 0, 0, 0, 0),
                new Two.Anchor(node2.x - 50, node2.y - 20, 0, 0, 0, 0),
                new Two.Anchor(node2.x, node2.y, 0, 0, 0, 0),
            ];
            this.path.vertices = points;

            // console.warn(this.path.vertices);

        }
    }
}