# sky-drag-scale
An event-based global state management tool for vue, react, mini-program, etc.

一个基于原生js实现的拖拽/缩放（内容跟随缩放）/自适应屏幕的小型库，可以在Vue、React、小程序等任何地方使用。

## 如何使用呢？

### 1、npm安装依赖

```shell
npm install sky-drag-scale
```

### 2、（拖拽与缩放) 创建元素，把该元素传入到导出的函数即可

```js
const { drag }  = require('sky-drag-scale')
const box = document.getElementById(box)
drag(box)
```

### 3、（屏幕自适应）创建元素，把该元素传入到导出的函数即可

```js
const { selfAdaption }  = require('sky-drag-scale')
const box = document.getElementById(box)
selfAdaption(box)
```

