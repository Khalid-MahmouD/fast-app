import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // cart: [],
    cart: [
        {
            pizzaId: 1,
            name: "Mediterranean",
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        }
    ]
}

createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add action creator
        addItem(state, action) { }
        deleteItem(state, action) { }
        increaseItemQuantity(state, action) { }
        decreaseItemQuantity(state, action) { }
        clearCart(state, action) { }
    }
})