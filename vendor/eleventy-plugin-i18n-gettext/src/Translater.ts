import fs from 'fs';
import path from 'path';
import glob from 'glob';
// import moment from 'moment-timezone'

const Gettext = require('node-gettext');
const parser = require('gettext-parser');

import type ILocaleInformation from './ILocaleInformation';
import type IConfiguration from './IConfiguration';

export default class Translater {
  private defaultConfiguration: IConfiguration = {
    localesDirectory: 'locales',
    parserMode: 'po',
    javascriptMessages: 'messages.js',
    tokenFilePatterns: ['src/**/*.njk', 'src/**/*.js', 'src/**/*.ts'],
    localeRegex: /^(?<lang>.{2})(?:-(?<country>.{2}))*$/,
  };
  private gettext: any = undefined;
  private configuration: IConfiguration = {};

  public setConfiguration(options: IConfiguration = {}): void {
    this.configuration = { ...this.defaultConfiguration, ...options };

    if (!['po', 'mo'].includes(this.configuration.parserMode!)) {
      throw new Error(
        `Parser mode '${this.configuration.parserMode}' is invalid. It must be 'po' or 'mo'.`
      );
    }
  }

  public parseLocale(locale: string): ILocaleInformation {
    const match = locale.match(this.configuration.localeRegex!);

    if (!match || !match.groups) {
      throw new Error(
        `Locale ${locale} does not match regex ${this.configuration.localeRegex}`
      );
    }

    return {
      lang: match.groups.lang,
      locale: match.groups.country
        ? `${match.groups.lang}-${match.groups.country}`
        : match.groups.lang,
    };
  }

  public setLocale(locale: string) {
    const parsedLocale = this.parseLocale(locale);

    if (this.gettext) {
      this.gettext.setLocale(parsedLocale.locale);
    }
    // moment.locale(parsedLocale.locale);
  }

  public translate(locale: string, key: string): string {
    this.loadTranslations();
    this.setLocale(locale);

    return this.gettext.gettext(key);
  }

  public ntranslate(
    locale: string,
    singular: string,
    plural: string,
    count: number
  ) {
    this.loadTranslations();
    this.setLocale(locale);

    return this.gettext.ngettext(singular, plural, count);
  }

  public reloadTranslations(): void {
    this.gettext = undefined;
    this.loadTranslations();
  }

  private loadTranslations(): void {
    if (this.gettext === undefined) {
      let gettextParser: any = undefined;

      if (this.configuration.parserMode === 'po') {
        gettextParser = parser.po;
      } else if (this.configuration.parserMode === 'mo') {
        gettextParser = parser.mo;
      } else {
        throw new Error(
          `Parser mode '${this.configuration.parserMode}' is invalid. It must be 'po' or 'mo'.`
        );
      }

      const localesDir = path.join(
        process.cwd(),
        this.configuration.localesDirectory!
      );
      const localeFileName = `messages.${this.configuration.parserMode}`;

      this.gettext = new Gettext();

      fs.readdirSync(localesDir, { withFileTypes: true })
        .filter((locale) => locale.isDirectory())
        .forEach((locale) => {
          const filePath = path.join(localesDir, locale.name, localeFileName);
          console.log(`Loading ${filePath}.`);

          const content = fs.readFileSync(filePath);
          const parsedTranslations = gettextParser.parse(content);

          const parsedLocale = this.parseLocale(locale.name);
          this.gettext.addTranslations(
            parsedLocale.locale,
            'messages',
            parsedTranslations
          );
        });

      this.generateMessageFile();
    }
  }

  private generateMessageFile(): void {
    // This regex can find multiples occurences on the same line due to ? lazy quantifier
    const stringRegExp = '(?:\'.+?\'|".+?")';
    const localeRegExp = '\\(?\\s*(?:locale\\s*,)?';

    // _('singular'             _i('singular'
    // _(locale, 'singular'     _i(locale, 'singular'
    // _ locale, 'singular'     _i locale, 'singular'
    const singular = new RegExp(`_i?${localeRegExp}\\s*${stringRegExp}`, 'g');

    // _n('singular', 'plural'             _ni('singular', 'plural'
    // _n(locale, 'singular', 'plural'     _ni(locale, 'singular', 'plural'
    // _n locale, 'singular', 'plural'     _ni locale, 'singular', 'plural'
    const plural = new RegExp(
      `_ni?${localeRegExp}\\s*${stringRegExp}\\s*,\\s*${stringRegExp}`,
      'g'
    );

    // Node 10.x backward compatibility
    if (!Array.prototype.flat) {
      Array.prototype.flat = function () {
        return [].concat.apply([], this as any);
      };
    }

    const lines = this.configuration
      .tokenFilePatterns!.map((tokenFilePattern) => {
        return glob.sync(path.join(process.cwd(), tokenFilePattern));
      })
      .flat()
      .map((filePath) => {
        const fileContent = fs.readFileSync(filePath).toString();
        const singularMatches = fileContent.match(singular);
        const pluralMatches = fileContent.match(plural);

        if (singularMatches || pluralMatches) {
          console.log(`Localization tokens found in ${filePath}.`);
        }

        return [].concat(
          singularMatches as any,
          pluralMatches as any
        ) as RegExpMatchArray;
      })
      .flat()
      .filter((match) => match) // not null
      .map((match) => {
        return (
          match
            .replace(/\(?\s*locale\s*,/, '(') // remove locale parameter
            .replace(/([\(,])\s+(["'])/g, '$1$2') + ')'
        ); // remove spaces in front of string parameters
      })
      .filter((match, index, matches) => matches.indexOf(match) == index); // distinct

    lines.unshift(
      '// It exists only to allow PO editors to get translation keys from source code.'
    );
    lines.unshift('// WARNING! This file is generated by a tool.');

    const messagesPath = path.join(
      process.cwd(),
      this.configuration.localesDirectory!,
      this.configuration.javascriptMessages!
    );
    const messagesContent = lines.join('\r\n');

    console.log(`Writing ${messagesPath}.`);
    fs.writeFileSync(messagesPath, messagesContent);
  }
}
