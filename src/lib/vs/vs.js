import VSComponent from './core/VSComponent'
import VSVNode from './core/VSVNode';
import VSCharts from './core/VSCharts';
import VSImage from './core/VSImage';
import VSBlueprint from './core/VSBlueprint';
import VSButton from './core/VSButton';
import VSHttpBody from './core/VSHttpBody';
import Event from './core/Event';
import build from './build';

export default class vs {


    static VSComponent = VSComponent;
    static VSVNode = VSVNode;
    static VSCharts = VSCharts;
    static VSImage = VSImage;
    static VSBlueprint = VSBlueprint;
    static VSButton = VSButton;
    static VSHttpBody = VSHttpBody;
    static Event = Event;


    // 编译器
    static build = build;

    static classList = {}

    /**
     * 加载脚本的工厂函数
     * @param {Object} option 脚本结构
     * @returns {VSComponent} 脚本组件
     */
    static Class(option) {

        let className = option.prototype.constructor.name;

        let properties = new option().properties;

        for (const key in properties) {

            let prop = {
                get: function () {
                    if (typeof properties[key].get == 'function') properties[key].get.bind(this)();
                    return this['_' + key];
                },
                set: function (v) {
                    this['_' + key] = v;
                    if (typeof properties[key].set == 'function') {
                        properties[key].set.bind(this)(v);
                    } else {
                        if (this instanceof vs.VSVNode) {
                            if (this.vm) {
                                if (key in this.vm) {
                                    this.vm[key] = v;
                                }
                            }
                        }
                    }
                },
            }
            let _prop = {
                value: properties[key].default,
                writable: true,// 是否可以改变
            }
            Object.defineProperty(option.prototype, key, prop);
            Object.defineProperty(option.prototype, '_' + key, _prop);

        }

        vs.classList[className] = option;
        return
        let obj = null;
        if (option.extends) {
            obj = option.extends.prototype;
        } else {
            obj = function () { };
        }

        for (const key in obj) {
            Object.defineProperty(obj.prototype, key, {
                value: option[key],
                writable: true // 是否可以改变
            });
        }



        for (const key in obj.properties) {
            Object.defineProperty(obj.prototype, key, {
                value: option.properties[key].default,
                writable: true // 是否可以改变
            });
        }

        console.warn(obj);

        vs.classList[option.name] = obj;

        return obj;

    }

    // 解析pipe
    static buildPipe(app, origin) {
        let pipe = origin.split('.');
        if (pipe.length != 3) return;
        let node, comp, prop;
        if (pipe.length == 3) {
            node = app.queryNode(pipe[0]);
            pipe.splice(0, 1);
        }
        comp = node.queryComponent(pipe[0]);
        prop = pipe[1];
        return { node, comp, prop };
    }
}