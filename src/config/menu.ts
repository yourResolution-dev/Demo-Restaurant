import { MenuItem } from '../types/restaurant.types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'app-1',
    name: 'Truffle Infused Pugliese Burrata',
    category: 'Best Appetizers',
    price: 890,
    description:
      'Creamy burrata heart, confit heirloom tomatoes, 25-year aged Modena balsamic, micro basil, toasted sourdough crisp.',
    longDescription:
      'Sourced weekly from artisanal dairies in Puglia, this burrata is encased in a delicate mozzarella shell with a rich, silky stracciatella heart. Served over slow-roasted sun-kissed heirloom cherry tomatoes, infused with black truffle oil from Umbria, and finished with crystalline Maldon sea salt flakes.',
    image: '/images/photo-1546069901-ba9599a7e63c-960.webp',
    tags: ['Vegetarian', 'Signature', 'Chef Special'],
    calories: 420,
    preparationTime: '12 mins',
    allergens: ['Dairy', 'Gluten'],
    winePairing: 'Vermentino di Sardegna DOC 2021',
    chefNote:
      'Our signature cold starter since 2014. The acidity of the heirloom reduction cuts flawlessly through the rich truffle creaminess.',
    isPopular: true,
  },
  {
    id: 'app-2',
    name: 'Charred Spanish Octopus Tentacle',
    category: 'Best Appetizers',
    price: 1450,
    description:
      'Wood-fired tender octopus, smoked paprika Yukon gold mousseline, caper berries, pickled pearl onions, cold-pressed olive drizzle.',
    longDescription:
      'Wild Spanish octopus slowly braised with cork and fresh aromatics for four hours before receiving a high-heat woodfire kiss. Plated over velvet smoked paprika potato purée and finished with crispy caper berries and extra virgin olive oil pressed from our private estate.',
    image: '/images/photo-1544025162-d76694265947-960.webp',
    tags: ['Seafood', 'Gluten Free', 'Signature'],
    calories: 380,
    preparationTime: '18 mins',
    allergens: ['Molluscs'],
    winePairing: 'Albariño Rías Baixas 2022',
    chefNote:
      'Crisp smokiness on the exterior, tender velvet within. Best experienced with a sip of mineral-forward white.',
    isPopular: true,
  },
  {
    id: 'app-3',
    name: 'Crispy Artichoke Alla Giudia',
    category: 'Best Appetizers',
    price: 780,
    description:
      'Roman-style crisp baby artichokes, preserved Meyer lemon emulsion, wild mint dust, smoked chili oil.',
    longDescription:
      'A classic Roman Jewish heritage delicacy. Young Italian artichokes gently flattened and double flash-fried in golden olive oil until each petal becomes paper-crisp. Complemented with a velvety house-made preserved lemon emulsion and fragrant dried mint.',
    image: '/images/photo-1540420773420-3366772f4999-960.webp',
    tags: ['Vegetarian', 'Gluten Free'],
    calories: 290,
    preparationTime: '15 mins',
    allergens: [],
    winePairing: 'Greco di Tufo DOCG',
    chefNote:
      'Light, crunchy and intensely botanical. An homage to Rome’s historic culinary quarters.',
    isPopular: false,
  },
  {
    id: 'app-4',
    name: 'Wagyu Beef Carpaccio & Quail Yolk',
    category: 'Best Appetizers',
    price: 1650,
    description:
      'Thinly sliced A5 Wagyu, shaved black summer truffles, organic cured quail yolk, caper emulsion, parmigiano reggiano crisps.',
    longDescription:
      'Tender paper-thin sheets of melt-in-your-mouth Wagyu tenderloin dressed with cold-pressed olive oil, fresh lemon juice, micro arugula, cured quail egg yolk, and generous ribbons of aged 36-month Parmigiano Reggiano.',
    image: '/images/photo-1541544741938-0af808871cc0-960.webp',
    tags: ['Chef Special', 'Gluten Free'],
    calories: 410,
    preparationTime: '10 mins',
    allergens: ['Eggs', 'Dairy'],
    winePairing: 'Barolo DOCG 2018',
    chefNote:
      'Delicate yet robust. The warmth of the cured quail yolk coats the marbled beef in luxurious richness.',
    isPopular: true,
  },
  {
    id: 'main-1',
    name: 'Pan-Seared Chilean Sea Bass',
    category: 'Mains & Specialties',
    price: 2650,
    description:
      'Wild sea bass fillet, saffron bouillabaisse glaze, Romanesco florets, butter-poached asparagus, sturgeon caviar pearls.',
    longDescription:
      'Sustainably sourced Chilean Sea Bass seared to golden perfection with crisp skin while retaining its glistening, flaky core. Accompanied by charred Romanesco broccoli, glazed baby carrots, saffron beurre blanc, and Royal Ossetra caviar pearls.',
    image: '/images/photo-1519708227418-c8fd9a32b7a2-960.webp',
    tags: ['Seafood', 'Gluten Free', 'Signature', 'Chef Special'],
    calories: 620,
    preparationTime: '24 mins',
    allergens: ['Fish', 'Dairy'],
    winePairing: 'Puligny-Montrachet Premier Cru 2020',
    chefNote:
      'The crowning seafood jewel of our dining room. The saffron emulsion brings warm Mediterranean sunshine to the palate.',
    isPopular: true,
  },
  {
    id: 'main-2',
    name: '12-Hour Slow Braised Lamb Shank',
    category: 'Mains & Specialties',
    price: 2350,
    description:
      'New Zealand lamb shank braised in Chianti Classico, creamy saffron polenta, roasted cipollini onions, rosemary gremolata.',
    longDescription:
      'Prime pasture-fed lamb shank gently braised overnight in Tuscan Chianti wine with mirepoix, wild thyme, and toasted coriander seeds. Served over creamy stoneground polenta enriched with Parmigiano, crowned with citrusy gremolata.',
    image: '/images/photo-1544025162-d76694265947-960.webp',
    tags: ['Chef Special'],
    calories: 840,
    preparationTime: '20 mins',
    allergens: ['Dairy'],
    winePairing: 'Brunello di Montalcino DOCG 2017',
    chefNote:
      'Falling-off-the-bone tenderness where the marrow melds deeply with our reduced wine demi-glace.',
    isPopular: true,
  },
  {
    id: 'main-3',
    name: 'Sous-Vide Duck Breast & Spiced Fig',
    category: 'Mains & Specialties',
    price: 2150,
    description:
      'Pan-rendered duck breast, spiced blackberry thyme gastrique, parsnip velvet, caramelized Turkish figs, pistachio crumble.',
    longDescription:
      'Free-range duck breast cooked sous-vide to a flawless medium rare, then flash-crisped on its scored skin. Served alongside sweet parsnip mousseline, mission figs poached in port wine, and an aromatic blackberry reduction.',
    image: '/images/photo-1555939594-58d7cb561ad1-960.webp',
    tags: ['Gluten Free', 'Chef Special'],
    calories: 680,
    preparationTime: '22 mins',
    allergens: ['Nuts'],
    winePairing: 'Pinot Noir Domaine Drouhin 2019',
    chefNote:
      'Sweet, tart, rich, and earthy notes harmonized into a symphony of autumnal elegance.',
    isPopular: false,
  },
  {
    id: 'pasta-1',
    name: 'Black Truffle Tagliolini al Burro',
    category: 'Woodfire & Pasta',
    price: 1650,
    description:
      'House-extruded 30-yolk pasta, winter black truffle emulsion, 36-month Vacche Rosse Parmigiano, fresh truffle shavings.',
    longDescription:
      'Crafted daily in our glass pasta laboratory using Italian stone-ground Tipo 00 flour and 30 egg yolks per kilo. Tossed in French cultured butter with mountain pasture parmesan broth, finished tableside with generous shavings of fresh black truffle.',
    image: '/images/photo-1563379091339-03b21ab4a4f8-960.webp',
    tags: ['Vegetarian', 'Signature', 'Chef Special'],
    calories: 590,
    preparationTime: '15 mins',
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    winePairing: 'Nebbiolo d’Alba DOC 2020',
    chefNote:
      'Pure simplicity elevated to the divine. We shave the truffle right in front of you so the aroma fills the table.',
    isPopular: true,
  },
  {
    id: 'pasta-2',
    name: 'Lobster & Blue Crab Saffron Ravioli',
    category: 'Woodfire & Pasta',
    price: 1950,
    description:
      'Hand-pinched ravioli, butter-poached Maine lobster claw, blue crab stuffing, bisque reduction, chive blossom oil.',
    longDescription:
      'Handmade saffron-infused pasta pillows filled with shredded Atlantic blue crab, ricotta, and tarragon. Rested in a reduced lobster cognac bisque and crowned with a golden butter-poached lobster medallion.',
    image: '/images/photo-1551183053-bf91a1d81141-960.webp',
    tags: ['Seafood', 'Signature'],
    calories: 610,
    preparationTime: '18 mins',
    allergens: ['Crustaceans', 'Gluten', 'Eggs', 'Dairy'],
    winePairing: 'Chablis Premier Cru 2021',
    chefNote:
      'A labor of love. Each ravioli is folded by hand by our pasta master each morning at 7:00 AM.',
    isPopular: true,
  },
  {
    id: 'pasta-3',
    name: 'Wild Porcini & Morel Risotto',
    category: 'Woodfire & Pasta',
    price: 1450,
    description:
      'Acquerello aged carnaroli rice, foraged wild mushrooms, aged taleggio fonduta, roasted garlic thyme froth, parmesan tuile.',
    longDescription:
      'Aged 1-year Acquerello carnaroli rice slow-stirred with double mushroom broth, butter-glazed porcini, black chanterelles, and golden morels. Finished with creamy Lombardy taleggio and a delicate crispy parmesan lace.',
    image: '/images/photo-1633964913295-ceb43826e7c9-960.webp',
    tags: ['Vegetarian', 'Gluten Free'],
    calories: 540,
    preparationTime: '20 mins',
    allergens: ['Dairy'],
    winePairing: 'Chianti Classico Gran Selezione',
    chefNote:
      'Earthiness in every grain. Acquerello rice holds its firm al-dente pearl core unlike any other grain.',
    isPopular: false,
  },
  {
    id: 'dessert-1',
    name: 'Valrhona Smoked Dark Chocolate Sphere',
    category: 'Decadent Desserts',
    price: 850,
    description:
      'Smoked 70% Guanaja chocolate dome, warm spiced espresso caramel pour-over, hazelnut feuilletine, Fior di Latte gelato.',
    longDescription:
      'An interactive sensory finale. A thin dark chocolate sphere filled with molten dark mousse and hazelnut praline crunch. Melted tableside with a warm espresso spiced caramel stream, revealing artisanal vanilla bean gelato.',
    image: '/images/photo-1579372786545-d24232daf58c-960.webp',
    tags: ['Vegetarian', 'Signature', 'Chef Special'],
    calories: 510,
    preparationTime: '10 mins',
    allergens: ['Dairy', 'Nuts', 'Gluten'],
    winePairing: 'Pedro Ximénez Sherry 20 Years',
    chefNote:
      'Rich, dramatic, and intensely satisfying. The smoke aroma lingers on the palate in the most graceful way.',
    isPopular: true,
  },
  {
    id: 'dessert-2',
    name: 'Estate Olive Oil & Amalfi Lemon Chiffon',
    category: 'Decadent Desserts',
    price: 750,
    description:
      'Cold-pressed olive oil sponge, Amalfi lemon curd, torched Italian meringue, candied rosemary, wild raspberry coulis.',
    longDescription:
      'Moist and airy olive oil cake featuring cold-pressed extra virgin oil, paired with tart Amalfi lemon custard, lightly torched Swiss meringue peaks, and macerated mountain raspberries.',
    image: '/images/photo-1509440159596-0249088772ff-960.webp',
    tags: ['Vegetarian'],
    calories: 390,
    preparationTime: '8 mins',
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    winePairing: 'Moscato d’Asti DOCG 2022',
    chefNote:
      'An olive oil dessert that honors our restaurant name. Bright, citrusy, and refreshingly light.',
    isPopular: false,
  },
  {
    id: 'cocktail-1',
    name: 'Smoked Rosemary Old Fashioned',
    category: 'Artisanal Cocktails & Wines',
    price: 950,
    description:
      '12-year Kentucky bourbon, house demerara reduction, angostura & orange bitters, charred rosemary cloche smoke.',
    longDescription:
      'Crafted with premium small-batch bourbon, stirred over a single hand-carved ice sphere with house-spiced orange bitters, and presented under a glass cloche filled with aromatic woodfire rosemary smoke.',
    image: '/images/photo-1514362545857-3bc16c4c7d1b-960.webp',
    tags: ['Signature'],
    calories: 190,
    preparationTime: '5 mins',
    allergens: [],
    chefNote:
      'Our bar’s pride. Lift the cloche to release the fragrant pine smoke before taking your first sip.',
    isPopular: true,
  },
  {
    id: 'cocktail-2',
    name: 'The Olive Grove Botanical Spritz',
    category: 'Artisanal Cocktails & Wines',
    price: 880,
    description:
      'Mediterranean botanical gin, Italicus bergamot liqueur, sparkling prosecco, wild thyme, castelvetrano olive pick.',
    longDescription:
      'An invigorating golden hour aperitivo featuring herbal botanical gin, fragrant Italian bergamot, crisp elderflower tonic, and dry Prosecco. Garnished with a salted green Castelvetrano olive.',
    image: '/images/photo-1556679343-c7306c1976bc-960.webp',
    tags: ['Signature'],
    calories: 160,
    preparationTime: '4 mins',
    allergens: [],
    chefNote:
      'Effervescent and crisp. The perfect palate cleanser before your first appetizer arrives.',
    isPopular: false,
  },
];
