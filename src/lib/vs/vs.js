import Component from './Component'

export default class vs {
    static Component = Component
    static classList = {}
    static Class(option) {

        let obj = function () { };

        Object.keys(option).forEach(key => {
            Object.defineProperty(obj.prototype, key, {
                value: option[key],
                writable: true // 是否可以改变
            });
        })


        Object.keys(option.properties).forEach(key => {
            Object.defineProperty(obj.prototype, key, {
                value: option.properties[key].default,
                writable: true // 是否可以改变
            });
        })




        vs.classList[option.name] = obj;

        return obj;

    }
}