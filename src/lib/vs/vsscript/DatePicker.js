import vs from '../vs'
import VSVNode from '../core/VSVNode';


export default class DatePicker extends VSVNode {
    name = '日期选择器';
    properties = {
        placeholder: {
            type: String,
            default: '请选择',
            displayName: '提示文本',
        },

        valueFormat: {
            type: String,
            default: 'yyyy-MM-dd',
            displayName: '日期格式化',
        },

        model: {
            type: String,
            default: new Date().Format("yyyy-MM-dd"),
            displayName: '值',
        },

        event: {
            type: vs.Event,
            displayName: '选项发生改变时',
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
        return require('./DatePicker.vue').default;
    }

    update() {
        if (this.vm) {
        }
    }

}

vs.Class(DatePicker)