[wangEditor](https://www.wangeditor.com/) has stared new V5 version, and the official Vue plug-in. Please go to [Install](https://www.wangeditor.com/v5/for-frame.html#%E5%AE%89%E8%A3%85).

## This project will no longer continue to be updated!!!

[npm Version][npm page]
[![GitHub stars](https://img.shields.io/github/stars/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/stargazers)
[![Build Status](https://travis-ci.com/awamwang/vue-wangeditor-awesome.svg?branch=master)](https://travis-ci.com/awamwang/vue-wangeditor-awesome)
[![GitHub issues](https://img.shields.io/github/issues/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/issues)
[![GitHub forks](https://img.shields.io/github/forks/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome)

# vue-wangeditor-awesome

[English Doc](README.md)|[中文文档](README.zh_CN.md)

中文富文本编辑工具[wangEditor](https://github.com/wangeditor-team/wangEditor)的 Vue 插件封装

[wangEditor 4.0 版本文档](http://www.wangeditor.com/doc/)

[toc]

## Install

### NPM

```shell
npm install vue-wangeditor-awesome --save
# or
yarn add vue-wangeditor-awesome
```

### Browser

使用 `dist/` 目录的 umd.js 文件（或者）

```html
<script src="https://cdn.jsdelivr.net/npm/vue-wangeditor-awesome"></script>
or
<script src="https://cdn.jsdelivr.net/npm/vue-wangeditor-awesome/dist/vue-wangeditor-awesome.umd.js"></script>
```

## Usage

### global register/全局组件

```js
import Vue from 'vue'
import VueWangEditor from 'vue-wangeditor-awesome'

Vue.use(VueWangEditor, /* { default global options } */)
```

### local import/局部引入

```js
import { vueEditor } from 'vue-wangeditor-awesome'

export default {
  components: {
    vueEditor
  }
}
```

## Features

- [wangEditor](https://github.com/wangeditor-team/wangEditor)的所有配置及功能（包括4.0版本新增特性）
- [菜单和编辑区域分离](http://www.wangeditor.com/doc/pages/01-%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8/03-%E8%8F%9C%E5%8D%95%E5%92%8C%E7%BC%96%E8%BE%91%E5%8C%BA%E5%9F%9F%E5%88%86%E7%A6%BB.html)特性，通过[splitLayout](#split-layout)属性开启
- 一些自定义menu扩展，参考[内置的自定义menu](#内置的自定义menu)

### 内置的自定义menu

> 实验阶段

为了方便，添加一些自定义menu扩展，通过[other-extended-menus](#other-extended-menus) prop启用

#### addClass

修改选中元素的class属性

### 浏览器兼容性

兼容常见的 PC 浏览器：Chrome，Firefox，Safar，Edge，QQ 浏览器，IE11。

不支持移动端。

## API

通过 props 配置，并暴露了 wangEditor 的一些 methods 和 events

### 全局options

在Vue.use中传入的options，除 `directiveName`外，其他会作为wangEditor配置的默认值。

`directiveName`用来指定Vue组件名称

```js
Vue.use(VueWangEditor, {
  directiveName: 'wangEditor'
})

// in template
`<wang-editor v-model="content"></wang-editor>`
```

### prop options

`options`属性会合并全局 options 后，在结合下面的更多属性，赋值给 wangEditor 的 `config`，产生最终配置。

### more props

为了方便，把[wangEditor 的 config](http://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/)属性也 hack(利用 `$attrs`)到组件的 props 中。例如下面的 `menus`、`colors`，这些配置的优先级最高。

所以你可以这么用

```vue
<WangEditor
  v-model="content"
  :options="options"
  debug
  :menus="['???']"
  :colors="['#000000', '#eeece0', '#1c487f', '#4d80bf', '#c24f4a', '#8baa4a', '#7b5ba1', '#46acc8', '#f9963b', '#ffffff']"
  :disabled="false"
  @change="onEditorChange"
  ref="myEditor"
>
</WangEditor>
```

#### disabled-menus

为了方便定制 menus(toolbar)，加了一个 `disabled-menus`prop，方便从 menus 中剔除。
在 `config.excludeMenus`后生效。

> 与wangEditor的[`editor.config.excludeMenus`属性](http://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/01-%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8F%9C%E5%8D%95.html#editor.config.excludeMenus)功能一致，但由于生效时机不同，暂时不会去掉这个属性

```vue
<WangEditor v-model="content" :options="options" :disabled-menus="['video']" @change="onEditorChange" ref="myEditor">
</WangEditor>
```

#### split-layout

添加 `split-layout`prop 属性，用来支持 menu 和 container 拆分创建。

```vue
<WangEditor v-model="content" :options="options" split-layout :disabled="false" @change="onEditorChange" class="editor c-scroll" ref="myEditor">
</WangEditor>
```

#### highlight

支持代码高亮，参考[代码高亮](http://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/07-%E4%BB%A3%E7%A0%81%E9%AB%98%E4%BA%AE.html)

```vue
<template>
		<WangEditor
      v-model="content"
      :options="options"
      :highlight="hljs"
    >
    </WangEditor>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai_sublime.css'
  
export default {
  data() {
    return {
      hljs
    }
  },
}
</script>
```

#### i18next

参考[关于国际化](#关于国际化)

#### extended-menus

参考[自定义扩展菜单](http://www.wangeditor.com/doc/pages/11-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%89%A9%E5%B1%95%E8%8F%9C%E5%8D%95/)，根据文档中的方法建立扩展menu

##### 全局使用

```js
class AlertMenu {}

Vue.use(VueWangEditor, {
  extendedMenus: { alertMenu: AlertMenu }
})
```

##### 组件prop

将扩展菜单名字-扩展菜单实现类的键值对（Object）传入 `extended-menus` prop，会在创建时注册这些扩展菜单

```vue
<template>
    <WangEditor
      v-model="content"
      :options="options"
      :menus="['newMenu']"
      :extended-menus="{newMenu: NewMenu}"
    >
    </WangEditor>
</template>

<script>
import { vueEditor, Editor } from 'vue-wangeditor-awesome/src/index'
const { BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = Editor.menuConstructors

class NewMenu extends BtnMenu {}
  
export default {
  data() {
    return {
      NewMenu
    }
  },
}
</script>
```

#### other-extended-menus

Boolean | Array

指定启用哪些组件提供的自定义menu

```vue
other-extended-menus=“true”
other-extended-menus=“[]”
```

### wangEditor props

#### selection

返回 `this.wang.selection`，参考[选区范围 API](http://www.wangeditor.com/doc/pages/08-%E5%B8%B8%E7%94%A8API/02-%E9%80%89%E5%8C%BA%E8%8C%83%E5%9B%B4API.html)

### 生命周期钩子

为了能全面定制wangEditor实例，添加了几个钩子

#### instanceCreated

在wangEditor实例创建后立即执行

`Function`类型，接受两个参数，如果明确返回 `false`，则终止wangEditor创建编辑器的后续过程（即不执行create方法），并执行销毁处理。

| 名称     | 描述             | 组件内部值    |
| -------- | ---------------- | ------------- |
| instance | wangEditor的实例 | this.wang     |
| options  | merge后的options | this._options |

可以在这个钩子中修改options，或者进行一些高级操作，例如[自定义 tooltip](http://www.wangeditor.com/doc/pages/11-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%89%A9%E5%B1%95%E8%8F%9C%E5%8D%95/05-%E8%87%AA%E5%AE%9A%E4%B9%89tooltip.html)

```vue
// instanceCreated(this.wang, this._options)

    <WangEditor
      v-model="content"
      :before-ready=“doSomeConfig”
    >
    </WangEditor>
```

#### afterConfig

在wangEditor的设置完毕后，调用create前执行。可以在这个钩子中对wangEditor的config进行最终修改。

`Function`类型，接受两个参数，如果明确返回 `false`，则终止wangEditor创建编辑器的后续过程（即不执行create方法），并执行销毁处理。

| 名称     | 描述                       | 组件内部值       |
| -------- | -------------------------- | ---------------- |
| instance | wangEditor的实例           | this.wang        |
| config   | wangEditor实例的config对象 | this.wang.config |

### Methods

把部分方法挂到了组件的methods中，其他方法可以通过vm.wang获取wangEditor实例后调用

#### append

创建编辑器之后，继续追加内容

#### insertHtml

返回 `this.wang.cmd.do`，参考[内容操作 API](http://www.wangeditor.com/doc/pages/08-%E5%B8%B8%E7%94%A8API/03-%E5%86%85%E5%AE%B9%E6%93%8D%E4%BD%9CAPI.html)

#### getJSON

暴露 wangEditor 的 `getJSON`方法，参考[获取 JSON](https://www.kancloud.cn/wangfupeng/wangeditor3/455792)

#### setJSON

暴露 wangEditor 的 `setJSON`方法

#### clear

暴露 wangEditor 的 `clear`方法，清除内容

### Events

在没有通过 `onxxx` options修改wangEidtor的回调时，默认emit 下面事件

除了 `input`和 `change`，其他事件回调的参数都是 wangEditor 实例(this.wang)本身

#### ready

wangEditor 实例初始化完毕

> 注意，可能相关 DOM 还没有渲染完成

#### input

```js
this.$emit('input', this._content)
```

#### change

```js
this.$emit('change', { html, text, wang })
```

#### blur

#### focus

## Themes/主题

wangEditor 没有官方主题

在使用时，可以借用其他主题

```html
<WangEditor v-model="content" class="ql-editor"></WangEditor>

<div v-html="content" class="ql-editor"></div>
```

## ChangeLog

see [CHANGELOG.md](CHANGELOG.md)

## 其他

### 图片

默认开启了 `uploadImgShowBase64`选项，这样可以 0 配置支持图标。

优化参考：

[wangEditor 上传图片](https://www.kancloud.cn/wangfupeng/wangeditor3/335779)

### 关于版本

跟随[wangEditor](https://www.npmjs.com/package/wangeditor)版本

### 关于国际化

把i18next传入prop `i18next`，会启用国际化特性，参考[多语言](http://www.wangeditor.com/doc/pages/12-%E5%A4%9A%E8%AF%AD%E8%A8%80/)

```vue
<template>
		<WangEditor
      v-model="content"
      :options="options"
      :i18next="i18n"
      lang="en"
    >
    </WangEditor>
</template>

<script>
import i18n from 'i18next'
  
export default {
  data() {
    return {
      i18n
    }
  },
}
</script>
```

### 关于source-maps

4.0的wangEditor npm包没有source maps，导致该组件也暂时无法提供source maps

[build badge]: https://travis-ci.com/awamwang/vue-wangeditor-awesome.svg?branch=master
[build page]: https://travis-ci.com/awamwang/vue-wangeditor-awesome
[license badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license page]: https://github.com/awamwang/node-readme-md/blob/master/LICENSE
[node page]: https://nodejs.org/
[node version badge]: https://img.shields.io/node/v/readme-md.svg?style=flat-square
[npm page]: https://www.npmjs.com/package/vue-wangeditor-awesome
[npm version badge]: https://img.shields.io/npm/v/vue-wangeditor-awesome.svg?style=flat-squar
