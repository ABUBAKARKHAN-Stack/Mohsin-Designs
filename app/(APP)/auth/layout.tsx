import { SiteSettingsProvider } from '@/context/SiteSettingsContext'
import { getServerSession } from '@/helpers/getServerSession'
import { getSiteSettingsByLocale } from '@/helpers/site-settings.helpers'
import PublicProvider from '@/provider/PublicProvider'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'


const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const siteSettings = await getSiteSettingsByLocale("en")
    const session = await getServerSession()

    if (session) {
        return redirect('/admin/dashboard')
    }

    return (
        <SiteSettingsProvider settings={siteSettings}>
            <PublicProvider>
                {children}
            </PublicProvider>
        </SiteSettingsProvider>
    )
}

export default AuthLayout