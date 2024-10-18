var num = 10;
console.log(num);
function add(a, b) {
    return a + b;
}
var result = add(1, 2);
console.log(result);
var person1 = {
    name: 'Will Smith',
    age: 50,
    greet: function (message) {
        console.log("".concat(message, ": ").concat(this.name));
    }
};
person1.greet('Hello, my name is');
var Person2 = /** @class */ (function () {
    function Person2(name, age) {
        this.name = name;
        this.age = age;
    }
    Person2.prototype.greet = function (message) {
        console.log(message);
    };
    return Person2;
}());
var person2 = new Person2('Will Smith', 50);
person2.greet('Hi');
var userID = 12;
var c = 'hello';
var d = 1;
// let incorrectUser: UserWithRole = {
//     name: 'Gipsz Jakab',
//     age: 55
// }
var correctUser = {
    name: "Bob",
    age: 23,
    permission: ['read', 'write', 'admin']
};
var numbers = [1, 2, 3, 4, 5];
numbers.push(6);
console.log("correct numbers: ".concat(numbers));
//numbers.push("6");
console.log("incorrect numbers: ".concat(numbers)); //after conversion to js will still run - have to be careful
//if you want your function to accept any type:
function firstElement(arr) {
    return arr[0];
}
var names = ['Annamari', 'Béla', 'Cecil'];
console.log("first element of names: " + firstElement(names));
var nbrs = [1, 2, 3, 4];
console.log("first element of nbrs: " + firstElement(nbrs));
function swap(a, b) {
    return [b, a];
}
console.log(swap('a', 'b'));
function getArea(shape) {
    if (isCircle(shape)) {
        return Math.PI * Math.pow(shape.radius, 2);
    }
    else {
        return Math.pow(shape.side, 2);
    }
}
function isCircle(shape) {
    return shape.kind === 'circle';
}
/* const ourTuple: [id: number, name: string] = [4, "Lola"];
ourTuple[0]
const ourTupl: [number, string] = [4, "Lola"];
const ourT: [number, string] = ["gdfg", 5]; */
var Dog = /** @class */ (function () {
    function Dog() {
    }
    return Dog;
}());
var dog = new Dog();
console.log(dog);
dog.name = "Bill";
dog.age = 2;
console.log(dog);
