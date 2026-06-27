// All site content for Becker's Restaurant. Single source of truth consumed
// by pages, components, and the SEO/JSON-LD layer.

export const company = {
  name: "Becker's Restaurant",
  shortName: "Becker's",
  tagline: 'Real Food. Real People. Real Ashtabula.',
  // One-liner used in hero / meta.
  shortBlurb:
    "Homestyle cooking in Ashtabula, Ohio. Breakfast, lunch, and dinner served seven days a week, with big portions, a full bar, and a case full of fresh-baked treats.",
  established: '1985',
  phone: '(440) 993-1131',
  phoneHref: 'tel:+14409931131',
  email: 'Beckersrestaurant7228@yahoo.com',
  address: {
    street: '1601 West Prospect Road',
    city: 'Ashtabula',
    state: 'OH',
    zip: '44004',
  },
  addressOneLine: '1601 West Prospect Road, Ashtabula, OH 44004',
  geo: { lat: 41.8742, lng: -80.8204 },
  mapsDir:
    'https://www.google.com/maps/dir/?api=1&destination=Becker%27s+Restaurant+1601+West+Prospect+Road+Ashtabula+OH+44004',
  mapsEmbed:
    'https://www.google.com/maps?q=1601+West+Prospect+Road+Ashtabula+OH+44004&output=embed',
  social: {
    facebook: 'https://www.facebook.com/BeckersRestaurantAshtabula',
    yelp: 'https://www.yelp.com/biz/becker-s-restaurant-ashtabula',
    instagram: 'https://www.instagram.com/beckersashtabula',
  },
} as const

// ---------------------------------------------------------------------------
// Hours. Mon–Sat 7a–9p, Sun 7a–4p. dow matches Date.getDay() (0=Sun).
// ---------------------------------------------------------------------------
export const hours = [
  { day: 'Sunday', short: 'Sun', dow: 0, time: '7:00 am - 4:00 pm' },
  { day: 'Monday', short: 'Mon', dow: 1, time: '7:00 am - 9:00 pm' },
  { day: 'Tuesday', short: 'Tue', dow: 2, time: '7:00 am - 9:00 pm' },
  { day: 'Wednesday', short: 'Wed', dow: 3, time: '7:00 am - 9:00 pm' },
  { day: 'Thursday', short: 'Thu', dow: 4, time: '7:00 am - 9:00 pm' },
  { day: 'Friday', short: 'Fri', dow: 5, time: '7:00 am - 9:00 pm' },
  { day: 'Saturday', short: 'Sat', dow: 6, time: '7:00 am - 9:00 pm' },
]

export const hoursCompact = [
  { day: 'Mon - Sat', time: '7:00 am - 9:00 pm' },
  { day: 'Sunday', time: '7:00 am - 4:00 pm' },
]

// Schema.org openingHoursSpecification
export const openingHours = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:00',
    closes: '21:00',
  },
  {
    days: ['Sunday'],
    opens: '07:00',
    closes: '16:00',
  },
]

// ---------------------------------------------------------------------------
// Home "Three-Card" section
// ---------------------------------------------------------------------------
export const homeCards = [
  {
    title: 'Our Menu',
    blurb: 'Breakfast plates, lunch favorites, and dinner done right.',
    cta: 'See the Menu',
    href: '/menu',
  },
  {
    title: 'Catering',
    blurb: 'We bring the food. You enjoy the day.',
    cta: 'Get a Quote',
    href: '/catering',
  },
  {
    title: 'Join Our Team',
    blurb: 'Good people. Good tips. Good food on every shift.',
    cta: 'Apply Now',
    href: '/careers',
  },
]

// ---------------------------------------------------------------------------
// MENU. Category sections per the provided copy. The full menu lives in a PDF;
// items are transcribed where a readable source exists, otherwise the category
// stands with its tagline and the page links to the full PDF + call-ahead CTA.
// ---------------------------------------------------------------------------
export type MenuItem = { name: string; price?: string; desc?: string }
export type MenuGroup = { title: string; note?: string; items: MenuItem[] }
export type MenuSection = { id: string; title: string; tagline: string; groups: MenuGroup[] }

// Full printed menu (owner-hosted PDF). Localized into /public during build.
export const menuPdf = '/menu/beckers-menu.pdf'

