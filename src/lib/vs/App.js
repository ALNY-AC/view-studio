import Node from "./Node";

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
    /**
     * 通过配置表生成页面
     */
    compile(nodes) {

        nodes.forEach(({ node, comp }) => {

            let _node = new Node();

            Object.keys(node).forEach(k => {
                _node[k] = node[k];
            });

            comp.forEach(c => {
                _node.addComponent(c.type, c.properties);
            });

            this.addNode(_node);
        })


    }

    // addNode(opt) {
    //     let node = new Node();
    //     node.name = opt.name;
    //     node.size.w = opt.size.w;
    //     node.size.h = opt.size.h;
    //     opt.components.forEach(comp => {
    //         node.addComponent(comp.type, comp.properties);
    //     });
    //     this.app.addNode(node);
    //     this.selectNode(node);
    //     this.nodes = this.app.nodes;
    // }
}