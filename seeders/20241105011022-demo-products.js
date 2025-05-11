'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {

        name: 'Apple',
        price: 1.99,
        description: 'Fresh and juicy apple',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Banana',
        price: 0.99,
        description: 'Sweet and nutritious banana',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Orange',
        price: 1.49,
        description: 'Citrusy and refreshing orange',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Grapes',
        price: 2.99,
        description: 'Plump and delicious grapes',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Watermelon',
        price: 4.99,
        description: 'Juicy and hydrating watermelon',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Strawberries',
        price: 3.49,
        description: 'Sweet and tangy strawberries',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Pineapple',
        price: 2.99,
        description: 'Tropical and refreshing pineapple',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Mango',
        price: 2.49,
        description: 'Exotic and flavorful mango',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Peach',
        price: 1.79,
        description: 'Sweet and juicy peach',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Pear',
        price: 1.49,
        description: 'Crisp and refreshing pear',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Cherry',
        price: 2.99,
        description: 'Tart and flavorful cherry',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Plum',
        price: 1.99,
        description: 'Juicy and succulent plum',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Kiwi',
        price: 0.99,
        description: 'Tropical and tangy kiwi',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Pomegranate',
        price: 3.99,
        description: 'Seedy and antioxidant-rich pomegranate',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Blueberries',
        price: 2.49,
        description: 'Small and nutrient-packed blueberries',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Raspberry',
        price: 1.99,
        description: 'Sweet and tangy raspberry',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Blackberry',
        price: 2.49,
        description: 'Juicy and flavorful blackberry',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Mango',
        price: 2.99,
        description: 'Exotic and tropical mango',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Papaya',
        price: 3.49,
        description: 'Buttery and tropical papaya',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Coconut',
        price: 2.99,
        description: 'Creamy and tropical coconut',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Avocado',
        price: 1.99,
        description: 'Creamy and nutritious avocado',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Grapefruit',
        price: 1.49,
        description: 'Tangy and refreshing grapefruit',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Lemon',
        price: 0.99,
        description: 'Sour and citrusy lemon',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Lime',
        price: 0.99,
        description: 'Tart and zesty lime',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Cantaloupe',
        price: 3.99,
        description: 'Sweet and juicy cantaloupe',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Honeydew',
        price: 3.99,
        description: 'Mild and refreshing honeydew',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Apricot',
        price: 1.99,
        description: 'Sweet and velvety apricot',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Nectarine',
        price: 2.49,
        description: 'Juicy and aromatic nectarine',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Cranberry',
        price: 2.99,
        description: 'Tart and tangy cranberry',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Fig',
        price: 1.99,
        description: 'Sweet and chewy fig',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Guava',
        price: 2.99,
        description: 'Tropical and fragrant guava',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Passion Fruit',
        price: 3.49,
        description: 'Tangy and tropical passion fruit',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Pizza Margherita',
        price: 12.99,
        description: 'Classic Italian tomato and cheese pizza',
        category: ['lunch', 'dinner', 'main_course']
      },
      {

        name: 'Sushi Roll',
        price: 8.99,
        description: 'Fresh salmon and avocado roll',
        category: ['lunch', 'dinner', 'main_course']
      },
      {

        name: 'Beef Burger',
        price: 9.99,
        description: 'Juicy beef patty with fresh toppings',
        category: ['lunch', 'dinner', 'main_course']
      },
      {

        name: 'Caesar Salad',
        price: 7.99,
        description: 'Crisp romaine with classic dressing',
        category: ['lunch', 'dinner', 'salad']
      },
      {

        name: 'Pasta Carbonara',
        price: 11.99,
        description: 'Creamy pasta with bacon and eggs',
        category: ['lunch', 'dinner', 'main_course']
      },
      {

        name: 'Chicken Wings',
        price: 8.99,
        description: 'Spicy buffalo-style wings',
        category: ['appetizer', 'snack']
      },
      {

        name: 'Greek Yogurt',
        price: 3.99,
        description: 'Creamy protein-rich yogurt',
        category: ['breakfast', 'snack', 'vegetarian', 'gluten_free']
      },
      {

        name: 'Chocolate Cake',
        price: 5.99,
        description: 'Rich dark chocolate layer cake',
        category: ['dessert']
      },
      {

        name: 'Fish Tacos',
        price: 10.99,
        description: 'Grilled fish with fresh salsa',
        category: ['lunch', 'dinner', 'main_course']
      },
      {

        name: 'Pad Thai',
        price: 11.99,
        description: 'Traditional Thai noodle dish',
        category: ['lunch', 'dinner', 'main_course']
      },
      {

        name: 'French Fries',
        price: 3.99,
        description: 'Crispy golden potato fries',
        category: ['snack', 'side_dish', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Ice Cream',
        price: 4.99,
        description: 'Vanilla bean ice cream',
        category: ['dessert']
      },
      {

        name: 'Chicken Soup',
        price: 6.99,
        description: 'Homestyle chicken noodle soup',
        category: ['lunch', 'dinner', 'soup']
      },
      {

        name: 'Spring Roll',
        price: 5.99,
        description: 'Fresh vegetable spring rolls',
        category: ['appetizer', 'snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Greek Salad',
        price: 8.99,
        description: 'Mediterranean style with feta',
        category: ['lunch', 'dinner', 'salad', 'vegetarian']
      },
      {

        name: 'Nachos',
        price: 7.99,
        description: 'Loaded cheese and bean nachos',
        category: ['appetizer', 'snack', 'vegetarian']
      },
      {

        name: 'Smoothie Bowl',
        price: 6.99,
        description: 'Acai berry and fruit bowl',
        category: ['breakfast', 'snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Ramen',
        price: 9.99,
        description: 'Japanese style pork ramen',
        category: ['lunch', 'dinner', 'main_course']
      },
      {

        name: 'Garlic Bread',
        price: 3.99,
        description: 'Toasted bread with garlic butter',
        category: ['appetizer', 'side_dish', 'vegetarian']
      },
      {

        name: 'Hummus',
        price: 4.99,
        description: 'Creamy chickpea dip',
        category: ['appetizer', 'snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Fried Rice',
        price: 8.99,
        description: 'Asian style vegetable rice',
        category: ['lunch', 'dinner', 'main_course', 'vegetarian', 'gluten_free']
      },
      {

        name: 'Cheesecake',
        price: 5.99,
        description: 'Classic New York cheesecake',
        category: ['dessert']
      },
      {

        name: 'Curry',
        price: 11.99,
        description: 'Spicy Indian chicken curry',
        category: ['lunch', 'dinner', 'main_course']
      },
      {

        name: 'Onion Rings',
        price: 4.99,
        description: 'Crispy battered onion rings',
        category: ['appetizer', 'snack', 'vegetarian']
      },
      {

        name: 'Burrito',
        price: 8.99,
        description: 'Bean and cheese burrito',
        category: ['lunch', 'dinner', 'main_course', 'vegetarian']
      },
      {

        name: 'Pancakes',
        price: 6.99,
        description: 'Fluffy buttermilk pancakes',
        category: ['breakfast', 'vegetarian']
      },
      {

        name: 'Mozzarella Sticks',
        price: 5.99,
        description: 'Breaded cheese sticks',
        category: ['appetizer', 'snack', 'vegetarian']
      },
      {

        name: 'Pho',
        price: 10.99,
        description: 'Vietnamese beef noodle soup',
        category: ['lunch', 'dinner', 'soup']
      },
      {

        name: 'Apple Pie',
        price: 4.99,
        description: 'Classic American apple pie',
        category: ['dessert']
      },
      {

        name: 'Falafel',
        price: 7.99,
        description: 'Crispy chickpea patties',
        category: ['lunch', 'dinner', 'main_course', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Club Sandwich',
        price: 8.99,
        description: 'Triple-decker turkey sandwich',
        category: ['lunch', 'dinner', 'main_course']
      },
      {

        name: 'Tiramisu',
        price: 6.99,
        description: 'Italian coffee dessert',
        category: ['dessert']
      }
      ,
      {

        name: 'Bagel',
        price: 2.99,
        description: 'Chewy and dense bagel',
        category: ['breakfast', 'snack', 'vegetarian']
      },
      {

        name: 'Muffin',
        price: 3.49,
        description: 'Soft and moist muffin',
        category: ['breakfast', 'snack', 'vegetarian']
      },
      {

        name: 'Quiche',
        price: 5.99,
        description: 'Savory egg and cheese quiche',
        category: ['breakfast', 'lunch', 'vegetarian']
      },
      {

        name: 'Croissant',
        price: 2.99,
        description: 'Flaky and buttery croissant',
        category: ['breakfast', 'snack', 'vegetarian']
      },
      {

        name: 'Baguette',
        price: 3.99,
        description: 'Crispy French baguette',
        category: ['snack', 'side_dish', 'vegetarian']
      },
      {

        name: 'Macarons',
        price: 4.99,
        description: 'Colorful and delicate macarons',
        category: ['dessert', 'snack', 'vegetarian']
      },
      {

        name: 'Brownie',
        price: 3.99,
        description: 'Rich and fudgy brownie',
        category: ['dessert', 'snack', 'vegetarian']
      },
      {

        name: 'Cupcake',
        price: 2.99,
        description: 'Sweet and decorative cupcake',
        category: ['dessert', 'snack', 'vegetarian']
      },
      {

        name: 'Donut',
        price: 1.99,
        description: 'Sweet and fluffy donut',
        category: ['breakfast', 'snack', 'vegetarian']
      },
      {

        name: 'Pretzel',
        price: 2.49,
        description: 'Soft and salty pretzel',
        category: ['snack', 'vegetarian']
      },
      {

        name: 'Granola Bar',
        price: 1.99,
        description: 'Crunchy and nutritious granola bar',
        category: ['snack', 'vegetarian', 'gluten_free']
      },
      {

        name: 'Fruit Salad',
        price: 4.99,
        description: 'Fresh and colorful fruit salad',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Yogurt Parfait',
        price: 3.99,
        description: 'Layered yogurt with granola and fruit',
        category: ['breakfast', 'snack', 'vegetarian']
      },
      {

        name: 'Oatmeal',
        price: 2.99,
        description: 'Warm and hearty oatmeal',
        category: ['breakfast', 'vegetarian', 'gluten_free']
      },
      {

        name: 'Smoothie',
        price: 4.99,
        description: 'Blended fruit smoothie',
        category: ['breakfast', 'snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Trail Mix',
        price: 3.49,
        description: 'Nut and dried fruit mix',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Popcorn',
        price: 1.99,
        description: 'Light and airy popcorn',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Energy Bar',
        price: 2.99,
        description: 'High-protein energy bar',
        category: ['snack', 'vegetarian', 'gluten_free']
      },
      {

        name: 'Veggie Chips',
        price: 2.99,
        description: 'Crispy vegetable chips',
        category: ['snack', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free']
      },
      {

        name: 'Protein Shake',
        price: 3.99,
        description: 'Nutrient-rich protein shake',
        category: ['breakfast', 'snack', 'vegetarian', 'gluten_free']
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
