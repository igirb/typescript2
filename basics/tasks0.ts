let num:  number = 10;

console.log(num);

function add(a: number, b: number) : number {
    return a + b;
}

let result = add(1, 2);

console.log(result);

interface Person {
    name: string;
    age: number;
    greet(message: string): void
}

let person1: Person = {
    name: 'Will Smith',
    age: 50,
    greet (message) {
        console.log(`${message}: ${this.name}`)
    }
}

person1.greet('Hello, my name is');

class Person2 {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(message: string) : void {
        console.log(message);
    }
}

let person2 = new Person2('Will Smith', 50);

person2.greet('Hi');

type UserId = number;

let userID: UserId = 12;

type Combinable = string | number;

let c: Combinable = 'hello';
let d: Combinable = 1;
//let e: Combinable = true;

type User = { name: string; age: number };
type Admin = { permission: string[] };

type UserWithRole = User & Admin;

// let incorrectUser: UserWithRole = {
//     name: 'Gipsz Jakab',
//     age: 55
// }

let correctUser: UserWithRole = {
    name: "Bob",
    age: 23,
    permission: ['read', 'write', 'admin']
}

const numbers: number[] = [1, 2, 3, 4, 5];

numbers.push(6);
console.log(`correct numbers: ${numbers}`);
//numbers.push("6");
console.log(`incorrect numbers: ${numbers}`); //after conversion to js will still run - have to be careful

//if you want your function to accept any type:
function firstElement<T>(arr: T[]): T {
    return arr[0];
}

const names: string[] = ['Annamari', 'Béla', 'Cecil'];
console.log("first element of names: " + firstElement(names));

const nbrs: number[] = [1, 2, 3, 4];
console.log("first element of nbrs: " + firstElement(nbrs));

function swap<T>(a: T, b: T): [T, T] {
    return [b, a];
}

console.log(swap('a', 'b'));

//Narrowing
interface Circle {
    kind: 'circle';
    radius: number;
}

interface Square {
    kind: 'square';
    side: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
    if(isCircle(shape)) {
        return Math.PI * Math.pow(shape.radius, 2);
    } else {
        return Math.pow(shape.side, 2);
    }
}

function isCircle(shape: Shape): shape is Circle {
    return shape.kind === 'circle';
}

/* const ourTuple: [id: number, name: string] = [4, "Lola"];
ourTuple[0]
const ourTupl: [number, string] = [4, "Lola"];
const ourT: [number, string] = ["gdfg", 5]; */


class Dog{
  name: string;
  age: number;
}


let dog = new Dog();

console.log(dog);


dog.name = "Bill";
dog.age = 2;

console.log(dog);


