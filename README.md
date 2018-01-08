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
数组过滤
``` js
// ES5 写法
var arr2 = [2,5,78,36,10,11];
function isBig(value) {
    return value >= 10;
}
var filtered = arr2.filter(isBig);
console.log(filtered);

// ES6 写法
const isBig = value => value >=10;
let [...spraed] = [2,5,78,36,10,11];
let filtered = spraed.filter(isBig);
console.log(filtered);
// [78, 36, 10, 11]
``` 
## Set
`Map` 数据结构            
JavaScript的对象(Object)，本质上是键值对的集合(Hash结构)，但是传统上只能用字符串当作键
            
``` js
const m = new Map();
const o = {p: "hello"};
m.set(o,'content');//用get方法读取这个键
m.get(o);//'content'
```
Map可以将对象设置为键（键值对）
### Set数据结构
类似于数组 但是 成员值都是唯一的
``` js
const s = new Set();
console.log(s);
[1,2,3,4,5,5,5,6,7,7,7].forEach(x => s.add(x));
for(let i of s){
    console.log(i)
}
```
上述代码通过add方法向set结构加入成员 并且不重复  

Set函数可以接受一个数组做为参数  

方法：
`add(value)`：添加某个值，返回Set结构本身。  
`delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。  
`has(value)`：返回一个布尔值，表示该值是否为Set的成员。  
`clear()`：清除所有成员，没有返回值。  

遍历的四种方法：  
`keys()`：返回键名的遍历器  
`values()`：返回键值的遍历器  
`entries()`：返回键值对的遍历器  
`forEach()`：使用回调函数遍历每个成员  
    
**Set结构没有键名，只有键值（可以说键名==键值）因此 keys方法和values是一样的**
``` js        
//keys方法
let set = new Set(['red','green','blue']);
for(let item of set.keys()){
    console.log(item)
}
// red
// green
// blue

//values方法
for(let item of set.values()){
    console.log(item);
}
// red
// green
// blue

// 结论表明的确一样
```
**Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。**
``` js
Set.prototype[Symbol.iterator] === Set.prototype.values
// true

// 这就意味着 可以省略values方法 直接用for...of循环遍历set结构
let set = new Set(['red','green','blue']);
for(let x of set){
    console.log(x)
}
```
foreach()  
Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值
``` js
let set = new Set([1,2,3]);
set.forEach((value,key) => console.log( value * 2));
// 2
// 4
// 6
```
上述方法就是对set的value进行某种操作        
 ``` js
//遍历的应用
let set = new Set(['red','green','blue']);
let arr = [...set];
console.log(arr)
// 将扩展运算符和set同时使用 可以连接数组

// 数组去重
let arr = [3,4,5,5,6,7,7];
let unique = [...new Set(arr)];
console.log(unique)

// 数组的 map和 filter 方法也可以用于Set
let set = new Set([1,2,3,4]);
set = new Set([...set].map(x => x * 2));
// 返回的Set结构{2,4,6,8}

