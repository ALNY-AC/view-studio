// 脚本类，所有脚本都继承此类
/**
 * 脚本组件，挂载在Node上的脚本组件
 */
export default class VSComponent {

    node = null;
    name = '';
    properties = {}
    /**
     * 脚本第一次被加入到Node上时触发
     */
    start() { }
    /**
     * 逻辑帧，每帧循环
     */
    update() { }
    /**
     * 从所在Node上移除时触发
     */
    destroy() { }
}