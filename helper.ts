
export const loginCreds = {
    username: 'standard_user',
    password: 'secret_sauce',
}
export const toKebabCase = (name: string) => name.trim().replace(/\s+/g, "-").toLowerCase();
const arraysMatch = (arr1: any[], arr2: any[]) => {
    // First, check if the lengths are the same
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Then, check if every item and its index are the same
    return arr1.every((value, index) => value === arr2[index]);
};

export const addCartItems = [
    'Sauce Labs Backpack',
    'Sauce Labs Bolt T-Shirt',
    'Test.allTheThings() T-Shirt (Red)'
];
export const userInformation = {
    firstName: 'Mark',
    lastName: 'lastname',
    postalCode: '4102'
}

