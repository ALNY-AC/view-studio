import echarts from "echarts";
import Node from "./Node";

export default class Echart extends Node {

    chart = null;
    timeout = null;
    properties = {
        type: {
            type: String,
            default: "line",
            valueOption: [
                'pie',
                'line',

            ],
            displayName: '类型',
        },
    }
    activeType = 'line';

    init() {
        this.width = 300;
        this.height = 300;
        this.chart = echarts.init(this.$el);
        this.initChart();
    }
    initChart() {
        let option = {};
        if (this.activeType == 'line') {
            option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            };
        }
        if (this.activeType == 'pie') {
            option = {
                backgroundColor: '#2c343c',
                visualMap: {
                    show: false,
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 274, name: '联盟广告' },
                            { value: 235, name: '视频广告' },
                            { value: 400, name: '搜索引擎' }
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        },
                        itemStyle: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            }
        }
        this.chart.setOption(option);

    }
    onResizeCallback(handle, x, y, width, height) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.chart.resize();
        }, 10);
    }

    update() {
        if (this.type != this.activeType) {
            this.activeType = this.type;
            this.initChart();
        }
    }
}