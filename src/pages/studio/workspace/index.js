import Node from '../../../lib/vs/Node';
import vs from '../../../lib/vs/vs'
import App from '../../../lib/vs/App';


export default {
    layout: 'root',
    name: 'workspace',
    data() {
        return {
            nodes: [],
            activeNode: null,
            app: null,
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
            this.app = new App();
            this.nodes = this.app.nodes;
            this.app.run();
            this.update();
        },
        // 用于更新一些数据
        async update() {

            let node = new Node();
            node.size.w = 500;
            node.size.h = 300;
            this.app.addNode(node);
            this.$nextTick(() => {
                node.addComponent('ChartsLine');
            });

            let node2 = new Node();
            node2.size.w = 500;
            node2.size.h = 300;
            node2.position.y = 400;
            this.app.addNode(node2);
            this.$nextTick(() => {
                node2.addComponent('ChartsPie');
            });
        },
    },
    // 计算属性
    computed: {

    },
    // 包含 Vue 实例可用过滤器的哈希表。
    filters: {},
    // 在实例创建完成后被立即调用
    created() { },
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    beforeMount() { },
    // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
    mounted() {
        this.init();
        this.$nextTick(() => { });
    },
    // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
    beforeUpdate() { },
    // keep-alive 组件激活时调用。
    activated() { },
    // keep-alive 组件停用时调用。
    deactivated() { },
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
    beforeDestroy() { },
    //Vue 实例销毁后调用。
    destroyed() { },
    // 当捕获一个来自子孙组件的错误时被调用。
    errorCaptured() { },
    // 包含 Vue 实例可用指令的哈希表。
    directives: {},
    // 一个对象，键是需要观察的表达式，值是对应回调函数。
    watch: {

    },
    // 组件列表
    components: {},
};