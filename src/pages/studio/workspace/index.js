import vs from '../../../lib/vs/vs'

export default {
    layout: 'sub',
    name: 'workspace',
    data() {
        return {
            config: {
                x: 100,
                y: 100,
                w: 100,
                h: 100,
            },
            msg: []
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
            this.update();
        },
        // 用于更新一些数据
        async update() {
            // const res = await this.$http.post('', {});
            
            console.warn(vs.prototype);
        },
        onDrag(x, y) {
            this.msg.push(`x:${x}, y:${y}`);
            this.config.x = x;
            this.config.y = y;

        },
        resizing(x, y, w, h) {
            this.msg.push(`x:${x}, y:${y}, w:${w}, h:${h}`);
            this.config.w = w;
            this.config.h = h;
        }
    },
    // 计算属性
    computed: {
        console() {
            return this.msg.join('\r\n');
        }
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
        msg() {
            if (this.msg.length > 100) {
                this.msg.splice(0, 90);
            }
            let $pre = document.getElementById('pre');
            $pre.scrollTop = $pre.scrollHeight;
        }
    },
    // 组件列表
    components: {},
};