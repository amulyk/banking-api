import { Module } from '@nestjs/common';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './students/student.schema.db';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Student',
      schema: StudentSchema,
    }]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
