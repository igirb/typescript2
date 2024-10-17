// @strict
// If you need help, here is the docs: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
//
// Narrowing is one of the most important concept of Typescript. It helps you 
//  to understand why sometimes get strange type errors. The key message from here
//  is typescript extensively analyze the control flow, and in this handbook
//  chapter you find some patterns to help typescript with this analysis and
//  cover all possible cases.
//
// The following examples point out some typical patterns. Look for them in the handbook
// and apply them to the case. Check the types of the variables in each branch to see
// how Typescript narrowing the different types. It is worth to check before and after
// the correction.

// Exercise 1) Narrowing, Truthiness

interface Product {
    title: string,
    price: number,
}

interface Cart {
    products: Product[]
}

const products: Product[] = [
    {
        title: "How to Hack NSA with HTML? (no typos included)",
        price: 100.8
    },
    {
        title: "Switching on computers 101",
        price: 50.3
    }
]
const cart: Cart = {
    products: products
}

// TODO: 
// This function is working only for a list of numbers.
// Correct its implementation with a corresponding type guards to 
// work properly with a single number too.
const getTotal = (prices: number | number[]): number => {
    if (/* add type guard here */ ) {
        const total = prices.reduce((sum, price) => sum + price, 0)
        return Math.round(total)
    } else {
        return Math.round(prices)
    }
}

const courseTotal = getTotal(products[0].price)
const cartTotal = getTotal(cart.products.map(product=> product.price))

// Exercise 2) Narrowing, In

interface DomainAccount {
    name: string,
    domain: string
}
interface PathAccount {
    name: string,
    path: string
}

const accounts: Array<DomainAccount | PathAccount> = [
    {
        name: 'My Awesome Account',
        domain: 'my.awesome.info'
    },
    {
        name: 'Other Great Account',
        path: '/great'
    }
]

// TODO: Make it possible to handle the getUrl both the DomainAccount and a
//  Path account types.
const getUrl = (account: DomainAccount | PathAccount, subPath: string): string => {
    if (/* add type guard here */) {
        return `${account.path}/${subPath}`
    } else {
        return `${account.domain}/${subPath}`
    }
}

// Exercise 3)
// Narrowing, typeof 

interface Listing {
    title: string,
    price: string | number,
    quantity: number,
}

// TODO: make it possible to handle both the string and number
//  type of price.
const getListingTotal = (listing: Listing): number => {
    if (/* add type guard here */) {
        return listing.price * listing.quantity
    } else {
        return parseFloat(listing.price) * listing.quantity
    }
}

// Exercise 4) Narrowing, instanceof
// 

class InvalidAccountId extends Error { 
    id: number
    constructor(id: number) {
        super()
        this.id = id
    }
};
class AccessDenied extends Error { };

// TODO: Make it possible to handle different Error objects
//  correctly hence their properties are different.
const getErrorMessage = (error: InvalidAccountId | AccessDenied) => {
    if (/* */) {
        return `Your account ID (${error.id}) is invalid.`
    } else {
        return 'You do not have access to this account.'
    }
}

// Exercise 5)
// narrowing, type predicate

interface Course {
    title: string,
}

interface Program {
    title: string,
    sequential: boolean
}
// TODO: In this example we can distinguish Courses from Programs
//  by the existence of the sequential prop. Fill this custom Type predicate
//  to fulfill the latter usage below.
const isProduct = (product: Course | Program): /* add proper type here */ => {
    /* add the implementation of the type here */
}

const describeProduct = (product: Product) => {
    if (isProduct(product)) {
        return `This is a Program and it is ${product.sequential ? 'sequential' : 'non-sequential'}.`
    } else {
        return `This is a Course.`
    }
}

// Exercise 6)
// Discriminated Union, Exhaustiveness checking

interface UserSpecificPromotion {
    scope: 'user',
    userId: number,
    amount: number,
}

interface ListingSpecificPromotion {
    scope: 'listing',
    listingId: number,
    amount: number,
}

interface AccountSpecificPromotion {
    scope: 'account',
    accountId: number,
    amount: number,
}

type SpecificPromotion = ListingSpecificPromotion | UserSpecificPromotion | AccountSpecificPromotion

// TODO: The account specific promotion is added later to the code,
//  and in some function this case is not handled properly. Add the
//  explicit return type here. Despite the docs the never + default hack is not
//  needed, if the return type is explicit. Correct the function body, to handle
//  the account case.
//  What is the type of the promotion.scope? (to recap a previous topic)
const getPromotionMessage = (promotion: SpecificPromotion) /* add an explicit return type here  */ => {
    switch(promotion.scope) {
        case 'user': 
            return `Here is your personal discount for you. Only valid with User ID: ${promotion.userId}` 
        case 'listing':
            return `This listing has a discount. Only valid with this listing ID: ${promotion.listingId}`
        /* TODO */
    }
}

// Exercise 7) Playground
//
// Right now apply the patterns above to solve a non concrete example.
//
// Free listings price is 0.0
// The result can not be less than 0.0
// You can add extra props to the interfaces and example objects if you want.

// TODO: Correct the function body and/or the types (depends on what patter do you choose)
//  to conform the requirements.

interface FlatPromotion {
    amount: number, // the amount should be subtracted from the listing price
    listingPrice: number | 'free'
}

interface PercentagePromotion {
    amount: number, // the percentage of the amount of the listing price must be subtracted from the listing price
    listingPrice: number | 'free'
}

type Promotion = FlatPromotion | PercentagePromotion

const calculateDiscount = (promotion: Promotion): number => {
    return promotion.listingPrice - promotion.amount
}