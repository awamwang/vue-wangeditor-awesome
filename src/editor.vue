<template>
  <div class="vue-wang-editor">
    <slot name="toolbar"></slot>

    <div ref="editor" v-if="!splitLayout"></div>

    <template v-else>
      <div ref="toolbar"></div>
      <slot name="split">
        <div style="padding: 1px 0; background: #ccc"></div>
      </slot>
      <div ref="container">
        <!--可使用 min-height 实现编辑区域自动增加高度-->
      </div>
    </template>
  </div>
</template>

<script>
// require sources
import _Editor from 'wangeditor'

const Editor = window.wangEditor || _Editor
const defaultOptions = {
  uploadImgShowBase64: true
}

export default {
  name: 'VueWangEditor',
  data() {
    return {
      wang: null,
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
    },
    highlight: {
      type: Object
    },
    i18next: {
      type: Object
    },
    extendedMenus: {
      type: Object
    },

    beforeReady: {
      type: Function
    }
  },
  computed: {
    selection() {
      return this.wang.selection
    }
  },
  mounted() {
    this.initialize()
  },
  beforeDestroy() {
    this.wang.destroy()
    delete this.wang
  },
  methods: {
    // Init Editor instance
    async initialize() {
      if (this.$el) {
        // Options
        this._options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options, this.$attrs)

        // Instance
        if (this.splitLayout) {
          this.wang = new Editor(this.$refs.toolbar, this.$refs.container)
        } else {
          this.wang = new Editor(this.$refs.editor)
        }
        if (this.beforeReady) {
          if ((await this.beforeReady(this.wang, this._options)) === false) {
            return
          }
        }

        // extend menu, add first
        let extendedMenus = Object.assign({}, this._options.extendedMenus, this.extendedMenus)
        if (extendedMenus && Object.prototype.toString.call(extendedMenus) === '[object Object]') {
          Object.keys(extendedMenus).forEach((key) => {
            this.wang.menus.extend(key, extendedMenus[key])
          })
        }
        delete this._options.extendedMenus

        Object.keys(this._options).forEach((key) => {
          this.wang.config[key] = this._options[key]
        })
        if (Array.isArray(this.disabledMenus)) {
          let idx
          this.disabledMenus.forEach((m) => {
            if ((idx = this.wang.config.menus.indexOf(m)) > -1) {
              this.wang.config.menus.splice(idx, 1)
            }
          })
        }
        // highlight
        if (this.highlight) {
          this.wang.highlight = this.highlight
        }
        // i18n
        if (this.i18next) {
          this.wang.i18next = this.i18next
        }

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
      if (!this._options.onchange) {
        this.wang.config.onchange = (html) => {
          // let html = this.$refs.editor.children[0].innerHTML
          const wang = this.wang
          const text = this.wang.txt.text()
          if (html === '<p><br></p>') html = ''
          this._content = html
          this.$emit('input', this._content)
          this.$emit('change', { html, text, wang })
        }
      } else {
        console.info('[vue wangEditor] get config.onchange from options')
      }

      // focus event
      if (!this._options.onfocus) {
        this.wang.config.onfocus = (html) => {
          this.$emit('focus', this.wang)
        }
      } else {
        console.info('[vue wangEditor] get config.onfocus from options')
      }

      // blur event
      if (!this._options.onblur) {
        this.wang.config.onblur = (html) => {
          this.$emit('blur', this.wang)
        }
      } else {
        console.info('[vue wangEditor] get config.onblur from options')
      }
    },
    append(content) {
      return this.wang.txt.append(content)
    },
    clear() {
      this.wang.txt.clear()
    },
    getJSON() {
      return this.wang.txt.getJSON()
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
    }
  }
}
</script>
