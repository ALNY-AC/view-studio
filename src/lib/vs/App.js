
export default class App {
    runtimeInterval = null;
    nodes = [];
    dt = 0;
    run() {
        this.start();
        this.loadScript();
    }
    loadScript() {
        // ======================================================新组件注册
        // Vue.component('HelloWorld', require(`../components/HelloWorld.vue`));
        const requireComponent = require.context(
            // 其组件目录的相对路径
            './vsscript',
            // 是否查询其子目录
            true,
            // 匹配基础组件文件名的正则表达式
            /[A-Z]\w+\.(js)$/
        )
        requireComponent.keys().forEach(fileName => {
            const componentConfig = requireComponent(fileName)
        })
    }
    start() {
        this.runtimeInterval = setInterval(() => {
            this.dt++;
            this.nodes.forEach(el => {
                el.update(this.dt);
            })
        }, 10);
    }
    stop() {
        this.dt = 0;
        clearInterval(this.runtimeInterval);
    }
    addNode(node) {
        this.nodes.push(node);
        node.start();
    }
    removeNode(node) {
        this.nodes = this.nodes.filter(el => el.id != node.id);
    }
}