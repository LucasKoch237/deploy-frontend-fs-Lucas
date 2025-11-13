import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product) => {
                const currentItems = get().items;
                const existingItemIndex = currentItems.findIndex(
                    (item) => item.product.id === product.id
                );
                if (existingItemIndex >= 0) {
                    const updatedItems = [...currentItems];
                    updatedItems[existingItemIndex].cantidad += 1;
                    set({ items: updatedItems });
                } else {
                    set({
                        items: [
                            ...currentItems,
                            { producto: product, cantidad: 1 },
                        ],
                    });
                }
            },
            removeItem: (productId) => {
                const currentItems = get().items;
                const existingItemIndex = currentItems.findIndex(
                    (item) => item.product.id === productId
                );
                if (existingItemIndex >= 0) {
                    const updatedItems = [...currentItems];
                    if (updatedItems[existingItemIndex].cantidad > 1) {
                        updatedItems[existingItemIndex].cantidad -= 1;
                    } else {
                        updatedItems.splice(existingItemIndex, 1);
                    }
                    set({ items: updatedItems });
                }
            },
            deleteItem: (productId) => {
                set({
                    items: get().items.filter(
                        (item) => item.producto.id !== productId
                    ),
                });
            },
            clearCart: () => {
                set({ items: [] });
            },
            getTotal: () => {
                return get().items.reduce((total, item) => {
                    return total + item.producto.precio * item.cantidad;
                }, 0);
            },
            getTotalItems: () => {
                return get().items.reduce(
                    (total, item) => total + item.cantidad,
                    0
                );
            },
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => {
                set((state) => ({ isOpen: !state.isOpen }));
            },
            getOrderData: () => {
                const items = get().items;
                const total = get().getTotal();
                return {
                    productos: items.map((item) => ({
                        id: item.producto.id,
                        nombre: item.producto.nombre,
                        precio: item.producto.precio,
                        cantidad: item.cantidad,
                    })),
                    total: total,
                    fecha: new Date().toISOString(), //Timestamp ISO8601
                };
            },
        }),
        {
            name: "cart-storage",
            patialize: (state) => ({ items: state.items }),
        }
    )
);
