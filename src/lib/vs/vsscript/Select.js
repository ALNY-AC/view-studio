import vs from '../vs'
import VSVNode from '../core/VSVNode';
import { options } from 'less';


export default class Select extends VSVNode {
    name = '下拉框';
    properties = {
        placeholder: {
            type: String,
            default: '请选择',
            set(v) {
                if (this.vm) {
                    this.vm.placeholder = v;
                }
            }
        },
        options: {
            type: String,
            rows: true,
            default: `
[
    {"label":"1","value":"1"}
]
            `,
            set(v) {
                if (this.vm) {
                    this.vm.options = v;
                }
            }
        },
        model: {
            type: String,
            default: '',
            displayName: '值',
        },
        event: {
            type: vs.Event,
            displayName: '选项发生改变时',
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
        return require('./Select.vue').default;
    }

    update() {
        if (this.vm) {
        }
    }

}

vs.Class(Select)