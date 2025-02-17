import { Orders } from "../orders/entities/orders.entity";

export function formatOrderResponse(order: Orders) {
    const { user, orderDetails, date, id } = order;

    return {
        id_order: id,
        date,
        user: {
            id_user: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            country: user.country,
            address: user.address,
            city: user.city,
        },
        orderDetails: {
            id_order_details: orderDetails.id,
            total: orderDetails.price,
            products: orderDetails.products.map(product => ({
                id_product: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category ? {
                    id_category: product.category.id,
                    name: product.category.name,
                } : null,
            })),
        },
    };
}
