// @strict
// If you need help, here is the docs: https://www.typescriptlang.org/docs/handbook/2/functions.html
//
// In these exercises we are diving a little bit deeper of how Typescript
// supports the typical usage of JS functions.

// Exercise 1) function type expression

// TODO: Remove unknown and use the proper function type expression,
//  to fulfill the usage of the handler function. 
type ClickHandler = unknown;

function onListingTileClick(handler: ClickHandler) {
    const productId = 5
    handler(productId)
} 

// TODO: Fill the getEndpoint functions' fetcher parameter to conforms 
//  its usage.
interface Options {
    headers: {name: string, value: string}[],
    attempts: number,
}
function getEndpoint(url: string, fetcher: /* add an inline function type expression here */) {
    const options: Options = {
        headers: [{name: 'contentType', value: 'application/json'}],
        attempts: 3
    }
    fetcher(url, options)
}

// Exercise 2), optional parameters

// TODO: fix the type of the tax arg to
//  conform the latter usage.
const calculateTax = (price: number, tax: number): number => {
    const appliedTax = tax === undefined ? 100 : tax
    return price * (appliedTax/100)
}
const price1 = calculateTax(200, 25)
const price2 = calculateTax(245)

// TODO: an extra exercise, if you know the nullish coalescing
//  operator. Short, readable and handy solution for handling
//  optional arguments.
// rewrite calculateTax function to use nullish coalescing operator (??)
const calculateTaxWithDoubleQuestionMark = () => {}

// Exercise 3) void, never, unknown
// 
// This exercise is a little bit of playground, freeform
// style. It build on the "never", "void", and "unknown" types,
// and also tries to illustrate their usage. Point out
// the difference between these types why working on this
// exercise. Check the handbook for the exact explanations
// and the edge cases, especially for the "void" type.

interface Product {
    title: string,
    price: number,
}

class ValidationError extends Error { 
    constructor(message: string) { super(message) }
}

// TODO: What are the inferred return types of these 3 functions? Why?
const generateTitleError = () =>  { throw new ValidationError('Title must be a string!') }    
const generatePriceError = () =>  { throw new ValidationError('Price must be a number!') }    
const generateObjectError = () =>  { throw new ValidationError('Product is not an object!') }    

// TODO: correct the return type, it looks never, but according
//  to the code flow analysis it is different.
const validateProduct = (product: any): never => {
    if (typeof product !== 'object' && product === null) {
        generateObjectError()
    }
    if (typeof product?.title !== 'string' ) {
        generateTitleError()
    }
    if (typeof product?.price !== 'number') {
        generatePriceError
    }
} 

// In this implementation we do not trust in our API, 
//  so the response from the API is unknown. We are
//  checking the response and then we assert the proper
//  type to it.
const getProductFromApi = (productId: number): unknown => {
    if (Math.random() > 0.5) {
        return {title: 'How to buy cheap courses?', price: 5}
    }
    throw new Error('Network Error')
}

// TODO: What is the inferred return type of this function, why?
// TODO: correct the response type with type assertion after it is validated
//  to confirm the onSuccess callback.
const clickHandler = (productId: number, onError: (message: string) => void, onSuccess: (product: Product) => void) => {
    try {
        const response = getProductFromApi(productId)
        validateProduct(response)
        onSuccess(response)
    } catch (error: unknown) {
        // The errors in the catch phrase is unknown
        // by default if useUnknownInCatchVariables complier 
        // option is on, otherwise any, here it is explicitly
        // set to unknown.
        //  
        // TODO: Correct the catch branch. You can use the
        //  narrowing patterns here too.
        // If the error is a ValidationError 
        // use its message in the callback, 
        // otherwise the 'Unknown Error'
        // string.
        onError(error.message)
    }
}

// Exercise 4), Rest parameters, rest arguments

// TODO: correct the rest parameter type, to be valid for the input.
const applyTaxes = (tax: number, ...prices: number) => prices.map(price => price * (1 + tax))
const inputPrices = [100, 200, 300, 500]
const taxed = applyTaxes(0.21, ...inputPrices)

// TODO: correct the "input" variable's type to be valid for this function.
const applyTax = (tax: number, price: number) => price * (1 + tax)
const inputs = [.25, 200]
const taxedSingle = applyTax(...inputs)

// Exercise 5), Parameter Destructuring

// TODO: add an inline type annotation for the destructured object
type MessageType = 'success' | 'error'
const renderMessage = ({message, messageType}) => {
    let color;
    if (messageType === 'error') {
        color = 'red'
    } else {
        color = 'green'
    }
    return `<p style="color: ${color}">${message}</p>`
}
renderMessage({message: 'Ooops, something is wrong here.', messageType: 'error'})