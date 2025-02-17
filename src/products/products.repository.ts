import { Injectable } from "@nestjs/common";

@Injectable()

export class ProductsRepository {
    private products =[
        {
            id: 1,
            name: 'Celular Galaxy S33',
            description: 'Celular 5G camara frontal 50px',
            price: 255.000,
            stock: true,
            imgUrl: 'http://####1',
        },
        {
            id: 2,
            name: 'Audifono Sony Xy',
            description: 'Audifono BT de alta fidelidad',
            price: 95.000,
            stock: true,
            imgUrl: 'http://####2',
        },
        {
            id: 3,
            name: 'Parlante JBL Charge-5',
            description: 'Parlante BT de alto desempeño',
            price: 255.000,
            stock: true,
            imgUrl: 'http://####3',
        },
    ];
    // async getProducts() {
    //     return this.products;
    // }
    async getProducts(page: number, limit: number) {
        const start = (page - 1) * limit;
        const end = start + limit;
        return this.products.slice(start, end);
    }

    async getProductById(id: string) {
        return this.products.find(product => product.id === +id);
    }

    async createProduct(createProductDto: any) {
        const newProduct = { id: Date.now(), ...createProductDto };
        this.products.push(newProduct);
        return { id: newProduct.id }; // Retorna solo el ID
    }

    async updateProduct(id: string, updateProductDto: any) {
        const productIndex = this.products.findIndex(product => product.id === +id);
        if (productIndex === -1) return null;
        this.products[productIndex] = { ...this.products[productIndex], ...updateProductDto };
        return { id }; // Retorna solo el ID
    }

    async deleteProduct(id: string) {
        const productIndex = this.products.findIndex(product => product.id === +id);
        if (productIndex === -1) return null;
        this.products.splice(productIndex, 1);
        return { id }; // Retorna solo el ID
    }
}