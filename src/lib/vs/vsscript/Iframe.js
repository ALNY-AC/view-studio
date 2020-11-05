import vs from '../vs'
import VSVNode from '../core/VSVNode';


export default class Iframe extends VSVNode {
    name = '内置浏览器';
    properties = {
        src: {
            type: String,
            default: '',
            displayName: 'url',
        },

    }
    require() {
        return require('./Iframe.vue').default;
    }

    update() {
        if (this.vm) {
        }
    }

}

vs.Class(Iframe)