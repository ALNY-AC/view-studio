import echarts from 'echarts'
import Echart from './script/Echart'
import Image from './script/Image'
import Text from './script/Text'
import Node from './script/Node'

export default {
    name: 'drag',
    layout: 'root',
    data() {
        return {
            comps: [
                { class: "Echart", id: '折线图', name: '折线图', icon: 'fa fa-area-chart' },
                { class: "Echart", id: '饼图', name: '饼图', icon: 'fa fa-pie-chart' },
                { class: "Echart", id: '柱状图', name: '柱状图', icon: 'fa fa-bar-chart-o' },
                { class: "Echart", id: '雷达图', name: '雷达图', icon: 'fa fa-pie-chart' },
                { class: "Image", id: '自定义图片', name: '自定义图片', icon: 'fa fa-image' },
                { class: "Map", id: '地图', name: '地图', icon: 'fa fa-map-o' },
                { class: "Text", id: '标签', name: '标签', icon: 'fa fa-font' },
            ],
            nodes: [

            ],
            compClass: {
                'Echart': Echart,
                'Image': Image,
                'Text': Text,
            },
            vLine: [],
            hLine: [],
            interval: null,//线程
            activeNode: null
        };
    },
    methods: {
        del() {
            this.nodes = this.nodes.filter(node => node.id != this.activeNode.id);
            this.activeNode = null;
        },
        // 辅助线回调事件
        getRefLineParams(params) {
            const { vLine, hLine } = params;
            this.vLine = vLine;
            this.hLine = hLine;
        },
        onDragStart(node) {
            this.activeNode = node;
            return true;
        },
        // 用于初始化一些数据
        init() {
            this.initThread();

        },
        initThread() {
            this.interval = setInterval(() => {

                this.nodes.forEach(el => {
                    el.update();
                });
            }, 10);
        },
        // 用于更新一些数据
        async update() {
            // const res = await this.$http.post('', {});
            // car
            // let option = {
            //     xAxis: {
            //         type: 'category',
            //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            //     },
            //     yAxis: {
            //         type: 'value'
            //     },
            //     series: [{
            //         data: [820, 932, 901, 934, 1290, 1330, 1320],
            //         type: 'line'
            //     }]
            // };
            // let myChart = echarts.init(document.getElementById('echart'));
            // myChart.setOption(option);

        },
        async add(item) {
            try {
                let node = new this.compClass[item.class]();

                Object.keys(node.properties).forEach(k => {
                    node[k] = node.properties[k].default;
                });

                node.comp = item.class;
                node.id = this.$getRandom();
                this.nodes.push(node);
                await this.$nextTick();
                node.$el = document.getElementById(node.id);
                node.dragNode = this.$refs['drag_' + node.id][0];
                node.init();
            } catch (error) {
                console.error(error);
            }
        }
    },
    // 计算属性
    computed: {},
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
    watch: {},
    // 组件列表
    components: {},
};