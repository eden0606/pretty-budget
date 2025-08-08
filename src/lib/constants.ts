export const DATABASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.DEV_DATABASE_URL;

export const CARDS = {
  6919: {
    name: 'wells fargo - active cash - 6919',
    regex: [/used at (.*) for \$(\d+.\d{1,2})/, /\$(\d+.\d{1,2}) purchase at (.*) with/]
  },
  4376: {
    name: 'wells fargo - bilt - 4376',
    regex: [/used at (.*) for \$(\d+.\d{1,2})/, /\$(\d+.\d{1,2}) purchase at (.*) with/]
  },
  sapphire: {
    name: 'chase - sapphire preferred - 3007',
    regex: [/\$(\d+.\d{1,2}) with (.+) on/, /\$(\d+.\d{1,2}) transaction with (.*) on/]
  },
  amazon: {
    name: 'chase - prime - 9337',
    regex: [/\$(\d+.\d{1,2}) with (.+) on/, /\$(\d+.\d{1,2}) transaction with (.*) on/]
  },
  citi: {
    name: 'citi - custom cash - 2983',
    regex: [/\$(\d+.\d{1,2}) transaction was made at (.+) on/]
  },
  discover: {
    name: 'discover - it - 4217',
    regex: [/\$(\d+.\d{1,2}) at (.*) on/]
  }
};

export const CARD_NAMES = [
  'wells fargo - active cash - 6919',
  'wells fargo - bilt - 4376',
  'chase - sapphire preferred - 3007',
  'chase - prime - 9337',
  'citi - custom cash - 2983',
  'discover - it - 4217'
];

export const CATEGORY = [
  'groceries',
  'dining out',
  'hba',
  'rent',
  'utilities',
  'pets',
  'health/wellness',
  'car',
  'activities/travel',
  'clothes',
  'subscriptions',
  'wants',
  'home items',
  'gifts',
  'other'
];

// store -> purchase
export const FREQUENT_PURCHASES = {
  coffee: 'coffee',
  'chick-fil-a': 'chick-fil-a',
  chickfila: 'chick-fil-a',
  aldi: 'groceries',
  walmart: 'groceries',
  rent: 'rent',
  'state farm': "renter's insurance",
  spotify: 'spotify',
  netflix: 'netflix',
  energy: 'energy bill',
  parking: 'parking'
};

// purchase -> category
export const FREQUENT_CATEGORIES = {
  groceries: 'groceries',
  gas: 'car',
  doctor: 'health/wellness',
  dermo: 'health/wellness',
  dentist: 'health/wellness',
  'oil change': 'car',
  'energy bill': 'utilities',
  'water bill': 'utilities',
  tubby: 'pets',
  bear: 'pets',
  netflix: 'subscriptions',
  apple: 'subscriptions',
  spotify: 'subscriptions',
  'renter"s insurance': 'subscriptions',
  gift: 'gifts',
  coffee: 'dining out',
  rent: 'rent',
  car: 'car',
  hotel: 'activities/travel',
  litter: 'pets',
  vet: 'pets',
  flight: 'activities/travel',
  parking: 'activities/travel'
};

// category -> want/need
export const WANT_OR_NEED = {
  groceries: 'need',
  gas: 'need',
  'health/wellness': 'need',
  car: 'need',
  pets: 'need',
  rent: 'need',
  subscriptions: 'want',
  'dining out': 'want',
  utilities: 'need',
  gifts: 'want',
  hba: 'need',
  'activities/travel': 'want',
  clothes: 'want',
  wants: 'want',
  'home items': 'want',
  other: 'want'
};
