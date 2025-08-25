import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException(
        'Validation failed (Mongo ObjectId expected)',
      );
    }
    return value;
  }
}
