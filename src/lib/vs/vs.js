import VSComponent from './core/VSComponent'
import VNode from './core/VNode';

export default class vs {


    static VSComponent = VSComponent;
    static VNode = VNode;



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
            Object.defineProperty(option.prototype, key, {
                value: properties[key].default,
                writable: true // 是否可以改变
            });
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
}