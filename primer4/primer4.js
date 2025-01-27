import ProductFactory from "./ProductFactory.js";
import Inventory from "./Inventory.js";

// Sample usage with the factory pattern
const inventory = new Inventory();

try {
  const tshirt = ProductFactory.createProduct('clothing', 'A123', 'T-shirt', 19.99, 100, 'L', 'Cotton');
  const laptop = ProductFactory.createProduct('electronics', 'B456', 'Laptop', 799.99, 20, 'Dell', '1 year');

  inventory.addProduct(tshirt);
  inventory.addProduct(laptop);
  
  inventory.updateQuantity('A123', 50);
  const retrievedProduct = inventory.getProduct('B456');
  console.log(retrievedProduct);
  
  inventory.removeProduct('A123');
} catch (error) {
  console.error("An error occurred:", error.message);
}