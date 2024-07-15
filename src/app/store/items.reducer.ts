import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { add, remove, total } from "./items.actions";

export interface ItemsState {
    items : CartItem[],
    total : number
}

const initialState : ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cart')!) || [],
    total: 0
}

export const itemsReducer = createReducer(
    initialState,
    on(add, (state, { product }) => {
        const hasItem = state.items.find((item: CartItem) => item.product.id === product.id); // el método .find sirve para buscar algo en el arreglo
        if(hasItem) {
            return {
                items: state.items.map((item: CartItem) => { // me devuelve el arreglo que se tiene modificando y agregando más 1 en la cantidad
                    if (item.product.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                    }
                    return item;
                }),
                total: state.total
            }
        } else {
            return {
                items: [ ...state.items, {product: { ...product}, quantity: 1}],
                total: state.total
            }
        } // en caso de que no se cumpla me agrega el producto a la lista
    }),
    on(remove, (state, {id}) => {
        return {
            items: state.items.filter(item => item.product.id !== id),
            total: state.total
        }
    }),
    on(total, state => {
        return {
            items: state.items,
            total: state.items.reduce( (accumulator, item) => accumulator + item.quantity * item.product.price, 0)
        }
    })
)
