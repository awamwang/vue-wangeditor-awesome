

[wangEditor](https://www.wangeditor.com/)已经开启了v5版本，同时提供了官方的vue插件，请参考[安装](https://www.wangeditor.com/v5/for-frame.html#%E5%AE%89%E8%A3%85)

本项目不再继续更新！！！
------------------------

[npm Version][npm page]
[![GitHub stars](https://img.shields.io/github/stars/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/stargazers)
[![Build Status](https://travis-ci.com/awamwang/vue-wangeditor-awesome.svg?branch=master)](https://travis-ci.com/awamwang/vue-wangeditor-awesome)
[![GitHub issues](https://img.shields.io/github/issues/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/issues)
[![GitHub forks](https://img.shields.io/github/forks/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome)

# vue-wangeditor-awesome

[English Doc](README.md)|[中文文档](README.zh_CN.md)

Vue component for RichText editor [wangEditor](https://github.com/wangeditor-team/wangEditor)

[wangEditor version 4.0 document](http://www.wangeditor.com/doc/)

[toc]

## Install

### NPM

```shell
npm install vue-wangeditor-awesome --save
# or
yarn add vue-wangeditor-awesome
```

### Browser

Use the umd.js file in the `dist/`

```html
<script src="https://cdn.jsdelivr.net/npm/vue-wangeditor-awesome"></script>
or
<script src="https://cdn.jsdelivr.net/npm/vue-wangeditor-awesome/dist/vue-wangeditor-awesome.umd.js"></script>
```

## Usage

### global component

```js
import Vue from 'vue'
import VueWangEditor from 'vue-wangeditor-awesome'

Vue.use(VueWangEditor, /* { default global options } */)
```

### local component

```js
import { vueEditor } from 'vue-wangeditor-awesome'

export default {
  components: {
    vueEditor
  }
}
```

## Features

- All configurations and features of [wangEditor](https://github.com/wangeditor-team/wangEditor)
- feature, which is enabled through the [splitLayout](#split-layout) property
- Some custom menu extensions, refer to [Built-in custom menu (experimental stage)](#Built-in custom menu)

### Built-in custom menu

> experimental stage

For convenience, add some custom menu extensions, use [other-extended-menus](#other-extended-menus) to enable them

#### addClass

Modify the `class` attribute of the selected element

### Browser compatibility

Compatible with common PC browsers: Chrome, Firefox, Safar, Edge, QQ browser, IE11.

Mobile terminal is not supported.

## API

Configure via component props，also expose some methods and events of wangEditor.

### global options

The options passed to `Vue.use(),` except for `directiveName`, other props will be the default values configured for wangEditor.

use `directiveName` to specify the name of the Vue component.

```js
Vue.use(VueWangEditor, {
  directiveName: 'wangEditor'
})

// in template
`<wang-editor v-model="content"></wang-editor>`
```

### prop options

The `options` attribute will be merged with the global options, more props below. Finally assign merged result to the `config` of wangEditor, used as the final configuration.

### more props

For convenience, hack(using `$attrs`) [wangEditor&#39;s config](http://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/) to component's props.  For example, the following `menus`, `colors`.

> those configurations have the highest priority.

So you can:

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

As a easier way to customize menus (toolbar), use `disabled-menus` prop to remove item from the menus.
Apply after `config.excludeMenus`.

> Same as [`editor.config.excludeMenus`属性](http://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/01-%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8F%9C%E5%8D%95.html#editor.config.excludeMenus). Not applied at same time, will not be removed soon.

```vue
<WangEditor v-model="content" :options="options" :disabled-menus="['video']" @change="onEditorChange" ref="myEditor">
</WangEditor>
```

#### split-layout

Use the `split-layout` prop to support [Separation of menu and editing area](http://www.wangeditor.com/doc/pages/01-%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8/03-%E8%8F%9C%E5%8D%95%E5%92%8C%E7%BC%96%E8%BE%91%E5%8C%BA%E5%9F%9F%E5%88%86%E7%A6%BB.html) feature.

```vue
<WangEditor v-model="content" :options="options" split-layout :disabled="false" @change="onEditorChange" class="editor c-scroll" ref="myEditor">
</WangEditor>
```

#### highlight

Support code highlighting, Refer to [Code Highlight](http://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/07-%E4%BB%A3%E7%A0%81%E9%AB%98%E4%BA%AE.html)

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

Refer to [About Internationalization](#About Internationalization)

#### extended-menus

Refer to [Customized Extended Menu](http://www.wangeditor.com/doc/pages/11-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%89%A9%E5  %B1%95%E8%8F%9C%E5%8D%95/)

first, build an extended menu according to the method in the document

##### global options

```js
class AlertMenu {}

Vue.use(VueWangEditor, {
  extendedMenus: { alertMenu: AlertMenu }
})
```

##### component prop

Pass the key-value pair (Object, key extended menu name and value is extended menu class) into the `extended-menus` prop, and these extended menus will be registered when they are created

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

Specify which custom menus to enable

```vue
other-extended-menus=“true”
other-extended-menus=“[]”
```

### wangEditor props

#### selection

return `this.wang.selection`，参考[Selection Area API](http://www.wangeditor.com/doc/pages/08-%E5%B8%B8%E7%94%A8API/02-%E9%80%89%E5%8C%BA%E8%8C%83%E5%9B%B4API.html)

### Lifecycle hook

In order to fully customize the wangEditor instance, several hooks have been added

#### instanceCreated

Execute immediately after the wangEditor instance is created

`Function` type, accepts two parameters, if explicitly returns `false`, the subsequent process of wangEditor creating the editor will be terminated ( the create method not call), then call destroy.

| Name     | Description         | Component inner value |
| -------- | ------------------- | --------------------- |
| instance | wangEditor instance | this.wang             |
| options  | merged options      | this._options         |

You can modify the options in this hook, or perform some advanced operations, such as  [Customize tooltip](http://www.wangeditor.com/doc/pages/11-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%89%A9%E5%B1%95%E8%8F%9C%E5%8D%95/05-%E8%87%AA%E5%AE%9A%E4%B9%89tooltip.html)

```vue
// instanceCreated(this.wang, this._options)

    <WangEditor
      v-model="content"
      :before-ready=“doSomeConfig”
    >
    </WangEditor>
```

#### afterConfig

After the wangEditor is configured, and before calling create.  The config of wangEditor can be finally modified in this hook.

`Function` type, accepts two parameters, if explicitly returns `false`, the subsequent process of wangEditor creating the editor will be terminated ( the create method not call), then call destroy.

| Name     | Description                          | Component inner value |
| -------- | ------------------------------------ | --------------------- |
| instance | wangEditor instance                  | this.wang             |
| config   | config object of wangEditor instance | this.wang.config      |

### Methods

### Methods

#### append

After creating the editor, append content to it

#### insertHtml

Return to `this.wang.cmd.do`, refer to [Content Operation API](http://www.wangeditor.com/doc/pages/08-%E5%B8%B8%E7%94%A8API/03-%E5%86%85%E5%AE%B9%E6%93%8D%E4%BD%9CAPI.html)

#### getJSON

Expose the `getJSON` method of wangEditor, Refer to [获取 JSON](https://www.kancloud.cn/wangfupeng/wangeditor3/455792)

#### setJSON

Expose the `setJSON` method of wangEditor

#### clear

Expose the `clear` method of wangEditor, use to clear the content

### Events

When the callback of wangEidtor is not modified through `onxxx` options, the following events are emitted by default

Except for `input` and `change`, the parameters of other event callback are the wangEditor instance (this.wang)

#### ready

wangEditor instance is initialized

> Note that: the relevant DOM may not be rendered

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

## Themes

wangEditor has no official theme, you can use other editor's theme

```html
<WangEditor v-model="content" class="ql-editor"></WangEditor>

<div v-html="content" class="ql-editor"></div>
```

## ChangeLog

see [CHANGELOG.md](CHANGELOG.md)

## More

### Images

The `uploadImgShowBase64` option is turned on by default, so that ti support images with no extra configurations.

Better choice reffer to:

[wangEditor upload picture](https://www.kancloud.cn/wangfupeng/wangeditor3/335779)

### About version

Follow the [wangEditor](https://www.npmjs.com/package/wangeditor) version

### About internationalization

Passing i18next to prop `i18next` will enable the internationalization feature, refer to [Multilingual](http://www.wangeditor.com/doc/pages/12-%E5%A4%9A%E8%AF%AD%E8%A8%80/)

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

### About source-maps

The 4.0 npm package of wangEditor does not have source maps, so the component is temporarily unable to provide source maps

[build badge]: https://travis-ci.com/awamwang/vue-wangeditor-awesome.svg?branch=master
[build page]: https://travis-ci.com/awamwang/vue-wangeditor-awesome
[license badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license page]: https://github.com/awamwang/node-readme-md/blob/master/LICENSE
[node page]: https://nodejs.org/
[node version badge]: https://img.shields.io/node/v/readme-md.svg?style=flat-square
[npm page]: https://www.npmjs.com/package/vue-wangeditor-awesome
[npm version badge]: https://img.shields.io/npm/v/vue-wangeditor-awesome.svg?style=flat-squar
