"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../domain/schemas/login.schema";
import TextField from "@/shared/components/TextField";
import Typography from "@/shared/components/Typography";
import { useTranslation } from "@/shared/providers/Localization";
import Image from "next/image";
import IconButton from "@/shared/components/IconButton";
import { ArrowRightCircleIcon } from "@/shared/icons";
import { logger } from "@/core/utils/logger";
import { useLogin } from "./hooks/useLogin";

function Header() {
    const { dict } = useTranslation();
    return (
        <div
            className="flex flex-col items-center gap-2"
        >
            <Image
                loading="eager"
                src="/images/nongma-connect-logo-white.webp"
                width={80}
                height={80}
                alt="nongma-connect-logo-white"
            />
            <Typography
                size="H3"
            >
                {dict.common.appName}
            </Typography>
        </div>
    )
}

export default function LoginForm() {
    const { login, isLoggingIn, error } = useLogin();

    const methods = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        logger.debug(data, "form submitted");
        login(data);
    }

    const onError = (errors: any) => {
        logger.error(errors, "form validation failed");
    }

    return (
        <div className="
        absolute top-1/2 left-1/2 
        -translate-y-1/2 -translate-x-1/2
        w-full sm:w-md
        "
        >
            <FormProvider
                {...methods}
            >
                <form
                    className="flex flex-col gap-8 p-4  m-auto justify-center"
                    onSubmit={methods.handleSubmit(onSubmit, onError)}
                // onKeyDown={(v) => {
                //     alert(v.key);
                // }}
                >
                    <Header />
                    <main>
                        <div
                            className="grid gap-2"
                        >
                            <TextField
                                name="email"
                                placeholder="อีเมล"
                            />
                            <TextField
                                name="password"
                                type="password"
                                placeholder="รหัสผ่าน"
                                suffix={
                                    <IconButton isLoading={isLoggingIn} type="submit" label="">
                                        <ArrowRightCircleIcon />
                                    </IconButton>
                                }
                            />
                        </div>
                    </main>
                </form>
            </FormProvider>
        </div>
    )
}