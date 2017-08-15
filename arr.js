/* let numbers = [1,3,5,10];
let doubles = numbers.map((x) => {
    //字面意思 x绑定了numbers中的每个元素
    return x * 2;
});
console.log(doubles); */

/* 
    const 命令
    const 声明一个只读的常量,一旦申明,常量的值不能改变,且需要立即初始化,也是在块级作用域内有效。
    const 保存的只是一个指针，并不能保证指针指向的数据结构是否发生改变
    const foo = Object.freeze({});
    冻结对象
*/
/* 
    ES5 只有两种什么变量的方法
    ES6 有6种
    var function let const import class
*/
/* const foo = {};
foo.prop = 123;
foo.prop */
/* 
    顶层对象属性
        顶层对象，在浏览器环境指的是window对象，在node指的是global对象，
        ES5中 顶层对象和全局变量是一样的；
        window.a = 1;
        a // 1

        a = 2;
        window.a // 2
        上述代码 全局和顶层是一样的

*/
/* 
    数组解构赋值：
        通常模式：
            let a = 1;
            let b = 2;
            let c = 3;

        ES6:
            let [a,b,c] = [1,2,3] 
        上述代码表示，可以从数组中提取值，按照对应位置， 对变量赋值   
        解构不成功 将返回undefined
        let [x = 1, y = x] = [];     // x=1; y=1
        let [x = 1, y = x] = [2];    // x=2; y=2
        let [x = 1, y = x] = [1, 2]; // x=1; y=2
        let [x = y, y = 1] = [];     // ReferenceError
       
        let [arr1,...arr] = [1,2,3,4,5,6];
        console.log(arr);
        let [foo] = [];
        let [bar, foo] = [1];

        对象的解构赋值：
            对象的解构与数组有一个不同，数组必须按照顺序来，而对象的属性没有次序。
            let { bar, foo } = { foo: "aaa", bar: "bbb" };
            foo // "aaa"
            bar // "bbb"

            let { baz } = { foo: "aaa", bar: "bbb" };
            baz // undefined
            对象的解构赋值=>let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
            先找到同名属性，再赋值给对应的变量，***真正赋值的是后者，不是前者，这是本质上的区别***
            找到同名属性再赋值 以下
            let {length: len} = "hello";
            console.log(len);
            解构赋值的规则是，只要等号右边的值不是对象或者数组，就会将其转换成布尔值，undefined和null无法转为对象 因此会报错

            同样 函数参数也可以进行解构

            [[1, 2], [3, 4]].map(([a, b]) => a + b);
            参数作为数据 传入函数，隐性将数值赋予给变量
            
            undefined就会触发函数参数的默认值。
            [1, undefined, 3].map((x = 'yes') => x);
            // [ 1, 'yes', 3 ]

            变量的解构赋值用途
                let x = 1;
                let y = 2;
                [x, y] = [y, x];
                函数参数的定义：
                    // 参数是一组有次序的值
                    function f([x, y, z]) { ... }
                    f([1, 2, 3]);

                    // 参数是一组无次序的值
                    function f({x, y, z}) { ... }
                    f({z: 3, y: 2, x: 1});    

                提取JSON数据:
                    let jsonData = {
                    id: 42,
                    status: "OK",
                    data: [867, 5309]
                    };

                    let { id, status, data: number } = jsonData;

                    console.log(id, status, number);
                    // 42, "OK", [867, 5309]
                
                遍历map：
                    var map = new Map();
                    map.set('first', 'hello');
                    map.set('second', 'world');
                    for(let [key] of map){
                        console.log(key + ' is ' + key)
                    }


                字符串扩展：
                    字符串的遍历器接口
                        可以使用for...of循环遍历
                        for(let codePoint of 'foo') {
                            console.log(codePoint)
                        }


                函数参数的默认值 

                    function Point(x = 0, y 0) {
                        this.x = x;
                        this.y = y;
                    }
                    var p = new Point();
                    p// { x: 0, y: 0 }
                    err:参数变量是默认声明的，所以不能用let或const再次声明。
                    err:使用参数默认值时，函数不能有同名参数。

*/

/* 
    let array = arr.map(function callback(currentValue, index, array) { 
        // Return element for new_array 
    }[, thisArg])
*/
/* 
    描述
    map 方法会给原数组中的每个元素都按顺序调用一次  callback 函数。
    callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 
    callback 函数只会在有值的索引上被调用；
    那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
*/

