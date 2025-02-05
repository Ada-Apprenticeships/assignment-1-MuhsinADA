// primer4.test.js
import Product from './Product.js';
import { Clothing, Electronics } from './Product.subclasses.js';
import ProductFactory from './ProductFactory.js';
import Inventory from './Inventory.js';

describe('Inventory', () => {
  let inventory;
  let product1, product2;
  
  beforeEach(() => {
    inventory = new Inventory();
    product1 = ProductFactory.createProduct('clothing', "A123", "T-shirt", 19.99, 100, "L", "Cotton");
    product2 = ProductFactory.createProduct('clothing', "B456", "Jeans", 49.99, 50, "M", "Denim");
  });

  describe('Adding Products', () => {
    test('can add products to the inventory', () => {
      inventory.addProduct(product1);
      inventory.addProduct(product2);
      expect(inventory.getNumOfItems()).toBe(2);
    });

    test('throws error when adding a product with a duplicate ID', () => {
      inventory.addProduct(product1);
      expect(() => inventory.addProduct(product1)).toThrowError(`Product with ID ${product1.id} already exists.`);
    });
  });

  describe('Updating Product Quantities', () => {
    test('can update the quantity of a product', () => {
      inventory.addProduct(product1);
      inventory.updateQuantity("A123", 75);
      expect(inventory.getProduct("A123").quantity).toBe(75);
    });

    test('throws error when updating the quantity of a non-existent product', () => {
      expect(() => inventory.updateQuantity("C789", 75)).toThrowError(`Product with ID C789 not found.`);
    });
  });

  describe('Removing Products', () => {
    test('can remove a product from the inventory', () => {
      inventory.addProduct(product1);
      inventory.addProduct(product2);
      inventory.removeProduct("A123");
      expect(() => inventory.getProduct("A123")).toThrowError(`Product with ID A123 not found.`);
      expect(inventory.getProduct("B456")).toEqual(product2.getProductDetails());
    });

    test('throws error when removing a non-existent product', () => {
      expect(() => inventory.removeProduct("C789")).toThrowError(`Product with ID C789 not found.`);
    });
  });

  describe('Retrieving Product Details', () => {
    test('can retrieve the details of products', () => {
      inventory.addProduct(product1);
      inventory.addProduct(product2);
      
      expect(inventory.getProduct("A123")).toEqual({
        id: "A123",
        name: "T-shirt",
        price: 19.99,
        quantity: 100,
        size: "L",
        material: "Cotton"
      });

      expect(inventory.getProduct("B456")).toEqual({
        id: "B456",
        name: "Jeans",
        price: 49.99,
        quantity: 50,
        size: "M",
        material: "Denim"
      });
    });
  });
});

describe('Product System Extensions', () => {
  describe('Abstract Product Class', () => {
    test('cannot instantiate Product class directly', () => {
      expect(() => new Product('123', 'Test', 10, 1)).toThrow('Cannot instantiate abstract Product class directly');
    });

    test('validates input parameters', () => {
      expect(() => ProductFactory.createProduct('clothing', '', 'Shirt', 20, 1, 'L', 'Cotton'))
        .toThrow('Product ID must be a non-empty string');
      expect(() => ProductFactory.createProduct('clothing', '123', '', 20, 1, 'L', 'Cotton'))
        .toThrow('Product name must be a non-empty string');
      expect(() => ProductFactory.createProduct('clothing', '123', 'Shirt', -20, 1, 'L', 'Cotton'))
        .toThrow('Product price must be a positive number');
      expect(() => ProductFactory.createProduct('clothing', '123', 'Shirt', 20, -1, 'L', 'Cotton'))
        .toThrow('Product quantity must be a non-negative integer');
    });
  });

  describe('Product Types', () => {
    describe('Clothing Products', () => {
      test('validates clothing-specific parameters', () => {
        expect(() => ProductFactory.createProduct('clothing', 'C123', 'Shirt', 20, 1, '', 'Cotton'))
          .toThrow('Size must be a non-empty string');
        expect(() => ProductFactory.createProduct('clothing', 'C123', 'Shirt', 20, 1, 'L', ''))
          .toThrow('Material must be a non-empty string');
      });

      test('creates valid clothing products', () => {
        const clothing = ProductFactory.createProduct('clothing', 'C123', 'T-shirt', 19.99, 100, 'L', 'Cotton');
        expect(clothing).toBeInstanceOf(Clothing);
        expect(clothing.getProductDetails()).toEqual({
          id: 'C123',
          name: 'T-shirt',
          price: 19.99,
          quantity: 100,
          size: 'L',
          material: 'Cotton'
        });
      });
    });

    describe('Electronics Products', () => {
      test('validates electronics-specific parameters', () => {
        expect(() => ProductFactory.createProduct('electronics', 'E123', 'Phone', 500, 1, '', '1 year'))
          .toThrow('Brand must be a non-empty string');
        expect(() => ProductFactory.createProduct('electronics', 'E123', 'Phone', 500, 1, 'Apple', ''))
          .toThrow('Warranty must be a non-empty string');
      });

      test('creates valid electronics products', () => {
        const electronics = ProductFactory.createProduct('electronics', 'E123', 'Laptop', 999.99, 50, 'Dell', '2 years');
        expect(electronics).toBeInstanceOf(Electronics);
        expect(electronics.getProductDetails()).toEqual({
          id: 'E123',
          name: 'Laptop',
          price: 999.99,
          quantity: 50,
          brand: 'Dell',
          warranty: '2 years'
        });
      });
    });
  });

  describe('Product Factory', () => {
    test('throws error for invalid product type', () => {
      expect(() => ProductFactory.createProduct('invalid', 'X123', 'Test', 10, 1))
        .toThrow('Invalid product type: invalid');
    });
  });
});