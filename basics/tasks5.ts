// @strict

// Exercise 1)
// Optional Properties

// TODO: Unforutnately someone extended our common
//  Product interface with isPaid property hence the
//  the isFree has been already there. Some API endpoints
//  return isFree, some isPaid. But this interface incorrectly
//  types it. It suggest they are always exists, However
//  they aren't. It can cause runtime errors. 
// Correct the Product properties to allow both API response.
interface Product {
    type: "Program" | "Course",
    title: string,
    price: number,
    isPaid?: boolean,
    isFree?: boolean,
}

const productForDetailsPage: Product = {
    type: "Course",
    title: "Cat Taming 101, Forget It",
    price: 0.0,
    isPaid: false,
}

const productForCheckoutPage: Product = {
    type: "Course",
    title: "Cat Taming 101, Forget It",
    price: 0.0,
    isFree: true,
}

// TODO: correct the function body to calculate the product'S
// free status correctly.
// What if, we do net set the function's return type
// explicitly just let the Typescript to infer it?
//  Typesciprt is not a "Godmode", it is still possible
//  to make runtime failures. 
const isProductFree = (product: Product) => {
    return product.isFree
}

console.log(isProductFree(productForCheckoutPage));


// Exercise 2)
// Readonly Properties, Readonly Arrays

interface Cart {
    products: ReadonlyArray<Product>; // Readonly array of products
}

const fullCart: Cart = {
    products: [productForCheckoutPage, productForDetailsPage]
} 

// Modify the emptyCart function to allow clearing the cart
// by replacing the `products` array with an empty array.
const emptyCart = (cart: Cart): Cart => {
    return { ...cart, products: [] }; // Return a new cart with an empty products array
};

/* function emptyMyCart<Type>(name: string, product: string, something: Type) {
    return name.concat(" " + product + something);
}

console.log(emptyMyCart<number>("Julia", "milk", 4)); */

// Modify the addProductToCart function to return a new cart with the new product
// while keeping the original `products` array readonly.
const addProductToCart = (product: Product, cart: Cart): Cart => {
    return { ...cart, products: [...cart.products, product] }; // Return a new cart with the new product added
};

console.log(addProductToCart(productForCheckoutPage, fullCart));


// Exercise 3)
// Index Signatures

// TODO: Complete the CartItems interface to
// support mapping of the product's titles to
// its prices.
interface CartItems {
    [title: string]: number
}

const mapProductsToPrices = (cart: Cart) => {
    let mapped: CartItems = {}
    cart.products.forEach(product => mapped[product.title] = product.price)
    return mapped
}

console.log(mapProductsToPrices(fullCart));


// Exercies 4)
// Index Signatures

interface FeatureFlags {
    [feature: string]: boolean
    shoppingCart: boolean,
    bulkPurchase: boolean,
    blockedEmailList: boolean
}

// TODO: Generalize the FeatureFlags interface to allow adding
// any kind of feature flag. What kind of trouble we got?
// TODO: We decided to create a separate API endpoint to get the
//  the blocked emails, in this interface we just enable the feature.
//  Modify the FeatureFlags intrface and the function signature to
//  correct the type errors.
const addFeatureFlag = (featureFlags: FeatureFlags, feature: string, flag: boolean) => {
    featureFlags[feature] = flag
}

// Exercise 4)
// Extending Inerfaces

interface Account {
    id: number,
    name: string,
}

interface PathAccount extends Account {
    path: string
}

// TODO: correct the PathAccount interface, using the already
//  existing Account's interface to make this function type error free.
const renderPathAccount = (account: PathAccount) => {
    return `<a href="${account.path}">${account.name}</a>`
}

// Exercise 5)
// Intersection Types

type SubAccount = {
    rootId: number,    
}

type DomainAccount = {
    domain: string
}

// TODO: correct the DomainSubaccount type to make the function
//   type error free.
type DomainSubaccount = DomainAccount & SubAccount;
const renderDomainSubAccount = (account: DomainSubaccount) => {
    return `<span>${account.domain}: <a href="/accounts/${account.rootId}">Go To Root Account</a></span>`
}

// Revisit the Everyday Types chapter to compare the interfaces and the types. In the Object Types
// chapter it is not so elaborated: 
//   https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// It is worth to check this chapter also in the Object Types
//   https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

// Exercise 6)
// Tuples

// TODO: complete the type to conform the function declaration.
const calculateTax = ([price, tax]: [number, number]) => price * (tax / 100)

// Exercise 7) 
// Tuples

// TODO: Define the Discount and CartData Tuple types based on the usage
//  example and the function body below. 
type DiscountType = 'flat' | 'percent'
type Discount = [DiscountType, number]
type CartData = [number, ...Discount[]]

// TODO: Define the return type of the function.
const calculateTotalAndDiscount = (cartData: CartData): [total: number, discount: number] => {
    const [itemPrice, ...discounts] = cartData
    const discount = discounts.reduce((sum, discountData) => {
        const [discountType, amount] = discountData;
        let itemDiscount;
        if (discountType === 'flat') {
            itemDiscount = Math.max(amount, 0)
        } else {
            itemDiscount = Math.max(itemPrice * amount / 100, 0)
        }
        return sum + itemDiscount
    }, 0)
    const total = Math.max(itemPrice - discount, 0);
    return [total, discount]
}
const cart: CartData = [1000, ['flat', 10], ['percent', 20], ['flat', 100]]
const [total, discount] = calculateTotalAndDiscount(cart)

console.log(calculateTotalAndDiscount(cart));