let set = new Set([1,2,3,4,5,6]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回的Set结构 {2,4,6}

// 使用Set实现 合集 交集 差集
let a = new Set([1,2,3]);
let b = new Set([4,3,2]);

// 并集
let un = new Set([...a,...b]);
console.log(un);
// 交集
let ex = new Set([...a].filter(x => b.has(x)));
let xe = new Set([...a].filter(x => !b.has(x)));

// WeakSet 是一个构造函数 创建一个WeakSet数据结构

const ws = new WeakSet();
// 作为构造函数，可以接收数组 或者 类似数组对象作为参数，该数组的成员 都会成为WeakSet实例对象的成员
const a = [['a',1],['b',4]];
const ws2 = new WeakSet(a);
console.log(ws2)
// 只能是对象
// WeakSet的三种方法
WeakSet.prototype.add(value)// 向 WeakSet 实例添加一个新成员。
WeakSet.prototype.delete(value)// 清除 WeakSet 实例的指定成员。
WeakSet.prototype.has(value)// 返回一个布尔值，表示某个值是否在 

// WeakSet没有size属性，没有办法遍历它的成员。
 ```      
## Proxy:
`proxy` 用于修改默写操作的默认行为，等同于在语言层面上做出修改，属于一种元编程

`proxy` 可以理解成在目标对象之前架设一层“拦截”，外界对该对象进行访问，都会先进行过滤  
以下代码为重写 `Proxy` 的 `get` 和 `set` 方法
``` js
var person = {
    name: "张三"
};

var proxy = new Proxy(person, {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
});

proxy.name // "张三"
proxy.age // 抛出一个错误

//Proxy 的实例方法 get()用于拦截某个属性的读取操作

var person = {
    "name": "zhw"
};

var proxy = new Proxy(person,{
    get: function(target,property){
        if(target[property]){
            return target[property];
        }else {
            console.log("没有该属性")
        }
    }
})
//proxy.age
//如果没有拦截器 访问的对象没有该属性 会显示undefined
//new Proxy(参数1，参数2) 参数1操作的对象 参数2：拦截行为
var obj = new Proxy({},{
    get: function(target, key, receiver){
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver){
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
    }
});
obj.count123 = 1;
++obj.count123;
obj.count123;

//拦截读取属性的行为
var proxy = new Proxy({},{
    get: function(target, property){
        return 22;
    }
});
proxy.age;//自我理解：当设置拦截后，所有访问的方法全部指向get方法(此时 age指向 get) 因此对对象的访问通过get方法来拦截住了。
```
生成Proxy实例  
``` js
var proxy = new Proxy(target,handler)
```
`target` 参数表示需要拦截的对象 `handler` 参数也是个对象 用来定义拦截行为
如果 `handler` 没有进行任何设置 那将直接访问对象
一个技巧是将 `Proxy` 对象，设置到 `object.proxy` 属性，从而可以在 `object` 对象上调用。

## Symbol
1.概述 `ES5` 的对象属性名都是字符串，这容易造成属性名 的冲突。比如，我使用了一个他人提供的对象，但又想为这个对象添加新的方法，新方法的名字就可能与现有的方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 `ES6` 引入 `Symbol` 的原因。

`ES6` 引入了一种新的原始数据类型 `Symbol`，表示独一无二的值。他是 `JavaScript` 语言的第七种数据类型，前六种是：`undefined`、`null`、`Boolean`、`String`、`Number`、`Object`。

*Symbol* 值通过 *Symbol* 函数生成，就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型，凡是属性名属于 *Symbol* 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
``` js
let s = Symbol();
console.log(typeof s);
//"symbol" 类型
//上面的代码中，变量s就是一个独一无二的值。typeof运算符的结果，表明变量s是Symbol数据类型，而不是字符串之类的其他类型。
//****
//
```
Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了控制台显示，或者转为字符串是，比较容易区分。
``` js
var s1 = Symbol("foo1");
var s2 = Symbol("bar");
console.log(s1)
//上述代码 如果不加入参数，输出的都是Symbol 而加入参数后 就可以区分
```
**注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。也就是说，由于Symbol值不是对象，所以不能添加属性。基本上，他是一个类似于字符串的数据类型。**  

如果Symbol的参数是一个对象，就会调用该对象的toString方法，将其转换为字符串，然后才生成一个Symbol值。
``` js
const obj = {
    toString() {
        return "hi"
    }
};
const ym = Symbol(obj);

console.log(ym)
// Symbol(hi)
```            
**注意，Symbol参数知识表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。**
``` js
//无参数情况
var s1 = Symbol();
var s2 = Symbol();

console.log(s1 === s2)
//false

var a1 = Symbol("foo");
var a2 = Symbol("foo");

console.log(a1 === a2);
//false
//证明：参数仅仅是一个描述 然而返回值依然不一样！

//Symbol值不能与其他类型的值进行运算，会报错（踩过坑）；
var sym = Symbol("i want add");

console.log("i want write" + sym);
//TypeError: Cannot convert a Symbol value to a string
//but!!神奇是是！Symbol值可以显式转换为字符串

var smy2 = Symbol("hello!!");

console.log(String(smy2));
//'Symbol(hello!!)'

console.log(smy2.toString());
//'Symbol(hello!!)'

//结论：Symbol值 可以显式转为字符串
//另外 Symbol值 可以转换为boolean，but not number
```  

``` js
// 作为属性名的 Symbol
// 对于每一个Symbol值都不相等，这就意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现重复的相同的属性名。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键不小心被改写或者直接覆盖。
var mySym = Symbol();
var a = {};
a[mySym] = "hello!!!";

var a = {
    [mySym]: 'hello!!!'
}

var a = {};
Object.defineProperty(a, mySym, { value: 'hello!!!'});
console.log(a[mySym]);
// "hello!!!"
```
以上三种写法 得到同样的结果  
上述代码通过放括号结构 和 `Object.defindProperty`,将对象的属性名指定为一个 `Symbol` 值。  
**注意 `Symbol` 值作为对象的属性名不能用点运算符**
``` js
var mySym = Symbol();

var a = {};
a.mySym = "hello!!!";

console.log(a[mySym]);
//undefined
console.log(a["mySym"])//通过字符串属性可以获取
```
使用点运算符 导致 `mySym` 其实是一个字符串属性，而不是一个 `Symbol` 值属性，因此  `undefined`

因此 在对象内部，使用 `Symbol` 值定义属性时，`Symbol` 值必须放在方括号之中才可以！！！

``` js
let s = Symbol();

let obj = {
    [s]: function(arg) { return arg }
};

console.log(obj[s](123));
```
上述代码 如果 `s` 不放在方括号中，该属性的键名就是一个字符串 而不是 `s` 所代表的 `symbol` 值  
采用增强的对象写法 上述代码的obj对象可以写的更加简洁一点
``` js
let s = Symbol();
let obj = {
    [s](arg){ return arg }
}
console.log(obj[s](12212121))

const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();
function getComplement(color){
    switch(color){
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        
        default:
            throw new Error("Undefined color");
    }
}
```         
常量使用 `Symbol` 值最大的好处，就是其他任何值都不可能有相同的值，因此 可以保证上述`switch` 语句可以保证运行  
有一点要注意，`Symbol` 值作为属性名的时候，该属性是公开的属性，不是私有属性

实例： 消除模数字符串
> 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该消除魔术字符串，改由含义清晰的变量来代替；
``` js
function getArea(shap, options) {
    var area = 0;

    switch(shap) {
        case 'Triangle':
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}
getArea('Triangle', { width: 20, height: 20 })//强耦合的魔术字符串

//消除魔术字符串 就把它写成一个变量
var shapeType = {
    triangle: 'Triangle'
}

function getArea(shape, options) {
    var area = 0;

    switch(shape) {
        case shapeType.triangle:
        area = .5 * options.width * options.height;
        break;
    }
    return area;
}
getArea(shapeType.triangle, { width:20, height: 20 })
```
属性名的遍历
> `Symbol` 作为属性名，该属性不会出现在 `for...in、for...of` 循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有`Symbol`属性名。
``` js
//Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'hello';
obj[b] = 'world';

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols)
// [Symbol(a), Symbol(b)]
```
下面这个例子 是 `for...in` 与 `Object` 方法的对比
``` js
var obj = {};
var foo = Symbol('foo');
Object.defineProperty(obj,foo,{
    value: "foobar",
})
for( var i in obj){
    console.log(i)
}
console.log(Object.getOwnPropertyNames(obj))
console.log(Object.getOwnPropertySymbols(obj))
```
`symbol` 属性  不能被 `for` 循环 只能同个 `getOwnPropertySymbols` 方法获得  

另一个新的`API`，`Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键和 `Symbol` 键名
``` js
let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
};

console.log(Reflect.ownKeys(obj))
// ["enum", "nonEnum", Symbol(my_key)]
```
由于以 `Symbol` 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法
``` js
var size = Symbol('size');
class Collection {
    constructor() {
        this[size] = 0;
    }

    add(item) {
        this[this[size]] = item;
        this[size]++;
    }

    static sizeOf(instance) {
        return instance[size];
    }
}

var x = new Collection();
console.log(Collection.sizeOf(x));//0

x.add('foo');
console.log(Collection.sizeOf(x));//1

console.log(Object.keys(x));//['0']

console.log(Object.getOwnPropertyNames(x));//['0']

console.log(Object.getOwnPropertySymbols(x));//Symbol(size)
```
`Symbol.for(),Symbol.keyFor()`

有时，我们希望重新使用同一个 `Symbol` 值，`Symbol.for` 方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 `Symbol` 值。如果有，就返回这个 `Symbol` 值，否则就新建并返回一个该字符串为名称的 `Symbol` 值
``` js
var s1 = Symbol.for("foo");
var s2 = Symbol.for("foo");

console.log( s1 === s2 );//true
//通过Symbol.for方法 其实是同一个值
```
> `Symbol.for()` 和` Symbol()` 这两种写法，都会生成新的 `Symbol`。他们的区别是，前者会被等级在全局环境中提供搜索，后者不会。`Symbol.for()` 不会每次调用就返回一个新的 `Symbol` 类型的值，而是会先检查给定的key是否已经存在，如果不存在，才会新建一个值
``` js
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1));//"foo"

var s2 = symbol("foo");
console.log(Symbol.keyFor(s2));//symbol is not defined

//上述代码中 for注册的symbol值是全局环境的
```

## Reflect

`Reflect` 对象与 `Proxy` 对象一样，也是 `ES6` 为了操作对象而提供的新 `API` 。`Reflect` 对象的设计目的有这样几个
1) 将 `Object` 对象的一些明显属于语言内部的方法(比如 `Object.defineProperty` )，放到 `Reflect` 对象上。现阶段，某些地方同时在 `Object` 和 `Reflect` 对象上部署，未来的新方法将只部署在 `Reflect` 对象上。也就是说，从 `Reflect` 对象上可以拿到语言内部的方法。  
2) 修改某些 `Object.defindProperty(obj, name, desc)` 在无法定义属性时，会抛出一个错误，而 `Reflect.defindProperty(obj, name, desc)` 则会返回 `false`
``` js
//老写法
try {
    Object.defineProperty(target, property, attributes);

} catch(e) {

}

//新写法
if(Reflect.defineProperty(target, property, attributes)) {

}else {
    
}
```
3) 让 `Object` 操作都变成函数行为。某些 `Object` 操作是命令式，比如 `name in obj` 和 `delete obj[name]`,而 `Reflect.has(obj, name)` 和`Reflect.deleteProperty(obj, name)` 让它们变成了函数行为。
``` js
'assign' in Object//true

Reflect.has(Object, 'assign'); //true
//两者相同
```            
4) `Reflect` 对象的方法与 `Proxy` 对象的方法一一对应，只要是 `Proxy` 对象的方法，就能在 `Reflect` 对象上找到对应的方法。这就让 `proxy` 对象可以方便地调用对应的`Reflect` 方法，完成默认行为，作为修改行为的基础。也就是说，不管 `proxy` 怎么修改默认行为，总可以在 `Reflect` 上获取默认行为。

