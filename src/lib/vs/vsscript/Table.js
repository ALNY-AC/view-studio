import vs from '../vs'
import Random from '../../tool/Random'


export default class Table extends vs.VNode {

    require() {
        return require('./VsTable.vue').default
    }
    update() {
    }
    onInterval() {
        console.warn('循环！');
        if (this.vm) {
            this.vm.list.push({ id: new Random().getNumber() });
        }
    }
}

vs.Class(Table)