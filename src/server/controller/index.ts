import EmployeeRepository from "@/server/repository/employee.repo";
import UserRepository from "@/server/repository/user.repo";
import TestimonialRepository from "@/server/repository/testimonial.repo";

export const userRepository = new UserRepository();
export const testimonialRepository = new TestimonialRepository();
export const employeeRepository=  new EmployeeRepository()
