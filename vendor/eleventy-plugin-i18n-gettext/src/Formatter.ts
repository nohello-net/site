// import printf from 'printf';
// import moment from 'moment-timezone'
import { sprintf } from 'sprintf-js';

export default class Formatter {
  public dynamicInterpolation(translation: string, obj: any): string {
    if (obj) {
      let codeToEvaluate = '';

      for (const prop in obj) {
        codeToEvaluate += `const ${prop} = "${obj[prop]}";`;
      }

      return eval(`${codeToEvaluate}\`${translation}\``);
    }

    return translation;
  }

  public printf(translation: string, ...args: string[]): string {
    if (args.length) {
      return sprintf(translation, ...args);
    }
    return translation;
  }

  //   public date(
  //     format: string,
  //     date: moment.MomentInput,
  //     timezone: string
  //   ): string {
  //     if (timezone) {
  //       return moment(date).tz(timezone).format(format);
  //     }
  //     return moment(date).format(format);
  //   }
}
