import vs from '../vs'
import Random from '../../tool/Random'
import VSVNode from '../core/VSVNode';


export default class Table extends VSVNode {

    properties = {
        title: {
            type: String,
            default: '表格',
        }
    }

    require() {
        return require('./VsTable.vue').default
    }

    update() {
        if (this.vm) {
            if (this.vm.title != this.title) {
                this.vm.title = this.title;
            }
        }
    }

    onInterval() {
        console.warn('循环！');
        if (this.vm) {
            this.vm.list.push({ id: new Random().getNumber() });
        }

    }
}

vs.Class(Table)