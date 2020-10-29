/**
 * 节点类，在场景中都所有节点都继承此类
 * 
 * 
 */
import Random from '../tool/Random'
import vs from './vs';

export default class Node {
    name = 'node';
    componentName = '';
    id = new Random().getRandom();
    // 定位
    position = {
        x: 0,
        y: 0,
    };
    // 旋转
    rotation = 0;
    // 缩放
    scale = {
        x: 0,
        y: 0,
    };
    // 宽高
    size = {
        w: 0,
        h: 0,
    };
    // 颜色
    color = {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    };
    // 透明度
    opacity = 1;

    /**
     * 组件脚本数组
     */
    components = [];

    start() { }
    /**
     * 将脚本组件添加到Node上
     * @param {String} compName 要被添加的组件脚本的名字
     */
    addComponent(compName) {
        // 同一个组件不能添加两次

        console.warn(this.components);
        if (this.queryComponent(compName)) {
            console.warn('不能重复添加');
            return null;
        }

        let comp = new vs.classList[compName]();

        if (!comp.name) {
            comp.name = comp.__proto__.constructor.name
        }

        this.components.push(comp);
        comp.node = this;
        comp.start();
        return comp;

    }

    /**
     * 查询组件
     * @param {String | VSComponent} name 要查询的组件名称
     */
    queryComponent(name) {
        if (typeof name == 'string') {
            return this.components.find(el => el.__proto__.constructor.name == name);
        } else {
            return this.components.find(el => el instanceof name);
        }
    }
    update(dt) {
        this.components.forEach(el => {
            el.update(dt);
        })
    }
    destroy() { }

    /**
     * node在渲染层被调整大小的回调
     */
    resizing(x, y, w, h) {
        this.size.w = w;
        this.size.h = h;
        this.position.x = x;
        this.position.y = y;
    }
    /**
     * node在渲染层被调整移动位置的回调
     */
    dragging(x, y) {
        this.position.x = x;
        this.position.y = y;
    }


}