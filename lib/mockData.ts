import { Order } from "@/types/order";
import { TrackingInfo } from "@/types/tracking";
import { BotResponse } from "@/types/chat";

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: "order-1",
    poNumber: "PO-2024-001",
    date: "2024-01-15",
    status: "delivered",
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        productName: "Dell OptiPlex 7090 Desktop",
        sku: "DELL-7090-001",
        price: 899.99,
        quantity: 5,
      },
      {
        id: "item-2",
        productId: "prod-3",
        productName: "DDR4 RAM 16GB",
        sku: "RAM-DDR4-16GB",
        price: 89.99,
        quantity: 10,
      },
    ],
    total: 5399.85,
    shippingAddress: "123 Business St, Suite 100, New York, NY 10001",
    trackingNumber: "TRK-123456789",
  },
  {
    id: "order-2",
    poNumber: "PO-2024-002",
    date: "2024-02-20",
    status: "out-for-delivery",
    items: [
      {
        id: "item-3",
        productId: "prod-2",
        productName: "HP EliteBook 850 G8",
        sku: "HP-850G8-001",
        price: 1299.99,
        quantity: 3,
      },
      {
        id: "item-4",
        productId: "prod-4",
        productName: "Samsung 27\" Monitor",
        sku: "SAM-27-4K",
        price: 349.99,
        quantity: 3,
      },
    ],
    total: 4949.94,
    shippingAddress: "123 Business St, Suite 100, New York, NY 10001",
    trackingNumber: "TRK-987654321",
  },
  {
    id: "order-3",
    poNumber: "PO-2024-003",
    date: "2024-03-10",
    status: "shipped",
    items: [
      {
        id: "item-5",
        productId: "prod-5",
        productName: "Logitech MX Master 3",
        sku: "LOG-MX3-001",
        price: 99.99,
        quantity: 15,
      },
    ],
    total: 1499.85,
    shippingAddress: "123 Business St, Suite 100, New York, NY 10001",
    trackingNumber: "TRK-456789123",
  },
  {
    id: "order-4",
    poNumber: "PO-2024-004",
    date: "2024-03-25",
    status: "processing",
    items: [
      {
        id: "item-6",
        productId: "prod-1",
        productName: "Dell OptiPlex 7090 Desktop",
        sku: "DELL-7090-001",
        price: 899.99,
        quantity: 2,
      },
    ],
    total: 1799.98,
    shippingAddress: "123 Business St, Suite 100, New York, NY 10001",
  },
];

// Mock Tracking Info
export const mockTracking: Record<string, TrackingInfo> = {
  "order-1": {
    orderId: "order-1",
    trackingNumber: "TRK-123456789",
    carrier: "FedEx",
    currentStatus: "delivered",
    events: [
      {
        status: "ordered",
        timestamp: "2024-01-15T10:00:00Z",
        description: "Order placed",
      },
      {
        status: "processing",
        timestamp: "2024-01-15T14:30:00Z",
        location: "Warehouse",
        description: "Order being processed",
      },
      {
        status: "shipped",
        timestamp: "2024-01-16T09:15:00Z",
        location: "Distribution Center",
        description: "Package shipped",
      },
      {
        status: "out-for-delivery",
        timestamp: "2024-01-18T06:00:00Z",
        location: "Local Facility",
        description: "Out for delivery",
      },
      {
        status: "delivered",
        timestamp: "2024-01-18T14:30:00Z",
        location: "123 Business St",
        description: "Delivered",
      },
    ],
    estimatedDelivery: "2024-01-18",
    shippingAddress: "123 Business St, Suite 100, New York, NY 10001",
  },
  "order-2": {
    orderId: "order-2",
    trackingNumber: "TRK-987654321",
    carrier: "UPS",
    currentStatus: "out-for-delivery",
    events: [
      {
        status: "ordered",
        timestamp: "2024-02-20T11:00:00Z",
        description: "Order placed",
      },
      {
        status: "processing",
        timestamp: "2024-02-20T15:00:00Z",
        location: "Warehouse",
        description: "Order being processed",
      },
      {
        status: "shipped",
        timestamp: "2024-02-21T10:00:00Z",
        location: "Distribution Center",
        description: "Package shipped",
      },
      {
        status: "out-for-delivery",
        timestamp: "2024-02-23T07:00:00Z",
        location: "Local Facility",
        description: "Out for delivery",
      },
    ],
    estimatedDelivery: "2024-02-23",
    shippingAddress: "123 Business St, Suite 100, New York, NY 10001",
  },
  "order-3": {
    orderId: "order-3",
    trackingNumber: "TRK-456789123",
    carrier: "FedEx",
    currentStatus: "shipped",
    events: [
      {
        status: "ordered",
        timestamp: "2024-03-10T09:00:00Z",
        description: "Order placed",
      },
      {
        status: "processing",
        timestamp: "2024-03-10T13:00:00Z",
        location: "Warehouse",
        description: "Order being processed",
      },
      {
        status: "shipped",
        timestamp: "2024-03-11T08:00:00Z",
        location: "Distribution Center",
        description: "Package shipped",
      },
    ],
    estimatedDelivery: "2024-03-15",
    shippingAddress: "123 Business St, Suite 100, New York, NY 10001",
  },
};

