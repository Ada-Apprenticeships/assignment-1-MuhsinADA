import { Clothing, Electronics } from './Product.subclasses.js';

class ProductFactory {
  static createProduct(type, id, name, price, quantity, ...additionalProps) {
    switch (type.toLowerCase()) {
      case 'clothing':
        const [size, material] = additionalProps;
        return new Clothing(id, name, price, quantity, size, material);
      
      case 'electronics':
        const [brand, warranty] = additionalProps;
        return new Electronics(id, name, price, quantity, brand, warranty);
      
      default:
        throw new Error(`Invalid product type: ${type}`);
    }
  }
}

export default ProductFactory;