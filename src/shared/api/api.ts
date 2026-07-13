import axios from "axios";
import { openLibraryConfig } from "@/shared/config";

export const booksApi = axios.create({
  baseURL: openLibraryConfig.baseUrl,
  timeout: 10000,
});
