import Node from '../../../lib/vs/Node';
import vs from '../../../lib/vs/vs'
import App from '../../../lib/vs/App';


export default {
    layout: 'root',
    name: 'workspace',
    data() {
        return {
            nodes: [],
            tree: [],
            activeNode: null,
            app: null,
            comps: [
                // { size: { w: 400, h: 400 }, components: ["ChartsPie"], id: '柱状图', name: '柱状图', icon: 'fa fa-bar-chart-o' },
                // { size: { w: 400, h: 400 }, components: ["ChartsPie"], id: '雷达图', name: '雷达图', icon: 'fa fa-pie-chart' },
                { size: { w: 400, h: 300 }, components: [{ type: "ChartsLine", properties: {} }], id: '折线图', name: '折线图', icon: 'fa fa-area-chart' },
                { size: { w: 400, h: 400 }, components: [{ type: "ChartsPie", properties: {} }], id: '饼图', name: '饼图', icon: 'fa fa-pie-chart' },
                { size: { w: 200, h: 200 }, components: [{ type: "Image", properties: { src: '/img/bg/bg18.jpg' } }], id: '自定义图片', name: '自定义图片', icon: 'fa fa-image' },
                { size: { w: 200, h: 200 }, components: [{ type: "Image", properties: {} }], id: '自定义图片2', name: '自定义图片2', icon: 'fa fa-image' },
                { size: { w: 100, h: 100 }, components: [{ type: "Map", properties: {} }], id: '地图', name: '地图', icon: 'fa fa-map-o' },
                { size: { w: 100, h: 100 }, components: [{ type: "Label", properties: {} }], id: '标签', name: '标签', icon: 'fa fa-font' },
                { size: { w: 400, h: 300 }, components: [{ type: "Table", properties: {} }], id: '表格', name: '表格', icon: 'fa fa-font' },
            ],
            scene: {
                w: 1920,
                h: 1080,
            },
            scale: 1,
            sceneStyle: {},
            preNode: null,
        };
    },
    watch: {
        'app.nodes'() {
            this.nodes = this.app.nodes;
            // this.buildTree();
        }
    },
    methods: {
        save() {
            let data = vs.build(this.app);
            console.warn(data);
            this.$http.post('/vs/save', { id: this.$route.query.id, json: JSON.stringify(data) });
        },
        addNode(opt) {
            let node = new Node();
            node.name = opt.name;
            node.size.w = opt.size.w;
            node.size.h = opt.size.h;
            opt.components.forEach(comp => {
                node.addComponent(comp.type, comp.properties);
            });
            this.app.addNode(node);
            this.selectNode(node);
            this.nodes = this.app.nodes;
        },
        // buildTree() {
        //     let tree = [];
        //     tree = this.nodes
        //         .filter(el => !el.parentId)
        //         .map(el => ({ children: [], name: el.name, id: el.id, parentId: el, parentId: el.parentId }));

        //     tree.forEach(el => {
        //         this.buildChildren(el);
        //     })
        //     console.warn('tree', tree);
        //     this.tree = tree;
        // },
        // buildChildren(item) {
        //     item.children = this.nodes
        //         .filter(el => el.parentId == item.id)
        //         .map(el => ({ children: [], name: el.name, id: el.id, parentId: item.id }));

        //     item.children.forEach(el => {
        //         this.buildChildren(el);
        //     });

        // },
        selectNode(node) {
            this.activeNode = node;
        },
        unSelectNode(node) {
            this.activeNode = null;
        },
        resize() {
            if (!this.$refs.scene) return;
            let width = this.$refs.scene.offsetWidth;

            console.warn(width);

            let scale = (width / this.scene.w) * 100
            scale = parseFloat(scale);
            this.scale = scale;

            this.$refs.vdrbox.style.width = (scale * this.scene.w) / 100;
            this.$refs.vdrbox.style.height = (scale * this.scene.h) / 100;

            this.sceneStyle = {
                transform: `scale(${scale / 100},${scale / 100})`,
                width: (scale * this.scene.w) / 100,
                height: (scale * this.scene.h) / 100,
            }
        },
        // 用于初始化一些数据
        init() {
            this.app = new App();
            this.nodes = this.app.nodes;
            this.app.run();
            this.update();
            this.initEvent();
            this.initScene();
            // this.sceneStyle = {
            //     width: this.scene.w + 'px',
            //     height: this.scene.h + 'px',
            // }
            console.warn(this.sceneStyle);
            // this.resize();
            // this.addNode(this.comps[2]);
            // this.addNode(this.comps[2]);
        },
        initScene() {
            // sceneView
            let vw = this.scene.w;
            let vh = this.scene.h;


            var elem = document.getElementById('sceneViewBg');

            var params = { width: this.scene.w, height: this.scene.h };
            var two = new Two(params).appendTo(elem);

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


        },
        initEvent() {
            window.addEventListener('keydown', (e) => {
                // if (e.code == 'Backspace') {
                //     this.delNode();
                // }
                // if (e.code == 'KeyX') {
                //     this.delNode();
                // }
            });
            // document.getElementById('sceneView').addEventListener('touchmove', function (e) {
            //     e.preventDefault();
            // }, { passive: false });
            // document.getElementById('sceneView').addEventListener('mousewheel', (e) => {
            //     console.warn(e.wheelDelta / 1000);
            //     this.scale = this.scale + (e.wheelDelta / 100)
            //     e.stopPropagation();
            //     // transform:scale()
            // });

            // window.addEventListener('resize', (e) => {
            //     this.resize();
            // });


        },
        delNode() {
            this.app.removeNode(this.activeNode);
            this.nodes = this.app.nodes;
            this.activeNode = null;
            // this.buildTree();
        },
        // 用于更新一些数据
        async update() {
            if (typeof this.$route.query.id == 'undefined') return false;
            const res = await this.$http.post('/vs/info', { id: this.$route.query.id });
            let config = JSON.parse(res.data.json);
            this.app.compile(config);
        },


        mouseover(node) {
            this.preNode = node;
        },
        mouseleave() {
            this.preNode = null;
        },
        // handleDragEnd(draggingNode, dropNode, dropType, ev) {
        //     draggingNode.data.parentId = dropNode.data.id;
        // },

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
    destroyed() {
        console.warn('destroyed');
        this.nodes = [];
        this.app = null;
        this.activeNode = null;
    },
    // 当捕获一个来自子孙组件的错误时被调用。
    errorCaptured() { },
    // 包含 Vue 实例可用指令的哈希表。
    directives: {},
    // 组件列表
    components: {},
};