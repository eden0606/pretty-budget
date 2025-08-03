export const CARDS = {
  6919: {
    name: 'wells fargo - active cash - 6919',
    regex: /used at (.*) for \$(\d+.\d{1,2})/,
    amountIndex: 2,
    storeIndex: 1
  },
  4376: {
    name: 'wells fargo - bilt - 4376',
    regex: [/used at (.*) for \$(\d+.\d{1,2})/],
    amountIndex: 2,
    storeIndex: 1
  },
  sapphire: {
    name: 'chase - sapphire preferred - 3007',
    regex: [/\$(\d+.\d{1,2}) with (.+) on/, /a \$(\d+.\d{1,2}) transaction with (.*) on/],
    amountIndex: 1,
    storeIndex: 2
  },
  amazon: {
    name: 'chase - prime - 9337',
    regex: [/\$(\d+.\d{1,2}) with (.+) on/, /a \$(\d+.\d{1,2}) transaction with (.*) on/],
    amountIndex: 1,
    storeIndex: 2
  },
  citi: {
    //   TODO: change this once we know what citi's message format is
    name: 'citi - custom cash - 2983',
    regex: [/\$(\d+.\d{1,2}) with (.+)/],
    amountIndex: 1,
    storeIndex: 2
  },
  discover: {
    name: 'discover - it - 4217',
    regex: [/transaction of \$(\d+.\d{1,2}) at (.*) on/],
    amountIndex: 1,
    storeIndex: 2
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
  netflix: 'netflix'
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
