import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()

export class ProductsService{
    products : Product[] = [];

    insertProduct (title: string, description: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, 'Product 1', 'This is description', 10);
        this.products.push(newProduct);
        return prodId;
    }


    fetchProducts(){
        return [...this.products];
    }

    getSingleProduct(productId: string){
        const product = this.findProduct(productId)[0];
    }

    updateProduct(id:string, title:string, description:string, price:number){
        const [product, index] = this.findProduct(id);
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title = title;
        }
        if(description){
            updatedProduct.description = description;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = {...product,}

    }

    private findProduct(id:string) : [Product, number]{
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];
        if(!product){
         throw new NotFoundException('Could not find product')
        }
 
        return[product, productIndex];
    }

}