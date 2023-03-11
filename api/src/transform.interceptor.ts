import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Use classToPlain to transform the data to a plain object
        const transformedData = instanceToPlain(data);
        // Delete the password field from the plain object
        delete transformedData.password;
        // Return the transformed data
        return transformedData;
      }),
    );
  }
}
