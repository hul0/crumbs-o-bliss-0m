export interface BakeryItem {
  slug: string
  name: { en: string; bn: string }
  description: { en: string; bn: string }
  price: number
  currency: "INR"
  ingredients: string[]
  calories: number
  image: string
  tags: string[]
}

export const items: BakeryItem[] = [
  {
    slug: "sourdough-bread",
    name: {
      en: "Classic Sourdough",
      bn: "ক্লাসিক সাউরডু",
    },
    description: {
      en: "A rustic, crusty loaf with a tangy flavor and chewy crumb. Made with our signature sourdough starter and aged for 24 hours.",
      bn: "একটি ঋজু, খাস্তা রুটি যার একটি টক স্বাদ এবং নমনীয় ক্রাম্ব। আমাদের স্বাক্ষর সাউরডু স্টার্টার দিয়ে তৈরি এবং ২৪ ঘন্টার জন্য বয়সযুক্ত।",
    },
    price: 320,
    currency: "INR",
    ingredients: ["Bread flour", "Sourdough starter", "Water", "Salt"],
    calories: 265,
    image: "/placeholder.svg?height=400&width=400",
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
      bn: "মাখনযুক্ত, খাস্তা স্তর সমৃদ্ধ গাঢ় চকলেট বার সহ। একটি ফ্রেঞ্চ পেস্ট্রি ক্লাসিক যা প্রতিদিন তাজা তৈরি করা হয়।",
    },
    price: 180,
    currency: "INR",
    ingredients: ["Flour", "Butter", "Dark chocolate", "Milk", "Sugar", "Salt"],
    calories: 320,
    image: "/placeholder.svg?height=400&width=400",
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
      bn: "নরম, কোমল মাফিন তাজা ব্লুবেরি দিয়ে ভরপুর এবং একটি হালকা ক্রাম্ব স্ট্রুসেল দিয়ে শীর্ষে।",
    },
    price: 140,
    currency: "INR",
    ingredients: ["Flour", "Fresh blueberries", "Butter", "Eggs", "Milk", "Baking powder", "Sugar"],
    calories: 285,
    image: "/placeholder.svg?height=400&width=400",
    tags: ["muffin", "blueberry", "breakfast", "fruit"],
  },
  {
    slug: "cinnamon-roll",
    name: {
      en: "Cinnamon Roll",
      bn: "দারুচিনি রোল",
    },
    description: {
      en: "A spiral of soft dough with warm cinnamon and sugar filling, topped with cream cheese frosting.",
      bn: "উষ্ণ দারুচিনি এবং চিনির ভরাট সহ নরম ময়দার একটি পালক, ক্রিম পনির ফ্রস্টিং দিয়ে শীর্ষে।",
    },
    price: 160,
    currency: "INR",
    ingredients: ["Flour", "Butter", "Cinnamon", "Sugar", "Cream cheese", "Milk", "Yeast"],
    calories: 340,
    image: "/placeholder.svg?height=400&width=400",
    tags: ["roll", "cinnamon", "breakfast", "pastry"],
  },
  {
    slug: "almond-croissant",
    name: {
      en: "Almond Croissant",
      bn: "বাদাম ক্রয়েস্যান্ট",
    },
    description: {
      en: "A delicate French pastry with layers of puff pastry, almond cream, and sliced almonds.",
      bn: "মসৃণ পাফ পেস্ট্রি, বাদাম ক্রিম এবং কাটা বাদাম সহ একটি সূক্ষ্ম ফ্রেঞ্চ পেস্ট্রি।",
    },
    price: 200,
    currency: "INR",
    ingredients: ["Puff pastry", "Almond paste", "Butter", "Almond slices", "Sugar", "Eggs"],
    calories: 310,
    image: "/placeholder.svg?height=400&width=400",
    tags: ["croissant", "almond", "french", "nuts"],
  },
  {
    slug: "whole-wheat-loaf",
    name: {
      en: "Whole Wheat Loaf",
      bn: "সম্পূর্ণ গম রুটি",
    },
    description: {
      en: "Dense, nutritious loaf made with whole wheat flour, seeds, and a touch of honey.",
      bn: "সম্পূর্ণ গম আটা, বীজ এবং মধুর একটি স্পর্শ দিয়ে তৈরি ঘন, পুষ্টিকর রুটি।",
    },
    price: 280,
    currency: "INR",
    ingredients: ["Whole wheat flour", "Seeds", "Honey", "Water", "Salt", "Yeast"],
    calories: 220,
    image: "/placeholder.svg?height=400&width=400",
    tags: ["bread", "whole-grain", "healthy", "seeds"],
  },
  {
    slug: "macaron-assortment",
    name: {
      en: "Macaron Assortment",
      bn: "ম্যাকারন সমাহার",
    },
    description: {
      en: "A delicate set of French macarons in flavors: pistachio, rose, and salted caramel.",
      bn: "পিস্তা, গোলাপ এবং লবণ করা ক্যারামেল স্বাদে ফ্রেঞ্চ ম্যাকারনের একটি সূক্ষ্ম সেট।",
    },
    price: 350,
    currency: "INR",
    ingredients: ["Almond flour", "Egg whites", "Sugar", "Pistachio paste", "Rose flavoring", "Caramel"],
    calories: 75,
    image: "/placeholder.svg?height=400&width=400",
    tags: ["macaron", "french", "assortment", "premium"],
  },
]
