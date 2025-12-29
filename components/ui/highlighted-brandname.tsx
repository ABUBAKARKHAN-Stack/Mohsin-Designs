import { APP_NAME } from '@/constants/app.constants'
import { cn } from '@/lib/utils'

const HighlightedBrandname = ({ className = "" }) => {
    return (
        <div className='relative w-fit inline-block text-secondary-foreground p-0.5'>

            <span className={
                cn(
                    'font-extrabold ',
                    className
                )
            }>{APP_NAME}</span>
            <span className='absolute inset-0 -z-10 bg-secondary rounded-md block' />
        </div>
    )
}

export default HighlightedBrandname