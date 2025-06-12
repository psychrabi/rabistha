import fs from 'fs/promises';
import path from 'path';

const ORDERS_FILE = path.join(process.cwd(), 'src/data/orders.json');

export async function saveOrder(orderData) {
  try {
    // Read existing orders
    let orders = [];
    try {
      const data = await fs.readFile(ORDERS_FILE, 'utf-8');
      orders = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, that's okay
    }

    // Add new order
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);

    // Save updated orders
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));

    return newOrder;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
} 