import vs from '../vs'
import VSVNode from '../core/VSVNode';


export default class Input extends VSVNode {
    name = '输入框';
    properties = {
        placeholder: {
            type: String,
            default: '请输入',
            displayName: '提示文本',
        },

        model: {
            type: String,
            default: '',
            displayName: '值',
        },

        event: {
            type: vs.Event,
            displayName: '回车时',
            default: '',
        },
    }
    eventFunction() {
        let event = vs.buildPipe(this.node.app, this.event);
        if (event) {
            event.comp[event.prop]();
        }
    }
    require() {
        return require('./Input.vue').default;
    }

    update() {
        if (this.vm) {
        }
    }

}

vs.Class(Input)