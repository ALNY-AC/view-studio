import VSComponent from '../core/VSComponent';
import vs from '../vs'
import AxiosHttp from '../../../plugins/Http';


export default class Http extends VSComponent {
    name = 'Http';
    properties = {
        url: {
            type: String,
            displayName: '请求地址',
            default: 'test',
        },
        model: {
            type: String,
            displayName: '请求方式',
            default: 'get',
            valueOption: ['post', 'get'],
        },
        isStartHttp: {
            type: Boolean,
            displayName: '加载时触发',
            default: false,
        },

        isInterval: {
            type: Boolean,
            displayName: '循环触发',
            default: false,
        },

        data: {
            type: vs.VSHttpBody,
            displayName: '请求数据',
            default: [],
        },

        dataPipe: {
            // type: vs.VSBlueprint,
            // displayName: '数据流',
            // default: null,

            type: String,
            displayName: '数据流',
            default: '',
        },

        btn: {
            type: vs.VSButton,
            displayName: '模拟请求',
            clickFunction: 'http',
        },

    }

    start() {
        if (this.isStartHttp) {
            this.http();
        }
    }

    buildData() {
        let data = {};
        this.data.forEach(({ field, origin }, i) => {
            let pipe = origin.split('.');
            let node, comp, prop;
            if (pipe.length == 3) {
                node = this.node.app.queryNode(pipe[0]);
                pipe.splice(0, 1);
            } else {
                node = this;
            }
            comp = node.queryComponent(pipe[0]);
            prop = pipe[1];
            data[field] = comp[prop];

        });
        console.warn(data);

        return data;
    }

    buildRes(res) {
        // 在此加载蓝图
        //模拟蓝图
        let comp = this.dataPipe.split('.')[0];
        let prop = this.dataPipe.split('.')[1];
        if (comp && prop) {
            let compScript = this.node.queryComponent(this.dataPipe.split('.')[0]);

            if (prop in compScript) {
                // 属性存在
                if (typeof compScript[prop] == 'string') {
                    compScript[prop] = JSON.stringify(res.data);

                } else if (Array.isArray(compScript[prop])) {

                    compScript[prop] = res.data;

                } else if (typeof compScript[prop] == 'object') {
                    compScript[prop] = res.data;
                } else {
                    compScript[prop] = JSON.stringify(res.data);
                }

            } else {
                // 属性不存在
            }
        };
    }

    async http() {
        try {

            let data = this.buildData();


            // try {
            //     data = JSON.parse(this.data);
            // } catch (error) {
            //     data = eval(this.data);
            // }
            if (this.model == 'get') {
                data = { params: data };
            }
            const res = await AxiosHttp[this.model](this.url, data);
            this.buildRes(res);

            //end

            return res;
        } catch (error) {
            console.error(error);
            // throw (error);
        }
    }

    async onInterval() {
        if (this.isInterval) {
            await this.http();
        }
    }

    update() {
    }
}

vs.Class(Http)