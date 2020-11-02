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
        isHttp: {
            type: Boolean,
            displayName: '现在请求',
            default: false,
        },

        isStartHttp: {
            type: Boolean,
            displayName: '第一次触发',
            default: false,
        },

        isInterval: {
            type: Boolean,
            displayName: '循环触发',
            default: false,
        },

        data: {
            type: String,
            displayName: '请求数据',
            default: '{}',
        },

        dataPipe: {
            type: vs.VSBlueprint,
            displayName: '数据流',
            default: null,
        },

    }

    start() {
    }

    async http() {
        try {
            console.warn(this.data);
            console.warn(this.url);
            console.warn(this.model);
            let data = {};
            try {
                data = JSON.parse(this.data);
            } catch (error) {
                console.warn(this.data);
                console.error(error);
                data = eval(this.data);
            }
            if (this.model == 'get') {
                data = { params: data };
            }
            const res = await AxiosHttp[this.model](this.url, data);
            console.warn(res);
            // 在此加载蓝图
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