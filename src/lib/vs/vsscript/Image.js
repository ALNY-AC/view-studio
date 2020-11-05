import vs from '../vs'
import Random from '../../tool/Random'
import VSVNode from '../core/VSVNode';


export default class Image extends VSVNode {

    properties = {
        src: {
            type: vs.VSImage,
            displayName: '图片地址',
            default: '/img/banner/banner3.png',
        },
        align: {
            type: String,
            displayName: '对齐方式',
            default: '填充',
            valueOption: ['填充', '适应', '原图'],
        },
        repeat: {
            type: String,
            displayName: '重复方式',
            default: '不重复',
            valueOption: ['不重复', '重复', '水平重复', '垂直重复'],
        },

        isR: {
            type: Boolean,
            displayName: '开启旋转',
            default: false,
        },
        r: {
            type: Number,
            displayName: '旋转角度',
            default: 0,
        }

    }

    require() {
        return require('./VsImage.vue').default
    }

    update() {
        if (this.vm) {
            if (!this.vm.image) {
                this.vm.image = this;
            }
            this.vm.$refs.image.style.transform = `rotateZ(${this.r}deg)`

        }
        if (this.isR) {
            this.r++;
        }
    }



}

vs.Class(Image)