import EmployeeRepository from "@/server/repository/employee.repo";
import UserRepository from "@/server/repository/user.repo";
import UserController from "@/server/controller/user.controller";
import EmployeeController from "@/server/controller/employee.controller";

export const userRepository = new UserRepository();
export const employeeRepository=  new EmployeeRepository()
export const userController = new UserController(userRepository);
export const employeesController = new EmployeeController(employeeRepository);
