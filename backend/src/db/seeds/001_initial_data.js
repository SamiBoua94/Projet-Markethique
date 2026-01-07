exports.seed = async function (knex) {
    // Clean up existing data in reverse order of dependencies
    await knex('reviews').del();
    await knex('wishlist_items').del();
    await knex('messages').del();
    await knex('order_items').del();
    await knex('orders').del();
    await knex('addresses').del();
    await knex('products').del();
    await knex('categories').del();
    await knex('seller_profiles').del();
    await knex('users').del();

    // Create users (sellers and buyers)
    await knex('users').insert([
        { id: 1, name: 'Boutique Éco', email: 'eco@markethique.fr', password_hash: '$2a$10$dummy', role: 'seller', is_active: true },
        { id: 2, name: 'Tech Innovation', email: 'tech@markethique.fr', password_hash: '$2a$10$dummy', role: 'seller', is_active: true },
        { id: 3, name: 'Mode Éthique', email: 'mode@markethique.fr', password_hash: '$2a$10$dummy', role: 'seller', is_active: true },
        { id: 4, name: 'Bio & Local', email: 'bio@markethique.fr', password_hash: '$2a$10$dummy', role: 'seller', is_active: true },
        { id: 5, name: 'Marie Dupont', email: 'marie@example.com', password_hash: '$2a$10$dummy', role: 'buyer', is_active: true },
        { id: 6, name: 'Jean Martin', email: 'jean@example.com', password_hash: '$2a$10$dummy', role: 'buyer', is_active: true }
    ]);

    // Create seller profiles
    await knex('seller_profiles').insert([
        {
            user_id: 1,
            shop_name: 'Boutique Éco',
            description: 'Nous proposons des produits écologiques et durables pour un mode de vie responsable. Notre mission est de rendre les produits éco-responsables accessibles à tous.',
            phone: '01 23 45 67 89',
            address: '12 Rue Verte, 75001 Paris'
        },
        {
            user_id: 2,
            shop_name: 'Tech Innovation',
            description: 'Les dernières technologies au service de l\'innovation. Nous sélectionnons les meilleurs gadgets et appareils électroniques pour vous.',
            phone: '01 98 76 54 32',
            address: '45 Avenue du Futur, 69001 Lyon'
        },
        {
            user_id: 3,
            shop_name: 'Mode Éthique',
            description: 'Vêtements responsables et tendance. Notre collection est fabriquée à partir de matières recyclées et biologiques, dans le respect des travailleurs.',
            phone: '01 55 66 77 88',
            address: '8 Boulevard du Style, 33000 Bordeaux'
        },
        {
            user_id: 4,
            shop_name: 'Bio & Local',
            description: 'Produits locaux et biologiques directement des producteurs. Nous travaillons avec des agriculteurs locaux pour vous offrir le meilleur de la nature.',
            phone: '01 11 22 33 44',
            address: '23 Chemin des Fermes, 31000 Toulouse'
        }
    ]);

    // Create categories
    await knex('categories').insert([
        { id: 1, name: 'Art & Artisanat', slug: 'art-artisanat' },
        { id: 2, name: 'Mode & Accessoires', slug: 'mode-accessoires' },
        { id: 3, name: 'Cosmétiques', slug: 'cosmetiques' },
        { id: 4, name: 'Services', slug: 'services' },
        { id: 5, name: 'Alimentation', slug: 'alimentation' },
        { id: 6, name: 'Électronique', slug: 'electronique' }
    ]);

    // Create products for Boutique Éco (seller 1)
    await knex('products').insert([
        { id: 1, seller_id: 1, category_id: 3, title: 'Bouteille Réutilisable Inox', description: 'Bouteille en acier inoxydable, 500ml, garde vos boissons fraîches 24h', price: 24.99, stock: 50, is_active: true },
        { id: 2, seller_id: 1, category_id: 3, title: 'Brosse à dents Bambou', description: 'Lot de 4 brosses à dents en bambou biodégradable', price: 9.99, stock: 100, is_active: true },
        { id: 3, seller_id: 1, category_id: 1, title: 'Sac en Toile de Jute', description: 'Sac cabas réutilisable en toile de jute naturelle', price: 15.50, stock: 75, is_active: true },
        { id: 4, seller_id: 1, category_id: 3, title: 'Kit Zéro Déchet', description: 'Kit complet pour débuter le zéro déchet : bee wraps, sacs en tissu, etc.', price: 34.99, stock: 30, is_active: true }
    ]);

    // Create products for Tech Innovation (seller 2)
    await knex('products').insert([
        { id: 5, seller_id: 2, category_id: 6, title: 'Casque Audio Premium', description: 'Casque sans fil avec réduction de bruit active, autonomie 30h', price: 149.99, stock: 25, is_active: true },
        { id: 6, seller_id: 2, category_id: 6, title: 'Chargeur Solaire Portable', description: 'Chargeur solaire 20000mAh pour tous vos appareils', price: 59.99, stock: 40, is_active: true },
        { id: 7, seller_id: 2, category_id: 6, title: 'Enceinte Bluetooth Eco', description: 'Enceinte imperméable fabriquée à partir de plastique recyclé', price: 79.99, stock: 35, is_active: true }
    ]);

    // Create products for Mode Éthique (seller 3)
    await knex('products').insert([
        { id: 8, seller_id: 3, category_id: 2, title: 'T-shirt Bio Unisexe', description: 'T-shirt en coton bio certifié GOTS, coupe classique', price: 29.99, stock: 80, is_active: true },
        { id: 9, seller_id: 3, category_id: 2, title: 'Jean Recyclé', description: 'Jean fabriqué à partir de fibres recyclées, coupe slim', price: 89.99, stock: 45, is_active: true },
        { id: 10, seller_id: 3, category_id: 2, title: 'Sneakers Vegan', description: 'Baskets 100% vegan, matières recyclées, confort optimal', price: 119.00, stock: 30, is_active: true },
        { id: 11, seller_id: 3, category_id: 2, title: 'Sac à Dos Écoresponsable', description: 'Sac à dos en PET recyclé, capacité 20L, résistant à l\'eau', price: 65.00, stock: 50, is_active: true }
    ]);

    // Create products for Bio & Local (seller 4)
    await knex('products').insert([
        { id: 12, seller_id: 4, category_id: 5, title: 'Panier Fruits Bio', description: 'Panier de fruits de saison bio, livré chaque semaine', price: 19.99, stock: 100, is_active: true },
        { id: 13, seller_id: 4, category_id: 5, title: 'Miel de Provence', description: 'Miel artisanal de lavande, pot de 500g', price: 12.50, stock: 60, is_active: true },
        { id: 14, seller_id: 4, category_id: 5, title: 'Huile d\'Olive Extra Vierge', description: 'Huile d\'olive bio première pression à froid, 75cl', price: 18.90, stock: 45, is_active: true }
    ]);

    // Create some reviews
    await knex('reviews').insert([
        { product_id: 1, user_id: 5, rating: 5, comment: 'Excellente bouteille, garde ma boisson fraîche toute la journée !' },
        { product_id: 1, user_id: 6, rating: 4, comment: 'Très bonne qualité, juste un peu lourde' },
        { product_id: 2, user_id: 5, rating: 5, comment: 'Super produit, je recommande !' },
        { product_id: 5, user_id: 6, rating: 5, comment: 'Son incroyable, réduction de bruit top' },
        { product_id: 5, user_id: 5, rating: 4, comment: 'Très bon casque, confortable' },
        { product_id: 8, user_id: 6, rating: 5, comment: 'T-shirt très confortable et éco-responsable' },
        { product_id: 9, user_id: 5, rating: 4, comment: 'Bon jean, coupe parfaite' },
        { product_id: 12, user_id: 5, rating: 5, comment: 'Fruits frais et délicieux chaque semaine' },
        { product_id: 13, user_id: 6, rating: 5, comment: 'Le meilleur miel que j\'ai goûté !' }
    ]);
};
