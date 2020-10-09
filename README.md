[![npm Version][npm version badge]][npm page]
[![GitHub stars](https://img.shields.io/github/stars/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/stargazers)
[![Build Status](https://travis-ci.com/awamwang/vue-wangeditor-awesome.svg?branch=master)](https://travis-ci.com/awamwang/vue-wangeditor-awesome)
[![GitHub issues](https://img.shields.io/github/issues/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/issues)
[![GitHub forks](https://img.shields.io/github/forks/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome)

# vue-wangeditor-awesome

[English Doc](README.md)|[中文文档](README.zh_CN.md)

Vue component for rich text editing tool [wangEditor](https://github.com/wangeditor-team/wangEditor)

<!--ts-->
   * [vue-wangeditor-awesome](#vue-wangeditor-awesome)
      * [Install](#install)
      * [Usage](#usage)
         * [global components](#global-components)
         * [local components](#local-components)
      * [Features](#features)
      * [API](#api)
         * [global options](#global-options)
         * [options prop](#options-prop)
         * [more props](#more-props)
            * [disabled-menus](#disabled-menus)
            * [split-layout](#split-layout)
         * [Methods](#methods)
            * [getJSON](#getjson)
            * [clear](#clear)
         * [Events](#events)
            * [ready](#ready)
            * [input](#input)
            * [change](#change)
            * [blur](#blur)
            * [focus](#focus)
      * [Themes](#themes)
      * [ChangeLog](#changelog)
      * [More](#more)
         * [Images](#images)
         * [About version](#about-version)

<!-- Added by: wangmeng, at: 2020年10月 9日 星期五 22时23分32秒 CST -->

<!--te-->

## Install

NPM

```shell
npm install vue-wangeditor-awesome --save
# or
yarn add vue-wangeditor-awesome
```

## Usage

### global components

```js
import Vue from 'vue'
import VueWangEditor from 'vue-wangeditor-awesome'

Vue.use(VueWangEditor, /* { default global options } */)
```

### local components

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
- [Separation of menu and editing area](https://www.kancloud.cn/wangfupeng/wangeditor3/335771) feature, which is enabled through the [splitLayout](#split-layout) property

## API

Configure via component props，also expose some wangEditor's methods and events

### global options

The options passed to Vue.use(), except for `directiveName`, others will be the default values configured for wangEditor.

`directiveName` is used to specify the name of the Vue component.

```js
Vue.use(VueWangEditor, {
  directiveName: 'wangEditor'
})

// in template
`<wang-editor v-model="content"></wang-editor>`
```

### options prop

The `options` attribute will be merged with the global options, more props below. Finally assign merged result to the `customConfig` of wangEditor, used as the final configuration.

### more props

For convenience, hack(using `$attrs`) [wangEditor's customConfig](https://www.kancloud.cn/wangfupeng/wangeditor3/335776) to component's props.  For example, the following `menus`, `colors`.

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

As a easier way to customize menus (toolbar), use `disabled-menus` prop to remove item from the default menus.

```vue
<WangEditor v-model="content" :options="options" :disabled-menus="['video']" @change="onEditorChange" ref="myEditor">
</WangEditor>
```

#### split-layout

Use the `split-layout` prop to support [Separation of menu and editing area](https://www.kancloud.cn/wangfupeng/wangeditor3/335771) feature.

```vue
<WangEditor v-model="content" :options="options" split-layout :disabled="false" @change="onEditorChange" class="editor c-scroll" ref="myEditor">
</WangEditor>
```

### Methods

#### getJSON

Expose the `getJSON` method of wangEditor, reference to [获取 JSON](https://www.kancloud.cn/wangfupeng/wangeditor3/455792)

#### clear

Expose the `clear` method of wangEditor, use to clear the content

### Events

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



[build badge]: https://travis-ci.com/awamwang/vue-wangeditor-awesome.svg?branch=master
[build page]: https://travis-ci.com/awamwang/vue-wangeditor-awesome
[license badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license page]: https://github.com/awamwang/node-readme-md/blob/master/LICENSE
[node page]: https://nodejs.org/
[node version badge]: https://img.shields.io/node/v/readme-md.svg?style=flat-square
[npm page]: https://www.npmjs.com/package/vue-wangeditor-awesome
[npm version badge]: https://img.shields.io/npm/v/vue-wangeditor-awesome.svg?style=flat-squar
