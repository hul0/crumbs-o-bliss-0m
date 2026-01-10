export interface BakeryItem {
  slug: string;
  name: { en: string; bn: string };
  description: { en: string; bn: string };
  price: number;
  currency: "INR";
  ingredients: string[];
  calories: number;
  image: string;
  tags: string[];
}

export const items: BakeryItem[] = [
  {
    slug: "sourdough-bread",
    name: {
      en: "Classic Sourdough",
      bn: "ক্লাসিক সাউরডু ব্রেড",
    },
    description: {
      en: "A rustic, crusty loaf with a tangy flavor and chewy crumb. Made with our signature sourdough starter and aged for 24 hours.",
      bn: "একটি আদিম, মচমচে রুটি যার স্বাদ কিছুটা টক এবং ভেতরটা নমনীয়। আমাদের বিশেষ সাউরডু স্টার্টার দিয়ে তৈরি এবং ২৪ ঘণ্টা ফারমেন্ট করা।",
    },
    price: 320,
    currency: "INR",
    ingredients: ["Bread flour", "Sourdough starter", "Water", "Salt"],
    calories: 265,
    image: "https://images.unsplash.com/photo-1585478479636-1999ff953e63?w=800&q=80",
    tags: ["bread", "sourdough", "vegan", "whole-grain"],
  },
  {
    slug: "chocolate-croissant",
    name: {
      en: "Chocolate Croissant",
      bn: "চকলেট ক্রয়েস্যান্ট",
    },
    description: {
      en: "Buttery, flaky layers with rich dark chocolate bars. A French pastry classic made fresh daily.",
      bn: "মাখনযুক্ত, মচমচে স্তরে মোড়া এবং ভেতরে গাঢ় চকলেট ভরা। প্রতিদিন তাজা তৈরি করা একটি ক্লাসিক ফ্রেঞ্চ পেস্ট্রি।",
    },
    price: 180,
    currency: "INR",
    ingredients: ["Flour", "Butter", "Dark chocolate", "Milk", "Sugar", "Salt"],
    calories: 320,
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=80",
    tags: ["pastry", "chocolate", "french", "breakfast"],
  },
  {
    slug: "blueberry-muffin",
    name: {
      en: "Blueberry Muffin",
      bn: "ব্লুবেরি মাফিন",
    },
    description: {
      en: "Soft, tender muffin bursting with fresh blueberries and topped with a light crumb streusel.",
      bn: "নরম, তুলতুলে মাফিন যা তাজা ব্লুবেরিতে ঠাসা এবং উপরে হালকা ক্রাম্ব ছড়ানো।",
    },
    price: 140,
    currency: "INR",
    ingredients: ["Flour", "Fresh blueberries", "Butter", "Eggs", "Milk", "Baking powder", "Sugar"],
    calories: 285,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80",
    tags: ["muffin", "blueberry", "breakfast", "fruit"],
  },
  {
    slug: "cinnamon-roll",
    name: {
      en: "Cinnamon Roll",
      bn: "সিনামন রোল",
    },
    description: {
      en: "A spiral of soft dough with warm cinnamon and sugar filling, topped with cream cheese frosting.",
      bn: "নরম ময়দার প্যাঁচানো রোল, ভেতরে দারুচিনি ও চিনির পুর, এবং উপরে ক্রিম চিজের প্রলেপ।",
    },
    price: 160,
    currency: "INR",
    ingredients: ["Flour", "Butter", "Cinnamon", "Sugar", "Cream cheese", "Milk", "Yeast"],
    calories: 340,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80",
    tags: ["roll", "cinnamon", "breakfast", "pastry"],
  },
  {
    slug: "almond-croissant",
    name: {
      en: "Almond Croissant",
      bn: "আমন্ড ক্রয়েস্যান্ট",
    },
    description: {
      en: "A delicate French pastry with layers of puff pastry, almond cream, and sliced almonds.",
      bn: "পাফ পেস্ট্রি, আমন্ড ক্রিম এবং উপরে বাদাম কুচি ছড়ানো একটি সুস্বাদু ফ্রেঞ্চ পেস্ট্রি।",
    },
    price: 200,
    currency: "INR",
    ingredients: ["Puff pastry", "Almond paste", "Butter", "Almond slices", "Sugar", "Eggs"],
    calories: 310,
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&q=80",
    tags: ["croissant", "almond", "french", "nuts"],
  },
  {
    slug: "whole-wheat-loaf",
    name: {
      en: "Whole Wheat Loaf",
      bn: "হোল হুইট ব্রেড",
    },
    description: {
      en: "Dense, nutritious loaf made with whole wheat flour, seeds, and a touch of honey.",
      bn: "সম্পূর্ণ গমের আটা, বিভিন্ন বীজ এবং সামান্য মধু দিয়ে তৈরি একটি ঘন এবং পুষ্টিকর রুটি।",
    },
    price: 280,
    currency: "INR",
    ingredients: ["Whole wheat flour", "Seeds", "Honey", "Water", "Salt", "Yeast"],
    calories: 220,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    tags: ["bread", "whole-grain", "healthy", "seeds"],
  },
  {
    slug: "macaron-assortment",
    name: {
      en: "Macaron Assortment",
      bn: "ম্যাকারন বক্স",
    },
    description: {
      en: "A delicate set of French macarons in flavors: pistachio, rose, and salted caramel.",
      bn: "পিস্তা, গোলাপ এবং সল্টেড ক্যারামেল স্বাদের ফ্রেঞ্চ ম্যাকারনের একটি সুন্দর সেট।",
    },
    price: 350,
    currency: "INR",
    ingredients: ["Almond flour", "Egg whites", "Sugar", "Pistachio paste", "Rose flavoring", "Caramel"],
    calories: 75,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80",
    tags: ["macaron", "french", "assortment", "premium"],
  },
  {
    slug: "classic-baguette",
    name: {
      en: "French Baguette",
      bn: "ফ্রেঞ্চ ব্যাগেট",
    },
    description: {
      en: "Traditional long, thin loaf with a crisp golden crust and airy interior.",
      bn: "ঐতিহ্যবাহী লম্বা এবং সরু রুটি, যার বাইরের অংশ মচমচে সোনালি এবং ভেতরটা ফাঁপা।",
    },
    price: 150,
    currency: "INR",
    ingredients: ["Wheat flour", "Water", "Yeast", "Salt"],
    calories: 180,
    image: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=800&q=80",
    tags: ["bread", "french", "vegan", "crispy"],
  },
  {
    slug: "red-velvet-cupcake",
    name: {
      en: "Red Velvet Cupcake",
      bn: "রেড ভেলভেট কাপকেক",
    },
    description: {
      en: "Moist crimson cocoa sponge topped with rich cream cheese frosting.",
      bn: "নরম লাল রঙের কোকো স্পঞ্জ কেক, যার উপরে সমৃদ্ধ ক্রিম চিজ ফ্রস্টিং দেওয়া।",
    },
    price: 120,
    currency: "INR",
    ingredients: ["Flour", "Cocoa powder", "Buttermilk", "Vinegar", "Red food color", "Cream cheese"],
    calories: 290,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf80fd44?w=800&q=80",
    tags: ["cake", "dessert", "sweet", "cream-cheese"],
  },
  {
    slug: "rosemary-focaccia",
    name: {
      en: "Rosemary Focaccia",
      bn: "রোজমেরি ফোকাসিয়া",
    },
    description: {
      en: "Italian flatbread infused with olive oil, sea salt, and fresh rosemary sprigs.",
      bn: "অলিভ অয়েল, সামুদ্রিক লবণ এবং তাজা রোজমেরি দিয়ে তৈরি ইতালীয় ফ্ল্যাটব্রেড।",
    },
    price: 220,
    currency: "INR",
    ingredients: ["Flour", "Olive oil", "Rosemary", "Sea salt", "Yeast"],
    calories: 250,
    image: "https://images.unsplash.com/photo-1573145402507-42bf25c3459c?w=800&q=80",
    tags: ["bread", "italian", "savory", "vegan"],
  },
  {
    slug: "chocolate-chip-cookie",
    name: {
      en: "Choco Chip Cookie",
      bn: "চকো চিপ কুকি",
    },
    description: {
      en: "Classic chewy cookie loaded with chunks of semi-sweet chocolate.",
      bn: "ক্লাসিক চিউই কুকি যা সেমি-সুইট চকলেটের টুকরোয় ভরপুর।",
    },
    price: 90,
    currency: "INR",
    ingredients: ["Flour", "Butter", "Brown sugar", "Chocolate chips", "Vanilla", "Eggs"],
    calories: 220,
    image: "https://images.unsplash.com/photo-1499636138143-bd630f5cf446?w=800&q=80",
    tags: ["cookie", "chocolate", "snack", "sweet"],
  },
  {
    slug: "veg-puff",
    name: {
      en: "Vegetable Puff",
      bn: "ভেজিটেবল পাফ",
    },
    description: {
      en: "Golden flaky pastry filled with a spiced mix of potatoes, peas, and carrots.",
      bn: "মশলাদার আলু, মটরশুটি এবং গাজরের পুর ভরা সোনালি মচমচে প্যাটিস।",
    },
    price: 60,
    currency: "INR",
    ingredients: ["Refined flour", "Butter", "Potatoes", "Peas", "Spices", "Oil"],
    calories: 300,
    image: "https://images.unsplash.com/photo-1626508035297-0032b314d621?w=800&q=80",
    tags: ["savory", "snack", "indian", "spicy"],
  },
  {
    slug: "fruit-tart",
    name: {
      en: "Fresh Fruit Tart",
      bn: "ফ্রেশ ফ্রুট টার্ট",
    },
    description: {
      en: "Crisp pastry shell filled with vanilla custard and topped with seasonal fruits.",
      bn: "মচমচে পেস্ট্রি শেল যা ভ্যানিলা কাস্টার্ডে পূর্ণ এবং উপরে মৌসুমি ফল সাজানো।",
    },
    price: 210,
    currency: "INR",
    ingredients: ["Flour", "Butter", "Custard", "Strawberries", "Kiwi", "Blueberries"],
    calories: 240,
    image: "https://images.unsplash.com/photo-1563729768647-d3c5418a3ff3?w=800&q=80",
    tags: ["dessert", "fruit", "tart", "fresh"],
  },
  {
    slug: "walnut-brownie",
    name: {
      en: "Walnut Brownie",
      bn: "আখরোট ব্রাউনি",
    },
    description: {
      en: "Dense, fudgy chocolate brownie topped with crunchy roasted walnuts.",
      bn: "ঘন, চকলেটি ব্রাউনি যার উপরে মচমচে ভাজা আখরোট ছড়ানো।",
    },
    price: 160,
    currency: "INR",
    ingredients: ["Dark chocolate", "Butter", "Cocoa", "Walnuts", "Sugar", "Eggs"],
    calories: 350,
    image: "https://images.unsplash.com/photo-1515037893149-de7f841e4633?w=800&q=80",
    tags: ["dessert", "chocolate", "nuts", "fudgy"],
  },
  {
    slug: "chicken-pie",
    name: {
      en: "Chicken Pot Pie",
      bn: "চিকেন পট পাই",
    },
    description: {
      en: "Savory pie with a creamy chicken and herb filling encased in flaky pastry.",
      bn: "ক্রিমি চিকেন এবং হার্বসের পুর ভরা একটি সুস্বাদু পাই, যা মচমচে পেস্ট্রিতে মোড়া।",
    },
    price: 240,
    currency: "INR",
    ingredients: ["Chicken", "Flour", "Cream", "Butter", "Thyme", "Vegetables"],
    calories: 410,
    image: "https://images.unsplash.com/photo-1612185523992-e9a9c9d5d59f?w=800&q=80",
    tags: ["savory", "lunch", "chicken", "meal"],
  },
  {
    slug: "black-forest-slice",
    name: {
      en: "Black Forest Slice",
      bn: "ব্ল্যাক ফরেস্ট স্লাইস",
    },
    description: {
      en: "Layers of chocolate sponge cake sandwiched with whipped cream and cherries.",
      bn: "হুইপড ক্রিম এবং চেরি দিয়ে সাজানো চকলেট স্পঞ্জ কেকের লেয়ার।",
    },
    price: 180,
    currency: "INR",
    ingredients: ["Cocoa powder", "Cherries", "Whipped cream", "Flour", "Chocolate shavings"],
    calories: 330,
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80",
    tags: ["cake", "chocolate", "german", "classic"],
  },
  {
    slug: "oatmeal-raisin-cookie",
    name: {
      en: "Oatmeal Raisin Cookie",
      bn: "ওটমিল কিসমিস কুকি",
    },
    description: {
      en: "Healthy oats mixed with sweet raisins and a hint of cinnamon.",
      bn: "স্বাস্থ্যকর ওটস, মিষ্টি কিসমিস এবং সামান্য দারুচিনি দিয়ে তৈরি।",
    },
    price: 85,
    currency: "INR",
    ingredients: ["Rolled oats", "Raisins", "Flour", "Butter", "Cinnamon", "Brown sugar"],
    calories: 190,
    image: "https://images.unsplash.com/photo-1558500227-2c96c4217736?w=800&q=80",
    tags: ["cookie", "healthy", "snack", "oats"],
  },
  {
    slug: "lemon-tart",
    name: {
      en: "Lemon Curd Tart",
      bn: "লেমন টার্ট",
    },
    description: {
      en: "Tangy and sweet lemon curd filling in a buttery shortcrust base.",
      bn: "মাখনযুক্ত শর্টক্রাস্ট বেসের মধ্যে টক-মিষ্টি লেবুর পুর।",
    },
    price: 190,
    currency: "INR",
    ingredients: ["Lemon juice", "Eggs", "Sugar", "Butter", "Flour"],
    calories: 260,
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
    tags: ["dessert", "citrus", "tart", "tangy"],
  },
  {
    slug: "multigrain-bread",
    name: {
      en: "Multigrain Bread",
      bn: "মাল্টিগ্রেইন ব্রেড",
    },
    description: {
      en: "Healthy loaf made with 5 different grains and topped with oats.",
      bn: "৫টি ভিন্ন শস্য দিয়ে তৈরি স্বাস্থ্যকর রুটি, যার উপরে ওটস ছড়ানো।",
    },
    price: 290,
    currency: "INR",
    ingredients: ["Wheat flour", "Rye", "Oats", "Flaxseeds", "Sunflower seeds", "Honey"],
    calories: 230,
    image: "https://images.unsplash.com/photo-1616499874836-e0bd266e74b0?w=800&q=80",
    tags: ["bread", "healthy", "multigrain", "breakfast"],
  },
  {
    slug: "chocolate-eclair",
    name: {
      en: "Chocolate Eclair",
      bn: "চকলেট এক্লেয়ার",
    },
    description: {
      en: "Choux pastry filled with vanilla cream and topped with chocolate fondant.",
      bn: "ভ্যানিলা ক্রিমে ভরা এবং উপরে চকলেট ফন্ড্যান্ট দেওয়া শউ পেস্ট্রি।",
    },
    price: 170,
    currency: "INR",
    ingredients: ["Choux pastry", "Vanilla cream", "Chocolate", "Eggs", "Butter"],
    calories: 280,
    image: "https://images.unsplash.com/photo-1612806259024-e696f0144d4c?w=800&q=80",
    tags: ["pastry", "french", "chocolate", "cream"],
  },
  {
    slug: "garlic-breadsticks",
    name: {
      en: "Garlic Breadsticks",
      bn: "গার্লিক ব্রেডস্টিকস",
    },
    description: {
      en: "Crunchy breadsticks brushed with garlic butter and herbs.",
      bn: "রসুন, মাখন এবং হার্বস মাখানো মচমচে ব্রেডস্টিকস।",
    },
    price: 130,
    currency: "INR",
    ingredients: ["Flour", "Garlic", "Butter", "Parsley", "Yeast"],
    calories: 210,
    image: "https://images.unsplash.com/photo-1573140247632-f84660f67126?w=800&q=80",
    tags: ["side", "savory", "garlic", "snack"],
  },
  {
    slug: "new-york-cheesecake",
    name: {
      en: "NY Style Cheesecake",
      bn: "নিউ ইয়র্ক চিজকেক",
    },
    description: {
      en: "Classic baked cheesecake with a graham cracker crust and smooth creamy texture.",
      bn: "গ্রাহাম ক্র্যাকার ক্রাস্ট এবং মসৃণ ক্রিমি টেক্সচার সহ ক্লাসিক বেকড চিজকেক।",
    },
    price: 380,
    currency: "INR",
    ingredients: ["Cream cheese", "Graham crackers", "Sugar", "Eggs", "Sour cream", "Vanilla"],
    calories: 450,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
    tags: ["cake", "dessert", "cheese", "premium"],
  },
  {
    slug: "milk-bread",
    name: {
      en: "Japanese Milk Bread",
      bn: "জাপানিজ মিল্ক ব্রেড",
    },
    description: {
      en: "Incredibly soft and fluffy loaf made using the Tangzhong method.",
      bn: "তাংঝং পদ্ধতি ব্যবহার করে তৈরি অবিশ্বাস্যভাবে নরম এবং তুলতুলে রুটি।",
    },
    price: 260,
    currency: "INR",
    ingredients: ["High protein flour", "Milk", "Cream", "Butter", "Sugar", "Yeast"],
    calories: 290,
    image: "https://images.unsplash.com/photo-1563201515-adbe35c669c5?w=800&q=80",
    tags: ["bread", "soft", "sweet", "asian"],
  },
  {
    slug: "apple-pie",
    name: {
      en: "Classic Apple Pie",
      bn: "ক্লাসিক অ্যাপেল পাই",
    },
    description: {
      en: "Spiced apple filling inside a golden double-crust pastry.",
      bn: "সোনালি ডাবল-ক্রাস্ট পেস্ট্রির ভেতরে মশলাদার আপেলের পুর।",
    },
    price: 400,
    currency: "INR",
    ingredients: ["Apples", "Flour", "Butter", "Cinnamon", "Nutmeg", "Sugar"],
    calories: 380,
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80",
    tags: ["dessert", "fruit", "pie", "classic"],
  },
  {
    slug: "tiramisu-cup",
    name: {
      en: "Tiramisu Cup",
      bn: "তিরামিসু কাপ",
    },
    description: {
      en: "Coffee-soaked ladyfingers layered with mascarpone cream and cocoa dust.",
      bn: "কফিতে ভেজানো লেডিফিঙ্গার বিস্কুট এবং মাস্কারপোন ক্রিমের স্তর, উপরে কোকো পাউডার ছড়ানো।",
    },
    price: 290,
    currency: "INR",
    ingredients: ["Mascarpone", "Coffee", "Ladyfingers", "Cocoa", "Sugar", "Eggs"],
    calories: 360,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    tags: ["dessert", "coffee", "italian", "creamy"],
  },
];