import { Editor } from '../../index'
import createPanelConf from './create-panel-conf'
import isActive from './is-active'
const { $, PanelMenu, Panel } = Editor

// const icon = 'w-e-icon-terminal'
const icon = ''

export default class AddClassMenu extends PanelMenu {
  static name = 'AddClass'

  constructor(editor) {
    super(
      $(
        `<div class="w-e-menu">
          <i class="${icon}">class</i>
        </div>`
      ),
      editor
    )
  }

  /**
   * 菜单点击事件
   */
  clickHandler() {
    // 弹出 panel
    let dom = this.editor.selection.getSelectionContainerElem().elems[0]
    this.createPanel(dom.getAttribute('class') || '')
  }

  /**
   * 创建 panel
   * @param
   */
  createPanel(lastClassList) {
    const conf = createPanelConf.bind(this)(this.editor, lastClassList)
    const panel = new Panel(this, conf)
    panel.create()
  }

  /**
   * 尝试修改菜单 active 状态
   */
  tryChangeActive() {
    if (isActive(this.editor)) {
      this.active()
    } else {
      this.unActive()
    }
  }
}
