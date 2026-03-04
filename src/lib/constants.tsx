import Building from '@/components/svgs/Building';
import Car from '@/components/svgs/Car';
import Cat from '@/components/svgs/Cat';
import CircleQuestionMark from '@/components/svgs/CircleQuestionMark';
import Gift from '@/components/svgs/Gift';
import Heart from '@/components/svgs/Heart';
import KitchenSet from '@/components/svgs/KitchenSet';
import Lightbulb from '@/components/svgs/Lightbulb';
import Plane from '@/components/svgs/Plane';
import Shirt from '@/components/svgs/Shirt';
import ShoppingBasket from '@/components/svgs/ShoppingBasket';
import Soap from '@/components/svgs/Soap';
import Spotify from '@/components/svgs/Spotify';
import Stethoscope from '@/components/svgs/Stethoscope';
import Utensils from '@/components/svgs/Utensils';
import { ReactElement } from 'react';

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
  'discover - it - 4217',
  'other'
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
  coffe: 'coffee',
  'chick-fil-a': 'chick-fil-a',
  chickfila: 'chick-fil-a',
  aldi: 'groceries',
  walmart: 'groceries',
  'state farm': "renter's insurance",
  rent: 'rent',
  spotify: 'spotify',
  netflix: 'netflix',
  energy: 'energy bill',
  parking: 'parking',
  home: 'home items',
  tjmaxx: 'home items',
  marshalls: 'home items',
  doordash: 'doordash',
  publix: 'groceries',
  harris: 'groceries',
  chewy: 'chewy',
  car: 'gas',
  crunch: 'gym membership',
  pet: 'pet',
  vets: 'vet visit - ',
  park: 'parking',
  exxon: 'gas',
  member: 'membership',
  bojangles: 'dining out',
  lyft: 'activities/travel',
  uber: 'activities/travel'
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
  "renter's insurance": 'subscriptions',
  gift: 'gifts',
  coffee: 'dining out',
  rent: 'rent',
  car: 'car',
  hotel: 'activities/travel',
  litter: 'pets',
  vet: 'pets',
  flight: 'activities/travel',
  parking: 'activities/travel',
  home: 'home items',
  doordash: 'dining out',
  chewy: 'pets',
  membership: 'subscriptions',
  member: 'subscriptions',
  pet: 'pets',
  chomps: 'groceries',
  'core powers': 'groceries',
  subscription: 'subscriptions'
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

export const MONTHS: { [key: string | number]: string } = {
  Jan: 'january',
  Feb: 'february',
  Mar: 'march',
  Apr: 'april',
  May: 'may',
  Jun: 'june',
  Jul: 'july',
  Aug: 'august',
  Sep: 'september',
  Oct: 'october',
  Nov: 'november',
  Dec: 'december',
  1: 'january',
  2: 'february',
  3: 'march',
  4: 'april',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'august',
  9: 'september',
  10: 'october',
  11: 'november',
  12: 'december'
};

export const WEEKDAYS: { [key: number]: string } = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  0: 'sunday'
};

export const CATEGORY_SVGS: { [key: string]: ReactElement<SVGAElement> } = {
  'activities/travel': <Plane />,
  car: <Car />,
  clothes: <Shirt />,
  'dining out': <Utensils />,
  gifts: <Gift />,
  groceries: <ShoppingBasket />,
  hba: <Soap />,
  'health/wellness': <Stethoscope />,
  rent: <Building />,
  utilities: <Lightbulb />,
  pets: <Cat />,
  subscriptions: <Spotify />,
  wants: <Heart />,
  'home items': <KitchenSet />,
  other: <CircleQuestionMark />
};
