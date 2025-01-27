class Product {
  #id;
  #name;
  #price;
  #quantity;

  constructor(id, name, price, quantity) {
    if (this.constructor === Product) {
      throw new Error('Cannot instantiate abstract Product class directly');
    }
    
    if (!id || typeof id !== 'string') {
      throw new Error('Product ID must be a non-empty string');
    }
    if (!name || typeof name !== 'string') {
      throw new Error('Product name must be a non-empty string');
    }
    if (!price || typeof price !== 'number' || price <= 0) {
      throw new Error('Product price must be a positive number');
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new Error('Product quantity must be a non-negative integer');
    }

    this.#id = id;
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  get quantity() {
    return this.#quantity;
  }
  
  set quantity(newQuantity) {
    if (!Number.isInteger(newQuantity) || newQuantity < 0) {
      throw new Error('Quantity must be a non-negative integer');
    }
    this.#quantity = newQuantity;
  }

  getProductDetails() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
    };
  }
}

export default Product;