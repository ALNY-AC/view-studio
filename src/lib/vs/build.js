import App from "./App";
import VSComponent from "./core/VSComponent";
import Node from "./Node";

/**
 * 构建程序为json
 * @param {App} app 要构建的app
 */
export default function build(app) {
    console.clear();



    let baseProp = ['components', 'app'];

    /**
     * 节点
     * @type {Array<Node>} 
     */
    let nodes = app.nodes;
    let newNodes = nodes.map(node => {

        let prop = Object.keys(node).filter(key => (typeof node[key] != 'function') && baseProp.indexOf(key) < 0);
        let comp = buildComponent(node);

        let newNode = {};

        prop.forEach(k => { newNode[k] = node[k] });

        return {
            node: newNode,
            comp: comp
        };
    })

    return newNodes;

}


/**
 * 构建程序为json
 * @param {Node} node 要构建的app
 */
function buildComponent(node) {

    /**
       * 节点
       * @type {Array<VSComponent>} 
       */
    let components = node.components;
    return components.map(comp => {

        let properties = {};
        Object.keys(comp.properties).forEach(k => { properties[k] = comp[k] });
        return {
            type: comp.__proto__.constructor.name,
            properties: properties,
        }
    })

}