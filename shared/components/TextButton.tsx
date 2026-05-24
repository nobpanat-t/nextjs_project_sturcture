import { MouseEventHandler, ReactNode } from "react"

interface TextButtonProps<T> {
    children: ReactNode,
    onClick?: MouseEventHandler<T> | undefined,
    type?: "submit" | "reset" | "button" | undefined;
    className?: string | undefined;
}
export default function TextButton(props: TextButtonProps<any>) {
    return (
        <button
            type={props.type}
            className={`
               p-2 rounded-md bg-primary
                ${props.className}
                `}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}