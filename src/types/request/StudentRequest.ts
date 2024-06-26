export interface StudentRequest {
  id: number;
  password: string;
  code: string;
  email: string;
  name: string;
  image?: string;
  facultyId: number;
  majorId: number;
  studentCode: string;
  confirmPassword: string;
  subject: string;
  content: string;
  phone: string;
}
