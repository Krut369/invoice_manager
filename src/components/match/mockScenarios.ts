export type MockField = {
  label: string;
  value: string;
  confidence: number;
};

export type MockLineItem = {
  item: string;
  quantity: number;
  unitPrice: number;
  invoiceRate: number;
  total: number;
};

export type MockDocumentData = {
  currency: string;
  fields: MockField[];
  lineItems: MockLineItem[];
};

export type MatchingTransaction = {
  id: string;
  purchaseOrder: MockDocumentData;
  grn: MockDocumentData;
  invoice: MockDocumentData;
};

export const matchingData: MatchingTransaction[] = [
  {
    id: "INV-9001",
    purchaseOrder: {
      currency: "INR",
      fields: [
        { label: "PO Number", value: "PO-2045", confidence: 96 },
        { label: "Vendor", value: "Global Office Systems", confidence: 95 },
        { label: "Date", value: "2026-03-13", confidence: 94 }
      ],
      lineItems: [
        { item: "Ergonomic Chair", quantity: 12, unitPrice: 14500, invoiceRate: 14500, total: 174000 },
        { item: "Standing Desk", quantity: 6, unitPrice: 32000, invoiceRate: 32000, total: 192000 },
        { item: "Desk Lamp LED", quantity: 15, unitPrice: 1800, invoiceRate: 1800, total: 27000 },
        { item: "USB-C Hub", quantity: 10, unitPrice: 3500, invoiceRate: 3500, total: 35000 },
        { item: "Cable Organizer Kit", quantity: 20, unitPrice: 600, invoiceRate: 600, total: 12000 },
        { item: "Laptop Stand Aluminum", quantity: 8, unitPrice: 2200, invoiceRate: 2200, total: 17600 }
      ]
    },

    grn: {
      currency: "INR",
      fields: [
        { label: "GRN Number", value: "GRN-411", confidence: 95 },
        { label: "Vendor", value: "Global Office Systems", confidence: 94 },
        { label: "Date", value: "2026-03-13", confidence: 93 }
      ],
      lineItems: [
        { item: "Ergonomic Chair", quantity: 12, unitPrice: 14500, invoiceRate: 14500, total: 174000 },
        { item: "Standing Desk", quantity: 6, unitPrice: 32000, invoiceRate: 32000, total: 192000 },
        { item: "Desk Lamp LED", quantity: 15, unitPrice: 1800, invoiceRate: 1800, total: 27000 },
        { item: "USB-C Hub", quantity: 10, unitPrice: 3500, invoiceRate: 3500, total: 35000 },
        { item: "Cable Organizer Kit", quantity: 20, unitPrice: 600, invoiceRate: 600, total: 12000 },
        { item: "Laptop Stand Aluminum", quantity: 8, unitPrice: 2200, invoiceRate: 2200, total: 17600 }
      ]
    },

    invoice: {
      currency: "INR",
      fields: [
        { label: "Invoice Number", value: "INV-9001", confidence: 97 },
        { label: "Vendor", value: "Global Office Systems", confidence: 96 },
        { label: "Date", value: "2026-03-13", confidence: 95 }
      ],
      lineItems: [
        { item: "Ergonomic Chair", quantity: 12, unitPrice: 14500, invoiceRate: 15500, total: 186000 }, // Price mismatch
        { item: "Standing Desk", quantity: 6, unitPrice: 32000, invoiceRate: 32000, total: 192000 },
        { item: "Desk Lamp LED", quantity: 15, unitPrice: 1800, invoiceRate: 1800, total: 27000 },
        { item: "USB-C Hub", quantity: 10, unitPrice: 3500, invoiceRate: 3500, total: 35000 },
        { item: "Cable Organizer Kit", quantity: 20, unitPrice: 600, invoiceRate: 600, total: 12000 },
        { item: "Laptop Stand Aluminum", quantity: 8, unitPrice: 2200, invoiceRate: 2200, total: 17600 }
      ]
    }
  },
  {
    id: "INV-9001-2",
    purchaseOrder: {
      currency: "INR",
      fields: [
        { label: "PO Number", value: "PO-3178", confidence: 95 },
        { label: "Vendor", value: "BrightTech Components", confidence: 94 },
        { label: "Date", value: "2026-03-11", confidence: 94 }
      ],
      lineItems: [
        { item: "External SSD 1TB", quantity: 14, unitPrice: 9000, invoiceRate: 9000, total: 126000 },
        { item: "Portable Projector", quantity: 4, unitPrice: 42000, invoiceRate: 42000, total: 168000 },
        { item: "HDMI Cable 2m", quantity: 25, unitPrice: 450, invoiceRate: 450, total: 11250 },
        { item: "Wireless Presenter", quantity: 10, unitPrice: 2500, invoiceRate: 2500, total: 25000 },
        { item: "Desk Power Strip", quantity: 12, unitPrice: 950, invoiceRate: 950, total: 11400 },
        { item: "Tablet Stand", quantity: 7, unitPrice: 1600, invoiceRate: 1600, total: 11200 }
      ]
    },

    grn: {
      currency: "INR",
      fields: [
        { label: "GRN Number", value: "GRN-522", confidence: 95 },
        { label: "Vendor", value: "BrightTech Components", confidence: 94 },
        { label: "Date", value: "2026-03-11", confidence: 93 }
      ],
      lineItems: [
        { item: "External SSD 1TB", quantity: 14, unitPrice: 9000, invoiceRate: 9000, total: 126000 },
        { item: "Portable Projector", quantity: 4, unitPrice: 42000, invoiceRate: 42000, total: 168000 },
        { item: "HDMI Cable 2m", quantity: 25, unitPrice: 450, invoiceRate: 450, total: 11250 },
        { item: "Wireless Presenter", quantity: 10, unitPrice: 2500, invoiceRate: 2500, total: 25000 },
        { item: "Desk Power Strip", quantity: 12, unitPrice: 950, invoiceRate: 950, total: 11400 },
        { item: "Tablet Stand", quantity: 7, unitPrice: 1600, invoiceRate: 1600, total: 11200 }
      ]
    },

    invoice: {
      currency: "INR",
      fields: [
        { label: "Invoice Number", value: "INV-9010", confidence: 97 },
        { label: "Vendor", value: "BrightTech Components", confidence: 96 },
        { label: "Date", value: "2026-03-11", confidence: 95 }
      ],
      lineItems: [
        { item: "External SSD 1TB", quantity: 14, unitPrice: 9000, invoiceRate: 9000, total: 126000 },
        { item: "Portable Projector", quantity: 5, unitPrice: 42000, invoiceRate: 42000, total: 210000 }, // Qty mismatch
        { item: "HDMI Cable 2m", quantity: 25, unitPrice: 450, invoiceRate: 450, total: 11250 },
        { item: "Wireless Presenter", quantity: 10, unitPrice: 2500, invoiceRate: 2800, total: 28000 }, // Price mismatch
        { item: "Desk Power Strip", quantity: 12, unitPrice: 950, invoiceRate: 950, total: 11400 },
        { item: "Tablet Stand", quantity: 7, unitPrice: 1600, invoiceRate: 1600, total: 11200 }
      ]
    }
  },
  {
    id: "INV-9001-3",
    purchaseOrder: {
      currency: "INR",
      fields: [
        { label: "PO Number", value: "PO-4482", confidence: 96 },
        { label: "Vendor", value: "NextWave Electronics", confidence: 95 },
        { label: "Date", value: "2026-03-02", confidence: 94 }
      ],
      lineItems: [
        { item: "Router WiFi 6", quantity: 9, unitPrice: 8500, invoiceRate: 8500, total: 76500 },
        { item: "Network Switch 24 Port", quantity: 3, unitPrice: 1800, invoiceRate: 1800, total: 54000 },
        { item: "Cat6 Cable Box", quantity: 6, unitPrice: 4200, invoiceRate: 4200, total: 25200 },
        { item: "Patch Panel 24 Port", quantity: 5, unitPrice: 3200, invoiceRate: 3200, total: 16000 },
        { item: "Server Rack Shelf", quantity: 4, unitPrice: 2500, invoiceRate: 2500, total: 10000 },
        { item: "UPS 1kVA", quantity: 3, unitPrice: 12000, invoiceRate: 12000, total: 36000 }
      ]
    },

    grn: {
      currency: "INR",
      fields: [
        { label: "GRN Number", value: "GRN-610", confidence: 95 },
        { label: "Vendor", value: "NextWave Electronics", confidence: 94 },
        { label: "Date", value: "2026-03-02", confidence: 93 }
      ],
      lineItems: [
        { item: "Router WiFi 6", quantity: 9, unitPrice: 8500, invoiceRate: 8500, total: 76500 },
        { item: "Network Switch 24 Port", quantity: 3, unitPrice: 18000, invoiceRate: 18000, total: 54000 },
        { item: "Cat6 Cable Box", quantity: 6, unitPrice: 4200, invoiceRate: 4200, total: 25200 },
        { item: "Patch Panel 24 Port", quantity: 5, unitPrice: 3200, invoiceRate: 3200, total: 16000 },
        { item: "Server Rack Shelf", quantity: 4, unitPrice: 2500, invoiceRate: 2500, total: 10000 },
        { item: "UPS 1kVA", quantity: 3, unitPrice: 12000, invoiceRate: 12000, total: 36000 }
      ]
    },

    invoice: {
      currency: "INR",
      fields: [
        { label: "Invoice Number", value: "INV-9033", confidence: 97 },
        { label: "Vendor", value: "NextWave Electronics", confidence: 96 },
        { label: "Date", value: "2026-03-02", confidence: 95 }
      ],
      lineItems: [
        { item: "Router WiFi 6", quantity: 9, unitPrice: 8500, invoiceRate: 8500, total: 76500 },
        { item: "Network Switch 24 Port", quantity: 3, unitPrice: 18000, invoiceRate: 18000, total: 54000 },
        { item: "Cat6e Cable Box", quantity: 6, unitPrice: 4200, invoiceRate: 4200, total: 25200 }, // Item text mismatch
        { item: "Patch Panel 24 Port", quantity: 5, unitPrice: 3200, invoiceRate: 3200, total: 16000 },
        { item: "Server Rack Shelf", quantity: 4, unitPrice: 2500, invoiceRate: 2500, total: 10000 },
        { item: "UPS 1kVA", quantity: 3, unitPrice: 12000, invoiceRate: 12000, total: 36000 }
      ]
    }
  },
  {
    id: "INV-9002",
    purchaseOrder: {
      currency: "INR",
      fields: [
        { label: "PO Number", value: "PO-5521", confidence: 95 },
        { label: "Vendor", value: "Urban Workspace Supplies", confidence: 94 },
        { label: "Date", value: "2026-03-01", confidence: 94 }
      ],
      lineItems: [
        { item: "Whiteboard Magnetic", quantity: 10, unitPrice: 4200, invoiceRate: 4200, total: 42000 },
        { item: "Office Storage Cabinet", quantity: 4, unitPrice: 18000, invoiceRate: 18000, total: 72000 },
        { item: "Conference Speakerphone", quantity: 3, unitPrice: 15000, invoiceRate: 15000, total: 45000 },
        { item: "Document Shredder", quantity: 2, unitPrice: 9500, invoiceRate: 9500, total: 19000 },
        { item: "Label Printer", quantity: 5, unitPrice: 6500, invoiceRate: 6500, total: 32500 },
        { item: "Wall Clock Digital", quantity: 8, unitPrice: 2200, invoiceRate: 2200, total: 17600 }
      ]
    },

    grn: {
      currency: "INR",
      fields: [
        { label: "GRN Number", value: "GRN-702", confidence: 94 },
        { label: "Vendor", value: "Urban Workspace Supplies", confidence: 94 },
        { label: "Date", value: "2026-03-01", confidence: 93 }
      ],
      lineItems: [
        { item: "Whiteboard Magnetic", quantity: 8, unitPrice: 4200, invoiceRate: 4200, total: 33600 }, // Qty mismatch: PO=10, GRN=8
        { item: "Office Storage Cabinet", quantity: 4, unitPrice: 18000, invoiceRate: 18000, total: 72000 },
        { item: "Conference Speakerphone", quantity: 3, unitPrice: 15000, invoiceRate: 15000, total: 45000 },
        { item: "Document Shredder", quantity: 2, unitPrice: 9500, invoiceRate: 9500, total: 19000 },
        { item: "Label Printer", quantity: 5, unitPrice: 6500, invoiceRate: 6500, total: 32500 },
        { item: "Wall Clock Digital", quantity: 6, unitPrice: 2200, invoiceRate: 2200, total: 13200 } // mismatched quantity
      ]
    },

    invoice: {
      currency: "INR",
      fields: [
        { label: "Invoice Number", value: "INV-9044", confidence: 97 },
        { label: "Vendor", value: "Urban Workspace Supplies", confidence: 96 },
        { label: "Date", value: "2026-03-01", confidence: 95 }
      ],
      lineItems: [
        { item: "Whiteboard Magnetic", quantity: 4, unitPrice: 4200, invoiceRate: 4200, total: 16800 }, // Qty mismatch: PO=10, GRN=8(prev), INV=4
        { item: "Office Storage Cabinet", quantity: 4, unitPrice: 18000, invoiceRate: 18000, total: 72000 },
        { item: "Conference Speakerphone", quantity: 3, unitPrice: 15000, invoiceRate: 15000, total: 45000 },
        { item: "Document Shredder", quantity: 2, unitPrice: 9500, invoiceRate: 9500, total: 19000 },
        { item: "Label Printer", quantity: 5, unitPrice: 6500, invoiceRate: 6500, total: 32500 },
        { item: "Wall Clock Digital", quantity: 8, unitPrice: 2200, invoiceRate: 2200, total: 17600 }
      ]
    }
  },

  {
    id: "INV-9003",
    purchaseOrder: {
      currency: "INR",
      fields: [
        { label: "PO Number", value: "PO-1003", confidence: 97 },
        { label: "Vendor", value: "Global Tech Trading", confidence: 96 },
        { label: "Date", value: "2026-02-15", confidence: 96 }
      ],
      lineItems: [
        { item: "Server Rack", quantity: 2, unitPrice: 150000, invoiceRate: 150000, total: 300000 },
        { item: "Network Switch", quantity: 5, unitPrice: 25000, invoiceRate: 25000, total: 125000 },
        { item: "Patch Cables", quantity: 50, unitPrice: 500, invoiceRate: 500, total: 25000 },
        { item: "UPS System", quantity: 2, unitPrice: 85000, invoiceRate: 85000, total: 170000 },
        { item: "Cooling Fan", quantity: 8, unitPrice: 5000, invoiceRate: 5000, total: 40000 },
        { item: "Cable Organizer", quantity: 10, unitPrice: 1200, invoiceRate: 1200, total: 12000 }
      ]
    },

    grn: {
      currency: "INR",
      fields: [
        { label: "GRN Number", value: "GRN-206", confidence: 96 },
        { label: "Vendor", value: "Global Tech Trading", confidence: 95 },
        { label: "Date", value: "2026-02-15", confidence: 96 }
      ],
      lineItems: [
        { item: "Server Rack", quantity: 2, unitPrice: 150000, invoiceRate: 150000, total: 300000 },
        { item: "Network Switch", quantity: 5, unitPrice: 25000, invoiceRate: 25000, total: 125000 },
        { item: "Patch Cables", quantity: 50, unitPrice: 500, invoiceRate: 500, total: 25000 },
        { item: "UPS System", quantity: 2, unitPrice: 85000, invoiceRate: 85000, total: 170000 },
        { item: "Cooling Fan", quantity: 8, unitPrice: 5000, invoiceRate: 5000, total: 40000 },
        { item: "Cable Organizer", quantity: 10, unitPrice: 1200, invoiceRate: 1200, total: 12000 }
      ]
    },

    invoice: {
      currency: "AED",
      fields: [
        { label: "Invoice Number", value: "INV-9003", confidence: 98 },
        { label: "Vendor", value: "Global Tech Trading", confidence: 97 },
        { label: "Date", value: "2026-02-15", confidence: 96 }
      ],
      lineItems: [
        { item: "Server Rack", quantity: 2, unitPrice: 150000, invoiceRate: 6600, total: 13200 },
        { item: "Network Switch", quantity: 5, unitPrice: 25000, invoiceRate: 1100, total: 5500 },
        { item: "Patch Cables", quantity: 50, unitPrice: 500, invoiceRate: 22, total: 1100 },
        { item: "UPS System", quantity: 2, unitPrice: 85000, invoiceRate: 3740, total: 7480 },
        { item: "Cooling Fan", quantity: 8, unitPrice: 5000, invoiceRate: 220, total: 1760 },
        { item: "Cable Organizer", quantity: 10, unitPrice: 1200, invoiceRate: 53, total: 530 }
      ]
    }
  },
  {
    id: "INV-9004",
    purchaseOrder: {
      currency: "INR",
      fields: [
        { label: "PO Number", value: "PO-1004", confidence: 96 },
        { label: "Vendor", value: "Office Supplies Co", confidence: 95 },
        { label: "Date", value: "2026-02-10", confidence: 96 }
      ],
      lineItems: [
        { item: "Office Chair - Ergonomic", quantity: 5, unitPrice: 15000, invoiceRate: 15000, total: 75000 },
        { item: "Standing Desk", quantity: 2, unitPrice: 35000, invoiceRate: 35000, total: 70000 },
        { item: "Monitor Arm", quantity: 2, unitPrice: 4000, invoiceRate: 4000, total: 8000 },
        { item: "Filing Cabinet", quantity: 3, unitPrice: 12000, invoiceRate: 12000, total: 36000 },
        { item: "Desk Lamp", quantity: 5, unitPrice: 1800, invoiceRate: 1800, total: 9000 }
      ]
    },

    grn: {
      currency: "INR",
      fields: [
        { label: "GRN Number", value: "GRN-207", confidence: 94 },
        { label: "Vendor", value: "Office Supplies Co", confidence: 95 },
        { label: "Date", value: "2026-02-10", confidence: 96 }
      ],
      lineItems: [
        { item: "Office Chair - Standard", quantity: 5, unitPrice: 15000, invoiceRate: 15000, total: 75000 }, // Mismatched Item
        { item: "Standing Desk", quantity: 2, unitPrice: 35000, invoiceRate: 35000, total: 70000 },
        { item: "Monitor Arm", quantity: 2, unitPrice: 4000, invoiceRate: 4000, total: 8000 },
        { item: "Filing Cabinet", quantity: 3, unitPrice: 12000, invoiceRate: 12000, total: 36000 },
        { item: "Desk Lamp", quantity: 5, unitPrice: 1800, invoiceRate: 1800, total: 9000 }
      ]
    },

    invoice: {
      currency: "INR",
      fields: [
        { label: "Invoice Number", value: "INV-9004", confidence: 98 },
        { label: "Vendor", value: "Office Supplies Co", confidence: 97 },
        { label: "Date", value: "2026-02-10", confidence: 96 }
      ],
      lineItems: [
        { item: "Office Chair - Ergonomic", quantity: 5, unitPrice: 15000, invoiceRate: 15000, total: 75000 },
        { item: "Standing Desk", quantity: 2, unitPrice: 35000, invoiceRate: 35000, total: 70000 },
        { item: "Monitor Arm", quantity: 2, unitPrice: 4000, invoiceRate: 4000, total: 8000 },
        { item: "Filing Cabinet", quantity: 3, unitPrice: 12000, invoiceRate: 12000, total: 36000 },
        { item: "Desk Lamp", quantity: 5, unitPrice: 1800, invoiceRate: 1800, total: 9000 }
      ]
    }
  },
  {
    id: "INV-9952315504",
    purchaseOrder: {
      currency: "AED",
      fields: [
        { label: "PO Number", value: "4519538232", confidence: 96 },
        { label: "Vendor", value: "Vista Distributors LLC", confidence: 95 },
        { label: "Date", value: "2026-02-04", confidence: 94 }
      ],
      lineItems: [
        { item: "SUNNY VEGETABLE OIL 1.8L BOTTLE", quantity: 36, unitPrice: 8.75, invoiceRate: 8.75, total: 315.00 },
        { item: "RUBY BASMATI RICE 5KG BAG", quantity: 100, unitPrice: 24.50, invoiceRate: 24.50, total: 2450.00 },
        { item: "OREO COOKIES 36G PACK", quantity: 60, unitPrice: 6.90, invoiceRate: 6.90, total: 414.00 },
        { item: "SPRITE CAN DRINK 330ML", quantity: 48, unitPrice: 2.75, invoiceRate: 2.75, total: 132.00 }
      ]
    },
    grn: {
      currency: "AED",
      fields: [
        { label: "GRN Number", value: "7073622334", confidence: 95 },
        { label: "Vendor", value: "Vista Distributors LLC", confidence: 95 },
        { label: "Date", value: "2026-02-04", confidence: 94 }
      ],
      lineItems: [
        { item: "SUNNY VEGETABLE OIL 1.8L BOTTLE", quantity: 36, unitPrice: 8.75, invoiceRate: 8.75, total: 315.00 },
        { item: "RUBY BASMATI RICE 5KG BAG", quantity: 100, unitPrice: 24.50, invoiceRate: 24.50, total: 2450.00 },
        { item: "OREO COOKIES 36G PACK", quantity: 60, unitPrice: 6.90, invoiceRate: 6.90, total: 414.00 },
        { item: "SPRITE CAN DRINK 330ML", quantity: 48, unitPrice: 2.75, invoiceRate: 2.75, total: 132.00 }
      ]
    },
    invoice: {
      currency: "AED",
      fields: [
        { label: "Invoice Number", value: "9952315504", confidence: 98 },
        { label: "Vendor", value: "Vista Distributors LLC", confidence: 97 },
        { label: "Date", "value": "2026-02-04", confidence: 96 }
      ],
      lineItems: [
        { item: "SUNNY VEGETABLE OIL 1.8L BOTTLE", quantity: 36, unitPrice: 8.75, invoiceRate: 8.75, total: 315.00 },
        { item: "RUBY BASMATI RICE 5KG BAG", quantity: 100, unitPrice: 24.50, invoiceRate: 24.50, total: 2450.00 },
        { item: "OREO COOKIES 36G PACK", quantity: 60, unitPrice: 6.90, invoiceRate: 6.90, total: 414.00 },
        { item: "SPRITE CAN DRINK 330ML", quantity: 48, unitPrice: 2.75, invoiceRate: 2.75, total: 132.00 }
      ]
    }
  },
  {
    id: "INV-K138567",
    purchaseOrder: {
      currency: "AED",
      fields: [
        { label: "PO Number", value: "45198499", confidence: 96 },
        { label: "Vendor", value: "Al Azeez Enterprises LLC", confidence: 95 },
        { label: "Date", value: "2026-02-01", confidence: 94 }
      ],
      lineItems: [
        { item: "CHICKEN SAMOSAS", quantity: 2, unitPrice: 122.00, invoiceRate: 122.00, total: 244.00 },
        { item: "ZINGER BURGERS", quantity: 2, unitPrice: 150.00, invoiceRate: 150.00, total: 300.00 },
        { item: "MINI KEBABS", quantity: 1, unitPrice: 150.00, invoiceRate: 150.00, total: 150.00 },
        { item: "VEG SPRING ROLLS", quantity: 8, unitPrice: 170.00, invoiceRate: 170.00, total: 1360.00 }
      ]
    },
    grn: {
      currency: "AED",
      fields: [
        { label: "GRN Number", value: "SOL9822003", confidence: 95 },
        { label: "Vendor", value: "Al Azeez Enterprises LLC", confidence: 95 },
        { label: "Date", value: "2026-02-01", confidence: 94 }
      ],
      lineItems: [
        { item: "CHICKEN SAMOSAS", quantity: 2, unitPrice: 122.00, invoiceRate: 122.00, total: 244.00 },
        { item: "ZINGER BURGERS", quantity: 2, unitPrice: 150.00, invoiceRate: 150.00, total: 300.00 },
        { item: "MINI KEBABS", quantity: 1, unitPrice: 150.00, invoiceRate: 150.00, total: 150.00 },
        { item: "VEG SPRING ROLLS", quantity: 8, unitPrice: 170.00, invoiceRate: 170.00, total: 1360.00 }
      ]
    },
    invoice: {
      currency: "AED",
      fields: [
        { label: "Invoice Number", value: "K138567", confidence: 98 },
        { label: "Vendor", value: "Al Azeez Enterprises LLC", confidence: 97 },
        { label: "Date", value: "2026-02-01", confidence: 96 }
      ],
      lineItems: [
        { item: "CHICKEN SAMOSAS", quantity: 2, unitPrice: 122.00, invoiceRate: 122.00, total: 244.00 },
        { item: "ZINGER BURGERS", quantity: 2, unitPrice: 150.00, invoiceRate: 150.00, total: 300.00 },
        { item: "MINI KEBABS", quantity: 1, unitPrice: 150.00, invoiceRate: 150.00, total: 150.00 },
        { item: "VEG SPRING ROLLS", quantity: 8, unitPrice: 170.00, invoiceRate: 170.00, total: 1360.00 }
      ]
    }
  },
  {
    id: "INV-451983310",
    purchaseOrder: {
      currency: "INR",
      fields: [
        { label: "PO Number", value: "9875584210", confidence: 96 },
        { label: "Vendor", value: "Swift Distributors Pvt Ltd", confidence: 95 },
        { label: "Date", value: "2026-01-30", confidence: 94 }
      ],
      lineItems: [
        { item: "SUNSHINE WHEAT FLOUR 5KG BAG", quantity: 60, unitPrice: 58, invoiceRate: 58, total: 3480 },
        { item: "YUMMY CHOCOLATE COOKIES 120G", quantity: 30, unitPrice: 240, invoiceRate: 240, total: 7200 },
        { item: "PREMIUM BASMATI RICE", quantity: 50, unitPrice: 620, invoiceRate: 620, total: 31000 },
        { item: "SUNNY INSTANT COFFEE 200G", quantity: 24, unitPrice: 280, invoiceRate: 280, total: 6720 }
      ]
    },
    grn: {
      currency: "INR",
      fields: [
        { label: "GRN Number", value: "8901234667", confidence: 95 },
        { label: "Vendor", value: "Swift Distributors Pvt Ltd", confidence: 95 },
        { label: "Date", value: "2026-01-30", confidence: 94 }
      ],
      lineItems: [
        { item: "SUNSHINE WHEAT FLOUR 5KG BAG", quantity: 60, unitPrice: 58, invoiceRate: 58, total: 3480 },
        { item: "YUMMY CHOCOLATE COOKIES 120G", quantity: 30, unitPrice: 240, invoiceRate: 240, total: 7200 },
        { item: "PREMIUM BASMATI RICE", quantity: 50, unitPrice: 620, invoiceRate: 620, total: 31000 },
        { item: "SUNNY INSTANT COFFEE 200G", quantity: 24, unitPrice: 280, invoiceRate: 280, total: 6720 }
      ]
    },
    invoice: {
      currency: "INR",
      fields: [
        { label: "Invoice Number", value: "451983310", confidence: 98 },
        { label: "Vendor", value: "Swift Distributors Pvt Ltd", confidence: 97 },
        { label: "Date", value: "2026-01-30", confidence: 96 }
      ],
      lineItems: [
        { item: "SUNSHINE WHEAT FLOUR 5KG BAG", quantity: 60, unitPrice: 58, invoiceRate: 58, total: 3480 },
        { item: "YUMMY CHOCOLATE COOKIES 120G", quantity: 30, unitPrice: 240, invoiceRate: 240, total: 7200 },
        { item: "PREMIUM BASMATI RICE", quantity: 50, unitPrice: 620, invoiceRate: 620, total: 31000 },
        { item: "SUNNY INSTANT COFFEE 200G", quantity: 24, unitPrice: 280, invoiceRate: 280, total: 6720 }
      ]
    }
  },
  {
    id: "INV-15784210633",
    purchaseOrder: {
      currency: "AED",
      fields: [
        { label: "PO Number", value: "4519880872", confidence: 96 },
        { label: "Vendor", value: "Success General Trading LLC", confidence: 95 },
        { label: "Date", value: "2026-01-25", confidence: 94 }
      ],
      lineItems: [
        { item: "WIRELESS EARBUDS CHARGING CASE", quantity: 10, unitPrice: 120, invoiceRate: 120, total: 1200 },
        { item: "SANDWICH MAKER", quantity: 10, unitPrice: 45, invoiceRate: 45, total: 450 },
        { item: "DIGITAL KITCHEN SCALE 5KG", quantity: 10, unitPrice: 110, invoiceRate: 110, total: 1100 },
      ]
    },
    grn: {
      currency: "AED",
      fields: [
        { label: "GRN Number", value: "CAM960", confidence: 95 },
        { label: "Vendor", value: "Success General Trading LLC", confidence: 95 },
        { label: "Date", value: "2026-01-25", confidence: 94 }
      ],
      lineItems: [
        { item: "WIRELESS EARBUDS CHARGING CASE", quantity: 10, unitPrice: 120, invoiceRate: 120, total: 1200 },
        { item: "SANDWICH MAKER", quantity: 10, unitPrice: 45, invoiceRate: 45, total: 450 },
        { item: "DIGITAL KITCHEN SCALE 5KG", quantity: 10, unitPrice: 110, invoiceRate: 110, total: 1100 },
      ]
    },
    invoice: {
      currency: "AED",
      fields: [
        { label: "Invoice Number", value: "15784210633", confidence: 98 },
        { label: "Vendor", value: "Success General Trading LLC", confidence: 97 },
        { label: "Date", value: "2026-01-25", confidence: 96 }
      ],
      lineItems: [
        { item: "WIRELESS EARBUDS CHARGING CASE", quantity: 10, unitPrice: 120, invoiceRate: 120, total: 1200 },
        { item: "SANDWICH MAKER", quantity: 10, unitPrice: 45, invoiceRate: 45, total: 450 },
        { item: "DIGITAL KITCHEN SCALE 5KG", quantity: 10, unitPrice: 110, invoiceRate: 110, total: 1100 },
      ]
    }
  },
  {
    id: "INV-5001-PERFECT",
    purchaseOrder: {
      currency: "USD",
      fields: [
        { label: "PO Number", value: "PO-USA-001", confidence: 98 },
        { label: "Vendor", value: "Global Cloud Services", confidence: 99 },
        { label: "Date", value: "2026-01-16", confidence: 95 }
      ],
      lineItems: [
        { item: "Enterprise Cloud License 1YR", quantity: 1, unitPrice: 15000, invoiceRate: 15000, total: 15000 },
        { item: "Data Transfer Overages (TB)", quantity: 5, unitPrice: 120, invoiceRate: 120, total: 600 }
      ]
    },
    grn: {
      currency: "USD",
      fields: [
        { label: "GRN Number", value: "GRN-USA-001", confidence: 97 },
        { label: "Vendor", value: "Global Cloud Services", confidence: 99 },
        { label: "Date", value: "2026-01-16", confidence: 95 }
      ],
      lineItems: [
        { item: "Enterprise Cloud License 1YR", quantity: 1, unitPrice: 15000, invoiceRate: 15000, total: 15000 },
        { item: "Data Transfer Overages (TB)", quantity: 5, unitPrice: 120, invoiceRate: 120, total: 600 }
      ]
    },
    invoice: {
      currency: "USD",
      fields: [
        { label: "Invoice Number", value: "INV-GCS-901", confidence: 99 },
        { label: "Vendor", value: "Global Cloud Services", confidence: 99 },
        { label: "Date", value: "2026-01-16", confidence: 96 }
      ],
      lineItems: [
        { item: "Enterprise Cloud License 1YR", quantity: 1, unitPrice: 15000, invoiceRate: 15000, total: 15000 },
        { item: "Data Transfer Overages (TB)", quantity: 5, unitPrice: 120, invoiceRate: 120, total: 600 }
      ]
    }
  },
  {
    id: "INV-5002-QTY-MISMATCH",
    purchaseOrder: {
      currency: "GBP",
      fields: [
        { label: "PO Number", value: "PO-UK-044", confidence: 95 },
        { label: "Vendor", value: "London Office Supplies", confidence: 94 },
        { label: "Date", value: "2026-01-10", confidence: 92 }
      ],
      lineItems: [
        { item: "Premium Copier Paper A4", quantity: 50, unitPrice: 15, invoiceRate: 15, total: 750 },
        { item: "Ink Cartridge Black", quantity: 10, unitPrice: 45, invoiceRate: 45, total: 450 }
      ]
    },
    grn: {
      currency: "GBP",
      fields: [
        { label: "GRN Number", value: "GRN-UK-044", confidence: 95 },
        { label: "Vendor", value: "London Office Supplies", confidence: 94 },
        { label: "Date", value: "2026-01-10", confidence: 92 }
      ],
      lineItems: [
        { item: "Premium Copier Paper A4", quantity: 45, unitPrice: 15, invoiceRate: 15, total: 675 }, // Short delivery
        { item: "Ink Cartridge Black", quantity: 10, unitPrice: 45, invoiceRate: 45, total: 450 }
      ]
    },
    invoice: {
      currency: "GBP",
      fields: [
        { label: "Invoice Number", value: "INV-LOS-112", confidence: 98 },
        { label: "Vendor", value: "London Office Supplies", confidence: 94 },
        { label: "Date", value: "2026-01-10", confidence: 95 }
      ],
      lineItems: [
        { item: "Premium Copier Paper A4", quantity: 50, unitPrice: 15, invoiceRate: 15, total: 750 }, // Billed for full PO amount
        { item: "Ink Cartridge Black", quantity: 10, unitPrice: 45, invoiceRate: 45, total: 450 }
      ]
    }
  },
  {
    id: "INV-5003-ITEM-MISMATCH",
    purchaseOrder: {
      currency: "EUR",
      fields: [
        { label: "PO Number", value: "PO-EU-881", confidence: 97 },
        { label: "Vendor", value: "Berlin Tech Hub", confidence: 98 },
        { label: "Date", value: "2026-01-07", confidence: 96 }
      ],
      lineItems: [
        { item: "ThinkPad T14 Gen 4", quantity: 5, unitPrice: 1200, invoiceRate: 1200, total: 6000 },
        { item: "USB-C Travel Hub", quantity: 5, unitPrice: 85, invoiceRate: 85, total: 425 }
      ]
    },
    grn: {
      currency: "EUR",
      fields: [
        { label: "GRN Number", value: "GRN-EU-881", confidence: 96 },
        { label: "Vendor", value: "Berlin Tech Hub", confidence: 97 },
        { label: "Date", value: "2026-01-07", confidence: 95 }
      ],
      lineItems: [
        { item: "ThinkPad T14s Gen 4 (Substituted model)", quantity: 5, unitPrice: 1200, invoiceRate: 1200, total: 6000 }, // Item text mismatch
        { item: "USB-C Travel Hub", quantity: 5, unitPrice: 85, invoiceRate: 85, total: 425 }
      ]
    },
    invoice: {
      currency: "EUR",
      fields: [
        { label: "Invoice Number", value: "INV-BTH-2026", confidence: 99 },
        { label: "Vendor", value: "Berlin Tech Hub", confidence: 98 },
        { label: "Date", value: "2026-01-07", confidence: 97 }
      ],
      lineItems: [
        { item: "ThinkPad T14s Gen 4", quantity: 5, unitPrice: 1300, invoiceRate: 1300, total: 6500 }, // Item and Price mismatch
        { item: "USB-C Travel Hub", quantity: 5, unitPrice: 85, invoiceRate: 85, total: 425 }
      ]
    }
  },
  {
    id: "INV-5004-CURR-MISMATCH",
    purchaseOrder: {
      currency: "AED",
      fields: [
        { label: "PO Number", value: "PO-UAE-555", confidence: 93 },
        { label: "Vendor", value: "Gulf IT Solutions", confidence: 96 },
        { label: "Date", value: "2026-01-05", confidence: 94 }
      ],
      lineItems: [
        { item: "Cisco Catalyst 9300", quantity: 2, unitPrice: 15000, invoiceRate: 15000, total: 30000 },
        { item: "Fiber Optic Cable 10m", quantity: 20, unitPrice: 100, invoiceRate: 100, total: 2000 }
      ]
    },
    grn: {
      currency: "AED",
      fields: [
        { label: "GRN Number", value: "GRN-UAE-555", confidence: 94 },
        { label: "Vendor", value: "Gulf IT Solutions", confidence: 95 },
        { label: "Date", value: "2026-01-05", confidence: 93 }
      ],
      lineItems: [
        { item: "Cisco Catalyst 9300", quantity: 2, unitPrice: 15000, invoiceRate: 15000, total: 30000 },
        { item: "Fiber Optic Cable 10m", quantity: 20, unitPrice: 100, invoiceRate: 100, total: 2000 }
      ]
    },
    invoice: {
      currency: "USD", // Highlighted Red currency mismatch
      fields: [
        { label: "Invoice Number", value: "INV-GIT-099", confidence: 98 },
        { label: "Vendor", value: "Gulf IT Solutions", confidence: 97 },
        { label: "Date", value: "2026-01-05", confidence: 96 }
      ],
      lineItems: [
        { item: "Cisco Catalyst 9300", quantity: 2, unitPrice: 4085, invoiceRate: 4085, total: 8170 }, // Billed in USD instead of AED
        { item: "Fiber Optic Cable 10m", quantity: 20, unitPrice: 27, invoiceRate: 27, total: 540 }
      ]
    }
  },
  {
    id: "INV-5005-PRICE-MISMATCH",
    purchaseOrder: {
      currency: "SGD",
      fields: [
        { label: "PO Number", value: "PO-SG-101", confidence: 98 },
        { label: "Vendor", value: "Marina Logistics", confidence: 97 },
        { label: "Date", value: "2026-01-01", confidence: 96 }
      ],
      lineItems: [
        { item: "Monthly Warehouse Storage Fee", quantity: 1, unitPrice: 12000, invoiceRate: 12000, total: 12000 },
        { item: "Forklift Rental", quantity: 2, unitPrice: 800, invoiceRate: 800, total: 1600 }
      ]
    },
    grn: {
      currency: "SGD",
      fields: [
        { label: "GRN Number", value: "GRN-SG-101", confidence: 97 },
        { label: "Vendor", value: "Marina Logistics", confidence: 96 },
        { label: "Date", value: "2026-01-01", confidence: 95 }
      ],
      lineItems: [
        { item: "Monthly Warehouse Storage Fee", quantity: 1, unitPrice: 12000, invoiceRate: 12000, total: 12000 },
        { item: "Forklift Rental", quantity: 2, unitPrice: 800, invoiceRate: 800, total: 1600 }
      ]
    },
    invoice: {
      currency: "SGD",
      fields: [
        { label: "Invoice Number", value: "INV-MAR-555", confidence: 99 },
        { label: "Vendor", value: "Marina Logistics", confidence: 98 },
        { label: "Date", value: "2026-01-01", confidence: 97 }
      ],
      lineItems: [
        { item: "Monthly Warehouse Storage Fee", quantity: 1, unitPrice: 13500, invoiceRate: 13500, total: 13500 }, // Unexpected price hike
        { item: "Forklift Rental", quantity: 2, unitPrice: 800, invoiceRate: 800, total: 1600 }
      ]
    }
  }
];
