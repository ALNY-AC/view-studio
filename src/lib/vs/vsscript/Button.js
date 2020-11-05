import vs from '../vs'
import VSVNode from '../core/VSVNode';


export default class Button extends VSVNode {
    name = '按钮';
    properties = {
        title: {
            type: String,
            default: '按钮',
            displayName: '标题',
        },

        type: {
            type: String,
            default: 'primary',
            displayName: '类型',
            valueOption: ['default', 'primary', 'success', 'info', 'warning', 'danger'],
        },

        event: {
            type: vs.Event,
            displayName: '事件流',
            default: '',
        }

    }
    eventFunction() {
        let event = vs.buildPipe(this.node.app, this.event);
        if (event) {
            event.comp[event.prop]();
        }
    }
    require() {
        return require('./Button.vue').default;
    }

    update() {
        if (this.vm) {
        }
    }

}

vs.Class(Button)