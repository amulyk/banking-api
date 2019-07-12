import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './student.interface';
import { Response } from 'express';
import { StudentPipe } from './student.pipe';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {}

  @Post()
  async create(@Body(new StudentPipe()) student: Student, @Res() res: Response) {
    const id: string = await this.studentsService.create(student);

    res.status(HttpStatus.CREATED).json({id});
  }

  @Get()
  async findAll(@Res() res: Response) {
    const students: Student[] = await this.studentsService.findAll();
    res.status(HttpStatus.OK).json(students);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const student: Student = await this.studentsService.findById(id);

    if (student) {
      res.status(HttpStatus.OK).json(student);
    } else {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isStudentRemoved = await this.studentsService.remove(id);

    if (isStudentRemoved) {
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.SERVICE_UNAVAILABLE).send();
    }
  }

  @Put(':id')
  async update(@Body(new StudentPipe()) student: Student, @Param('id') id: string, @Res() res: Response) {
    const isStudentUpdated = await this.studentsService.update(id, student);

    if (!isStudentUpdated) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.OK).send();
    }
  }
}
