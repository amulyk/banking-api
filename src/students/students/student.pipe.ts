import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Student } from './student.interface';
import * as Ajv from 'ajv';
import { studentSchema } from './student.schema';

@Injectable()
export class StudentPipe implements PipeTransform {
  private readonly ajv;
  private readonly validate;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    this.validate = this.ajv.compile(studentSchema);
  }

  transform(value: Student, metadata: ArgumentMetadata) {
    const isStudentValid = this.validate(value);

    if (!isStudentValid) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }
}
