import { Editor } from '../../index'
import isActive from './is-active'
const { $ } = Editor

function addClass(editor, newClassList) {
  // if (editor.selection.isSelectionEmpty()) {
  //   return
  // }

  let dom = editor.selection.getSelectionContainerElem().elems[0]
  newClassList = newClassList.split(/\s+/).join(' ')
  if (newClassList.length) {
    dom.setAttribute('class', newClassList)
  } else {
    dom.removeAttribute('class')
  }
}

export default function (editor, lastClassList) {
  const inputIFrameId = 'input-iframe-addclass'
  const inputTextId = 'input-text-addclass'
  const btnOkId = 'btn-ok-addclass'

  const conf = {
    width: 300,
    height: 0,

    // panel 中可包含多个 tab
    tabs: [
      {
        // tab 的标题
        title: '插入class',
        // 模板
        tpl: `<div>
                  <textarea id="${inputIFrameId}" type="text" class="wang-code-textarea" placeholder="" style="height: 60px">${lastClassList.replace(
          /&quot;/g,
          '"'
        )}</textarea>
                  <div class="w-e-button-container">
                    <button id="${btnOkId}" class="right">
                    ${isActive(editor) ? '修改' : '插入'}
                    </button>
                  </div>
              </div>`,
        // 事件绑定
        events: [
          {
            selector: '#' + btnOkId,
            type: 'click',
            fn: () => {
              const $classListDom = document.getElementById(inputIFrameId)

              addClass(this.editor, $classListDom.value.trim())

              // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
              return true
            }
          }
        ]
      } // tab end
    ] // tabs end
  }

  return conf
}
