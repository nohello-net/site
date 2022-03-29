import fs from 'fs';
import path from 'path';
// import type moment from 'moment-timezone'

import Translater from './Translater';
import Formatter from './Formatter';
import type IConfiguration from './IConfiguration';

import type { UserConfig } from '@11ty/eleventy';

export type LanguageDirection = 'ltr' | 'rtl';

class i18n {
  private formatter: Formatter = new Formatter();
  private translater: Translater = new Translater();

  private pathPrefix: string | undefined = undefined;

  public configFunction(
    eleventyConfig: UserConfig,
    options: IConfiguration = {}
  ) {
    this.translater.setConfiguration(options);

    eleventyConfig.on('beforeBuild', () =>
      this.translater.reloadTranslations()
    );
    eleventyConfig.on('beforeWatch', () =>
      this.translater.reloadTranslations()
    );

    eleventyConfig.addShortcode(
      '_',
      (locale: string, key: string, ...args: string[]) => {
        return this._(locale, key, ...args);
      }
    );
    eleventyConfig.addShortcode(
      '_i',
      (locale: string, key: string, obj: any) => {
        return this._i(locale, key, obj);
      }
    );
    eleventyConfig.addShortcode(
      '_n',
      (
        locale: string,
        singular: string,
        plural: string,
        count: number,
        ...args: string[]
      ) => {
        return this._n(locale, singular, plural, count, ...args);
      }
    );
    eleventyConfig.addShortcode(
      '_ni',
      (
        locale: string,
        singular: string,
        plural: string,
        count: number,
        obj: any
      ) => {
        return this._ni(locale, singular, plural, count, obj);
      }
    );
    // eleventyConfig.addShortcode(
    //   '_d',
    //   (
    //     locale: string,
    //     format: string,
    //     date: moment.MomentInput,
    //     timezone: string
    //   ) => {
    //     return this._d(locale, format, date, timezone);
    //   }
    // );
    eleventyConfig.addShortcode('_p', (locale: string, path: string) => {
      const url = this._p(locale, path);

      return eleventyConfig.getFilter('url')(url);
    });
    eleventyConfig.addShortcode(
      'relocalizePath',
      (targetedLocale: string, path: string) => {
        const url = this.relocalizePath(targetedLocale, path);

        return eleventyConfig.getFilter('url')(url);
      }
    );
  }

  public enhance11tydata(
    obj: any,
    locale: string,
    dir: LanguageDirection = 'ltr'
  ): any {
    if (fs.existsSync(locale)) {
      // Use path.win32 because it can handle all path styles:
      // - Windows with C:\xxx\yyy\zzz
      // - Linux with /xxx/yyy/zzz
      locale = path.win32.basename(locale);
    }

    if (!['ltr', 'rtl'].includes(dir)) {
      throw new Error(
        `Language direction '${dir}' is invalid. It must be 'ltr' or 'rtl'.`
      );
    }

    const parsedLocale = this.translater.parseLocale(locale);

    obj.lang = parsedLocale.lang;
    obj.langDir = dir;
    obj.locale = locale;

    obj._ = (key: string, ...args: string[]) => {
      return this._(locale, key, ...args);
    };
    obj._i = (key: string, obj: any) => {
      return this._i(locale, key, obj);
    };
    obj._n = (
      singular: string,
      plural: string,
      count: number,
      ...args: string[]
    ) => {
      return this._n(locale, singular, plural, count, ...args);
    };
    obj._ni = (singular: string, plural: string, count: number, obj: any) => {
      return this._ni(locale, singular, plural, count, obj);
    };
    // obj._d = (format: string, date: moment.MomentInput, timezone: string) => {
    //   return this._d(locale, format, date, timezone);
    // };
    obj._p = (basePath: string) => {
      return this._p(locale, basePath);
    };

    return obj;
  }

  private normalizePath(path: string): string {
    // if (this.pathPrefix === undefined) {
    //   // Works when pathPrefix is configured in .eleventy.js file
    //   // Does not work when pathPrefix is given with commandline `--pathprefix=eleventy-base-blog`
    //   const projectConfig = require('@11ty/eleventy/src/Config').getConfig();
    //   this.pathPrefix = projectConfig.pathPrefix;
    // }

    if (this.pathPrefix !== '/') {
      return path.replace(this.pathPrefix!, '/');
    }
    return path;
  }

  public _(locale: string, key: string, ...args: string[]): string {
    const translation = this.translater.translate(locale, key);

    return this.formatter.printf(translation, ...args);
  }

  public _i(locale: string, key: string, obj: any): string {
    const translation = this.translater.translate(locale, key);

    return this.formatter.dynamicInterpolation(translation, obj);
  }

  public _n(
    locale: string,
    singular: string,
    plural: string,
    count: number,
    ...args: string[]
  ): string {
    const translation = this.translater.ntranslate(
      locale,
      singular,
      plural,
      count
    );
    return this.formatter.printf(translation, ...args);
  }

  public _ni(
    locale: string,
    singular: string,
    plural: string,
    count: number,
    obj: any
  ): string {
    const translation = this.translater.ntranslate(
      locale,
      singular,
      plural,
      count
    );
    return this.formatter.dynamicInterpolation(translation, obj);
  }

  //   public _d(
  //     locale: string,
  //     format: string,
  //     date: moment.MomentInput,
  //     timezone: string
  //   ): string {
  //     this.translater.setLocale(locale);

  //     return this.formatter.date(format, date, timezone);
  //   }

  public _p(locale: string, basePath: string): string {
    const path = this.normalizePath(basePath);

    return `/${locale}${path}`;
  }

  public relocalizePath(targetedLocale: string, pagePath: string): string {
    const path = this.normalizePath(pagePath);

    const pathParts = path.split('/').filter((pathPart) => pathPart);
    pathParts[0] = targetedLocale;

    return `/${pathParts.join('/')}`;
  }
}

const instance = new i18n();

export default instance;
