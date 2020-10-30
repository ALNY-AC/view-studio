import vs from '../vs';
import VSComponent from './VSComponent';

/**
 * 对应Vue实例的脚本组件
 * 想要实现Vue实例，脚本组件可以继承类，并且实现xxx方法
 */

export default class VSVNode extends VSComponent {

    /**
     * vue实例
     */
    vm = null;

    /**
     * 子类实现此方法，此方法应返回一个Vue组件。
     * 系统在检查节点在脚本时，会自动加载此函数返回的vue组件
     * @returns {Vue} 一个通过require函数加载的vue组件
     */
    require() { }



    /**
     * 当节点被缩放当时候回调
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} w 
     * @param {Number} h 
     */
    resizing(x, y, w, h) { }


    /**
     * 当vue子组件被挂载到页面上时的回调
     */
    mounted() { }

}