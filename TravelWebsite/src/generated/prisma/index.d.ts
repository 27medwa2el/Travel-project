
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Country
 * 
 */
export type Country = {
  id: string
  name: string
  code: string | null
  continent: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model City
 * 
 */
export type City = {
  id: string
  countryId: string
  name: string
  lat: number
  lng: number
  images: string[]
  timezone: string | null
  currency: string | null
  language: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model CityTip
 * 
 */
export type CityTip = {
  id: string
  cityId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model CityDocument
 * 
 */
export type CityDocument = {
  id: string
  cityId: string
  name: string
  exampleUrl: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model CityRecommendedItem
 * 
 */
export type CityRecommendedItem = {
  id: string
  cityId: string
  name: string
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model CityEvent
 * 
 */
export type CityEvent = {
  id: string
  cityId: string
  title: string
  description: string
  date: string
  location: string
  lat: number
  lng: number
  imageUrl: string | null
  bookingUrl: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model CityCar
 * 
 */
export type CityCar = {
  id: string
  cityId: string
  name: string
  type: string
  pricePerDay: number
  transmission: string
  fuel: string
  contactInfo: string | null
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model CityTourGuide
 * 
 */
export type CityTourGuide = {
  id: string
  cityId: string
  name: string
  bio: string
  languages: string[]
  pricePerHour: number
  rating: number
  contactInfo: string | null
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model CityApplication
 * 
 */
export type CityApplication = {
  id: string
  cityId: string
  name: string
  description: string
  iconUrl: string | null
  androidLink: string | null
  iphoneLink: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Activity
 * 
 */
export type Activity = {
  id: string
  cityId: string
  title: string
  description: string | null
  price: number | null
  currency: string | null
  lat: number
  lng: number
  images: string[]
  tags: string[]
  bookingUrl: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Driver
 * 
 */
export type Driver = {
  id: string
  cityId: string
  name: string
  phone: string | null
  contactInfo: string | null
  pricePerDay: number | null
  vehicleType: string | null
  rating: number | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Trip
 * 
 */
export type Trip = {
  id: string
  userId: string
  title: string
  startDate: string
  endDate: string
  status: string
  progress: number
  countryId: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model TripCity
 * 
 */
export type TripCity = {
  id: string
  tripId: string
  cityId: string
  startDate: string
  endDate: string
}

/**
 * Model TripItem
 * 
 */
export type TripItem = {
  id: string
  tripCityId: string
  type: string
  date: string
  startTime: string | null
  endTime: string | null
  activityId: string | null
  eventId: string | null
}

/**
 * Model TripPackingItem
 * 
 */
export type TripPackingItem = {
  id: string
  tripId: string
  cityId: string | null
  title: string
  description: string | null
  category: string
  isPacked: boolean
  referenceId: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Booking
 * 
 */
export type Booking = {
  id: string
  userId: string
  type: string
  date: string
  status: string
  price: number
  currency: string
  activityId: string | null
  driverId: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model AppSettings
 * 
 */
export type AppSettings = {
  id: number
  standardCityPrice: number
  currency: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Countries
 * const countries = await prisma.country.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Countries
   * const countries = await prisma.country.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.country`: Exposes CRUD operations for the **Country** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countries
    * const countries = await prisma.country.findMany()
    * ```
    */
  get country(): Prisma.CountryDelegate<GlobalReject>;

  /**
   * `prisma.city`: Exposes CRUD operations for the **City** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cities
    * const cities = await prisma.city.findMany()
    * ```
    */
  get city(): Prisma.CityDelegate<GlobalReject>;

  /**
   * `prisma.cityTip`: Exposes CRUD operations for the **CityTip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CityTips
    * const cityTips = await prisma.cityTip.findMany()
    * ```
    */
  get cityTip(): Prisma.CityTipDelegate<GlobalReject>;

  /**
   * `prisma.cityDocument`: Exposes CRUD operations for the **CityDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CityDocuments
    * const cityDocuments = await prisma.cityDocument.findMany()
    * ```
    */
  get cityDocument(): Prisma.CityDocumentDelegate<GlobalReject>;

  /**
   * `prisma.cityRecommendedItem`: Exposes CRUD operations for the **CityRecommendedItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CityRecommendedItems
    * const cityRecommendedItems = await prisma.cityRecommendedItem.findMany()
    * ```
    */
  get cityRecommendedItem(): Prisma.CityRecommendedItemDelegate<GlobalReject>;

  /**
   * `prisma.cityEvent`: Exposes CRUD operations for the **CityEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CityEvents
    * const cityEvents = await prisma.cityEvent.findMany()
    * ```
    */
  get cityEvent(): Prisma.CityEventDelegate<GlobalReject>;

  /**
   * `prisma.cityCar`: Exposes CRUD operations for the **CityCar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CityCars
    * const cityCars = await prisma.cityCar.findMany()
    * ```
    */
  get cityCar(): Prisma.CityCarDelegate<GlobalReject>;

  /**
   * `prisma.cityTourGuide`: Exposes CRUD operations for the **CityTourGuide** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CityTourGuides
    * const cityTourGuides = await prisma.cityTourGuide.findMany()
    * ```
    */
  get cityTourGuide(): Prisma.CityTourGuideDelegate<GlobalReject>;

  /**
   * `prisma.cityApplication`: Exposes CRUD operations for the **CityApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CityApplications
    * const cityApplications = await prisma.cityApplication.findMany()
    * ```
    */
  get cityApplication(): Prisma.CityApplicationDelegate<GlobalReject>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<GlobalReject>;

  /**
   * `prisma.driver`: Exposes CRUD operations for the **Driver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.driver.findMany()
    * ```
    */
  get driver(): Prisma.DriverDelegate<GlobalReject>;

  /**
   * `prisma.trip`: Exposes CRUD operations for the **Trip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trips
    * const trips = await prisma.trip.findMany()
    * ```
    */
  get trip(): Prisma.TripDelegate<GlobalReject>;

  /**
   * `prisma.tripCity`: Exposes CRUD operations for the **TripCity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TripCities
    * const tripCities = await prisma.tripCity.findMany()
    * ```
    */
  get tripCity(): Prisma.TripCityDelegate<GlobalReject>;

  /**
   * `prisma.tripItem`: Exposes CRUD operations for the **TripItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TripItems
    * const tripItems = await prisma.tripItem.findMany()
    * ```
    */
  get tripItem(): Prisma.TripItemDelegate<GlobalReject>;

  /**
   * `prisma.tripPackingItem`: Exposes CRUD operations for the **TripPackingItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TripPackingItems
    * const tripPackingItems = await prisma.tripPackingItem.findMany()
    * ```
    */
  get tripPackingItem(): Prisma.TripPackingItemDelegate<GlobalReject>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<GlobalReject>;

  /**
   * `prisma.appSettings`: Exposes CRUD operations for the **AppSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppSettings
    * const appSettings = await prisma.appSettings.findMany()
    * ```
    */
  get appSettings(): Prisma.AppSettingsDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.6.1
   * Query Engine version: 694eea289a8462c80264df36757e4fdc129b1b32
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
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
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CountryCountOutputType
   */


  export type CountryCountOutputType = {
    cities: number
  }

  export type CountryCountOutputTypeSelect = {
    cities?: boolean
  }

  export type CountryCountOutputTypeGetPayload<S extends boolean | null | undefined | CountryCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CountryCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (CountryCountOutputTypeArgs)
    ? CountryCountOutputType 
    : S extends { select: any } & (CountryCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof CountryCountOutputType ? CountryCountOutputType[P] : never
  } 
      : CountryCountOutputType




  // Custom InputTypes

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CountryCountOutputType
     * 
    **/
    select?: CountryCountOutputTypeSelect | null
  }



  /**
   * Count Type CityCountOutputType
   */


  export type CityCountOutputType = {
    tips: number
    documents: number
    recommendedItems: number
    events: number
    cars: number
    tourGuides: number
    applications: number
    activities: number
    drivers: number
    tripCities: number
  }

  export type CityCountOutputTypeSelect = {
    tips?: boolean
    documents?: boolean
    recommendedItems?: boolean
    events?: boolean
    cars?: boolean
    tourGuides?: boolean
    applications?: boolean
    activities?: boolean
    drivers?: boolean
    tripCities?: boolean
  }

  export type CityCountOutputTypeGetPayload<S extends boolean | null | undefined | CityCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CityCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (CityCountOutputTypeArgs)
    ? CityCountOutputType 
    : S extends { select: any } & (CityCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof CityCountOutputType ? CityCountOutputType[P] : never
  } 
      : CityCountOutputType




  // Custom InputTypes

  /**
   * CityCountOutputType without action
   */
  export type CityCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CityCountOutputType
     * 
    **/
    select?: CityCountOutputTypeSelect | null
  }



  /**
   * Count Type CityEventCountOutputType
   */


  export type CityEventCountOutputType = {
    tripItems: number
  }

  export type CityEventCountOutputTypeSelect = {
    tripItems?: boolean
  }

  export type CityEventCountOutputTypeGetPayload<S extends boolean | null | undefined | CityEventCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CityEventCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (CityEventCountOutputTypeArgs)
    ? CityEventCountOutputType 
    : S extends { select: any } & (CityEventCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof CityEventCountOutputType ? CityEventCountOutputType[P] : never
  } 
      : CityEventCountOutputType




  // Custom InputTypes

  /**
   * CityEventCountOutputType without action
   */
  export type CityEventCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CityEventCountOutputType
     * 
    **/
    select?: CityEventCountOutputTypeSelect | null
  }



  /**
   * Count Type ActivityCountOutputType
   */


  export type ActivityCountOutputType = {
    tripItems: number
    bookings: number
  }

  export type ActivityCountOutputTypeSelect = {
    tripItems?: boolean
    bookings?: boolean
  }

  export type ActivityCountOutputTypeGetPayload<S extends boolean | null | undefined | ActivityCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ActivityCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ActivityCountOutputTypeArgs)
    ? ActivityCountOutputType 
    : S extends { select: any } & (ActivityCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ActivityCountOutputType ? ActivityCountOutputType[P] : never
  } 
      : ActivityCountOutputType




  // Custom InputTypes

  /**
   * ActivityCountOutputType without action
   */
  export type ActivityCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ActivityCountOutputType
     * 
    **/
    select?: ActivityCountOutputTypeSelect | null
  }



  /**
   * Count Type DriverCountOutputType
   */


  export type DriverCountOutputType = {
    bookings: number
  }

  export type DriverCountOutputTypeSelect = {
    bookings?: boolean
  }

  export type DriverCountOutputTypeGetPayload<S extends boolean | null | undefined | DriverCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? DriverCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (DriverCountOutputTypeArgs)
    ? DriverCountOutputType 
    : S extends { select: any } & (DriverCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DriverCountOutputType ? DriverCountOutputType[P] : never
  } 
      : DriverCountOutputType




  // Custom InputTypes

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DriverCountOutputType
     * 
    **/
    select?: DriverCountOutputTypeSelect | null
  }



  /**
   * Count Type TripCountOutputType
   */


  export type TripCountOutputType = {
    cities: number
    packingList: number
  }

  export type TripCountOutputTypeSelect = {
    cities?: boolean
    packingList?: boolean
  }

  export type TripCountOutputTypeGetPayload<S extends boolean | null | undefined | TripCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TripCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (TripCountOutputTypeArgs)
    ? TripCountOutputType 
    : S extends { select: any } & (TripCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof TripCountOutputType ? TripCountOutputType[P] : never
  } 
      : TripCountOutputType




  // Custom InputTypes

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TripCountOutputType
     * 
    **/
    select?: TripCountOutputTypeSelect | null
  }



  /**
   * Count Type TripCityCountOutputType
   */


  export type TripCityCountOutputType = {
    items: number
  }

  export type TripCityCountOutputTypeSelect = {
    items?: boolean
  }

  export type TripCityCountOutputTypeGetPayload<S extends boolean | null | undefined | TripCityCountOutputTypeArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TripCityCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (TripCityCountOutputTypeArgs)
    ? TripCityCountOutputType 
    : S extends { select: any } & (TripCityCountOutputTypeArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof TripCityCountOutputType ? TripCityCountOutputType[P] : never
  } 
      : TripCityCountOutputType




  // Custom InputTypes

  /**
   * TripCityCountOutputType without action
   */
  export type TripCityCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the TripCityCountOutputType
     * 
    **/
    select?: TripCityCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Country
   */


  export type AggregateCountry = {
    _count: CountryCountAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  export type CountryMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    continent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    continent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountryCountAggregateOutputType = {
    id: number
    name: number
    code: number
    continent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CountryMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    continent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountryMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    continent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountryCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    continent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CountryAggregateArgs = {
    /**
     * Filter which Country to aggregate.
     * 
    **/
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     * 
    **/
    orderBy?: Enumerable<CountryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Countries
    **/
    _count?: true | CountryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountryMaxAggregateInputType
  }

  export type GetCountryAggregateType<T extends CountryAggregateArgs> = {
        [P in keyof T & keyof AggregateCountry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountry[P]>
      : GetScalarType<T[P], AggregateCountry[P]>
  }




  export type CountryGroupByArgs = {
    where?: CountryWhereInput
    orderBy?: Enumerable<CountryOrderByWithAggregationInput>
    by: Array<CountryScalarFieldEnum>
    having?: CountryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountryCountAggregateInputType | true
    _min?: CountryMinAggregateInputType
    _max?: CountryMaxAggregateInputType
  }


  export type CountryGroupByOutputType = {
    id: string
    name: string
    code: string | null
    continent: string | null
    createdAt: Date
    updatedAt: Date
    _count: CountryCountAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  type GetCountryGroupByPayload<T extends CountryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CountryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountryGroupByOutputType[P]>
            : GetScalarType<T[P], CountryGroupByOutputType[P]>
        }
      >
    >


  export type CountrySelect = {
    id?: boolean
    name?: boolean
    code?: boolean
    continent?: boolean
    cities?: boolean | CityFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | CountryCountOutputTypeArgs
  }


  export type CountryInclude = {
    cities?: boolean | CityFindManyArgs
    _count?: boolean | CountryCountOutputTypeArgs
  } 

  export type CountryGetPayload<S extends boolean | null | undefined | CountryArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Country :
    S extends undefined ? never :
    S extends { include: any } & (CountryArgs | CountryFindManyArgs)
    ? Country  & {
    [P in TrueKeys<S['include']>]:
        P extends 'cities' ? Array < CityGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? CountryCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (CountryArgs | CountryFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'cities' ? Array < CityGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? CountryCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Country ? Country[P] : never
  } 
      : Country


  type CountryCountArgs = Merge<
    Omit<CountryFindManyArgs, 'select' | 'include'> & {
      select?: CountryCountAggregateInputType | true
    }
  >

  export interface CountryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Country that matches the filter.
     * @param {CountryFindUniqueArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CountryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CountryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Country'> extends True ? Prisma__CountryClient<CountryGetPayload<T>> : Prisma__CountryClient<CountryGetPayload<T> | null, null>

    /**
     * Find the first Country that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CountryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CountryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Country'> extends True ? Prisma__CountryClient<CountryGetPayload<T>> : Prisma__CountryClient<CountryGetPayload<T> | null, null>

    /**
     * Find zero or more Countries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countries
     * const countries = await prisma.country.findMany()
     * 
     * // Get first 10 Countries
     * const countries = await prisma.country.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const countryWithIdOnly = await prisma.country.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CountryFindManyArgs>(
      args?: SelectSubset<T, CountryFindManyArgs>
    ): PrismaPromise<Array<CountryGetPayload<T>>>

    /**
     * Create a Country.
     * @param {CountryCreateArgs} args - Arguments to create a Country.
     * @example
     * // Create one Country
     * const Country = await prisma.country.create({
     *   data: {
     *     // ... data to create a Country
     *   }
     * })
     * 
    **/
    create<T extends CountryCreateArgs>(
      args: SelectSubset<T, CountryCreateArgs>
    ): Prisma__CountryClient<CountryGetPayload<T>>

    /**
     * Create many Countries.
     *     @param {CountryCreateManyArgs} args - Arguments to create many Countries.
     *     @example
     *     // Create many Countries
     *     const country = await prisma.country.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CountryCreateManyArgs>(
      args?: SelectSubset<T, CountryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Country.
     * @param {CountryDeleteArgs} args - Arguments to delete one Country.
     * @example
     * // Delete one Country
     * const Country = await prisma.country.delete({
     *   where: {
     *     // ... filter to delete one Country
     *   }
     * })
     * 
    **/
    delete<T extends CountryDeleteArgs>(
      args: SelectSubset<T, CountryDeleteArgs>
    ): Prisma__CountryClient<CountryGetPayload<T>>

    /**
     * Update one Country.
     * @param {CountryUpdateArgs} args - Arguments to update one Country.
     * @example
     * // Update one Country
     * const country = await prisma.country.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CountryUpdateArgs>(
      args: SelectSubset<T, CountryUpdateArgs>
    ): Prisma__CountryClient<CountryGetPayload<T>>

    /**
     * Delete zero or more Countries.
     * @param {CountryDeleteManyArgs} args - Arguments to filter Countries to delete.
     * @example
     * // Delete a few Countries
     * const { count } = await prisma.country.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CountryDeleteManyArgs>(
      args?: SelectSubset<T, CountryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CountryUpdateManyArgs>(
      args: SelectSubset<T, CountryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Country.
     * @param {CountryUpsertArgs} args - Arguments to update or create a Country.
     * @example
     * // Update or create a Country
     * const country = await prisma.country.upsert({
     *   create: {
     *     // ... data to create a Country
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Country we want to update
     *   }
     * })
    **/
    upsert<T extends CountryUpsertArgs>(
      args: SelectSubset<T, CountryUpsertArgs>
    ): Prisma__CountryClient<CountryGetPayload<T>>

    /**
     * Find one Country that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CountryFindUniqueOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CountryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CountryFindUniqueOrThrowArgs>
    ): Prisma__CountryClient<CountryGetPayload<T>>

    /**
     * Find the first Country that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CountryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CountryFindFirstOrThrowArgs>
    ): Prisma__CountryClient<CountryGetPayload<T>>

    /**
     * Count the number of Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryCountArgs} args - Arguments to filter Countries to count.
     * @example
     * // Count the number of Countries
     * const count = await prisma.country.count({
     *   where: {
     *     // ... the filter for the Countries we want to count
     *   }
     * })
    **/
    count<T extends CountryCountArgs>(
      args?: Subset<T, CountryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountryAggregateArgs>(args: Subset<T, CountryAggregateArgs>): PrismaPromise<GetCountryAggregateType<T>>

    /**
     * Group by Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CountryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountryGroupByArgs['orderBy'] }
        : { orderBy?: CountryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CountryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountryGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Country.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CountryClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    cities<T extends CityFindManyArgs= {}>(args?: Subset<T, CityFindManyArgs>): PrismaPromise<Array<CityGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Country base type for findUnique actions
   */
  export type CountryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Country
     * 
    **/
    select?: CountrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CountryInclude | null
    /**
     * Filter, which Country to fetch.
     * 
    **/
    where: CountryWhereUniqueInput
  }

  /**
   * Country: findUnique
   */
  export interface CountryFindUniqueArgs extends CountryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Country base type for findFirst actions
   */
  export type CountryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Country
     * 
    **/
    select?: CountrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CountryInclude | null
    /**
     * Filter, which Country to fetch.
     * 
    **/
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     * 
    **/
    orderBy?: Enumerable<CountryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countries.
     * 
    **/
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     * 
    **/
    distinct?: Enumerable<CountryScalarFieldEnum>
  }

  /**
   * Country: findFirst
   */
  export interface CountryFindFirstArgs extends CountryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Country findMany
   */
  export type CountryFindManyArgs = {
    /**
     * Select specific fields to fetch from the Country
     * 
    **/
    select?: CountrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CountryInclude | null
    /**
     * Filter, which Countries to fetch.
     * 
    **/
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     * 
    **/
    orderBy?: Enumerable<CountryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Countries.
     * 
    **/
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CountryScalarFieldEnum>
  }


  /**
   * Country create
   */
  export type CountryCreateArgs = {
    /**
     * Select specific fields to fetch from the Country
     * 
    **/
    select?: CountrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CountryInclude | null
    /**
     * The data needed to create a Country.
     * 
    **/
    data: XOR<CountryCreateInput, CountryUncheckedCreateInput>
  }


  /**
   * Country createMany
   */
  export type CountryCreateManyArgs = {
    /**
     * The data used to create many Countries.
     * 
    **/
    data: Enumerable<CountryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Country update
   */
  export type CountryUpdateArgs = {
    /**
     * Select specific fields to fetch from the Country
     * 
    **/
    select?: CountrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CountryInclude | null
    /**
     * The data needed to update a Country.
     * 
    **/
    data: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
    /**
     * Choose, which Country to update.
     * 
    **/
    where: CountryWhereUniqueInput
  }


  /**
   * Country updateMany
   */
  export type CountryUpdateManyArgs = {
    /**
     * The data used to update Countries.
     * 
    **/
    data: XOR<CountryUpdateManyMutationInput, CountryUncheckedUpdateManyInput>
    /**
     * Filter which Countries to update
     * 
    **/
    where?: CountryWhereInput
  }


  /**
   * Country upsert
   */
  export type CountryUpsertArgs = {
    /**
     * Select specific fields to fetch from the Country
     * 
    **/
    select?: CountrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CountryInclude | null
    /**
     * The filter to search for the Country to update in case it exists.
     * 
    **/
    where: CountryWhereUniqueInput
    /**
     * In case the Country found by the `where` argument doesn't exist, create a new Country with this data.
     * 
    **/
    create: XOR<CountryCreateInput, CountryUncheckedCreateInput>
    /**
     * In case the Country was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
  }


  /**
   * Country delete
   */
  export type CountryDeleteArgs = {
    /**
     * Select specific fields to fetch from the Country
     * 
    **/
    select?: CountrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CountryInclude | null
    /**
     * Filter which Country to delete.
     * 
    **/
    where: CountryWhereUniqueInput
  }


  /**
   * Country deleteMany
   */
  export type CountryDeleteManyArgs = {
    /**
     * Filter which Countries to delete
     * 
    **/
    where?: CountryWhereInput
  }


  /**
   * Country: findUniqueOrThrow
   */
  export type CountryFindUniqueOrThrowArgs = CountryFindUniqueArgsBase
      

  /**
   * Country: findFirstOrThrow
   */
  export type CountryFindFirstOrThrowArgs = CountryFindFirstArgsBase
      

  /**
   * Country without action
   */
  export type CountryArgs = {
    /**
     * Select specific fields to fetch from the Country
     * 
    **/
    select?: CountrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CountryInclude | null
  }



  /**
   * Model City
   */


  export type AggregateCity = {
    _count: CityCountAggregateOutputType | null
    _avg: CityAvgAggregateOutputType | null
    _sum: CitySumAggregateOutputType | null
    _min: CityMinAggregateOutputType | null
    _max: CityMaxAggregateOutputType | null
  }

  export type CityAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type CitySumAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type CityMinAggregateOutputType = {
    id: string | null
    countryId: string | null
    name: string | null
    lat: number | null
    lng: number | null
    timezone: string | null
    currency: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityMaxAggregateOutputType = {
    id: string | null
    countryId: string | null
    name: string | null
    lat: number | null
    lng: number | null
    timezone: string | null
    currency: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityCountAggregateOutputType = {
    id: number
    countryId: number
    name: number
    lat: number
    lng: number
    images: number
    timezone: number
    currency: number
    language: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CityAvgAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type CitySumAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type CityMinAggregateInputType = {
    id?: true
    countryId?: true
    name?: true
    lat?: true
    lng?: true
    timezone?: true
    currency?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityMaxAggregateInputType = {
    id?: true
    countryId?: true
    name?: true
    lat?: true
    lng?: true
    timezone?: true
    currency?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityCountAggregateInputType = {
    id?: true
    countryId?: true
    name?: true
    lat?: true
    lng?: true
    images?: true
    timezone?: true
    currency?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CityAggregateArgs = {
    /**
     * Filter which City to aggregate.
     * 
    **/
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     * 
    **/
    orderBy?: Enumerable<CityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cities
    **/
    _count?: true | CityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityMaxAggregateInputType
  }

  export type GetCityAggregateType<T extends CityAggregateArgs> = {
        [P in keyof T & keyof AggregateCity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCity[P]>
      : GetScalarType<T[P], AggregateCity[P]>
  }




  export type CityGroupByArgs = {
    where?: CityWhereInput
    orderBy?: Enumerable<CityOrderByWithAggregationInput>
    by: Array<CityScalarFieldEnum>
    having?: CityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityCountAggregateInputType | true
    _avg?: CityAvgAggregateInputType
    _sum?: CitySumAggregateInputType
    _min?: CityMinAggregateInputType
    _max?: CityMaxAggregateInputType
  }


  export type CityGroupByOutputType = {
    id: string
    countryId: string
    name: string
    lat: number
    lng: number
    images: string[]
    timezone: string | null
    currency: string | null
    language: string | null
    createdAt: Date
    updatedAt: Date
    _count: CityCountAggregateOutputType | null
    _avg: CityAvgAggregateOutputType | null
    _sum: CitySumAggregateOutputType | null
    _min: CityMinAggregateOutputType | null
    _max: CityMaxAggregateOutputType | null
  }

  type GetCityGroupByPayload<T extends CityGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityGroupByOutputType[P]>
            : GetScalarType<T[P], CityGroupByOutputType[P]>
        }
      >
    >


  export type CitySelect = {
    id?: boolean
    countryId?: boolean
    country?: boolean | CountryArgs
    name?: boolean
    lat?: boolean
    lng?: boolean
    images?: boolean
    timezone?: boolean
    currency?: boolean
    language?: boolean
    tips?: boolean | CityTipFindManyArgs
    documents?: boolean | CityDocumentFindManyArgs
    recommendedItems?: boolean | CityRecommendedItemFindManyArgs
    events?: boolean | CityEventFindManyArgs
    cars?: boolean | CityCarFindManyArgs
    tourGuides?: boolean | CityTourGuideFindManyArgs
    applications?: boolean | CityApplicationFindManyArgs
    activities?: boolean | ActivityFindManyArgs
    drivers?: boolean | DriverFindManyArgs
    tripCities?: boolean | TripCityFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | CityCountOutputTypeArgs
  }


  export type CityInclude = {
    country?: boolean | CountryArgs
    tips?: boolean | CityTipFindManyArgs
    documents?: boolean | CityDocumentFindManyArgs
    recommendedItems?: boolean | CityRecommendedItemFindManyArgs
    events?: boolean | CityEventFindManyArgs
    cars?: boolean | CityCarFindManyArgs
    tourGuides?: boolean | CityTourGuideFindManyArgs
    applications?: boolean | CityApplicationFindManyArgs
    activities?: boolean | ActivityFindManyArgs
    drivers?: boolean | DriverFindManyArgs
    tripCities?: boolean | TripCityFindManyArgs
    _count?: boolean | CityCountOutputTypeArgs
  } 

  export type CityGetPayload<S extends boolean | null | undefined | CityArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? City :
    S extends undefined ? never :
    S extends { include: any } & (CityArgs | CityFindManyArgs)
    ? City  & {
    [P in TrueKeys<S['include']>]:
        P extends 'country' ? CountryGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'tips' ? Array < CityTipGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'documents' ? Array < CityDocumentGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'recommendedItems' ? Array < CityRecommendedItemGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'events' ? Array < CityEventGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'cars' ? Array < CityCarGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'tourGuides' ? Array < CityTourGuideGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'applications' ? Array < CityApplicationGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'activities' ? Array < ActivityGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'drivers' ? Array < DriverGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'tripCities' ? Array < TripCityGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? CityCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (CityArgs | CityFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'country' ? CountryGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'tips' ? Array < CityTipGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'documents' ? Array < CityDocumentGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'recommendedItems' ? Array < CityRecommendedItemGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'events' ? Array < CityEventGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'cars' ? Array < CityCarGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'tourGuides' ? Array < CityTourGuideGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'applications' ? Array < CityApplicationGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'activities' ? Array < ActivityGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'drivers' ? Array < DriverGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'tripCities' ? Array < TripCityGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? CityCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof City ? City[P] : never
  } 
      : City


  type CityCountArgs = Merge<
    Omit<CityFindManyArgs, 'select' | 'include'> & {
      select?: CityCountAggregateInputType | true
    }
  >

  export interface CityDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one City that matches the filter.
     * @param {CityFindUniqueArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CityFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CityFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'City'> extends True ? Prisma__CityClient<CityGetPayload<T>> : Prisma__CityClient<CityGetPayload<T> | null, null>

    /**
     * Find the first City that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindFirstArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CityFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CityFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'City'> extends True ? Prisma__CityClient<CityGetPayload<T>> : Prisma__CityClient<CityGetPayload<T> | null, null>

    /**
     * Find zero or more Cities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cities
     * const cities = await prisma.city.findMany()
     * 
     * // Get first 10 Cities
     * const cities = await prisma.city.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityWithIdOnly = await prisma.city.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CityFindManyArgs>(
      args?: SelectSubset<T, CityFindManyArgs>
    ): PrismaPromise<Array<CityGetPayload<T>>>

    /**
     * Create a City.
     * @param {CityCreateArgs} args - Arguments to create a City.
     * @example
     * // Create one City
     * const City = await prisma.city.create({
     *   data: {
     *     // ... data to create a City
     *   }
     * })
     * 
    **/
    create<T extends CityCreateArgs>(
      args: SelectSubset<T, CityCreateArgs>
    ): Prisma__CityClient<CityGetPayload<T>>

    /**
     * Create many Cities.
     *     @param {CityCreateManyArgs} args - Arguments to create many Cities.
     *     @example
     *     // Create many Cities
     *     const city = await prisma.city.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CityCreateManyArgs>(
      args?: SelectSubset<T, CityCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a City.
     * @param {CityDeleteArgs} args - Arguments to delete one City.
     * @example
     * // Delete one City
     * const City = await prisma.city.delete({
     *   where: {
     *     // ... filter to delete one City
     *   }
     * })
     * 
    **/
    delete<T extends CityDeleteArgs>(
      args: SelectSubset<T, CityDeleteArgs>
    ): Prisma__CityClient<CityGetPayload<T>>

    /**
     * Update one City.
     * @param {CityUpdateArgs} args - Arguments to update one City.
     * @example
     * // Update one City
     * const city = await prisma.city.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CityUpdateArgs>(
      args: SelectSubset<T, CityUpdateArgs>
    ): Prisma__CityClient<CityGetPayload<T>>

    /**
     * Delete zero or more Cities.
     * @param {CityDeleteManyArgs} args - Arguments to filter Cities to delete.
     * @example
     * // Delete a few Cities
     * const { count } = await prisma.city.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CityDeleteManyArgs>(
      args?: SelectSubset<T, CityDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cities
     * const city = await prisma.city.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CityUpdateManyArgs>(
      args: SelectSubset<T, CityUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one City.
     * @param {CityUpsertArgs} args - Arguments to update or create a City.
     * @example
     * // Update or create a City
     * const city = await prisma.city.upsert({
     *   create: {
     *     // ... data to create a City
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the City we want to update
     *   }
     * })
    **/
    upsert<T extends CityUpsertArgs>(
      args: SelectSubset<T, CityUpsertArgs>
    ): Prisma__CityClient<CityGetPayload<T>>

    /**
     * Find one City that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CityFindUniqueOrThrowArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CityFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CityFindUniqueOrThrowArgs>
    ): Prisma__CityClient<CityGetPayload<T>>

    /**
     * Find the first City that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindFirstOrThrowArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CityFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CityFindFirstOrThrowArgs>
    ): Prisma__CityClient<CityGetPayload<T>>

    /**
     * Count the number of Cities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCountArgs} args - Arguments to filter Cities to count.
     * @example
     * // Count the number of Cities
     * const count = await prisma.city.count({
     *   where: {
     *     // ... the filter for the Cities we want to count
     *   }
     * })
    **/
    count<T extends CityCountArgs>(
      args?: Subset<T, CityCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a City.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityAggregateArgs>(args: Subset<T, CityAggregateArgs>): PrismaPromise<GetCityAggregateType<T>>

    /**
     * Group by City.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityGroupByArgs['orderBy'] }
        : { orderBy?: CityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for City.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CityClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    country<T extends CountryArgs= {}>(args?: Subset<T, CountryArgs>): Prisma__CountryClient<CountryGetPayload<T> | Null>;

    tips<T extends CityTipFindManyArgs= {}>(args?: Subset<T, CityTipFindManyArgs>): PrismaPromise<Array<CityTipGetPayload<T>>| Null>;

    documents<T extends CityDocumentFindManyArgs= {}>(args?: Subset<T, CityDocumentFindManyArgs>): PrismaPromise<Array<CityDocumentGetPayload<T>>| Null>;

    recommendedItems<T extends CityRecommendedItemFindManyArgs= {}>(args?: Subset<T, CityRecommendedItemFindManyArgs>): PrismaPromise<Array<CityRecommendedItemGetPayload<T>>| Null>;

    events<T extends CityEventFindManyArgs= {}>(args?: Subset<T, CityEventFindManyArgs>): PrismaPromise<Array<CityEventGetPayload<T>>| Null>;

    cars<T extends CityCarFindManyArgs= {}>(args?: Subset<T, CityCarFindManyArgs>): PrismaPromise<Array<CityCarGetPayload<T>>| Null>;

    tourGuides<T extends CityTourGuideFindManyArgs= {}>(args?: Subset<T, CityTourGuideFindManyArgs>): PrismaPromise<Array<CityTourGuideGetPayload<T>>| Null>;

    applications<T extends CityApplicationFindManyArgs= {}>(args?: Subset<T, CityApplicationFindManyArgs>): PrismaPromise<Array<CityApplicationGetPayload<T>>| Null>;

    activities<T extends ActivityFindManyArgs= {}>(args?: Subset<T, ActivityFindManyArgs>): PrismaPromise<Array<ActivityGetPayload<T>>| Null>;

    drivers<T extends DriverFindManyArgs= {}>(args?: Subset<T, DriverFindManyArgs>): PrismaPromise<Array<DriverGetPayload<T>>| Null>;

    tripCities<T extends TripCityFindManyArgs= {}>(args?: Subset<T, TripCityFindManyArgs>): PrismaPromise<Array<TripCityGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * City base type for findUnique actions
   */
  export type CityFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * Filter, which City to fetch.
     * 
    **/
    where: CityWhereUniqueInput
  }

  /**
   * City: findUnique
   */
  export interface CityFindUniqueArgs extends CityFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * City base type for findFirst actions
   */
  export type CityFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * Filter, which City to fetch.
     * 
    **/
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     * 
    **/
    orderBy?: Enumerable<CityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cities.
     * 
    **/
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cities.
     * 
    **/
    distinct?: Enumerable<CityScalarFieldEnum>
  }

  /**
   * City: findFirst
   */
  export interface CityFindFirstArgs extends CityFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * City findMany
   */
  export type CityFindManyArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * Filter, which Cities to fetch.
     * 
    **/
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     * 
    **/
    orderBy?: Enumerable<CityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cities.
     * 
    **/
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CityScalarFieldEnum>
  }


  /**
   * City create
   */
  export type CityCreateArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * The data needed to create a City.
     * 
    **/
    data: XOR<CityCreateInput, CityUncheckedCreateInput>
  }


  /**
   * City createMany
   */
  export type CityCreateManyArgs = {
    /**
     * The data used to create many Cities.
     * 
    **/
    data: Enumerable<CityCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * City update
   */
  export type CityUpdateArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * The data needed to update a City.
     * 
    **/
    data: XOR<CityUpdateInput, CityUncheckedUpdateInput>
    /**
     * Choose, which City to update.
     * 
    **/
    where: CityWhereUniqueInput
  }


  /**
   * City updateMany
   */
  export type CityUpdateManyArgs = {
    /**
     * The data used to update Cities.
     * 
    **/
    data: XOR<CityUpdateManyMutationInput, CityUncheckedUpdateManyInput>
    /**
     * Filter which Cities to update
     * 
    **/
    where?: CityWhereInput
  }


  /**
   * City upsert
   */
  export type CityUpsertArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * The filter to search for the City to update in case it exists.
     * 
    **/
    where: CityWhereUniqueInput
    /**
     * In case the City found by the `where` argument doesn't exist, create a new City with this data.
     * 
    **/
    create: XOR<CityCreateInput, CityUncheckedCreateInput>
    /**
     * In case the City was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CityUpdateInput, CityUncheckedUpdateInput>
  }


  /**
   * City delete
   */
  export type CityDeleteArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * Filter which City to delete.
     * 
    **/
    where: CityWhereUniqueInput
  }


  /**
   * City deleteMany
   */
  export type CityDeleteManyArgs = {
    /**
     * Filter which Cities to delete
     * 
    **/
    where?: CityWhereInput
  }


  /**
   * City: findUniqueOrThrow
   */
  export type CityFindUniqueOrThrowArgs = CityFindUniqueArgsBase
      

  /**
   * City: findFirstOrThrow
   */
  export type CityFindFirstOrThrowArgs = CityFindFirstArgsBase
      

  /**
   * City without action
   */
  export type CityArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
  }



  /**
   * Model CityTip
   */


  export type AggregateCityTip = {
    _count: CityTipCountAggregateOutputType | null
    _min: CityTipMinAggregateOutputType | null
    _max: CityTipMaxAggregateOutputType | null
  }

  export type CityTipMinAggregateOutputType = {
    id: string | null
    cityId: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityTipMaxAggregateOutputType = {
    id: string | null
    cityId: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityTipCountAggregateOutputType = {
    id: number
    cityId: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CityTipMinAggregateInputType = {
    id?: true
    cityId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityTipMaxAggregateInputType = {
    id?: true
    cityId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityTipCountAggregateInputType = {
    id?: true
    cityId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CityTipAggregateArgs = {
    /**
     * Filter which CityTip to aggregate.
     * 
    **/
    where?: CityTipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityTips to fetch.
     * 
    **/
    orderBy?: Enumerable<CityTipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CityTipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityTips from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityTips.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CityTips
    **/
    _count?: true | CityTipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityTipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityTipMaxAggregateInputType
  }

  export type GetCityTipAggregateType<T extends CityTipAggregateArgs> = {
        [P in keyof T & keyof AggregateCityTip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCityTip[P]>
      : GetScalarType<T[P], AggregateCityTip[P]>
  }




  export type CityTipGroupByArgs = {
    where?: CityTipWhereInput
    orderBy?: Enumerable<CityTipOrderByWithAggregationInput>
    by: Array<CityTipScalarFieldEnum>
    having?: CityTipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityTipCountAggregateInputType | true
    _min?: CityTipMinAggregateInputType
    _max?: CityTipMaxAggregateInputType
  }


  export type CityTipGroupByOutputType = {
    id: string
    cityId: string
    content: string
    createdAt: Date
    updatedAt: Date
    _count: CityTipCountAggregateOutputType | null
    _min: CityTipMinAggregateOutputType | null
    _max: CityTipMaxAggregateOutputType | null
  }

  type GetCityTipGroupByPayload<T extends CityTipGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CityTipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityTipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityTipGroupByOutputType[P]>
            : GetScalarType<T[P], CityTipGroupByOutputType[P]>
        }
      >
    >


  export type CityTipSelect = {
    id?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type CityTipInclude = {
    city?: boolean | CityArgs
  } 

  export type CityTipGetPayload<S extends boolean | null | undefined | CityTipArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CityTip :
    S extends undefined ? never :
    S extends { include: any } & (CityTipArgs | CityTipFindManyArgs)
    ? CityTip  & {
    [P in TrueKeys<S['include']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (CityTipArgs | CityTipFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof CityTip ? CityTip[P] : never
  } 
      : CityTip


  type CityTipCountArgs = Merge<
    Omit<CityTipFindManyArgs, 'select' | 'include'> & {
      select?: CityTipCountAggregateInputType | true
    }
  >

  export interface CityTipDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one CityTip that matches the filter.
     * @param {CityTipFindUniqueArgs} args - Arguments to find a CityTip
     * @example
     * // Get one CityTip
     * const cityTip = await prisma.cityTip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CityTipFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CityTipFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CityTip'> extends True ? Prisma__CityTipClient<CityTipGetPayload<T>> : Prisma__CityTipClient<CityTipGetPayload<T> | null, null>

    /**
     * Find the first CityTip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTipFindFirstArgs} args - Arguments to find a CityTip
     * @example
     * // Get one CityTip
     * const cityTip = await prisma.cityTip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CityTipFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CityTipFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CityTip'> extends True ? Prisma__CityTipClient<CityTipGetPayload<T>> : Prisma__CityTipClient<CityTipGetPayload<T> | null, null>

    /**
     * Find zero or more CityTips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTipFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CityTips
     * const cityTips = await prisma.cityTip.findMany()
     * 
     * // Get first 10 CityTips
     * const cityTips = await prisma.cityTip.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityTipWithIdOnly = await prisma.cityTip.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CityTipFindManyArgs>(
      args?: SelectSubset<T, CityTipFindManyArgs>
    ): PrismaPromise<Array<CityTipGetPayload<T>>>

    /**
     * Create a CityTip.
     * @param {CityTipCreateArgs} args - Arguments to create a CityTip.
     * @example
     * // Create one CityTip
     * const CityTip = await prisma.cityTip.create({
     *   data: {
     *     // ... data to create a CityTip
     *   }
     * })
     * 
    **/
    create<T extends CityTipCreateArgs>(
      args: SelectSubset<T, CityTipCreateArgs>
    ): Prisma__CityTipClient<CityTipGetPayload<T>>

    /**
     * Create many CityTips.
     *     @param {CityTipCreateManyArgs} args - Arguments to create many CityTips.
     *     @example
     *     // Create many CityTips
     *     const cityTip = await prisma.cityTip.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CityTipCreateManyArgs>(
      args?: SelectSubset<T, CityTipCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CityTip.
     * @param {CityTipDeleteArgs} args - Arguments to delete one CityTip.
     * @example
     * // Delete one CityTip
     * const CityTip = await prisma.cityTip.delete({
     *   where: {
     *     // ... filter to delete one CityTip
     *   }
     * })
     * 
    **/
    delete<T extends CityTipDeleteArgs>(
      args: SelectSubset<T, CityTipDeleteArgs>
    ): Prisma__CityTipClient<CityTipGetPayload<T>>

    /**
     * Update one CityTip.
     * @param {CityTipUpdateArgs} args - Arguments to update one CityTip.
     * @example
     * // Update one CityTip
     * const cityTip = await prisma.cityTip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CityTipUpdateArgs>(
      args: SelectSubset<T, CityTipUpdateArgs>
    ): Prisma__CityTipClient<CityTipGetPayload<T>>

    /**
     * Delete zero or more CityTips.
     * @param {CityTipDeleteManyArgs} args - Arguments to filter CityTips to delete.
     * @example
     * // Delete a few CityTips
     * const { count } = await prisma.cityTip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CityTipDeleteManyArgs>(
      args?: SelectSubset<T, CityTipDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CityTips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CityTips
     * const cityTip = await prisma.cityTip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CityTipUpdateManyArgs>(
      args: SelectSubset<T, CityTipUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CityTip.
     * @param {CityTipUpsertArgs} args - Arguments to update or create a CityTip.
     * @example
     * // Update or create a CityTip
     * const cityTip = await prisma.cityTip.upsert({
     *   create: {
     *     // ... data to create a CityTip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CityTip we want to update
     *   }
     * })
    **/
    upsert<T extends CityTipUpsertArgs>(
      args: SelectSubset<T, CityTipUpsertArgs>
    ): Prisma__CityTipClient<CityTipGetPayload<T>>

    /**
     * Find one CityTip that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CityTipFindUniqueOrThrowArgs} args - Arguments to find a CityTip
     * @example
     * // Get one CityTip
     * const cityTip = await prisma.cityTip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CityTipFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CityTipFindUniqueOrThrowArgs>
    ): Prisma__CityTipClient<CityTipGetPayload<T>>

    /**
     * Find the first CityTip that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTipFindFirstOrThrowArgs} args - Arguments to find a CityTip
     * @example
     * // Get one CityTip
     * const cityTip = await prisma.cityTip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CityTipFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CityTipFindFirstOrThrowArgs>
    ): Prisma__CityTipClient<CityTipGetPayload<T>>

    /**
     * Count the number of CityTips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTipCountArgs} args - Arguments to filter CityTips to count.
     * @example
     * // Count the number of CityTips
     * const count = await prisma.cityTip.count({
     *   where: {
     *     // ... the filter for the CityTips we want to count
     *   }
     * })
    **/
    count<T extends CityTipCountArgs>(
      args?: Subset<T, CityTipCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityTipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CityTip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityTipAggregateArgs>(args: Subset<T, CityTipAggregateArgs>): PrismaPromise<GetCityTipAggregateType<T>>

    /**
     * Group by CityTip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityTipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityTipGroupByArgs['orderBy'] }
        : { orderBy?: CityTipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityTipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityTipGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for CityTip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CityTipClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * CityTip base type for findUnique actions
   */
  export type CityTipFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CityTip
     * 
    **/
    select?: CityTipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTipInclude | null
    /**
     * Filter, which CityTip to fetch.
     * 
    **/
    where: CityTipWhereUniqueInput
  }

  /**
   * CityTip: findUnique
   */
  export interface CityTipFindUniqueArgs extends CityTipFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityTip base type for findFirst actions
   */
  export type CityTipFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CityTip
     * 
    **/
    select?: CityTipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTipInclude | null
    /**
     * Filter, which CityTip to fetch.
     * 
    **/
    where?: CityTipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityTips to fetch.
     * 
    **/
    orderBy?: Enumerable<CityTipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CityTips.
     * 
    **/
    cursor?: CityTipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityTips from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityTips.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CityTips.
     * 
    **/
    distinct?: Enumerable<CityTipScalarFieldEnum>
  }

  /**
   * CityTip: findFirst
   */
  export interface CityTipFindFirstArgs extends CityTipFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityTip findMany
   */
  export type CityTipFindManyArgs = {
    /**
     * Select specific fields to fetch from the CityTip
     * 
    **/
    select?: CityTipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTipInclude | null
    /**
     * Filter, which CityTips to fetch.
     * 
    **/
    where?: CityTipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityTips to fetch.
     * 
    **/
    orderBy?: Enumerable<CityTipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CityTips.
     * 
    **/
    cursor?: CityTipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityTips from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityTips.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CityTipScalarFieldEnum>
  }


  /**
   * CityTip create
   */
  export type CityTipCreateArgs = {
    /**
     * Select specific fields to fetch from the CityTip
     * 
    **/
    select?: CityTipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTipInclude | null
    /**
     * The data needed to create a CityTip.
     * 
    **/
    data: XOR<CityTipCreateInput, CityTipUncheckedCreateInput>
  }


  /**
   * CityTip createMany
   */
  export type CityTipCreateManyArgs = {
    /**
     * The data used to create many CityTips.
     * 
    **/
    data: Enumerable<CityTipCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CityTip update
   */
  export type CityTipUpdateArgs = {
    /**
     * Select specific fields to fetch from the CityTip
     * 
    **/
    select?: CityTipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTipInclude | null
    /**
     * The data needed to update a CityTip.
     * 
    **/
    data: XOR<CityTipUpdateInput, CityTipUncheckedUpdateInput>
    /**
     * Choose, which CityTip to update.
     * 
    **/
    where: CityTipWhereUniqueInput
  }


  /**
   * CityTip updateMany
   */
  export type CityTipUpdateManyArgs = {
    /**
     * The data used to update CityTips.
     * 
    **/
    data: XOR<CityTipUpdateManyMutationInput, CityTipUncheckedUpdateManyInput>
    /**
     * Filter which CityTips to update
     * 
    **/
    where?: CityTipWhereInput
  }


  /**
   * CityTip upsert
   */
  export type CityTipUpsertArgs = {
    /**
     * Select specific fields to fetch from the CityTip
     * 
    **/
    select?: CityTipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTipInclude | null
    /**
     * The filter to search for the CityTip to update in case it exists.
     * 
    **/
    where: CityTipWhereUniqueInput
    /**
     * In case the CityTip found by the `where` argument doesn't exist, create a new CityTip with this data.
     * 
    **/
    create: XOR<CityTipCreateInput, CityTipUncheckedCreateInput>
    /**
     * In case the CityTip was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CityTipUpdateInput, CityTipUncheckedUpdateInput>
  }


  /**
   * CityTip delete
   */
  export type CityTipDeleteArgs = {
    /**
     * Select specific fields to fetch from the CityTip
     * 
    **/
    select?: CityTipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTipInclude | null
    /**
     * Filter which CityTip to delete.
     * 
    **/
    where: CityTipWhereUniqueInput
  }


  /**
   * CityTip deleteMany
   */
  export type CityTipDeleteManyArgs = {
    /**
     * Filter which CityTips to delete
     * 
    **/
    where?: CityTipWhereInput
  }


  /**
   * CityTip: findUniqueOrThrow
   */
  export type CityTipFindUniqueOrThrowArgs = CityTipFindUniqueArgsBase
      

  /**
   * CityTip: findFirstOrThrow
   */
  export type CityTipFindFirstOrThrowArgs = CityTipFindFirstArgsBase
      

  /**
   * CityTip without action
   */
  export type CityTipArgs = {
    /**
     * Select specific fields to fetch from the CityTip
     * 
    **/
    select?: CityTipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTipInclude | null
  }



  /**
   * Model CityDocument
   */


  export type AggregateCityDocument = {
    _count: CityDocumentCountAggregateOutputType | null
    _min: CityDocumentMinAggregateOutputType | null
    _max: CityDocumentMaxAggregateOutputType | null
  }

  export type CityDocumentMinAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    exampleUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityDocumentMaxAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    exampleUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityDocumentCountAggregateOutputType = {
    id: number
    cityId: number
    name: number
    exampleUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CityDocumentMinAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    exampleUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityDocumentMaxAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    exampleUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityDocumentCountAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    exampleUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CityDocumentAggregateArgs = {
    /**
     * Filter which CityDocument to aggregate.
     * 
    **/
    where?: CityDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityDocuments to fetch.
     * 
    **/
    orderBy?: Enumerable<CityDocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CityDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityDocuments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityDocuments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CityDocuments
    **/
    _count?: true | CityDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityDocumentMaxAggregateInputType
  }

  export type GetCityDocumentAggregateType<T extends CityDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateCityDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCityDocument[P]>
      : GetScalarType<T[P], AggregateCityDocument[P]>
  }




  export type CityDocumentGroupByArgs = {
    where?: CityDocumentWhereInput
    orderBy?: Enumerable<CityDocumentOrderByWithAggregationInput>
    by: Array<CityDocumentScalarFieldEnum>
    having?: CityDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityDocumentCountAggregateInputType | true
    _min?: CityDocumentMinAggregateInputType
    _max?: CityDocumentMaxAggregateInputType
  }


  export type CityDocumentGroupByOutputType = {
    id: string
    cityId: string
    name: string
    exampleUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CityDocumentCountAggregateOutputType | null
    _min: CityDocumentMinAggregateOutputType | null
    _max: CityDocumentMaxAggregateOutputType | null
  }

  type GetCityDocumentGroupByPayload<T extends CityDocumentGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CityDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], CityDocumentGroupByOutputType[P]>
        }
      >
    >


  export type CityDocumentSelect = {
    id?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    name?: boolean
    exampleUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type CityDocumentInclude = {
    city?: boolean | CityArgs
  } 

  export type CityDocumentGetPayload<S extends boolean | null | undefined | CityDocumentArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CityDocument :
    S extends undefined ? never :
    S extends { include: any } & (CityDocumentArgs | CityDocumentFindManyArgs)
    ? CityDocument  & {
    [P in TrueKeys<S['include']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (CityDocumentArgs | CityDocumentFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof CityDocument ? CityDocument[P] : never
  } 
      : CityDocument


  type CityDocumentCountArgs = Merge<
    Omit<CityDocumentFindManyArgs, 'select' | 'include'> & {
      select?: CityDocumentCountAggregateInputType | true
    }
  >

  export interface CityDocumentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one CityDocument that matches the filter.
     * @param {CityDocumentFindUniqueArgs} args - Arguments to find a CityDocument
     * @example
     * // Get one CityDocument
     * const cityDocument = await prisma.cityDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CityDocumentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CityDocumentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CityDocument'> extends True ? Prisma__CityDocumentClient<CityDocumentGetPayload<T>> : Prisma__CityDocumentClient<CityDocumentGetPayload<T> | null, null>

    /**
     * Find the first CityDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityDocumentFindFirstArgs} args - Arguments to find a CityDocument
     * @example
     * // Get one CityDocument
     * const cityDocument = await prisma.cityDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CityDocumentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CityDocumentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CityDocument'> extends True ? Prisma__CityDocumentClient<CityDocumentGetPayload<T>> : Prisma__CityDocumentClient<CityDocumentGetPayload<T> | null, null>

    /**
     * Find zero or more CityDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityDocumentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CityDocuments
     * const cityDocuments = await prisma.cityDocument.findMany()
     * 
     * // Get first 10 CityDocuments
     * const cityDocuments = await prisma.cityDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityDocumentWithIdOnly = await prisma.cityDocument.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CityDocumentFindManyArgs>(
      args?: SelectSubset<T, CityDocumentFindManyArgs>
    ): PrismaPromise<Array<CityDocumentGetPayload<T>>>

    /**
     * Create a CityDocument.
     * @param {CityDocumentCreateArgs} args - Arguments to create a CityDocument.
     * @example
     * // Create one CityDocument
     * const CityDocument = await prisma.cityDocument.create({
     *   data: {
     *     // ... data to create a CityDocument
     *   }
     * })
     * 
    **/
    create<T extends CityDocumentCreateArgs>(
      args: SelectSubset<T, CityDocumentCreateArgs>
    ): Prisma__CityDocumentClient<CityDocumentGetPayload<T>>

    /**
     * Create many CityDocuments.
     *     @param {CityDocumentCreateManyArgs} args - Arguments to create many CityDocuments.
     *     @example
     *     // Create many CityDocuments
     *     const cityDocument = await prisma.cityDocument.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CityDocumentCreateManyArgs>(
      args?: SelectSubset<T, CityDocumentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CityDocument.
     * @param {CityDocumentDeleteArgs} args - Arguments to delete one CityDocument.
     * @example
     * // Delete one CityDocument
     * const CityDocument = await prisma.cityDocument.delete({
     *   where: {
     *     // ... filter to delete one CityDocument
     *   }
     * })
     * 
    **/
    delete<T extends CityDocumentDeleteArgs>(
      args: SelectSubset<T, CityDocumentDeleteArgs>
    ): Prisma__CityDocumentClient<CityDocumentGetPayload<T>>

    /**
     * Update one CityDocument.
     * @param {CityDocumentUpdateArgs} args - Arguments to update one CityDocument.
     * @example
     * // Update one CityDocument
     * const cityDocument = await prisma.cityDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CityDocumentUpdateArgs>(
      args: SelectSubset<T, CityDocumentUpdateArgs>
    ): Prisma__CityDocumentClient<CityDocumentGetPayload<T>>

    /**
     * Delete zero or more CityDocuments.
     * @param {CityDocumentDeleteManyArgs} args - Arguments to filter CityDocuments to delete.
     * @example
     * // Delete a few CityDocuments
     * const { count } = await prisma.cityDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CityDocumentDeleteManyArgs>(
      args?: SelectSubset<T, CityDocumentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CityDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CityDocuments
     * const cityDocument = await prisma.cityDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CityDocumentUpdateManyArgs>(
      args: SelectSubset<T, CityDocumentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CityDocument.
     * @param {CityDocumentUpsertArgs} args - Arguments to update or create a CityDocument.
     * @example
     * // Update or create a CityDocument
     * const cityDocument = await prisma.cityDocument.upsert({
     *   create: {
     *     // ... data to create a CityDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CityDocument we want to update
     *   }
     * })
    **/
    upsert<T extends CityDocumentUpsertArgs>(
      args: SelectSubset<T, CityDocumentUpsertArgs>
    ): Prisma__CityDocumentClient<CityDocumentGetPayload<T>>

    /**
     * Find one CityDocument that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CityDocumentFindUniqueOrThrowArgs} args - Arguments to find a CityDocument
     * @example
     * // Get one CityDocument
     * const cityDocument = await prisma.cityDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CityDocumentFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CityDocumentFindUniqueOrThrowArgs>
    ): Prisma__CityDocumentClient<CityDocumentGetPayload<T>>

    /**
     * Find the first CityDocument that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityDocumentFindFirstOrThrowArgs} args - Arguments to find a CityDocument
     * @example
     * // Get one CityDocument
     * const cityDocument = await prisma.cityDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CityDocumentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CityDocumentFindFirstOrThrowArgs>
    ): Prisma__CityDocumentClient<CityDocumentGetPayload<T>>

    /**
     * Count the number of CityDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityDocumentCountArgs} args - Arguments to filter CityDocuments to count.
     * @example
     * // Count the number of CityDocuments
     * const count = await prisma.cityDocument.count({
     *   where: {
     *     // ... the filter for the CityDocuments we want to count
     *   }
     * })
    **/
    count<T extends CityDocumentCountArgs>(
      args?: Subset<T, CityDocumentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CityDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityDocumentAggregateArgs>(args: Subset<T, CityDocumentAggregateArgs>): PrismaPromise<GetCityDocumentAggregateType<T>>

    /**
     * Group by CityDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityDocumentGroupByArgs['orderBy'] }
        : { orderBy?: CityDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityDocumentGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for CityDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CityDocumentClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * CityDocument base type for findUnique actions
   */
  export type CityDocumentFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CityDocument
     * 
    **/
    select?: CityDocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityDocumentInclude | null
    /**
     * Filter, which CityDocument to fetch.
     * 
    **/
    where: CityDocumentWhereUniqueInput
  }

  /**
   * CityDocument: findUnique
   */
  export interface CityDocumentFindUniqueArgs extends CityDocumentFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityDocument base type for findFirst actions
   */
  export type CityDocumentFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CityDocument
     * 
    **/
    select?: CityDocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityDocumentInclude | null
    /**
     * Filter, which CityDocument to fetch.
     * 
    **/
    where?: CityDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityDocuments to fetch.
     * 
    **/
    orderBy?: Enumerable<CityDocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CityDocuments.
     * 
    **/
    cursor?: CityDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityDocuments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityDocuments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CityDocuments.
     * 
    **/
    distinct?: Enumerable<CityDocumentScalarFieldEnum>
  }

  /**
   * CityDocument: findFirst
   */
  export interface CityDocumentFindFirstArgs extends CityDocumentFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityDocument findMany
   */
  export type CityDocumentFindManyArgs = {
    /**
     * Select specific fields to fetch from the CityDocument
     * 
    **/
    select?: CityDocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityDocumentInclude | null
    /**
     * Filter, which CityDocuments to fetch.
     * 
    **/
    where?: CityDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityDocuments to fetch.
     * 
    **/
    orderBy?: Enumerable<CityDocumentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CityDocuments.
     * 
    **/
    cursor?: CityDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityDocuments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityDocuments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CityDocumentScalarFieldEnum>
  }


  /**
   * CityDocument create
   */
  export type CityDocumentCreateArgs = {
    /**
     * Select specific fields to fetch from the CityDocument
     * 
    **/
    select?: CityDocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityDocumentInclude | null
    /**
     * The data needed to create a CityDocument.
     * 
    **/
    data: XOR<CityDocumentCreateInput, CityDocumentUncheckedCreateInput>
  }


  /**
   * CityDocument createMany
   */
  export type CityDocumentCreateManyArgs = {
    /**
     * The data used to create many CityDocuments.
     * 
    **/
    data: Enumerable<CityDocumentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CityDocument update
   */
  export type CityDocumentUpdateArgs = {
    /**
     * Select specific fields to fetch from the CityDocument
     * 
    **/
    select?: CityDocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityDocumentInclude | null
    /**
     * The data needed to update a CityDocument.
     * 
    **/
    data: XOR<CityDocumentUpdateInput, CityDocumentUncheckedUpdateInput>
    /**
     * Choose, which CityDocument to update.
     * 
    **/
    where: CityDocumentWhereUniqueInput
  }


  /**
   * CityDocument updateMany
   */
  export type CityDocumentUpdateManyArgs = {
    /**
     * The data used to update CityDocuments.
     * 
    **/
    data: XOR<CityDocumentUpdateManyMutationInput, CityDocumentUncheckedUpdateManyInput>
    /**
     * Filter which CityDocuments to update
     * 
    **/
    where?: CityDocumentWhereInput
  }


  /**
   * CityDocument upsert
   */
  export type CityDocumentUpsertArgs = {
    /**
     * Select specific fields to fetch from the CityDocument
     * 
    **/
    select?: CityDocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityDocumentInclude | null
    /**
     * The filter to search for the CityDocument to update in case it exists.
     * 
    **/
    where: CityDocumentWhereUniqueInput
    /**
     * In case the CityDocument found by the `where` argument doesn't exist, create a new CityDocument with this data.
     * 
    **/
    create: XOR<CityDocumentCreateInput, CityDocumentUncheckedCreateInput>
    /**
     * In case the CityDocument was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CityDocumentUpdateInput, CityDocumentUncheckedUpdateInput>
  }


  /**
   * CityDocument delete
   */
  export type CityDocumentDeleteArgs = {
    /**
     * Select specific fields to fetch from the CityDocument
     * 
    **/
    select?: CityDocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityDocumentInclude | null
    /**
     * Filter which CityDocument to delete.
     * 
    **/
    where: CityDocumentWhereUniqueInput
  }


  /**
   * CityDocument deleteMany
   */
  export type CityDocumentDeleteManyArgs = {
    /**
     * Filter which CityDocuments to delete
     * 
    **/
    where?: CityDocumentWhereInput
  }


  /**
   * CityDocument: findUniqueOrThrow
   */
  export type CityDocumentFindUniqueOrThrowArgs = CityDocumentFindUniqueArgsBase
      

  /**
   * CityDocument: findFirstOrThrow
   */
  export type CityDocumentFindFirstOrThrowArgs = CityDocumentFindFirstArgsBase
      

  /**
   * CityDocument without action
   */
  export type CityDocumentArgs = {
    /**
     * Select specific fields to fetch from the CityDocument
     * 
    **/
    select?: CityDocumentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityDocumentInclude | null
  }



  /**
   * Model CityRecommendedItem
   */


  export type AggregateCityRecommendedItem = {
    _count: CityRecommendedItemCountAggregateOutputType | null
    _min: CityRecommendedItemMinAggregateOutputType | null
    _max: CityRecommendedItemMaxAggregateOutputType | null
  }

  export type CityRecommendedItemMinAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityRecommendedItemMaxAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityRecommendedItemCountAggregateOutputType = {
    id: number
    cityId: number
    name: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CityRecommendedItemMinAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityRecommendedItemMaxAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityRecommendedItemCountAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CityRecommendedItemAggregateArgs = {
    /**
     * Filter which CityRecommendedItem to aggregate.
     * 
    **/
    where?: CityRecommendedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityRecommendedItems to fetch.
     * 
    **/
    orderBy?: Enumerable<CityRecommendedItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CityRecommendedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityRecommendedItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityRecommendedItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CityRecommendedItems
    **/
    _count?: true | CityRecommendedItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityRecommendedItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityRecommendedItemMaxAggregateInputType
  }

  export type GetCityRecommendedItemAggregateType<T extends CityRecommendedItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCityRecommendedItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCityRecommendedItem[P]>
      : GetScalarType<T[P], AggregateCityRecommendedItem[P]>
  }




  export type CityRecommendedItemGroupByArgs = {
    where?: CityRecommendedItemWhereInput
    orderBy?: Enumerable<CityRecommendedItemOrderByWithAggregationInput>
    by: Array<CityRecommendedItemScalarFieldEnum>
    having?: CityRecommendedItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityRecommendedItemCountAggregateInputType | true
    _min?: CityRecommendedItemMinAggregateInputType
    _max?: CityRecommendedItemMaxAggregateInputType
  }


  export type CityRecommendedItemGroupByOutputType = {
    id: string
    cityId: string
    name: string
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CityRecommendedItemCountAggregateOutputType | null
    _min: CityRecommendedItemMinAggregateOutputType | null
    _max: CityRecommendedItemMaxAggregateOutputType | null
  }

  type GetCityRecommendedItemGroupByPayload<T extends CityRecommendedItemGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CityRecommendedItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityRecommendedItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityRecommendedItemGroupByOutputType[P]>
            : GetScalarType<T[P], CityRecommendedItemGroupByOutputType[P]>
        }
      >
    >


  export type CityRecommendedItemSelect = {
    id?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    name?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type CityRecommendedItemInclude = {
    city?: boolean | CityArgs
  } 

  export type CityRecommendedItemGetPayload<S extends boolean | null | undefined | CityRecommendedItemArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CityRecommendedItem :
    S extends undefined ? never :
    S extends { include: any } & (CityRecommendedItemArgs | CityRecommendedItemFindManyArgs)
    ? CityRecommendedItem  & {
    [P in TrueKeys<S['include']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (CityRecommendedItemArgs | CityRecommendedItemFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof CityRecommendedItem ? CityRecommendedItem[P] : never
  } 
      : CityRecommendedItem


  type CityRecommendedItemCountArgs = Merge<
    Omit<CityRecommendedItemFindManyArgs, 'select' | 'include'> & {
      select?: CityRecommendedItemCountAggregateInputType | true
    }
  >

  export interface CityRecommendedItemDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one CityRecommendedItem that matches the filter.
     * @param {CityRecommendedItemFindUniqueArgs} args - Arguments to find a CityRecommendedItem
     * @example
     * // Get one CityRecommendedItem
     * const cityRecommendedItem = await prisma.cityRecommendedItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CityRecommendedItemFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CityRecommendedItemFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CityRecommendedItem'> extends True ? Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T>> : Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T> | null, null>

    /**
     * Find the first CityRecommendedItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityRecommendedItemFindFirstArgs} args - Arguments to find a CityRecommendedItem
     * @example
     * // Get one CityRecommendedItem
     * const cityRecommendedItem = await prisma.cityRecommendedItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CityRecommendedItemFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CityRecommendedItemFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CityRecommendedItem'> extends True ? Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T>> : Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T> | null, null>

    /**
     * Find zero or more CityRecommendedItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityRecommendedItemFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CityRecommendedItems
     * const cityRecommendedItems = await prisma.cityRecommendedItem.findMany()
     * 
     * // Get first 10 CityRecommendedItems
     * const cityRecommendedItems = await prisma.cityRecommendedItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityRecommendedItemWithIdOnly = await prisma.cityRecommendedItem.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CityRecommendedItemFindManyArgs>(
      args?: SelectSubset<T, CityRecommendedItemFindManyArgs>
    ): PrismaPromise<Array<CityRecommendedItemGetPayload<T>>>

    /**
     * Create a CityRecommendedItem.
     * @param {CityRecommendedItemCreateArgs} args - Arguments to create a CityRecommendedItem.
     * @example
     * // Create one CityRecommendedItem
     * const CityRecommendedItem = await prisma.cityRecommendedItem.create({
     *   data: {
     *     // ... data to create a CityRecommendedItem
     *   }
     * })
     * 
    **/
    create<T extends CityRecommendedItemCreateArgs>(
      args: SelectSubset<T, CityRecommendedItemCreateArgs>
    ): Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T>>

    /**
     * Create many CityRecommendedItems.
     *     @param {CityRecommendedItemCreateManyArgs} args - Arguments to create many CityRecommendedItems.
     *     @example
     *     // Create many CityRecommendedItems
     *     const cityRecommendedItem = await prisma.cityRecommendedItem.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CityRecommendedItemCreateManyArgs>(
      args?: SelectSubset<T, CityRecommendedItemCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CityRecommendedItem.
     * @param {CityRecommendedItemDeleteArgs} args - Arguments to delete one CityRecommendedItem.
     * @example
     * // Delete one CityRecommendedItem
     * const CityRecommendedItem = await prisma.cityRecommendedItem.delete({
     *   where: {
     *     // ... filter to delete one CityRecommendedItem
     *   }
     * })
     * 
    **/
    delete<T extends CityRecommendedItemDeleteArgs>(
      args: SelectSubset<T, CityRecommendedItemDeleteArgs>
    ): Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T>>

    /**
     * Update one CityRecommendedItem.
     * @param {CityRecommendedItemUpdateArgs} args - Arguments to update one CityRecommendedItem.
     * @example
     * // Update one CityRecommendedItem
     * const cityRecommendedItem = await prisma.cityRecommendedItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CityRecommendedItemUpdateArgs>(
      args: SelectSubset<T, CityRecommendedItemUpdateArgs>
    ): Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T>>

    /**
     * Delete zero or more CityRecommendedItems.
     * @param {CityRecommendedItemDeleteManyArgs} args - Arguments to filter CityRecommendedItems to delete.
     * @example
     * // Delete a few CityRecommendedItems
     * const { count } = await prisma.cityRecommendedItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CityRecommendedItemDeleteManyArgs>(
      args?: SelectSubset<T, CityRecommendedItemDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CityRecommendedItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityRecommendedItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CityRecommendedItems
     * const cityRecommendedItem = await prisma.cityRecommendedItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CityRecommendedItemUpdateManyArgs>(
      args: SelectSubset<T, CityRecommendedItemUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CityRecommendedItem.
     * @param {CityRecommendedItemUpsertArgs} args - Arguments to update or create a CityRecommendedItem.
     * @example
     * // Update or create a CityRecommendedItem
     * const cityRecommendedItem = await prisma.cityRecommendedItem.upsert({
     *   create: {
     *     // ... data to create a CityRecommendedItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CityRecommendedItem we want to update
     *   }
     * })
    **/
    upsert<T extends CityRecommendedItemUpsertArgs>(
      args: SelectSubset<T, CityRecommendedItemUpsertArgs>
    ): Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T>>

    /**
     * Find one CityRecommendedItem that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CityRecommendedItemFindUniqueOrThrowArgs} args - Arguments to find a CityRecommendedItem
     * @example
     * // Get one CityRecommendedItem
     * const cityRecommendedItem = await prisma.cityRecommendedItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CityRecommendedItemFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CityRecommendedItemFindUniqueOrThrowArgs>
    ): Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T>>

    /**
     * Find the first CityRecommendedItem that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityRecommendedItemFindFirstOrThrowArgs} args - Arguments to find a CityRecommendedItem
     * @example
     * // Get one CityRecommendedItem
     * const cityRecommendedItem = await prisma.cityRecommendedItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CityRecommendedItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CityRecommendedItemFindFirstOrThrowArgs>
    ): Prisma__CityRecommendedItemClient<CityRecommendedItemGetPayload<T>>

    /**
     * Count the number of CityRecommendedItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityRecommendedItemCountArgs} args - Arguments to filter CityRecommendedItems to count.
     * @example
     * // Count the number of CityRecommendedItems
     * const count = await prisma.cityRecommendedItem.count({
     *   where: {
     *     // ... the filter for the CityRecommendedItems we want to count
     *   }
     * })
    **/
    count<T extends CityRecommendedItemCountArgs>(
      args?: Subset<T, CityRecommendedItemCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityRecommendedItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CityRecommendedItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityRecommendedItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityRecommendedItemAggregateArgs>(args: Subset<T, CityRecommendedItemAggregateArgs>): PrismaPromise<GetCityRecommendedItemAggregateType<T>>

    /**
     * Group by CityRecommendedItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityRecommendedItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityRecommendedItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityRecommendedItemGroupByArgs['orderBy'] }
        : { orderBy?: CityRecommendedItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityRecommendedItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityRecommendedItemGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for CityRecommendedItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CityRecommendedItemClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * CityRecommendedItem base type for findUnique actions
   */
  export type CityRecommendedItemFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CityRecommendedItem
     * 
    **/
    select?: CityRecommendedItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityRecommendedItemInclude | null
    /**
     * Filter, which CityRecommendedItem to fetch.
     * 
    **/
    where: CityRecommendedItemWhereUniqueInput
  }

  /**
   * CityRecommendedItem: findUnique
   */
  export interface CityRecommendedItemFindUniqueArgs extends CityRecommendedItemFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityRecommendedItem base type for findFirst actions
   */
  export type CityRecommendedItemFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CityRecommendedItem
     * 
    **/
    select?: CityRecommendedItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityRecommendedItemInclude | null
    /**
     * Filter, which CityRecommendedItem to fetch.
     * 
    **/
    where?: CityRecommendedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityRecommendedItems to fetch.
     * 
    **/
    orderBy?: Enumerable<CityRecommendedItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CityRecommendedItems.
     * 
    **/
    cursor?: CityRecommendedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityRecommendedItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityRecommendedItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CityRecommendedItems.
     * 
    **/
    distinct?: Enumerable<CityRecommendedItemScalarFieldEnum>
  }

  /**
   * CityRecommendedItem: findFirst
   */
  export interface CityRecommendedItemFindFirstArgs extends CityRecommendedItemFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityRecommendedItem findMany
   */
  export type CityRecommendedItemFindManyArgs = {
    /**
     * Select specific fields to fetch from the CityRecommendedItem
     * 
    **/
    select?: CityRecommendedItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityRecommendedItemInclude | null
    /**
     * Filter, which CityRecommendedItems to fetch.
     * 
    **/
    where?: CityRecommendedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityRecommendedItems to fetch.
     * 
    **/
    orderBy?: Enumerable<CityRecommendedItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CityRecommendedItems.
     * 
    **/
    cursor?: CityRecommendedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityRecommendedItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityRecommendedItems.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CityRecommendedItemScalarFieldEnum>
  }


  /**
   * CityRecommendedItem create
   */
  export type CityRecommendedItemCreateArgs = {
    /**
     * Select specific fields to fetch from the CityRecommendedItem
     * 
    **/
    select?: CityRecommendedItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityRecommendedItemInclude | null
    /**
     * The data needed to create a CityRecommendedItem.
     * 
    **/
    data: XOR<CityRecommendedItemCreateInput, CityRecommendedItemUncheckedCreateInput>
  }


  /**
   * CityRecommendedItem createMany
   */
  export type CityRecommendedItemCreateManyArgs = {
    /**
     * The data used to create many CityRecommendedItems.
     * 
    **/
    data: Enumerable<CityRecommendedItemCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CityRecommendedItem update
   */
  export type CityRecommendedItemUpdateArgs = {
    /**
     * Select specific fields to fetch from the CityRecommendedItem
     * 
    **/
    select?: CityRecommendedItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityRecommendedItemInclude | null
    /**
     * The data needed to update a CityRecommendedItem.
     * 
    **/
    data: XOR<CityRecommendedItemUpdateInput, CityRecommendedItemUncheckedUpdateInput>
    /**
     * Choose, which CityRecommendedItem to update.
     * 
    **/
    where: CityRecommendedItemWhereUniqueInput
  }


  /**
   * CityRecommendedItem updateMany
   */
  export type CityRecommendedItemUpdateManyArgs = {
    /**
     * The data used to update CityRecommendedItems.
     * 
    **/
    data: XOR<CityRecommendedItemUpdateManyMutationInput, CityRecommendedItemUncheckedUpdateManyInput>
    /**
     * Filter which CityRecommendedItems to update
     * 
    **/
    where?: CityRecommendedItemWhereInput
  }


  /**
   * CityRecommendedItem upsert
   */
  export type CityRecommendedItemUpsertArgs = {
    /**
     * Select specific fields to fetch from the CityRecommendedItem
     * 
    **/
    select?: CityRecommendedItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityRecommendedItemInclude | null
    /**
     * The filter to search for the CityRecommendedItem to update in case it exists.
     * 
    **/
    where: CityRecommendedItemWhereUniqueInput
    /**
     * In case the CityRecommendedItem found by the `where` argument doesn't exist, create a new CityRecommendedItem with this data.
     * 
    **/
    create: XOR<CityRecommendedItemCreateInput, CityRecommendedItemUncheckedCreateInput>
    /**
     * In case the CityRecommendedItem was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CityRecommendedItemUpdateInput, CityRecommendedItemUncheckedUpdateInput>
  }


  /**
   * CityRecommendedItem delete
   */
  export type CityRecommendedItemDeleteArgs = {
    /**
     * Select specific fields to fetch from the CityRecommendedItem
     * 
    **/
    select?: CityRecommendedItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityRecommendedItemInclude | null
    /**
     * Filter which CityRecommendedItem to delete.
     * 
    **/
    where: CityRecommendedItemWhereUniqueInput
  }


  /**
   * CityRecommendedItem deleteMany
   */
  export type CityRecommendedItemDeleteManyArgs = {
    /**
     * Filter which CityRecommendedItems to delete
     * 
    **/
    where?: CityRecommendedItemWhereInput
  }


  /**
   * CityRecommendedItem: findUniqueOrThrow
   */
  export type CityRecommendedItemFindUniqueOrThrowArgs = CityRecommendedItemFindUniqueArgsBase
      

  /**
   * CityRecommendedItem: findFirstOrThrow
   */
  export type CityRecommendedItemFindFirstOrThrowArgs = CityRecommendedItemFindFirstArgsBase
      

  /**
   * CityRecommendedItem without action
   */
  export type CityRecommendedItemArgs = {
    /**
     * Select specific fields to fetch from the CityRecommendedItem
     * 
    **/
    select?: CityRecommendedItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityRecommendedItemInclude | null
  }



  /**
   * Model CityEvent
   */


  export type AggregateCityEvent = {
    _count: CityEventCountAggregateOutputType | null
    _avg: CityEventAvgAggregateOutputType | null
    _sum: CityEventSumAggregateOutputType | null
    _min: CityEventMinAggregateOutputType | null
    _max: CityEventMaxAggregateOutputType | null
  }

  export type CityEventAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type CityEventSumAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type CityEventMinAggregateOutputType = {
    id: string | null
    cityId: string | null
    title: string | null
    description: string | null
    date: string | null
    location: string | null
    lat: number | null
    lng: number | null
    imageUrl: string | null
    bookingUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityEventMaxAggregateOutputType = {
    id: string | null
    cityId: string | null
    title: string | null
    description: string | null
    date: string | null
    location: string | null
    lat: number | null
    lng: number | null
    imageUrl: string | null
    bookingUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityEventCountAggregateOutputType = {
    id: number
    cityId: number
    title: number
    description: number
    date: number
    location: number
    lat: number
    lng: number
    imageUrl: number
    bookingUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CityEventAvgAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type CityEventSumAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type CityEventMinAggregateInputType = {
    id?: true
    cityId?: true
    title?: true
    description?: true
    date?: true
    location?: true
    lat?: true
    lng?: true
    imageUrl?: true
    bookingUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityEventMaxAggregateInputType = {
    id?: true
    cityId?: true
    title?: true
    description?: true
    date?: true
    location?: true
    lat?: true
    lng?: true
    imageUrl?: true
    bookingUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityEventCountAggregateInputType = {
    id?: true
    cityId?: true
    title?: true
    description?: true
    date?: true
    location?: true
    lat?: true
    lng?: true
    imageUrl?: true
    bookingUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CityEventAggregateArgs = {
    /**
     * Filter which CityEvent to aggregate.
     * 
    **/
    where?: CityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<CityEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityEvents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CityEvents
    **/
    _count?: true | CityEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CityEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CityEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityEventMaxAggregateInputType
  }

  export type GetCityEventAggregateType<T extends CityEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCityEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCityEvent[P]>
      : GetScalarType<T[P], AggregateCityEvent[P]>
  }




  export type CityEventGroupByArgs = {
    where?: CityEventWhereInput
    orderBy?: Enumerable<CityEventOrderByWithAggregationInput>
    by: Array<CityEventScalarFieldEnum>
    having?: CityEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityEventCountAggregateInputType | true
    _avg?: CityEventAvgAggregateInputType
    _sum?: CityEventSumAggregateInputType
    _min?: CityEventMinAggregateInputType
    _max?: CityEventMaxAggregateInputType
  }


  export type CityEventGroupByOutputType = {
    id: string
    cityId: string
    title: string
    description: string
    date: string
    location: string
    lat: number
    lng: number
    imageUrl: string | null
    bookingUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CityEventCountAggregateOutputType | null
    _avg: CityEventAvgAggregateOutputType | null
    _sum: CityEventSumAggregateOutputType | null
    _min: CityEventMinAggregateOutputType | null
    _max: CityEventMaxAggregateOutputType | null
  }

  type GetCityEventGroupByPayload<T extends CityEventGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CityEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityEventGroupByOutputType[P]>
            : GetScalarType<T[P], CityEventGroupByOutputType[P]>
        }
      >
    >


  export type CityEventSelect = {
    id?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    title?: boolean
    description?: boolean
    date?: boolean
    location?: boolean
    lat?: boolean
    lng?: boolean
    imageUrl?: boolean
    bookingUrl?: boolean
    tripItems?: boolean | TripItemFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | CityEventCountOutputTypeArgs
  }


  export type CityEventInclude = {
    city?: boolean | CityArgs
    tripItems?: boolean | TripItemFindManyArgs
    _count?: boolean | CityEventCountOutputTypeArgs
  } 

  export type CityEventGetPayload<S extends boolean | null | undefined | CityEventArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CityEvent :
    S extends undefined ? never :
    S extends { include: any } & (CityEventArgs | CityEventFindManyArgs)
    ? CityEvent  & {
    [P in TrueKeys<S['include']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'tripItems' ? Array < TripItemGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? CityEventCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (CityEventArgs | CityEventFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'tripItems' ? Array < TripItemGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? CityEventCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof CityEvent ? CityEvent[P] : never
  } 
      : CityEvent


  type CityEventCountArgs = Merge<
    Omit<CityEventFindManyArgs, 'select' | 'include'> & {
      select?: CityEventCountAggregateInputType | true
    }
  >

  export interface CityEventDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one CityEvent that matches the filter.
     * @param {CityEventFindUniqueArgs} args - Arguments to find a CityEvent
     * @example
     * // Get one CityEvent
     * const cityEvent = await prisma.cityEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CityEventFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CityEventFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CityEvent'> extends True ? Prisma__CityEventClient<CityEventGetPayload<T>> : Prisma__CityEventClient<CityEventGetPayload<T> | null, null>

    /**
     * Find the first CityEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityEventFindFirstArgs} args - Arguments to find a CityEvent
     * @example
     * // Get one CityEvent
     * const cityEvent = await prisma.cityEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CityEventFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CityEventFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CityEvent'> extends True ? Prisma__CityEventClient<CityEventGetPayload<T>> : Prisma__CityEventClient<CityEventGetPayload<T> | null, null>

    /**
     * Find zero or more CityEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityEventFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CityEvents
     * const cityEvents = await prisma.cityEvent.findMany()
     * 
     * // Get first 10 CityEvents
     * const cityEvents = await prisma.cityEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityEventWithIdOnly = await prisma.cityEvent.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CityEventFindManyArgs>(
      args?: SelectSubset<T, CityEventFindManyArgs>
    ): PrismaPromise<Array<CityEventGetPayload<T>>>

    /**
     * Create a CityEvent.
     * @param {CityEventCreateArgs} args - Arguments to create a CityEvent.
     * @example
     * // Create one CityEvent
     * const CityEvent = await prisma.cityEvent.create({
     *   data: {
     *     // ... data to create a CityEvent
     *   }
     * })
     * 
    **/
    create<T extends CityEventCreateArgs>(
      args: SelectSubset<T, CityEventCreateArgs>
    ): Prisma__CityEventClient<CityEventGetPayload<T>>

    /**
     * Create many CityEvents.
     *     @param {CityEventCreateManyArgs} args - Arguments to create many CityEvents.
     *     @example
     *     // Create many CityEvents
     *     const cityEvent = await prisma.cityEvent.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CityEventCreateManyArgs>(
      args?: SelectSubset<T, CityEventCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CityEvent.
     * @param {CityEventDeleteArgs} args - Arguments to delete one CityEvent.
     * @example
     * // Delete one CityEvent
     * const CityEvent = await prisma.cityEvent.delete({
     *   where: {
     *     // ... filter to delete one CityEvent
     *   }
     * })
     * 
    **/
    delete<T extends CityEventDeleteArgs>(
      args: SelectSubset<T, CityEventDeleteArgs>
    ): Prisma__CityEventClient<CityEventGetPayload<T>>

    /**
     * Update one CityEvent.
     * @param {CityEventUpdateArgs} args - Arguments to update one CityEvent.
     * @example
     * // Update one CityEvent
     * const cityEvent = await prisma.cityEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CityEventUpdateArgs>(
      args: SelectSubset<T, CityEventUpdateArgs>
    ): Prisma__CityEventClient<CityEventGetPayload<T>>

    /**
     * Delete zero or more CityEvents.
     * @param {CityEventDeleteManyArgs} args - Arguments to filter CityEvents to delete.
     * @example
     * // Delete a few CityEvents
     * const { count } = await prisma.cityEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CityEventDeleteManyArgs>(
      args?: SelectSubset<T, CityEventDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CityEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CityEvents
     * const cityEvent = await prisma.cityEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CityEventUpdateManyArgs>(
      args: SelectSubset<T, CityEventUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CityEvent.
     * @param {CityEventUpsertArgs} args - Arguments to update or create a CityEvent.
     * @example
     * // Update or create a CityEvent
     * const cityEvent = await prisma.cityEvent.upsert({
     *   create: {
     *     // ... data to create a CityEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CityEvent we want to update
     *   }
     * })
    **/
    upsert<T extends CityEventUpsertArgs>(
      args: SelectSubset<T, CityEventUpsertArgs>
    ): Prisma__CityEventClient<CityEventGetPayload<T>>

    /**
     * Find one CityEvent that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CityEventFindUniqueOrThrowArgs} args - Arguments to find a CityEvent
     * @example
     * // Get one CityEvent
     * const cityEvent = await prisma.cityEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CityEventFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CityEventFindUniqueOrThrowArgs>
    ): Prisma__CityEventClient<CityEventGetPayload<T>>

    /**
     * Find the first CityEvent that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityEventFindFirstOrThrowArgs} args - Arguments to find a CityEvent
     * @example
     * // Get one CityEvent
     * const cityEvent = await prisma.cityEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CityEventFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CityEventFindFirstOrThrowArgs>
    ): Prisma__CityEventClient<CityEventGetPayload<T>>

    /**
     * Count the number of CityEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityEventCountArgs} args - Arguments to filter CityEvents to count.
     * @example
     * // Count the number of CityEvents
     * const count = await prisma.cityEvent.count({
     *   where: {
     *     // ... the filter for the CityEvents we want to count
     *   }
     * })
    **/
    count<T extends CityEventCountArgs>(
      args?: Subset<T, CityEventCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CityEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityEventAggregateArgs>(args: Subset<T, CityEventAggregateArgs>): PrismaPromise<GetCityEventAggregateType<T>>

    /**
     * Group by CityEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityEventGroupByArgs['orderBy'] }
        : { orderBy?: CityEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityEventGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for CityEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CityEventClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    tripItems<T extends TripItemFindManyArgs= {}>(args?: Subset<T, TripItemFindManyArgs>): PrismaPromise<Array<TripItemGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * CityEvent base type for findUnique actions
   */
  export type CityEventFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CityEvent
     * 
    **/
    select?: CityEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityEventInclude | null
    /**
     * Filter, which CityEvent to fetch.
     * 
    **/
    where: CityEventWhereUniqueInput
  }

  /**
   * CityEvent: findUnique
   */
  export interface CityEventFindUniqueArgs extends CityEventFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityEvent base type for findFirst actions
   */
  export type CityEventFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CityEvent
     * 
    **/
    select?: CityEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityEventInclude | null
    /**
     * Filter, which CityEvent to fetch.
     * 
    **/
    where?: CityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<CityEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CityEvents.
     * 
    **/
    cursor?: CityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityEvents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CityEvents.
     * 
    **/
    distinct?: Enumerable<CityEventScalarFieldEnum>
  }

  /**
   * CityEvent: findFirst
   */
  export interface CityEventFindFirstArgs extends CityEventFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityEvent findMany
   */
  export type CityEventFindManyArgs = {
    /**
     * Select specific fields to fetch from the CityEvent
     * 
    **/
    select?: CityEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityEventInclude | null
    /**
     * Filter, which CityEvents to fetch.
     * 
    **/
    where?: CityEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<CityEventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CityEvents.
     * 
    **/
    cursor?: CityEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityEvents.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CityEventScalarFieldEnum>
  }


  /**
   * CityEvent create
   */
  export type CityEventCreateArgs = {
    /**
     * Select specific fields to fetch from the CityEvent
     * 
    **/
    select?: CityEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityEventInclude | null
    /**
     * The data needed to create a CityEvent.
     * 
    **/
    data: XOR<CityEventCreateInput, CityEventUncheckedCreateInput>
  }


  /**
   * CityEvent createMany
   */
  export type CityEventCreateManyArgs = {
    /**
     * The data used to create many CityEvents.
     * 
    **/
    data: Enumerable<CityEventCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CityEvent update
   */
  export type CityEventUpdateArgs = {
    /**
     * Select specific fields to fetch from the CityEvent
     * 
    **/
    select?: CityEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityEventInclude | null
    /**
     * The data needed to update a CityEvent.
     * 
    **/
    data: XOR<CityEventUpdateInput, CityEventUncheckedUpdateInput>
    /**
     * Choose, which CityEvent to update.
     * 
    **/
    where: CityEventWhereUniqueInput
  }


  /**
   * CityEvent updateMany
   */
  export type CityEventUpdateManyArgs = {
    /**
     * The data used to update CityEvents.
     * 
    **/
    data: XOR<CityEventUpdateManyMutationInput, CityEventUncheckedUpdateManyInput>
    /**
     * Filter which CityEvents to update
     * 
    **/
    where?: CityEventWhereInput
  }


  /**
   * CityEvent upsert
   */
  export type CityEventUpsertArgs = {
    /**
     * Select specific fields to fetch from the CityEvent
     * 
    **/
    select?: CityEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityEventInclude | null
    /**
     * The filter to search for the CityEvent to update in case it exists.
     * 
    **/
    where: CityEventWhereUniqueInput
    /**
     * In case the CityEvent found by the `where` argument doesn't exist, create a new CityEvent with this data.
     * 
    **/
    create: XOR<CityEventCreateInput, CityEventUncheckedCreateInput>
    /**
     * In case the CityEvent was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CityEventUpdateInput, CityEventUncheckedUpdateInput>
  }


  /**
   * CityEvent delete
   */
  export type CityEventDeleteArgs = {
    /**
     * Select specific fields to fetch from the CityEvent
     * 
    **/
    select?: CityEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityEventInclude | null
    /**
     * Filter which CityEvent to delete.
     * 
    **/
    where: CityEventWhereUniqueInput
  }


  /**
   * CityEvent deleteMany
   */
  export type CityEventDeleteManyArgs = {
    /**
     * Filter which CityEvents to delete
     * 
    **/
    where?: CityEventWhereInput
  }


  /**
   * CityEvent: findUniqueOrThrow
   */
  export type CityEventFindUniqueOrThrowArgs = CityEventFindUniqueArgsBase
      

  /**
   * CityEvent: findFirstOrThrow
   */
  export type CityEventFindFirstOrThrowArgs = CityEventFindFirstArgsBase
      

  /**
   * CityEvent without action
   */
  export type CityEventArgs = {
    /**
     * Select specific fields to fetch from the CityEvent
     * 
    **/
    select?: CityEventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityEventInclude | null
  }



  /**
   * Model CityCar
   */


  export type AggregateCityCar = {
    _count: CityCarCountAggregateOutputType | null
    _avg: CityCarAvgAggregateOutputType | null
    _sum: CityCarSumAggregateOutputType | null
    _min: CityCarMinAggregateOutputType | null
    _max: CityCarMaxAggregateOutputType | null
  }

  export type CityCarAvgAggregateOutputType = {
    pricePerDay: number | null
  }

  export type CityCarSumAggregateOutputType = {
    pricePerDay: number | null
  }

  export type CityCarMinAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    type: string | null
    pricePerDay: number | null
    transmission: string | null
    fuel: string | null
    contactInfo: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityCarMaxAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    type: string | null
    pricePerDay: number | null
    transmission: string | null
    fuel: string | null
    contactInfo: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityCarCountAggregateOutputType = {
    id: number
    cityId: number
    name: number
    type: number
    pricePerDay: number
    transmission: number
    fuel: number
    contactInfo: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CityCarAvgAggregateInputType = {
    pricePerDay?: true
  }

  export type CityCarSumAggregateInputType = {
    pricePerDay?: true
  }

  export type CityCarMinAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    type?: true
    pricePerDay?: true
    transmission?: true
    fuel?: true
    contactInfo?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityCarMaxAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    type?: true
    pricePerDay?: true
    transmission?: true
    fuel?: true
    contactInfo?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityCarCountAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    type?: true
    pricePerDay?: true
    transmission?: true
    fuel?: true
    contactInfo?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CityCarAggregateArgs = {
    /**
     * Filter which CityCar to aggregate.
     * 
    **/
    where?: CityCarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityCars to fetch.
     * 
    **/
    orderBy?: Enumerable<CityCarOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CityCarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityCars from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityCars.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CityCars
    **/
    _count?: true | CityCarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CityCarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CityCarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityCarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityCarMaxAggregateInputType
  }

  export type GetCityCarAggregateType<T extends CityCarAggregateArgs> = {
        [P in keyof T & keyof AggregateCityCar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCityCar[P]>
      : GetScalarType<T[P], AggregateCityCar[P]>
  }




  export type CityCarGroupByArgs = {
    where?: CityCarWhereInput
    orderBy?: Enumerable<CityCarOrderByWithAggregationInput>
    by: Array<CityCarScalarFieldEnum>
    having?: CityCarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityCarCountAggregateInputType | true
    _avg?: CityCarAvgAggregateInputType
    _sum?: CityCarSumAggregateInputType
    _min?: CityCarMinAggregateInputType
    _max?: CityCarMaxAggregateInputType
  }


  export type CityCarGroupByOutputType = {
    id: string
    cityId: string
    name: string
    type: string
    pricePerDay: number
    transmission: string
    fuel: string
    contactInfo: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CityCarCountAggregateOutputType | null
    _avg: CityCarAvgAggregateOutputType | null
    _sum: CityCarSumAggregateOutputType | null
    _min: CityCarMinAggregateOutputType | null
    _max: CityCarMaxAggregateOutputType | null
  }

  type GetCityCarGroupByPayload<T extends CityCarGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CityCarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityCarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityCarGroupByOutputType[P]>
            : GetScalarType<T[P], CityCarGroupByOutputType[P]>
        }
      >
    >


  export type CityCarSelect = {
    id?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    name?: boolean
    type?: boolean
    pricePerDay?: boolean
    transmission?: boolean
    fuel?: boolean
    contactInfo?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type CityCarInclude = {
    city?: boolean | CityArgs
  } 

  export type CityCarGetPayload<S extends boolean | null | undefined | CityCarArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CityCar :
    S extends undefined ? never :
    S extends { include: any } & (CityCarArgs | CityCarFindManyArgs)
    ? CityCar  & {
    [P in TrueKeys<S['include']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (CityCarArgs | CityCarFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof CityCar ? CityCar[P] : never
  } 
      : CityCar


  type CityCarCountArgs = Merge<
    Omit<CityCarFindManyArgs, 'select' | 'include'> & {
      select?: CityCarCountAggregateInputType | true
    }
  >

  export interface CityCarDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one CityCar that matches the filter.
     * @param {CityCarFindUniqueArgs} args - Arguments to find a CityCar
     * @example
     * // Get one CityCar
     * const cityCar = await prisma.cityCar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CityCarFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CityCarFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CityCar'> extends True ? Prisma__CityCarClient<CityCarGetPayload<T>> : Prisma__CityCarClient<CityCarGetPayload<T> | null, null>

    /**
     * Find the first CityCar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCarFindFirstArgs} args - Arguments to find a CityCar
     * @example
     * // Get one CityCar
     * const cityCar = await prisma.cityCar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CityCarFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CityCarFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CityCar'> extends True ? Prisma__CityCarClient<CityCarGetPayload<T>> : Prisma__CityCarClient<CityCarGetPayload<T> | null, null>

    /**
     * Find zero or more CityCars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCarFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CityCars
     * const cityCars = await prisma.cityCar.findMany()
     * 
     * // Get first 10 CityCars
     * const cityCars = await prisma.cityCar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityCarWithIdOnly = await prisma.cityCar.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CityCarFindManyArgs>(
      args?: SelectSubset<T, CityCarFindManyArgs>
    ): PrismaPromise<Array<CityCarGetPayload<T>>>

    /**
     * Create a CityCar.
     * @param {CityCarCreateArgs} args - Arguments to create a CityCar.
     * @example
     * // Create one CityCar
     * const CityCar = await prisma.cityCar.create({
     *   data: {
     *     // ... data to create a CityCar
     *   }
     * })
     * 
    **/
    create<T extends CityCarCreateArgs>(
      args: SelectSubset<T, CityCarCreateArgs>
    ): Prisma__CityCarClient<CityCarGetPayload<T>>

    /**
     * Create many CityCars.
     *     @param {CityCarCreateManyArgs} args - Arguments to create many CityCars.
     *     @example
     *     // Create many CityCars
     *     const cityCar = await prisma.cityCar.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CityCarCreateManyArgs>(
      args?: SelectSubset<T, CityCarCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CityCar.
     * @param {CityCarDeleteArgs} args - Arguments to delete one CityCar.
     * @example
     * // Delete one CityCar
     * const CityCar = await prisma.cityCar.delete({
     *   where: {
     *     // ... filter to delete one CityCar
     *   }
     * })
     * 
    **/
    delete<T extends CityCarDeleteArgs>(
      args: SelectSubset<T, CityCarDeleteArgs>
    ): Prisma__CityCarClient<CityCarGetPayload<T>>

    /**
     * Update one CityCar.
     * @param {CityCarUpdateArgs} args - Arguments to update one CityCar.
     * @example
     * // Update one CityCar
     * const cityCar = await prisma.cityCar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CityCarUpdateArgs>(
      args: SelectSubset<T, CityCarUpdateArgs>
    ): Prisma__CityCarClient<CityCarGetPayload<T>>

    /**
     * Delete zero or more CityCars.
     * @param {CityCarDeleteManyArgs} args - Arguments to filter CityCars to delete.
     * @example
     * // Delete a few CityCars
     * const { count } = await prisma.cityCar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CityCarDeleteManyArgs>(
      args?: SelectSubset<T, CityCarDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CityCars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CityCars
     * const cityCar = await prisma.cityCar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CityCarUpdateManyArgs>(
      args: SelectSubset<T, CityCarUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CityCar.
     * @param {CityCarUpsertArgs} args - Arguments to update or create a CityCar.
     * @example
     * // Update or create a CityCar
     * const cityCar = await prisma.cityCar.upsert({
     *   create: {
     *     // ... data to create a CityCar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CityCar we want to update
     *   }
     * })
    **/
    upsert<T extends CityCarUpsertArgs>(
      args: SelectSubset<T, CityCarUpsertArgs>
    ): Prisma__CityCarClient<CityCarGetPayload<T>>

    /**
     * Find one CityCar that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CityCarFindUniqueOrThrowArgs} args - Arguments to find a CityCar
     * @example
     * // Get one CityCar
     * const cityCar = await prisma.cityCar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CityCarFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CityCarFindUniqueOrThrowArgs>
    ): Prisma__CityCarClient<CityCarGetPayload<T>>

    /**
     * Find the first CityCar that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCarFindFirstOrThrowArgs} args - Arguments to find a CityCar
     * @example
     * // Get one CityCar
     * const cityCar = await prisma.cityCar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CityCarFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CityCarFindFirstOrThrowArgs>
    ): Prisma__CityCarClient<CityCarGetPayload<T>>

    /**
     * Count the number of CityCars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCarCountArgs} args - Arguments to filter CityCars to count.
     * @example
     * // Count the number of CityCars
     * const count = await prisma.cityCar.count({
     *   where: {
     *     // ... the filter for the CityCars we want to count
     *   }
     * })
    **/
    count<T extends CityCarCountArgs>(
      args?: Subset<T, CityCarCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityCarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CityCar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityCarAggregateArgs>(args: Subset<T, CityCarAggregateArgs>): PrismaPromise<GetCityCarAggregateType<T>>

    /**
     * Group by CityCar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCarGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityCarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityCarGroupByArgs['orderBy'] }
        : { orderBy?: CityCarGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityCarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityCarGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for CityCar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CityCarClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * CityCar base type for findUnique actions
   */
  export type CityCarFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CityCar
     * 
    **/
    select?: CityCarSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityCarInclude | null
    /**
     * Filter, which CityCar to fetch.
     * 
    **/
    where: CityCarWhereUniqueInput
  }

  /**
   * CityCar: findUnique
   */
  export interface CityCarFindUniqueArgs extends CityCarFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityCar base type for findFirst actions
   */
  export type CityCarFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CityCar
     * 
    **/
    select?: CityCarSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityCarInclude | null
    /**
     * Filter, which CityCar to fetch.
     * 
    **/
    where?: CityCarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityCars to fetch.
     * 
    **/
    orderBy?: Enumerable<CityCarOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CityCars.
     * 
    **/
    cursor?: CityCarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityCars from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityCars.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CityCars.
     * 
    **/
    distinct?: Enumerable<CityCarScalarFieldEnum>
  }

  /**
   * CityCar: findFirst
   */
  export interface CityCarFindFirstArgs extends CityCarFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityCar findMany
   */
  export type CityCarFindManyArgs = {
    /**
     * Select specific fields to fetch from the CityCar
     * 
    **/
    select?: CityCarSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityCarInclude | null
    /**
     * Filter, which CityCars to fetch.
     * 
    **/
    where?: CityCarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityCars to fetch.
     * 
    **/
    orderBy?: Enumerable<CityCarOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CityCars.
     * 
    **/
    cursor?: CityCarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityCars from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityCars.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CityCarScalarFieldEnum>
  }


  /**
   * CityCar create
   */
  export type CityCarCreateArgs = {
    /**
     * Select specific fields to fetch from the CityCar
     * 
    **/
    select?: CityCarSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityCarInclude | null
    /**
     * The data needed to create a CityCar.
     * 
    **/
    data: XOR<CityCarCreateInput, CityCarUncheckedCreateInput>
  }


  /**
   * CityCar createMany
   */
  export type CityCarCreateManyArgs = {
    /**
     * The data used to create many CityCars.
     * 
    **/
    data: Enumerable<CityCarCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CityCar update
   */
  export type CityCarUpdateArgs = {
    /**
     * Select specific fields to fetch from the CityCar
     * 
    **/
    select?: CityCarSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityCarInclude | null
    /**
     * The data needed to update a CityCar.
     * 
    **/
    data: XOR<CityCarUpdateInput, CityCarUncheckedUpdateInput>
    /**
     * Choose, which CityCar to update.
     * 
    **/
    where: CityCarWhereUniqueInput
  }


  /**
   * CityCar updateMany
   */
  export type CityCarUpdateManyArgs = {
    /**
     * The data used to update CityCars.
     * 
    **/
    data: XOR<CityCarUpdateManyMutationInput, CityCarUncheckedUpdateManyInput>
    /**
     * Filter which CityCars to update
     * 
    **/
    where?: CityCarWhereInput
  }


  /**
   * CityCar upsert
   */
  export type CityCarUpsertArgs = {
    /**
     * Select specific fields to fetch from the CityCar
     * 
    **/
    select?: CityCarSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityCarInclude | null
    /**
     * The filter to search for the CityCar to update in case it exists.
     * 
    **/
    where: CityCarWhereUniqueInput
    /**
     * In case the CityCar found by the `where` argument doesn't exist, create a new CityCar with this data.
     * 
    **/
    create: XOR<CityCarCreateInput, CityCarUncheckedCreateInput>
    /**
     * In case the CityCar was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CityCarUpdateInput, CityCarUncheckedUpdateInput>
  }


  /**
   * CityCar delete
   */
  export type CityCarDeleteArgs = {
    /**
     * Select specific fields to fetch from the CityCar
     * 
    **/
    select?: CityCarSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityCarInclude | null
    /**
     * Filter which CityCar to delete.
     * 
    **/
    where: CityCarWhereUniqueInput
  }


  /**
   * CityCar deleteMany
   */
  export type CityCarDeleteManyArgs = {
    /**
     * Filter which CityCars to delete
     * 
    **/
    where?: CityCarWhereInput
  }


  /**
   * CityCar: findUniqueOrThrow
   */
  export type CityCarFindUniqueOrThrowArgs = CityCarFindUniqueArgsBase
      

  /**
   * CityCar: findFirstOrThrow
   */
  export type CityCarFindFirstOrThrowArgs = CityCarFindFirstArgsBase
      

  /**
   * CityCar without action
   */
  export type CityCarArgs = {
    /**
     * Select specific fields to fetch from the CityCar
     * 
    **/
    select?: CityCarSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityCarInclude | null
  }



  /**
   * Model CityTourGuide
   */


  export type AggregateCityTourGuide = {
    _count: CityTourGuideCountAggregateOutputType | null
    _avg: CityTourGuideAvgAggregateOutputType | null
    _sum: CityTourGuideSumAggregateOutputType | null
    _min: CityTourGuideMinAggregateOutputType | null
    _max: CityTourGuideMaxAggregateOutputType | null
  }

  export type CityTourGuideAvgAggregateOutputType = {
    pricePerHour: number | null
    rating: number | null
  }

  export type CityTourGuideSumAggregateOutputType = {
    pricePerHour: number | null
    rating: number | null
  }

  export type CityTourGuideMinAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    bio: string | null
    pricePerHour: number | null
    rating: number | null
    contactInfo: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityTourGuideMaxAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    bio: string | null
    pricePerHour: number | null
    rating: number | null
    contactInfo: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityTourGuideCountAggregateOutputType = {
    id: number
    cityId: number
    name: number
    bio: number
    languages: number
    pricePerHour: number
    rating: number
    contactInfo: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CityTourGuideAvgAggregateInputType = {
    pricePerHour?: true
    rating?: true
  }

  export type CityTourGuideSumAggregateInputType = {
    pricePerHour?: true
    rating?: true
  }

  export type CityTourGuideMinAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    bio?: true
    pricePerHour?: true
    rating?: true
    contactInfo?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityTourGuideMaxAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    bio?: true
    pricePerHour?: true
    rating?: true
    contactInfo?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityTourGuideCountAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    bio?: true
    languages?: true
    pricePerHour?: true
    rating?: true
    contactInfo?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CityTourGuideAggregateArgs = {
    /**
     * Filter which CityTourGuide to aggregate.
     * 
    **/
    where?: CityTourGuideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityTourGuides to fetch.
     * 
    **/
    orderBy?: Enumerable<CityTourGuideOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CityTourGuideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityTourGuides from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityTourGuides.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CityTourGuides
    **/
    _count?: true | CityTourGuideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CityTourGuideAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CityTourGuideSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityTourGuideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityTourGuideMaxAggregateInputType
  }

  export type GetCityTourGuideAggregateType<T extends CityTourGuideAggregateArgs> = {
        [P in keyof T & keyof AggregateCityTourGuide]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCityTourGuide[P]>
      : GetScalarType<T[P], AggregateCityTourGuide[P]>
  }




  export type CityTourGuideGroupByArgs = {
    where?: CityTourGuideWhereInput
    orderBy?: Enumerable<CityTourGuideOrderByWithAggregationInput>
    by: Array<CityTourGuideScalarFieldEnum>
    having?: CityTourGuideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityTourGuideCountAggregateInputType | true
    _avg?: CityTourGuideAvgAggregateInputType
    _sum?: CityTourGuideSumAggregateInputType
    _min?: CityTourGuideMinAggregateInputType
    _max?: CityTourGuideMaxAggregateInputType
  }


  export type CityTourGuideGroupByOutputType = {
    id: string
    cityId: string
    name: string
    bio: string
    languages: string[]
    pricePerHour: number
    rating: number
    contactInfo: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CityTourGuideCountAggregateOutputType | null
    _avg: CityTourGuideAvgAggregateOutputType | null
    _sum: CityTourGuideSumAggregateOutputType | null
    _min: CityTourGuideMinAggregateOutputType | null
    _max: CityTourGuideMaxAggregateOutputType | null
  }

  type GetCityTourGuideGroupByPayload<T extends CityTourGuideGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CityTourGuideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityTourGuideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityTourGuideGroupByOutputType[P]>
            : GetScalarType<T[P], CityTourGuideGroupByOutputType[P]>
        }
      >
    >


  export type CityTourGuideSelect = {
    id?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    name?: boolean
    bio?: boolean
    languages?: boolean
    pricePerHour?: boolean
    rating?: boolean
    contactInfo?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type CityTourGuideInclude = {
    city?: boolean | CityArgs
  } 

  export type CityTourGuideGetPayload<S extends boolean | null | undefined | CityTourGuideArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CityTourGuide :
    S extends undefined ? never :
    S extends { include: any } & (CityTourGuideArgs | CityTourGuideFindManyArgs)
    ? CityTourGuide  & {
    [P in TrueKeys<S['include']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (CityTourGuideArgs | CityTourGuideFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof CityTourGuide ? CityTourGuide[P] : never
  } 
      : CityTourGuide


  type CityTourGuideCountArgs = Merge<
    Omit<CityTourGuideFindManyArgs, 'select' | 'include'> & {
      select?: CityTourGuideCountAggregateInputType | true
    }
  >

  export interface CityTourGuideDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one CityTourGuide that matches the filter.
     * @param {CityTourGuideFindUniqueArgs} args - Arguments to find a CityTourGuide
     * @example
     * // Get one CityTourGuide
     * const cityTourGuide = await prisma.cityTourGuide.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CityTourGuideFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CityTourGuideFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CityTourGuide'> extends True ? Prisma__CityTourGuideClient<CityTourGuideGetPayload<T>> : Prisma__CityTourGuideClient<CityTourGuideGetPayload<T> | null, null>

    /**
     * Find the first CityTourGuide that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTourGuideFindFirstArgs} args - Arguments to find a CityTourGuide
     * @example
     * // Get one CityTourGuide
     * const cityTourGuide = await prisma.cityTourGuide.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CityTourGuideFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CityTourGuideFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CityTourGuide'> extends True ? Prisma__CityTourGuideClient<CityTourGuideGetPayload<T>> : Prisma__CityTourGuideClient<CityTourGuideGetPayload<T> | null, null>

    /**
     * Find zero or more CityTourGuides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTourGuideFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CityTourGuides
     * const cityTourGuides = await prisma.cityTourGuide.findMany()
     * 
     * // Get first 10 CityTourGuides
     * const cityTourGuides = await prisma.cityTourGuide.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityTourGuideWithIdOnly = await prisma.cityTourGuide.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CityTourGuideFindManyArgs>(
      args?: SelectSubset<T, CityTourGuideFindManyArgs>
    ): PrismaPromise<Array<CityTourGuideGetPayload<T>>>

    /**
     * Create a CityTourGuide.
     * @param {CityTourGuideCreateArgs} args - Arguments to create a CityTourGuide.
     * @example
     * // Create one CityTourGuide
     * const CityTourGuide = await prisma.cityTourGuide.create({
     *   data: {
     *     // ... data to create a CityTourGuide
     *   }
     * })
     * 
    **/
    create<T extends CityTourGuideCreateArgs>(
      args: SelectSubset<T, CityTourGuideCreateArgs>
    ): Prisma__CityTourGuideClient<CityTourGuideGetPayload<T>>

    /**
     * Create many CityTourGuides.
     *     @param {CityTourGuideCreateManyArgs} args - Arguments to create many CityTourGuides.
     *     @example
     *     // Create many CityTourGuides
     *     const cityTourGuide = await prisma.cityTourGuide.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CityTourGuideCreateManyArgs>(
      args?: SelectSubset<T, CityTourGuideCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CityTourGuide.
     * @param {CityTourGuideDeleteArgs} args - Arguments to delete one CityTourGuide.
     * @example
     * // Delete one CityTourGuide
     * const CityTourGuide = await prisma.cityTourGuide.delete({
     *   where: {
     *     // ... filter to delete one CityTourGuide
     *   }
     * })
     * 
    **/
    delete<T extends CityTourGuideDeleteArgs>(
      args: SelectSubset<T, CityTourGuideDeleteArgs>
    ): Prisma__CityTourGuideClient<CityTourGuideGetPayload<T>>

    /**
     * Update one CityTourGuide.
     * @param {CityTourGuideUpdateArgs} args - Arguments to update one CityTourGuide.
     * @example
     * // Update one CityTourGuide
     * const cityTourGuide = await prisma.cityTourGuide.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CityTourGuideUpdateArgs>(
      args: SelectSubset<T, CityTourGuideUpdateArgs>
    ): Prisma__CityTourGuideClient<CityTourGuideGetPayload<T>>

    /**
     * Delete zero or more CityTourGuides.
     * @param {CityTourGuideDeleteManyArgs} args - Arguments to filter CityTourGuides to delete.
     * @example
     * // Delete a few CityTourGuides
     * const { count } = await prisma.cityTourGuide.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CityTourGuideDeleteManyArgs>(
      args?: SelectSubset<T, CityTourGuideDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CityTourGuides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTourGuideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CityTourGuides
     * const cityTourGuide = await prisma.cityTourGuide.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CityTourGuideUpdateManyArgs>(
      args: SelectSubset<T, CityTourGuideUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CityTourGuide.
     * @param {CityTourGuideUpsertArgs} args - Arguments to update or create a CityTourGuide.
     * @example
     * // Update or create a CityTourGuide
     * const cityTourGuide = await prisma.cityTourGuide.upsert({
     *   create: {
     *     // ... data to create a CityTourGuide
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CityTourGuide we want to update
     *   }
     * })
    **/
    upsert<T extends CityTourGuideUpsertArgs>(
      args: SelectSubset<T, CityTourGuideUpsertArgs>
    ): Prisma__CityTourGuideClient<CityTourGuideGetPayload<T>>

    /**
     * Find one CityTourGuide that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CityTourGuideFindUniqueOrThrowArgs} args - Arguments to find a CityTourGuide
     * @example
     * // Get one CityTourGuide
     * const cityTourGuide = await prisma.cityTourGuide.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CityTourGuideFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CityTourGuideFindUniqueOrThrowArgs>
    ): Prisma__CityTourGuideClient<CityTourGuideGetPayload<T>>

    /**
     * Find the first CityTourGuide that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTourGuideFindFirstOrThrowArgs} args - Arguments to find a CityTourGuide
     * @example
     * // Get one CityTourGuide
     * const cityTourGuide = await prisma.cityTourGuide.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CityTourGuideFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CityTourGuideFindFirstOrThrowArgs>
    ): Prisma__CityTourGuideClient<CityTourGuideGetPayload<T>>

    /**
     * Count the number of CityTourGuides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTourGuideCountArgs} args - Arguments to filter CityTourGuides to count.
     * @example
     * // Count the number of CityTourGuides
     * const count = await prisma.cityTourGuide.count({
     *   where: {
     *     // ... the filter for the CityTourGuides we want to count
     *   }
     * })
    **/
    count<T extends CityTourGuideCountArgs>(
      args?: Subset<T, CityTourGuideCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityTourGuideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CityTourGuide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTourGuideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityTourGuideAggregateArgs>(args: Subset<T, CityTourGuideAggregateArgs>): PrismaPromise<GetCityTourGuideAggregateType<T>>

    /**
     * Group by CityTourGuide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityTourGuideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityTourGuideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityTourGuideGroupByArgs['orderBy'] }
        : { orderBy?: CityTourGuideGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityTourGuideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityTourGuideGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for CityTourGuide.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CityTourGuideClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * CityTourGuide base type for findUnique actions
   */
  export type CityTourGuideFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CityTourGuide
     * 
    **/
    select?: CityTourGuideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTourGuideInclude | null
    /**
     * Filter, which CityTourGuide to fetch.
     * 
    **/
    where: CityTourGuideWhereUniqueInput
  }

  /**
   * CityTourGuide: findUnique
   */
  export interface CityTourGuideFindUniqueArgs extends CityTourGuideFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityTourGuide base type for findFirst actions
   */
  export type CityTourGuideFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CityTourGuide
     * 
    **/
    select?: CityTourGuideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTourGuideInclude | null
    /**
     * Filter, which CityTourGuide to fetch.
     * 
    **/
    where?: CityTourGuideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityTourGuides to fetch.
     * 
    **/
    orderBy?: Enumerable<CityTourGuideOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CityTourGuides.
     * 
    **/
    cursor?: CityTourGuideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityTourGuides from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityTourGuides.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CityTourGuides.
     * 
    **/
    distinct?: Enumerable<CityTourGuideScalarFieldEnum>
  }

  /**
   * CityTourGuide: findFirst
   */
  export interface CityTourGuideFindFirstArgs extends CityTourGuideFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityTourGuide findMany
   */
  export type CityTourGuideFindManyArgs = {
    /**
     * Select specific fields to fetch from the CityTourGuide
     * 
    **/
    select?: CityTourGuideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTourGuideInclude | null
    /**
     * Filter, which CityTourGuides to fetch.
     * 
    **/
    where?: CityTourGuideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityTourGuides to fetch.
     * 
    **/
    orderBy?: Enumerable<CityTourGuideOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CityTourGuides.
     * 
    **/
    cursor?: CityTourGuideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityTourGuides from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityTourGuides.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CityTourGuideScalarFieldEnum>
  }


  /**
   * CityTourGuide create
   */
  export type CityTourGuideCreateArgs = {
    /**
     * Select specific fields to fetch from the CityTourGuide
     * 
    **/
    select?: CityTourGuideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTourGuideInclude | null
    /**
     * The data needed to create a CityTourGuide.
     * 
    **/
    data: XOR<CityTourGuideCreateInput, CityTourGuideUncheckedCreateInput>
  }


  /**
   * CityTourGuide createMany
   */
  export type CityTourGuideCreateManyArgs = {
    /**
     * The data used to create many CityTourGuides.
     * 
    **/
    data: Enumerable<CityTourGuideCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CityTourGuide update
   */
  export type CityTourGuideUpdateArgs = {
    /**
     * Select specific fields to fetch from the CityTourGuide
     * 
    **/
    select?: CityTourGuideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTourGuideInclude | null
    /**
     * The data needed to update a CityTourGuide.
     * 
    **/
    data: XOR<CityTourGuideUpdateInput, CityTourGuideUncheckedUpdateInput>
    /**
     * Choose, which CityTourGuide to update.
     * 
    **/
    where: CityTourGuideWhereUniqueInput
  }


  /**
   * CityTourGuide updateMany
   */
  export type CityTourGuideUpdateManyArgs = {
    /**
     * The data used to update CityTourGuides.
     * 
    **/
    data: XOR<CityTourGuideUpdateManyMutationInput, CityTourGuideUncheckedUpdateManyInput>
    /**
     * Filter which CityTourGuides to update
     * 
    **/
    where?: CityTourGuideWhereInput
  }


  /**
   * CityTourGuide upsert
   */
  export type CityTourGuideUpsertArgs = {
    /**
     * Select specific fields to fetch from the CityTourGuide
     * 
    **/
    select?: CityTourGuideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTourGuideInclude | null
    /**
     * The filter to search for the CityTourGuide to update in case it exists.
     * 
    **/
    where: CityTourGuideWhereUniqueInput
    /**
     * In case the CityTourGuide found by the `where` argument doesn't exist, create a new CityTourGuide with this data.
     * 
    **/
    create: XOR<CityTourGuideCreateInput, CityTourGuideUncheckedCreateInput>
    /**
     * In case the CityTourGuide was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CityTourGuideUpdateInput, CityTourGuideUncheckedUpdateInput>
  }


  /**
   * CityTourGuide delete
   */
  export type CityTourGuideDeleteArgs = {
    /**
     * Select specific fields to fetch from the CityTourGuide
     * 
    **/
    select?: CityTourGuideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTourGuideInclude | null
    /**
     * Filter which CityTourGuide to delete.
     * 
    **/
    where: CityTourGuideWhereUniqueInput
  }


  /**
   * CityTourGuide deleteMany
   */
  export type CityTourGuideDeleteManyArgs = {
    /**
     * Filter which CityTourGuides to delete
     * 
    **/
    where?: CityTourGuideWhereInput
  }


  /**
   * CityTourGuide: findUniqueOrThrow
   */
  export type CityTourGuideFindUniqueOrThrowArgs = CityTourGuideFindUniqueArgsBase
      

  /**
   * CityTourGuide: findFirstOrThrow
   */
  export type CityTourGuideFindFirstOrThrowArgs = CityTourGuideFindFirstArgsBase
      

  /**
   * CityTourGuide without action
   */
  export type CityTourGuideArgs = {
    /**
     * Select specific fields to fetch from the CityTourGuide
     * 
    **/
    select?: CityTourGuideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityTourGuideInclude | null
  }



  /**
   * Model CityApplication
   */


  export type AggregateCityApplication = {
    _count: CityApplicationCountAggregateOutputType | null
    _min: CityApplicationMinAggregateOutputType | null
    _max: CityApplicationMaxAggregateOutputType | null
  }

  export type CityApplicationMinAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    description: string | null
    iconUrl: string | null
    androidLink: string | null
    iphoneLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityApplicationMaxAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    description: string | null
    iconUrl: string | null
    androidLink: string | null
    iphoneLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CityApplicationCountAggregateOutputType = {
    id: number
    cityId: number
    name: number
    description: number
    iconUrl: number
    androidLink: number
    iphoneLink: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CityApplicationMinAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    description?: true
    iconUrl?: true
    androidLink?: true
    iphoneLink?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityApplicationMaxAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    description?: true
    iconUrl?: true
    androidLink?: true
    iphoneLink?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CityApplicationCountAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    description?: true
    iconUrl?: true
    androidLink?: true
    iphoneLink?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CityApplicationAggregateArgs = {
    /**
     * Filter which CityApplication to aggregate.
     * 
    **/
    where?: CityApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityApplications to fetch.
     * 
    **/
    orderBy?: Enumerable<CityApplicationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CityApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityApplications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityApplications.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CityApplications
    **/
    _count?: true | CityApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityApplicationMaxAggregateInputType
  }

  export type GetCityApplicationAggregateType<T extends CityApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateCityApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCityApplication[P]>
      : GetScalarType<T[P], AggregateCityApplication[P]>
  }




  export type CityApplicationGroupByArgs = {
    where?: CityApplicationWhereInput
    orderBy?: Enumerable<CityApplicationOrderByWithAggregationInput>
    by: Array<CityApplicationScalarFieldEnum>
    having?: CityApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityApplicationCountAggregateInputType | true
    _min?: CityApplicationMinAggregateInputType
    _max?: CityApplicationMaxAggregateInputType
  }


  export type CityApplicationGroupByOutputType = {
    id: string
    cityId: string
    name: string
    description: string
    iconUrl: string | null
    androidLink: string | null
    iphoneLink: string | null
    createdAt: Date
    updatedAt: Date
    _count: CityApplicationCountAggregateOutputType | null
    _min: CityApplicationMinAggregateOutputType | null
    _max: CityApplicationMaxAggregateOutputType | null
  }

  type GetCityApplicationGroupByPayload<T extends CityApplicationGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CityApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], CityApplicationGroupByOutputType[P]>
        }
      >
    >


  export type CityApplicationSelect = {
    id?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    name?: boolean
    description?: boolean
    iconUrl?: boolean
    androidLink?: boolean
    iphoneLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type CityApplicationInclude = {
    city?: boolean | CityArgs
  } 

  export type CityApplicationGetPayload<S extends boolean | null | undefined | CityApplicationArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CityApplication :
    S extends undefined ? never :
    S extends { include: any } & (CityApplicationArgs | CityApplicationFindManyArgs)
    ? CityApplication  & {
    [P in TrueKeys<S['include']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (CityApplicationArgs | CityApplicationFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof CityApplication ? CityApplication[P] : never
  } 
      : CityApplication


  type CityApplicationCountArgs = Merge<
    Omit<CityApplicationFindManyArgs, 'select' | 'include'> & {
      select?: CityApplicationCountAggregateInputType | true
    }
  >

  export interface CityApplicationDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one CityApplication that matches the filter.
     * @param {CityApplicationFindUniqueArgs} args - Arguments to find a CityApplication
     * @example
     * // Get one CityApplication
     * const cityApplication = await prisma.cityApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CityApplicationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CityApplicationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CityApplication'> extends True ? Prisma__CityApplicationClient<CityApplicationGetPayload<T>> : Prisma__CityApplicationClient<CityApplicationGetPayload<T> | null, null>

    /**
     * Find the first CityApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityApplicationFindFirstArgs} args - Arguments to find a CityApplication
     * @example
     * // Get one CityApplication
     * const cityApplication = await prisma.cityApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CityApplicationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CityApplicationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CityApplication'> extends True ? Prisma__CityApplicationClient<CityApplicationGetPayload<T>> : Prisma__CityApplicationClient<CityApplicationGetPayload<T> | null, null>

    /**
     * Find zero or more CityApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityApplicationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CityApplications
     * const cityApplications = await prisma.cityApplication.findMany()
     * 
     * // Get first 10 CityApplications
     * const cityApplications = await prisma.cityApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityApplicationWithIdOnly = await prisma.cityApplication.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CityApplicationFindManyArgs>(
      args?: SelectSubset<T, CityApplicationFindManyArgs>
    ): PrismaPromise<Array<CityApplicationGetPayload<T>>>

    /**
     * Create a CityApplication.
     * @param {CityApplicationCreateArgs} args - Arguments to create a CityApplication.
     * @example
     * // Create one CityApplication
     * const CityApplication = await prisma.cityApplication.create({
     *   data: {
     *     // ... data to create a CityApplication
     *   }
     * })
     * 
    **/
    create<T extends CityApplicationCreateArgs>(
      args: SelectSubset<T, CityApplicationCreateArgs>
    ): Prisma__CityApplicationClient<CityApplicationGetPayload<T>>

    /**
     * Create many CityApplications.
     *     @param {CityApplicationCreateManyArgs} args - Arguments to create many CityApplications.
     *     @example
     *     // Create many CityApplications
     *     const cityApplication = await prisma.cityApplication.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CityApplicationCreateManyArgs>(
      args?: SelectSubset<T, CityApplicationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CityApplication.
     * @param {CityApplicationDeleteArgs} args - Arguments to delete one CityApplication.
     * @example
     * // Delete one CityApplication
     * const CityApplication = await prisma.cityApplication.delete({
     *   where: {
     *     // ... filter to delete one CityApplication
     *   }
     * })
     * 
    **/
    delete<T extends CityApplicationDeleteArgs>(
      args: SelectSubset<T, CityApplicationDeleteArgs>
    ): Prisma__CityApplicationClient<CityApplicationGetPayload<T>>

    /**
     * Update one CityApplication.
     * @param {CityApplicationUpdateArgs} args - Arguments to update one CityApplication.
     * @example
     * // Update one CityApplication
     * const cityApplication = await prisma.cityApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CityApplicationUpdateArgs>(
      args: SelectSubset<T, CityApplicationUpdateArgs>
    ): Prisma__CityApplicationClient<CityApplicationGetPayload<T>>

    /**
     * Delete zero or more CityApplications.
     * @param {CityApplicationDeleteManyArgs} args - Arguments to filter CityApplications to delete.
     * @example
     * // Delete a few CityApplications
     * const { count } = await prisma.cityApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CityApplicationDeleteManyArgs>(
      args?: SelectSubset<T, CityApplicationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CityApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CityApplications
     * const cityApplication = await prisma.cityApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CityApplicationUpdateManyArgs>(
      args: SelectSubset<T, CityApplicationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CityApplication.
     * @param {CityApplicationUpsertArgs} args - Arguments to update or create a CityApplication.
     * @example
     * // Update or create a CityApplication
     * const cityApplication = await prisma.cityApplication.upsert({
     *   create: {
     *     // ... data to create a CityApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CityApplication we want to update
     *   }
     * })
    **/
    upsert<T extends CityApplicationUpsertArgs>(
      args: SelectSubset<T, CityApplicationUpsertArgs>
    ): Prisma__CityApplicationClient<CityApplicationGetPayload<T>>

    /**
     * Find one CityApplication that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CityApplicationFindUniqueOrThrowArgs} args - Arguments to find a CityApplication
     * @example
     * // Get one CityApplication
     * const cityApplication = await prisma.cityApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CityApplicationFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CityApplicationFindUniqueOrThrowArgs>
    ): Prisma__CityApplicationClient<CityApplicationGetPayload<T>>

    /**
     * Find the first CityApplication that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityApplicationFindFirstOrThrowArgs} args - Arguments to find a CityApplication
     * @example
     * // Get one CityApplication
     * const cityApplication = await prisma.cityApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CityApplicationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CityApplicationFindFirstOrThrowArgs>
    ): Prisma__CityApplicationClient<CityApplicationGetPayload<T>>

    /**
     * Count the number of CityApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityApplicationCountArgs} args - Arguments to filter CityApplications to count.
     * @example
     * // Count the number of CityApplications
     * const count = await prisma.cityApplication.count({
     *   where: {
     *     // ... the filter for the CityApplications we want to count
     *   }
     * })
    **/
    count<T extends CityApplicationCountArgs>(
      args?: Subset<T, CityApplicationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CityApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityApplicationAggregateArgs>(args: Subset<T, CityApplicationAggregateArgs>): PrismaPromise<GetCityApplicationAggregateType<T>>

    /**
     * Group by CityApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityApplicationGroupByArgs['orderBy'] }
        : { orderBy?: CityApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityApplicationGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for CityApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CityApplicationClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * CityApplication base type for findUnique actions
   */
  export type CityApplicationFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CityApplication
     * 
    **/
    select?: CityApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityApplicationInclude | null
    /**
     * Filter, which CityApplication to fetch.
     * 
    **/
    where: CityApplicationWhereUniqueInput
  }

  /**
   * CityApplication: findUnique
   */
  export interface CityApplicationFindUniqueArgs extends CityApplicationFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityApplication base type for findFirst actions
   */
  export type CityApplicationFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CityApplication
     * 
    **/
    select?: CityApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityApplicationInclude | null
    /**
     * Filter, which CityApplication to fetch.
     * 
    **/
    where?: CityApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityApplications to fetch.
     * 
    **/
    orderBy?: Enumerable<CityApplicationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CityApplications.
     * 
    **/
    cursor?: CityApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityApplications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityApplications.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CityApplications.
     * 
    **/
    distinct?: Enumerable<CityApplicationScalarFieldEnum>
  }

  /**
   * CityApplication: findFirst
   */
  export interface CityApplicationFindFirstArgs extends CityApplicationFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CityApplication findMany
   */
  export type CityApplicationFindManyArgs = {
    /**
     * Select specific fields to fetch from the CityApplication
     * 
    **/
    select?: CityApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityApplicationInclude | null
    /**
     * Filter, which CityApplications to fetch.
     * 
    **/
    where?: CityApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CityApplications to fetch.
     * 
    **/
    orderBy?: Enumerable<CityApplicationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CityApplications.
     * 
    **/
    cursor?: CityApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CityApplications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CityApplications.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CityApplicationScalarFieldEnum>
  }


  /**
   * CityApplication create
   */
  export type CityApplicationCreateArgs = {
    /**
     * Select specific fields to fetch from the CityApplication
     * 
    **/
    select?: CityApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityApplicationInclude | null
    /**
     * The data needed to create a CityApplication.
     * 
    **/
    data: XOR<CityApplicationCreateInput, CityApplicationUncheckedCreateInput>
  }


  /**
   * CityApplication createMany
   */
  export type CityApplicationCreateManyArgs = {
    /**
     * The data used to create many CityApplications.
     * 
    **/
    data: Enumerable<CityApplicationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CityApplication update
   */
  export type CityApplicationUpdateArgs = {
    /**
     * Select specific fields to fetch from the CityApplication
     * 
    **/
    select?: CityApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityApplicationInclude | null
    /**
     * The data needed to update a CityApplication.
     * 
    **/
    data: XOR<CityApplicationUpdateInput, CityApplicationUncheckedUpdateInput>
    /**
     * Choose, which CityApplication to update.
     * 
    **/
    where: CityApplicationWhereUniqueInput
  }


  /**
   * CityApplication updateMany
   */
  export type CityApplicationUpdateManyArgs = {
    /**
     * The data used to update CityApplications.
     * 
    **/
    data: XOR<CityApplicationUpdateManyMutationInput, CityApplicationUncheckedUpdateManyInput>
    /**
     * Filter which CityApplications to update
     * 
    **/
    where?: CityApplicationWhereInput
  }


  /**
   * CityApplication upsert
   */
  export type CityApplicationUpsertArgs = {
    /**
     * Select specific fields to fetch from the CityApplication
     * 
    **/
    select?: CityApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityApplicationInclude | null
    /**
     * The filter to search for the CityApplication to update in case it exists.
     * 
    **/
    where: CityApplicationWhereUniqueInput
    /**
     * In case the CityApplication found by the `where` argument doesn't exist, create a new CityApplication with this data.
     * 
    **/
    create: XOR<CityApplicationCreateInput, CityApplicationUncheckedCreateInput>
    /**
     * In case the CityApplication was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CityApplicationUpdateInput, CityApplicationUncheckedUpdateInput>
  }


  /**
   * CityApplication delete
   */
  export type CityApplicationDeleteArgs = {
    /**
     * Select specific fields to fetch from the CityApplication
     * 
    **/
    select?: CityApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityApplicationInclude | null
    /**
     * Filter which CityApplication to delete.
     * 
    **/
    where: CityApplicationWhereUniqueInput
  }


  /**
   * CityApplication deleteMany
   */
  export type CityApplicationDeleteManyArgs = {
    /**
     * Filter which CityApplications to delete
     * 
    **/
    where?: CityApplicationWhereInput
  }


  /**
   * CityApplication: findUniqueOrThrow
   */
  export type CityApplicationFindUniqueOrThrowArgs = CityApplicationFindUniqueArgsBase
      

  /**
   * CityApplication: findFirstOrThrow
   */
  export type CityApplicationFindFirstOrThrowArgs = CityApplicationFindFirstArgsBase
      

  /**
   * CityApplication without action
   */
  export type CityApplicationArgs = {
    /**
     * Select specific fields to fetch from the CityApplication
     * 
    **/
    select?: CityApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityApplicationInclude | null
  }



  /**
   * Model Activity
   */


  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    price: number | null
    lat: number | null
    lng: number | null
  }

  export type ActivitySumAggregateOutputType = {
    price: number | null
    lat: number | null
    lng: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    cityId: string | null
    title: string | null
    description: string | null
    price: number | null
    currency: string | null
    lat: number | null
    lng: number | null
    bookingUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    cityId: string | null
    title: string | null
    description: string | null
    price: number | null
    currency: string | null
    lat: number | null
    lng: number | null
    bookingUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    cityId: number
    title: number
    description: number
    price: number
    currency: number
    lat: number
    lng: number
    images: number
    tags: number
    bookingUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    price?: true
    lat?: true
    lng?: true
  }

  export type ActivitySumAggregateInputType = {
    price?: true
    lat?: true
    lng?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    cityId?: true
    title?: true
    description?: true
    price?: true
    currency?: true
    lat?: true
    lng?: true
    bookingUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    cityId?: true
    title?: true
    description?: true
    price?: true
    currency?: true
    lat?: true
    lng?: true
    bookingUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    cityId?: true
    title?: true
    description?: true
    price?: true
    currency?: true
    lat?: true
    lng?: true
    images?: true
    tags?: true
    bookingUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActivityAggregateArgs = {
    /**
     * Filter which Activity to aggregate.
     * 
    **/
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     * 
    **/
    orderBy?: Enumerable<ActivityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs = {
    where?: ActivityWhereInput
    orderBy?: Enumerable<ActivityOrderByWithAggregationInput>
    by: Array<ActivityScalarFieldEnum>
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }


  export type ActivityGroupByOutputType = {
    id: string
    cityId: string
    title: string
    description: string | null
    price: number | null
    currency: string | null
    lat: number
    lng: number
    images: string[]
    tags: string[]
    bookingUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect = {
    id?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    title?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    lat?: boolean
    lng?: boolean
    images?: boolean
    tags?: boolean
    bookingUrl?: boolean
    tripItems?: boolean | TripItemFindManyArgs
    bookings?: boolean | BookingFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | ActivityCountOutputTypeArgs
  }


  export type ActivityInclude = {
    city?: boolean | CityArgs
    tripItems?: boolean | TripItemFindManyArgs
    bookings?: boolean | BookingFindManyArgs
    _count?: boolean | ActivityCountOutputTypeArgs
  } 

  export type ActivityGetPayload<S extends boolean | null | undefined | ActivityArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Activity :
    S extends undefined ? never :
    S extends { include: any } & (ActivityArgs | ActivityFindManyArgs)
    ? Activity  & {
    [P in TrueKeys<S['include']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'tripItems' ? Array < TripItemGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'bookings' ? Array < BookingGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? ActivityCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (ActivityArgs | ActivityFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'tripItems' ? Array < TripItemGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'bookings' ? Array < BookingGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? ActivityCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Activity ? Activity[P] : never
  } 
      : Activity


  type ActivityCountArgs = Merge<
    Omit<ActivityFindManyArgs, 'select' | 'include'> & {
      select?: ActivityCountAggregateInputType | true
    }
  >

  export interface ActivityDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ActivityFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ActivityFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Activity'> extends True ? Prisma__ActivityClient<ActivityGetPayload<T>> : Prisma__ActivityClient<ActivityGetPayload<T> | null, null>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ActivityFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ActivityFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Activity'> extends True ? Prisma__ActivityClient<ActivityGetPayload<T>> : Prisma__ActivityClient<ActivityGetPayload<T> | null, null>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ActivityFindManyArgs>(
      args?: SelectSubset<T, ActivityFindManyArgs>
    ): PrismaPromise<Array<ActivityGetPayload<T>>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
    **/
    create<T extends ActivityCreateArgs>(
      args: SelectSubset<T, ActivityCreateArgs>
    ): Prisma__ActivityClient<ActivityGetPayload<T>>

    /**
     * Create many Activities.
     *     @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     *     @example
     *     // Create many Activities
     *     const activity = await prisma.activity.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ActivityCreateManyArgs>(
      args?: SelectSubset<T, ActivityCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
    **/
    delete<T extends ActivityDeleteArgs>(
      args: SelectSubset<T, ActivityDeleteArgs>
    ): Prisma__ActivityClient<ActivityGetPayload<T>>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ActivityUpdateArgs>(
      args: SelectSubset<T, ActivityUpdateArgs>
    ): Prisma__ActivityClient<ActivityGetPayload<T>>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ActivityDeleteManyArgs>(
      args?: SelectSubset<T, ActivityDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ActivityUpdateManyArgs>(
      args: SelectSubset<T, ActivityUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
    **/
    upsert<T extends ActivityUpsertArgs>(
      args: SelectSubset<T, ActivityUpsertArgs>
    ): Prisma__ActivityClient<ActivityGetPayload<T>>

    /**
     * Find one Activity that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ActivityFindUniqueOrThrowArgs>
    ): Prisma__ActivityClient<ActivityGetPayload<T>>

    /**
     * Find the first Activity that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ActivityFindFirstOrThrowArgs>
    ): Prisma__ActivityClient<ActivityGetPayload<T>>

    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ActivityClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    tripItems<T extends TripItemFindManyArgs= {}>(args?: Subset<T, TripItemFindManyArgs>): PrismaPromise<Array<TripItemGetPayload<T>>| Null>;

    bookings<T extends BookingFindManyArgs= {}>(args?: Subset<T, BookingFindManyArgs>): PrismaPromise<Array<BookingGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Activity base type for findUnique actions
   */
  export type ActivityFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Activity
     * 
    **/
    select?: ActivitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ActivityInclude | null
    /**
     * Filter, which Activity to fetch.
     * 
    **/
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity: findUnique
   */
  export interface ActivityFindUniqueArgs extends ActivityFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Activity base type for findFirst actions
   */
  export type ActivityFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Activity
     * 
    **/
    select?: ActivitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ActivityInclude | null
    /**
     * Filter, which Activity to fetch.
     * 
    **/
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     * 
    **/
    orderBy?: Enumerable<ActivityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     * 
    **/
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     * 
    **/
    distinct?: Enumerable<ActivityScalarFieldEnum>
  }

  /**
   * Activity: findFirst
   */
  export interface ActivityFindFirstArgs extends ActivityFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs = {
    /**
     * Select specific fields to fetch from the Activity
     * 
    **/
    select?: ActivitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ActivityInclude | null
    /**
     * Filter, which Activities to fetch.
     * 
    **/
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     * 
    **/
    orderBy?: Enumerable<ActivityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     * 
    **/
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ActivityScalarFieldEnum>
  }


  /**
   * Activity create
   */
  export type ActivityCreateArgs = {
    /**
     * Select specific fields to fetch from the Activity
     * 
    **/
    select?: ActivitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ActivityInclude | null
    /**
     * The data needed to create a Activity.
     * 
    **/
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }


  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs = {
    /**
     * The data used to create many Activities.
     * 
    **/
    data: Enumerable<ActivityCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Activity update
   */
  export type ActivityUpdateArgs = {
    /**
     * Select specific fields to fetch from the Activity
     * 
    **/
    select?: ActivitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ActivityInclude | null
    /**
     * The data needed to update a Activity.
     * 
    **/
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     * 
    **/
    where: ActivityWhereUniqueInput
  }


  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs = {
    /**
     * The data used to update Activities.
     * 
    **/
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     * 
    **/
    where?: ActivityWhereInput
  }


  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs = {
    /**
     * Select specific fields to fetch from the Activity
     * 
    **/
    select?: ActivitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ActivityInclude | null
    /**
     * The filter to search for the Activity to update in case it exists.
     * 
    **/
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     * 
    **/
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }


  /**
   * Activity delete
   */
  export type ActivityDeleteArgs = {
    /**
     * Select specific fields to fetch from the Activity
     * 
    **/
    select?: ActivitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ActivityInclude | null
    /**
     * Filter which Activity to delete.
     * 
    **/
    where: ActivityWhereUniqueInput
  }


  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs = {
    /**
     * Filter which Activities to delete
     * 
    **/
    where?: ActivityWhereInput
  }


  /**
   * Activity: findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs = ActivityFindUniqueArgsBase
      

  /**
   * Activity: findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs = ActivityFindFirstArgsBase
      

  /**
   * Activity without action
   */
  export type ActivityArgs = {
    /**
     * Select specific fields to fetch from the Activity
     * 
    **/
    select?: ActivitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ActivityInclude | null
  }



  /**
   * Model Driver
   */


  export type AggregateDriver = {
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  export type DriverAvgAggregateOutputType = {
    pricePerDay: number | null
    rating: number | null
  }

  export type DriverSumAggregateOutputType = {
    pricePerDay: number | null
    rating: number | null
  }

  export type DriverMinAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    phone: string | null
    contactInfo: string | null
    pricePerDay: number | null
    vehicleType: string | null
    rating: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverMaxAggregateOutputType = {
    id: string | null
    cityId: string | null
    name: string | null
    phone: string | null
    contactInfo: string | null
    pricePerDay: number | null
    vehicleType: string | null
    rating: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverCountAggregateOutputType = {
    id: number
    cityId: number
    name: number
    phone: number
    contactInfo: number
    pricePerDay: number
    vehicleType: number
    rating: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DriverAvgAggregateInputType = {
    pricePerDay?: true
    rating?: true
  }

  export type DriverSumAggregateInputType = {
    pricePerDay?: true
    rating?: true
  }

  export type DriverMinAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    phone?: true
    contactInfo?: true
    pricePerDay?: true
    vehicleType?: true
    rating?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverMaxAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    phone?: true
    contactInfo?: true
    pricePerDay?: true
    vehicleType?: true
    rating?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverCountAggregateInputType = {
    id?: true
    cityId?: true
    name?: true
    phone?: true
    contactInfo?: true
    pricePerDay?: true
    vehicleType?: true
    rating?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DriverAggregateArgs = {
    /**
     * Filter which Driver to aggregate.
     * 
    **/
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     * 
    **/
    orderBy?: Enumerable<DriverOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drivers
    **/
    _count?: true | DriverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DriverAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DriverSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverMaxAggregateInputType
  }

  export type GetDriverAggregateType<T extends DriverAggregateArgs> = {
        [P in keyof T & keyof AggregateDriver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriver[P]>
      : GetScalarType<T[P], AggregateDriver[P]>
  }




  export type DriverGroupByArgs = {
    where?: DriverWhereInput
    orderBy?: Enumerable<DriverOrderByWithAggregationInput>
    by: Array<DriverScalarFieldEnum>
    having?: DriverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverCountAggregateInputType | true
    _avg?: DriverAvgAggregateInputType
    _sum?: DriverSumAggregateInputType
    _min?: DriverMinAggregateInputType
    _max?: DriverMaxAggregateInputType
  }


  export type DriverGroupByOutputType = {
    id: string
    cityId: string
    name: string
    phone: string | null
    contactInfo: string | null
    pricePerDay: number | null
    vehicleType: string | null
    rating: number | null
    createdAt: Date
    updatedAt: Date
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  type GetDriverGroupByPayload<T extends DriverGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DriverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverGroupByOutputType[P]>
            : GetScalarType<T[P], DriverGroupByOutputType[P]>
        }
      >
    >


  export type DriverSelect = {
    id?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    name?: boolean
    phone?: boolean
    contactInfo?: boolean
    pricePerDay?: boolean
    vehicleType?: boolean
    rating?: boolean
    bookings?: boolean | BookingFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | DriverCountOutputTypeArgs
  }


  export type DriverInclude = {
    city?: boolean | CityArgs
    bookings?: boolean | BookingFindManyArgs
    _count?: boolean | DriverCountOutputTypeArgs
  } 

  export type DriverGetPayload<S extends boolean | null | undefined | DriverArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Driver :
    S extends undefined ? never :
    S extends { include: any } & (DriverArgs | DriverFindManyArgs)
    ? Driver  & {
    [P in TrueKeys<S['include']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'bookings' ? Array < BookingGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? DriverCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (DriverArgs | DriverFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'bookings' ? Array < BookingGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? DriverCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Driver ? Driver[P] : never
  } 
      : Driver


  type DriverCountArgs = Merge<
    Omit<DriverFindManyArgs, 'select' | 'include'> & {
      select?: DriverCountAggregateInputType | true
    }
  >

  export interface DriverDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Driver that matches the filter.
     * @param {DriverFindUniqueArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DriverFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DriverFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Driver'> extends True ? Prisma__DriverClient<DriverGetPayload<T>> : Prisma__DriverClient<DriverGetPayload<T> | null, null>

    /**
     * Find the first Driver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DriverFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DriverFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Driver'> extends True ? Prisma__DriverClient<DriverGetPayload<T>> : Prisma__DriverClient<DriverGetPayload<T> | null, null>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.driver.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.driver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverWithIdOnly = await prisma.driver.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DriverFindManyArgs>(
      args?: SelectSubset<T, DriverFindManyArgs>
    ): PrismaPromise<Array<DriverGetPayload<T>>>

    /**
     * Create a Driver.
     * @param {DriverCreateArgs} args - Arguments to create a Driver.
     * @example
     * // Create one Driver
     * const Driver = await prisma.driver.create({
     *   data: {
     *     // ... data to create a Driver
     *   }
     * })
     * 
    **/
    create<T extends DriverCreateArgs>(
      args: SelectSubset<T, DriverCreateArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Create many Drivers.
     *     @param {DriverCreateManyArgs} args - Arguments to create many Drivers.
     *     @example
     *     // Create many Drivers
     *     const driver = await prisma.driver.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DriverCreateManyArgs>(
      args?: SelectSubset<T, DriverCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Driver.
     * @param {DriverDeleteArgs} args - Arguments to delete one Driver.
     * @example
     * // Delete one Driver
     * const Driver = await prisma.driver.delete({
     *   where: {
     *     // ... filter to delete one Driver
     *   }
     * })
     * 
    **/
    delete<T extends DriverDeleteArgs>(
      args: SelectSubset<T, DriverDeleteArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Update one Driver.
     * @param {DriverUpdateArgs} args - Arguments to update one Driver.
     * @example
     * // Update one Driver
     * const driver = await prisma.driver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DriverUpdateArgs>(
      args: SelectSubset<T, DriverUpdateArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Delete zero or more Drivers.
     * @param {DriverDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.driver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DriverDeleteManyArgs>(
      args?: SelectSubset<T, DriverDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DriverUpdateManyArgs>(
      args: SelectSubset<T, DriverUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Driver.
     * @param {DriverUpsertArgs} args - Arguments to update or create a Driver.
     * @example
     * // Update or create a Driver
     * const driver = await prisma.driver.upsert({
     *   create: {
     *     // ... data to create a Driver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Driver we want to update
     *   }
     * })
    **/
    upsert<T extends DriverUpsertArgs>(
      args: SelectSubset<T, DriverUpsertArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Find one Driver that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DriverFindUniqueOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DriverFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DriverFindUniqueOrThrowArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Find the first Driver that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DriverFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DriverFindFirstOrThrowArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.driver.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends DriverCountArgs>(
      args?: Subset<T, DriverCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriverAggregateArgs>(args: Subset<T, DriverAggregateArgs>): PrismaPromise<GetDriverAggregateType<T>>

    /**
     * Group by Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverGroupByArgs['orderBy'] }
        : { orderBy?: DriverGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Driver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DriverClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    bookings<T extends BookingFindManyArgs= {}>(args?: Subset<T, BookingFindManyArgs>): PrismaPromise<Array<BookingGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Driver base type for findUnique actions
   */
  export type DriverFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter, which Driver to fetch.
     * 
    **/
    where: DriverWhereUniqueInput
  }

  /**
   * Driver: findUnique
   */
  export interface DriverFindUniqueArgs extends DriverFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Driver base type for findFirst actions
   */
  export type DriverFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter, which Driver to fetch.
     * 
    **/
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     * 
    **/
    orderBy?: Enumerable<DriverOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     * 
    **/
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     * 
    **/
    distinct?: Enumerable<DriverScalarFieldEnum>
  }

  /**
   * Driver: findFirst
   */
  export interface DriverFindFirstArgs extends DriverFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Driver findMany
   */
  export type DriverFindManyArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter, which Drivers to fetch.
     * 
    **/
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     * 
    **/
    orderBy?: Enumerable<DriverOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drivers.
     * 
    **/
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DriverScalarFieldEnum>
  }


  /**
   * Driver create
   */
  export type DriverCreateArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * The data needed to create a Driver.
     * 
    **/
    data: XOR<DriverCreateInput, DriverUncheckedCreateInput>
  }


  /**
   * Driver createMany
   */
  export type DriverCreateManyArgs = {
    /**
     * The data used to create many Drivers.
     * 
    **/
    data: Enumerable<DriverCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Driver update
   */
  export type DriverUpdateArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * The data needed to update a Driver.
     * 
    **/
    data: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
    /**
     * Choose, which Driver to update.
     * 
    **/
    where: DriverWhereUniqueInput
  }


  /**
   * Driver updateMany
   */
  export type DriverUpdateManyArgs = {
    /**
     * The data used to update Drivers.
     * 
    **/
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     * 
    **/
    where?: DriverWhereInput
  }


  /**
   * Driver upsert
   */
  export type DriverUpsertArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * The filter to search for the Driver to update in case it exists.
     * 
    **/
    where: DriverWhereUniqueInput
    /**
     * In case the Driver found by the `where` argument doesn't exist, create a new Driver with this data.
     * 
    **/
    create: XOR<DriverCreateInput, DriverUncheckedCreateInput>
    /**
     * In case the Driver was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
  }


  /**
   * Driver delete
   */
  export type DriverDeleteArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter which Driver to delete.
     * 
    **/
    where: DriverWhereUniqueInput
  }


  /**
   * Driver deleteMany
   */
  export type DriverDeleteManyArgs = {
    /**
     * Filter which Drivers to delete
     * 
    **/
    where?: DriverWhereInput
  }


  /**
   * Driver: findUniqueOrThrow
   */
  export type DriverFindUniqueOrThrowArgs = DriverFindUniqueArgsBase
      

  /**
   * Driver: findFirstOrThrow
   */
  export type DriverFindFirstOrThrowArgs = DriverFindFirstArgsBase
      

  /**
   * Driver without action
   */
  export type DriverArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
  }



  /**
   * Model Trip
   */


  export type AggregateTrip = {
    _count: TripCountAggregateOutputType | null
    _avg: TripAvgAggregateOutputType | null
    _sum: TripSumAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  export type TripAvgAggregateOutputType = {
    progress: number | null
  }

  export type TripSumAggregateOutputType = {
    progress: number | null
  }

  export type TripMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    startDate: string | null
    endDate: string | null
    status: string | null
    progress: number | null
    countryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TripMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    startDate: string | null
    endDate: string | null
    status: string | null
    progress: number | null
    countryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TripCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    startDate: number
    endDate: number
    status: number
    progress: number
    countryId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TripAvgAggregateInputType = {
    progress?: true
  }

  export type TripSumAggregateInputType = {
    progress?: true
  }

  export type TripMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    startDate?: true
    endDate?: true
    status?: true
    progress?: true
    countryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TripMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    startDate?: true
    endDate?: true
    status?: true
    progress?: true
    countryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TripCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    startDate?: true
    endDate?: true
    status?: true
    progress?: true
    countryId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TripAggregateArgs = {
    /**
     * Filter which Trip to aggregate.
     * 
    **/
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     * 
    **/
    orderBy?: Enumerable<TripOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trips
    **/
    _count?: true | TripCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TripAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TripSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripMaxAggregateInputType
  }

  export type GetTripAggregateType<T extends TripAggregateArgs> = {
        [P in keyof T & keyof AggregateTrip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrip[P]>
      : GetScalarType<T[P], AggregateTrip[P]>
  }




  export type TripGroupByArgs = {
    where?: TripWhereInput
    orderBy?: Enumerable<TripOrderByWithAggregationInput>
    by: Array<TripScalarFieldEnum>
    having?: TripScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripCountAggregateInputType | true
    _avg?: TripAvgAggregateInputType
    _sum?: TripSumAggregateInputType
    _min?: TripMinAggregateInputType
    _max?: TripMaxAggregateInputType
  }


  export type TripGroupByOutputType = {
    id: string
    userId: string
    title: string
    startDate: string
    endDate: string
    status: string
    progress: number
    countryId: string
    createdAt: Date
    updatedAt: Date
    _count: TripCountAggregateOutputType | null
    _avg: TripAvgAggregateOutputType | null
    _sum: TripSumAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  type GetTripGroupByPayload<T extends TripGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TripGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripGroupByOutputType[P]>
            : GetScalarType<T[P], TripGroupByOutputType[P]>
        }
      >
    >


  export type TripSelect = {
    id?: boolean
    userId?: boolean
    title?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    progress?: boolean
    countryId?: boolean
    cities?: boolean | TripCityFindManyArgs
    packingList?: boolean | TripPackingItemFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | TripCountOutputTypeArgs
  }


  export type TripInclude = {
    cities?: boolean | TripCityFindManyArgs
    packingList?: boolean | TripPackingItemFindManyArgs
    _count?: boolean | TripCountOutputTypeArgs
  } 

  export type TripGetPayload<S extends boolean | null | undefined | TripArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Trip :
    S extends undefined ? never :
    S extends { include: any } & (TripArgs | TripFindManyArgs)
    ? Trip  & {
    [P in TrueKeys<S['include']>]:
        P extends 'cities' ? Array < TripCityGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'packingList' ? Array < TripPackingItemGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? TripCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (TripArgs | TripFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'cities' ? Array < TripCityGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'packingList' ? Array < TripPackingItemGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? TripCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Trip ? Trip[P] : never
  } 
      : Trip


  type TripCountArgs = Merge<
    Omit<TripFindManyArgs, 'select' | 'include'> & {
      select?: TripCountAggregateInputType | true
    }
  >

  export interface TripDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Trip that matches the filter.
     * @param {TripFindUniqueArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TripFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TripFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Trip'> extends True ? Prisma__TripClient<TripGetPayload<T>> : Prisma__TripClient<TripGetPayload<T> | null, null>

    /**
     * Find the first Trip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TripFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TripFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Trip'> extends True ? Prisma__TripClient<TripGetPayload<T>> : Prisma__TripClient<TripGetPayload<T> | null, null>

    /**
     * Find zero or more Trips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trips
     * const trips = await prisma.trip.findMany()
     * 
     * // Get first 10 Trips
     * const trips = await prisma.trip.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripWithIdOnly = await prisma.trip.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TripFindManyArgs>(
      args?: SelectSubset<T, TripFindManyArgs>
    ): PrismaPromise<Array<TripGetPayload<T>>>

    /**
     * Create a Trip.
     * @param {TripCreateArgs} args - Arguments to create a Trip.
     * @example
     * // Create one Trip
     * const Trip = await prisma.trip.create({
     *   data: {
     *     // ... data to create a Trip
     *   }
     * })
     * 
    **/
    create<T extends TripCreateArgs>(
      args: SelectSubset<T, TripCreateArgs>
    ): Prisma__TripClient<TripGetPayload<T>>

    /**
     * Create many Trips.
     *     @param {TripCreateManyArgs} args - Arguments to create many Trips.
     *     @example
     *     // Create many Trips
     *     const trip = await prisma.trip.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TripCreateManyArgs>(
      args?: SelectSubset<T, TripCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Trip.
     * @param {TripDeleteArgs} args - Arguments to delete one Trip.
     * @example
     * // Delete one Trip
     * const Trip = await prisma.trip.delete({
     *   where: {
     *     // ... filter to delete one Trip
     *   }
     * })
     * 
    **/
    delete<T extends TripDeleteArgs>(
      args: SelectSubset<T, TripDeleteArgs>
    ): Prisma__TripClient<TripGetPayload<T>>

    /**
     * Update one Trip.
     * @param {TripUpdateArgs} args - Arguments to update one Trip.
     * @example
     * // Update one Trip
     * const trip = await prisma.trip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TripUpdateArgs>(
      args: SelectSubset<T, TripUpdateArgs>
    ): Prisma__TripClient<TripGetPayload<T>>

    /**
     * Delete zero or more Trips.
     * @param {TripDeleteManyArgs} args - Arguments to filter Trips to delete.
     * @example
     * // Delete a few Trips
     * const { count } = await prisma.trip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TripDeleteManyArgs>(
      args?: SelectSubset<T, TripDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TripUpdateManyArgs>(
      args: SelectSubset<T, TripUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Trip.
     * @param {TripUpsertArgs} args - Arguments to update or create a Trip.
     * @example
     * // Update or create a Trip
     * const trip = await prisma.trip.upsert({
     *   create: {
     *     // ... data to create a Trip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trip we want to update
     *   }
     * })
    **/
    upsert<T extends TripUpsertArgs>(
      args: SelectSubset<T, TripUpsertArgs>
    ): Prisma__TripClient<TripGetPayload<T>>

    /**
     * Find one Trip that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TripFindUniqueOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TripFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TripFindUniqueOrThrowArgs>
    ): Prisma__TripClient<TripGetPayload<T>>

    /**
     * Find the first Trip that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TripFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TripFindFirstOrThrowArgs>
    ): Prisma__TripClient<TripGetPayload<T>>

    /**
     * Count the number of Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCountArgs} args - Arguments to filter Trips to count.
     * @example
     * // Count the number of Trips
     * const count = await prisma.trip.count({
     *   where: {
     *     // ... the filter for the Trips we want to count
     *   }
     * })
    **/
    count<T extends TripCountArgs>(
      args?: Subset<T, TripCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripAggregateArgs>(args: Subset<T, TripAggregateArgs>): PrismaPromise<GetTripAggregateType<T>>

    /**
     * Group by Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TripGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TripGroupByArgs['orderBy'] }
        : { orderBy?: TripGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TripGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Trip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TripClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    cities<T extends TripCityFindManyArgs= {}>(args?: Subset<T, TripCityFindManyArgs>): PrismaPromise<Array<TripCityGetPayload<T>>| Null>;

    packingList<T extends TripPackingItemFindManyArgs= {}>(args?: Subset<T, TripPackingItemFindManyArgs>): PrismaPromise<Array<TripPackingItemGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Trip base type for findUnique actions
   */
  export type TripFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Trip
     * 
    **/
    select?: TripSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripInclude | null
    /**
     * Filter, which Trip to fetch.
     * 
    **/
    where: TripWhereUniqueInput
  }

  /**
   * Trip: findUnique
   */
  export interface TripFindUniqueArgs extends TripFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Trip base type for findFirst actions
   */
  export type TripFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Trip
     * 
    **/
    select?: TripSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripInclude | null
    /**
     * Filter, which Trip to fetch.
     * 
    **/
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     * 
    **/
    orderBy?: Enumerable<TripOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trips.
     * 
    **/
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trips.
     * 
    **/
    distinct?: Enumerable<TripScalarFieldEnum>
  }

  /**
   * Trip: findFirst
   */
  export interface TripFindFirstArgs extends TripFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Trip findMany
   */
  export type TripFindManyArgs = {
    /**
     * Select specific fields to fetch from the Trip
     * 
    **/
    select?: TripSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripInclude | null
    /**
     * Filter, which Trips to fetch.
     * 
    **/
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     * 
    **/
    orderBy?: Enumerable<TripOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trips.
     * 
    **/
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TripScalarFieldEnum>
  }


  /**
   * Trip create
   */
  export type TripCreateArgs = {
    /**
     * Select specific fields to fetch from the Trip
     * 
    **/
    select?: TripSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripInclude | null
    /**
     * The data needed to create a Trip.
     * 
    **/
    data: XOR<TripCreateInput, TripUncheckedCreateInput>
  }


  /**
   * Trip createMany
   */
  export type TripCreateManyArgs = {
    /**
     * The data used to create many Trips.
     * 
    **/
    data: Enumerable<TripCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Trip update
   */
  export type TripUpdateArgs = {
    /**
     * Select specific fields to fetch from the Trip
     * 
    **/
    select?: TripSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripInclude | null
    /**
     * The data needed to update a Trip.
     * 
    **/
    data: XOR<TripUpdateInput, TripUncheckedUpdateInput>
    /**
     * Choose, which Trip to update.
     * 
    **/
    where: TripWhereUniqueInput
  }


  /**
   * Trip updateMany
   */
  export type TripUpdateManyArgs = {
    /**
     * The data used to update Trips.
     * 
    **/
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyInput>
    /**
     * Filter which Trips to update
     * 
    **/
    where?: TripWhereInput
  }


  /**
   * Trip upsert
   */
  export type TripUpsertArgs = {
    /**
     * Select specific fields to fetch from the Trip
     * 
    **/
    select?: TripSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripInclude | null
    /**
     * The filter to search for the Trip to update in case it exists.
     * 
    **/
    where: TripWhereUniqueInput
    /**
     * In case the Trip found by the `where` argument doesn't exist, create a new Trip with this data.
     * 
    **/
    create: XOR<TripCreateInput, TripUncheckedCreateInput>
    /**
     * In case the Trip was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TripUpdateInput, TripUncheckedUpdateInput>
  }


  /**
   * Trip delete
   */
  export type TripDeleteArgs = {
    /**
     * Select specific fields to fetch from the Trip
     * 
    **/
    select?: TripSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripInclude | null
    /**
     * Filter which Trip to delete.
     * 
    **/
    where: TripWhereUniqueInput
  }


  /**
   * Trip deleteMany
   */
  export type TripDeleteManyArgs = {
    /**
     * Filter which Trips to delete
     * 
    **/
    where?: TripWhereInput
  }


  /**
   * Trip: findUniqueOrThrow
   */
  export type TripFindUniqueOrThrowArgs = TripFindUniqueArgsBase
      

  /**
   * Trip: findFirstOrThrow
   */
  export type TripFindFirstOrThrowArgs = TripFindFirstArgsBase
      

  /**
   * Trip without action
   */
  export type TripArgs = {
    /**
     * Select specific fields to fetch from the Trip
     * 
    **/
    select?: TripSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripInclude | null
  }



  /**
   * Model TripCity
   */


  export type AggregateTripCity = {
    _count: TripCityCountAggregateOutputType | null
    _min: TripCityMinAggregateOutputType | null
    _max: TripCityMaxAggregateOutputType | null
  }

  export type TripCityMinAggregateOutputType = {
    id: string | null
    tripId: string | null
    cityId: string | null
    startDate: string | null
    endDate: string | null
  }

  export type TripCityMaxAggregateOutputType = {
    id: string | null
    tripId: string | null
    cityId: string | null
    startDate: string | null
    endDate: string | null
  }

  export type TripCityCountAggregateOutputType = {
    id: number
    tripId: number
    cityId: number
    startDate: number
    endDate: number
    _all: number
  }


  export type TripCityMinAggregateInputType = {
    id?: true
    tripId?: true
    cityId?: true
    startDate?: true
    endDate?: true
  }

  export type TripCityMaxAggregateInputType = {
    id?: true
    tripId?: true
    cityId?: true
    startDate?: true
    endDate?: true
  }

  export type TripCityCountAggregateInputType = {
    id?: true
    tripId?: true
    cityId?: true
    startDate?: true
    endDate?: true
    _all?: true
  }

  export type TripCityAggregateArgs = {
    /**
     * Filter which TripCity to aggregate.
     * 
    **/
    where?: TripCityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripCities to fetch.
     * 
    **/
    orderBy?: Enumerable<TripCityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TripCityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripCities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripCities.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TripCities
    **/
    _count?: true | TripCityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripCityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripCityMaxAggregateInputType
  }

  export type GetTripCityAggregateType<T extends TripCityAggregateArgs> = {
        [P in keyof T & keyof AggregateTripCity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTripCity[P]>
      : GetScalarType<T[P], AggregateTripCity[P]>
  }




  export type TripCityGroupByArgs = {
    where?: TripCityWhereInput
    orderBy?: Enumerable<TripCityOrderByWithAggregationInput>
    by: Array<TripCityScalarFieldEnum>
    having?: TripCityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripCityCountAggregateInputType | true
    _min?: TripCityMinAggregateInputType
    _max?: TripCityMaxAggregateInputType
  }


  export type TripCityGroupByOutputType = {
    id: string
    tripId: string
    cityId: string
    startDate: string
    endDate: string
    _count: TripCityCountAggregateOutputType | null
    _min: TripCityMinAggregateOutputType | null
    _max: TripCityMaxAggregateOutputType | null
  }

  type GetTripCityGroupByPayload<T extends TripCityGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TripCityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripCityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripCityGroupByOutputType[P]>
            : GetScalarType<T[P], TripCityGroupByOutputType[P]>
        }
      >
    >


  export type TripCitySelect = {
    id?: boolean
    tripId?: boolean
    trip?: boolean | TripArgs
    cityId?: boolean
    city?: boolean | CityArgs
    startDate?: boolean
    endDate?: boolean
    items?: boolean | TripItemFindManyArgs
    _count?: boolean | TripCityCountOutputTypeArgs
  }


  export type TripCityInclude = {
    trip?: boolean | TripArgs
    city?: boolean | CityArgs
    items?: boolean | TripItemFindManyArgs
    _count?: boolean | TripCityCountOutputTypeArgs
  } 

  export type TripCityGetPayload<S extends boolean | null | undefined | TripCityArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TripCity :
    S extends undefined ? never :
    S extends { include: any } & (TripCityArgs | TripCityFindManyArgs)
    ? TripCity  & {
    [P in TrueKeys<S['include']>]:
        P extends 'trip' ? TripGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'city' ? CityGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'items' ? Array < TripItemGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? TripCityCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (TripCityArgs | TripCityFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'trip' ? TripGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'city' ? CityGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'items' ? Array < TripItemGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? TripCityCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof TripCity ? TripCity[P] : never
  } 
      : TripCity


  type TripCityCountArgs = Merge<
    Omit<TripCityFindManyArgs, 'select' | 'include'> & {
      select?: TripCityCountAggregateInputType | true
    }
  >

  export interface TripCityDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one TripCity that matches the filter.
     * @param {TripCityFindUniqueArgs} args - Arguments to find a TripCity
     * @example
     * // Get one TripCity
     * const tripCity = await prisma.tripCity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TripCityFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TripCityFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TripCity'> extends True ? Prisma__TripCityClient<TripCityGetPayload<T>> : Prisma__TripCityClient<TripCityGetPayload<T> | null, null>

    /**
     * Find the first TripCity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCityFindFirstArgs} args - Arguments to find a TripCity
     * @example
     * // Get one TripCity
     * const tripCity = await prisma.tripCity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TripCityFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TripCityFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TripCity'> extends True ? Prisma__TripCityClient<TripCityGetPayload<T>> : Prisma__TripCityClient<TripCityGetPayload<T> | null, null>

    /**
     * Find zero or more TripCities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCityFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TripCities
     * const tripCities = await prisma.tripCity.findMany()
     * 
     * // Get first 10 TripCities
     * const tripCities = await prisma.tripCity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripCityWithIdOnly = await prisma.tripCity.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TripCityFindManyArgs>(
      args?: SelectSubset<T, TripCityFindManyArgs>
    ): PrismaPromise<Array<TripCityGetPayload<T>>>

    /**
     * Create a TripCity.
     * @param {TripCityCreateArgs} args - Arguments to create a TripCity.
     * @example
     * // Create one TripCity
     * const TripCity = await prisma.tripCity.create({
     *   data: {
     *     // ... data to create a TripCity
     *   }
     * })
     * 
    **/
    create<T extends TripCityCreateArgs>(
      args: SelectSubset<T, TripCityCreateArgs>
    ): Prisma__TripCityClient<TripCityGetPayload<T>>

    /**
     * Create many TripCities.
     *     @param {TripCityCreateManyArgs} args - Arguments to create many TripCities.
     *     @example
     *     // Create many TripCities
     *     const tripCity = await prisma.tripCity.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TripCityCreateManyArgs>(
      args?: SelectSubset<T, TripCityCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a TripCity.
     * @param {TripCityDeleteArgs} args - Arguments to delete one TripCity.
     * @example
     * // Delete one TripCity
     * const TripCity = await prisma.tripCity.delete({
     *   where: {
     *     // ... filter to delete one TripCity
     *   }
     * })
     * 
    **/
    delete<T extends TripCityDeleteArgs>(
      args: SelectSubset<T, TripCityDeleteArgs>
    ): Prisma__TripCityClient<TripCityGetPayload<T>>

    /**
     * Update one TripCity.
     * @param {TripCityUpdateArgs} args - Arguments to update one TripCity.
     * @example
     * // Update one TripCity
     * const tripCity = await prisma.tripCity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TripCityUpdateArgs>(
      args: SelectSubset<T, TripCityUpdateArgs>
    ): Prisma__TripCityClient<TripCityGetPayload<T>>

    /**
     * Delete zero or more TripCities.
     * @param {TripCityDeleteManyArgs} args - Arguments to filter TripCities to delete.
     * @example
     * // Delete a few TripCities
     * const { count } = await prisma.tripCity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TripCityDeleteManyArgs>(
      args?: SelectSubset<T, TripCityDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more TripCities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TripCities
     * const tripCity = await prisma.tripCity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TripCityUpdateManyArgs>(
      args: SelectSubset<T, TripCityUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one TripCity.
     * @param {TripCityUpsertArgs} args - Arguments to update or create a TripCity.
     * @example
     * // Update or create a TripCity
     * const tripCity = await prisma.tripCity.upsert({
     *   create: {
     *     // ... data to create a TripCity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TripCity we want to update
     *   }
     * })
    **/
    upsert<T extends TripCityUpsertArgs>(
      args: SelectSubset<T, TripCityUpsertArgs>
    ): Prisma__TripCityClient<TripCityGetPayload<T>>

    /**
     * Find one TripCity that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TripCityFindUniqueOrThrowArgs} args - Arguments to find a TripCity
     * @example
     * // Get one TripCity
     * const tripCity = await prisma.tripCity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TripCityFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TripCityFindUniqueOrThrowArgs>
    ): Prisma__TripCityClient<TripCityGetPayload<T>>

    /**
     * Find the first TripCity that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCityFindFirstOrThrowArgs} args - Arguments to find a TripCity
     * @example
     * // Get one TripCity
     * const tripCity = await prisma.tripCity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TripCityFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TripCityFindFirstOrThrowArgs>
    ): Prisma__TripCityClient<TripCityGetPayload<T>>

    /**
     * Count the number of TripCities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCityCountArgs} args - Arguments to filter TripCities to count.
     * @example
     * // Count the number of TripCities
     * const count = await prisma.tripCity.count({
     *   where: {
     *     // ... the filter for the TripCities we want to count
     *   }
     * })
    **/
    count<T extends TripCityCountArgs>(
      args?: Subset<T, TripCityCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripCityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TripCity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripCityAggregateArgs>(args: Subset<T, TripCityAggregateArgs>): PrismaPromise<GetTripCityAggregateType<T>>

    /**
     * Group by TripCity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TripCityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TripCityGroupByArgs['orderBy'] }
        : { orderBy?: TripCityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TripCityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripCityGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TripCity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TripCityClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    trip<T extends TripArgs= {}>(args?: Subset<T, TripArgs>): Prisma__TripClient<TripGetPayload<T> | Null>;

    city<T extends CityArgs= {}>(args?: Subset<T, CityArgs>): Prisma__CityClient<CityGetPayload<T> | Null>;

    items<T extends TripItemFindManyArgs= {}>(args?: Subset<T, TripItemFindManyArgs>): PrismaPromise<Array<TripItemGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TripCity base type for findUnique actions
   */
  export type TripCityFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TripCity
     * 
    **/
    select?: TripCitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripCityInclude | null
    /**
     * Filter, which TripCity to fetch.
     * 
    **/
    where: TripCityWhereUniqueInput
  }

  /**
   * TripCity: findUnique
   */
  export interface TripCityFindUniqueArgs extends TripCityFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TripCity base type for findFirst actions
   */
  export type TripCityFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TripCity
     * 
    **/
    select?: TripCitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripCityInclude | null
    /**
     * Filter, which TripCity to fetch.
     * 
    **/
    where?: TripCityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripCities to fetch.
     * 
    **/
    orderBy?: Enumerable<TripCityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TripCities.
     * 
    **/
    cursor?: TripCityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripCities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripCities.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TripCities.
     * 
    **/
    distinct?: Enumerable<TripCityScalarFieldEnum>
  }

  /**
   * TripCity: findFirst
   */
  export interface TripCityFindFirstArgs extends TripCityFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TripCity findMany
   */
  export type TripCityFindManyArgs = {
    /**
     * Select specific fields to fetch from the TripCity
     * 
    **/
    select?: TripCitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripCityInclude | null
    /**
     * Filter, which TripCities to fetch.
     * 
    **/
    where?: TripCityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripCities to fetch.
     * 
    **/
    orderBy?: Enumerable<TripCityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TripCities.
     * 
    **/
    cursor?: TripCityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripCities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripCities.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TripCityScalarFieldEnum>
  }


  /**
   * TripCity create
   */
  export type TripCityCreateArgs = {
    /**
     * Select specific fields to fetch from the TripCity
     * 
    **/
    select?: TripCitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripCityInclude | null
    /**
     * The data needed to create a TripCity.
     * 
    **/
    data: XOR<TripCityCreateInput, TripCityUncheckedCreateInput>
  }


  /**
   * TripCity createMany
   */
  export type TripCityCreateManyArgs = {
    /**
     * The data used to create many TripCities.
     * 
    **/
    data: Enumerable<TripCityCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TripCity update
   */
  export type TripCityUpdateArgs = {
    /**
     * Select specific fields to fetch from the TripCity
     * 
    **/
    select?: TripCitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripCityInclude | null
    /**
     * The data needed to update a TripCity.
     * 
    **/
    data: XOR<TripCityUpdateInput, TripCityUncheckedUpdateInput>
    /**
     * Choose, which TripCity to update.
     * 
    **/
    where: TripCityWhereUniqueInput
  }


  /**
   * TripCity updateMany
   */
  export type TripCityUpdateManyArgs = {
    /**
     * The data used to update TripCities.
     * 
    **/
    data: XOR<TripCityUpdateManyMutationInput, TripCityUncheckedUpdateManyInput>
    /**
     * Filter which TripCities to update
     * 
    **/
    where?: TripCityWhereInput
  }


  /**
   * TripCity upsert
   */
  export type TripCityUpsertArgs = {
    /**
     * Select specific fields to fetch from the TripCity
     * 
    **/
    select?: TripCitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripCityInclude | null
    /**
     * The filter to search for the TripCity to update in case it exists.
     * 
    **/
    where: TripCityWhereUniqueInput
    /**
     * In case the TripCity found by the `where` argument doesn't exist, create a new TripCity with this data.
     * 
    **/
    create: XOR<TripCityCreateInput, TripCityUncheckedCreateInput>
    /**
     * In case the TripCity was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TripCityUpdateInput, TripCityUncheckedUpdateInput>
  }


  /**
   * TripCity delete
   */
  export type TripCityDeleteArgs = {
    /**
     * Select specific fields to fetch from the TripCity
     * 
    **/
    select?: TripCitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripCityInclude | null
    /**
     * Filter which TripCity to delete.
     * 
    **/
    where: TripCityWhereUniqueInput
  }


  /**
   * TripCity deleteMany
   */
  export type TripCityDeleteManyArgs = {
    /**
     * Filter which TripCities to delete
     * 
    **/
    where?: TripCityWhereInput
  }


  /**
   * TripCity: findUniqueOrThrow
   */
  export type TripCityFindUniqueOrThrowArgs = TripCityFindUniqueArgsBase
      

  /**
   * TripCity: findFirstOrThrow
   */
  export type TripCityFindFirstOrThrowArgs = TripCityFindFirstArgsBase
      

  /**
   * TripCity without action
   */
  export type TripCityArgs = {
    /**
     * Select specific fields to fetch from the TripCity
     * 
    **/
    select?: TripCitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripCityInclude | null
  }



  /**
   * Model TripItem
   */


  export type AggregateTripItem = {
    _count: TripItemCountAggregateOutputType | null
    _min: TripItemMinAggregateOutputType | null
    _max: TripItemMaxAggregateOutputType | null
  }

  export type TripItemMinAggregateOutputType = {
    id: string | null
    tripCityId: string | null
    type: string | null
    date: string | null
    startTime: string | null
    endTime: string | null
    activityId: string | null
    eventId: string | null
  }

  export type TripItemMaxAggregateOutputType = {
    id: string | null
    tripCityId: string | null
    type: string | null
    date: string | null
    startTime: string | null
    endTime: string | null
    activityId: string | null
    eventId: string | null
  }

  export type TripItemCountAggregateOutputType = {
    id: number
    tripCityId: number
    type: number
    date: number
    startTime: number
    endTime: number
    activityId: number
    eventId: number
    _all: number
  }


  export type TripItemMinAggregateInputType = {
    id?: true
    tripCityId?: true
    type?: true
    date?: true
    startTime?: true
    endTime?: true
    activityId?: true
    eventId?: true
  }

  export type TripItemMaxAggregateInputType = {
    id?: true
    tripCityId?: true
    type?: true
    date?: true
    startTime?: true
    endTime?: true
    activityId?: true
    eventId?: true
  }

  export type TripItemCountAggregateInputType = {
    id?: true
    tripCityId?: true
    type?: true
    date?: true
    startTime?: true
    endTime?: true
    activityId?: true
    eventId?: true
    _all?: true
  }

  export type TripItemAggregateArgs = {
    /**
     * Filter which TripItem to aggregate.
     * 
    **/
    where?: TripItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripItems to fetch.
     * 
    **/
    orderBy?: Enumerable<TripItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TripItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TripItems
    **/
    _count?: true | TripItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripItemMaxAggregateInputType
  }

  export type GetTripItemAggregateType<T extends TripItemAggregateArgs> = {
        [P in keyof T & keyof AggregateTripItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTripItem[P]>
      : GetScalarType<T[P], AggregateTripItem[P]>
  }




  export type TripItemGroupByArgs = {
    where?: TripItemWhereInput
    orderBy?: Enumerable<TripItemOrderByWithAggregationInput>
    by: Array<TripItemScalarFieldEnum>
    having?: TripItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripItemCountAggregateInputType | true
    _min?: TripItemMinAggregateInputType
    _max?: TripItemMaxAggregateInputType
  }


  export type TripItemGroupByOutputType = {
    id: string
    tripCityId: string
    type: string
    date: string
    startTime: string | null
    endTime: string | null
    activityId: string | null
    eventId: string | null
    _count: TripItemCountAggregateOutputType | null
    _min: TripItemMinAggregateOutputType | null
    _max: TripItemMaxAggregateOutputType | null
  }

  type GetTripItemGroupByPayload<T extends TripItemGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TripItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripItemGroupByOutputType[P]>
            : GetScalarType<T[P], TripItemGroupByOutputType[P]>
        }
      >
    >


  export type TripItemSelect = {
    id?: boolean
    tripCityId?: boolean
    tripCity?: boolean | TripCityArgs
    type?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    activityId?: boolean
    activity?: boolean | ActivityArgs
    eventId?: boolean
    event?: boolean | CityEventArgs
  }


  export type TripItemInclude = {
    tripCity?: boolean | TripCityArgs
    activity?: boolean | ActivityArgs
    event?: boolean | CityEventArgs
  } 

  export type TripItemGetPayload<S extends boolean | null | undefined | TripItemArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TripItem :
    S extends undefined ? never :
    S extends { include: any } & (TripItemArgs | TripItemFindManyArgs)
    ? TripItem  & {
    [P in TrueKeys<S['include']>]:
        P extends 'tripCity' ? TripCityGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'activity' ? ActivityGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'event' ? CityEventGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : S extends { select: any } & (TripItemArgs | TripItemFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'tripCity' ? TripCityGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'activity' ? ActivityGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'event' ? CityEventGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof TripItem ? TripItem[P] : never
  } 
      : TripItem


  type TripItemCountArgs = Merge<
    Omit<TripItemFindManyArgs, 'select' | 'include'> & {
      select?: TripItemCountAggregateInputType | true
    }
  >

  export interface TripItemDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one TripItem that matches the filter.
     * @param {TripItemFindUniqueArgs} args - Arguments to find a TripItem
     * @example
     * // Get one TripItem
     * const tripItem = await prisma.tripItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TripItemFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TripItemFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TripItem'> extends True ? Prisma__TripItemClient<TripItemGetPayload<T>> : Prisma__TripItemClient<TripItemGetPayload<T> | null, null>

    /**
     * Find the first TripItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripItemFindFirstArgs} args - Arguments to find a TripItem
     * @example
     * // Get one TripItem
     * const tripItem = await prisma.tripItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TripItemFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TripItemFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TripItem'> extends True ? Prisma__TripItemClient<TripItemGetPayload<T>> : Prisma__TripItemClient<TripItemGetPayload<T> | null, null>

    /**
     * Find zero or more TripItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripItemFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TripItems
     * const tripItems = await prisma.tripItem.findMany()
     * 
     * // Get first 10 TripItems
     * const tripItems = await prisma.tripItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripItemWithIdOnly = await prisma.tripItem.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TripItemFindManyArgs>(
      args?: SelectSubset<T, TripItemFindManyArgs>
    ): PrismaPromise<Array<TripItemGetPayload<T>>>

    /**
     * Create a TripItem.
     * @param {TripItemCreateArgs} args - Arguments to create a TripItem.
     * @example
     * // Create one TripItem
     * const TripItem = await prisma.tripItem.create({
     *   data: {
     *     // ... data to create a TripItem
     *   }
     * })
     * 
    **/
    create<T extends TripItemCreateArgs>(
      args: SelectSubset<T, TripItemCreateArgs>
    ): Prisma__TripItemClient<TripItemGetPayload<T>>

    /**
     * Create many TripItems.
     *     @param {TripItemCreateManyArgs} args - Arguments to create many TripItems.
     *     @example
     *     // Create many TripItems
     *     const tripItem = await prisma.tripItem.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TripItemCreateManyArgs>(
      args?: SelectSubset<T, TripItemCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a TripItem.
     * @param {TripItemDeleteArgs} args - Arguments to delete one TripItem.
     * @example
     * // Delete one TripItem
     * const TripItem = await prisma.tripItem.delete({
     *   where: {
     *     // ... filter to delete one TripItem
     *   }
     * })
     * 
    **/
    delete<T extends TripItemDeleteArgs>(
      args: SelectSubset<T, TripItemDeleteArgs>
    ): Prisma__TripItemClient<TripItemGetPayload<T>>

    /**
     * Update one TripItem.
     * @param {TripItemUpdateArgs} args - Arguments to update one TripItem.
     * @example
     * // Update one TripItem
     * const tripItem = await prisma.tripItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TripItemUpdateArgs>(
      args: SelectSubset<T, TripItemUpdateArgs>
    ): Prisma__TripItemClient<TripItemGetPayload<T>>

    /**
     * Delete zero or more TripItems.
     * @param {TripItemDeleteManyArgs} args - Arguments to filter TripItems to delete.
     * @example
     * // Delete a few TripItems
     * const { count } = await prisma.tripItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TripItemDeleteManyArgs>(
      args?: SelectSubset<T, TripItemDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more TripItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TripItems
     * const tripItem = await prisma.tripItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TripItemUpdateManyArgs>(
      args: SelectSubset<T, TripItemUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one TripItem.
     * @param {TripItemUpsertArgs} args - Arguments to update or create a TripItem.
     * @example
     * // Update or create a TripItem
     * const tripItem = await prisma.tripItem.upsert({
     *   create: {
     *     // ... data to create a TripItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TripItem we want to update
     *   }
     * })
    **/
    upsert<T extends TripItemUpsertArgs>(
      args: SelectSubset<T, TripItemUpsertArgs>
    ): Prisma__TripItemClient<TripItemGetPayload<T>>

    /**
     * Find one TripItem that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TripItemFindUniqueOrThrowArgs} args - Arguments to find a TripItem
     * @example
     * // Get one TripItem
     * const tripItem = await prisma.tripItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TripItemFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TripItemFindUniqueOrThrowArgs>
    ): Prisma__TripItemClient<TripItemGetPayload<T>>

    /**
     * Find the first TripItem that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripItemFindFirstOrThrowArgs} args - Arguments to find a TripItem
     * @example
     * // Get one TripItem
     * const tripItem = await prisma.tripItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TripItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TripItemFindFirstOrThrowArgs>
    ): Prisma__TripItemClient<TripItemGetPayload<T>>

    /**
     * Count the number of TripItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripItemCountArgs} args - Arguments to filter TripItems to count.
     * @example
     * // Count the number of TripItems
     * const count = await prisma.tripItem.count({
     *   where: {
     *     // ... the filter for the TripItems we want to count
     *   }
     * })
    **/
    count<T extends TripItemCountArgs>(
      args?: Subset<T, TripItemCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TripItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripItemAggregateArgs>(args: Subset<T, TripItemAggregateArgs>): PrismaPromise<GetTripItemAggregateType<T>>

    /**
     * Group by TripItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TripItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TripItemGroupByArgs['orderBy'] }
        : { orderBy?: TripItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TripItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripItemGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TripItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TripItemClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    tripCity<T extends TripCityArgs= {}>(args?: Subset<T, TripCityArgs>): Prisma__TripCityClient<TripCityGetPayload<T> | Null>;

    activity<T extends ActivityArgs= {}>(args?: Subset<T, ActivityArgs>): Prisma__ActivityClient<ActivityGetPayload<T> | Null>;

    event<T extends CityEventArgs= {}>(args?: Subset<T, CityEventArgs>): Prisma__CityEventClient<CityEventGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TripItem base type for findUnique actions
   */
  export type TripItemFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TripItem
     * 
    **/
    select?: TripItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripItemInclude | null
    /**
     * Filter, which TripItem to fetch.
     * 
    **/
    where: TripItemWhereUniqueInput
  }

  /**
   * TripItem: findUnique
   */
  export interface TripItemFindUniqueArgs extends TripItemFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TripItem base type for findFirst actions
   */
  export type TripItemFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TripItem
     * 
    **/
    select?: TripItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripItemInclude | null
    /**
     * Filter, which TripItem to fetch.
     * 
    **/
    where?: TripItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripItems to fetch.
     * 
    **/
    orderBy?: Enumerable<TripItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TripItems.
     * 
    **/
    cursor?: TripItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TripItems.
     * 
    **/
    distinct?: Enumerable<TripItemScalarFieldEnum>
  }

  /**
   * TripItem: findFirst
   */
  export interface TripItemFindFirstArgs extends TripItemFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TripItem findMany
   */
  export type TripItemFindManyArgs = {
    /**
     * Select specific fields to fetch from the TripItem
     * 
    **/
    select?: TripItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripItemInclude | null
    /**
     * Filter, which TripItems to fetch.
     * 
    **/
    where?: TripItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripItems to fetch.
     * 
    **/
    orderBy?: Enumerable<TripItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TripItems.
     * 
    **/
    cursor?: TripItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripItems.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TripItemScalarFieldEnum>
  }


  /**
   * TripItem create
   */
  export type TripItemCreateArgs = {
    /**
     * Select specific fields to fetch from the TripItem
     * 
    **/
    select?: TripItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripItemInclude | null
    /**
     * The data needed to create a TripItem.
     * 
    **/
    data: XOR<TripItemCreateInput, TripItemUncheckedCreateInput>
  }


  /**
   * TripItem createMany
   */
  export type TripItemCreateManyArgs = {
    /**
     * The data used to create many TripItems.
     * 
    **/
    data: Enumerable<TripItemCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TripItem update
   */
  export type TripItemUpdateArgs = {
    /**
     * Select specific fields to fetch from the TripItem
     * 
    **/
    select?: TripItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripItemInclude | null
    /**
     * The data needed to update a TripItem.
     * 
    **/
    data: XOR<TripItemUpdateInput, TripItemUncheckedUpdateInput>
    /**
     * Choose, which TripItem to update.
     * 
    **/
    where: TripItemWhereUniqueInput
  }


  /**
   * TripItem updateMany
   */
  export type TripItemUpdateManyArgs = {
    /**
     * The data used to update TripItems.
     * 
    **/
    data: XOR<TripItemUpdateManyMutationInput, TripItemUncheckedUpdateManyInput>
    /**
     * Filter which TripItems to update
     * 
    **/
    where?: TripItemWhereInput
  }


  /**
   * TripItem upsert
   */
  export type TripItemUpsertArgs = {
    /**
     * Select specific fields to fetch from the TripItem
     * 
    **/
    select?: TripItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripItemInclude | null
    /**
     * The filter to search for the TripItem to update in case it exists.
     * 
    **/
    where: TripItemWhereUniqueInput
    /**
     * In case the TripItem found by the `where` argument doesn't exist, create a new TripItem with this data.
     * 
    **/
    create: XOR<TripItemCreateInput, TripItemUncheckedCreateInput>
    /**
     * In case the TripItem was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TripItemUpdateInput, TripItemUncheckedUpdateInput>
  }


  /**
   * TripItem delete
   */
  export type TripItemDeleteArgs = {
    /**
     * Select specific fields to fetch from the TripItem
     * 
    **/
    select?: TripItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripItemInclude | null
    /**
     * Filter which TripItem to delete.
     * 
    **/
    where: TripItemWhereUniqueInput
  }


  /**
   * TripItem deleteMany
   */
  export type TripItemDeleteManyArgs = {
    /**
     * Filter which TripItems to delete
     * 
    **/
    where?: TripItemWhereInput
  }


  /**
   * TripItem: findUniqueOrThrow
   */
  export type TripItemFindUniqueOrThrowArgs = TripItemFindUniqueArgsBase
      

  /**
   * TripItem: findFirstOrThrow
   */
  export type TripItemFindFirstOrThrowArgs = TripItemFindFirstArgsBase
      

  /**
   * TripItem without action
   */
  export type TripItemArgs = {
    /**
     * Select specific fields to fetch from the TripItem
     * 
    **/
    select?: TripItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripItemInclude | null
  }



  /**
   * Model TripPackingItem
   */


  export type AggregateTripPackingItem = {
    _count: TripPackingItemCountAggregateOutputType | null
    _min: TripPackingItemMinAggregateOutputType | null
    _max: TripPackingItemMaxAggregateOutputType | null
  }

  export type TripPackingItemMinAggregateOutputType = {
    id: string | null
    tripId: string | null
    cityId: string | null
    title: string | null
    description: string | null
    category: string | null
    isPacked: boolean | null
    referenceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TripPackingItemMaxAggregateOutputType = {
    id: string | null
    tripId: string | null
    cityId: string | null
    title: string | null
    description: string | null
    category: string | null
    isPacked: boolean | null
    referenceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TripPackingItemCountAggregateOutputType = {
    id: number
    tripId: number
    cityId: number
    title: number
    description: number
    category: number
    isPacked: number
    referenceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TripPackingItemMinAggregateInputType = {
    id?: true
    tripId?: true
    cityId?: true
    title?: true
    description?: true
    category?: true
    isPacked?: true
    referenceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TripPackingItemMaxAggregateInputType = {
    id?: true
    tripId?: true
    cityId?: true
    title?: true
    description?: true
    category?: true
    isPacked?: true
    referenceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TripPackingItemCountAggregateInputType = {
    id?: true
    tripId?: true
    cityId?: true
    title?: true
    description?: true
    category?: true
    isPacked?: true
    referenceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TripPackingItemAggregateArgs = {
    /**
     * Filter which TripPackingItem to aggregate.
     * 
    **/
    where?: TripPackingItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripPackingItems to fetch.
     * 
    **/
    orderBy?: Enumerable<TripPackingItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TripPackingItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripPackingItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripPackingItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TripPackingItems
    **/
    _count?: true | TripPackingItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripPackingItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripPackingItemMaxAggregateInputType
  }

  export type GetTripPackingItemAggregateType<T extends TripPackingItemAggregateArgs> = {
        [P in keyof T & keyof AggregateTripPackingItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTripPackingItem[P]>
      : GetScalarType<T[P], AggregateTripPackingItem[P]>
  }




  export type TripPackingItemGroupByArgs = {
    where?: TripPackingItemWhereInput
    orderBy?: Enumerable<TripPackingItemOrderByWithAggregationInput>
    by: Array<TripPackingItemScalarFieldEnum>
    having?: TripPackingItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripPackingItemCountAggregateInputType | true
    _min?: TripPackingItemMinAggregateInputType
    _max?: TripPackingItemMaxAggregateInputType
  }


  export type TripPackingItemGroupByOutputType = {
    id: string
    tripId: string
    cityId: string | null
    title: string
    description: string | null
    category: string
    isPacked: boolean
    referenceId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TripPackingItemCountAggregateOutputType | null
    _min: TripPackingItemMinAggregateOutputType | null
    _max: TripPackingItemMaxAggregateOutputType | null
  }

  type GetTripPackingItemGroupByPayload<T extends TripPackingItemGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TripPackingItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripPackingItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripPackingItemGroupByOutputType[P]>
            : GetScalarType<T[P], TripPackingItemGroupByOutputType[P]>
        }
      >
    >


  export type TripPackingItemSelect = {
    id?: boolean
    tripId?: boolean
    trip?: boolean | TripArgs
    cityId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    isPacked?: boolean
    referenceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type TripPackingItemInclude = {
    trip?: boolean | TripArgs
  } 

  export type TripPackingItemGetPayload<S extends boolean | null | undefined | TripPackingItemArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TripPackingItem :
    S extends undefined ? never :
    S extends { include: any } & (TripPackingItemArgs | TripPackingItemFindManyArgs)
    ? TripPackingItem  & {
    [P in TrueKeys<S['include']>]:
        P extends 'trip' ? TripGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : S extends { select: any } & (TripPackingItemArgs | TripPackingItemFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'trip' ? TripGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof TripPackingItem ? TripPackingItem[P] : never
  } 
      : TripPackingItem


  type TripPackingItemCountArgs = Merge<
    Omit<TripPackingItemFindManyArgs, 'select' | 'include'> & {
      select?: TripPackingItemCountAggregateInputType | true
    }
  >

  export interface TripPackingItemDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one TripPackingItem that matches the filter.
     * @param {TripPackingItemFindUniqueArgs} args - Arguments to find a TripPackingItem
     * @example
     * // Get one TripPackingItem
     * const tripPackingItem = await prisma.tripPackingItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TripPackingItemFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TripPackingItemFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TripPackingItem'> extends True ? Prisma__TripPackingItemClient<TripPackingItemGetPayload<T>> : Prisma__TripPackingItemClient<TripPackingItemGetPayload<T> | null, null>

    /**
     * Find the first TripPackingItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripPackingItemFindFirstArgs} args - Arguments to find a TripPackingItem
     * @example
     * // Get one TripPackingItem
     * const tripPackingItem = await prisma.tripPackingItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TripPackingItemFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TripPackingItemFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TripPackingItem'> extends True ? Prisma__TripPackingItemClient<TripPackingItemGetPayload<T>> : Prisma__TripPackingItemClient<TripPackingItemGetPayload<T> | null, null>

    /**
     * Find zero or more TripPackingItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripPackingItemFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TripPackingItems
     * const tripPackingItems = await prisma.tripPackingItem.findMany()
     * 
     * // Get first 10 TripPackingItems
     * const tripPackingItems = await prisma.tripPackingItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripPackingItemWithIdOnly = await prisma.tripPackingItem.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TripPackingItemFindManyArgs>(
      args?: SelectSubset<T, TripPackingItemFindManyArgs>
    ): PrismaPromise<Array<TripPackingItemGetPayload<T>>>

    /**
     * Create a TripPackingItem.
     * @param {TripPackingItemCreateArgs} args - Arguments to create a TripPackingItem.
     * @example
     * // Create one TripPackingItem
     * const TripPackingItem = await prisma.tripPackingItem.create({
     *   data: {
     *     // ... data to create a TripPackingItem
     *   }
     * })
     * 
    **/
    create<T extends TripPackingItemCreateArgs>(
      args: SelectSubset<T, TripPackingItemCreateArgs>
    ): Prisma__TripPackingItemClient<TripPackingItemGetPayload<T>>

    /**
     * Create many TripPackingItems.
     *     @param {TripPackingItemCreateManyArgs} args - Arguments to create many TripPackingItems.
     *     @example
     *     // Create many TripPackingItems
     *     const tripPackingItem = await prisma.tripPackingItem.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TripPackingItemCreateManyArgs>(
      args?: SelectSubset<T, TripPackingItemCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a TripPackingItem.
     * @param {TripPackingItemDeleteArgs} args - Arguments to delete one TripPackingItem.
     * @example
     * // Delete one TripPackingItem
     * const TripPackingItem = await prisma.tripPackingItem.delete({
     *   where: {
     *     // ... filter to delete one TripPackingItem
     *   }
     * })
     * 
    **/
    delete<T extends TripPackingItemDeleteArgs>(
      args: SelectSubset<T, TripPackingItemDeleteArgs>
    ): Prisma__TripPackingItemClient<TripPackingItemGetPayload<T>>

    /**
     * Update one TripPackingItem.
     * @param {TripPackingItemUpdateArgs} args - Arguments to update one TripPackingItem.
     * @example
     * // Update one TripPackingItem
     * const tripPackingItem = await prisma.tripPackingItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TripPackingItemUpdateArgs>(
      args: SelectSubset<T, TripPackingItemUpdateArgs>
    ): Prisma__TripPackingItemClient<TripPackingItemGetPayload<T>>

    /**
     * Delete zero or more TripPackingItems.
     * @param {TripPackingItemDeleteManyArgs} args - Arguments to filter TripPackingItems to delete.
     * @example
     * // Delete a few TripPackingItems
     * const { count } = await prisma.tripPackingItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TripPackingItemDeleteManyArgs>(
      args?: SelectSubset<T, TripPackingItemDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more TripPackingItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripPackingItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TripPackingItems
     * const tripPackingItem = await prisma.tripPackingItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TripPackingItemUpdateManyArgs>(
      args: SelectSubset<T, TripPackingItemUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one TripPackingItem.
     * @param {TripPackingItemUpsertArgs} args - Arguments to update or create a TripPackingItem.
     * @example
     * // Update or create a TripPackingItem
     * const tripPackingItem = await prisma.tripPackingItem.upsert({
     *   create: {
     *     // ... data to create a TripPackingItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TripPackingItem we want to update
     *   }
     * })
    **/
    upsert<T extends TripPackingItemUpsertArgs>(
      args: SelectSubset<T, TripPackingItemUpsertArgs>
    ): Prisma__TripPackingItemClient<TripPackingItemGetPayload<T>>

    /**
     * Find one TripPackingItem that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TripPackingItemFindUniqueOrThrowArgs} args - Arguments to find a TripPackingItem
     * @example
     * // Get one TripPackingItem
     * const tripPackingItem = await prisma.tripPackingItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TripPackingItemFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TripPackingItemFindUniqueOrThrowArgs>
    ): Prisma__TripPackingItemClient<TripPackingItemGetPayload<T>>

    /**
     * Find the first TripPackingItem that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripPackingItemFindFirstOrThrowArgs} args - Arguments to find a TripPackingItem
     * @example
     * // Get one TripPackingItem
     * const tripPackingItem = await prisma.tripPackingItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TripPackingItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TripPackingItemFindFirstOrThrowArgs>
    ): Prisma__TripPackingItemClient<TripPackingItemGetPayload<T>>

    /**
     * Count the number of TripPackingItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripPackingItemCountArgs} args - Arguments to filter TripPackingItems to count.
     * @example
     * // Count the number of TripPackingItems
     * const count = await prisma.tripPackingItem.count({
     *   where: {
     *     // ... the filter for the TripPackingItems we want to count
     *   }
     * })
    **/
    count<T extends TripPackingItemCountArgs>(
      args?: Subset<T, TripPackingItemCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripPackingItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TripPackingItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripPackingItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripPackingItemAggregateArgs>(args: Subset<T, TripPackingItemAggregateArgs>): PrismaPromise<GetTripPackingItemAggregateType<T>>

    /**
     * Group by TripPackingItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripPackingItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TripPackingItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TripPackingItemGroupByArgs['orderBy'] }
        : { orderBy?: TripPackingItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TripPackingItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripPackingItemGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TripPackingItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TripPackingItemClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    trip<T extends TripArgs= {}>(args?: Subset<T, TripArgs>): Prisma__TripClient<TripGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TripPackingItem base type for findUnique actions
   */
  export type TripPackingItemFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TripPackingItem
     * 
    **/
    select?: TripPackingItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripPackingItemInclude | null
    /**
     * Filter, which TripPackingItem to fetch.
     * 
    **/
    where: TripPackingItemWhereUniqueInput
  }

  /**
   * TripPackingItem: findUnique
   */
  export interface TripPackingItemFindUniqueArgs extends TripPackingItemFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TripPackingItem base type for findFirst actions
   */
  export type TripPackingItemFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TripPackingItem
     * 
    **/
    select?: TripPackingItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripPackingItemInclude | null
    /**
     * Filter, which TripPackingItem to fetch.
     * 
    **/
    where?: TripPackingItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripPackingItems to fetch.
     * 
    **/
    orderBy?: Enumerable<TripPackingItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TripPackingItems.
     * 
    **/
    cursor?: TripPackingItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripPackingItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripPackingItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TripPackingItems.
     * 
    **/
    distinct?: Enumerable<TripPackingItemScalarFieldEnum>
  }

  /**
   * TripPackingItem: findFirst
   */
  export interface TripPackingItemFindFirstArgs extends TripPackingItemFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TripPackingItem findMany
   */
  export type TripPackingItemFindManyArgs = {
    /**
     * Select specific fields to fetch from the TripPackingItem
     * 
    **/
    select?: TripPackingItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripPackingItemInclude | null
    /**
     * Filter, which TripPackingItems to fetch.
     * 
    **/
    where?: TripPackingItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripPackingItems to fetch.
     * 
    **/
    orderBy?: Enumerable<TripPackingItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TripPackingItems.
     * 
    **/
    cursor?: TripPackingItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripPackingItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripPackingItems.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TripPackingItemScalarFieldEnum>
  }


  /**
   * TripPackingItem create
   */
  export type TripPackingItemCreateArgs = {
    /**
     * Select specific fields to fetch from the TripPackingItem
     * 
    **/
    select?: TripPackingItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripPackingItemInclude | null
    /**
     * The data needed to create a TripPackingItem.
     * 
    **/
    data: XOR<TripPackingItemCreateInput, TripPackingItemUncheckedCreateInput>
  }


  /**
   * TripPackingItem createMany
   */
  export type TripPackingItemCreateManyArgs = {
    /**
     * The data used to create many TripPackingItems.
     * 
    **/
    data: Enumerable<TripPackingItemCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TripPackingItem update
   */
  export type TripPackingItemUpdateArgs = {
    /**
     * Select specific fields to fetch from the TripPackingItem
     * 
    **/
    select?: TripPackingItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripPackingItemInclude | null
    /**
     * The data needed to update a TripPackingItem.
     * 
    **/
    data: XOR<TripPackingItemUpdateInput, TripPackingItemUncheckedUpdateInput>
    /**
     * Choose, which TripPackingItem to update.
     * 
    **/
    where: TripPackingItemWhereUniqueInput
  }


  /**
   * TripPackingItem updateMany
   */
  export type TripPackingItemUpdateManyArgs = {
    /**
     * The data used to update TripPackingItems.
     * 
    **/
    data: XOR<TripPackingItemUpdateManyMutationInput, TripPackingItemUncheckedUpdateManyInput>
    /**
     * Filter which TripPackingItems to update
     * 
    **/
    where?: TripPackingItemWhereInput
  }


  /**
   * TripPackingItem upsert
   */
  export type TripPackingItemUpsertArgs = {
    /**
     * Select specific fields to fetch from the TripPackingItem
     * 
    **/
    select?: TripPackingItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripPackingItemInclude | null
    /**
     * The filter to search for the TripPackingItem to update in case it exists.
     * 
    **/
    where: TripPackingItemWhereUniqueInput
    /**
     * In case the TripPackingItem found by the `where` argument doesn't exist, create a new TripPackingItem with this data.
     * 
    **/
    create: XOR<TripPackingItemCreateInput, TripPackingItemUncheckedCreateInput>
    /**
     * In case the TripPackingItem was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TripPackingItemUpdateInput, TripPackingItemUncheckedUpdateInput>
  }


  /**
   * TripPackingItem delete
   */
  export type TripPackingItemDeleteArgs = {
    /**
     * Select specific fields to fetch from the TripPackingItem
     * 
    **/
    select?: TripPackingItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripPackingItemInclude | null
    /**
     * Filter which TripPackingItem to delete.
     * 
    **/
    where: TripPackingItemWhereUniqueInput
  }


  /**
   * TripPackingItem deleteMany
   */
  export type TripPackingItemDeleteManyArgs = {
    /**
     * Filter which TripPackingItems to delete
     * 
    **/
    where?: TripPackingItemWhereInput
  }


  /**
   * TripPackingItem: findUniqueOrThrow
   */
  export type TripPackingItemFindUniqueOrThrowArgs = TripPackingItemFindUniqueArgsBase
      

  /**
   * TripPackingItem: findFirstOrThrow
   */
  export type TripPackingItemFindFirstOrThrowArgs = TripPackingItemFindFirstArgsBase
      

  /**
   * TripPackingItem without action
   */
  export type TripPackingItemArgs = {
    /**
     * Select specific fields to fetch from the TripPackingItem
     * 
    **/
    select?: TripPackingItemSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TripPackingItemInclude | null
  }



  /**
   * Model Booking
   */


  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    price: number | null
  }

  export type BookingSumAggregateOutputType = {
    price: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    date: string | null
    status: string | null
    price: number | null
    currency: string | null
    activityId: string | null
    driverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    date: string | null
    status: string | null
    price: number | null
    currency: string | null
    activityId: string | null
    driverId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    date: number
    status: number
    price: number
    currency: number
    activityId: number
    driverId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    price?: true
  }

  export type BookingSumAggregateInputType = {
    price?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    date?: true
    status?: true
    price?: true
    currency?: true
    activityId?: true
    driverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    date?: true
    status?: true
    price?: true
    currency?: true
    activityId?: true
    driverId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    date?: true
    status?: true
    price?: true
    currency?: true
    activityId?: true
    driverId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs = {
    /**
     * Filter which Booking to aggregate.
     * 
    **/
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     * 
    **/
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs = {
    where?: BookingWhereInput
    orderBy?: Enumerable<BookingOrderByWithAggregationInput>
    by: Array<BookingScalarFieldEnum>
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }


  export type BookingGroupByOutputType = {
    id: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    activityId: string | null
    driverId: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect = {
    id?: boolean
    userId?: boolean
    type?: boolean
    date?: boolean
    status?: boolean
    price?: boolean
    currency?: boolean
    activityId?: boolean
    activity?: boolean | ActivityArgs
    driverId?: boolean
    driver?: boolean | DriverArgs
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type BookingInclude = {
    activity?: boolean | ActivityArgs
    driver?: boolean | DriverArgs
  } 

  export type BookingGetPayload<S extends boolean | null | undefined | BookingArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Booking :
    S extends undefined ? never :
    S extends { include: any } & (BookingArgs | BookingFindManyArgs)
    ? Booking  & {
    [P in TrueKeys<S['include']>]:
        P extends 'activity' ? ActivityGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'driver' ? DriverGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : S extends { select: any } & (BookingArgs | BookingFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
        P extends 'activity' ? ActivityGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'driver' ? DriverGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof Booking ? Booking[P] : never
  } 
      : Booking


  type BookingCountArgs = Merge<
    Omit<BookingFindManyArgs, 'select' | 'include'> & {
      select?: BookingCountAggregateInputType | true
    }
  >

  export interface BookingDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BookingFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BookingFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Booking'> extends True ? Prisma__BookingClient<BookingGetPayload<T>> : Prisma__BookingClient<BookingGetPayload<T> | null, null>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BookingFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BookingFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Booking'> extends True ? Prisma__BookingClient<BookingGetPayload<T>> : Prisma__BookingClient<BookingGetPayload<T> | null, null>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BookingFindManyArgs>(
      args?: SelectSubset<T, BookingFindManyArgs>
    ): PrismaPromise<Array<BookingGetPayload<T>>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
    **/
    create<T extends BookingCreateArgs>(
      args: SelectSubset<T, BookingCreateArgs>
    ): Prisma__BookingClient<BookingGetPayload<T>>

    /**
     * Create many Bookings.
     *     @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     *     @example
     *     // Create many Bookings
     *     const booking = await prisma.booking.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BookingCreateManyArgs>(
      args?: SelectSubset<T, BookingCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
    **/
    delete<T extends BookingDeleteArgs>(
      args: SelectSubset<T, BookingDeleteArgs>
    ): Prisma__BookingClient<BookingGetPayload<T>>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BookingUpdateArgs>(
      args: SelectSubset<T, BookingUpdateArgs>
    ): Prisma__BookingClient<BookingGetPayload<T>>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BookingDeleteManyArgs>(
      args?: SelectSubset<T, BookingDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BookingUpdateManyArgs>(
      args: SelectSubset<T, BookingUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
    **/
    upsert<T extends BookingUpsertArgs>(
      args: SelectSubset<T, BookingUpsertArgs>
    ): Prisma__BookingClient<BookingGetPayload<T>>

    /**
     * Find one Booking that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BookingFindUniqueOrThrowArgs>
    ): Prisma__BookingClient<BookingGetPayload<T>>

    /**
     * Find the first Booking that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BookingFindFirstOrThrowArgs>
    ): Prisma__BookingClient<BookingGetPayload<T>>

    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BookingClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    activity<T extends ActivityArgs= {}>(args?: Subset<T, ActivityArgs>): Prisma__ActivityClient<ActivityGetPayload<T> | Null>;

    driver<T extends DriverArgs= {}>(args?: Subset<T, DriverArgs>): Prisma__DriverClient<DriverGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Booking base type for findUnique actions
   */
  export type BookingFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Booking
     * 
    **/
    select?: BookingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BookingInclude | null
    /**
     * Filter, which Booking to fetch.
     * 
    **/
    where: BookingWhereUniqueInput
  }

  /**
   * Booking: findUnique
   */
  export interface BookingFindUniqueArgs extends BookingFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Booking base type for findFirst actions
   */
  export type BookingFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Booking
     * 
    **/
    select?: BookingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BookingInclude | null
    /**
     * Filter, which Booking to fetch.
     * 
    **/
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     * 
    **/
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     * 
    **/
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     * 
    **/
    distinct?: Enumerable<BookingScalarFieldEnum>
  }

  /**
   * Booking: findFirst
   */
  export interface BookingFindFirstArgs extends BookingFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs = {
    /**
     * Select specific fields to fetch from the Booking
     * 
    **/
    select?: BookingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BookingInclude | null
    /**
     * Filter, which Bookings to fetch.
     * 
    **/
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     * 
    **/
    orderBy?: Enumerable<BookingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     * 
    **/
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BookingScalarFieldEnum>
  }


  /**
   * Booking create
   */
  export type BookingCreateArgs = {
    /**
     * Select specific fields to fetch from the Booking
     * 
    **/
    select?: BookingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BookingInclude | null
    /**
     * The data needed to create a Booking.
     * 
    **/
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }


  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs = {
    /**
     * The data used to create many Bookings.
     * 
    **/
    data: Enumerable<BookingCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Booking update
   */
  export type BookingUpdateArgs = {
    /**
     * Select specific fields to fetch from the Booking
     * 
    **/
    select?: BookingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BookingInclude | null
    /**
     * The data needed to update a Booking.
     * 
    **/
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     * 
    **/
    where: BookingWhereUniqueInput
  }


  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs = {
    /**
     * The data used to update Bookings.
     * 
    **/
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     * 
    **/
    where?: BookingWhereInput
  }


  /**
   * Booking upsert
   */
  export type BookingUpsertArgs = {
    /**
     * Select specific fields to fetch from the Booking
     * 
    **/
    select?: BookingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BookingInclude | null
    /**
     * The filter to search for the Booking to update in case it exists.
     * 
    **/
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     * 
    **/
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }


  /**
   * Booking delete
   */
  export type BookingDeleteArgs = {
    /**
     * Select specific fields to fetch from the Booking
     * 
    **/
    select?: BookingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BookingInclude | null
    /**
     * Filter which Booking to delete.
     * 
    **/
    where: BookingWhereUniqueInput
  }


  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs = {
    /**
     * Filter which Bookings to delete
     * 
    **/
    where?: BookingWhereInput
  }


  /**
   * Booking: findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs = BookingFindUniqueArgsBase
      

  /**
   * Booking: findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs = BookingFindFirstArgsBase
      

  /**
   * Booking without action
   */
  export type BookingArgs = {
    /**
     * Select specific fields to fetch from the Booking
     * 
    **/
    select?: BookingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BookingInclude | null
  }



  /**
   * Model AppSettings
   */


  export type AggregateAppSettings = {
    _count: AppSettingsCountAggregateOutputType | null
    _avg: AppSettingsAvgAggregateOutputType | null
    _sum: AppSettingsSumAggregateOutputType | null
    _min: AppSettingsMinAggregateOutputType | null
    _max: AppSettingsMaxAggregateOutputType | null
  }

  export type AppSettingsAvgAggregateOutputType = {
    id: number | null
    standardCityPrice: number | null
  }

  export type AppSettingsSumAggregateOutputType = {
    id: number | null
    standardCityPrice: number | null
  }

  export type AppSettingsMinAggregateOutputType = {
    id: number | null
    standardCityPrice: number | null
    currency: string | null
  }

  export type AppSettingsMaxAggregateOutputType = {
    id: number | null
    standardCityPrice: number | null
    currency: string | null
  }

  export type AppSettingsCountAggregateOutputType = {
    id: number
    standardCityPrice: number
    currency: number
    _all: number
  }


  export type AppSettingsAvgAggregateInputType = {
    id?: true
    standardCityPrice?: true
  }

  export type AppSettingsSumAggregateInputType = {
    id?: true
    standardCityPrice?: true
  }

  export type AppSettingsMinAggregateInputType = {
    id?: true
    standardCityPrice?: true
    currency?: true
  }

  export type AppSettingsMaxAggregateInputType = {
    id?: true
    standardCityPrice?: true
    currency?: true
  }

  export type AppSettingsCountAggregateInputType = {
    id?: true
    standardCityPrice?: true
    currency?: true
    _all?: true
  }

  export type AppSettingsAggregateArgs = {
    /**
     * Filter which AppSettings to aggregate.
     * 
    **/
    where?: AppSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     * 
    **/
    orderBy?: Enumerable<AppSettingsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AppSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppSettings
    **/
    _count?: true | AppSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppSettingsMaxAggregateInputType
  }

  export type GetAppSettingsAggregateType<T extends AppSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateAppSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppSettings[P]>
      : GetScalarType<T[P], AggregateAppSettings[P]>
  }




  export type AppSettingsGroupByArgs = {
    where?: AppSettingsWhereInput
    orderBy?: Enumerable<AppSettingsOrderByWithAggregationInput>
    by: Array<AppSettingsScalarFieldEnum>
    having?: AppSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppSettingsCountAggregateInputType | true
    _avg?: AppSettingsAvgAggregateInputType
    _sum?: AppSettingsSumAggregateInputType
    _min?: AppSettingsMinAggregateInputType
    _max?: AppSettingsMaxAggregateInputType
  }


  export type AppSettingsGroupByOutputType = {
    id: number
    standardCityPrice: number
    currency: string
    _count: AppSettingsCountAggregateOutputType | null
    _avg: AppSettingsAvgAggregateOutputType | null
    _sum: AppSettingsSumAggregateOutputType | null
    _min: AppSettingsMinAggregateOutputType | null
    _max: AppSettingsMaxAggregateOutputType | null
  }

  type GetAppSettingsGroupByPayload<T extends AppSettingsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AppSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], AppSettingsGroupByOutputType[P]>
        }
      >
    >


  export type AppSettingsSelect = {
    id?: boolean
    standardCityPrice?: boolean
    currency?: boolean
  }


  export type AppSettingsGetPayload<S extends boolean | null | undefined | AppSettingsArgs, U = keyof S> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AppSettings :
    S extends undefined ? never :
    S extends { include: any } & (AppSettingsArgs | AppSettingsFindManyArgs)
    ? AppSettings 
    : S extends { select: any } & (AppSettingsArgs | AppSettingsFindManyArgs)
      ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof AppSettings ? AppSettings[P] : never
  } 
      : AppSettings


  type AppSettingsCountArgs = Merge<
    Omit<AppSettingsFindManyArgs, 'select' | 'include'> & {
      select?: AppSettingsCountAggregateInputType | true
    }
  >

  export interface AppSettingsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one AppSettings that matches the filter.
     * @param {AppSettingsFindUniqueArgs} args - Arguments to find a AppSettings
     * @example
     * // Get one AppSettings
     * const appSettings = await prisma.appSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AppSettingsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AppSettingsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AppSettings'> extends True ? Prisma__AppSettingsClient<AppSettingsGetPayload<T>> : Prisma__AppSettingsClient<AppSettingsGetPayload<T> | null, null>

    /**
     * Find the first AppSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsFindFirstArgs} args - Arguments to find a AppSettings
     * @example
     * // Get one AppSettings
     * const appSettings = await prisma.appSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AppSettingsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AppSettingsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AppSettings'> extends True ? Prisma__AppSettingsClient<AppSettingsGetPayload<T>> : Prisma__AppSettingsClient<AppSettingsGetPayload<T> | null, null>

    /**
     * Find zero or more AppSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppSettings
     * const appSettings = await prisma.appSettings.findMany()
     * 
     * // Get first 10 AppSettings
     * const appSettings = await prisma.appSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appSettingsWithIdOnly = await prisma.appSettings.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AppSettingsFindManyArgs>(
      args?: SelectSubset<T, AppSettingsFindManyArgs>
    ): PrismaPromise<Array<AppSettingsGetPayload<T>>>

    /**
     * Create a AppSettings.
     * @param {AppSettingsCreateArgs} args - Arguments to create a AppSettings.
     * @example
     * // Create one AppSettings
     * const AppSettings = await prisma.appSettings.create({
     *   data: {
     *     // ... data to create a AppSettings
     *   }
     * })
     * 
    **/
    create<T extends AppSettingsCreateArgs>(
      args: SelectSubset<T, AppSettingsCreateArgs>
    ): Prisma__AppSettingsClient<AppSettingsGetPayload<T>>

    /**
     * Create many AppSettings.
     *     @param {AppSettingsCreateManyArgs} args - Arguments to create many AppSettings.
     *     @example
     *     // Create many AppSettings
     *     const appSettings = await prisma.appSettings.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AppSettingsCreateManyArgs>(
      args?: SelectSubset<T, AppSettingsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AppSettings.
     * @param {AppSettingsDeleteArgs} args - Arguments to delete one AppSettings.
     * @example
     * // Delete one AppSettings
     * const AppSettings = await prisma.appSettings.delete({
     *   where: {
     *     // ... filter to delete one AppSettings
     *   }
     * })
     * 
    **/
    delete<T extends AppSettingsDeleteArgs>(
      args: SelectSubset<T, AppSettingsDeleteArgs>
    ): Prisma__AppSettingsClient<AppSettingsGetPayload<T>>

    /**
     * Update one AppSettings.
     * @param {AppSettingsUpdateArgs} args - Arguments to update one AppSettings.
     * @example
     * // Update one AppSettings
     * const appSettings = await prisma.appSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AppSettingsUpdateArgs>(
      args: SelectSubset<T, AppSettingsUpdateArgs>
    ): Prisma__AppSettingsClient<AppSettingsGetPayload<T>>

    /**
     * Delete zero or more AppSettings.
     * @param {AppSettingsDeleteManyArgs} args - Arguments to filter AppSettings to delete.
     * @example
     * // Delete a few AppSettings
     * const { count } = await prisma.appSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AppSettingsDeleteManyArgs>(
      args?: SelectSubset<T, AppSettingsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppSettings
     * const appSettings = await prisma.appSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AppSettingsUpdateManyArgs>(
      args: SelectSubset<T, AppSettingsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AppSettings.
     * @param {AppSettingsUpsertArgs} args - Arguments to update or create a AppSettings.
     * @example
     * // Update or create a AppSettings
     * const appSettings = await prisma.appSettings.upsert({
     *   create: {
     *     // ... data to create a AppSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppSettings we want to update
     *   }
     * })
    **/
    upsert<T extends AppSettingsUpsertArgs>(
      args: SelectSubset<T, AppSettingsUpsertArgs>
    ): Prisma__AppSettingsClient<AppSettingsGetPayload<T>>

    /**
     * Find one AppSettings that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {AppSettingsFindUniqueOrThrowArgs} args - Arguments to find a AppSettings
     * @example
     * // Get one AppSettings
     * const appSettings = await prisma.appSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AppSettingsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AppSettingsFindUniqueOrThrowArgs>
    ): Prisma__AppSettingsClient<AppSettingsGetPayload<T>>

    /**
     * Find the first AppSettings that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsFindFirstOrThrowArgs} args - Arguments to find a AppSettings
     * @example
     * // Get one AppSettings
     * const appSettings = await prisma.appSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AppSettingsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AppSettingsFindFirstOrThrowArgs>
    ): Prisma__AppSettingsClient<AppSettingsGetPayload<T>>

    /**
     * Count the number of AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsCountArgs} args - Arguments to filter AppSettings to count.
     * @example
     * // Count the number of AppSettings
     * const count = await prisma.appSettings.count({
     *   where: {
     *     // ... the filter for the AppSettings we want to count
     *   }
     * })
    **/
    count<T extends AppSettingsCountArgs>(
      args?: Subset<T, AppSettingsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppSettingsAggregateArgs>(args: Subset<T, AppSettingsAggregateArgs>): PrismaPromise<GetAppSettingsAggregateType<T>>

    /**
     * Group by AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppSettingsGroupByArgs['orderBy'] }
        : { orderBy?: AppSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppSettingsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AppSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AppSettingsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AppSettings base type for findUnique actions
   */
  export type AppSettingsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AppSettings
     * 
    **/
    select?: AppSettingsSelect | null
    /**
     * Filter, which AppSettings to fetch.
     * 
    **/
    where: AppSettingsWhereUniqueInput
  }

  /**
   * AppSettings: findUnique
   */
  export interface AppSettingsFindUniqueArgs extends AppSettingsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AppSettings base type for findFirst actions
   */
  export type AppSettingsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AppSettings
     * 
    **/
    select?: AppSettingsSelect | null
    /**
     * Filter, which AppSettings to fetch.
     * 
    **/
    where?: AppSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     * 
    **/
    orderBy?: Enumerable<AppSettingsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSettings.
     * 
    **/
    cursor?: AppSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSettings.
     * 
    **/
    distinct?: Enumerable<AppSettingsScalarFieldEnum>
  }

  /**
   * AppSettings: findFirst
   */
  export interface AppSettingsFindFirstArgs extends AppSettingsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AppSettings findMany
   */
  export type AppSettingsFindManyArgs = {
    /**
     * Select specific fields to fetch from the AppSettings
     * 
    **/
    select?: AppSettingsSelect | null
    /**
     * Filter, which AppSettings to fetch.
     * 
    **/
    where?: AppSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     * 
    **/
    orderBy?: Enumerable<AppSettingsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppSettings.
     * 
    **/
    cursor?: AppSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AppSettingsScalarFieldEnum>
  }


  /**
   * AppSettings create
   */
  export type AppSettingsCreateArgs = {
    /**
     * Select specific fields to fetch from the AppSettings
     * 
    **/
    select?: AppSettingsSelect | null
    /**
     * The data needed to create a AppSettings.
     * 
    **/
    data: XOR<AppSettingsCreateInput, AppSettingsUncheckedCreateInput>
  }


  /**
   * AppSettings createMany
   */
  export type AppSettingsCreateManyArgs = {
    /**
     * The data used to create many AppSettings.
     * 
    **/
    data: Enumerable<AppSettingsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AppSettings update
   */
  export type AppSettingsUpdateArgs = {
    /**
     * Select specific fields to fetch from the AppSettings
     * 
    **/
    select?: AppSettingsSelect | null
    /**
     * The data needed to update a AppSettings.
     * 
    **/
    data: XOR<AppSettingsUpdateInput, AppSettingsUncheckedUpdateInput>
    /**
     * Choose, which AppSettings to update.
     * 
    **/
    where: AppSettingsWhereUniqueInput
  }


  /**
   * AppSettings updateMany
   */
  export type AppSettingsUpdateManyArgs = {
    /**
     * The data used to update AppSettings.
     * 
    **/
    data: XOR<AppSettingsUpdateManyMutationInput, AppSettingsUncheckedUpdateManyInput>
    /**
     * Filter which AppSettings to update
     * 
    **/
    where?: AppSettingsWhereInput
  }


  /**
   * AppSettings upsert
   */
  export type AppSettingsUpsertArgs = {
    /**
     * Select specific fields to fetch from the AppSettings
     * 
    **/
    select?: AppSettingsSelect | null
    /**
     * The filter to search for the AppSettings to update in case it exists.
     * 
    **/
    where: AppSettingsWhereUniqueInput
    /**
     * In case the AppSettings found by the `where` argument doesn't exist, create a new AppSettings with this data.
     * 
    **/
    create: XOR<AppSettingsCreateInput, AppSettingsUncheckedCreateInput>
    /**
     * In case the AppSettings was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AppSettingsUpdateInput, AppSettingsUncheckedUpdateInput>
  }


  /**
   * AppSettings delete
   */
  export type AppSettingsDeleteArgs = {
    /**
     * Select specific fields to fetch from the AppSettings
     * 
    **/
    select?: AppSettingsSelect | null
    /**
     * Filter which AppSettings to delete.
     * 
    **/
    where: AppSettingsWhereUniqueInput
  }


  /**
   * AppSettings deleteMany
   */
  export type AppSettingsDeleteManyArgs = {
    /**
     * Filter which AppSettings to delete
     * 
    **/
    where?: AppSettingsWhereInput
  }


  /**
   * AppSettings: findUniqueOrThrow
   */
  export type AppSettingsFindUniqueOrThrowArgs = AppSettingsFindUniqueArgsBase
      

  /**
   * AppSettings: findFirstOrThrow
   */
  export type AppSettingsFindFirstOrThrowArgs = AppSettingsFindFirstArgsBase
      

  /**
   * AppSettings without action
   */
  export type AppSettingsArgs = {
    /**
     * Select specific fields to fetch from the AppSettings
     * 
    **/
    select?: AppSettingsSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const ActivityScalarFieldEnum: {
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
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const AppSettingsScalarFieldEnum: {
    id: 'id',
    standardCityPrice: 'standardCityPrice',
    currency: 'currency'
  };

  export type AppSettingsScalarFieldEnum = (typeof AppSettingsScalarFieldEnum)[keyof typeof AppSettingsScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    date: 'date',
    status: 'status',
    price: 'price',
    currency: 'currency',
    activityId: 'activityId',
    driverId: 'driverId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const CityApplicationScalarFieldEnum: {
    id: 'id',
    cityId: 'cityId',
    name: 'name',
    description: 'description',
    iconUrl: 'iconUrl',
    androidLink: 'androidLink',
    iphoneLink: 'iphoneLink',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CityApplicationScalarFieldEnum = (typeof CityApplicationScalarFieldEnum)[keyof typeof CityApplicationScalarFieldEnum]


  export const CityCarScalarFieldEnum: {
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
  };

  export type CityCarScalarFieldEnum = (typeof CityCarScalarFieldEnum)[keyof typeof CityCarScalarFieldEnum]


  export const CityDocumentScalarFieldEnum: {
    id: 'id',
    cityId: 'cityId',
    name: 'name',
    exampleUrl: 'exampleUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CityDocumentScalarFieldEnum = (typeof CityDocumentScalarFieldEnum)[keyof typeof CityDocumentScalarFieldEnum]


  export const CityEventScalarFieldEnum: {
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
  };

  export type CityEventScalarFieldEnum = (typeof CityEventScalarFieldEnum)[keyof typeof CityEventScalarFieldEnum]


  export const CityRecommendedItemScalarFieldEnum: {
    id: 'id',
    cityId: 'cityId',
    name: 'name',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CityRecommendedItemScalarFieldEnum = (typeof CityRecommendedItemScalarFieldEnum)[keyof typeof CityRecommendedItemScalarFieldEnum]


  export const CityScalarFieldEnum: {
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
  };

  export type CityScalarFieldEnum = (typeof CityScalarFieldEnum)[keyof typeof CityScalarFieldEnum]


  export const CityTipScalarFieldEnum: {
    id: 'id',
    cityId: 'cityId',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CityTipScalarFieldEnum = (typeof CityTipScalarFieldEnum)[keyof typeof CityTipScalarFieldEnum]


  export const CityTourGuideScalarFieldEnum: {
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
  };

  export type CityTourGuideScalarFieldEnum = (typeof CityTourGuideScalarFieldEnum)[keyof typeof CityTourGuideScalarFieldEnum]


  export const CountryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    continent: 'continent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CountryScalarFieldEnum = (typeof CountryScalarFieldEnum)[keyof typeof CountryScalarFieldEnum]


  export const DriverScalarFieldEnum: {
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
  };

  export type DriverScalarFieldEnum = (typeof DriverScalarFieldEnum)[keyof typeof DriverScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TripCityScalarFieldEnum: {
    id: 'id',
    tripId: 'tripId',
    cityId: 'cityId',
    startDate: 'startDate',
    endDate: 'endDate'
  };

  export type TripCityScalarFieldEnum = (typeof TripCityScalarFieldEnum)[keyof typeof TripCityScalarFieldEnum]


  export const TripItemScalarFieldEnum: {
    id: 'id',
    tripCityId: 'tripCityId',
    type: 'type',
    date: 'date',
    startTime: 'startTime',
    endTime: 'endTime',
    activityId: 'activityId',
    eventId: 'eventId'
  };

  export type TripItemScalarFieldEnum = (typeof TripItemScalarFieldEnum)[keyof typeof TripItemScalarFieldEnum]


  export const TripPackingItemScalarFieldEnum: {
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
  };

  export type TripPackingItemScalarFieldEnum = (typeof TripPackingItemScalarFieldEnum)[keyof typeof TripPackingItemScalarFieldEnum]


  export const TripScalarFieldEnum: {
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
  };

  export type TripScalarFieldEnum = (typeof TripScalarFieldEnum)[keyof typeof TripScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type CountryWhereInput = {
    AND?: Enumerable<CountryWhereInput>
    OR?: Enumerable<CountryWhereInput>
    NOT?: Enumerable<CountryWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    code?: StringNullableFilter | string | null
    continent?: StringNullableFilter | string | null
    cities?: CityListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CountryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    continent?: SortOrder
    cities?: CityOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountryWhereUniqueInput = {
    id?: string
    code?: string
  }

  export type CountryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    continent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CountryCountOrderByAggregateInput
    _max?: CountryMaxOrderByAggregateInput
    _min?: CountryMinOrderByAggregateInput
  }

  export type CountryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CountryScalarWhereWithAggregatesInput>
    OR?: Enumerable<CountryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CountryScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    code?: StringNullableWithAggregatesFilter | string | null
    continent?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CityWhereInput = {
    AND?: Enumerable<CityWhereInput>
    OR?: Enumerable<CityWhereInput>
    NOT?: Enumerable<CityWhereInput>
    id?: StringFilter | string
    countryId?: StringFilter | string
    country?: XOR<CountryRelationFilter, CountryWhereInput>
    name?: StringFilter | string
    lat?: FloatFilter | number
    lng?: FloatFilter | number
    images?: StringNullableListFilter
    timezone?: StringNullableFilter | string | null
    currency?: StringNullableFilter | string | null
    language?: StringNullableFilter | string | null
    tips?: CityTipListRelationFilter
    documents?: CityDocumentListRelationFilter
    recommendedItems?: CityRecommendedItemListRelationFilter
    events?: CityEventListRelationFilter
    cars?: CityCarListRelationFilter
    tourGuides?: CityTourGuideListRelationFilter
    applications?: CityApplicationListRelationFilter
    activities?: ActivityListRelationFilter
    drivers?: DriverListRelationFilter
    tripCities?: TripCityListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityOrderByWithRelationInput = {
    id?: SortOrder
    countryId?: SortOrder
    country?: CountryOrderByWithRelationInput
    name?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    images?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    tips?: CityTipOrderByRelationAggregateInput
    documents?: CityDocumentOrderByRelationAggregateInput
    recommendedItems?: CityRecommendedItemOrderByRelationAggregateInput
    events?: CityEventOrderByRelationAggregateInput
    cars?: CityCarOrderByRelationAggregateInput
    tourGuides?: CityTourGuideOrderByRelationAggregateInput
    applications?: CityApplicationOrderByRelationAggregateInput
    activities?: ActivityOrderByRelationAggregateInput
    drivers?: DriverOrderByRelationAggregateInput
    tripCities?: TripCityOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityWhereUniqueInput = {
    id?: string
  }

  export type CityOrderByWithAggregationInput = {
    id?: SortOrder
    countryId?: SortOrder
    name?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    images?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CityCountOrderByAggregateInput
    _avg?: CityAvgOrderByAggregateInput
    _max?: CityMaxOrderByAggregateInput
    _min?: CityMinOrderByAggregateInput
    _sum?: CitySumOrderByAggregateInput
  }

  export type CityScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CityScalarWhereWithAggregatesInput>
    OR?: Enumerable<CityScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CityScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    countryId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    lat?: FloatWithAggregatesFilter | number
    lng?: FloatWithAggregatesFilter | number
    images?: StringNullableListFilter
    timezone?: StringNullableWithAggregatesFilter | string | null
    currency?: StringNullableWithAggregatesFilter | string | null
    language?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CityTipWhereInput = {
    AND?: Enumerable<CityTipWhereInput>
    OR?: Enumerable<CityTipWhereInput>
    NOT?: Enumerable<CityTipWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    content?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityTipOrderByWithRelationInput = {
    id?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityTipWhereUniqueInput = {
    id?: string
  }

  export type CityTipOrderByWithAggregationInput = {
    id?: SortOrder
    cityId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CityTipCountOrderByAggregateInput
    _max?: CityTipMaxOrderByAggregateInput
    _min?: CityTipMinOrderByAggregateInput
  }

  export type CityTipScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CityTipScalarWhereWithAggregatesInput>
    OR?: Enumerable<CityTipScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CityTipScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    content?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CityDocumentWhereInput = {
    AND?: Enumerable<CityDocumentWhereInput>
    OR?: Enumerable<CityDocumentWhereInput>
    NOT?: Enumerable<CityDocumentWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    name?: StringFilter | string
    exampleUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityDocumentOrderByWithRelationInput = {
    id?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    name?: SortOrder
    exampleUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityDocumentWhereUniqueInput = {
    id?: string
  }

  export type CityDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    exampleUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CityDocumentCountOrderByAggregateInput
    _max?: CityDocumentMaxOrderByAggregateInput
    _min?: CityDocumentMinOrderByAggregateInput
  }

  export type CityDocumentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CityDocumentScalarWhereWithAggregatesInput>
    OR?: Enumerable<CityDocumentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CityDocumentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    exampleUrl?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CityRecommendedItemWhereInput = {
    AND?: Enumerable<CityRecommendedItemWhereInput>
    OR?: Enumerable<CityRecommendedItemWhereInput>
    NOT?: Enumerable<CityRecommendedItemWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    name?: StringFilter | string
    imageUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityRecommendedItemOrderByWithRelationInput = {
    id?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityRecommendedItemWhereUniqueInput = {
    id?: string
  }

  export type CityRecommendedItemOrderByWithAggregationInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CityRecommendedItemCountOrderByAggregateInput
    _max?: CityRecommendedItemMaxOrderByAggregateInput
    _min?: CityRecommendedItemMinOrderByAggregateInput
  }

  export type CityRecommendedItemScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CityRecommendedItemScalarWhereWithAggregatesInput>
    OR?: Enumerable<CityRecommendedItemScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CityRecommendedItemScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    imageUrl?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CityEventWhereInput = {
    AND?: Enumerable<CityEventWhereInput>
    OR?: Enumerable<CityEventWhereInput>
    NOT?: Enumerable<CityEventWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    title?: StringFilter | string
    description?: StringFilter | string
    date?: StringFilter | string
    location?: StringFilter | string
    lat?: FloatFilter | number
    lng?: FloatFilter | number
    imageUrl?: StringNullableFilter | string | null
    bookingUrl?: StringNullableFilter | string | null
    tripItems?: TripItemListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityEventOrderByWithRelationInput = {
    id?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    imageUrl?: SortOrder
    bookingUrl?: SortOrder
    tripItems?: TripItemOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityEventWhereUniqueInput = {
    id?: string
  }

  export type CityEventOrderByWithAggregationInput = {
    id?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    imageUrl?: SortOrder
    bookingUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CityEventCountOrderByAggregateInput
    _avg?: CityEventAvgOrderByAggregateInput
    _max?: CityEventMaxOrderByAggregateInput
    _min?: CityEventMinOrderByAggregateInput
    _sum?: CityEventSumOrderByAggregateInput
  }

  export type CityEventScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CityEventScalarWhereWithAggregatesInput>
    OR?: Enumerable<CityEventScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CityEventScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    date?: StringWithAggregatesFilter | string
    location?: StringWithAggregatesFilter | string
    lat?: FloatWithAggregatesFilter | number
    lng?: FloatWithAggregatesFilter | number
    imageUrl?: StringNullableWithAggregatesFilter | string | null
    bookingUrl?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CityCarWhereInput = {
    AND?: Enumerable<CityCarWhereInput>
    OR?: Enumerable<CityCarWhereInput>
    NOT?: Enumerable<CityCarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    name?: StringFilter | string
    type?: StringFilter | string
    pricePerDay?: FloatFilter | number
    transmission?: StringFilter | string
    fuel?: StringFilter | string
    contactInfo?: StringNullableFilter | string | null
    imageUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityCarOrderByWithRelationInput = {
    id?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    name?: SortOrder
    type?: SortOrder
    pricePerDay?: SortOrder
    transmission?: SortOrder
    fuel?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityCarWhereUniqueInput = {
    id?: string
  }

  export type CityCarOrderByWithAggregationInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    pricePerDay?: SortOrder
    transmission?: SortOrder
    fuel?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CityCarCountOrderByAggregateInput
    _avg?: CityCarAvgOrderByAggregateInput
    _max?: CityCarMaxOrderByAggregateInput
    _min?: CityCarMinOrderByAggregateInput
    _sum?: CityCarSumOrderByAggregateInput
  }

  export type CityCarScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CityCarScalarWhereWithAggregatesInput>
    OR?: Enumerable<CityCarScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CityCarScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    pricePerDay?: FloatWithAggregatesFilter | number
    transmission?: StringWithAggregatesFilter | string
    fuel?: StringWithAggregatesFilter | string
    contactInfo?: StringNullableWithAggregatesFilter | string | null
    imageUrl?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CityTourGuideWhereInput = {
    AND?: Enumerable<CityTourGuideWhereInput>
    OR?: Enumerable<CityTourGuideWhereInput>
    NOT?: Enumerable<CityTourGuideWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    name?: StringFilter | string
    bio?: StringFilter | string
    languages?: StringNullableListFilter
    pricePerHour?: FloatFilter | number
    rating?: FloatFilter | number
    contactInfo?: StringNullableFilter | string | null
    imageUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityTourGuideOrderByWithRelationInput = {
    id?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    name?: SortOrder
    bio?: SortOrder
    languages?: SortOrder
    pricePerHour?: SortOrder
    rating?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityTourGuideWhereUniqueInput = {
    id?: string
  }

  export type CityTourGuideOrderByWithAggregationInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    languages?: SortOrder
    pricePerHour?: SortOrder
    rating?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CityTourGuideCountOrderByAggregateInput
    _avg?: CityTourGuideAvgOrderByAggregateInput
    _max?: CityTourGuideMaxOrderByAggregateInput
    _min?: CityTourGuideMinOrderByAggregateInput
    _sum?: CityTourGuideSumOrderByAggregateInput
  }

  export type CityTourGuideScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CityTourGuideScalarWhereWithAggregatesInput>
    OR?: Enumerable<CityTourGuideScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CityTourGuideScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    bio?: StringWithAggregatesFilter | string
    languages?: StringNullableListFilter
    pricePerHour?: FloatWithAggregatesFilter | number
    rating?: FloatWithAggregatesFilter | number
    contactInfo?: StringNullableWithAggregatesFilter | string | null
    imageUrl?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type CityApplicationWhereInput = {
    AND?: Enumerable<CityApplicationWhereInput>
    OR?: Enumerable<CityApplicationWhereInput>
    NOT?: Enumerable<CityApplicationWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    name?: StringFilter | string
    description?: StringFilter | string
    iconUrl?: StringNullableFilter | string | null
    androidLink?: StringNullableFilter | string | null
    iphoneLink?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityApplicationOrderByWithRelationInput = {
    id?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    androidLink?: SortOrder
    iphoneLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityApplicationWhereUniqueInput = {
    id?: string
  }

  export type CityApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    androidLink?: SortOrder
    iphoneLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CityApplicationCountOrderByAggregateInput
    _max?: CityApplicationMaxOrderByAggregateInput
    _min?: CityApplicationMinOrderByAggregateInput
  }

  export type CityApplicationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CityApplicationScalarWhereWithAggregatesInput>
    OR?: Enumerable<CityApplicationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CityApplicationScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    iconUrl?: StringNullableWithAggregatesFilter | string | null
    androidLink?: StringNullableWithAggregatesFilter | string | null
    iphoneLink?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ActivityWhereInput = {
    AND?: Enumerable<ActivityWhereInput>
    OR?: Enumerable<ActivityWhereInput>
    NOT?: Enumerable<ActivityWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    price?: FloatNullableFilter | number | null
    currency?: StringNullableFilter | string | null
    lat?: FloatFilter | number
    lng?: FloatFilter | number
    images?: StringNullableListFilter
    tags?: StringNullableListFilter
    bookingUrl?: StringNullableFilter | string | null
    tripItems?: TripItemListRelationFilter
    bookings?: BookingListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    images?: SortOrder
    tags?: SortOrder
    bookingUrl?: SortOrder
    tripItems?: TripItemOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityWhereUniqueInput = {
    id?: string
  }

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    images?: SortOrder
    tags?: SortOrder
    bookingUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ActivityScalarWhereWithAggregatesInput>
    OR?: Enumerable<ActivityScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ActivityScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    price?: FloatNullableWithAggregatesFilter | number | null
    currency?: StringNullableWithAggregatesFilter | string | null
    lat?: FloatWithAggregatesFilter | number
    lng?: FloatWithAggregatesFilter | number
    images?: StringNullableListFilter
    tags?: StringNullableListFilter
    bookingUrl?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type DriverWhereInput = {
    AND?: Enumerable<DriverWhereInput>
    OR?: Enumerable<DriverWhereInput>
    NOT?: Enumerable<DriverWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    name?: StringFilter | string
    phone?: StringNullableFilter | string | null
    contactInfo?: StringNullableFilter | string | null
    pricePerDay?: FloatNullableFilter | number | null
    vehicleType?: StringNullableFilter | string | null
    rating?: FloatNullableFilter | number | null
    bookings?: BookingListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type DriverOrderByWithRelationInput = {
    id?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    name?: SortOrder
    phone?: SortOrder
    contactInfo?: SortOrder
    pricePerDay?: SortOrder
    vehicleType?: SortOrder
    rating?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverWhereUniqueInput = {
    id?: string
  }

  export type DriverOrderByWithAggregationInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    contactInfo?: SortOrder
    pricePerDay?: SortOrder
    vehicleType?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DriverCountOrderByAggregateInput
    _avg?: DriverAvgOrderByAggregateInput
    _max?: DriverMaxOrderByAggregateInput
    _min?: DriverMinOrderByAggregateInput
    _sum?: DriverSumOrderByAggregateInput
  }

  export type DriverScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DriverScalarWhereWithAggregatesInput>
    OR?: Enumerable<DriverScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DriverScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    phone?: StringNullableWithAggregatesFilter | string | null
    contactInfo?: StringNullableWithAggregatesFilter | string | null
    pricePerDay?: FloatNullableWithAggregatesFilter | number | null
    vehicleType?: StringNullableWithAggregatesFilter | string | null
    rating?: FloatNullableWithAggregatesFilter | number | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TripWhereInput = {
    AND?: Enumerable<TripWhereInput>
    OR?: Enumerable<TripWhereInput>
    NOT?: Enumerable<TripWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    title?: StringFilter | string
    startDate?: StringFilter | string
    endDate?: StringFilter | string
    status?: StringFilter | string
    progress?: FloatFilter | number
    countryId?: StringFilter | string
    cities?: TripCityListRelationFilter
    packingList?: TripPackingItemListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type TripOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    countryId?: SortOrder
    cities?: TripCityOrderByRelationAggregateInput
    packingList?: TripPackingItemOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripWhereUniqueInput = {
    id?: string
  }

  export type TripOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    countryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TripCountOrderByAggregateInput
    _avg?: TripAvgOrderByAggregateInput
    _max?: TripMaxOrderByAggregateInput
    _min?: TripMinOrderByAggregateInput
    _sum?: TripSumOrderByAggregateInput
  }

  export type TripScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TripScalarWhereWithAggregatesInput>
    OR?: Enumerable<TripScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TripScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    startDate?: StringWithAggregatesFilter | string
    endDate?: StringWithAggregatesFilter | string
    status?: StringWithAggregatesFilter | string
    progress?: FloatWithAggregatesFilter | number
    countryId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TripCityWhereInput = {
    AND?: Enumerable<TripCityWhereInput>
    OR?: Enumerable<TripCityWhereInput>
    NOT?: Enumerable<TripCityWhereInput>
    id?: StringFilter | string
    tripId?: StringFilter | string
    trip?: XOR<TripRelationFilter, TripWhereInput>
    cityId?: StringFilter | string
    city?: XOR<CityRelationFilter, CityWhereInput>
    startDate?: StringFilter | string
    endDate?: StringFilter | string
    items?: TripItemListRelationFilter
  }

  export type TripCityOrderByWithRelationInput = {
    id?: SortOrder
    tripId?: SortOrder
    trip?: TripOrderByWithRelationInput
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    startDate?: SortOrder
    endDate?: SortOrder
    items?: TripItemOrderByRelationAggregateInput
  }

  export type TripCityWhereUniqueInput = {
    id?: string
  }

  export type TripCityOrderByWithAggregationInput = {
    id?: SortOrder
    tripId?: SortOrder
    cityId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    _count?: TripCityCountOrderByAggregateInput
    _max?: TripCityMaxOrderByAggregateInput
    _min?: TripCityMinOrderByAggregateInput
  }

  export type TripCityScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TripCityScalarWhereWithAggregatesInput>
    OR?: Enumerable<TripCityScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TripCityScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    tripId?: StringWithAggregatesFilter | string
    cityId?: StringWithAggregatesFilter | string
    startDate?: StringWithAggregatesFilter | string
    endDate?: StringWithAggregatesFilter | string
  }

  export type TripItemWhereInput = {
    AND?: Enumerable<TripItemWhereInput>
    OR?: Enumerable<TripItemWhereInput>
    NOT?: Enumerable<TripItemWhereInput>
    id?: StringFilter | string
    tripCityId?: StringFilter | string
    tripCity?: XOR<TripCityRelationFilter, TripCityWhereInput>
    type?: StringFilter | string
    date?: StringFilter | string
    startTime?: StringNullableFilter | string | null
    endTime?: StringNullableFilter | string | null
    activityId?: StringNullableFilter | string | null
    activity?: XOR<ActivityRelationFilter, ActivityWhereInput> | null
    eventId?: StringNullableFilter | string | null
    event?: XOR<CityEventRelationFilter, CityEventWhereInput> | null
  }

  export type TripItemOrderByWithRelationInput = {
    id?: SortOrder
    tripCityId?: SortOrder
    tripCity?: TripCityOrderByWithRelationInput
    type?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    activityId?: SortOrder
    activity?: ActivityOrderByWithRelationInput
    eventId?: SortOrder
    event?: CityEventOrderByWithRelationInput
  }

  export type TripItemWhereUniqueInput = {
    id?: string
  }

  export type TripItemOrderByWithAggregationInput = {
    id?: SortOrder
    tripCityId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    activityId?: SortOrder
    eventId?: SortOrder
    _count?: TripItemCountOrderByAggregateInput
    _max?: TripItemMaxOrderByAggregateInput
    _min?: TripItemMinOrderByAggregateInput
  }

  export type TripItemScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TripItemScalarWhereWithAggregatesInput>
    OR?: Enumerable<TripItemScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TripItemScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    tripCityId?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    date?: StringWithAggregatesFilter | string
    startTime?: StringNullableWithAggregatesFilter | string | null
    endTime?: StringNullableWithAggregatesFilter | string | null
    activityId?: StringNullableWithAggregatesFilter | string | null
    eventId?: StringNullableWithAggregatesFilter | string | null
  }

  export type TripPackingItemWhereInput = {
    AND?: Enumerable<TripPackingItemWhereInput>
    OR?: Enumerable<TripPackingItemWhereInput>
    NOT?: Enumerable<TripPackingItemWhereInput>
    id?: StringFilter | string
    tripId?: StringFilter | string
    trip?: XOR<TripRelationFilter, TripWhereInput>
    cityId?: StringNullableFilter | string | null
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    category?: StringFilter | string
    isPacked?: BoolFilter | boolean
    referenceId?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type TripPackingItemOrderByWithRelationInput = {
    id?: SortOrder
    tripId?: SortOrder
    trip?: TripOrderByWithRelationInput
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isPacked?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripPackingItemWhereUniqueInput = {
    id?: string
  }

  export type TripPackingItemOrderByWithAggregationInput = {
    id?: SortOrder
    tripId?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isPacked?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TripPackingItemCountOrderByAggregateInput
    _max?: TripPackingItemMaxOrderByAggregateInput
    _min?: TripPackingItemMinOrderByAggregateInput
  }

  export type TripPackingItemScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TripPackingItemScalarWhereWithAggregatesInput>
    OR?: Enumerable<TripPackingItemScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TripPackingItemScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    tripId?: StringWithAggregatesFilter | string
    cityId?: StringNullableWithAggregatesFilter | string | null
    title?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    category?: StringWithAggregatesFilter | string
    isPacked?: BoolWithAggregatesFilter | boolean
    referenceId?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type BookingWhereInput = {
    AND?: Enumerable<BookingWhereInput>
    OR?: Enumerable<BookingWhereInput>
    NOT?: Enumerable<BookingWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    date?: StringFilter | string
    status?: StringFilter | string
    price?: FloatFilter | number
    currency?: StringFilter | string
    activityId?: StringNullableFilter | string | null
    activity?: XOR<ActivityRelationFilter, ActivityWhereInput> | null
    driverId?: StringNullableFilter | string | null
    driver?: XOR<DriverRelationFilter, DriverWhereInput> | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    activityId?: SortOrder
    activity?: ActivityOrderByWithRelationInput
    driverId?: SortOrder
    driver?: DriverOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingWhereUniqueInput = {
    id?: string
  }

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    activityId?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BookingScalarWhereWithAggregatesInput>
    OR?: Enumerable<BookingScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BookingScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    date?: StringWithAggregatesFilter | string
    status?: StringWithAggregatesFilter | string
    price?: FloatWithAggregatesFilter | number
    currency?: StringWithAggregatesFilter | string
    activityId?: StringNullableWithAggregatesFilter | string | null
    driverId?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type AppSettingsWhereInput = {
    AND?: Enumerable<AppSettingsWhereInput>
    OR?: Enumerable<AppSettingsWhereInput>
    NOT?: Enumerable<AppSettingsWhereInput>
    id?: IntFilter | number
    standardCityPrice?: FloatFilter | number
    currency?: StringFilter | string
  }

  export type AppSettingsOrderByWithRelationInput = {
    id?: SortOrder
    standardCityPrice?: SortOrder
    currency?: SortOrder
  }

  export type AppSettingsWhereUniqueInput = {
    id?: number
  }

  export type AppSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    standardCityPrice?: SortOrder
    currency?: SortOrder
    _count?: AppSettingsCountOrderByAggregateInput
    _avg?: AppSettingsAvgOrderByAggregateInput
    _max?: AppSettingsMaxOrderByAggregateInput
    _min?: AppSettingsMinOrderByAggregateInput
    _sum?: AppSettingsSumOrderByAggregateInput
  }

  export type AppSettingsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AppSettingsScalarWhereWithAggregatesInput>
    OR?: Enumerable<AppSettingsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AppSettingsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    standardCityPrice?: FloatWithAggregatesFilter | number
    currency?: StringWithAggregatesFilter | string
  }

  export type CountryCreateInput = {
    id?: string
    name: string
    code?: string | null
    continent?: string | null
    cities?: CityCreateNestedManyWithoutCountryInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountryUncheckedCreateInput = {
    id?: string
    name: string
    code?: string | null
    continent?: string | null
    cities?: CityUncheckedCreateNestedManyWithoutCountryInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    continent?: NullableStringFieldUpdateOperationsInput | string | null
    cities?: CityUpdateManyWithoutCountryNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    continent?: NullableStringFieldUpdateOperationsInput | string | null
    cities?: CityUncheckedUpdateManyWithoutCountryNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountryCreateManyInput = {
    id?: string
    name: string
    code?: string | null
    continent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    continent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    continent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateManyInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTipCreateInput = {
    id?: string
    city: CityCreateNestedOneWithoutTipsInput
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTipUncheckedCreateInput = {
    id?: string
    cityId: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutTipsNestedInput
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTipCreateManyInput = {
    id?: string
    cityId: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityDocumentCreateInput = {
    id?: string
    city: CityCreateNestedOneWithoutDocumentsInput
    name: string
    exampleUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityDocumentUncheckedCreateInput = {
    id?: string
    cityId: string
    name: string
    exampleUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutDocumentsNestedInput
    name?: StringFieldUpdateOperationsInput | string
    exampleUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exampleUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityDocumentCreateManyInput = {
    id?: string
    cityId: string
    name: string
    exampleUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exampleUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exampleUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityRecommendedItemCreateInput = {
    id?: string
    city: CityCreateNestedOneWithoutRecommendedItemsInput
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityRecommendedItemUncheckedCreateInput = {
    id?: string
    cityId: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityRecommendedItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutRecommendedItemsNestedInput
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityRecommendedItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityRecommendedItemCreateManyInput = {
    id?: string
    cityId: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityRecommendedItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityRecommendedItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityEventCreateInput = {
    id?: string
    city: CityCreateNestedOneWithoutEventsInput
    title: string
    description: string
    date: string
    location: string
    lat: number
    lng: number
    imageUrl?: string | null
    bookingUrl?: string | null
    tripItems?: TripItemCreateNestedManyWithoutEventInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityEventUncheckedCreateInput = {
    id?: string
    cityId: string
    title: string
    description: string
    date: string
    location: string
    lat: number
    lng: number
    imageUrl?: string | null
    bookingUrl?: string | null
    tripItems?: TripItemUncheckedCreateNestedManyWithoutEventInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutEventsNestedInput
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUpdateManyWithoutEventNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUncheckedUpdateManyWithoutEventNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityEventCreateManyInput = {
    id?: string
    cityId: string
    title: string
    description: string
    date: string
    location: string
    lat: number
    lng: number
    imageUrl?: string | null
    bookingUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCarCreateInput = {
    id?: string
    city: CityCreateNestedOneWithoutCarsInput
    name: string
    type: string
    pricePerDay: number
    transmission: string
    fuel: string
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCarUncheckedCreateInput = {
    id?: string
    cityId: string
    name: string
    type: string
    pricePerDay: number
    transmission: string
    fuel: string
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCarUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutCarsNestedInput
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    fuel?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCarUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    fuel?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCarCreateManyInput = {
    id?: string
    cityId: string
    name: string
    type: string
    pricePerDay: number
    transmission: string
    fuel: string
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCarUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    fuel?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCarUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    fuel?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTourGuideCreateInput = {
    id?: string
    city: CityCreateNestedOneWithoutTourGuidesInput
    name: string
    bio: string
    languages?: CityTourGuideCreatelanguagesInput | Enumerable<string>
    pricePerHour: number
    rating: number
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTourGuideUncheckedCreateInput = {
    id?: string
    cityId: string
    name: string
    bio: string
    languages?: CityTourGuideCreatelanguagesInput | Enumerable<string>
    pricePerHour: number
    rating: number
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTourGuideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutTourGuidesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    languages?: CityTourGuideUpdatelanguagesInput | Enumerable<string>
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTourGuideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    languages?: CityTourGuideUpdatelanguagesInput | Enumerable<string>
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTourGuideCreateManyInput = {
    id?: string
    cityId: string
    name: string
    bio: string
    languages?: CityTourGuideCreatelanguagesInput | Enumerable<string>
    pricePerHour: number
    rating: number
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTourGuideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    languages?: CityTourGuideUpdatelanguagesInput | Enumerable<string>
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTourGuideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    languages?: CityTourGuideUpdatelanguagesInput | Enumerable<string>
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityApplicationCreateInput = {
    id?: string
    city: CityCreateNestedOneWithoutApplicationsInput
    name: string
    description: string
    iconUrl?: string | null
    androidLink?: string | null
    iphoneLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityApplicationUncheckedCreateInput = {
    id?: string
    cityId: string
    name: string
    description: string
    iconUrl?: string | null
    androidLink?: string | null
    iphoneLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutApplicationsNestedInput
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    androidLink?: NullableStringFieldUpdateOperationsInput | string | null
    iphoneLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    androidLink?: NullableStringFieldUpdateOperationsInput | string | null
    iphoneLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityApplicationCreateManyInput = {
    id?: string
    cityId: string
    name: string
    description: string
    iconUrl?: string | null
    androidLink?: string | null
    iphoneLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    androidLink?: NullableStringFieldUpdateOperationsInput | string | null
    iphoneLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    androidLink?: NullableStringFieldUpdateOperationsInput | string | null
    iphoneLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateInput = {
    id?: string
    city: CityCreateNestedOneWithoutActivitiesInput
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    tripItems?: TripItemCreateNestedManyWithoutActivityInput
    bookings?: BookingCreateNestedManyWithoutActivityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    cityId: string
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    tripItems?: TripItemUncheckedCreateNestedManyWithoutActivityInput
    bookings?: BookingUncheckedCreateNestedManyWithoutActivityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutActivitiesNestedInput
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUpdateManyWithoutActivityNestedInput
    bookings?: BookingUpdateManyWithoutActivityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUncheckedUpdateManyWithoutActivityNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutActivityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyInput = {
    id?: string
    cityId: string
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverCreateInput = {
    id?: string
    city: CityCreateNestedOneWithoutDriversInput
    name: string
    phone?: string | null
    contactInfo?: string | null
    pricePerDay?: number | null
    vehicleType?: string | null
    rating?: number | null
    bookings?: BookingCreateNestedManyWithoutDriverInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverUncheckedCreateInput = {
    id?: string
    cityId: string
    name: string
    phone?: string | null
    contactInfo?: string | null
    pricePerDay?: number | null
    vehicleType?: string | null
    rating?: number | null
    bookings?: BookingUncheckedCreateNestedManyWithoutDriverInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutDriversNestedInput
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    pricePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    bookings?: BookingUpdateManyWithoutDriverNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    pricePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    bookings?: BookingUncheckedUpdateManyWithoutDriverNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverCreateManyInput = {
    id?: string
    cityId: string
    name: string
    phone?: string | null
    contactInfo?: string | null
    pricePerDay?: number | null
    vehicleType?: string | null
    rating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    pricePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    pricePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCreateInput = {
    id?: string
    userId: string
    title: string
    startDate: string
    endDate: string
    status: string
    progress?: number
    countryId: string
    cities?: TripCityCreateNestedManyWithoutTripInput
    packingList?: TripPackingItemCreateNestedManyWithoutTripInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    startDate: string
    endDate: string
    status: string
    progress?: number
    countryId: string
    cities?: TripCityUncheckedCreateNestedManyWithoutTripInput
    packingList?: TripPackingItemUncheckedCreateNestedManyWithoutTripInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    countryId?: StringFieldUpdateOperationsInput | string
    cities?: TripCityUpdateManyWithoutTripNestedInput
    packingList?: TripPackingItemUpdateManyWithoutTripNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    countryId?: StringFieldUpdateOperationsInput | string
    cities?: TripCityUncheckedUpdateManyWithoutTripNestedInput
    packingList?: TripPackingItemUncheckedUpdateManyWithoutTripNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCreateManyInput = {
    id?: string
    userId: string
    title: string
    startDate: string
    endDate: string
    status: string
    progress?: number
    countryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    countryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    countryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCityCreateInput = {
    id?: string
    trip: TripCreateNestedOneWithoutCitiesInput
    city: CityCreateNestedOneWithoutTripCitiesInput
    startDate: string
    endDate: string
    items?: TripItemCreateNestedManyWithoutTripCityInput
  }

  export type TripCityUncheckedCreateInput = {
    id?: string
    tripId: string
    cityId: string
    startDate: string
    endDate: string
    items?: TripItemUncheckedCreateNestedManyWithoutTripCityInput
  }

  export type TripCityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trip?: TripUpdateOneRequiredWithoutCitiesNestedInput
    city?: CityUpdateOneRequiredWithoutTripCitiesNestedInput
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    items?: TripItemUpdateManyWithoutTripCityNestedInput
  }

  export type TripCityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    items?: TripItemUncheckedUpdateManyWithoutTripCityNestedInput
  }

  export type TripCityCreateManyInput = {
    id?: string
    tripId: string
    cityId: string
    startDate: string
    endDate: string
  }

  export type TripCityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
  }

  export type TripCityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
  }

  export type TripItemCreateInput = {
    id?: string
    tripCity: TripCityCreateNestedOneWithoutItemsInput
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    activity?: ActivityCreateNestedOneWithoutTripItemsInput
    event?: CityEventCreateNestedOneWithoutTripItemsInput
  }

  export type TripItemUncheckedCreateInput = {
    id?: string
    tripCityId: string
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    activityId?: string | null
    eventId?: string | null
  }

  export type TripItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripCity?: TripCityUpdateOneRequiredWithoutItemsNestedInput
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    activity?: ActivityUpdateOneWithoutTripItemsNestedInput
    event?: CityEventUpdateOneWithoutTripItemsNestedInput
  }

  export type TripItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripCityId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripItemCreateManyInput = {
    id?: string
    tripCityId: string
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    activityId?: string | null
    eventId?: string | null
  }

  export type TripItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripCityId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripPackingItemCreateInput = {
    id?: string
    trip: TripCreateNestedOneWithoutPackingListInput
    cityId?: string | null
    title: string
    description?: string | null
    category: string
    isPacked?: boolean
    referenceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripPackingItemUncheckedCreateInput = {
    id?: string
    tripId: string
    cityId?: string | null
    title: string
    description?: string | null
    category: string
    isPacked?: boolean
    referenceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripPackingItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trip?: TripUpdateOneRequiredWithoutPackingListNestedInput
    cityId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPacked?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripPackingItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    cityId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPacked?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripPackingItemCreateManyInput = {
    id?: string
    tripId: string
    cityId?: string | null
    title: string
    description?: string | null
    category: string
    isPacked?: boolean
    referenceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripPackingItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPacked?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripPackingItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    cityId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPacked?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    activity?: ActivityCreateNestedOneWithoutBookingsInput
    driver?: DriverCreateNestedOneWithoutBookingsInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    activityId?: string | null
    driverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    activity?: ActivityUpdateOneWithoutBookingsNestedInput
    driver?: DriverUpdateOneWithoutBookingsNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    activityId?: NullableStringFieldUpdateOperationsInput | string | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyInput = {
    id?: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    activityId?: string | null
    driverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    activityId?: NullableStringFieldUpdateOperationsInput | string | null
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingsCreateInput = {
    id?: number
    standardCityPrice?: number
    currency?: string
  }

  export type AppSettingsUncheckedCreateInput = {
    id?: number
    standardCityPrice?: number
    currency?: string
  }

  export type AppSettingsUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    standardCityPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
  }

  export type AppSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    standardCityPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
  }

  export type AppSettingsCreateManyInput = {
    id?: number
    standardCityPrice?: number
    currency?: string
  }

  export type AppSettingsUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    standardCityPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
  }

  export type AppSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    standardCityPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type CityListRelationFilter = {
    every?: CityWhereInput
    some?: CityWhereInput
    none?: CityWhereInput
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type CityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CountryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    continent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    continent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    continent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type CountryRelationFilter = {
    is?: CountryWhereInput
    isNot?: CountryWhereInput
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type CityTipListRelationFilter = {
    every?: CityTipWhereInput
    some?: CityTipWhereInput
    none?: CityTipWhereInput
  }

  export type CityDocumentListRelationFilter = {
    every?: CityDocumentWhereInput
    some?: CityDocumentWhereInput
    none?: CityDocumentWhereInput
  }

  export type CityRecommendedItemListRelationFilter = {
    every?: CityRecommendedItemWhereInput
    some?: CityRecommendedItemWhereInput
    none?: CityRecommendedItemWhereInput
  }

  export type CityEventListRelationFilter = {
    every?: CityEventWhereInput
    some?: CityEventWhereInput
    none?: CityEventWhereInput
  }

  export type CityCarListRelationFilter = {
    every?: CityCarWhereInput
    some?: CityCarWhereInput
    none?: CityCarWhereInput
  }

  export type CityTourGuideListRelationFilter = {
    every?: CityTourGuideWhereInput
    some?: CityTourGuideWhereInput
    none?: CityTourGuideWhereInput
  }

  export type CityApplicationListRelationFilter = {
    every?: CityApplicationWhereInput
    some?: CityApplicationWhereInput
    none?: CityApplicationWhereInput
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type DriverListRelationFilter = {
    every?: DriverWhereInput
    some?: DriverWhereInput
    none?: DriverWhereInput
  }

  export type TripCityListRelationFilter = {
    every?: TripCityWhereInput
    some?: TripCityWhereInput
    none?: TripCityWhereInput
  }

  export type CityTipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CityDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CityRecommendedItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CityEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CityCarOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CityTourGuideOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CityApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DriverOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TripCityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CityCountOrderByAggregateInput = {
    id?: SortOrder
    countryId?: SortOrder
    name?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    images?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type CityMaxOrderByAggregateInput = {
    id?: SortOrder
    countryId?: SortOrder
    name?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityMinOrderByAggregateInput = {
    id?: SortOrder
    countryId?: SortOrder
    name?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CitySumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type CityRelationFilter = {
    is?: CityWhereInput
    isNot?: CityWhereInput
  }

  export type CityTipCountOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityTipMaxOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityTipMinOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    exampleUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    exampleUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    exampleUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityRecommendedItemCountOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityRecommendedItemMaxOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityRecommendedItemMinOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripItemListRelationFilter = {
    every?: TripItemWhereInput
    some?: TripItemWhereInput
    none?: TripItemWhereInput
  }

  export type TripItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CityEventCountOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    imageUrl?: SortOrder
    bookingUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityEventAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type CityEventMaxOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    imageUrl?: SortOrder
    bookingUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityEventMinOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    imageUrl?: SortOrder
    bookingUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityEventSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type CityCarCountOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    pricePerDay?: SortOrder
    transmission?: SortOrder
    fuel?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityCarAvgOrderByAggregateInput = {
    pricePerDay?: SortOrder
  }

  export type CityCarMaxOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    pricePerDay?: SortOrder
    transmission?: SortOrder
    fuel?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityCarMinOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    pricePerDay?: SortOrder
    transmission?: SortOrder
    fuel?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityCarSumOrderByAggregateInput = {
    pricePerDay?: SortOrder
  }

  export type CityTourGuideCountOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    languages?: SortOrder
    pricePerHour?: SortOrder
    rating?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityTourGuideAvgOrderByAggregateInput = {
    pricePerHour?: SortOrder
    rating?: SortOrder
  }

  export type CityTourGuideMaxOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    pricePerHour?: SortOrder
    rating?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityTourGuideMinOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    pricePerHour?: SortOrder
    rating?: SortOrder
    contactInfo?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityTourGuideSumOrderByAggregateInput = {
    pricePerHour?: SortOrder
    rating?: SortOrder
  }

  export type CityApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    androidLink?: SortOrder
    iphoneLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    androidLink?: SortOrder
    iphoneLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CityApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    iconUrl?: SortOrder
    androidLink?: SortOrder
    iphoneLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    images?: SortOrder
    tags?: SortOrder
    bookingUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    price?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    bookingUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    bookingUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    price?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type DriverCountOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    contactInfo?: SortOrder
    pricePerDay?: SortOrder
    vehicleType?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverAvgOrderByAggregateInput = {
    pricePerDay?: SortOrder
    rating?: SortOrder
  }

  export type DriverMaxOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    contactInfo?: SortOrder
    pricePerDay?: SortOrder
    vehicleType?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverMinOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    contactInfo?: SortOrder
    pricePerDay?: SortOrder
    vehicleType?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverSumOrderByAggregateInput = {
    pricePerDay?: SortOrder
    rating?: SortOrder
  }

  export type TripPackingItemListRelationFilter = {
    every?: TripPackingItemWhereInput
    some?: TripPackingItemWhereInput
    none?: TripPackingItemWhereInput
  }

  export type TripPackingItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TripCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    countryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type TripMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    countryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    countryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripSumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type TripRelationFilter = {
    is?: TripWhereInput
    isNot?: TripWhereInput
  }

  export type TripCityCountOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    cityId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type TripCityMaxOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    cityId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type TripCityMinOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    cityId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
  }

  export type TripCityRelationFilter = {
    is?: TripCityWhereInput
    isNot?: TripCityWhereInput
  }

  export type ActivityRelationFilter = {
    is?: ActivityWhereInput | null
    isNot?: ActivityWhereInput | null
  }

  export type CityEventRelationFilter = {
    is?: CityEventWhereInput | null
    isNot?: CityEventWhereInput | null
  }

  export type TripItemCountOrderByAggregateInput = {
    id?: SortOrder
    tripCityId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    activityId?: SortOrder
    eventId?: SortOrder
  }

  export type TripItemMaxOrderByAggregateInput = {
    id?: SortOrder
    tripCityId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    activityId?: SortOrder
    eventId?: SortOrder
  }

  export type TripItemMinOrderByAggregateInput = {
    id?: SortOrder
    tripCityId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    activityId?: SortOrder
    eventId?: SortOrder
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type TripPackingItemCountOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isPacked?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripPackingItemMaxOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isPacked?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TripPackingItemMinOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    cityId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isPacked?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DriverRelationFilter = {
    is?: DriverWhereInput | null
    isNot?: DriverWhereInput | null
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    activityId?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    activityId?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    date?: SortOrder
    status?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    activityId?: SortOrder
    driverId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type AppSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    standardCityPrice?: SortOrder
    currency?: SortOrder
  }

  export type AppSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    standardCityPrice?: SortOrder
  }

  export type AppSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    standardCityPrice?: SortOrder
    currency?: SortOrder
  }

  export type AppSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    standardCityPrice?: SortOrder
    currency?: SortOrder
  }

  export type AppSettingsSumOrderByAggregateInput = {
    id?: SortOrder
    standardCityPrice?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type CityCreateNestedManyWithoutCountryInput = {
    create?: XOR<Enumerable<CityCreateWithoutCountryInput>, Enumerable<CityUncheckedCreateWithoutCountryInput>>
    connectOrCreate?: Enumerable<CityCreateOrConnectWithoutCountryInput>
    createMany?: CityCreateManyCountryInputEnvelope
    connect?: Enumerable<CityWhereUniqueInput>
  }

  export type CityUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<Enumerable<CityCreateWithoutCountryInput>, Enumerable<CityUncheckedCreateWithoutCountryInput>>
    connectOrCreate?: Enumerable<CityCreateOrConnectWithoutCountryInput>
    createMany?: CityCreateManyCountryInputEnvelope
    connect?: Enumerable<CityWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CityUpdateManyWithoutCountryNestedInput = {
    create?: XOR<Enumerable<CityCreateWithoutCountryInput>, Enumerable<CityUncheckedCreateWithoutCountryInput>>
    connectOrCreate?: Enumerable<CityCreateOrConnectWithoutCountryInput>
    upsert?: Enumerable<CityUpsertWithWhereUniqueWithoutCountryInput>
    createMany?: CityCreateManyCountryInputEnvelope
    set?: Enumerable<CityWhereUniqueInput>
    disconnect?: Enumerable<CityWhereUniqueInput>
    delete?: Enumerable<CityWhereUniqueInput>
    connect?: Enumerable<CityWhereUniqueInput>
    update?: Enumerable<CityUpdateWithWhereUniqueWithoutCountryInput>
    updateMany?: Enumerable<CityUpdateManyWithWhereWithoutCountryInput>
    deleteMany?: Enumerable<CityScalarWhereInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CityUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<Enumerable<CityCreateWithoutCountryInput>, Enumerable<CityUncheckedCreateWithoutCountryInput>>
    connectOrCreate?: Enumerable<CityCreateOrConnectWithoutCountryInput>
    upsert?: Enumerable<CityUpsertWithWhereUniqueWithoutCountryInput>
    createMany?: CityCreateManyCountryInputEnvelope
    set?: Enumerable<CityWhereUniqueInput>
    disconnect?: Enumerable<CityWhereUniqueInput>
    delete?: Enumerable<CityWhereUniqueInput>
    connect?: Enumerable<CityWhereUniqueInput>
    update?: Enumerable<CityUpdateWithWhereUniqueWithoutCountryInput>
    updateMany?: Enumerable<CityUpdateManyWithWhereWithoutCountryInput>
    deleteMany?: Enumerable<CityScalarWhereInput>
  }

  export type CountryCreateNestedOneWithoutCitiesInput = {
    create?: XOR<CountryCreateWithoutCitiesInput, CountryUncheckedCreateWithoutCitiesInput>
    connectOrCreate?: CountryCreateOrConnectWithoutCitiesInput
    connect?: CountryWhereUniqueInput
  }

  export type CityCreateimagesInput = {
    set: Enumerable<string>
  }

  export type CityTipCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityTipCreateWithoutCityInput>, Enumerable<CityTipUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityTipCreateOrConnectWithoutCityInput>
    createMany?: CityTipCreateManyCityInputEnvelope
    connect?: Enumerable<CityTipWhereUniqueInput>
  }

  export type CityDocumentCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityDocumentCreateWithoutCityInput>, Enumerable<CityDocumentUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityDocumentCreateOrConnectWithoutCityInput>
    createMany?: CityDocumentCreateManyCityInputEnvelope
    connect?: Enumerable<CityDocumentWhereUniqueInput>
  }

  export type CityRecommendedItemCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityRecommendedItemCreateWithoutCityInput>, Enumerable<CityRecommendedItemUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityRecommendedItemCreateOrConnectWithoutCityInput>
    createMany?: CityRecommendedItemCreateManyCityInputEnvelope
    connect?: Enumerable<CityRecommendedItemWhereUniqueInput>
  }

  export type CityEventCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityEventCreateWithoutCityInput>, Enumerable<CityEventUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityEventCreateOrConnectWithoutCityInput>
    createMany?: CityEventCreateManyCityInputEnvelope
    connect?: Enumerable<CityEventWhereUniqueInput>
  }

  export type CityCarCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityCarCreateWithoutCityInput>, Enumerable<CityCarUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityCarCreateOrConnectWithoutCityInput>
    createMany?: CityCarCreateManyCityInputEnvelope
    connect?: Enumerable<CityCarWhereUniqueInput>
  }

  export type CityTourGuideCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityTourGuideCreateWithoutCityInput>, Enumerable<CityTourGuideUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityTourGuideCreateOrConnectWithoutCityInput>
    createMany?: CityTourGuideCreateManyCityInputEnvelope
    connect?: Enumerable<CityTourGuideWhereUniqueInput>
  }

  export type CityApplicationCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityApplicationCreateWithoutCityInput>, Enumerable<CityApplicationUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityApplicationCreateOrConnectWithoutCityInput>
    createMany?: CityApplicationCreateManyCityInputEnvelope
    connect?: Enumerable<CityApplicationWhereUniqueInput>
  }

  export type ActivityCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<ActivityCreateWithoutCityInput>, Enumerable<ActivityUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<ActivityCreateOrConnectWithoutCityInput>
    createMany?: ActivityCreateManyCityInputEnvelope
    connect?: Enumerable<ActivityWhereUniqueInput>
  }

  export type DriverCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<DriverCreateWithoutCityInput>, Enumerable<DriverUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<DriverCreateOrConnectWithoutCityInput>
    createMany?: DriverCreateManyCityInputEnvelope
    connect?: Enumerable<DriverWhereUniqueInput>
  }

  export type TripCityCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<TripCityCreateWithoutCityInput>, Enumerable<TripCityUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<TripCityCreateOrConnectWithoutCityInput>
    createMany?: TripCityCreateManyCityInputEnvelope
    connect?: Enumerable<TripCityWhereUniqueInput>
  }

  export type CityTipUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityTipCreateWithoutCityInput>, Enumerable<CityTipUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityTipCreateOrConnectWithoutCityInput>
    createMany?: CityTipCreateManyCityInputEnvelope
    connect?: Enumerable<CityTipWhereUniqueInput>
  }

  export type CityDocumentUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityDocumentCreateWithoutCityInput>, Enumerable<CityDocumentUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityDocumentCreateOrConnectWithoutCityInput>
    createMany?: CityDocumentCreateManyCityInputEnvelope
    connect?: Enumerable<CityDocumentWhereUniqueInput>
  }

  export type CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityRecommendedItemCreateWithoutCityInput>, Enumerable<CityRecommendedItemUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityRecommendedItemCreateOrConnectWithoutCityInput>
    createMany?: CityRecommendedItemCreateManyCityInputEnvelope
    connect?: Enumerable<CityRecommendedItemWhereUniqueInput>
  }

  export type CityEventUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityEventCreateWithoutCityInput>, Enumerable<CityEventUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityEventCreateOrConnectWithoutCityInput>
    createMany?: CityEventCreateManyCityInputEnvelope
    connect?: Enumerable<CityEventWhereUniqueInput>
  }

  export type CityCarUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityCarCreateWithoutCityInput>, Enumerable<CityCarUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityCarCreateOrConnectWithoutCityInput>
    createMany?: CityCarCreateManyCityInputEnvelope
    connect?: Enumerable<CityCarWhereUniqueInput>
  }

  export type CityTourGuideUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityTourGuideCreateWithoutCityInput>, Enumerable<CityTourGuideUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityTourGuideCreateOrConnectWithoutCityInput>
    createMany?: CityTourGuideCreateManyCityInputEnvelope
    connect?: Enumerable<CityTourGuideWhereUniqueInput>
  }

  export type CityApplicationUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<CityApplicationCreateWithoutCityInput>, Enumerable<CityApplicationUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityApplicationCreateOrConnectWithoutCityInput>
    createMany?: CityApplicationCreateManyCityInputEnvelope
    connect?: Enumerable<CityApplicationWhereUniqueInput>
  }

  export type ActivityUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<ActivityCreateWithoutCityInput>, Enumerable<ActivityUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<ActivityCreateOrConnectWithoutCityInput>
    createMany?: ActivityCreateManyCityInputEnvelope
    connect?: Enumerable<ActivityWhereUniqueInput>
  }

  export type DriverUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<DriverCreateWithoutCityInput>, Enumerable<DriverUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<DriverCreateOrConnectWithoutCityInput>
    createMany?: DriverCreateManyCityInputEnvelope
    connect?: Enumerable<DriverWhereUniqueInput>
  }

  export type TripCityUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<TripCityCreateWithoutCityInput>, Enumerable<TripCityUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<TripCityCreateOrConnectWithoutCityInput>
    createMany?: TripCityCreateManyCityInputEnvelope
    connect?: Enumerable<TripCityWhereUniqueInput>
  }

  export type CountryUpdateOneRequiredWithoutCitiesNestedInput = {
    create?: XOR<CountryCreateWithoutCitiesInput, CountryUncheckedCreateWithoutCitiesInput>
    connectOrCreate?: CountryCreateOrConnectWithoutCitiesInput
    upsert?: CountryUpsertWithoutCitiesInput
    connect?: CountryWhereUniqueInput
    update?: XOR<CountryUpdateWithoutCitiesInput, CountryUncheckedUpdateWithoutCitiesInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CityUpdateimagesInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type CityTipUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityTipCreateWithoutCityInput>, Enumerable<CityTipUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityTipCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityTipUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityTipCreateManyCityInputEnvelope
    set?: Enumerable<CityTipWhereUniqueInput>
    disconnect?: Enumerable<CityTipWhereUniqueInput>
    delete?: Enumerable<CityTipWhereUniqueInput>
    connect?: Enumerable<CityTipWhereUniqueInput>
    update?: Enumerable<CityTipUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityTipUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityTipScalarWhereInput>
  }

  export type CityDocumentUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityDocumentCreateWithoutCityInput>, Enumerable<CityDocumentUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityDocumentCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityDocumentUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityDocumentCreateManyCityInputEnvelope
    set?: Enumerable<CityDocumentWhereUniqueInput>
    disconnect?: Enumerable<CityDocumentWhereUniqueInput>
    delete?: Enumerable<CityDocumentWhereUniqueInput>
    connect?: Enumerable<CityDocumentWhereUniqueInput>
    update?: Enumerable<CityDocumentUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityDocumentUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityDocumentScalarWhereInput>
  }

  export type CityRecommendedItemUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityRecommendedItemCreateWithoutCityInput>, Enumerable<CityRecommendedItemUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityRecommendedItemCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityRecommendedItemUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityRecommendedItemCreateManyCityInputEnvelope
    set?: Enumerable<CityRecommendedItemWhereUniqueInput>
    disconnect?: Enumerable<CityRecommendedItemWhereUniqueInput>
    delete?: Enumerable<CityRecommendedItemWhereUniqueInput>
    connect?: Enumerable<CityRecommendedItemWhereUniqueInput>
    update?: Enumerable<CityRecommendedItemUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityRecommendedItemUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityRecommendedItemScalarWhereInput>
  }

  export type CityEventUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityEventCreateWithoutCityInput>, Enumerable<CityEventUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityEventCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityEventUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityEventCreateManyCityInputEnvelope
    set?: Enumerable<CityEventWhereUniqueInput>
    disconnect?: Enumerable<CityEventWhereUniqueInput>
    delete?: Enumerable<CityEventWhereUniqueInput>
    connect?: Enumerable<CityEventWhereUniqueInput>
    update?: Enumerable<CityEventUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityEventUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityEventScalarWhereInput>
  }

  export type CityCarUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityCarCreateWithoutCityInput>, Enumerable<CityCarUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityCarCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityCarUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityCarCreateManyCityInputEnvelope
    set?: Enumerable<CityCarWhereUniqueInput>
    disconnect?: Enumerable<CityCarWhereUniqueInput>
    delete?: Enumerable<CityCarWhereUniqueInput>
    connect?: Enumerable<CityCarWhereUniqueInput>
    update?: Enumerable<CityCarUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityCarUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityCarScalarWhereInput>
  }

  export type CityTourGuideUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityTourGuideCreateWithoutCityInput>, Enumerable<CityTourGuideUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityTourGuideCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityTourGuideUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityTourGuideCreateManyCityInputEnvelope
    set?: Enumerable<CityTourGuideWhereUniqueInput>
    disconnect?: Enumerable<CityTourGuideWhereUniqueInput>
    delete?: Enumerable<CityTourGuideWhereUniqueInput>
    connect?: Enumerable<CityTourGuideWhereUniqueInput>
    update?: Enumerable<CityTourGuideUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityTourGuideUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityTourGuideScalarWhereInput>
  }

  export type CityApplicationUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityApplicationCreateWithoutCityInput>, Enumerable<CityApplicationUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityApplicationCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityApplicationUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityApplicationCreateManyCityInputEnvelope
    set?: Enumerable<CityApplicationWhereUniqueInput>
    disconnect?: Enumerable<CityApplicationWhereUniqueInput>
    delete?: Enumerable<CityApplicationWhereUniqueInput>
    connect?: Enumerable<CityApplicationWhereUniqueInput>
    update?: Enumerable<CityApplicationUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityApplicationUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityApplicationScalarWhereInput>
  }

  export type ActivityUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<ActivityCreateWithoutCityInput>, Enumerable<ActivityUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<ActivityCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<ActivityUpsertWithWhereUniqueWithoutCityInput>
    createMany?: ActivityCreateManyCityInputEnvelope
    set?: Enumerable<ActivityWhereUniqueInput>
    disconnect?: Enumerable<ActivityWhereUniqueInput>
    delete?: Enumerable<ActivityWhereUniqueInput>
    connect?: Enumerable<ActivityWhereUniqueInput>
    update?: Enumerable<ActivityUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<ActivityUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<ActivityScalarWhereInput>
  }

  export type DriverUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<DriverCreateWithoutCityInput>, Enumerable<DriverUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<DriverCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<DriverUpsertWithWhereUniqueWithoutCityInput>
    createMany?: DriverCreateManyCityInputEnvelope
    set?: Enumerable<DriverWhereUniqueInput>
    disconnect?: Enumerable<DriverWhereUniqueInput>
    delete?: Enumerable<DriverWhereUniqueInput>
    connect?: Enumerable<DriverWhereUniqueInput>
    update?: Enumerable<DriverUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<DriverUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<DriverScalarWhereInput>
  }

  export type TripCityUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<TripCityCreateWithoutCityInput>, Enumerable<TripCityUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<TripCityCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<TripCityUpsertWithWhereUniqueWithoutCityInput>
    createMany?: TripCityCreateManyCityInputEnvelope
    set?: Enumerable<TripCityWhereUniqueInput>
    disconnect?: Enumerable<TripCityWhereUniqueInput>
    delete?: Enumerable<TripCityWhereUniqueInput>
    connect?: Enumerable<TripCityWhereUniqueInput>
    update?: Enumerable<TripCityUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<TripCityUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<TripCityScalarWhereInput>
  }

  export type CityTipUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityTipCreateWithoutCityInput>, Enumerable<CityTipUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityTipCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityTipUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityTipCreateManyCityInputEnvelope
    set?: Enumerable<CityTipWhereUniqueInput>
    disconnect?: Enumerable<CityTipWhereUniqueInput>
    delete?: Enumerable<CityTipWhereUniqueInput>
    connect?: Enumerable<CityTipWhereUniqueInput>
    update?: Enumerable<CityTipUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityTipUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityTipScalarWhereInput>
  }

  export type CityDocumentUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityDocumentCreateWithoutCityInput>, Enumerable<CityDocumentUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityDocumentCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityDocumentUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityDocumentCreateManyCityInputEnvelope
    set?: Enumerable<CityDocumentWhereUniqueInput>
    disconnect?: Enumerable<CityDocumentWhereUniqueInput>
    delete?: Enumerable<CityDocumentWhereUniqueInput>
    connect?: Enumerable<CityDocumentWhereUniqueInput>
    update?: Enumerable<CityDocumentUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityDocumentUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityDocumentScalarWhereInput>
  }

  export type CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityRecommendedItemCreateWithoutCityInput>, Enumerable<CityRecommendedItemUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityRecommendedItemCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityRecommendedItemUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityRecommendedItemCreateManyCityInputEnvelope
    set?: Enumerable<CityRecommendedItemWhereUniqueInput>
    disconnect?: Enumerable<CityRecommendedItemWhereUniqueInput>
    delete?: Enumerable<CityRecommendedItemWhereUniqueInput>
    connect?: Enumerable<CityRecommendedItemWhereUniqueInput>
    update?: Enumerable<CityRecommendedItemUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityRecommendedItemUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityRecommendedItemScalarWhereInput>
  }

  export type CityEventUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityEventCreateWithoutCityInput>, Enumerable<CityEventUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityEventCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityEventUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityEventCreateManyCityInputEnvelope
    set?: Enumerable<CityEventWhereUniqueInput>
    disconnect?: Enumerable<CityEventWhereUniqueInput>
    delete?: Enumerable<CityEventWhereUniqueInput>
    connect?: Enumerable<CityEventWhereUniqueInput>
    update?: Enumerable<CityEventUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityEventUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityEventScalarWhereInput>
  }

  export type CityCarUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityCarCreateWithoutCityInput>, Enumerable<CityCarUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityCarCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityCarUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityCarCreateManyCityInputEnvelope
    set?: Enumerable<CityCarWhereUniqueInput>
    disconnect?: Enumerable<CityCarWhereUniqueInput>
    delete?: Enumerable<CityCarWhereUniqueInput>
    connect?: Enumerable<CityCarWhereUniqueInput>
    update?: Enumerable<CityCarUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityCarUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityCarScalarWhereInput>
  }

  export type CityTourGuideUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityTourGuideCreateWithoutCityInput>, Enumerable<CityTourGuideUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityTourGuideCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityTourGuideUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityTourGuideCreateManyCityInputEnvelope
    set?: Enumerable<CityTourGuideWhereUniqueInput>
    disconnect?: Enumerable<CityTourGuideWhereUniqueInput>
    delete?: Enumerable<CityTourGuideWhereUniqueInput>
    connect?: Enumerable<CityTourGuideWhereUniqueInput>
    update?: Enumerable<CityTourGuideUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityTourGuideUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityTourGuideScalarWhereInput>
  }

  export type CityApplicationUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<CityApplicationCreateWithoutCityInput>, Enumerable<CityApplicationUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<CityApplicationCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<CityApplicationUpsertWithWhereUniqueWithoutCityInput>
    createMany?: CityApplicationCreateManyCityInputEnvelope
    set?: Enumerable<CityApplicationWhereUniqueInput>
    disconnect?: Enumerable<CityApplicationWhereUniqueInput>
    delete?: Enumerable<CityApplicationWhereUniqueInput>
    connect?: Enumerable<CityApplicationWhereUniqueInput>
    update?: Enumerable<CityApplicationUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<CityApplicationUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<CityApplicationScalarWhereInput>
  }

  export type ActivityUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<ActivityCreateWithoutCityInput>, Enumerable<ActivityUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<ActivityCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<ActivityUpsertWithWhereUniqueWithoutCityInput>
    createMany?: ActivityCreateManyCityInputEnvelope
    set?: Enumerable<ActivityWhereUniqueInput>
    disconnect?: Enumerable<ActivityWhereUniqueInput>
    delete?: Enumerable<ActivityWhereUniqueInput>
    connect?: Enumerable<ActivityWhereUniqueInput>
    update?: Enumerable<ActivityUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<ActivityUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<ActivityScalarWhereInput>
  }

  export type DriverUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<DriverCreateWithoutCityInput>, Enumerable<DriverUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<DriverCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<DriverUpsertWithWhereUniqueWithoutCityInput>
    createMany?: DriverCreateManyCityInputEnvelope
    set?: Enumerable<DriverWhereUniqueInput>
    disconnect?: Enumerable<DriverWhereUniqueInput>
    delete?: Enumerable<DriverWhereUniqueInput>
    connect?: Enumerable<DriverWhereUniqueInput>
    update?: Enumerable<DriverUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<DriverUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<DriverScalarWhereInput>
  }

  export type TripCityUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<Enumerable<TripCityCreateWithoutCityInput>, Enumerable<TripCityUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<TripCityCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<TripCityUpsertWithWhereUniqueWithoutCityInput>
    createMany?: TripCityCreateManyCityInputEnvelope
    set?: Enumerable<TripCityWhereUniqueInput>
    disconnect?: Enumerable<TripCityWhereUniqueInput>
    delete?: Enumerable<TripCityWhereUniqueInput>
    connect?: Enumerable<TripCityWhereUniqueInput>
    update?: Enumerable<TripCityUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<TripCityUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<TripCityScalarWhereInput>
  }

  export type CityCreateNestedOneWithoutTipsInput = {
    create?: XOR<CityCreateWithoutTipsInput, CityUncheckedCreateWithoutTipsInput>
    connectOrCreate?: CityCreateOrConnectWithoutTipsInput
    connect?: CityWhereUniqueInput
  }

  export type CityUpdateOneRequiredWithoutTipsNestedInput = {
    create?: XOR<CityCreateWithoutTipsInput, CityUncheckedCreateWithoutTipsInput>
    connectOrCreate?: CityCreateOrConnectWithoutTipsInput
    upsert?: CityUpsertWithoutTipsInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutTipsInput, CityUncheckedUpdateWithoutTipsInput>
  }

  export type CityCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<CityCreateWithoutDocumentsInput, CityUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CityCreateOrConnectWithoutDocumentsInput
    connect?: CityWhereUniqueInput
  }

  export type CityUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<CityCreateWithoutDocumentsInput, CityUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CityCreateOrConnectWithoutDocumentsInput
    upsert?: CityUpsertWithoutDocumentsInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutDocumentsInput, CityUncheckedUpdateWithoutDocumentsInput>
  }

  export type CityCreateNestedOneWithoutRecommendedItemsInput = {
    create?: XOR<CityCreateWithoutRecommendedItemsInput, CityUncheckedCreateWithoutRecommendedItemsInput>
    connectOrCreate?: CityCreateOrConnectWithoutRecommendedItemsInput
    connect?: CityWhereUniqueInput
  }

  export type CityUpdateOneRequiredWithoutRecommendedItemsNestedInput = {
    create?: XOR<CityCreateWithoutRecommendedItemsInput, CityUncheckedCreateWithoutRecommendedItemsInput>
    connectOrCreate?: CityCreateOrConnectWithoutRecommendedItemsInput
    upsert?: CityUpsertWithoutRecommendedItemsInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutRecommendedItemsInput, CityUncheckedUpdateWithoutRecommendedItemsInput>
  }

  export type CityCreateNestedOneWithoutEventsInput = {
    create?: XOR<CityCreateWithoutEventsInput, CityUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CityCreateOrConnectWithoutEventsInput
    connect?: CityWhereUniqueInput
  }

  export type TripItemCreateNestedManyWithoutEventInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutEventInput>, Enumerable<TripItemUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutEventInput>
    createMany?: TripItemCreateManyEventInputEnvelope
    connect?: Enumerable<TripItemWhereUniqueInput>
  }

  export type TripItemUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutEventInput>, Enumerable<TripItemUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutEventInput>
    createMany?: TripItemCreateManyEventInputEnvelope
    connect?: Enumerable<TripItemWhereUniqueInput>
  }

  export type CityUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<CityCreateWithoutEventsInput, CityUncheckedCreateWithoutEventsInput>
    connectOrCreate?: CityCreateOrConnectWithoutEventsInput
    upsert?: CityUpsertWithoutEventsInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutEventsInput, CityUncheckedUpdateWithoutEventsInput>
  }

  export type TripItemUpdateManyWithoutEventNestedInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutEventInput>, Enumerable<TripItemUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutEventInput>
    upsert?: Enumerable<TripItemUpsertWithWhereUniqueWithoutEventInput>
    createMany?: TripItemCreateManyEventInputEnvelope
    set?: Enumerable<TripItemWhereUniqueInput>
    disconnect?: Enumerable<TripItemWhereUniqueInput>
    delete?: Enumerable<TripItemWhereUniqueInput>
    connect?: Enumerable<TripItemWhereUniqueInput>
    update?: Enumerable<TripItemUpdateWithWhereUniqueWithoutEventInput>
    updateMany?: Enumerable<TripItemUpdateManyWithWhereWithoutEventInput>
    deleteMany?: Enumerable<TripItemScalarWhereInput>
  }

  export type TripItemUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutEventInput>, Enumerable<TripItemUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutEventInput>
    upsert?: Enumerable<TripItemUpsertWithWhereUniqueWithoutEventInput>
    createMany?: TripItemCreateManyEventInputEnvelope
    set?: Enumerable<TripItemWhereUniqueInput>
    disconnect?: Enumerable<TripItemWhereUniqueInput>
    delete?: Enumerable<TripItemWhereUniqueInput>
    connect?: Enumerable<TripItemWhereUniqueInput>
    update?: Enumerable<TripItemUpdateWithWhereUniqueWithoutEventInput>
    updateMany?: Enumerable<TripItemUpdateManyWithWhereWithoutEventInput>
    deleteMany?: Enumerable<TripItemScalarWhereInput>
  }

  export type CityCreateNestedOneWithoutCarsInput = {
    create?: XOR<CityCreateWithoutCarsInput, CityUncheckedCreateWithoutCarsInput>
    connectOrCreate?: CityCreateOrConnectWithoutCarsInput
    connect?: CityWhereUniqueInput
  }

  export type CityUpdateOneRequiredWithoutCarsNestedInput = {
    create?: XOR<CityCreateWithoutCarsInput, CityUncheckedCreateWithoutCarsInput>
    connectOrCreate?: CityCreateOrConnectWithoutCarsInput
    upsert?: CityUpsertWithoutCarsInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutCarsInput, CityUncheckedUpdateWithoutCarsInput>
  }

  export type CityCreateNestedOneWithoutTourGuidesInput = {
    create?: XOR<CityCreateWithoutTourGuidesInput, CityUncheckedCreateWithoutTourGuidesInput>
    connectOrCreate?: CityCreateOrConnectWithoutTourGuidesInput
    connect?: CityWhereUniqueInput
  }

  export type CityTourGuideCreatelanguagesInput = {
    set: Enumerable<string>
  }

  export type CityUpdateOneRequiredWithoutTourGuidesNestedInput = {
    create?: XOR<CityCreateWithoutTourGuidesInput, CityUncheckedCreateWithoutTourGuidesInput>
    connectOrCreate?: CityCreateOrConnectWithoutTourGuidesInput
    upsert?: CityUpsertWithoutTourGuidesInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutTourGuidesInput, CityUncheckedUpdateWithoutTourGuidesInput>
  }

  export type CityTourGuideUpdatelanguagesInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type CityCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<CityCreateWithoutApplicationsInput, CityUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CityCreateOrConnectWithoutApplicationsInput
    connect?: CityWhereUniqueInput
  }

  export type CityUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<CityCreateWithoutApplicationsInput, CityUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CityCreateOrConnectWithoutApplicationsInput
    upsert?: CityUpsertWithoutApplicationsInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutApplicationsInput, CityUncheckedUpdateWithoutApplicationsInput>
  }

  export type CityCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<CityCreateWithoutActivitiesInput, CityUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: CityCreateOrConnectWithoutActivitiesInput
    connect?: CityWhereUniqueInput
  }

  export type ActivityCreateimagesInput = {
    set: Enumerable<string>
  }

  export type ActivityCreatetagsInput = {
    set: Enumerable<string>
  }

  export type TripItemCreateNestedManyWithoutActivityInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutActivityInput>, Enumerable<TripItemUncheckedCreateWithoutActivityInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutActivityInput>
    createMany?: TripItemCreateManyActivityInputEnvelope
    connect?: Enumerable<TripItemWhereUniqueInput>
  }

  export type BookingCreateNestedManyWithoutActivityInput = {
    create?: XOR<Enumerable<BookingCreateWithoutActivityInput>, Enumerable<BookingUncheckedCreateWithoutActivityInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutActivityInput>
    createMany?: BookingCreateManyActivityInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type TripItemUncheckedCreateNestedManyWithoutActivityInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutActivityInput>, Enumerable<TripItemUncheckedCreateWithoutActivityInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutActivityInput>
    createMany?: TripItemCreateManyActivityInputEnvelope
    connect?: Enumerable<TripItemWhereUniqueInput>
  }

  export type BookingUncheckedCreateNestedManyWithoutActivityInput = {
    create?: XOR<Enumerable<BookingCreateWithoutActivityInput>, Enumerable<BookingUncheckedCreateWithoutActivityInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutActivityInput>
    createMany?: BookingCreateManyActivityInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type CityUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<CityCreateWithoutActivitiesInput, CityUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: CityCreateOrConnectWithoutActivitiesInput
    upsert?: CityUpsertWithoutActivitiesInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutActivitiesInput, CityUncheckedUpdateWithoutActivitiesInput>
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ActivityUpdateimagesInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type ActivityUpdatetagsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type TripItemUpdateManyWithoutActivityNestedInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutActivityInput>, Enumerable<TripItemUncheckedCreateWithoutActivityInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutActivityInput>
    upsert?: Enumerable<TripItemUpsertWithWhereUniqueWithoutActivityInput>
    createMany?: TripItemCreateManyActivityInputEnvelope
    set?: Enumerable<TripItemWhereUniqueInput>
    disconnect?: Enumerable<TripItemWhereUniqueInput>
    delete?: Enumerable<TripItemWhereUniqueInput>
    connect?: Enumerable<TripItemWhereUniqueInput>
    update?: Enumerable<TripItemUpdateWithWhereUniqueWithoutActivityInput>
    updateMany?: Enumerable<TripItemUpdateManyWithWhereWithoutActivityInput>
    deleteMany?: Enumerable<TripItemScalarWhereInput>
  }

  export type BookingUpdateManyWithoutActivityNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutActivityInput>, Enumerable<BookingUncheckedCreateWithoutActivityInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutActivityInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutActivityInput>
    createMany?: BookingCreateManyActivityInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutActivityInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutActivityInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type TripItemUncheckedUpdateManyWithoutActivityNestedInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutActivityInput>, Enumerable<TripItemUncheckedCreateWithoutActivityInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutActivityInput>
    upsert?: Enumerable<TripItemUpsertWithWhereUniqueWithoutActivityInput>
    createMany?: TripItemCreateManyActivityInputEnvelope
    set?: Enumerable<TripItemWhereUniqueInput>
    disconnect?: Enumerable<TripItemWhereUniqueInput>
    delete?: Enumerable<TripItemWhereUniqueInput>
    connect?: Enumerable<TripItemWhereUniqueInput>
    update?: Enumerable<TripItemUpdateWithWhereUniqueWithoutActivityInput>
    updateMany?: Enumerable<TripItemUpdateManyWithWhereWithoutActivityInput>
    deleteMany?: Enumerable<TripItemScalarWhereInput>
  }

  export type BookingUncheckedUpdateManyWithoutActivityNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutActivityInput>, Enumerable<BookingUncheckedCreateWithoutActivityInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutActivityInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutActivityInput>
    createMany?: BookingCreateManyActivityInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutActivityInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutActivityInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type CityCreateNestedOneWithoutDriversInput = {
    create?: XOR<CityCreateWithoutDriversInput, CityUncheckedCreateWithoutDriversInput>
    connectOrCreate?: CityCreateOrConnectWithoutDriversInput
    connect?: CityWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutDriverInput = {
    create?: XOR<Enumerable<BookingCreateWithoutDriverInput>, Enumerable<BookingUncheckedCreateWithoutDriverInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutDriverInput>
    createMany?: BookingCreateManyDriverInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type BookingUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<Enumerable<BookingCreateWithoutDriverInput>, Enumerable<BookingUncheckedCreateWithoutDriverInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutDriverInput>
    createMany?: BookingCreateManyDriverInputEnvelope
    connect?: Enumerable<BookingWhereUniqueInput>
  }

  export type CityUpdateOneRequiredWithoutDriversNestedInput = {
    create?: XOR<CityCreateWithoutDriversInput, CityUncheckedCreateWithoutDriversInput>
    connectOrCreate?: CityCreateOrConnectWithoutDriversInput
    upsert?: CityUpsertWithoutDriversInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutDriversInput, CityUncheckedUpdateWithoutDriversInput>
  }

  export type BookingUpdateManyWithoutDriverNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutDriverInput>, Enumerable<BookingUncheckedCreateWithoutDriverInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutDriverInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutDriverInput>
    createMany?: BookingCreateManyDriverInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutDriverInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutDriverInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type BookingUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<Enumerable<BookingCreateWithoutDriverInput>, Enumerable<BookingUncheckedCreateWithoutDriverInput>>
    connectOrCreate?: Enumerable<BookingCreateOrConnectWithoutDriverInput>
    upsert?: Enumerable<BookingUpsertWithWhereUniqueWithoutDriverInput>
    createMany?: BookingCreateManyDriverInputEnvelope
    set?: Enumerable<BookingWhereUniqueInput>
    disconnect?: Enumerable<BookingWhereUniqueInput>
    delete?: Enumerable<BookingWhereUniqueInput>
    connect?: Enumerable<BookingWhereUniqueInput>
    update?: Enumerable<BookingUpdateWithWhereUniqueWithoutDriverInput>
    updateMany?: Enumerable<BookingUpdateManyWithWhereWithoutDriverInput>
    deleteMany?: Enumerable<BookingScalarWhereInput>
  }

  export type TripCityCreateNestedManyWithoutTripInput = {
    create?: XOR<Enumerable<TripCityCreateWithoutTripInput>, Enumerable<TripCityUncheckedCreateWithoutTripInput>>
    connectOrCreate?: Enumerable<TripCityCreateOrConnectWithoutTripInput>
    createMany?: TripCityCreateManyTripInputEnvelope
    connect?: Enumerable<TripCityWhereUniqueInput>
  }

  export type TripPackingItemCreateNestedManyWithoutTripInput = {
    create?: XOR<Enumerable<TripPackingItemCreateWithoutTripInput>, Enumerable<TripPackingItemUncheckedCreateWithoutTripInput>>
    connectOrCreate?: Enumerable<TripPackingItemCreateOrConnectWithoutTripInput>
    createMany?: TripPackingItemCreateManyTripInputEnvelope
    connect?: Enumerable<TripPackingItemWhereUniqueInput>
  }

  export type TripCityUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<Enumerable<TripCityCreateWithoutTripInput>, Enumerable<TripCityUncheckedCreateWithoutTripInput>>
    connectOrCreate?: Enumerable<TripCityCreateOrConnectWithoutTripInput>
    createMany?: TripCityCreateManyTripInputEnvelope
    connect?: Enumerable<TripCityWhereUniqueInput>
  }

  export type TripPackingItemUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<Enumerable<TripPackingItemCreateWithoutTripInput>, Enumerable<TripPackingItemUncheckedCreateWithoutTripInput>>
    connectOrCreate?: Enumerable<TripPackingItemCreateOrConnectWithoutTripInput>
    createMany?: TripPackingItemCreateManyTripInputEnvelope
    connect?: Enumerable<TripPackingItemWhereUniqueInput>
  }

  export type TripCityUpdateManyWithoutTripNestedInput = {
    create?: XOR<Enumerable<TripCityCreateWithoutTripInput>, Enumerable<TripCityUncheckedCreateWithoutTripInput>>
    connectOrCreate?: Enumerable<TripCityCreateOrConnectWithoutTripInput>
    upsert?: Enumerable<TripCityUpsertWithWhereUniqueWithoutTripInput>
    createMany?: TripCityCreateManyTripInputEnvelope
    set?: Enumerable<TripCityWhereUniqueInput>
    disconnect?: Enumerable<TripCityWhereUniqueInput>
    delete?: Enumerable<TripCityWhereUniqueInput>
    connect?: Enumerable<TripCityWhereUniqueInput>
    update?: Enumerable<TripCityUpdateWithWhereUniqueWithoutTripInput>
    updateMany?: Enumerable<TripCityUpdateManyWithWhereWithoutTripInput>
    deleteMany?: Enumerable<TripCityScalarWhereInput>
  }

  export type TripPackingItemUpdateManyWithoutTripNestedInput = {
    create?: XOR<Enumerable<TripPackingItemCreateWithoutTripInput>, Enumerable<TripPackingItemUncheckedCreateWithoutTripInput>>
    connectOrCreate?: Enumerable<TripPackingItemCreateOrConnectWithoutTripInput>
    upsert?: Enumerable<TripPackingItemUpsertWithWhereUniqueWithoutTripInput>
    createMany?: TripPackingItemCreateManyTripInputEnvelope
    set?: Enumerable<TripPackingItemWhereUniqueInput>
    disconnect?: Enumerable<TripPackingItemWhereUniqueInput>
    delete?: Enumerable<TripPackingItemWhereUniqueInput>
    connect?: Enumerable<TripPackingItemWhereUniqueInput>
    update?: Enumerable<TripPackingItemUpdateWithWhereUniqueWithoutTripInput>
    updateMany?: Enumerable<TripPackingItemUpdateManyWithWhereWithoutTripInput>
    deleteMany?: Enumerable<TripPackingItemScalarWhereInput>
  }

  export type TripCityUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<Enumerable<TripCityCreateWithoutTripInput>, Enumerable<TripCityUncheckedCreateWithoutTripInput>>
    connectOrCreate?: Enumerable<TripCityCreateOrConnectWithoutTripInput>
    upsert?: Enumerable<TripCityUpsertWithWhereUniqueWithoutTripInput>
    createMany?: TripCityCreateManyTripInputEnvelope
    set?: Enumerable<TripCityWhereUniqueInput>
    disconnect?: Enumerable<TripCityWhereUniqueInput>
    delete?: Enumerable<TripCityWhereUniqueInput>
    connect?: Enumerable<TripCityWhereUniqueInput>
    update?: Enumerable<TripCityUpdateWithWhereUniqueWithoutTripInput>
    updateMany?: Enumerable<TripCityUpdateManyWithWhereWithoutTripInput>
    deleteMany?: Enumerable<TripCityScalarWhereInput>
  }

  export type TripPackingItemUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<Enumerable<TripPackingItemCreateWithoutTripInput>, Enumerable<TripPackingItemUncheckedCreateWithoutTripInput>>
    connectOrCreate?: Enumerable<TripPackingItemCreateOrConnectWithoutTripInput>
    upsert?: Enumerable<TripPackingItemUpsertWithWhereUniqueWithoutTripInput>
    createMany?: TripPackingItemCreateManyTripInputEnvelope
    set?: Enumerable<TripPackingItemWhereUniqueInput>
    disconnect?: Enumerable<TripPackingItemWhereUniqueInput>
    delete?: Enumerable<TripPackingItemWhereUniqueInput>
    connect?: Enumerable<TripPackingItemWhereUniqueInput>
    update?: Enumerable<TripPackingItemUpdateWithWhereUniqueWithoutTripInput>
    updateMany?: Enumerable<TripPackingItemUpdateManyWithWhereWithoutTripInput>
    deleteMany?: Enumerable<TripPackingItemScalarWhereInput>
  }

  export type TripCreateNestedOneWithoutCitiesInput = {
    create?: XOR<TripCreateWithoutCitiesInput, TripUncheckedCreateWithoutCitiesInput>
    connectOrCreate?: TripCreateOrConnectWithoutCitiesInput
    connect?: TripWhereUniqueInput
  }

  export type CityCreateNestedOneWithoutTripCitiesInput = {
    create?: XOR<CityCreateWithoutTripCitiesInput, CityUncheckedCreateWithoutTripCitiesInput>
    connectOrCreate?: CityCreateOrConnectWithoutTripCitiesInput
    connect?: CityWhereUniqueInput
  }

  export type TripItemCreateNestedManyWithoutTripCityInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutTripCityInput>, Enumerable<TripItemUncheckedCreateWithoutTripCityInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutTripCityInput>
    createMany?: TripItemCreateManyTripCityInputEnvelope
    connect?: Enumerable<TripItemWhereUniqueInput>
  }

  export type TripItemUncheckedCreateNestedManyWithoutTripCityInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutTripCityInput>, Enumerable<TripItemUncheckedCreateWithoutTripCityInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutTripCityInput>
    createMany?: TripItemCreateManyTripCityInputEnvelope
    connect?: Enumerable<TripItemWhereUniqueInput>
  }

  export type TripUpdateOneRequiredWithoutCitiesNestedInput = {
    create?: XOR<TripCreateWithoutCitiesInput, TripUncheckedCreateWithoutCitiesInput>
    connectOrCreate?: TripCreateOrConnectWithoutCitiesInput
    upsert?: TripUpsertWithoutCitiesInput
    connect?: TripWhereUniqueInput
    update?: XOR<TripUpdateWithoutCitiesInput, TripUncheckedUpdateWithoutCitiesInput>
  }

  export type CityUpdateOneRequiredWithoutTripCitiesNestedInput = {
    create?: XOR<CityCreateWithoutTripCitiesInput, CityUncheckedCreateWithoutTripCitiesInput>
    connectOrCreate?: CityCreateOrConnectWithoutTripCitiesInput
    upsert?: CityUpsertWithoutTripCitiesInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutTripCitiesInput, CityUncheckedUpdateWithoutTripCitiesInput>
  }

  export type TripItemUpdateManyWithoutTripCityNestedInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutTripCityInput>, Enumerable<TripItemUncheckedCreateWithoutTripCityInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutTripCityInput>
    upsert?: Enumerable<TripItemUpsertWithWhereUniqueWithoutTripCityInput>
    createMany?: TripItemCreateManyTripCityInputEnvelope
    set?: Enumerable<TripItemWhereUniqueInput>
    disconnect?: Enumerable<TripItemWhereUniqueInput>
    delete?: Enumerable<TripItemWhereUniqueInput>
    connect?: Enumerable<TripItemWhereUniqueInput>
    update?: Enumerable<TripItemUpdateWithWhereUniqueWithoutTripCityInput>
    updateMany?: Enumerable<TripItemUpdateManyWithWhereWithoutTripCityInput>
    deleteMany?: Enumerable<TripItemScalarWhereInput>
  }

  export type TripItemUncheckedUpdateManyWithoutTripCityNestedInput = {
    create?: XOR<Enumerable<TripItemCreateWithoutTripCityInput>, Enumerable<TripItemUncheckedCreateWithoutTripCityInput>>
    connectOrCreate?: Enumerable<TripItemCreateOrConnectWithoutTripCityInput>
    upsert?: Enumerable<TripItemUpsertWithWhereUniqueWithoutTripCityInput>
    createMany?: TripItemCreateManyTripCityInputEnvelope
    set?: Enumerable<TripItemWhereUniqueInput>
    disconnect?: Enumerable<TripItemWhereUniqueInput>
    delete?: Enumerable<TripItemWhereUniqueInput>
    connect?: Enumerable<TripItemWhereUniqueInput>
    update?: Enumerable<TripItemUpdateWithWhereUniqueWithoutTripCityInput>
    updateMany?: Enumerable<TripItemUpdateManyWithWhereWithoutTripCityInput>
    deleteMany?: Enumerable<TripItemScalarWhereInput>
  }

  export type TripCityCreateNestedOneWithoutItemsInput = {
    create?: XOR<TripCityCreateWithoutItemsInput, TripCityUncheckedCreateWithoutItemsInput>
    connectOrCreate?: TripCityCreateOrConnectWithoutItemsInput
    connect?: TripCityWhereUniqueInput
  }

  export type ActivityCreateNestedOneWithoutTripItemsInput = {
    create?: XOR<ActivityCreateWithoutTripItemsInput, ActivityUncheckedCreateWithoutTripItemsInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutTripItemsInput
    connect?: ActivityWhereUniqueInput
  }

  export type CityEventCreateNestedOneWithoutTripItemsInput = {
    create?: XOR<CityEventCreateWithoutTripItemsInput, CityEventUncheckedCreateWithoutTripItemsInput>
    connectOrCreate?: CityEventCreateOrConnectWithoutTripItemsInput
    connect?: CityEventWhereUniqueInput
  }

  export type TripCityUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<TripCityCreateWithoutItemsInput, TripCityUncheckedCreateWithoutItemsInput>
    connectOrCreate?: TripCityCreateOrConnectWithoutItemsInput
    upsert?: TripCityUpsertWithoutItemsInput
    connect?: TripCityWhereUniqueInput
    update?: XOR<TripCityUpdateWithoutItemsInput, TripCityUncheckedUpdateWithoutItemsInput>
  }

  export type ActivityUpdateOneWithoutTripItemsNestedInput = {
    create?: XOR<ActivityCreateWithoutTripItemsInput, ActivityUncheckedCreateWithoutTripItemsInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutTripItemsInput
    upsert?: ActivityUpsertWithoutTripItemsInput
    disconnect?: boolean
    delete?: boolean
    connect?: ActivityWhereUniqueInput
    update?: XOR<ActivityUpdateWithoutTripItemsInput, ActivityUncheckedUpdateWithoutTripItemsInput>
  }

  export type CityEventUpdateOneWithoutTripItemsNestedInput = {
    create?: XOR<CityEventCreateWithoutTripItemsInput, CityEventUncheckedCreateWithoutTripItemsInput>
    connectOrCreate?: CityEventCreateOrConnectWithoutTripItemsInput
    upsert?: CityEventUpsertWithoutTripItemsInput
    disconnect?: boolean
    delete?: boolean
    connect?: CityEventWhereUniqueInput
    update?: XOR<CityEventUpdateWithoutTripItemsInput, CityEventUncheckedUpdateWithoutTripItemsInput>
  }

  export type TripCreateNestedOneWithoutPackingListInput = {
    create?: XOR<TripCreateWithoutPackingListInput, TripUncheckedCreateWithoutPackingListInput>
    connectOrCreate?: TripCreateOrConnectWithoutPackingListInput
    connect?: TripWhereUniqueInput
  }

  export type TripUpdateOneRequiredWithoutPackingListNestedInput = {
    create?: XOR<TripCreateWithoutPackingListInput, TripUncheckedCreateWithoutPackingListInput>
    connectOrCreate?: TripCreateOrConnectWithoutPackingListInput
    upsert?: TripUpsertWithoutPackingListInput
    connect?: TripWhereUniqueInput
    update?: XOR<TripUpdateWithoutPackingListInput, TripUncheckedUpdateWithoutPackingListInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ActivityCreateNestedOneWithoutBookingsInput = {
    create?: XOR<ActivityCreateWithoutBookingsInput, ActivityUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutBookingsInput
    connect?: ActivityWhereUniqueInput
  }

  export type DriverCreateNestedOneWithoutBookingsInput = {
    create?: XOR<DriverCreateWithoutBookingsInput, DriverUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutBookingsInput
    connect?: DriverWhereUniqueInput
  }

  export type ActivityUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<ActivityCreateWithoutBookingsInput, ActivityUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutBookingsInput
    upsert?: ActivityUpsertWithoutBookingsInput
    disconnect?: boolean
    delete?: boolean
    connect?: ActivityWhereUniqueInput
    update?: XOR<ActivityUpdateWithoutBookingsInput, ActivityUncheckedUpdateWithoutBookingsInput>
  }

  export type DriverUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<DriverCreateWithoutBookingsInput, DriverUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: DriverCreateOrConnectWithoutBookingsInput
    upsert?: DriverUpsertWithoutBookingsInput
    disconnect?: boolean
    delete?: boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<DriverUpdateWithoutBookingsInput, DriverUncheckedUpdateWithoutBookingsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type CityCreateWithoutCountryInput = {
    id?: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutCountryInput = {
    id?: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutCountryInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutCountryInput, CityUncheckedCreateWithoutCountryInput>
  }

  export type CityCreateManyCountryInputEnvelope = {
    data: Enumerable<CityCreateManyCountryInput>
    skipDuplicates?: boolean
  }

  export type CityUpsertWithWhereUniqueWithoutCountryInput = {
    where: CityWhereUniqueInput
    update: XOR<CityUpdateWithoutCountryInput, CityUncheckedUpdateWithoutCountryInput>
    create: XOR<CityCreateWithoutCountryInput, CityUncheckedCreateWithoutCountryInput>
  }

  export type CityUpdateWithWhereUniqueWithoutCountryInput = {
    where: CityWhereUniqueInput
    data: XOR<CityUpdateWithoutCountryInput, CityUncheckedUpdateWithoutCountryInput>
  }

  export type CityUpdateManyWithWhereWithoutCountryInput = {
    where: CityScalarWhereInput
    data: XOR<CityUpdateManyMutationInput, CityUncheckedUpdateManyWithoutCitiesInput>
  }

  export type CityScalarWhereInput = {
    AND?: Enumerable<CityScalarWhereInput>
    OR?: Enumerable<CityScalarWhereInput>
    NOT?: Enumerable<CityScalarWhereInput>
    id?: StringFilter | string
    countryId?: StringFilter | string
    name?: StringFilter | string
    lat?: FloatFilter | number
    lng?: FloatFilter | number
    images?: StringNullableListFilter
    timezone?: StringNullableFilter | string | null
    currency?: StringNullableFilter | string | null
    language?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CountryCreateWithoutCitiesInput = {
    id?: string
    name: string
    code?: string | null
    continent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountryUncheckedCreateWithoutCitiesInput = {
    id?: string
    name: string
    code?: string | null
    continent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountryCreateOrConnectWithoutCitiesInput = {
    where: CountryWhereUniqueInput
    create: XOR<CountryCreateWithoutCitiesInput, CountryUncheckedCreateWithoutCitiesInput>
  }

  export type CityTipCreateWithoutCityInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTipUncheckedCreateWithoutCityInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTipCreateOrConnectWithoutCityInput = {
    where: CityTipWhereUniqueInput
    create: XOR<CityTipCreateWithoutCityInput, CityTipUncheckedCreateWithoutCityInput>
  }

  export type CityTipCreateManyCityInputEnvelope = {
    data: Enumerable<CityTipCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type CityDocumentCreateWithoutCityInput = {
    id?: string
    name: string
    exampleUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityDocumentUncheckedCreateWithoutCityInput = {
    id?: string
    name: string
    exampleUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityDocumentCreateOrConnectWithoutCityInput = {
    where: CityDocumentWhereUniqueInput
    create: XOR<CityDocumentCreateWithoutCityInput, CityDocumentUncheckedCreateWithoutCityInput>
  }

  export type CityDocumentCreateManyCityInputEnvelope = {
    data: Enumerable<CityDocumentCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type CityRecommendedItemCreateWithoutCityInput = {
    id?: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityRecommendedItemUncheckedCreateWithoutCityInput = {
    id?: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityRecommendedItemCreateOrConnectWithoutCityInput = {
    where: CityRecommendedItemWhereUniqueInput
    create: XOR<CityRecommendedItemCreateWithoutCityInput, CityRecommendedItemUncheckedCreateWithoutCityInput>
  }

  export type CityRecommendedItemCreateManyCityInputEnvelope = {
    data: Enumerable<CityRecommendedItemCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type CityEventCreateWithoutCityInput = {
    id?: string
    title: string
    description: string
    date: string
    location: string
    lat: number
    lng: number
    imageUrl?: string | null
    bookingUrl?: string | null
    tripItems?: TripItemCreateNestedManyWithoutEventInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityEventUncheckedCreateWithoutCityInput = {
    id?: string
    title: string
    description: string
    date: string
    location: string
    lat: number
    lng: number
    imageUrl?: string | null
    bookingUrl?: string | null
    tripItems?: TripItemUncheckedCreateNestedManyWithoutEventInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityEventCreateOrConnectWithoutCityInput = {
    where: CityEventWhereUniqueInput
    create: XOR<CityEventCreateWithoutCityInput, CityEventUncheckedCreateWithoutCityInput>
  }

  export type CityEventCreateManyCityInputEnvelope = {
    data: Enumerable<CityEventCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type CityCarCreateWithoutCityInput = {
    id?: string
    name: string
    type: string
    pricePerDay: number
    transmission: string
    fuel: string
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCarUncheckedCreateWithoutCityInput = {
    id?: string
    name: string
    type: string
    pricePerDay: number
    transmission: string
    fuel: string
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCarCreateOrConnectWithoutCityInput = {
    where: CityCarWhereUniqueInput
    create: XOR<CityCarCreateWithoutCityInput, CityCarUncheckedCreateWithoutCityInput>
  }

  export type CityCarCreateManyCityInputEnvelope = {
    data: Enumerable<CityCarCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type CityTourGuideCreateWithoutCityInput = {
    id?: string
    name: string
    bio: string
    languages?: CityTourGuideCreatelanguagesInput | Enumerable<string>
    pricePerHour: number
    rating: number
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTourGuideUncheckedCreateWithoutCityInput = {
    id?: string
    name: string
    bio: string
    languages?: CityTourGuideCreatelanguagesInput | Enumerable<string>
    pricePerHour: number
    rating: number
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTourGuideCreateOrConnectWithoutCityInput = {
    where: CityTourGuideWhereUniqueInput
    create: XOR<CityTourGuideCreateWithoutCityInput, CityTourGuideUncheckedCreateWithoutCityInput>
  }

  export type CityTourGuideCreateManyCityInputEnvelope = {
    data: Enumerable<CityTourGuideCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type CityApplicationCreateWithoutCityInput = {
    id?: string
    name: string
    description: string
    iconUrl?: string | null
    androidLink?: string | null
    iphoneLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityApplicationUncheckedCreateWithoutCityInput = {
    id?: string
    name: string
    description: string
    iconUrl?: string | null
    androidLink?: string | null
    iphoneLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityApplicationCreateOrConnectWithoutCityInput = {
    where: CityApplicationWhereUniqueInput
    create: XOR<CityApplicationCreateWithoutCityInput, CityApplicationUncheckedCreateWithoutCityInput>
  }

  export type CityApplicationCreateManyCityInputEnvelope = {
    data: Enumerable<CityApplicationCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type ActivityCreateWithoutCityInput = {
    id?: string
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    tripItems?: TripItemCreateNestedManyWithoutActivityInput
    bookings?: BookingCreateNestedManyWithoutActivityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUncheckedCreateWithoutCityInput = {
    id?: string
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    tripItems?: TripItemUncheckedCreateNestedManyWithoutActivityInput
    bookings?: BookingUncheckedCreateNestedManyWithoutActivityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutCityInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutCityInput, ActivityUncheckedCreateWithoutCityInput>
  }

  export type ActivityCreateManyCityInputEnvelope = {
    data: Enumerable<ActivityCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type DriverCreateWithoutCityInput = {
    id?: string
    name: string
    phone?: string | null
    contactInfo?: string | null
    pricePerDay?: number | null
    vehicleType?: string | null
    rating?: number | null
    bookings?: BookingCreateNestedManyWithoutDriverInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverUncheckedCreateWithoutCityInput = {
    id?: string
    name: string
    phone?: string | null
    contactInfo?: string | null
    pricePerDay?: number | null
    vehicleType?: string | null
    rating?: number | null
    bookings?: BookingUncheckedCreateNestedManyWithoutDriverInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverCreateOrConnectWithoutCityInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutCityInput, DriverUncheckedCreateWithoutCityInput>
  }

  export type DriverCreateManyCityInputEnvelope = {
    data: Enumerable<DriverCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type TripCityCreateWithoutCityInput = {
    id?: string
    trip: TripCreateNestedOneWithoutCitiesInput
    startDate: string
    endDate: string
    items?: TripItemCreateNestedManyWithoutTripCityInput
  }

  export type TripCityUncheckedCreateWithoutCityInput = {
    id?: string
    tripId: string
    startDate: string
    endDate: string
    items?: TripItemUncheckedCreateNestedManyWithoutTripCityInput
  }

  export type TripCityCreateOrConnectWithoutCityInput = {
    where: TripCityWhereUniqueInput
    create: XOR<TripCityCreateWithoutCityInput, TripCityUncheckedCreateWithoutCityInput>
  }

  export type TripCityCreateManyCityInputEnvelope = {
    data: Enumerable<TripCityCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type CountryUpsertWithoutCitiesInput = {
    update: XOR<CountryUpdateWithoutCitiesInput, CountryUncheckedUpdateWithoutCitiesInput>
    create: XOR<CountryCreateWithoutCitiesInput, CountryUncheckedCreateWithoutCitiesInput>
  }

  export type CountryUpdateWithoutCitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    continent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountryUncheckedUpdateWithoutCitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    continent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTipUpsertWithWhereUniqueWithoutCityInput = {
    where: CityTipWhereUniqueInput
    update: XOR<CityTipUpdateWithoutCityInput, CityTipUncheckedUpdateWithoutCityInput>
    create: XOR<CityTipCreateWithoutCityInput, CityTipUncheckedCreateWithoutCityInput>
  }

  export type CityTipUpdateWithWhereUniqueWithoutCityInput = {
    where: CityTipWhereUniqueInput
    data: XOR<CityTipUpdateWithoutCityInput, CityTipUncheckedUpdateWithoutCityInput>
  }

  export type CityTipUpdateManyWithWhereWithoutCityInput = {
    where: CityTipScalarWhereInput
    data: XOR<CityTipUpdateManyMutationInput, CityTipUncheckedUpdateManyWithoutTipsInput>
  }

  export type CityTipScalarWhereInput = {
    AND?: Enumerable<CityTipScalarWhereInput>
    OR?: Enumerable<CityTipScalarWhereInput>
    NOT?: Enumerable<CityTipScalarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    content?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityDocumentUpsertWithWhereUniqueWithoutCityInput = {
    where: CityDocumentWhereUniqueInput
    update: XOR<CityDocumentUpdateWithoutCityInput, CityDocumentUncheckedUpdateWithoutCityInput>
    create: XOR<CityDocumentCreateWithoutCityInput, CityDocumentUncheckedCreateWithoutCityInput>
  }

  export type CityDocumentUpdateWithWhereUniqueWithoutCityInput = {
    where: CityDocumentWhereUniqueInput
    data: XOR<CityDocumentUpdateWithoutCityInput, CityDocumentUncheckedUpdateWithoutCityInput>
  }

  export type CityDocumentUpdateManyWithWhereWithoutCityInput = {
    where: CityDocumentScalarWhereInput
    data: XOR<CityDocumentUpdateManyMutationInput, CityDocumentUncheckedUpdateManyWithoutDocumentsInput>
  }

  export type CityDocumentScalarWhereInput = {
    AND?: Enumerable<CityDocumentScalarWhereInput>
    OR?: Enumerable<CityDocumentScalarWhereInput>
    NOT?: Enumerable<CityDocumentScalarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    name?: StringFilter | string
    exampleUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityRecommendedItemUpsertWithWhereUniqueWithoutCityInput = {
    where: CityRecommendedItemWhereUniqueInput
    update: XOR<CityRecommendedItemUpdateWithoutCityInput, CityRecommendedItemUncheckedUpdateWithoutCityInput>
    create: XOR<CityRecommendedItemCreateWithoutCityInput, CityRecommendedItemUncheckedCreateWithoutCityInput>
  }

  export type CityRecommendedItemUpdateWithWhereUniqueWithoutCityInput = {
    where: CityRecommendedItemWhereUniqueInput
    data: XOR<CityRecommendedItemUpdateWithoutCityInput, CityRecommendedItemUncheckedUpdateWithoutCityInput>
  }

  export type CityRecommendedItemUpdateManyWithWhereWithoutCityInput = {
    where: CityRecommendedItemScalarWhereInput
    data: XOR<CityRecommendedItemUpdateManyMutationInput, CityRecommendedItemUncheckedUpdateManyWithoutRecommendedItemsInput>
  }

  export type CityRecommendedItemScalarWhereInput = {
    AND?: Enumerable<CityRecommendedItemScalarWhereInput>
    OR?: Enumerable<CityRecommendedItemScalarWhereInput>
    NOT?: Enumerable<CityRecommendedItemScalarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    name?: StringFilter | string
    imageUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityEventUpsertWithWhereUniqueWithoutCityInput = {
    where: CityEventWhereUniqueInput
    update: XOR<CityEventUpdateWithoutCityInput, CityEventUncheckedUpdateWithoutCityInput>
    create: XOR<CityEventCreateWithoutCityInput, CityEventUncheckedCreateWithoutCityInput>
  }

  export type CityEventUpdateWithWhereUniqueWithoutCityInput = {
    where: CityEventWhereUniqueInput
    data: XOR<CityEventUpdateWithoutCityInput, CityEventUncheckedUpdateWithoutCityInput>
  }

  export type CityEventUpdateManyWithWhereWithoutCityInput = {
    where: CityEventScalarWhereInput
    data: XOR<CityEventUpdateManyMutationInput, CityEventUncheckedUpdateManyWithoutEventsInput>
  }

  export type CityEventScalarWhereInput = {
    AND?: Enumerable<CityEventScalarWhereInput>
    OR?: Enumerable<CityEventScalarWhereInput>
    NOT?: Enumerable<CityEventScalarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    title?: StringFilter | string
    description?: StringFilter | string
    date?: StringFilter | string
    location?: StringFilter | string
    lat?: FloatFilter | number
    lng?: FloatFilter | number
    imageUrl?: StringNullableFilter | string | null
    bookingUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityCarUpsertWithWhereUniqueWithoutCityInput = {
    where: CityCarWhereUniqueInput
    update: XOR<CityCarUpdateWithoutCityInput, CityCarUncheckedUpdateWithoutCityInput>
    create: XOR<CityCarCreateWithoutCityInput, CityCarUncheckedCreateWithoutCityInput>
  }

  export type CityCarUpdateWithWhereUniqueWithoutCityInput = {
    where: CityCarWhereUniqueInput
    data: XOR<CityCarUpdateWithoutCityInput, CityCarUncheckedUpdateWithoutCityInput>
  }

  export type CityCarUpdateManyWithWhereWithoutCityInput = {
    where: CityCarScalarWhereInput
    data: XOR<CityCarUpdateManyMutationInput, CityCarUncheckedUpdateManyWithoutCarsInput>
  }

  export type CityCarScalarWhereInput = {
    AND?: Enumerable<CityCarScalarWhereInput>
    OR?: Enumerable<CityCarScalarWhereInput>
    NOT?: Enumerable<CityCarScalarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    name?: StringFilter | string
    type?: StringFilter | string
    pricePerDay?: FloatFilter | number
    transmission?: StringFilter | string
    fuel?: StringFilter | string
    contactInfo?: StringNullableFilter | string | null
    imageUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityTourGuideUpsertWithWhereUniqueWithoutCityInput = {
    where: CityTourGuideWhereUniqueInput
    update: XOR<CityTourGuideUpdateWithoutCityInput, CityTourGuideUncheckedUpdateWithoutCityInput>
    create: XOR<CityTourGuideCreateWithoutCityInput, CityTourGuideUncheckedCreateWithoutCityInput>
  }

  export type CityTourGuideUpdateWithWhereUniqueWithoutCityInput = {
    where: CityTourGuideWhereUniqueInput
    data: XOR<CityTourGuideUpdateWithoutCityInput, CityTourGuideUncheckedUpdateWithoutCityInput>
  }

  export type CityTourGuideUpdateManyWithWhereWithoutCityInput = {
    where: CityTourGuideScalarWhereInput
    data: XOR<CityTourGuideUpdateManyMutationInput, CityTourGuideUncheckedUpdateManyWithoutTourGuidesInput>
  }

  export type CityTourGuideScalarWhereInput = {
    AND?: Enumerable<CityTourGuideScalarWhereInput>
    OR?: Enumerable<CityTourGuideScalarWhereInput>
    NOT?: Enumerable<CityTourGuideScalarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    name?: StringFilter | string
    bio?: StringFilter | string
    languages?: StringNullableListFilter
    pricePerHour?: FloatFilter | number
    rating?: FloatFilter | number
    contactInfo?: StringNullableFilter | string | null
    imageUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityApplicationUpsertWithWhereUniqueWithoutCityInput = {
    where: CityApplicationWhereUniqueInput
    update: XOR<CityApplicationUpdateWithoutCityInput, CityApplicationUncheckedUpdateWithoutCityInput>
    create: XOR<CityApplicationCreateWithoutCityInput, CityApplicationUncheckedCreateWithoutCityInput>
  }

  export type CityApplicationUpdateWithWhereUniqueWithoutCityInput = {
    where: CityApplicationWhereUniqueInput
    data: XOR<CityApplicationUpdateWithoutCityInput, CityApplicationUncheckedUpdateWithoutCityInput>
  }

  export type CityApplicationUpdateManyWithWhereWithoutCityInput = {
    where: CityApplicationScalarWhereInput
    data: XOR<CityApplicationUpdateManyMutationInput, CityApplicationUncheckedUpdateManyWithoutApplicationsInput>
  }

  export type CityApplicationScalarWhereInput = {
    AND?: Enumerable<CityApplicationScalarWhereInput>
    OR?: Enumerable<CityApplicationScalarWhereInput>
    NOT?: Enumerable<CityApplicationScalarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    name?: StringFilter | string
    description?: StringFilter | string
    iconUrl?: StringNullableFilter | string | null
    androidLink?: StringNullableFilter | string | null
    iphoneLink?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type ActivityUpsertWithWhereUniqueWithoutCityInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutCityInput, ActivityUncheckedUpdateWithoutCityInput>
    create: XOR<ActivityCreateWithoutCityInput, ActivityUncheckedCreateWithoutCityInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutCityInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutCityInput, ActivityUncheckedUpdateWithoutCityInput>
  }

  export type ActivityUpdateManyWithWhereWithoutCityInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutActivitiesInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: Enumerable<ActivityScalarWhereInput>
    OR?: Enumerable<ActivityScalarWhereInput>
    NOT?: Enumerable<ActivityScalarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    price?: FloatNullableFilter | number | null
    currency?: StringNullableFilter | string | null
    lat?: FloatFilter | number
    lng?: FloatFilter | number
    images?: StringNullableListFilter
    tags?: StringNullableListFilter
    bookingUrl?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type DriverUpsertWithWhereUniqueWithoutCityInput = {
    where: DriverWhereUniqueInput
    update: XOR<DriverUpdateWithoutCityInput, DriverUncheckedUpdateWithoutCityInput>
    create: XOR<DriverCreateWithoutCityInput, DriverUncheckedCreateWithoutCityInput>
  }

  export type DriverUpdateWithWhereUniqueWithoutCityInput = {
    where: DriverWhereUniqueInput
    data: XOR<DriverUpdateWithoutCityInput, DriverUncheckedUpdateWithoutCityInput>
  }

  export type DriverUpdateManyWithWhereWithoutCityInput = {
    where: DriverScalarWhereInput
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyWithoutDriversInput>
  }

  export type DriverScalarWhereInput = {
    AND?: Enumerable<DriverScalarWhereInput>
    OR?: Enumerable<DriverScalarWhereInput>
    NOT?: Enumerable<DriverScalarWhereInput>
    id?: StringFilter | string
    cityId?: StringFilter | string
    name?: StringFilter | string
    phone?: StringNullableFilter | string | null
    contactInfo?: StringNullableFilter | string | null
    pricePerDay?: FloatNullableFilter | number | null
    vehicleType?: StringNullableFilter | string | null
    rating?: FloatNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type TripCityUpsertWithWhereUniqueWithoutCityInput = {
    where: TripCityWhereUniqueInput
    update: XOR<TripCityUpdateWithoutCityInput, TripCityUncheckedUpdateWithoutCityInput>
    create: XOR<TripCityCreateWithoutCityInput, TripCityUncheckedCreateWithoutCityInput>
  }

  export type TripCityUpdateWithWhereUniqueWithoutCityInput = {
    where: TripCityWhereUniqueInput
    data: XOR<TripCityUpdateWithoutCityInput, TripCityUncheckedUpdateWithoutCityInput>
  }

  export type TripCityUpdateManyWithWhereWithoutCityInput = {
    where: TripCityScalarWhereInput
    data: XOR<TripCityUpdateManyMutationInput, TripCityUncheckedUpdateManyWithoutTripCitiesInput>
  }

  export type TripCityScalarWhereInput = {
    AND?: Enumerable<TripCityScalarWhereInput>
    OR?: Enumerable<TripCityScalarWhereInput>
    NOT?: Enumerable<TripCityScalarWhereInput>
    id?: StringFilter | string
    tripId?: StringFilter | string
    cityId?: StringFilter | string
    startDate?: StringFilter | string
    endDate?: StringFilter | string
  }

  export type CityCreateWithoutTipsInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutTipsInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutTipsInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutTipsInput, CityUncheckedCreateWithoutTipsInput>
  }

  export type CityUpsertWithoutTipsInput = {
    update: XOR<CityUpdateWithoutTipsInput, CityUncheckedUpdateWithoutTipsInput>
    create: XOR<CityCreateWithoutTipsInput, CityUncheckedCreateWithoutTipsInput>
  }

  export type CityUpdateWithoutTipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutTipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateWithoutDocumentsInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutDocumentsInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutDocumentsInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutDocumentsInput, CityUncheckedCreateWithoutDocumentsInput>
  }

  export type CityUpsertWithoutDocumentsInput = {
    update: XOR<CityUpdateWithoutDocumentsInput, CityUncheckedUpdateWithoutDocumentsInput>
    create: XOR<CityCreateWithoutDocumentsInput, CityUncheckedCreateWithoutDocumentsInput>
  }

  export type CityUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateWithoutRecommendedItemsInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutRecommendedItemsInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutRecommendedItemsInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutRecommendedItemsInput, CityUncheckedCreateWithoutRecommendedItemsInput>
  }

  export type CityUpsertWithoutRecommendedItemsInput = {
    update: XOR<CityUpdateWithoutRecommendedItemsInput, CityUncheckedUpdateWithoutRecommendedItemsInput>
    create: XOR<CityCreateWithoutRecommendedItemsInput, CityUncheckedCreateWithoutRecommendedItemsInput>
  }

  export type CityUpdateWithoutRecommendedItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutRecommendedItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateWithoutEventsInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutEventsInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutEventsInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutEventsInput, CityUncheckedCreateWithoutEventsInput>
  }

  export type TripItemCreateWithoutEventInput = {
    id?: string
    tripCity: TripCityCreateNestedOneWithoutItemsInput
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    activity?: ActivityCreateNestedOneWithoutTripItemsInput
  }

  export type TripItemUncheckedCreateWithoutEventInput = {
    id?: string
    tripCityId: string
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    activityId?: string | null
  }

  export type TripItemCreateOrConnectWithoutEventInput = {
    where: TripItemWhereUniqueInput
    create: XOR<TripItemCreateWithoutEventInput, TripItemUncheckedCreateWithoutEventInput>
  }

  export type TripItemCreateManyEventInputEnvelope = {
    data: Enumerable<TripItemCreateManyEventInput>
    skipDuplicates?: boolean
  }

  export type CityUpsertWithoutEventsInput = {
    update: XOR<CityUpdateWithoutEventsInput, CityUncheckedUpdateWithoutEventsInput>
    create: XOR<CityCreateWithoutEventsInput, CityUncheckedCreateWithoutEventsInput>
  }

  export type CityUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripItemUpsertWithWhereUniqueWithoutEventInput = {
    where: TripItemWhereUniqueInput
    update: XOR<TripItemUpdateWithoutEventInput, TripItemUncheckedUpdateWithoutEventInput>
    create: XOR<TripItemCreateWithoutEventInput, TripItemUncheckedCreateWithoutEventInput>
  }

  export type TripItemUpdateWithWhereUniqueWithoutEventInput = {
    where: TripItemWhereUniqueInput
    data: XOR<TripItemUpdateWithoutEventInput, TripItemUncheckedUpdateWithoutEventInput>
  }

  export type TripItemUpdateManyWithWhereWithoutEventInput = {
    where: TripItemScalarWhereInput
    data: XOR<TripItemUpdateManyMutationInput, TripItemUncheckedUpdateManyWithoutTripItemsInput>
  }

  export type TripItemScalarWhereInput = {
    AND?: Enumerable<TripItemScalarWhereInput>
    OR?: Enumerable<TripItemScalarWhereInput>
    NOT?: Enumerable<TripItemScalarWhereInput>
    id?: StringFilter | string
    tripCityId?: StringFilter | string
    type?: StringFilter | string
    date?: StringFilter | string
    startTime?: StringNullableFilter | string | null
    endTime?: StringNullableFilter | string | null
    activityId?: StringNullableFilter | string | null
    eventId?: StringNullableFilter | string | null
  }

  export type CityCreateWithoutCarsInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutCarsInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutCarsInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutCarsInput, CityUncheckedCreateWithoutCarsInput>
  }

  export type CityUpsertWithoutCarsInput = {
    update: XOR<CityUpdateWithoutCarsInput, CityUncheckedUpdateWithoutCarsInput>
    create: XOR<CityCreateWithoutCarsInput, CityUncheckedCreateWithoutCarsInput>
  }

  export type CityUpdateWithoutCarsInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutCarsInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateWithoutTourGuidesInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutTourGuidesInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutTourGuidesInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutTourGuidesInput, CityUncheckedCreateWithoutTourGuidesInput>
  }

  export type CityUpsertWithoutTourGuidesInput = {
    update: XOR<CityUpdateWithoutTourGuidesInput, CityUncheckedUpdateWithoutTourGuidesInput>
    create: XOR<CityCreateWithoutTourGuidesInput, CityUncheckedCreateWithoutTourGuidesInput>
  }

  export type CityUpdateWithoutTourGuidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutTourGuidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateWithoutApplicationsInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutApplicationsInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutApplicationsInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutApplicationsInput, CityUncheckedCreateWithoutApplicationsInput>
  }

  export type CityUpsertWithoutApplicationsInput = {
    update: XOR<CityUpdateWithoutApplicationsInput, CityUncheckedUpdateWithoutApplicationsInput>
    create: XOR<CityCreateWithoutApplicationsInput, CityUncheckedCreateWithoutApplicationsInput>
  }

  export type CityUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateWithoutActivitiesInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutActivitiesInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutActivitiesInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutActivitiesInput, CityUncheckedCreateWithoutActivitiesInput>
  }

  export type TripItemCreateWithoutActivityInput = {
    id?: string
    tripCity: TripCityCreateNestedOneWithoutItemsInput
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    event?: CityEventCreateNestedOneWithoutTripItemsInput
  }

  export type TripItemUncheckedCreateWithoutActivityInput = {
    id?: string
    tripCityId: string
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    eventId?: string | null
  }

  export type TripItemCreateOrConnectWithoutActivityInput = {
    where: TripItemWhereUniqueInput
    create: XOR<TripItemCreateWithoutActivityInput, TripItemUncheckedCreateWithoutActivityInput>
  }

  export type TripItemCreateManyActivityInputEnvelope = {
    data: Enumerable<TripItemCreateManyActivityInput>
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutActivityInput = {
    id?: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    driver?: DriverCreateNestedOneWithoutBookingsInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUncheckedCreateWithoutActivityInput = {
    id?: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    driverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutActivityInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutActivityInput, BookingUncheckedCreateWithoutActivityInput>
  }

  export type BookingCreateManyActivityInputEnvelope = {
    data: Enumerable<BookingCreateManyActivityInput>
    skipDuplicates?: boolean
  }

  export type CityUpsertWithoutActivitiesInput = {
    update: XOR<CityUpdateWithoutActivitiesInput, CityUncheckedUpdateWithoutActivitiesInput>
    create: XOR<CityCreateWithoutActivitiesInput, CityUncheckedCreateWithoutActivitiesInput>
  }

  export type CityUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripItemUpsertWithWhereUniqueWithoutActivityInput = {
    where: TripItemWhereUniqueInput
    update: XOR<TripItemUpdateWithoutActivityInput, TripItemUncheckedUpdateWithoutActivityInput>
    create: XOR<TripItemCreateWithoutActivityInput, TripItemUncheckedCreateWithoutActivityInput>
  }

  export type TripItemUpdateWithWhereUniqueWithoutActivityInput = {
    where: TripItemWhereUniqueInput
    data: XOR<TripItemUpdateWithoutActivityInput, TripItemUncheckedUpdateWithoutActivityInput>
  }

  export type TripItemUpdateManyWithWhereWithoutActivityInput = {
    where: TripItemScalarWhereInput
    data: XOR<TripItemUpdateManyMutationInput, TripItemUncheckedUpdateManyWithoutTripItemsInput>
  }

  export type BookingUpsertWithWhereUniqueWithoutActivityInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutActivityInput, BookingUncheckedUpdateWithoutActivityInput>
    create: XOR<BookingCreateWithoutActivityInput, BookingUncheckedCreateWithoutActivityInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutActivityInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutActivityInput, BookingUncheckedUpdateWithoutActivityInput>
  }

  export type BookingUpdateManyWithWhereWithoutActivityInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutBookingsInput>
  }

  export type BookingScalarWhereInput = {
    AND?: Enumerable<BookingScalarWhereInput>
    OR?: Enumerable<BookingScalarWhereInput>
    NOT?: Enumerable<BookingScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    date?: StringFilter | string
    status?: StringFilter | string
    price?: FloatFilter | number
    currency?: StringFilter | string
    activityId?: StringNullableFilter | string | null
    driverId?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type CityCreateWithoutDriversInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    tripCities?: TripCityCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutDriversInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    tripCities?: TripCityUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutDriversInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutDriversInput, CityUncheckedCreateWithoutDriversInput>
  }

  export type BookingCreateWithoutDriverInput = {
    id?: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    activity?: ActivityCreateNestedOneWithoutBookingsInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUncheckedCreateWithoutDriverInput = {
    id?: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    activityId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutDriverInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutDriverInput, BookingUncheckedCreateWithoutDriverInput>
  }

  export type BookingCreateManyDriverInputEnvelope = {
    data: Enumerable<BookingCreateManyDriverInput>
    skipDuplicates?: boolean
  }

  export type CityUpsertWithoutDriversInput = {
    update: XOR<CityUpdateWithoutDriversInput, CityUncheckedUpdateWithoutDriversInput>
    create: XOR<CityCreateWithoutDriversInput, CityUncheckedCreateWithoutDriversInput>
  }

  export type CityUpdateWithoutDriversInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutDriversInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutDriverInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutDriverInput, BookingUncheckedUpdateWithoutDriverInput>
    create: XOR<BookingCreateWithoutDriverInput, BookingUncheckedCreateWithoutDriverInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutDriverInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutDriverInput, BookingUncheckedUpdateWithoutDriverInput>
  }

  export type BookingUpdateManyWithWhereWithoutDriverInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutBookingsInput>
  }

  export type TripCityCreateWithoutTripInput = {
    id?: string
    city: CityCreateNestedOneWithoutTripCitiesInput
    startDate: string
    endDate: string
    items?: TripItemCreateNestedManyWithoutTripCityInput
  }

  export type TripCityUncheckedCreateWithoutTripInput = {
    id?: string
    cityId: string
    startDate: string
    endDate: string
    items?: TripItemUncheckedCreateNestedManyWithoutTripCityInput
  }

  export type TripCityCreateOrConnectWithoutTripInput = {
    where: TripCityWhereUniqueInput
    create: XOR<TripCityCreateWithoutTripInput, TripCityUncheckedCreateWithoutTripInput>
  }

  export type TripCityCreateManyTripInputEnvelope = {
    data: Enumerable<TripCityCreateManyTripInput>
    skipDuplicates?: boolean
  }

  export type TripPackingItemCreateWithoutTripInput = {
    id?: string
    cityId?: string | null
    title: string
    description?: string | null
    category: string
    isPacked?: boolean
    referenceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripPackingItemUncheckedCreateWithoutTripInput = {
    id?: string
    cityId?: string | null
    title: string
    description?: string | null
    category: string
    isPacked?: boolean
    referenceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripPackingItemCreateOrConnectWithoutTripInput = {
    where: TripPackingItemWhereUniqueInput
    create: XOR<TripPackingItemCreateWithoutTripInput, TripPackingItemUncheckedCreateWithoutTripInput>
  }

  export type TripPackingItemCreateManyTripInputEnvelope = {
    data: Enumerable<TripPackingItemCreateManyTripInput>
    skipDuplicates?: boolean
  }

  export type TripCityUpsertWithWhereUniqueWithoutTripInput = {
    where: TripCityWhereUniqueInput
    update: XOR<TripCityUpdateWithoutTripInput, TripCityUncheckedUpdateWithoutTripInput>
    create: XOR<TripCityCreateWithoutTripInput, TripCityUncheckedCreateWithoutTripInput>
  }

  export type TripCityUpdateWithWhereUniqueWithoutTripInput = {
    where: TripCityWhereUniqueInput
    data: XOR<TripCityUpdateWithoutTripInput, TripCityUncheckedUpdateWithoutTripInput>
  }

  export type TripCityUpdateManyWithWhereWithoutTripInput = {
    where: TripCityScalarWhereInput
    data: XOR<TripCityUpdateManyMutationInput, TripCityUncheckedUpdateManyWithoutCitiesInput>
  }

  export type TripPackingItemUpsertWithWhereUniqueWithoutTripInput = {
    where: TripPackingItemWhereUniqueInput
    update: XOR<TripPackingItemUpdateWithoutTripInput, TripPackingItemUncheckedUpdateWithoutTripInput>
    create: XOR<TripPackingItemCreateWithoutTripInput, TripPackingItemUncheckedCreateWithoutTripInput>
  }

  export type TripPackingItemUpdateWithWhereUniqueWithoutTripInput = {
    where: TripPackingItemWhereUniqueInput
    data: XOR<TripPackingItemUpdateWithoutTripInput, TripPackingItemUncheckedUpdateWithoutTripInput>
  }

  export type TripPackingItemUpdateManyWithWhereWithoutTripInput = {
    where: TripPackingItemScalarWhereInput
    data: XOR<TripPackingItemUpdateManyMutationInput, TripPackingItemUncheckedUpdateManyWithoutPackingListInput>
  }

  export type TripPackingItemScalarWhereInput = {
    AND?: Enumerable<TripPackingItemScalarWhereInput>
    OR?: Enumerable<TripPackingItemScalarWhereInput>
    NOT?: Enumerable<TripPackingItemScalarWhereInput>
    id?: StringFilter | string
    tripId?: StringFilter | string
    cityId?: StringNullableFilter | string | null
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    category?: StringFilter | string
    isPacked?: BoolFilter | boolean
    referenceId?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type TripCreateWithoutCitiesInput = {
    id?: string
    userId: string
    title: string
    startDate: string
    endDate: string
    status: string
    progress?: number
    countryId: string
    packingList?: TripPackingItemCreateNestedManyWithoutTripInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripUncheckedCreateWithoutCitiesInput = {
    id?: string
    userId: string
    title: string
    startDate: string
    endDate: string
    status: string
    progress?: number
    countryId: string
    packingList?: TripPackingItemUncheckedCreateNestedManyWithoutTripInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripCreateOrConnectWithoutCitiesInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutCitiesInput, TripUncheckedCreateWithoutCitiesInput>
  }

  export type CityCreateWithoutTripCitiesInput = {
    id?: string
    country: CountryCreateNestedOneWithoutCitiesInput
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipCreateNestedManyWithoutCityInput
    documents?: CityDocumentCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemCreateNestedManyWithoutCityInput
    events?: CityEventCreateNestedManyWithoutCityInput
    cars?: CityCarCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideCreateNestedManyWithoutCityInput
    applications?: CityApplicationCreateNestedManyWithoutCityInput
    activities?: ActivityCreateNestedManyWithoutCityInput
    drivers?: DriverCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUncheckedCreateWithoutTripCitiesInput = {
    id?: string
    countryId: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    tips?: CityTipUncheckedCreateNestedManyWithoutCityInput
    documents?: CityDocumentUncheckedCreateNestedManyWithoutCityInput
    recommendedItems?: CityRecommendedItemUncheckedCreateNestedManyWithoutCityInput
    events?: CityEventUncheckedCreateNestedManyWithoutCityInput
    cars?: CityCarUncheckedCreateNestedManyWithoutCityInput
    tourGuides?: CityTourGuideUncheckedCreateNestedManyWithoutCityInput
    applications?: CityApplicationUncheckedCreateNestedManyWithoutCityInput
    activities?: ActivityUncheckedCreateNestedManyWithoutCityInput
    drivers?: DriverUncheckedCreateNestedManyWithoutCityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCreateOrConnectWithoutTripCitiesInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutTripCitiesInput, CityUncheckedCreateWithoutTripCitiesInput>
  }

  export type TripItemCreateWithoutTripCityInput = {
    id?: string
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    activity?: ActivityCreateNestedOneWithoutTripItemsInput
    event?: CityEventCreateNestedOneWithoutTripItemsInput
  }

  export type TripItemUncheckedCreateWithoutTripCityInput = {
    id?: string
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    activityId?: string | null
    eventId?: string | null
  }

  export type TripItemCreateOrConnectWithoutTripCityInput = {
    where: TripItemWhereUniqueInput
    create: XOR<TripItemCreateWithoutTripCityInput, TripItemUncheckedCreateWithoutTripCityInput>
  }

  export type TripItemCreateManyTripCityInputEnvelope = {
    data: Enumerable<TripItemCreateManyTripCityInput>
    skipDuplicates?: boolean
  }

  export type TripUpsertWithoutCitiesInput = {
    update: XOR<TripUpdateWithoutCitiesInput, TripUncheckedUpdateWithoutCitiesInput>
    create: XOR<TripCreateWithoutCitiesInput, TripUncheckedCreateWithoutCitiesInput>
  }

  export type TripUpdateWithoutCitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    countryId?: StringFieldUpdateOperationsInput | string
    packingList?: TripPackingItemUpdateManyWithoutTripNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripUncheckedUpdateWithoutCitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    countryId?: StringFieldUpdateOperationsInput | string
    packingList?: TripPackingItemUncheckedUpdateManyWithoutTripNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUpsertWithoutTripCitiesInput = {
    update: XOR<CityUpdateWithoutTripCitiesInput, CityUncheckedUpdateWithoutTripCitiesInput>
    create: XOR<CityCreateWithoutTripCitiesInput, CityUncheckedCreateWithoutTripCitiesInput>
  }

  export type CityUpdateWithoutTripCitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    country?: CountryUpdateOneRequiredWithoutCitiesNestedInput
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutTripCitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripItemUpsertWithWhereUniqueWithoutTripCityInput = {
    where: TripItemWhereUniqueInput
    update: XOR<TripItemUpdateWithoutTripCityInput, TripItemUncheckedUpdateWithoutTripCityInput>
    create: XOR<TripItemCreateWithoutTripCityInput, TripItemUncheckedCreateWithoutTripCityInput>
  }

  export type TripItemUpdateWithWhereUniqueWithoutTripCityInput = {
    where: TripItemWhereUniqueInput
    data: XOR<TripItemUpdateWithoutTripCityInput, TripItemUncheckedUpdateWithoutTripCityInput>
  }

  export type TripItemUpdateManyWithWhereWithoutTripCityInput = {
    where: TripItemScalarWhereInput
    data: XOR<TripItemUpdateManyMutationInput, TripItemUncheckedUpdateManyWithoutItemsInput>
  }

  export type TripCityCreateWithoutItemsInput = {
    id?: string
    trip: TripCreateNestedOneWithoutCitiesInput
    city: CityCreateNestedOneWithoutTripCitiesInput
    startDate: string
    endDate: string
  }

  export type TripCityUncheckedCreateWithoutItemsInput = {
    id?: string
    tripId: string
    cityId: string
    startDate: string
    endDate: string
  }

  export type TripCityCreateOrConnectWithoutItemsInput = {
    where: TripCityWhereUniqueInput
    create: XOR<TripCityCreateWithoutItemsInput, TripCityUncheckedCreateWithoutItemsInput>
  }

  export type ActivityCreateWithoutTripItemsInput = {
    id?: string
    city: CityCreateNestedOneWithoutActivitiesInput
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    bookings?: BookingCreateNestedManyWithoutActivityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUncheckedCreateWithoutTripItemsInput = {
    id?: string
    cityId: string
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    bookings?: BookingUncheckedCreateNestedManyWithoutActivityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutTripItemsInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutTripItemsInput, ActivityUncheckedCreateWithoutTripItemsInput>
  }

  export type CityEventCreateWithoutTripItemsInput = {
    id?: string
    city: CityCreateNestedOneWithoutEventsInput
    title: string
    description: string
    date: string
    location: string
    lat: number
    lng: number
    imageUrl?: string | null
    bookingUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityEventUncheckedCreateWithoutTripItemsInput = {
    id?: string
    cityId: string
    title: string
    description: string
    date: string
    location: string
    lat: number
    lng: number
    imageUrl?: string | null
    bookingUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityEventCreateOrConnectWithoutTripItemsInput = {
    where: CityEventWhereUniqueInput
    create: XOR<CityEventCreateWithoutTripItemsInput, CityEventUncheckedCreateWithoutTripItemsInput>
  }

  export type TripCityUpsertWithoutItemsInput = {
    update: XOR<TripCityUpdateWithoutItemsInput, TripCityUncheckedUpdateWithoutItemsInput>
    create: XOR<TripCityCreateWithoutItemsInput, TripCityUncheckedCreateWithoutItemsInput>
  }

  export type TripCityUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    trip?: TripUpdateOneRequiredWithoutCitiesNestedInput
    city?: CityUpdateOneRequiredWithoutTripCitiesNestedInput
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
  }

  export type TripCityUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityUpsertWithoutTripItemsInput = {
    update: XOR<ActivityUpdateWithoutTripItemsInput, ActivityUncheckedUpdateWithoutTripItemsInput>
    create: XOR<ActivityCreateWithoutTripItemsInput, ActivityUncheckedCreateWithoutTripItemsInput>
  }

  export type ActivityUpdateWithoutTripItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutActivitiesNestedInput
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: BookingUpdateManyWithoutActivityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateWithoutTripItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: BookingUncheckedUpdateManyWithoutActivityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityEventUpsertWithoutTripItemsInput = {
    update: XOR<CityEventUpdateWithoutTripItemsInput, CityEventUncheckedUpdateWithoutTripItemsInput>
    create: XOR<CityEventCreateWithoutTripItemsInput, CityEventUncheckedCreateWithoutTripItemsInput>
  }

  export type CityEventUpdateWithoutTripItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutEventsNestedInput
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityEventUncheckedUpdateWithoutTripItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCreateWithoutPackingListInput = {
    id?: string
    userId: string
    title: string
    startDate: string
    endDate: string
    status: string
    progress?: number
    countryId: string
    cities?: TripCityCreateNestedManyWithoutTripInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripUncheckedCreateWithoutPackingListInput = {
    id?: string
    userId: string
    title: string
    startDate: string
    endDate: string
    status: string
    progress?: number
    countryId: string
    cities?: TripCityUncheckedCreateNestedManyWithoutTripInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripCreateOrConnectWithoutPackingListInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutPackingListInput, TripUncheckedCreateWithoutPackingListInput>
  }

  export type TripUpsertWithoutPackingListInput = {
    update: XOR<TripUpdateWithoutPackingListInput, TripUncheckedUpdateWithoutPackingListInput>
    create: XOR<TripCreateWithoutPackingListInput, TripUncheckedCreateWithoutPackingListInput>
  }

  export type TripUpdateWithoutPackingListInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    countryId?: StringFieldUpdateOperationsInput | string
    cities?: TripCityUpdateManyWithoutTripNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripUncheckedUpdateWithoutPackingListInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: FloatFieldUpdateOperationsInput | number
    countryId?: StringFieldUpdateOperationsInput | string
    cities?: TripCityUncheckedUpdateManyWithoutTripNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateWithoutBookingsInput = {
    id?: string
    city: CityCreateNestedOneWithoutActivitiesInput
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    tripItems?: TripItemCreateNestedManyWithoutActivityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityUncheckedCreateWithoutBookingsInput = {
    id?: string
    cityId: string
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    tripItems?: TripItemUncheckedCreateNestedManyWithoutActivityInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityCreateOrConnectWithoutBookingsInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutBookingsInput, ActivityUncheckedCreateWithoutBookingsInput>
  }

  export type DriverCreateWithoutBookingsInput = {
    id?: string
    city: CityCreateNestedOneWithoutDriversInput
    name: string
    phone?: string | null
    contactInfo?: string | null
    pricePerDay?: number | null
    vehicleType?: string | null
    rating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverUncheckedCreateWithoutBookingsInput = {
    id?: string
    cityId: string
    name: string
    phone?: string | null
    contactInfo?: string | null
    pricePerDay?: number | null
    vehicleType?: string | null
    rating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverCreateOrConnectWithoutBookingsInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutBookingsInput, DriverUncheckedCreateWithoutBookingsInput>
  }

  export type ActivityUpsertWithoutBookingsInput = {
    update: XOR<ActivityUpdateWithoutBookingsInput, ActivityUncheckedUpdateWithoutBookingsInput>
    create: XOR<ActivityCreateWithoutBookingsInput, ActivityUncheckedCreateWithoutBookingsInput>
  }

  export type ActivityUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutActivitiesNestedInput
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUpdateManyWithoutActivityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUncheckedUpdateManyWithoutActivityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUpsertWithoutBookingsInput = {
    update: XOR<DriverUpdateWithoutBookingsInput, DriverUncheckedUpdateWithoutBookingsInput>
    create: XOR<DriverCreateWithoutBookingsInput, DriverUncheckedCreateWithoutBookingsInput>
  }

  export type DriverUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutDriversNestedInput
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    pricePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    pricePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCreateManyCountryInput = {
    id?: string
    name: string
    lat: number
    lng: number
    images?: CityCreateimagesInput | Enumerable<string>
    timezone?: string | null
    currency?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityUpdateWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUpdateManyWithoutCityNestedInput
    events?: CityEventUpdateManyWithoutCityNestedInput
    cars?: CityCarUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUpdateManyWithoutCityNestedInput
    activities?: ActivityUpdateManyWithoutCityNestedInput
    drivers?: DriverUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    tips?: CityTipUncheckedUpdateManyWithoutCityNestedInput
    documents?: CityDocumentUncheckedUpdateManyWithoutCityNestedInput
    recommendedItems?: CityRecommendedItemUncheckedUpdateManyWithoutCityNestedInput
    events?: CityEventUncheckedUpdateManyWithoutCityNestedInput
    cars?: CityCarUncheckedUpdateManyWithoutCityNestedInput
    tourGuides?: CityTourGuideUncheckedUpdateManyWithoutCityNestedInput
    applications?: CityApplicationUncheckedUpdateManyWithoutCityNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutCityNestedInput
    drivers?: DriverUncheckedUpdateManyWithoutCityNestedInput
    tripCities?: TripCityUncheckedUpdateManyWithoutCityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityUncheckedUpdateManyWithoutCitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: CityUpdateimagesInput | Enumerable<string>
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTipCreateManyCityInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityDocumentCreateManyCityInput = {
    id?: string
    name: string
    exampleUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityRecommendedItemCreateManyCityInput = {
    id?: string
    name: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityEventCreateManyCityInput = {
    id?: string
    title: string
    description: string
    date: string
    location: string
    lat: number
    lng: number
    imageUrl?: string | null
    bookingUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityCarCreateManyCityInput = {
    id?: string
    name: string
    type: string
    pricePerDay: number
    transmission: string
    fuel: string
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityTourGuideCreateManyCityInput = {
    id?: string
    name: string
    bio: string
    languages?: CityTourGuideCreatelanguagesInput | Enumerable<string>
    pricePerHour: number
    rating: number
    contactInfo?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CityApplicationCreateManyCityInput = {
    id?: string
    name: string
    description: string
    iconUrl?: string | null
    androidLink?: string | null
    iphoneLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityCreateManyCityInput = {
    id?: string
    title: string
    description?: string | null
    price?: number | null
    currency?: string | null
    lat: number
    lng: number
    images?: ActivityCreateimagesInput | Enumerable<string>
    tags?: ActivityCreatetagsInput | Enumerable<string>
    bookingUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverCreateManyCityInput = {
    id?: string
    name: string
    phone?: string | null
    contactInfo?: string | null
    pricePerDay?: number | null
    vehicleType?: string | null
    rating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripCityCreateManyCityInput = {
    id?: string
    tripId: string
    startDate: string
    endDate: string
  }

  export type CityTipUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTipUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTipUncheckedUpdateManyWithoutTipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityDocumentUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exampleUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityDocumentUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exampleUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityDocumentUncheckedUpdateManyWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    exampleUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityRecommendedItemUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityRecommendedItemUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityRecommendedItemUncheckedUpdateManyWithoutRecommendedItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityEventUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUpdateManyWithoutEventNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityEventUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUncheckedUpdateManyWithoutEventNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityEventUncheckedUpdateManyWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCarUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    fuel?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCarUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    fuel?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityCarUncheckedUpdateManyWithoutCarsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    transmission?: StringFieldUpdateOperationsInput | string
    fuel?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTourGuideUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    languages?: CityTourGuideUpdatelanguagesInput | Enumerable<string>
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTourGuideUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    languages?: CityTourGuideUpdatelanguagesInput | Enumerable<string>
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityTourGuideUncheckedUpdateManyWithoutTourGuidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    languages?: CityTourGuideUpdatelanguagesInput | Enumerable<string>
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityApplicationUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    androidLink?: NullableStringFieldUpdateOperationsInput | string | null
    iphoneLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityApplicationUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    androidLink?: NullableStringFieldUpdateOperationsInput | string | null
    iphoneLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CityApplicationUncheckedUpdateManyWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    iconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    androidLink?: NullableStringFieldUpdateOperationsInput | string | null
    iphoneLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUpdateManyWithoutActivityNestedInput
    bookings?: BookingUpdateManyWithoutActivityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    tripItems?: TripItemUncheckedUpdateManyWithoutActivityNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutActivityNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    images?: ActivityUpdateimagesInput | Enumerable<string>
    tags?: ActivityUpdatetagsInput | Enumerable<string>
    bookingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    pricePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    bookings?: BookingUpdateManyWithoutDriverNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    pricePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    bookings?: BookingUncheckedUpdateManyWithoutDriverNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateManyWithoutDriversInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    pricePerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    vehicleType?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCityUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    trip?: TripUpdateOneRequiredWithoutCitiesNestedInput
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    items?: TripItemUpdateManyWithoutTripCityNestedInput
  }

  export type TripCityUncheckedUpdateWithoutCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    items?: TripItemUncheckedUpdateManyWithoutTripCityNestedInput
  }

  export type TripCityUncheckedUpdateManyWithoutTripCitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
  }

  export type TripItemCreateManyEventInput = {
    id?: string
    tripCityId: string
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    activityId?: string | null
  }

  export type TripItemUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripCity?: TripCityUpdateOneRequiredWithoutItemsNestedInput
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    activity?: ActivityUpdateOneWithoutTripItemsNestedInput
  }

  export type TripItemUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripCityId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripItemUncheckedUpdateManyWithoutTripItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripCityId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripItemCreateManyActivityInput = {
    id?: string
    tripCityId: string
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    eventId?: string | null
  }

  export type BookingCreateManyActivityInput = {
    id?: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    driverId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripItemUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripCity?: TripCityUpdateOneRequiredWithoutItemsNestedInput
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    event?: CityEventUpdateOneWithoutTripItemsNestedInput
  }

  export type TripItemUncheckedUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripCityId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookingUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    driver?: DriverUpdateOneWithoutBookingsNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateWithoutActivityInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    driverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyDriverInput = {
    id?: string
    userId: string
    type: string
    date: string
    status: string
    price: number
    currency: string
    activityId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    activity?: ActivityUpdateOneWithoutBookingsNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    activityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCityCreateManyTripInput = {
    id?: string
    cityId: string
    startDate: string
    endDate: string
  }

  export type TripPackingItemCreateManyTripInput = {
    id?: string
    cityId?: string | null
    title: string
    description?: string | null
    category: string
    isPacked?: boolean
    referenceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TripCityUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateOneRequiredWithoutTripCitiesNestedInput
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    items?: TripItemUpdateManyWithoutTripCityNestedInput
  }

  export type TripCityUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
    items?: TripItemUncheckedUpdateManyWithoutTripCityNestedInput
  }

  export type TripCityUncheckedUpdateManyWithoutCitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    endDate?: StringFieldUpdateOperationsInput | string
  }

  export type TripPackingItemUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPacked?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripPackingItemUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPacked?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripPackingItemUncheckedUpdateManyWithoutPackingListInput = {
    id?: StringFieldUpdateOperationsInput | string
    cityId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    isPacked?: BoolFieldUpdateOperationsInput | boolean
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripItemCreateManyTripCityInput = {
    id?: string
    type: string
    date: string
    startTime?: string | null
    endTime?: string | null
    activityId?: string | null
    eventId?: string | null
  }

  export type TripItemUpdateWithoutTripCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    activity?: ActivityUpdateOneWithoutTripItemsNestedInput
    event?: CityEventUpdateOneWithoutTripItemsNestedInput
  }

  export type TripItemUncheckedUpdateWithoutTripCityInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TripItemUncheckedUpdateManyWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    activityId?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}