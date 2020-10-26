import { Editor } from '../../index'
const { $ } = Editor

export default function (editor) {
  const $selectionElem = editor.selection.getSelectionContainerElem()
  if ($selectionElem && editor.$textElem.equal($selectionElem)) {
    //避免选中多行设置
    return
  }
  let dom = $(editor.selection.getSelectionStartElem())
  dom = dom.elems[0]
  let classAttr = dom.getAttribute('class') || ''

  return classAttr.length
}
