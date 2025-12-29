import { APP_NAME } from '@/constants/app.constants'
import { cn } from '@/lib/utils'

const HighlightedBrandname = ({ className = "" }) => {
    return (
        <div className='relative w-fit inline-block text-accent-foreground px-0.5 py-px'>

            <span className={
                cn(
                    'font-bold ',
                    className
                )
            }>{APP_NAME}</span>
            <span className='absolute inset-0 -z-10 bg-secondary' />
        </div>
    )
}

export default HighlightedBrandname