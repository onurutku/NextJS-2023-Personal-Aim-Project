import { TypeOptions } from "react-toastify";
import User from "./register.model";

export default interface CheckUser {
  user: User | undefined;
  type: TypeOptions | undefined;
  message: string;
}
