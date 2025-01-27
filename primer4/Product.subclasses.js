import Product from './Product.js';

class Clothing extends Product {
  #size;
  #material;

  constructor(id, name, price, quantity, size, material) {
    super(id, name, price, quantity);
    
    if (!size || typeof size !== 'string') {
      throw new Error('Size must be a non-empty string');
    }
    if (!material || typeof material !== 'string') {
      throw new Error('Material must be a non-empty string');
    }
    
    this.#size = size;
    this.#material = material;
  }

  get size() {
    return this.#size;
  }

  get material() {
    return this.#material;
  }

  getProductDetails() {
    return {
      ...super.getProductDetails(),
      size: this.size,
      material: this.material,
    };
  }
}

class Electronics extends Product {
  #brand;
  #warranty;

  constructor(id, name, price, quantity, brand, warranty) {
    super(id, name, price, quantity);
    
    if (!brand || typeof brand !== 'string') {
      throw new Error('Brand must be a non-empty string');
    }
    if (!warranty || typeof warranty !== 'string') {
      throw new Error('Warranty must be a non-empty string');
    }
    
    this.#brand = brand;
    this.#warranty = warranty;
  }

  get brand() {
    return this.#brand;
  }

  get warranty() {
    return this.#warranty;
  }

  getProductDetails() {
    return {
      ...super.getProductDetails(),
      brand: this.brand,
      warranty: this.warranty,
    };
  }
}

export { Clothing, Electronics };