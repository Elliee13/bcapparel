import productCap from "../assets/products/cap.png";
import productPolo from "../assets/products/polo.png";
import productSock from "../assets/products/sock.png";
import productSweater from "../assets/products/sweater.png";
import bags1 from "../assets/bags/bags1.webp";
import bags2 from "../assets/bags/bags2.webp";
import bags3 from "../assets/bags/bags3.webp";
import bags4 from "../assets/bags/bags4.jpg";
import tech1 from "../assets/techs/tech1.webp";
import tech2 from "../assets/techs/tech2.webp";
import tech3 from "../assets/techs/tech3.webp";
import tech4 from "../assets/techs/tech4.webp";
import writeIns1 from "../assets/writeInstruments/writeIns1.webp";
import writeIns2 from "../assets/writeInstruments/writeIns2.webp";
import writeIns3 from "../assets/writeInstruments/writeIns3.jpg";
import writeIns4 from "../assets/writeInstruments/writeIns4.webp";
import drinkWare1 from "../assets/drinkWare/drinkWare1.jpg";
import drinkWare2 from "../assets/drinkWare/drinkWare2.jpg";
import drinkWare3 from "../assets/drinkWare/drinkWare3.webp";
import drinkWare4 from "../assets/drinkWare/drinkWare4.webp";

export type TrendingCategory =
  | "Drinkware"
  | "Writing Instruments"
  | "Apparels"
  | "Bags"
  | "Tech Products";

export type TrendingProduct = {
  id: string;
  name: string;
  category: TrendingCategory;
  imageUrl: string;
};

export const FEATURED_CATEGORIES: TrendingCategory[] = [
  "Drinkware",
  "Writing Instruments",
  "Apparels",
  "Bags",
  "Tech Products",
];

export const FEATURED_PRODUCTS: TrendingProduct[] = [
  { id: "drink-01", name: "Tally Tumbler 30oz", category: "Drinkware", imageUrl: drinkWare1 },
  { id: "drink-02", name: "14 Oz. Speckled Matte Ceramic Mug", category: "Drinkware", imageUrl: drinkWare2 },
  { id: "drink-03", name: "Custom Double Wall Tumbler - 16 Oz", category: "Drinkware", imageUrl: drinkWare3 },
  { id: "drink-04", name: "16oz Frosted Stadium Cups", category: "Drinkware", imageUrl: drinkWare4 },
  { id: "write-01", name: "SouvenirÂ® Daven Pen", category: "Writing Instruments", imageUrl: writeIns1 },
  { id: "write-02", name: "Asher Recycled Aluminum Pen", category: "Writing Instruments", imageUrl: writeIns2 },
  { id: "write-03", name: "BICÂ® Brite Liner Gripâ„¢ & Grip Roller Pen Pack", category: "Writing Instruments", imageUrl: writeIns3 },
  { id: "write-04", name: "TerraDiamond Recycled Pen", category: "Writing Instruments", imageUrl: writeIns4 },
  { id: "app-01", name: "Sports Performance Sandwich Cap", category: "Apparels", imageUrl: productCap },
  { id: "app-02", name: "Classic Polo", category: "Apparels", imageUrl: productPolo },
  { id: "app-03", name: "Made in USA Cotton Crew Dress Socks with All Over Design", category: "Apparels", imageUrl: productSock },
  { id: "app-04", name: "Team Sweater", category: "Apparels", imageUrl: productSweater },
  { id: "bag-01", name: "Bungalow RPET Foldable Shopper Tote", category: "Bags", imageUrl: bags1 },
  { id: "bag-02", name: "Recycled 5oz Cotton Twill Grocery Tote", category: "Bags", imageUrl: bags2 },
  { id: "bag-03", name: "Drawstring Bag", category: "Bags", imageUrl: bags3 },
  { id: "bag-04", name: "Reagan Heathered Laptop Backpack", category: "Bags", imageUrl: bags4 },
  { id: "tech-01", name: "Leeman Roma 6\"x8\" Wireless Power Charger Refillable Journal", category: "Tech Products", imageUrl: tech1 },
  { id: "tech-02", name: "FSCÂ® 100% Bamboo MagClickâ„¢ Fast Wireless Pad", category: "Tech Products", imageUrl: tech2 },
  { id: "tech-03", name: "Round Card USB Flash Drive", category: "Tech Products", imageUrl: tech3 },
  { id: "tech-04", name: "Biscayne USB Flash Drive", category: "Tech Products", imageUrl: tech4 },
];
