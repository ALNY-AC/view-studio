import vs from '../vs'
import VSVNode from '../core/VSVNode';


export default class Label extends VSVNode {

    properties = {

        text: {
            type: String,
            rows: true,
            default: '标签',
        },

        fontSize: {
            type: String,
            default: '16px',
        },
        justifyContent: {
            type: String,
            displayName: '水平对齐方式',
            default: '居中',
            valueOption: ['左对齐', '居中', '右对齐'],
        },
        alignItems: {
            type: String,
            displayName: '垂直对齐方式',
            default: '居中',
            valueOption: ['顶部', '居中', '底部'],
        },
        align: {
            type: String,
            displayName: '文本对齐方式',
            default: '居中',
            valueOption: ['左对齐', '居中', '右对齐'],
        }
    }
    require() {
        return require('./VsLabel.vue').default
    }

    update() {
        if (this.vm) {
            if (!this.vm.Label) {
                this.vm.Label = this;
            }

            // if (this.vm.text != this.text) {
            //     this.vm.text = this.text;
            // }
        }
    }

}

vs.Class(Label)