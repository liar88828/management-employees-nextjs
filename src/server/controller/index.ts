import TrolleyRepository from "@/server/repository/trolley.repo";
import TrolleyController from "@/server/controller/trolley.controller";
import ProductRepository from "@/server/repository/product.repo";
import ProductController from "@/server/controller/product.controller";
import OrderRepository from "@/server/repository/order.repo";
import OrderController from "@/server/controller/order.controller";
import { PaymentRepository } from "@/server/repository/payment.repo";
import PaymentController from "@/server/controller/payment.controller";
import TableController from "@/server/controller/table.controller";
import ReceiverController from "@/server/controller/receiver.controller";
import CustomerRepository from "@/server/repository/receiver.repo";
import EmployeeRepository from "@/server/repository/employee.repo";
import EmployeeController from "@/server/controller/employee.controller";
import DeliveryRepository from "@/server/repository/delivery.repo";
import DeliveryController from "@/server/controller/delivery.controller";
import UserController from "@/server/controller/user.controller";
import UserRepository from "@/server/repository/user.repo";
import AuthController from "@/server/controller/auth.controller";
import TestimonialController from "@/server/controller/testimonial.controller";
import TestimonialRepository from "@/server/repository/testimonial.repo";

export const userRepository = new UserRepository();
export const testimonialRepository = new TestimonialRepository();

export const trolleyController = new TrolleyController(new TrolleyRepository())
export const productController = new ProductController(new ProductRepository())
export const orderController = new OrderController(new OrderRepository())
export const paymentController = new PaymentController(new PaymentRepository())
export const tableController = new TableController(new OrderRepository())
export const receiverController = new ReceiverController(new CustomerRepository())
export const employeeController = new EmployeeController(new EmployeeRepository())
export const deliveryController = new DeliveryController(new DeliveryRepository())
export const userController = new UserController(userRepository)
export const ceremonyController = new TestimonialController(testimonialRepository)
export const authController = new AuthController()
