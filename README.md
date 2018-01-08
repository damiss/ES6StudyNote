# ES6 个人学习笔记
> 主要记录一些比较常用的以及一些自己比较难以去理解的东西，主要参考的是阮一峰前辈的[ECMAScript 6 入门](http://es6.ruanyifeng.com)。本笔记内容仅代表个人，作为个人学习使用。

## 变量声明
ES5 只有两种声明变量的方法  
ES6 有6种  
`var` `function` `let` `const` `import` `class`

`const` 命令  
`const` 声明一个只读的**常量**,一旦申明,常量的值不能改变,且需要立即初始化,也是在块级作用域内有效。  
`const` 保存的只是一个指针，并不能保证指针指向的数据结构是否发生改变  
因此,将一个对象声明为常量必须非常小心  
`const foo = Object.freeze({});`  
冻结对象

## 顶层对象属性
顶层对象属性
顶层对象，在浏览器环境指的是window对象，在node指的是global对象，
ES5中 顶层对象和全局变量是一样的；
``` js
window.a = 1;
a // 1

a = 2;
window.a // 2
```
上述代码 全局和顶层是一样的

## 变量的解构赋值：
1.数组的结构：
``` js
let a = 1;
let b = 2;
let c = 3;

//ES6:
let [a,b,c] = [1,2,3]
/* 上述代码表示，可以从数组中提取值，按照对应位置，对变量赋值解构不成功 将返回undefined */

//栗子🌰
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError

let [arr1,...arr] = [1,2,3,4,5,6];
console.log(arr);
let [foo] = [];
let [bar, foo] = [1];
```
            
2.对象的解构赋值：
> 对象的解构与数组有一个不同，数组必须按照顺序来，而对象的属性没有次序。
``` js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```        
先找到同名属性，再赋值给对应的变量，***真正赋值的是后者，不是前者，这是本质上的区别***， 找到同名属性再赋值

3.字符串的结构赋值：
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
``` js
let {length: len} = "hello";
console.log(len); // 5
//高级了有木有
```       
解构赋值的规则是，只要等号右边的值不是对象或者数组，就会将其转换成布尔值，undefined和null无法转为对象 因此会报错  

同样 函数参数也可以进行解构
 ``` js
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
 ```       
参数作为数据 传入函数，隐性将数值赋予给变量   

undefined就会触发函数参数的默认值。
``` js
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```     
变量的解构赋值用途    
``` js
let x = 1;
let y = 2;
[x, y] = [y, x];     
```
函数参数的定义：       
``` js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});  
``` 
提取JSON数据:
``` js
let jsonData = {
id: 42,
status: "OK",
data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```           
遍历map：            
``` js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for(let [key] of map){
    console.log(key + ' is ' + key)
}
// first is first
// second is second
```            
字符串扩展：
``` js
// 字符串的遍历器接口
// 可以使用for...of循环遍历
for(let codePoint of 'foo') {
    console.log(codePoint)
}
// f
// o
// o
```
函数参数的默认值：
``` js
function Point(x = 0, y 0) {
    this.x = x;
    this.y = y;
}
var p = new Point();
// p { x: 0, y: 0 }
```
err:参数变量是默认声明的，所以不能用let或const再次声明。  
err:使用参数默认值时，函数不能有同名参数。 

## Map
> `map` 方法会给原数组中的每个元素都按顺序调用一次  `callback` 函数。
`callback` 每次执行后的返回值（包括 `undefined`）组合起来形成一个新数组。
`callback` 函数只会在有值的索引上被调用；
那些从来没被赋过值或者使用 `delete` 删除的索引则不会被调用。     
``` js
let array = arr.map(function callback(currentValue, index, array) { 
    // Return element for new_array 
}[, thisArg])
```              


                

                    
                    
