import axios from "axios";
import { baseUrl } from "@/models/constants.model";

export async function getCategories(): Promise<string[]> {
  const response = await axios.get(`${baseUrl}/categories`);
  return response.data;
}
