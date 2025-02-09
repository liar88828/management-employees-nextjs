import EmployeeRepository from "@/server/repository/employee.repo";
import EmployeeController from "@/server/controller/employee.controller";
import UserController from "@/server/controller/user.controller";
import UserRepository from "@/server/repository/user.repo";
import TestimonialController from "@/server/controller/testimonial.controller";
import TestimonialRepository from "@/server/repository/testimonial.repo";

export const userRepository = new UserRepository();
export const testimonialRepository = new TestimonialRepository();
export const employeeController = new EmployeeController(new EmployeeRepository())
export const userController = new UserController(userRepository)
export const ceremonyController = new TestimonialController(testimonialRepository)
