import { motion } from 'motion/react'
import { Dispatch, FC, SetStateAction } from 'react'

type Props = {
    setFilter: Dispatch<SetStateAction<string>>
    filter: string
}
const FilterButtons: FC<Props> = ({ setFilter, filter }) => {
    const categories = ["All", "Brand", "Digital", "Product"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mb-16 flex-wrap"
        >
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-3 text-sm uppercase tracking-widest font-medium border transition-all duration-300 ${filter === cat
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border hover:border-accent hover:text-accent"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </motion.div>
    )
}

export default FilterButtons