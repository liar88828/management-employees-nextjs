

// Interface for the product
interface ProductS {
  id: number;
  name: string;
  price: number;
}

// Interface for the shopping cart item
interface CartItem<T> {
  product: T;
  quantity: number;
}

// Interface for the shopping cart
interface ShoppingCart<T extends ProductS> {
  items: CartItem<T>[];
  addItem( item: CartItem<T> ): void;
  removeItem( id: number ): void;
  getTotal(): number;
}

// Shopping cart implementation
class ShoppingCartImpl<T extends ProductS> implements ShoppingCart<T> {
  items: CartItem<T>[] = [];

  addItem( item: CartItem<T> ): void {
    const existingItem = this.items.find( ( i ) => i.product.id ===
      item.product.id );

    if( existingItem ) {
      existingItem.quantity += item.quantity;
    }
    else {
      this.items.push( item );
    }
  }

  removeItem( id: number ): void {
    this.items = this.items.filter( ( item ) => item.product.id !== id );
  }

  getTotal(): number {
    return this.items.reduce( ( total, item ) => total + item.product.price *
      item.quantity, 0 );
  }
}

// Example usage
const product1: ProductS = { id: 1, name: "Product 1", price: 10 };
const product2: ProductS = { id: 2, name: "Product 2", price: 15 };

const cartItem1: CartItem<ProductS> = { product: product1, quantity: 2 };
const cartItem2: CartItem<ProductS> = { product: product2, quantity: 1 };

const cart = new ShoppingCartImpl<ProductS>();
cart.addItem( cartItem1 );
cart.addItem( cartItem2 );

console.info( "Shopping Cart Items:", cart.items );
console.info( "Total:", cart.getTotal() );


