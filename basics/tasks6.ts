// @strict
// This chapter picks some pages from here: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
// and from here: https://www.typescriptlang.org/docs/handbook/utility-types.html

// Exercise 1)
// Keyof 
// https://www.typescriptlang.org/docs/handbook/2/keyof-types.html

interface FeatureFlagActivators {
    shoppingCart: () => void,
    bulkPurchase: () => void,
    blockedEmails: () => void,
}

// TODO: define the Flag type to avoid the errors in the Function.
type Flag = unknown
const featureFlagEnabler = (flag: Flag, activators: FeatureFlagActivators) => {
    activators[flag]()
}

// Exercise 2)
// Keyof
// https://www.typescriptlang.org/docs/handbook/2/keyof-types.html

// TODO define the Field type which determines
//  the given column which field should be displayed
//  from the row.  
type Field = unknown

interface Row {
    title: string,
    price: number,
}

interface Column {
    header: string,
    field: Field,
}

interface Table {
    rows: Row[]
    columns: Column[]
}

const table: Table = {
    rows: [
        {title: 'How to Hack NASA with HTML?', price: 100.0},
        {title: 'What is your favorite colour? Brown?', price: 200.0}
    ],
    columns:[
        {header: 'Price', field: 'price'},
        {header: 'Title', field: 'title'}
    ]
}

const getField = (table: Table, row: number, field: Field) => table.rows[row][field]

// Exercise 3)
// Indexed Access Types
// https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html

interface Cart {
    products: {
        title: string,
        curator: {
            name: string,
            email: string,
        }
        price: number,
    }[]
}

// TODO: Define a Curator type from the Cart interface only.
type Curator = unknown

const getCuratorName = (curator: Curator) => curator.name

// Exercise 4)
// Here is the reference page of the Utility Types
// https://www.typescriptlang.org/docs/handbook/utility-types.html

// Check it and solve the following exercises, multiple solution can
//  be possible.

// TODO: in our tests we want to create a fixture with
//  default values of a listing, but sometimes we want to
//  override one or many of them.
interface Listing {
    title: string,
    price: number,
    type: "Course" | "Program"
}

const listingFixture = (overrides: /* */): Listing => ({
    title: "Schrödinger's Cat under testing",
    price: 100.0,
    type: "Course",
    ...overrides
})
const freeListing = listingFixture({price: 0.0})

// TODO: Define the Message Type 
type ErrorCode = 'user_not_found' | 'invalid_account' | 'ongoing_checkout' | 'permission_denied'

type Message = unknown
const messages: Message = {
    user_not_found: 'Sry, Your user is not found.',
    invalid_account: 'Sry, your account is invalid.',
    ongoing_checkout: 'There is another checkout is ongoing. It is not allowed to start a new one.',
    permission_denied: 'Sry, you do not have the proper rights to access this site.'
}
const getHumanReadableMessage = (code: ErrorCode) => messages[code]

// TODO: Create a new NonSensitiveUserData from 
//   the original CurrentUserData which contains only
//   the name and favoriteAnimal.
interface CurrentUserData {
    sessionId: string,
    userName: string,
    email: string,
    address: {city: string, postalCode: number, street: string},
    phone: string,
    favoriteAnimal: 'cat' | 'dog'
}
type NonSensitiveUserData = unknown

// TODO: Create a NonSystemUserData type from the CurrentUserData, which 
//   is almost the same as CurrentUserData, but the sessionId is missing from
//   it.
type NonSystemUserData = unknown

interface Account {
    id: number,
    name: string,
}
type GetAccountById = (id: number) => Account
// TODO: Define the GerIdFromAccount function type expression only
//  from the GetAccountById's argument type and return type:
type GetIdFromAccount = unknown
const getIdFromAccount: GetIdFromAccount = (account) => account.id