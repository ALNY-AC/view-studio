import echarts from "echarts";
import VSVNode from "./VSVNode";
import dark from "./dark";


/**
 * 图表类，子类继承实现图表功能
 */
export default class VSCharts extends VSVNode {

    chart = null;
    timeout = null;

    static properties = {
        title: {
            type: String,
            default: '销售数据',
            set(v) {
                if (this.chart) {
                    this.chart.setOption({
                        title: {
                            text: v
                        }
                    });
                }
            }
        },
        theme: {
            type: String,
            default: 'dark',
            valueOption: ['default', 'dark'],
            set() {
                if (this.chart) {
                    this.initChart();
                }
            }
        }
    }

    require() {
        return require('../vsscript/VsCharts.vue').default
    }
    // 获取配置接口
    getChartOption() {
        return {}
    }
    initChart() {
        if (this.chart) {
            this.chart.dispose();
        }
        this.chart = echarts.init(this.vm.$refs['chart'], this.theme);
        this.chart.setOption(this.getChartOption());
        this.vm.chart = this.chart;
    }
    resizing(x, y, w, h) {
        if (this.chart) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.chart.resize();
            }, 10);
        }
    }
    // 自动实现初始化操作
    mounted() {
        if (!this.vm.chart) {
            this.initChart();
        }
    }
}