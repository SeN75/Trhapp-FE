import { environment } from '../../../environments/environment.development';

export class LoggerService {
  log(title = ' =>', value?: unknown) {
    if (environment.production) {
      if (value) console.log(title, value);
      else console.log(title);
    }
  }
  error(title = ' =>', value?: unknown) {
    if (environment.production) {
      if (value) console.error(title, value);
      else console.error(title);
    }
  }
  warn(title = ' =>', value?: unknown) {
    if (environment.production) {
      if (value) console.warn(title, value);
      else console.warn(title);
    }
  }
}
