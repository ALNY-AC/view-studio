import Node from "./Node";

export default class Image extends Node {

    chart = null;
    properties = {
        src: {
            type: String,
            default: "/images/a4.png",
            valueOption: [
                '/images/a1.png',
                '/images/a2.png',
                '/images/a3.png',
                '/images/a4.png',
                '/images/b1.png',
                '/images/b2.png',
                '/images/b3.png',
                '/images/b4.png',
                '/images/b5.png',
                '/images/test.webp',
                '/images/top.png',
                '/images/bg.png',
            ],
            displayName: '图片地址',
        },
        src2: {
            type: String,
            default: "/images/a4.png",
            displayName: '图片地址',
        },
        src3: {
            type: String,
            default: "/images/a4.png",
            displayName: '图片地址',
        },
        isRotate: {
            type: Boolean,
            default: false,
            displayName: '是否旋转',
        },
        rotate: {
            type: Number,
            default: 0,
            displayName: '角度',
        }
    }

    init() {

    }

    onResizeCallback(handle, x, y, width, height) {
        // this.chart.resize();
    }

    update() {
        if (this.$el.src != this.src) {
            this.$el.src = this.src;
        }
        this.$el.style.transform = `rotate(${this.rotate}deg)`;
        if (this.isRotate) {
            this.rotate++;
        }
    }
}