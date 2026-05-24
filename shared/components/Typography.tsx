import { FontSize, FontSizeLevel } from "../theme/typography";

interface TypographyProps {
    children: React.ReactNode,
    size?: FontSizeLevel,
    className?: string | undefined
}
export default function Typography({ size = "BASE", ...props }: TypographyProps) {
    return (
        <span
            className={`
            ${FontSize[size]}
           ${props.className}
        `}
        >
            {props.children}
        </span>
    )
}