import { forwardRef } from "react"

type ButtonVariant = "primary" | "secondary" | "outline"
type ButtonSize = "sm" | "md" | "lg"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
}

const base =
    "inline-flex items-center justify-center font-semibold rounded-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:opacity-90 focus-visible:outline-secondary",
    secondary: "bg-secondary text-white hover:opacity-90 focus-visible:outline-secondary",
    outline:
        "border border-slate-300 text-slate-900 hover:bg-slate-50 focus-visible:outline-secondary",
}

const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
    { variant = "primary", size = "md", className = "", ...props },
    ref
) {
    return (
        <button
            ref={ref}
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        />
    )
})

export default Button