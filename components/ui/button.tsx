import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-brand border-2 px-5 py-2.5 text-[0.98rem] font-bold leading-tight transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[18px] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Yellow: the main enquiry action, on light or dark backgrounds */
        primary: "border-transparent bg-sun text-navy-950 hover:bg-sun-deep",
        /** Navy: secondary action on light backgrounds */
        secondary: "border-transparent bg-navy-900 text-white hover:bg-navy-700",
        /** Outline on light backgrounds */
        outline: "border-navy-900 bg-transparent text-navy-900 hover:bg-navy-900 hover:text-white",
        /** Outline on dark backgrounds */
        ghost: "border-white/60 bg-transparent text-white hover:border-sun hover:text-sun",
      },
      size: {
        md: "",
        sm: "min-h-10 px-4 py-2 text-[0.92rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
