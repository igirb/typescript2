// @strict
// This chapter picks some pages from here: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
// and from here: https://www.typescriptlang.org/docs/handbook/utility-types.html
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var featureFlagEnabler = function (flag, activators) {
    activators[flag]();
};
var table = {
    rows: [
        { title: 'How to Hack NASA with HTML?', price: 100.0 },
        { title: 'What is your favorite colour? Brown?', price: 200.0 }
    ],
    columns: [
        { header: 'Price', field: 'price' },
        { header: 'Title', field: 'title' }
    ]
};
var getField = function (table, row, field) { return table.rows[row][field]; };
var getCuratorName = function (curator) { return curator.name; };
var listingFixture = function (overrides /* */) { return (__assign({ title: "Schrödinger's Cat under testing", price: 100.0, type: "Course" }, overrides)); };
var freeListing = listingFixture({ price: 0.0 });
var messages = {
    user_not_found: 'Sry, Your user is not found.',
    invalid_account: 'Sry, your account is invalid.',
    ongoing_checkout: 'There is another checkout is ongoing. It is not allowed to start a new one.',
    permission_denied: 'Sry, you do not have the proper rights to access this site.'
};
var getHumanReadableMessage = function (code) { return messages[code]; };
var getIdFromAccount = function (account) { return account.id; };
