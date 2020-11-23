import '@babel/runtime/regenerator/index'
import _Editor from 'wangeditor'
export const Editor = window.wangEditor || _Editor // 和AMD引入的全局挂载配合，同时可以通过挂载到window来hack代码来源不一致问题
import vueEditor from './editor.vue'

const install = (Vue, globalOptions) => {
  if (globalOptions) {
    vueEditor.props.globalOptions.default = () => globalOptions
  }
  Vue.component(globalOptions && globalOptions.directiveName || vueEditor.name, vueEditor)
}

const VueWangEditor = { Editor, vueEditor, install }

export default VueWangEditor
export { vueEditor, install }
