// @strict
// If you need help, here is the docs: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

// Exercise 1) Primitives and arrays

// TODO: remove the "any" type, and add a concrete type for these basic primitives
// How they are working, if you remove all type definitions? How inference is working here?

let price: any /* add the correctly type annotation here instead of any */
price = 100.5

let title: any /* add type annotation here */
title = "How to Hack NASA with HTML?"

let option: any /* add type annotation here */
option = true

let prices: any /* add type annotation here */
prices = [3, 5, 100, 3.5]

let titles: any /* add type annotation here */
titles = ["How to Hack NASA with HTML?", "Cat Taming Masterclass"]

let options: any /* add type annotation here */
options = [true, true, false]

// Exercise 2) Any

// Here we have a product, which type is an explicit any.
// Unfortunately we have here a cat instead. It is clearly seen,
// that everything is accepted, typescript basically switched off.
// We will got a lot of runtime errors and unexpected undefined
// here.

// TODO: Create a proper type definition based on the usage of the product,
//    correct the input data and the function usage below based on that.

const anyProduct: any = {name: 'Mr. Fluff', kind: 'British Shorthair', age: 4}
const productTitle = anyProduct.title
const priceWithTaxes = anyProduct.price * (1.25)
const upperCaseTitle = anyProduct.price.toUpperCase()

// Exercise 3) Anonymous Functions

// In JS we are putting anonymous functions to a lot of place, 
//  typically in the higher order functions like map. Typescript
//  can figure out the anonymous functions types based on the usage.

// TODO: correct the parameter's type of createKeysFromTitles. Spot out
//  how it is changing the map function's types. 
const titlesToConvert = ["How to Hack NASA with HTML?", "Cat Taming Masterclass"]
const createKeysFromTitles = (titles /* */) => {
    return titles.map(title => title.toLowerCase().replace(" ", "_").replace("?", ""))
}
const keys = createKeysFromTitles(titlesToConvert)

// Exercise 4) Union types

// We have a common Course type in our codebase, unfortunately
// it is not correctly typed, because some API endpoints return
// the price in a string other endpoints in number format.

// TODO: Change the Course interface to conform all possible formats.
//  (Check the type errors in the usages below.)
interface Course {
    title: string,
    price: number,
}

const checkoutCourse: Course = {
    title: "What You can Learn from Your Cat?",
    price: 100.0,
}
const shoppingCartCourse: Course = {
    title: "What You can Learn from your Cat?",
    price: "100.0"
}

// TODO: Ooops, after the Course interface is changed,
//  something is gone wrong here. Correct the function body for now
//  creatively, in the Narrowing chapter we will see a lot of
//  patterns to handle these cases.
const getTax = (course: Course) => {
    return course.price * 0.25
}

// Exercise 5) Types Aliases
//
// We can use type aliases with
// type keyword for any annotations.

// TODO: fill the Type Alias for the account object
//  based on the example object below. Spot out
//  the differences between the interface declarations.
//  Note type alias can be used for any type, not just
//  objects. Check the examples in the handbook.
type Account = {

}

const account: Account = {
    id: 5,
    name: "Awesome Account",
    currency: "USD",
}
const getAccountName = (account: Account) => account.name
// TODO: Interesting, here we are not using the Account Type Alias,
//  however the function is correctly typed, and accepts accounts.
//  Why?
const getCurrency = (account: {name: string, currency: string}) => account.currency

const accountName = getAccountName(account)
const accountCurrency = getCurrency(account)

// Exercise 6) Type Assertions
//
// It is possible to tell Typescript how to
// handle some data. Typically this data is 
// comes from the API.

// TODO: The fetch account method just fetch a general object,
//  In our application we trust in the API. Assert it to an 
//  Account type (declared above) to be able to use it as an Account
//  in the other parts of the application.  
const fetchAccount = (id: number): object => ({id: id, name: "Some Account", currency: "USD"})
const currentAccount = fetchAccount(4) /* add Type Assertion here */
const currentAccountName = currentAccount.name

// Exercise 6) Literal types
//
// This is an important exercise. If a type is a
//  concrete value like "USD" or 7, it is handled as 
//  a type "constant". We have already used it in the 
//  first chapter in the Product.type property.
//  Check here the variable types and the error messages.
//
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases

type USD = 'USD'
type EUR = 'EUR'
// TODO: Correct the Currency type, to accept
//  both EUR and USD. How can you define two possible
//  types for one type? (we have seen before
//  with numbers and strings).
type Currency = string
const firstCurrency: Currency = 'USD';
const secondCurrency: Currency = 'EUR'
const usd: USD = firstCurrency;
const eur: EUR = secondCurrency;

// TODO: When corrected the Currency type, another issue come up
//  later in the code. 
//  Check the inferred type of the someAccount variable.
//  It is inferred to string, but in the gerSomeCurrency
//  function we using our Currency type. How add some Type 
//  assertion to the someAccount object to correct the later
//  usage of the someAccount variable. 
//
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
const someAccount = {
    name: "My Awesome Account",
    currency: "USD"
}

const getSomeCurrency = (account: {currency: Currency}) => account.currency
const someCurrency = getSomeCurrency(someAccount)

// Exercise 7) null and undefined
//
// Null and undefined are interchangeable
// in Javascript. In typescript it depends on
// the strictNullChecks compiler options.
// In this editor, and in our production code
// it is switched on. Check how does it works.
//
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined

// TODO correct AccountWithOrWithoutCurrency or
//  the removeCurrency function body to get rid off 
//  the type errors.
type AccountWithOrWithoutCurrency = {
    name: string,
    currency: 'USD' | 'EUR' | undefined
}
const removeCurrency = (account: AccountWithOrWithoutCurrency): AccountWithOrWithoutCurrency => {
    return {
        ...account,
        currency: null
    }
}


// Spoiler Alert!
//
// The exercises are over. Here are some type tests to check
// your solutions. They should be error free. Also here you can 
// check some solutions too.
//

// Exercise 1 tests
typeAssert<IsTypeEqual<typeof price, number>>()
typeAssert<IsTypeEqual<typeof title, string>>()
typeAssert<IsTypeEqual<typeof option, boolean>>()
typeAssert<IsTypeEqual<typeof prices, number[]>>()
typeAssert<IsTypeEqual<typeof titles, string[]>>()
typeAssert<IsTypeEqual<typeof options, boolean[]>>()

//
// Type Assert Helper functions, nothing to do with them,
// they are used for the type tests.
// 

/**
 * Checks if T1 equals to T2.
 */
type IsTypeEqual<T1, T2> = IsNotAny<T1> extends false ? false : (
    IsNotAny<T2> extends false ? false : (
        [T1] extends [T2] ? ([T2] extends [T1] ? true : false): false
    )
);

/**
 * Checks if T2 can be assigned to T1.
 */
export type IsTypeAssignable<T1, T2> = IsNotAny<T1> extends false ? false : (
    IsNotAny<T2> extends false ? false : (
        [T2] extends [T1] ? true : false
    )
);

/**
 * Returns `false` if `any` is specified, otherwise returns `true`.
 * @see https://stackoverflow.com/a/49928360/3406963
 */
export type IsNotAny<T> = 0 extends (1 & T) ? false : true;

/**
 * A simple type assertion function which always expects a true-type.
 */
export function typeAssert<T extends true>() {}