// noinspection JSUnusedGlobalSymbols

import { Users } from "@prisma/client";
import { ParamsApi } from "@/interface/server/InterfaceRepository";

export type TUserDB = Users
export type UserDB = Omit<Users,"password">
// |'email' | 'password' | 'viewer'
export type TUserCreate = Omit<Users, 'id' | "created_at" | "updated_at" | 'isValidate' | 'otp' | 'otpCount' | "status" | "otpRegenerate" | "otpExpired">;
export type UserSearch = Pick<Users, 'name' >;

// export type TUserUpdate = Omit<Users, "created_at" | "updated_at">;
export type UserClient = Omit<Users, 'password' | 'otp' | 'otpExpired'>;
export type UserParams = ParamsApi<UserSearch>
