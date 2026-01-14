
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.6.1
 * Query Engine version: 694eea289a8462c80264df36757e4fdc129b1b32
 */
Prisma.prismaVersion = {
  client: "4.6.1",
  engine: "694eea289a8462c80264df36757e4fdc129b1b32"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.ActivityScalarFieldEnum = makeEnum({
  id: 'id',
  cityId: 'cityId',
  title: 'title',
  description: 'description',
  price: 'price',
  currency: 'currency',
  lat: 'lat',
  lng: 'lng',
  images: 'images',
  tags: 'tags',
  bookingUrl: 'bookingUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.AppSettingsScalarFieldEnum = makeEnum({
  id: 'id',
  standardCityPrice: 'standardCityPrice',
  currency: 'currency'
});

exports.Prisma.BookingScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  type: 'type',
  referenceId: 'referenceId',
  date: 'date',
  status: 'status',
  price: 'price',
  currency: 'currency',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CityApplicationScalarFieldEnum = makeEnum({
  id: 'id',
  cityId: 'cityId',
  name: 'name',
  description: 'description',
  iconUrl: 'iconUrl',
  androidLink: 'androidLink',
  iphoneLink: 'iphoneLink',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CityCarScalarFieldEnum = makeEnum({
  id: 'id',
  cityId: 'cityId',
  name: 'name',
  type: 'type',
  pricePerDay: 'pricePerDay',
  transmission: 'transmission',
  fuel: 'fuel',
  contactInfo: 'contactInfo',
  imageUrl: 'imageUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CityDocumentScalarFieldEnum = makeEnum({
  id: 'id',
  cityId: 'cityId',
  name: 'name',
  exampleUrl: 'exampleUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CityEventScalarFieldEnum = makeEnum({
  id: 'id',
  cityId: 'cityId',
  title: 'title',
  description: 'description',
  date: 'date',
  location: 'location',
  lat: 'lat',
  lng: 'lng',
  imageUrl: 'imageUrl',
  bookingUrl: 'bookingUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CityRecommendedItemScalarFieldEnum = makeEnum({
  id: 'id',
  cityId: 'cityId',
  name: 'name',
  imageUrl: 'imageUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CityScalarFieldEnum = makeEnum({
  id: 'id',
  countryId: 'countryId',
  name: 'name',
  lat: 'lat',
  lng: 'lng',
  images: 'images',
  timezone: 'timezone',
  currency: 'currency',
  language: 'language',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CityTipScalarFieldEnum = makeEnum({
  id: 'id',
  cityId: 'cityId',
  content: 'content',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CityTourGuideScalarFieldEnum = makeEnum({
  id: 'id',
  cityId: 'cityId',
  name: 'name',
  bio: 'bio',
  languages: 'languages',
  pricePerHour: 'pricePerHour',
  rating: 'rating',
  contactInfo: 'contactInfo',
  imageUrl: 'imageUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CountryScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  code: 'code',
  continent: 'continent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.DriverScalarFieldEnum = makeEnum({
  id: 'id',
  cityId: 'cityId',
  name: 'name',
  phone: 'phone',
  contactInfo: 'contactInfo',
  pricePerDay: 'pricePerDay',
  vehicleType: 'vehicleType',
  rating: 'rating',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TripCityScalarFieldEnum = makeEnum({
  id: 'id',
  tripId: 'tripId',
  cityId: 'cityId',
  startDate: 'startDate',
  endDate: 'endDate'
});

exports.Prisma.TripItemScalarFieldEnum = makeEnum({
  id: 'id',
  tripCityId: 'tripCityId',
  type: 'type',
  referenceId: 'referenceId',
  date: 'date',
  startTime: 'startTime',
  endTime: 'endTime'
});

exports.Prisma.TripPackingItemScalarFieldEnum = makeEnum({
  id: 'id',
  tripId: 'tripId',
  cityId: 'cityId',
  title: 'title',
  description: 'description',
  category: 'category',
  isPacked: 'isPacked',
  referenceId: 'referenceId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.TripScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  title: 'title',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  progress: 'progress',
  countryId: 'countryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});


exports.Prisma.ModelName = makeEnum({
  Country: 'Country',
  City: 'City',
  CityTip: 'CityTip',
  CityDocument: 'CityDocument',
  CityRecommendedItem: 'CityRecommendedItem',
  CityEvent: 'CityEvent',
  CityCar: 'CityCar',
  CityTourGuide: 'CityTourGuide',
  CityApplication: 'CityApplication',
  Activity: 'Activity',
  Driver: 'Driver',
  Trip: 'Trip',
  TripCity: 'TripCity',
  TripItem: 'TripItem',
  TripPackingItem: 'TripPackingItem',
  Booking: 'Booking',
  AppSettings: 'AppSettings'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
