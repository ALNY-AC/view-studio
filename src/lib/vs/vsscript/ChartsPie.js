import vs from '../vs'
import VSCharts from '../core/VSCharts';
import dark from '../core/dark';


export default class ChartsPie extends VSCharts {

    properties = {
        ...VSCharts.properties,
        ...{
            radius1: {
                type: Number,
                default: 40,
                set(v) {
                    if (this.chart) {
                        this.chart.setOption(this.getChartOption());
                    }
                }
            }
        }
    }
    start() {
    }
    getChartOption() {
        let option = {
            title: {
                text: this.title,
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            dataset: {
                // 提供一份数据。
                source: [
                    ['年份', 'A端产品销售量', 'B端产品销售量', 'C端产品销售量'],
                    ['2000', 1, 2, 3],
                    ['2001', 1, 2, 3],
                    ['2002', 1, 2, 3],
                    ['2003', 1, 2, 3],
                ]
            },
            series:
            {
                name: '年份',
                type: 'pie',
                radius: [this.radius1, '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },

            }
        };
        return option;
    }
    onInterval() {
        if (this.vm) {
            // this.vm.list.push({ id: new Random().getNumber() });
        }
    }
}

vs.Class(ChartsPie)