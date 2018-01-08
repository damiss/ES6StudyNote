// console.log([[1, 2], [3, 4]].map(([a, b]) => a + b))
/* let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number); */
/* var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key] of map) {
    console.log(key + ' is ' + key)
} */

/* for (let codePoint of 'foo') {
    console.log(codePoint)
} */
/* const isBig = value => value >= 10;
let [...spraed] = [2, 5, 78, 36, 10, 11];
let filtered = spraed.filter(isBig);
console.log(filtered); */

/* let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
    console.log(item)
} */

/* let set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2)); */
/* var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'hello';
obj[b] = 'world';

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols) */
/* var myObject = {
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

console.log(Reflect.get(myObject, "baz", myReceiverObject)); */

//`Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject` 。他们是两个函数，由 `Javascript` 引擎提供，不用自己部署。
