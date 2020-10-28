import Node from "./Node";

export default class Text extends Node {

    chart = null;
    properties = {
        text: {
            type: String,
            default: "标签",
            displayName: '文本',
        },
        color: {
            type: 'color',
            default: "#ffffff",
            displayName: '颜色',
        },
        fontSize: {
            type: String,
            default: '16px',
            displayName: '字体大小',
        }
    }

    init() {

    }

    onResizeCallback(handle, x, y, width, height) {
        // this.chart.resize();
    }

    update() {
        if (this.$el.innerText != this.text) {
            this.$el.innerText = this.text;
        }

        if (this.$el.style.color != this.color) {
            this.$el.style.color = this.color;
        }

        if (this.$el.style.fontSize != this.fontSize) {
            this.$el.style.fontSize = this.fontSize;
        }

    }
}