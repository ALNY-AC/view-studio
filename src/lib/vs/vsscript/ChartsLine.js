import vs from '../vs'
import VSCharts from '../core/VSCharts';
import dark from '../core/dark';


export default class ChartsLine extends VSCharts {

    properties = {
        ...{
            year: {
                type: String,
                default: '2020',
                set(v) {
                    if (this.chart) {
                        this.chart.setOption(this.getChartOption());
                    }
                }
            }
        },
        ...VSCharts.properties,
    }
    start() {
    }
    getChartOption() {
        let option = {
            textStyle: {
                color: '#fff'
            },
            title: {
                text: this.title,
            },
            legend: {},
            tooltip: {},
            xAxis: {
                type: 'category',
            },
            yAxis: {},
            dataset: {
                // 提供一份数据。
                source: [
                    ['年份', 'A端产品销售量', 'B端产品销售量', 'C端产品销售量'],
                    [this.year, 1, 2, 3],
                    ['2001', 1, 2, 3],
                    ['2002', 1, 2, 3],
                    ['2003', 1, 2, 3],
                ]
            },
            series: [
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' }
            ]
        };
        return option;
    }
    onInterval() {
        if (this.vm) {
            // this.vm.list.push({ id: new Random().getNumber() });
        }
    }
}

vs.Class(ChartsLine)