``` js
Proxy(target, {
    set: function(target, name, value, receiver) {
        var success = Reflect.set(target, name, value, receiver); 
            if (success) {
                log('property ' + name + ' on ' + target + ' set on ' + value)
            }
        return success;
    }
})
```
上述代码中， `Proxy` 方法拦截 `target` 对象的属性赋值行为。它采用 `Reflect.set` 方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

``` js
var obj = {
    "name": "zhw"
};
var loggedObj = new Proxy(obj, {
    get( target, name) {
        console.log( 'get', target, name);
        return Reflect.get(target, name);
    },
    deleteProperty(target, name) {
        console.log('delete'+name);
        return Reflect.deleteProperty(target, name);
    },
    has(target, name) {
        console.log('has' + name);
        return Reflect.has(target, name);
    }
});

'name' in loggedObj;

delete loggedObj['name'];

'name' in loggedObj;

console.log(obj);
```
上述代码中，每一个 `Proxy` 对象的拦截操作 `(get,delete,has)` ,内部都调用对应的`Reflect` 方法，保证原生行为能正常执行。添加的工作，就是将每一个操作输出一行日志。
            
`Reflect.get(target, name, receiver)` `get` 方法查找并返回 `target` 对象的`name` 属性，如果没有该属性，则返回 `undefined`
```js
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
}

console.log(Reflect.get(myObject, "baz"))
```
如果 `name` 属性部署了读取函数 `(getter)`， 则读取该函数的 `this` 绑定 `receiver`
``` js
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
};

var myReceiverObject = {
    foo: 4,
    bar: 5,
}

console.log(Reflect.get(myObject, "baz", myReceiverObject));
// 9

//如果第一个参数不是对象，Reflect.get方法会报错
```
`set` 方法设置 `target` 对象的 `name` 属性等于 `value`
> `Reflect.set(target, name, value, receiver)`
``` js
var myObject = {
    foo: 1,
    set bar(value) {
        return this.foo = value;
    },
}

console.log(myObject.foo);// 1

Reflect.set(myObject, "foo", 22);

console.log(myObject.foo)// 22
```
如果 `name` 属性设置了赋值函数，则赋值函数的 `this` 绑定 `receiver`
``` js
var myObject = {
    foo: 1,
    set bar(value) {
        return this.foo = value;
    },
};

var myReceiverObject = {
    foo: 2222
}

Reflect.set(myObject, "foo", 3333, myReceiverObject);

console.log(myReceiverObject.foo, myObject.foo)
// myRceciverObjece = 3333; myObject.foo = 1;修改绑定的对象
```
**注意Reflect.set会触发Proxy.defineProperty拦截**