// Mock Relay Assistant Responses
export const mockBotResponses: BotResponse[] = [
  {
    question: "When will order PO-2024-001 arrive?",
    response: "Order PO-2024-001 was delivered on January 18, 2024. The package included 5 Dell OptiPlex 7090 Desktops and 10 DDR4 RAM modules. Everything was delivered successfully to your address.",
  },
  {
    question: "Are the Lenovo ThinkPads in stock?",
    response: "I don't see Lenovo ThinkPads in our current inventory. However, we have similar options available: the HP EliteBook 850 G8 (15.6\" FHD, Intel i7, 16GB RAM) is in stock and ready to ship. Would you like me to check for compatible alternatives?",
  },
  {
    question: "Which monitor matches my last order?",
    response: "Based on your last order (PO-2024-002), you purchased 3 Samsung 27\" 4K UHD IPS Monitors (SKU: SAM-27-4K). We have these same monitors in stock and available for immediate shipping. Would you like to reorder?",
  },
  {
    question: "Which laptop from my last purchase is in stock this week?",
    response: "Based on your last order (PO-2024-002), the HP EliteBook 850 G8 is currently in stock and available for immediate shipping. Would you like to reorder it?",
  },
  {
    question: "Are these RAM sticks compatible with Dell 7090?",
    response: "Yes! The DDR4 RAM 16GB (SKU: RAM-DDR4-16GB) is fully compatible with the Dell OptiPlex 7090 Desktop. It uses standard DDR4 SODIMM slots.",
  },
  {
    question: "When will my shipment arrive?",
    response: "Your current order (PO-2024-002) is out for delivery and should arrive today by end of business. You can track it with tracking number TRK-987654321.",
  },
  {
    question: "What's the status of my recent order?",
    response: "Your most recent order (PO-2024-004) is currently being processed. It should ship within 1-2 business days. I'll notify you once it ships!",
  },
];

// Helper function to get order by ID
export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((order) => order.id === id);
}

// Helper function to get tracking by order ID
export function getTrackingByOrderId(orderId: string): TrackingInfo | undefined {
  return mockTracking[orderId];
}

// Helper function to get bot response (improved keyword matching)
export function getBotResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();
  
  // Try exact or close match first
  for (const response of mockBotResponses) {
    const lowerResponseQuestion = response.question.toLowerCase();
    // Check for exact match or if question contains key phrases from response question
    if (lowerQuestion === lowerResponseQuestion || 
        lowerQuestion.includes(lowerResponseQuestion.substring(0, 20))) {
      return response.response;
    }
  }
  
  // Keyword-based matching
  if (lowerQuestion.includes('po-2024-001') || (lowerQuestion.includes('po-2024-001') && lowerQuestion.includes('arrive'))) {
    return mockBotResponses[0].response;
  }
  if (lowerQuestion.includes('lenovo') && (lowerQuestion.includes('thinkpad') || lowerQuestion.includes('stock'))) {
    return mockBotResponses[1].response;
  }
  if (lowerQuestion.includes('monitor') && (lowerQuestion.includes('last order') || lowerQuestion.includes('matches'))) {
    return mockBotResponses[2].response;
  }
  if (lowerQuestion.includes('arrive') || lowerQuestion.includes('delivery') || lowerQuestion.includes('shipment')) {
    return mockBotResponses[0].response;
  }
  if (lowerQuestion.includes('stock') || lowerQuestion.includes('available')) {
    return mockBotResponses[1].response;
  }
  if (lowerQuestion.includes('compatible') || lowerQuestion.includes('match')) {
    return mockBotResponses[2].response;
  }
  
  return "I'm here to help with your orders! Try asking about order status, product compatibility, or stock availability.";
}

