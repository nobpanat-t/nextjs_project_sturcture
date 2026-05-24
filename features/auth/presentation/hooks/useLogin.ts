import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../../domain/schemas/login.schema";
import { loginUseCase } from "../../domain/usecases/login";
import { logger } from "@/core/utils/logger";

export const useLogin = () => {
    const mutation = useMutation({
        mutationFn: (data: LoginFormData) => loginUseCase(data),
        onSuccess: (data) => {
            logger.debug(data, "Login Success")
        },
        onError: (error) => {
            logger.error(error, "Login Error")
        }
    })

    return {
        login: mutation.mutate,
        isLoggingIn: mutation.isPending,
        error: mutation.error
    }
};