// Transcribed verbatim from the printed Becker's menu. Prices as printed.
export const menuSections: MenuSection[] = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    tagline: 'Served all day, the way it should be.',
    groups: [
      {
        title: 'Breakfast Favorites',
        note: 'Served with choice of potato and 3 pancakes, toast, or a mammoth muffin.',
        items: [
          { name: 'Traditional', price: '$9.99', desc: 'Two eggs, 4 pieces of bacon or 4 links.' },
          { name: 'Country Fried Steak', price: '$10.99', desc: 'Lightly breaded steak smothered with country gravy, served with two eggs.' },
          { name: 'Sirloin Steak', price: '$13.99', desc: 'Tender USDA sirloin steak medallions smothered with mushrooms & onions, served with two eggs.' },
          { name: 'Corned Beef Hash', price: '$10.99', desc: 'Served with two eggs.' },
          { name: "Hearty Man's Breakfast", price: '$11.99', desc: 'Two eggs, kielbasa, 2 pieces of bacon, and 2 sausage links.' },
        ],
      },
      {
        title: '3-Egg Omelets',
        note: 'Served with choice of potato and 3 pancakes, toast, or a mammoth muffin. Egg whites available.',
        items: [
          { name: 'Build Your Own Omelet', price: '$10.29', desc: 'Pick three: bacon, sausage, ham, onions, mushrooms, tomato, spinach, green peppers, cheddar, pepper jack, or Swiss. Additional item $0.69.' },
          { name: "Farmer's Omelet", price: '$10.69', desc: 'Ham, sausage, bacon, onions, peppers, shredded American cheese.' },
          { name: "Becker's Omelet", price: '$10.99', desc: 'Ham, green peppers, onions, hash browns, and shredded American cheese topped with cheddar cheese sauce.' },
          { name: 'Sirloin Steak Omelet', price: '$11.99', desc: 'Sirloin steak strips, mushrooms, onions, and shredded American cheese.' },
          { name: 'Everything Omelet', price: '$10.99', desc: 'Ham, tomato, mushrooms, green peppers, onions, and shredded American cheese.' },
          { name: 'Chorizo Omelet', price: '$10.99', desc: 'Smoked chorizo, onions, green peppers, pepper jack, and avocado on the side. Served with sour cream and salsa.' },
          { name: 'Mediterranean Omelet', price: '$10.69', desc: 'Spinach, feta cheese, roasted tomato, topped with hollandaise sauce.' },
          { name: 'Country-Style Omelet', price: '$11.99', desc: 'Ham, bacon, and sausage with shredded American cheese, topped with sausage gravy.' },
        ],
      },
      {
        title: 'From the Griddle',
        note: 'Make it a platter with 2 eggs and choice of bacon, sausage links, or sausage patty $1.99. Add strawberry, blueberry, cinnamon apple, or chocolate chip topping for $1.99.',
        items: [
          { name: 'Buttermilk Pancakes (3)', price: '$5.99' },
          { name: 'Country French Toast (3)', price: '$7.99' },
          { name: 'Belgian Waffle', price: '$6.99' },
          { name: 'Croissant French Toast', price: '$7.99', desc: 'Bavarian cream & fruit toppings.' },
          { name: 'Cinnamon Roll French Toast', price: '$7.99' },
          { name: 'Mountain Berry French Toast', price: '$10.99', desc: 'Layers of berry compote between slices of vanilla brioche French toast, topped with fresh berries, whipped cream, and powdered sugar.' },
          { name: 'Bananas Foster Pancakes', price: '$10.99', desc: 'Fresh banana slices in brown sugar and dark rum over sweet cream pancakes, topped with maple whipped cream, candied pecans, and maple syrup.' },
        ],
      },
      {
        title: 'Breakfast Classics',
        items: [
          { name: 'Sausage & Biscuit Platter', price: '$9.69', desc: 'Freshly baked biscuits and sausage topped with country gravy and shredded cheddar, served with 2 eggs, choice of potato, and bacon or sausage links.' },
          { name: 'Chicken & Biscuit Platter', price: '$10.29', desc: 'Hand-dipped chicken tenders and biscuits topped with country gravy and shredded cheddar, served with 2 eggs, choice of potato, and bacon or sausage links.' },
          { name: 'Eggs Benedict', price: '$10.29', desc: 'Toasted English muffin topped with bacon and hollandaise sauce. Choice of fruit, potato, toast, or mammoth muffin.' },
          { name: 'The Glotz', price: '$10.99', desc: '3 eggs, choice of 4 pieces of bacon, 4 links, or 2 sausage patties, 4 pancakes, and choice of potato.' },
          { name: 'Potato Pancakes', price: '$7.29 / $8.49', desc: 'Served with two pieces of bacon & applesauce. Three or five.' },
          { name: 'Veggie Benedict', price: '$11.99', desc: 'Toasted English muffin topped with 2 basted eggs, sautéed mushrooms, spinach, onion, roasted tomatoes, Swiss cheese, and hollandaise.' },
        ],
      },
      {
        title: 'Breakfast Bowls',
        note: 'Add 3 pancakes, order of toast, or a mammoth muffin for $0.89.',
        items: [
          { name: 'Sausage, Ham & Bacon Bowl', price: '$10.99', desc: 'Crispy tater tots topped with sausage, bacon, ham, country gravy, two eggs, and shredded American cheese.' },
          { name: 'Chicken Tender Bowl', price: '$10.99', desc: 'Crispy tater tots topped with breaded chicken bites, two eggs, country gravy, and shredded American cheese.' },
          { name: 'Veggie Bowl', price: '$10.99', desc: 'Home-style potatoes topped with two eggs, oven-roasted tomato, onions, mushrooms, and spinach.' },
        ],
      },
      {
        title: 'Breakfast Sides',
        note: 'Buy 3 mammoth muffins, get 3 free.',
        items: [
          { name: 'Crispy Bacon', price: '$3.29' },
          { name: 'Sausage Links (4)', price: '$3.29' },
          { name: 'Sausage Patties (2)', price: '$3.29' },
          { name: 'Smoked Kielbasa', price: '$3.29' },
          { name: 'Grilled Ham Slices (3)', price: '$3.29' },
          { name: 'Hash Browns', price: '$3.29' },
          { name: 'Breakfast Potatoes', price: '$3.29' },
          { name: 'Home-Style Potatoes', price: '$3.29' },
          { name: 'Tater Tots', price: '$3.29' },
          { name: 'Toast', price: '$2.49' },
          { name: 'English Muffin', price: '$2.49' },
          { name: 'Fresh Baked Biscuits (2)', price: '$2.89' },
          { name: 'Mammoth Muffin', price: '$2.69' },
        ],
      },
    ],
  },
  {
    id: 'lunch',
    title: 'Lunch',
    tagline: 'Sandwiches, soups, and plates that hold up to a workday.',
    groups: [
      {
        title: 'The Ultimate Sandwiches',
        note: 'Served with choice of fries, soup, or salad. Substitute onion rings for $1.99.',
        items: [
          { name: 'Chicken Parmesan', price: '$10.99', desc: 'Breaded Italian chicken, provolone, marinara, topped with shredded parmesan.' },
          { name: 'The Triple Club', price: '$9.99', desc: 'Oven-roasted turkey, bacon, lettuce, tomato, and mayo on choice of toasted bread.' },
          { name: 'The Big BLT', price: '$8.99', desc: 'Crispy bacon strips, lettuce, and tomato with mayo on toasted bread.' },
          { name: 'Chicken Salad Croissant', price: '$8.99', desc: 'House-made chicken salad with grapes and walnuts.' },
          { name: 'Spicy Chicken', price: '$11.99', desc: 'Crispy chicken breast dipped in hot sauce, pepper jack, bacon, onion tanglers, lettuce, and tomato.' },
          { name: 'Reuben', price: '$11.49', desc: 'Sliced corned beef, sauerkraut, and Swiss on grilled rye.' },
          { name: 'Chicken Tender Melt', price: '$11.49', desc: 'Chicken tenders, bacon, and pepper jack on grilled sourdough.' },
          { name: 'Patty Melt', price: '$10.99', desc: 'A grilled burger, sautéed onions, and cheddar on grilled rye.' },
          { name: 'Pot Roast Melt', price: '$10.99', desc: 'Tender beef pot roast between grilled parmesan sourdough with American cheese and a side of au jus.' },
          { name: 'Hot Open-Faced Sandwich', price: '$10.99', desc: 'Choice of homemade meatloaf, sliced roast beef, or roasted turkey & mashed potatoes, smothered with gravy.' },
          { name: 'Caprese Chicken Sandwich', price: '$11.99', desc: 'Grilled chicken, roasted Roma tomato, fresh mozzarella, basil, balsamic glaze, and basil aioli.' },
          { name: 'Chicken and Brie', price: '$11.99', desc: 'Grilled chicken topped with caramelized onions, brie, lettuce, tomato, bacon, and avocado.' },
          { name: 'Snakebite Sourdough Turkey Melt', price: '$11.99', desc: 'Oven-roasted turkey on grilled sourdough with lettuce, tomato, jalapeños, applewood bacon, and jalapeño ranch slaw.' },
          { name: "Bula's Pastrami on Rye", price: '$11.99', desc: 'Shaved pastrami on marbled rye with Swiss, brown mustard, and sweet pepper slaw.' },
        ],
      },
      {
        title: "Becker's Burgers",
        note: 'Served with choice of fries, soup, or salad. Lettuce, tomato, onion, and pickle on the side. Substitute a grilled chicken breast for any burger.',
        items: [
          { name: 'The Original', price: '$10.99', desc: 'Choice of American, pepper jack, Swiss, or cheddar.' },
          { name: 'BBQ Tangler Burger', price: '$11.99', desc: 'Crispy bacon, onion tanglers, BBQ sauce, and melted American.' },
          { name: 'Breakfast Burger', price: '$11.99', desc: 'Crispy bacon, hash browns, American cheese, and a fried over-hard egg.' },
          { name: 'The Works', price: '$11.99', desc: 'Crispy bacon, sautéed onions, mushrooms, and choice of cheese.' },
          { name: 'Mushroom & Swiss Burger', price: '$11.49', desc: 'Swiss cheese smothered with mushrooms.' },
          { name: 'Filthy Burger', price: '$11.99', desc: 'BBQ pork, bacon, pepper jack, caramelized onion, and tanglers.' },
          { name: 'Black and Blue', price: '$11.99', desc: 'Cajun burger smothered with blue cheese, caramelized onions, and bacon.' },
          { name: 'Dijon Burger', price: '$11.99', desc: 'Sliced ham, Swiss, caramelized onions, Dijon mustard, and banana peppers.' },
        ],
      },
      {
        title: 'Hoagies & Wraps',
        note: 'Served with choice of fries, soup, or salad. Substitute onion rings for $1.99.',
        items: [
          { name: 'Philly Cheesesteak', price: '$11.99', desc: 'Beef or chicken sautéed with peppers, mushrooms, and onions, smothered with provolone on a toasted hoagie.' },
          { name: 'The Sicilian', price: '$11.49', desc: 'Grilled ham, pepperoni, bacon, provolone, lettuce, and tomato on a toasted hoagie.' },
          { name: 'Buffalo Chicken Wrap', price: '$11.49', desc: 'Crispy chicken tenders in hot sauce with pepper jack, tomatoes, and lettuce.' },
          { name: 'Turkey Bacon Avocado Wrap', price: '$10.99', desc: 'House-roasted turkey, bacon, avocado, lettuce, tomato, and choice of cheese.' },
          { name: 'Chicken Caesar Wrap', price: '$11.99', desc: 'Grilled chicken, romaine, shaved parmesan, tomato, and Caesar dressing.' },
          { name: 'French Dip', price: '$11.99', desc: 'Sliced roast beef with sautéed onions and Swiss on a toasted hoagie, served with au jus.' },
        ],
      },
      {
        title: 'Bread Bowl Salads',
        note: 'Served in a parmesan cheese bread bowl. Dressings: ranch, blue cheese, honey mustard, French, Italian, 1000 island, oil & vinegar, balsamic vinaigrette, or hot bacon.',
        items: [
          { name: 'Dinner Side Salad', price: '$3.99' },
          { name: 'Classic Chef', price: '$11.99', desc: 'Fresh greens topped with house-roasted turkey, bacon, ham, tomato, egg, and cheddar & Swiss.' },
          { name: 'Chicken Crunch Salad', price: '$11.99', desc: 'Crunchy chicken strips, red onion, green peppers, bacon, tomatoes, and cheddar over fresh greens.' },
          { name: 'Steak or Grilled Chicken', price: '$11.99', desc: 'Fresh greens, tomatoes, cheddar, and red onions topped with French fries.' },
          { name: 'Blackened Chicken & Avocado', price: '$11.99', desc: 'Blackened chicken over fresh greens with avocado, black bean & corn relish, cheddar, and crispy tortilla strips.' },
          { name: 'Chicken Caesar', price: '$11.99', desc: 'Chopped romaine, parmesan, croutons, grilled chicken, with Caesar dressing on the side.' },
        ],
      },
      {
        title: 'Pick 2 or Pick 3',
        note: 'Pick 2 for $7.99 or Pick 3 for $9.99. Choose from a bowl of soup, half sandwich (chicken melt, big BLT, chicken salad, ham & Swiss), a specialty salad, or a slice of fruit pie.',
        items: [],
      },
    ],
  },
  {
    id: 'appetizers',
    title: 'Appetizers',
    tagline: 'Something to start, or something to share.',
    groups: [
      {
        title: 'To Start & Share',
        items: [
          { name: 'Chicken Tenders', price: '$8.99', desc: 'Served with dipping sauce.' },
          { name: 'Cheese Sticks (6)', price: '$6.99', desc: 'Served with marinara.' },
          { name: 'Onion Rings (10)', price: '$8.99', desc: 'Served with dipping sauce.' },
          { name: 'Fried Pickle Spears (6)', price: '$6.99', desc: 'Served with ranch.' },
          { name: 'Buffalo Chicken Dip', price: '$9.99', desc: 'Served with fried tortilla chips.' },
          { name: 'Spinach & Artichoke Dip', price: '$9.99', desc: 'Served with fried tortilla chips.' },
          { name: 'Chicken Quesadilla', price: '$9.99', desc: 'Blackened chicken, shredded American cheese, pepper jack.' },
          { name: 'Pizza Logs', price: '$6.99', desc: 'Pepperoni and cheese rolls with marinara.' },
          { name: 'Breaded Mushrooms (10)', price: '$6.99', desc: 'Served with sweet chili sauce.' },
          { name: 'Pork Potstickers (6)', price: '$6.99', desc: 'Served with sweet chili sauce.' },
          { name: 'Fried Brussels Sprouts', price: '$9.99', desc: 'Topped with feta, diced bacon, and balsamic glaze.' },
          { name: 'Pretzel Logs', price: '$9.99', desc: '4 Bavarian pretzel logs served with beer cheese.' },
        ],
      },
    ],
  },
  {
    id: 'dinner',
    title: 'Dinner',
    tagline: 'Homestyle classics, fresh off the line.',
    groups: [
      {
        title: 'Dinner Favorites',
        note: 'Served with choice of 2 sides & grilled garlic bread, unless otherwise noted.',
        items: [
          { name: 'Smothered Chicken', price: '$11.99', desc: 'Chicken breast topped with sautéed mushrooms, onions, green peppers, bacon, and Swiss.' },
          { name: 'Butterball Turkey & Dressing', price: '$10.99', desc: 'Hand-carved house-roasted Butterball turkey atop sage stuffing, with turkey gravy and cranberry sauce.' },
          { name: 'Beef Pot Roast', price: '$11.99', desc: 'Savory slow-braised beef smothered with peas, carrots, onions, and beef gravy.' },
          { name: 'Sirloin Steak', price: '$13.99', desc: 'Tender USDA sirloin steak medallions topped with sautéed mushrooms and onions.' },
          { name: 'Chicken Tenders', price: '$11.99', desc: 'Hand-dipped golden fried crispy tenders with your dipping sauce.' },
          { name: 'Country Fried Steak Dinner', price: '$11.99', desc: 'Home-style breaded steak smothered with country gravy.' },
          { name: 'Grilled Pork Chops', price: '$11.99', desc: 'Two pork chops, grilled and seasoned with choice of blackened or lemon pepper garlic.' },
          { name: 'Chicken Pot Pie', price: '$11.49', desc: 'Mini chicken pot pie. Served with salad and a slice of fruit pie.' },
          { name: 'Stir Fry', price: '$10.99+', desc: 'Sautéed green peppers, onions, mushrooms, broccoli over rice pilaf. Vegetable $10.99 / Chicken $11.99 / Steak $12.99 / Shrimp $11.99.' },
          { name: 'French Onion Pot Roast Pie', price: '$13.99', desc: 'Oven-roasted pot roast in French onion soup under a flaky crust with melted Swiss. Served with a dinner salad.' },
          { name: 'Mac & Cheese Bowl', price: '$15.99', desc: 'Mac & cheese topped with crispy fried onion and your favorite meat in a parmesan bread bowl. Chili, pulled pork, hot honey chicken, buffalo chicken, or burger.' },
        ],
      },
      {
        title: 'From the Sea',
        note: 'Served with choice of 2 sides & grilled garlic bread, unless otherwise noted.',
        items: [
          { name: 'Grilled Salmon', price: '$13.99', desc: 'Atlantic salmon fillet grilled with Cajun, lemon pepper garlic, or teriyaki.' },
          { name: 'Grilled Tilapia', price: '$11.99', desc: 'Tilapia fillet grilled with blackened or lemon pepper garlic seasoning.' },
          { name: 'Ultimate Feast', price: '$13.99', desc: 'Two breaded cod fillets, clam strips, breaded shrimp (3), and 3 onion rings.' },
          { name: 'Butterfly Shrimp Dinner (6)', price: '$10.99', desc: 'Crispy butterfly jumbo shrimp.' },
          { name: 'Crab Stuffed Tilapia', price: '$13.99', desc: 'Tilapia stuffed with a Maryland crab cake, broiled in garlic herb butter and finished with roasted Roma tomatoes.' },
        ],
      },
      {
        title: 'Pasta',
        note: 'Served with a dinner salad & grilled garlic bread.',
        items: [
          { name: 'Spaghetti & Meatballs', price: '$9.99', desc: 'Spaghetti topped with house-made marinara & 2 meatballs.' },
          { name: 'Fettuccine Alfredo', price: '$10.99+', desc: 'Fettuccine with tomatoes, broccoli, and creamy alfredo, topped with parmesan. Vegetable $10.99 / Chicken $11.49 / Breaded Chicken $11.99 / Shrimp $11.99.' },
          { name: 'Shrimp Florentine', price: '$14.99', desc: 'Grilled shrimp, sautéed spinach, and roasted tomatoes over alfredo with parmesan.' },
        ],
      },
      {
        title: 'Dinner Sides',
        items: [
          { name: 'Buttered Corn' },
          { name: 'Fresh Broccoli' },
          { name: 'Green Beans' },
          { name: 'Rice Pilaf' },
          { name: 'House-Made Mac & Cheese' },
          { name: 'French Fries' },
          { name: 'Crispy Tater Tots' },
          { name: 'House-Made Mashed Potatoes' },
          { name: 'Baked Potato' },
          { name: 'Cup of Soup' },
          { name: 'Pierogies with Onions' },
          { name: 'Glazed Carrots' },
        ],
      },
    ],
  },
  {
    id: 'fifty-five-plus',
    title: '55+ Menu',
    tagline: 'A little lighter, a little easier on the wallet.',
    groups: [
      {
        title: 'All-Day Breakfast (55+)',
        items: [
          { name: 'BYO Two-Egg Omelet', price: '$6.99', desc: 'Choice of two ingredients, served with two pancakes, toast, or mammoth muffin.' },
          { name: 'Eggs Benedict', price: '$6.99', desc: 'One basted egg, grilled ham, hollandaise on a grilled English muffin, with fresh fruit and choice of potato.' },
          { name: '3 Buttermilk Pancakes', price: '$5.99' },
          { name: 'Country French Toast (2)', price: '$5.99', desc: 'Two slices of bacon or two sausage links.' },
          { name: '3 Potato Pancakes', price: '$6.99', desc: 'Two pieces of bacon and applesauce.' },
          { name: 'The Traveler', price: '$6.99', desc: 'Two pancakes, one egg, and two sausage links or two bacon.' },
        ],
      },
      {
        title: '55+ Club Dinners',
        note: 'Served with choice of 2 sides & grilled garlic bread.',
        items: [
          { name: 'Beef Pot Roast', price: '$10.99', desc: 'Slow-cooked, fall-apart goodness smothered with peas, carrots, onions, and beef gravy.' },
          { name: 'Oven Roasted Turkey', price: '$9.99', desc: 'Hand-carved house-roasted Butterball turkey atop sage stuffing with turkey gravy & cranberry sauce.' },
          { name: 'Sirloin Steak', price: '$11.99', desc: 'Tender USDA sirloin medallions topped with sautéed mushrooms and onions.' },
          { name: 'Country Fried Steak', price: '$9.99', desc: 'Home-style breaded steak smothered with country gravy.' },
          { name: 'Grilled Tilapia', price: '$9.99', desc: 'Two pieces of grilled tilapia with lemon pepper, Cajun, or garlic seasoning.' },
          { name: 'Butterfly Shrimp (5)', price: '$9.99', desc: 'Crispy butterfly jumbo shrimp.' },
          { name: 'Chicken Tenders (4)', price: '$9.99', desc: 'Golden fried crispy tenders with your choice of dipping sauce.' },
          { name: 'Grilled Chicken Breast', price: '$9.99', desc: '7 oz chicken breast with your choice of seasoning.' },
        ],
      },
    ],
  },
  {
    id: 'bakery-bar',
    title: 'Bakery, Desserts & Bar',
    tagline: 'Save room, and grab a drink.',
    groups: [
      {
        title: 'Fresh-Baked',
        note: 'Baked in-house daily. Grab a few to take home. Ask about today’s selection.',
        items: [
          {
            name: 'Mammoth Muffins',
            desc: 'Blueberry, double chocolate, apple cinnamon, banana nut, Boston cream, Black Forest, cranberry orange nut, chocolate peanut butter, morning glory & more.',
          },
          { name: 'Jumbo Cookies', desc: 'Chocolate chip and M&M, baked fresh.' },
          { name: 'Iced Cinnamon Rolls', desc: 'Warm from the oven and drizzled with icing.' },
        ],
      },
      {
        title: 'Desserts',
        items: [
          { name: 'Fresh Fruit Pies', desc: 'Ask your server about today’s slices.' },
          { name: 'Daily Dessert Specials', desc: 'Whatever the kitchen is feeling that day.' },
        ],
      },
      {
        title: 'From the Bar',
        note: 'Becker’s has a full bar. Must be 21+ with valid ID.',
        items: [
          { name: 'Margaritas', desc: 'Hand-shaken, on the rocks or frozen.' },
          { name: 'Specialty Cocktails', desc: 'Rotating house drinks. Ask your bartender.' },
          { name: 'Beer', desc: 'Domestic, import & craft.' },
          { name: 'Wine', desc: 'By the glass or the bottle.' },
        ],
      },
      {
        title: 'Non-Alcoholic',
        items: [
          { name: 'Bottomless Coffee' },
          { name: 'Fountain Soft Drinks' },
          { name: 'Iced & Hot Tea' },
          { name: 'Juice & Milk', desc: 'Orange, apple, cranberry, or tomato.' },
          { name: 'Hot Chocolate' },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Catering
// ---------------------------------------------------------------------------
export const cateringTypes = [
  { title: 'Family Gatherings', blurb: 'Birthdays, reunions, graduations, anniversaries.' },
  { title: 'Work Events', blurb: 'Office lunches, training days, holiday parties.' },
  { title: 'Showers & Celebrations', blurb: 'Baby showers, bridal showers, retirement send-offs.' },
  {
    title: 'Funeral & Memorial Meals',
    blurb: 'Quiet, respectful, and ready when your family needs it.',
  },
]

export const cateringSteps = [
  {
    step: '1',
    title: 'Tell us about your event',
    blurb: 'Date, headcount, location, and what kind of food you’re after.',
  },
  {
    step: '2',
    title: 'We build the menu',
    blurb: 'Pulled from our regulars or customized to your group.',
  },
  {
    step: '3',
    title: 'We show up ready',
    blurb: 'On time, fully prepped, and easy to work with.',
  },
]

// ---------------------------------------------------------------------------
// Careers
// ---------------------------------------------------------------------------
export const openRoles = [
  { title: 'Servers', blurb: 'Daytime, evening, and weekend shifts available.' },
  { title: 'Line Cooks', blurb: 'Breakfast, lunch, and dinner stations.' },
  { title: 'Dishwashers & Prep', blurb: 'Backbone of the kitchen. Always in demand.' },
  { title: 'Hosts', blurb: 'First face our guests see. Friendly and organized.' },
]

export const perks = [
  'Steady hours and fair pay',
  'Meals on shift',
  'A team that has your back',
  'Real growth. Most of our managers started on the floor',
]

// ---------------------------------------------------------------------------
// Reviews — verbatim from the current site / Google, supplied by the owner.
// ---------------------------------------------------------------------------
export const ratingSummary = { value: '4.6', count: 412 }

export const reviews = [
  {
    name: 'Mitchell Kyko',
    quote: 'Great food, very attentive!',
  },
  {
    name: 'Janet Gilson',
    quote:
      'This is a great place to eat. Dinner for $12 is very reasonable, the food was good, and the servers were friendly.',
  },
  {
    name: 'RAG',
    quote:
      "Best fries I've had in a long time! Great staff, and the Big BLT was great. It's awesome to see they're expanding and adding what looks to be a dining hall for events.",
  },
  {
    name: 'James Hartman',
    quote:
      'Made reservations and it was great even with people waiting on a Saturday. The food and service were great.',
  },
  {
    name: 'Bruce R.',
    quote:
      'I must say the food and service was excellent! Very nice atmosphere and our waitress was very helpful and polite. Nice job Becker’s, I will definitely return!',
  },
  {
    name: 'Gary G.',
    quote:
      'You can get just about anything you want there, and Becky is the most wonderful person I know.',
  },
]

// ---------------------------------------------------------------------------
// FAQ (drives FAQPage schema)
// ---------------------------------------------------------------------------
export const faqs = [
  {
    q: "What are Becker's Restaurant's hours?",
    a: 'We’re open Monday through Saturday, 7:00 AM to 9:00 PM, and Sunday 7:00 AM to 4:00 PM. Breakfast, lunch, and dinner are served every day.',
  },
  {
    q: "Where is Becker's Restaurant located?",
    a: 'We’re at 1601 West Prospect Road, Ashtabula, OH 44004, with plenty of parking right out front.',
  },
  {
    q: 'Do you host special events?',
    a: 'Yes. We host special events throughout the year, including our popular Murder Mystery dinner theater. Follow us on Facebook for the latest schedule.',
  },
  {
    q: 'Do you cater events?',
    a: 'We do. From family gatherings and work events to showers and memorial meals, we cater for groups big and small across Ashtabula County. Call (440) 993-1131 to plan your event.',
  },
  {
    q: 'Do you have a full bar?',
    a: 'Yes. Becker’s has a full bar with margaritas, specialty cocktails, beer, and wine (21+ with valid ID). We also bake fresh muffins, cookies, and cinnamon rolls in-house every day.',
  },
  {
    q: 'Can I reserve the private room?',
    a: 'Absolutely. Our private room is built for birthdays, showers, work lunches, and celebrations of all kinds. Call (440) 993-1131 to reserve it.',
  },
]

// ---------------------------------------------------------------------------
// Photos. Real food & restaurant images. Hero pools rotate (cross-fade) so the
// top of each page stays fresh; foodGallery feeds the home "Fresh From the
// Kitchen" strip.
// ---------------------------------------------------------------------------
export type Photo = { src: string; alt: string }

export const homeHero: Photo[] = [
  { src: '/images/gallery-breakfast-burger.jpg', alt: 'Breakfast sandwich with eggs, cheese, and home fries' },
  { src: '/images/gallery-ribs.jpg', alt: 'Fall-off-the-bone BBQ ribs' },
  { src: '/images/gallery-pancakes.jpg', alt: 'A tall stack of buttermilk pancakes' },
  { src: '/images/gallery-wings.jpg', alt: 'Crispy buffalo wings' },
  { src: '/images/gallery-loaded-fries.jpg', alt: 'Loaded fries piled high' },
  { src: '/images/bakery-cookies.jpg', alt: 'Fresh-baked cookies, muffins, and cinnamon rolls' },
]

export const menuHero: Photo[] = [
  { src: '/images/gallery-pancakes.jpg', alt: 'Buttermilk pancakes' },
  { src: '/images/gallery-breakfast-burger.jpg', alt: 'A loaded breakfast plate' },
  { src: '/images/gallery-sub.jpg', alt: 'A toasted sub sandwich' },
  { src: '/images/gallery-quesadilla.jpg', alt: 'Golden chicken quesadilla' },
  { src: '/images/gallery-rib-plate.jpg', alt: 'A rib dinner plate' },
  { src: '/images/dessert-cake.jpg', alt: 'A slice of layered cake' },
]

export const cateringHero: Photo[] = [
  { src: '/images/catering-roast.jpg', alt: 'A carved roast for a catered spread' },
  { src: '/images/catering-dessert-bars.jpg', alt: 'A tray of dessert bars' },
  { src: '/images/gallery-ribs.jpg', alt: 'A platter of BBQ ribs' },
  { src: '/images/dessert-cupcakes.jpg', alt: 'Decorated cupcakes' },
  { src: '/images/gallery-fried-chicken.jpg', alt: 'A golden fried chicken plate' },
]

export const careersHero: Photo[] = [
  { src: '/images/staff.jpg', alt: "The Becker's Restaurant team" },
  { src: '/images/gallery-fried-chicken.jpg', alt: 'Fried chicken fresh off the line' },
  { src: '/images/gallery-loaded-waffle-fries.jpg', alt: 'Loaded waffle fries' },
  { src: '/images/drinks.jpg', alt: 'Drinks on a busy weekend' },
]

export const contactHero: Photo[] = [
  { src: '/images/gallery-breakfast-burger.jpg', alt: 'Breakfast sandwich and home fries' },
  { src: '/images/gallery-sub.jpg', alt: 'A toasted sub sandwich' },
  { src: '/images/gallery-pancakes.jpg', alt: 'A pancake stack' },
  { src: '/images/gallery-rib-plate.jpg', alt: 'A rib dinner plate' },
]

export const foodGallery: Photo[] = [
  { src: '/images/gallery-breakfast-burger.jpg', alt: 'Breakfast sandwich with eggs and home fries' },
  { src: '/images/gallery-ribs.jpg', alt: 'BBQ ribs' },
  { src: '/images/gallery-wings.jpg', alt: 'Buffalo wings' },
  { src: '/images/gallery-pancakes.jpg', alt: 'Buttermilk pancakes' },
  { src: '/images/gallery-loaded-fries.jpg', alt: 'Loaded fries' },
  { src: '/images/gallery-fried-chicken.jpg', alt: 'Fried chicken plate' },
  { src: '/images/gallery-sub.jpg', alt: 'A toasted sub' },
  { src: '/images/gallery-quesadilla.jpg', alt: 'Chicken quesadilla' },
  { src: '/images/gallery-philly-fries.jpg', alt: 'Philly cheesesteak with fries' },
  { src: '/images/gallery-melt-fries.jpg', alt: 'A grilled melt with fries' },
  { src: '/images/gallery-taco-salad.jpg', alt: 'A loaded taco salad' },
  { src: '/images/bakery-cookies.jpg', alt: 'Fresh-baked M&M cookies, muffins, and iced cinnamon rolls' },
  { src: '/images/bar-margarita.jpg', alt: 'A salted-rim margarita from the full bar' },
  { src: '/images/bakery-case.jpg', alt: 'The Becker’s bakery case full of muffins' },
  { src: '/images/bar-raspberry-cocktail.jpg', alt: 'A fresh raspberry cocktail from the bar' },
  { src: '/images/dessert-cake.jpg', alt: 'A slice of layered cake' },
]
