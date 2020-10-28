import vs from "../vs";
vs.Class({
    name: 'Image',
    properties: {
        src: {
            type: String,
            default: "/images/a4.png",
            displayName: '图片地址',
        },
    },
    start() {
        this.node.componentName = 'VsImage';
    },
    update() {
    },
    destroy() { },
})