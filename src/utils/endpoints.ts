import { env } from "../config/env";

const host = process.env.HOST || process.env.NEXT_PUBLIC_HOST || env.HOST;
export const requests = {
  courseEndpoint: `${host}/api/course/`,
  studentEndpoint: `${host}/api/student/`,
  instructorEndpoint: `${host}/api/instructor/`,
  adminEndpoint: `${host}/api/student/`,
  lessonEndpoint: `${host}/api/lesson/`,
  enrollEndpoint: `${host}/api/enroll/`,
};
