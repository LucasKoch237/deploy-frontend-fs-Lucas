const API_BASE_URL = "https://deploy-backend-fs.vercel.app/api/";
const defaultOptions = {
    headers: {
        "Content-Type": "application/json",
    },
};
const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }
    return await response.json();
};

export const productsAPI = {
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/`);
            return await handleResponse(response);
        } catch (error) {
            console.error("Error en fetching de productos:", error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
            return await handleResponse(response);
        } catch (error) {
            console.error("Error en fetching de producto ", id, error);
            throw error;
        }
    },
    create: async (product) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/`, {
                ...defaultOptions,
                method: "POST",
                body: JSON.stringify(product),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error("Error creando producto:", error);
            throw error;
        }
    },
};

export const ordersAPI = {
    create: async (order) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/orders/`, {
                ...defaultOptions,
                method: "POST",
                body: JSON.stringify(order),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error("Error creando orden:", error);
            throw error;
        }
    },
};

export const checkServerHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products?_limit=1`);
        return response.ok;
    } catch (error) {
        console.error("La verificacion de servidor ha fallado", error);
        return false;
    }
};
