import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        const exist = cart.find((x) => x.name === item.name);
        if (exist) {
            setCart(
                cart.map((x) =>
                    x.name === item.name ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const removeFromCart = (item) => {
        const exist = cart.find((x) => x.name === item.name);
        if (exist.qty === 1) {
            setCart(cart.filter((x) => x.name !== item.name));
        } else {
            setCart(
                cart.map((x) =>
                    x.name === item.name ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};