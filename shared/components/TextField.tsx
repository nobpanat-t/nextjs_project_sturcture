import { useFormContext } from "react-hook-form";
import { FontSize, FontSizeLevel } from "../theme/typography";


interface TextFieldProps {
    type?: React.HTMLInputTypeAttribute | undefined;
    className?: string | undefined
    size?: FontSizeLevel
    name: string
    suffix?: React.ReactNode
    placeholder?: string | undefined;
}
export default function TextField({ size = "BASE", ...props }: TextFieldProps) {
    const { register, formState: { errors } } = useFormContext();
    const { className, name, suffix } = props;

    const error = errors[name];
    const errorMessage = error?.message as string;

    return (
        <div
            className="grid gap-2 w-full"
        >
            <div
                className={
                    `w-full
                 relative flex flex-col items-center justify-center overflow-hidden
                 py-3.5 rounded-xl px-4 border
                 transition-all duration-200
                 ${error ? 'border-error ring-1 ring-error' : 'border dark:border-white/20 border-black/20 focus-within:ring-1 dark:focus-within:ring-white/50 focus-within:ring-black/30'}
                ${className}
                `
                }
            >
                <label htmlFor={name} className="sr-only">Email</label>
                <input
                    {...props}
                    {...register(name!)}
                    className={`outline-0 w-full ${suffix ? 'pr-8' : ''} ${FontSize[size]} placeholder:text-sm`}
                />
                {/* 2. แสดง Suffix */}
                {
                    suffix && (
                        <div className="absolute right-4 flex items-center justify-center">
                            {suffix}
                        </div>
                    )
                }

            </div>
            {/* 3. แสดงข้อความ Error ถ้ามี */}
            {errorMessage && (
                <span className="text-xs text-error px-1 animate-in fade-in slide-in-from-top-1">
                    {errorMessage}
                </span>
            )}
        </div>
    )
}