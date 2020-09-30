[![npm Version][npm version badge]][npm page] 
[![GitHub stars](https://img.shields.io/github/stars/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/stargazers)
[![Build Status](https://travis-ci.com/awamwang/vue-wangeditor-awesome.svg?branch=master)](https://travis-ci.com/awamwang/vue-wangeditor-awesome)
[![GitHub issues](https://img.shields.io/github/issues/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/issues)
[![GitHub forks](https://img.shields.io/github/forks/awamwang/vue-wangeditor-awesome.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/awamwang/vue-wangeditor-awesome)

# vue-wangeditor-awesome

中文富文本编辑工具[wangEditor](https://github.com/wangeditor-team/wangEditor)的Vue插件封装

先按照[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)的模式搭个架子出来

## Install

**NPM**

```shell
npm install vue-wangeditor-awesome --save

# or
yarn add vue-wangeditor-awesome
```

## API

API及使用方法继承了[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

### options prop

同vue-quill-editor

### otherConfig

同时为了方便，把[wangEditor的customConfig](https://www.kancloud.cn/wangfupeng/wangeditor3/335776)属性也放置hack(利用`$attrs`)到options中，方便使用。这些配置的优先级最高。

所以你可以这么用

```vue
    <WangEditor
      v-model="content"
      :options="options"
      :menus="['???']"
      :disabled="false"
      @change="onEditorChange"
      class="editor c-scroll"
      ref="myEditor"
    >
    </WangEditor>
```

#### disabled-menus

为了方便定制menu(toolbar)，加了一个`disabled-menus`prop，方便从默认的menus中剔除。

```vue
    <WangEditor
      v-model="content"
      :options="options"
      :disabled-menus="['video']"
      :disabled="false"
      @change="onEditorChange"
      class="editor c-scroll"
      ref="myEditor"
    >
    </WangEditor>
```

### events

同vue-quill-editor

## 主题

wangEditor没有官方主题

在预览时，可以借用其他主题

```html
<div class="ql-editor" v-html="content"></div>
```

## 其他

### 图片

默认开启了`uploadImgShowBase64`选项，这样可以0配置支持图标。

优化参考：

[wangEditor上传图片](https://www.kancloud.cn/wangfupeng/wangeditor3/335779)

### 关于版本

跟随wangEditor版本

[build badge]: https://travis-ci.com/awamwang/vue-wangeditor-awesome.svg?branch=master
[build page]: https://travis-ci.com/awamwang/vue-wangeditor-awesome
[license badge]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[license page]: https://github.com/awamwang/node-readme-md/blob/master/LICENSE
[node page]: https://nodejs.org/
[node version badge]: https://img.shields.io/node/v/readme-md.svg?style=flat-square
[npm page]: https://www.npmjs.com/package/vue-wangeditor-awesome
[npm version badge]: https://img.shields.io/npm/v/vue-wangeditor-awesome.svg?style=flat-squar