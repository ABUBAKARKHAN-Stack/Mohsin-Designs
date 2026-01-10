import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useSession } from '@/context/SessionContext'
import { AlertTriangle, RotateCcw } from 'lucide-react'

const UsersError = () => {
    const {
        getAllUsers
    } = useSession()
    return (
        <TableRow>
            <TableCell colSpan={3} className="py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <p className="font-medium">Failed to load users</p>
                    <p className="text-sm text-muted-foreground">
                        Something went wrong while fetching users.
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => await getAllUsers()}
                        className="mt-2"
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default UsersError