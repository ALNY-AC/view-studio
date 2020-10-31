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
            comps: [
                { size: { w: 400, h: 300 }, components: ["ChartsLine"], id: '折线图', name: '折线图', icon: 'fa fa-area-chart' },
                { size: { w: 400, h: 400 }, components: ["ChartsPie"], id: '饼图', name: '饼图', icon: 'fa fa-pie-chart' },
                { size: { w: 400, h: 400 }, components: ["ChartsPie"], id: '柱状图', name: '柱状图', icon: 'fa fa-bar-chart-o' },
                { size: { w: 400, h: 400 }, components: ["ChartsPie"], id: '雷达图', name: '雷达图', icon: 'fa fa-pie-chart' },
                { size: { w: 200, h: 200 }, components: ["Image"], id: '自定义图片', name: '自定义图片', icon: 'fa fa-image' },
                { size: { w: 100, h: 100 }, components: ["Map"], id: '地图', name: '地图', icon: 'fa fa-map-o' },
                { size: { w: 100, h: 100 }, components: ["Text"], id: '标签', name: '标签', icon: 'fa fa-font' },
            ],
            scene: {
                w: 1920,
                h: 1080,
            },
            scale: 1,
        };
    },
    methods: {
        addNode(opt) {
            let node = new Node();
            node.size.w = opt.size.w;
            node.size.h = opt.size.h;

            opt.components.forEach(comp => {
                node.addComponent(comp);
            });


            this.app.addNode(node);
        },
        // 用于初始化一些数据
        init() {
            this.app = new App();
            this.nodes = this.app.nodes;
            this.app.run();
            this.update();
            this.initEvent();
            this.initScene();
        },
        initScene() {
            // sceneView
            let vw = this.scale.w;
            let vh = this.scale.h;

            var elem = document.getElementById('sceneViewBg');
            var params = { width: this.scene.w, height: this.scene.h };
            var two = new Two(params).appendTo(elem);
            // scene

            for (let i = 0; i < this.scene.w; i++) {
                var line = two.makeLine(i * 30, 0, i * 30, this.scene.h);
                line.stroke = 'rgb(77,77,77)';
                line.linewidth = 1;
            }
            for (let i = 0; i < this.scene.h; i++) {
                var line = two.makeLine(0, i * 30, this.scene.w, i * 30);
                line.stroke = 'rgb(77,77,77)';
                line.linewidth = 1;
            }

            two.update();


            // ====

            // var scene = new Two(params).appendTo(document.getElementById('scene'));

            // var t = scene.makeLine(0, 0, 100, 0);
            // t.stroke = '#f66';
            // t.linewidth = 1;
            // scene.update();


        },
        initEvent() {


            window.addEventListener('keydown', (e) => {
                if (e.code == 'Backspace') {
                    this.delNode();
                }
                if (e.code == 'KeyX') {
                    this.delNode();
                }
            });

            // document.getElementById('sceneView').addEventListener('mousewheel', (e) => {
            //     console.warn(e.wheelDelta / 1000);
            //     this.scale = this.scale + (e.wheelDelta / 100)
            //     e.stopPropagation();
            //     // transform:scale()
            // });


        },
        delNode() {
            this.app.removeNode(this.activeNode);
            this.nodes = this.app.nodes;
            this.activeNode = null;
        },
        // 用于更新一些数据
        async update() {


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