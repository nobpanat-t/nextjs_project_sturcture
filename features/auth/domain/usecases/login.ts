import { httpClient } from "@/core/api/httpClient";
import { LoginFormData } from "../schemas/login.schema";

export const loginUseCase = async (credentials: LoginFormData) => {
    const response = await httpClient.post('/auth/login', credentials);
    return response.data;
};