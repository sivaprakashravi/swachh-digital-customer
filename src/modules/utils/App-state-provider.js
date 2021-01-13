import React, { createContext, useReducer } from 'react';

const initialState = {
    cart: []
};

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_CART':
                initialState.cart = action.cart;
                return initialState;
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
const store = createContext(initialState);
const { Provider } = store;

export { store, StateProvider }