/* var arr2 = [2,5,78,36,10,11];
function isBig(value) {
    return value >= 10;
}
var filtered = arr2.filter(isBig);
console.log(filtered); */
//ES6写法
/* const isBig = value => value =>10;
let [...spraed] = [2,5,78,36,10,11];
let filtered = spraed.filter(isBig);
console.log(filtered); */

/* 
    块级作用域 do表达式
*/
/* let x = do {
    let t = f();
    t * t + 1;
};
console.log(x) */



/* 
    Set数据结构 类似于数组 但是 成员值都是唯一的
        const s = new Set();
        console.log(s);
        [1,2,3,4,5,5,5,6,7,7,7].forEach(x => s.add(x));
        for(let i of s){
            console.log(i)
        }
    上述代码通过add方法向set结构加入成员 并且不重复
    Set函数可以接受一个数组做为参数
    方法：
        add(value)：添加某个值，返回Set结构本身。
        delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
        has(value)：返回一个布尔值，表示该值是否为Set的成员。
        clear()：清除所有成员，没有返回值。
    遍历的四种方法：
        keys()：返回键名的遍历器
        values()：返回键值的遍历器
        entries()：返回键值对的遍历器
        forEach()：使用回调函数遍历每个成员
    
    *** Set结构没有键名，只有键值（可以说键名==键值）因此 keys方法和values是一样的 ***
        //keys方法
        let set = new Set(['red','green','blue']);
        for(let item of set.keys()){
            console.log(item)
        }
        //values方法
        for(let item of set.values()){
            console.log(item);
        }
        // 结论表明的确一样

        Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
        Set.prototype[Symbol.iterator] === Set.prototype.values
        //true
        这就意味着 可以省略values方法 直接用for...of循环遍历set结构
        let set = new Set(['red','green','blue']);
        for(let x of set){
            console.log(x)
        }

            foreach()
            Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值
            let set = new Set([1,2,3]);
            set.forEach((value,key) => console.log( value * 2));
            上述方法就是对set的value进行某种操作
            
            //遍历的应用
            let set = new Set(['red','green','blue']);
            let arr = [...set];
            console.log(arr)
            将扩展运算符和set同时使用 可以连接数组

            //数组去重
            let arr = [3,4,5,5,6,7,7];
            let unique = [...new Set(arr)];
            console.log(unique)
            
            //数组的 map和 filter 方法也可以用于Set
            let set = new Set([1,2,3,4]);
            set = new Set([...set].map(x => x * 2));
            //返回的Set结构{2,4,6,8}

            let set = new Set([1,2,3,4,5,6]);
            set = new Set([...set].filter(x => (x % 2) == 0));
            //返回的Set结构 {2,4,6}

            //使用Set实现 合集 交集 差集
            let a = new Set([1,2,3]);
            let b = new Set([4,3,2]);

            //并集
            let un = new Set([...a,...b]);
            console.log(un);
            //交集
            let ex = new Set([...a].filter(x => b.has(x)));
            let xe = new Set([...a].filter(x => !b.has(x)));

            //WeakSet 是一个构造函数 创建一个WeakSet数据结构

            const ws = new WeakSet();
            //作为构造函数，可以接收数组 或者 类似数组对象作为参数，该数组的成员 都会成为WeakSet实例对象的成员
            const a = [['a',1],['b',4]];
            const ws2 = new WeakSet(a);
            console.log(ws2)
            //只能是对象
            //WeakSet的三种方法
            WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
            WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
            WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 

            WeakSet没有size属性，没有办法遍历它的成员。


        Map:
            JavaScript的对象(Object)，本质上是键值对的集合(Hash结构)，但是传统上只能用字符串当作键
            
            const m = new Map();
            const o = {p: "hello"};
            m.set(o,'content');//用get方法读取这个键
            m.get(o);//'content'

            Map可以将对象设置为键（键值对）

        
        Proxy:
            proxy用于修改默写操作的默认行为，等同于在语言层面上做出修改，属于一种元编程

            proxy可以理解成在目标对象之前架设一层“拦截”，外界对该对象进行访问，都会先进行过滤
            //以下代码为重写Proxy的get和set方法





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
            
*/
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

//生成Proxy实例
//var proxy = new Proxy(target,handler)
// target参数表示需要拦截的对象 handler参数也是个对象 用来定义拦截行为
// 如果handler没有进行任何设置 那将直接访问对象
//一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
