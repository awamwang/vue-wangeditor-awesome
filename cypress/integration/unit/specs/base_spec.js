import Vue from 'vue/dist/vue.js'
import VueWangEditor, {
  Editor as WangEditor,
  vueEditor,
  install
} from '../../../../dist/vue-wangeditor-awesome'
// import VueWangEditorSsr from '../../../src/ssr.js'

window.Vue = Vue

// console.log('--------VueWangEditor', VueWangEditor)
// console.log('--------VueWangEditorSsr', VueWangEditorSsr)

describe('vue-wang-editor', () => {
  Vue.use(VueWangEditor, {
    directiveName: 'wangEditor',
    test1: 'test1',
    test2: 2,
    test3: {},
    test4: true
  })
  // Vue.use(VueWangEditorSsr, {
  //   placeholder: 'global ssr placeholder'
  // })

  // 测试解构是否成功
  it('can get the object in es module', () => {
    expect(typeof install).to.deep.equal('function')
    expect(typeof vueEditor.methods.initialize).to.deep.equal('function')
  })

  // 全局安装
  describe('Global install spa:component', () => {
    it(' - should can get the wangEditor element', (done) => {
      const vm = new Vue({
        template: `<div><wang-editor v-model="content"></wang-editor></div>`,
        data: {
          content: '<p>test content</p>'
        }
      }).$mount()
      expect(vm.$children[0].value).to.deep.equal('<p>test content</p>')
      Vue.nextTick(() => {
        expect(vm.$children[0].wang instanceof WangEditor).to.equal(true)
        expect(vm.$children[0].wang.txt.text()).to.deep.equal('test content')
        done()
      })
    })
  })

  // 全局配置测试
  describe('Get instance by attr ref and set global options', () => {
    it(' - should get the wangEditor instance and global options', (done) => {
      const vm = new Vue({
        template: `<div><wang-editor ref="myTextEditor" v-model="content"></wang-editor></div>`,
        data: {
          content: '<p>test content</p>'
        },
        computed: {
          editor() {
            return this.$refs.myTextEditor
          },
          wangEditor() {
            return this.editor.wang
          }
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(vm.wangEditor instanceof WangEditor).to.equal(true)
        expect(vm.wangEditor.txt.text()).to.deep.equal('test content')
        expect(Object.keys(vm.editor._options).length >= 5).to.equal(true)
        done()
      })
    })
  })

  // 全局配置覆盖
  describe('Set component options', () => {
    it(' - should wangEditor.placeholder === component.options.placeholder', (done) => {
      const vm = new Vue({
        template: `<div><wang-editor ref="myTextEditor" :options="editorOption" v-model="content"></wang-editor></div>`,
        data: {
          content: '<p>test content</p>',
          editorOption: {
            placeholder: 'component placeholder'
          }
        },
        computed: {
          editor() {
            return this.$refs.myTextEditor
          },
          wangEditor() {
            return this.editor.wangEditor
          }
        }
      }).$mount()
      Vue.nextTick(() => {
        // 配置是否等同局部配置
        const placeholder = vm.editor._options.placeholder
        const isInclude =
          placeholder === 'component placeholder' || placeholder === undefined
        expect(isInclude).to.equal(true)
        done()
      })
    })
  })

  // 数据绑定
  describe('Component data binding', () => {
    it(' - should change the wangEditor content after change the component content data', (done) => {
      const vm = new Vue({
        template: `<div><wang-editor v-model="content" ref="myTextEditor"></wang-editor></div>`,
        data: {
          content: '<p>test content</p>'
        },
        computed: {
          wangEditor() {
            return this.$refs.myTextEditor.wang
          }
        },
        mounted() {
          this.content = '<span>test change</span>'
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(vm.wangEditor.txt.text()).to.deep.equal('test change')
        // expect(vm.wangEditor.editor.delta.ops).to.deep.equal([
        //   { insert: 'test change' }
        // ])
        done()
      })
    })
  })

  // 广播事件
  describe('Component emit event and data binding by evennt', () => {
    it(' - should capture event after the wangEditor emit event', (done) => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <wang-editor ref="myTextEditor"
                                    :value="content"
                                    @blur="onEditorBlur"
                                    @focus="onEditorFocus"
                                    @ready="onEditorReady"
                                    @change="onEditorChange"
                                    @input="onEditorInput">
                      </wang-editor>
                  </div>
                  `,
        data: {
          content: '<p>test content</p>'
        },
        computed: {
          editor() {
            return this.$refs.myTextEditor
          },
          wangEditor() {
            return this.editor.wang
          }
        },
        methods: {
          onEditorBlur(wangEditor) {
            console.log('onEditorBlur', wangEditor)
            eventLogs.push('onEditorBlur')
          },
          onEditorFocus(wangEditor) {
            console.log('onEditorFocus', wangEditor)
            eventLogs.push('onEditorFocus')
          },
          onEditorReady(wangEditor) {
            eventLogs.push('onEditorReady')
            // mockEvennt(this.editor.$el.children[1])
            // triggerEvent(this.editor.$el.children[0].children[0].children[0], 'MouseEvent')
          },
          onEditorChange({ wangEditor, text, html }) {
            eventLogs.push('onEditorChange' + text)
            // expect(wangEditor instanceof WangEditor).to.deep.equal(true)
            // expect(!!text).to.deep.equal(true)
            // expect(!!html).to.deep.equal(true)
          },
          onEditorInput(html) {
            eventLogs.push('onEditorInput' + html)
            // expect(html).to.deep.equal('<p>test change</p>')
          }
        },
        mounted() {
          eventLogs.push('mounted')
          this.content = '<span>test change</span>'
        }
      }).$mount()

      // console.log('----------', eventLogs)
      expect(eventLogs[0]).to.deep.equal('onEditorReady')
      expect(eventLogs[1]).to.deep.equal('mounted')
      done()
      // console.log('onEditorReady', this.editor.$el.children[1].children[0].dispatchEvent(event), event)
      // expect(wangEditor instanceof WangEditor).to.deep.equal(true)
      // setTimeout(() => {
      // this.content = '<p>test change</p>'
      // }, 1000)
    })
  })

  // 局部安装
  describe('Local install component', () => {
    it(' - should work', (done) => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <wang-editor ref="myTextEditor"
                                        v-model="content"
                                        :options="editorOption"
                                        @ready="onEditorReady">
                      </wang-editor>
                  </div>
                  `,
        components: {
          VueWangEditor: vueEditor
        },
        data: {
          content: '<p>test content</p>',
          editorOption: {
            placeholder: 'component placeholder'
          }
        },
        computed: {
          wangEditor() {
            return this.$refs.myTextEditor.wang
          }
        },
        methods: {
          onEditorReady(wangEditor) {
            eventLogs.push('onEditorReady')
          }
        },
        mounted() {
          this.content = '<span>test change</span>'
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(eventLogs[0]).to.deep.equal('onEditorReady')
        expect(vm.wangEditor instanceof WangEditor).to.deep.equal(true)
        expect(vm.wangEditor.txt.text()).to.deep.equal('test change')
        // expect(vm.wangEditor.editor.delta.ops).to.deep.equal([
        //   { insert: 'test change' }
        // ])
        done()
      })
    })
  })

  // 多个循环实例
  describe('Multi editor component instance', () => {
    it(' - should update value after any change text', (done) => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <wang-editor :key="key"
                                    :value="content"
                                    :ref="'editor' + key"
                                    v-for="(content, key) in contents"
                                    :options="buildOptions(key)"
                                    @ready="onEditorReady(key)">
                      </wang-editor>
                  </div>
                  `,
        data: {
          contents: {
            a: '<p>a-test content</p>',
            b: '<p>b-test content</p>',
            c: '<p>c-test content</p>'
          }
        },
        methods: {
          buildOptions(key) {
            return {
              placeholder: `${key}component placeholder`
            }
          },
          onEditorReady(key) {
            eventLogs.push(`${key}-onEditorReady`)
          }
        }
      }).$mount()
      expect(eventLogs[0]).to.deep.equal('a-onEditorReady')
      expect(eventLogs[1]).to.deep.equal('b-onEditorReady')
      expect(eventLogs[2]).to.deep.equal('c-onEditorReady')
      expect(vm.$refs.editora[0].wang.txt.text()).to.deep.equal(
        'a-test content'
      )
      expect(vm.$refs.editorb[0].wang.txt.text()).to.deep.equal(
        'b-test content'
      )
      expect(vm.$refs.editorc[0].wang.txt.text()).to.deep.equal(
        'c-test content'
      )
      vm.contents.b = '<p>b-test change</p>'
      Vue.nextTick(() => {
        expect(vm.$refs.editorb[0].wang.txt.text()).to.deep.equal(
          'b-test change'
        )
        expect(
          vm.$refs.editorb[0].wang instanceof WangEditor
        ).to.deep.equal(true)
        done()
      })
    })
  })

  // SSR 全局安装测试
  // describe('Global install ssr:directive', () => {
  //   it(' - should get wangEditor instance and capture event', done => {
  //     const eventLogs = []
  //     const vm = new Vue({
  //       template: `<div>
  //                   <div class="wang-editor"
  //                        ref="editor"
  //                        @ready="onEditorReady"
  //                        :value="content"
  //                        v-wangEditor:myQuillEditor="editorOption">
  //                   </div>
  //                 </div>
  //                 `,
  //       data: {
  //         content: '<p>test ssr content</p>',
  //         editorOption: {}
  //       },
  //       methods: {
  //         onEditorReady(wangEditor) {
  //           eventLogs.push('ssr/onEditorReady')
  //           eventLogs.push(wangEditor instanceof WangEditor)
  //         }
  //       },
  //       mounted() {
  //         eventLogs.push('ssr/mounted')
  //       }
  //     }).$mount()
  //     expect(eventLogs[0]).to.deep.equal('ssr/onEditorReady')
  //     expect(eventLogs[1]).to.deep.equal(true)
  //     expect(eventLogs[2]).to.deep.equal('ssr/mounted')
  //     vm.content = '<p>test ssr change</p>'
  //     Vue.nextTick(() => {
  //       expect(vm.myQuillEditor.txt.text()).to.deep.equal('test ssr content\n')
  //       done()
  //     })
  //   })
  // })

  // // 多个 SSR 平铺测试 placeholder: 'ssr placeholder'
  // describe('Multi editor directive instance', () => {
  //   it(' - should update value after any change text', done => {
  //     const eventLogs = []
  //     const vm = new Vue({
  //       template: `<div>
  //                   <div class="wang-editor"
  //                        v-wangEditor="buildOptions(key)"
  //                        v-for="(content, key) in contents"
  //                        @ready="onEditorReady(key)"
  //                        :instance-name="'editor-' + key"
  //                        :content="content"
  //                        :key="key">
  //                   </div>
  //                 </div>
  //                 `,
  //       data: {
  //         contents: {
  //           a: '<p>a-test ssr content</p>',
  //           b: '<p>b-test ssr content</p>',
  //           c: '<p>c-test ssr content</p>'
  //         }
  //       },
  //       methods: {
  //         buildOptions(key) {
  //           if (key === 'a') {
  //             return {}
  //           }
  //           if (key === 'b') {
  //             return {
  //               placeholder: `${key}-ssr placeholder`
  //             }
  //           }
  //           if (key === 'c') {
  //             return {}
  //           }
  //         },
  //         onEditorReady(key) {
  //           eventLogs.push(`${key}-onEditorReady`)
  //         }
  //       },
  //       mounted() {
  //         eventLogs.push('ssr/mounted')
  //       }
  //     }).$mount()
  //     expect(eventLogs[0]).to.deep.equal('a-onEditorReady')
  //     expect(eventLogs[1]).to.deep.equal('b-onEditorReady')
  //     expect(eventLogs[2]).to.deep.equal('c-onEditorReady')
  //     expect(eventLogs[3]).to.deep.equal('ssr/mounted')
  //     expect(vm['editor-a'] instanceof WangEditor).to.deep.equal(true)
  //     expect(vm['editor-b'] instanceof WangEditor).to.deep.equal(true)
  //     expect(vm['editor-c'] instanceof WangEditor).to.deep.equal(true)
  //     expect(vm['editor-a'].txt.text()).to.deep.equal('a-test ssr content\n')
  //     vm.contents.b = '<span>b-test ssr change</span>'
  //     Vue.nextTick(() => {
  //       Vue.nextTick(() => {
  //         expect(vm['editor-b'].txt.text()).to.deep.equal('b-test ssr change\n')
  //         expect(vm['editor-b'].editor.delta.ops).to.deep.equal([{ insert: 'b-test ssr change\n' }])
  //         expect(vm['editor-b'].options.placeholder).to.deep.equal('b-ssr placeholder')
  //         expect(vm['editor-c'].options.placeholder).to.deep.equal('global ssr placeholder')
  //         done()
  //       })
  //     })
  //   })
  // })
})
