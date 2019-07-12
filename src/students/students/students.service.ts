import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Student } from './student.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as uniqid from 'uniqid';

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async create(student: Student): Promise<string> {
    const id = uniqid();

    const updatedStudent = {
      id,
      ...student,
    };

    const createdStudent = new this.studentModel(updatedStudent);
    await createdStudent.save();

    return id;
  }

  async findAll(): Promise<Student[]> {
    const resources = await this.studentModel.find().exec();

    return resources.map((student) => {
      const { id, name, email } = student;

      return {
        id,
        name,
        email,
      };
    });
  }

  async findById(id: string): Promise<Student> | null {
    const query = { id };
    const resource = await this.studentModel.findOne(query).exec();

    return { id: resource.id, name: resource.name, email: resource.email };
  }

  remove(id: string): boolean {
    this.students = this.students.filter((student: Student) => student.id !== id);

    return true;
  }

  update(id: string, values: Student): boolean {
    const cb = (student: Student) => student.id === id;
    const current = this.students.find(cb);
    const currentInd = this.students.findIndex(cb);

    if (!current) {
      return false;
    }

    this.students[currentInd] = {
      ...current,
      ...values,
    };

    return true;
  }
}