``` js

let p = {
    a: "a"
};

let handler = {
    set(target,key,value,receiver) {
        console.log('set');
        Reflect.set(target,key,value,receiver);
    },
    defineProperty(target,key,attributes) {
        console.log('defineProperty');
        Reflect.defineProperty(target,key,attributes);
    }
};

let obj = new Proxy(p, handler);

obj.a = "AAA";

console.log(obj.a);
//会同时触发 set 和 defineProperty
```
## Reflect.has(obj, name)            
`Reflect.has` 方法对应 `name in object` 里的 `in` 运算符
``` js
var myObject = {
    foo: 1,
};
console.log('foo' in myObject);//老写法

console.log(Reflect.has(myObject, 'foo'))//新写法

//Reflect.deleteProperty(obj,name)


//Reflect.deleteProperty方法等同于 delete obj[name],用于删除对象的属性
const myObj = { foo: 'bar' };

//老写法
delete myObj.foo;

Reflect.set(myObj, "del", "d");

console.log(myObj);

//新写法
Reflect.deleteProperty(myObj, 'del');
//该方法会返回一个布尔值。删除成功或者被删除的属性不存在 返回true，失败 或者依然存在 返回false

console.log(myObj);


//Reflect.construct(target, args)

//该方法等同于 new target(...args),这提供了一种不使用new，来调用构造函数的方法

function Greeting(name) {
    this.name = name;
};
//new 写法
const instance = new Greeting('张三');

//Reflect.construct写法
const instance = Reflect.construct(Greeting, ['zhw']);
```

