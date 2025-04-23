import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    // cart: [
    //     {
    //         pizzaId: 1,
    //         name: "Mediterranean",
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32,
    //     }
    // ]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add action creator
        addItem(state, action) {
            const { pizzaId, name, unitPrice } = action.payload;
            const existingItem = state.cart.find(item => item.pizzaId === pizzaId);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * unitPrice;
            } else {
                state.cart.push({
                    pizzaId,
                    name,
                    quantity: 1,
                    unitPrice,
                    totalPrice: unitPrice
                });
            }
        },
        deleteItem(state, action) {
            const pizzaId = action.payload;
            const existingItem = state.cart.find(item => item.pizzaId === pizzaId);
            if (existingItem) {
                state.cart = state.cart.filter(item => item.pizzaId !== pizzaId);
            }
        },
        increaseItemQuantity(state, action) {
            const pizzaId = action.payload;
            const existingItem = state.cart.find(item => item.pizzaId === pizzaId);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
            }
        },
        decreaseItemQuantity(state, action) {
            const pizzaId = action.payload;
            const existingItem = state.cart.find(item => item.pizzaId === pizzaId);
            
            if (existingItem) {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
            }
            if (!existingItem.quantity) {
                cartSlice.caseReducers.deleteItem(state, action);
            }
        },
        clearCart(state) {
            state.cart = [];
        }
    }
})

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getUsername = state => state.user.username;


export const getCart = state => state.cart.cart;

export const getTotalCartQuantity = state => state.cart.cart.reduce((acc, item) => (item.quantity + acc), 0);

export const getTotalCartPrice = state => state.cart.cart.reduce((acc, item) => (item.totalPrice + acc), 0);

export const getCurrentQuantityById = id => state => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
// reselect library