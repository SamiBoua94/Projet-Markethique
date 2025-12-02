export const products = [
    {
        id: 1,
        name: "Abstract Oil Painting",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=400&h=300&fit=crop",
        category: "Art",
        rating: 4.8,
        description: "Original hand-painted artwork"
    },
    {
        id: 2,
        name: "Handcrafted Wood Sculpture",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop",
        category: "Art",
        rating: 4.9,
        description: "Unique solid wood sculpture"
    },
    {
        id: 3,
        name: "Artisanal Ceramic Pottery",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop",
        category: "Art",
        rating: 4.7,
        description: "Handmade ceramic vase"
    },
    {
        id: 4,
        name: "Handmade Silver Jewelry",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
        category: "Handmade",
        rating: 4.8,
        description: "Silver necklace crafted by hand"
    },
    {
        id: 5,
        name: "Artisanal Leather Bag",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop",
        category: "Handmade",
        rating: 4.6,
        description: "Genuine leather hand-sewn bag"
    },
    {
        id: 6,
        name: "Hand-Knitted Wool Scarf",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=300&fit=crop",
        category: "Handmade",
        rating: 4.5,
        description: "100% wool hand-knitted scarf"
    },
    {
        id: 7,
        name: "Handmade Scented Candles",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1602874801006-93c03b601a5b?w=400&h=300&fit=crop",
        category: "Handmade",
        rating: 4.7,
        description: "Natural scented candle set"
    },
    {
        id: 8,
        name: "Bike Repair Service",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop",
        category: "Service Shop",
        rating: 4.9,
        description: "Bicycle repair and maintenance"
    },
    {
        id: 9,
        name: "Sewing & Alterations",
        price: 35.99,
        image: "https://images.unsplash.com/photo-1558551649-e44c8f992010?w=400&h=300&fit=crop",
        category: "Service Shop",
        rating: 4.8,
        description: "Professional sewing service"
    },
    {
        id: 10,
        name: "Furniture Restoration",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
        category: "Service Shop",
        rating: 4.7,
        description: "Artisanal furniture restoration"
    },
    {
        id: 11,
        name: "Natural Handmade Soaps",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=300&fit=crop",
        category: "Handmade",
        rating: 4.6,
        description: "100% natural handmade soaps"
    },
    {
        id: 12,
        name: "Custom Calligraphy",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=400&h=300&fit=crop",
        category: "Art",
        rating: 4.9,
        description: "Personalized calligraphy service"
    }
];

export const categories = [
    {
        name: "All",
        subcategories: []
    },
    {
        name: "Art",
        subcategories: ["Paintings", "Sculptures", "Pottery", "Calligraphy"]
    },
    {
        name: "Handmade",
        subcategories: ["Jewelry", "Leather Goods", "Textiles", "Candles & Soaps"]
    },
    {
        name: "Service Shop",
        subcategories: ["Repairs", "Alterations", "Restoration", "Custom Work"]
    },
    {
        name: "Discount",
        subcategories: ["Flash Sales", "Clearance", "Daily Deals", "Last Chance"]
    }
];