## Promise
Promise的含义
> `Promise` 是异步编程的解决方案，比传统的解决方案————回调函数和事件————更合理和更强大。它由社区最早提出和实现，`ES6` 将其写进了语言标准，统一了用法，原生提供了`Promise` 对象。

所谓 `Promise` ，简单来说就是一个容器，里面保存着某个未来才会结束的事件(通常是一个异步操作)的结果。从语法上说， `Promise` 是一个对象，从它可以获取异步操作的消息。 `Promise` 提供统一的 `API` ，各种异步操作都可以用同样的方法进行处理。
            
1) 对象的状态不受外界影响。 `Promise` 对象代表一个异步操作，有三种状态：Pending(进行中)、Fulfilled（已成功）和Rejected（已失败）。只有异步操作的记过，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 `Promise` 这个名字的又来 表示其他手段无法改变
1) 一旦状态改变，就不会再变，任何时候都可以得到这个结果。 `Promise` 对象的状态改变，只有两种可能：从 `Pending` 变为 `Fulfiled` 和从 `Pending` 变为 `Rejected` 。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就成为 `Resolved` （已定型）。如果改变已经发生了，你再对 `Promise` 对象添加回调函数，也会立即得到这个结果

### `Promise` 基本用法
``` js
var promise = new Promise(function(resolve, reject) {
    if( true ) {
        resolve(value);
    }else {
        reject(error);
    }
})
```
`Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject` 。他们是两个函数，由 `Javascript` 引擎提供，不用自己部署。
``` js
promise.then(function(value) {

},function(error) {

});
//then方法可以接受两个回调函数作为参数。第一个回调函数是promise对象状态变为resolved时调用

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, "done");
    })
}

timeout(100).then((value) => {
    console.log(value)
})
```
上述代码 `timeout` 返回了一个 `Promise` 实例，表示过段时间才会反生的结果。过了指定时间 `promise` 实例状态变为 `resolved` ，就会触发 `then` 方法绑定回调函数 `promise` 新建后 就会立即执行
``` js
let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
});

promise.then(function(){
    console.log('Resolve');
});
console.log('Hi!!!')
```
上述代码 `Promise` 新建后立即执行，所以首先输出 `Promise` 然后，`then` 方法指定的回调函数，将在当前脚本所有同步任务执行完成后才会执行，所以 `Resolve` 最后输出
``` js
function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
        var image = new Image();
        
        image.onload = function() {
            resolve(image);
        };

        image.onerror = function() {
            reject( new Error( 'Could nont load image at' + url ) )
        };

        image.src = rul;
    })
}
loadImageAsync('sdfsdfsdf')

var myFirstPromise = new Promise(function(resolve, reject) {

setTimeout(function(){
    resolve('成功！！')
},300)
});

myFirstPromise.then(function(successMes) {
    //successMes 是通过resolve(...)的值传入的
    console.log("yeah!" + successMes)
})
```

            
            



            


                

                    
                    
