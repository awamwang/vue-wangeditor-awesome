<template>
  <div class="vue-wang-editor">
    <slot name="toolbar"></slot>

    <div ref="editor" v-if="!splitLayout"></div>

    <template v-else>
      <div ref="toolbar"></div>
      <slot name="split">
        <div style="padding: 1px 0; background: #ccc;"></div>
      </slot>
      <div  ref="container">
        <!--可使用 min-height 实现编辑区域自动增加高度-->
        <p>请输入内容</p>
      </div>
    </template>
  </div>
</template>

<script>
// require sources
import _Editor from 'wangeditor'

const Editor = window.wangEditor || _Editor
const defaultOptions = {
  menus: [
    'head', // 标题
    'bold', // 粗体
    'fontSize', // 字号
    'fontName', // 字体
    'italic', // 斜体
    'underline', // 下划线
    'strikeThrough', // 删除线
    'foreColor', // 文字颜色
    'backColor', // 背景颜色
    'link', // 插入链接
    'list', // 列表
    'justify', // 对齐方式
    'quote', // 引用
    'emoticon', // 表情
    'image', // 插入图片
    'table', // 表格
    'video', // 插入视频
    'code', // 插入代码
    'undo', // 撤销
    'redo' // 重复
  ],
  fontNames: ['宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana'],
  uploadImgShowBase64: true
}

export default {
  name: 'VueWangEditor',
  data() {
    return {
      _options: {},
      _content: '',
      defaultOptions
    }
  },
  props: {
    content: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },

    disabledMenus: {
      type: Array,
      required: false
    },

    splitLayout: {
      type: Boolean
    }
  },
  mounted() {
    this.initialize()
  },
  beforeDestroy() {
    delete this.wang
  },
  methods: {
    // Init Editor instance
    initialize() {
      if (this.$el) {
        // Options
        this._options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options, this.$attrs)
        if (Array.isArray(this.disabledMenus)) {
          let idx
          this.disabledMenus.forEach((m) => {
            if ((idx = this._options.menus.indexOf(m)) > -1) {
              this._options.menus.splice(idx, 1)
            }
          })
        }

        // Instance
        if (this.splitLayout) {
          this.wang = new Editor(this.$refs.toolbar, this.$refs.container)
        } else {
          this.wang = new Editor(this.$refs.editor)
        }

        Object.keys(this._options).forEach((key) => {
          this.wang.customConfig[key] = this._options[key]
        })

        this.initListeners()

        this.wang.create()

        this.wang.$textElem.attr('contenteditable', false)

        // Set editor content
        if (this.value || this.content) {
          this.wang.txt.html(this.value || this.content)
        }

        // Disabled editor
        if (!this.disabled) {
          this.wang.$textElem.attr('contenteditable', true)
        }

        // Emit ready event
        this.$emit('ready', this.wang)
      }
    },
    initListeners() {
      // change
      if (!this.wang.customConfig.onchange) {
        this.wang.customConfig.onchange = (html) => {
          // let html = this.$refs.editor.children[0].innerHTML
          const wang = this.wang
          const text = this.wang.txt.text()
          if (html === '<p><br></p>') html = ''
          this._content = html
          this.$emit('input', this._content)
          this.$emit('change', { html, text, wang })
        }
      } else {
        console.info('[vue wangEditor] get customConfig.onchange from options')
      }

      // focus event
      if (!this.wang.customConfig.onfocus) {
        this.wang.customConfig.onfocus = (html) => {
          this.$emit('focus', this.wang)
        }
      } else {
        console.info('[vue wangEditor] get customConfig.onfocus from options')
      }

      // blur event
      if (!this.wang.customConfig.onblur) {
        this.wang.customConfig.onblur = (html) => {
          this.$emit('blur', this.wang)
        }
      } else {
        console.info('[vue wangEditor] get customConfig.onblur from options')
      }
    }
  },
  watch: {
    // Watch content change
    content(newVal, oldVal) {
      if (this.wang) {
        if (newVal && newVal !== this._content) {
          this._content = newVal
          this.wang.txt.html(newVal)
        } else if (!newVal) {
          this.wang.txt.text('')
        }
      }
    },
    // Watch content change
    value(newVal, oldVal) {
      if (this.wang) {
        if (newVal && newVal !== this._content) {
          this._content = newVal
          this.wang.txt.html(newVal)
        } else if (!newVal) {
          this.wang.txt.text('')
        }
      }
    },
    // Watch disabled change
    disabled(newVal, oldVal) {
      if (this.wang) {
        this.wang.$textElem.attr('contenteditable', !newVal)
      }
    },
    clear() {
      this.wang.txt.clear()
    },
    getJSON() {
      return this.wang.txt.getJSON()
    }
  }
}
</script>
