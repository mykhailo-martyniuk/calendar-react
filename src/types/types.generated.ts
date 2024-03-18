/* eslint-disable camelcase, @typescript-eslint/ban-types */
/**
 * CountryInfo Dto
 */
export interface CountryInfoDto {
  /** CommonName */
  commonName?: string | null;
  /** OfficialName */
  officialName?: string | null;
  /** CountryCode */
  countryCode?: string | null;
  /** Region */
  region?: string | null;
  /** Country Borders */
  borders?: CountryInfoDto[] | null;
}

/**
 * Country
 */
export interface CountryV3Dto {
  countryCode?: string | null;
  name?: string | null;
}

export enum HolidayTypes {
  Public = 'Public',
  Bank = 'Bank',
  School = 'School',
  Authorities = 'Authorities',
  Optional = 'Optional',
  Observance = 'Observance',
}

/**
 * Long Weekend
 */
export interface LongWeekendV3Dto {
  /**
   * StartDate
   * @format date-time
   */
  startDate?: string;
  /**
   * EndDate
   * @format date-time
   */
  endDate?: string;
  /**
   * DayCount
   * @format int32
   */
  dayCount?: number;
  /** NeedBridgeDay */
  needBridgeDay?: boolean;
}

/**
 * Public Holiday
 */
export interface PublicHolidayV3Dto {
  /**
   * The date
   * @format date
   */
  date?: string;
  /** Local name */
  localName?: string | null;
  /** English name */
  name?: string | null;
  /** ISO 3166-1 alpha-2 */
  countryCode?: string | null;
  /** Is this public holiday every year on the same date */
  fixed?: boolean;
  /** Is this public holiday in every county (federal state) */
  global?: boolean;
  /** ISO-3166-2 - Federal states */
  counties?: string[] | null;
  /**
   * The launch year of the public holiday
   * @format int32
   */
  launchYear?: number | null;
  /** A list of types the public holiday it is valid */
  types?: HolidayTypes[] | null;
}

export interface VersionInfoDto {
  name?: string | null;
  version?: string | null;
}

export interface PublicHolidayIsTodayPublicHolidayParams {
  /** Federal State Code */
  countyCode?: string;
  /**
   * utc timezone offset
   * @format int32
   * @min -12
   * @max 12
   * @default 0
   */
  offset?: number;
  /** The Country Code */
  countryCode: string;
}
