import { HierarchyLevel, Hierarchy } from "../theme/hierarchy";


interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    label: string;
    size?: HierarchyLevel,
    type: "submit" | "reset" | "button" | undefined;
    isLoading?: boolean
}
export default function IconButton({ size = "BASE", isLoading = false, ...props }: IconButtonProps) {
    const { children } = props
    return (
        <button
            {...props}
            className={
                `
            
            flex justify-center items-center
            ${Hierarchy[size]}
            `
            }
            disabled={isLoading || props.disabled}
            style={{
                cursor: isLoading ? "progress" : "default"
            }}
        >
            {
                isLoading ? (
                    <div className="relative w-6 h-6">
                        {/* 1. วงกลมจางๆ (Background Ring) */}
                        <div className="w-full h-full border-3 border-white/20 rounded-full"></div>

                        {/* 2. เส้นที่หมุน (Active Spinner) */}
                        <div className="absolute inset-0 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : children
            }
        </button>
    )
}