import { Observable } from 'rxjs';
import { Response } from '@angular/http';

export function throwHttpError(err: any) {
  let errorMessage: string;

  if (err instanceof Response) {
    errorMessage = `[${err.status}] ${err.url}`;
  } else {
    errorMessage = err.message ? err.message : err.toString();
  }

  return Observable.throw(errorMessage);
}
