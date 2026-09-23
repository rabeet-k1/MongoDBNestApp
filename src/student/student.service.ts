import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';
import { after } from 'node:test';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(data: Partial<Student>): Promise<Student> {
    const newStudent = new this.studentModel(data);
    return newStudent.save();
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentModel.find().exec(); // use exec() so it will handle promise efficiently
  }

  async getStudentById(id: string): Promise<Student | null> {
    return this.studentModel.findById(id).exec(); // use exec() so it will handle promise efficiently
  }

  async updateStudent(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    // Patch Logic
    // return this.studentModel
    //   .findByIdAndUpdate(id, data, { returnDocument: 'after' })
    //   .exec(); // use exec() so it will handle promise efficiently

    // Actual Put & Recommended Logic
    const updated = await this.studentModel.findByIdAndUpdate(
      id,
      {
        name: data.name ?? null,
        age: data.age ?? null,
        email: data.email ?? null,
      },
      { overwriteDiscriminatorKey: true, returnDocument: 'after' },
    ).exec();

    return updated;
  }

  async patchStudent(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    return this.studentModel
      .findByIdAndUpdate(id, data, { returnDocument: 'after' })
      .exec(); // use exec() so it will handle promise efficiently
  }

  async deleteStudent(id: string): Promise<Student | null> {
    return this.studentModel.findByIdAndDelete(id).exec();
  }
}
