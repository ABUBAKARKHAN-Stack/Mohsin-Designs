import { APP_NAME } from '@/constants/app.constants'
import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'


interface LogoProps extends Omit<ImageProps, 'alt' | 'src'> {
    className?: string
}

const Logo = ({ className = "", ...props }: LogoProps) => {
    return (
        <Image
            src={"/assets/logo.webp"}
            alt={APP_NAME}
            height={50}
            width={50}
            {...props}
            className={cn(
                "h-12.5 w-auto object-contain invert dark:invert-0 drop-shadow-[0_6px_16px_hsl(var(--foreground)/0.18)] ",
                className
            )}
        />
    )
}

export default Logo