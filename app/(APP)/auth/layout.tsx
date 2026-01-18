import { SiteSettingsProvider } from '@/context/SiteSettingsContext'
import { getSiteSettingsByLocale } from '@/helpers/site-settings.helpers'
import PublicProvider from '@/provider/PublicProvider'
import { ReactNode } from 'react'


const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const siteSettings = await getSiteSettingsByLocale("en")

    return (
        <SiteSettingsProvider settings={siteSettings}>
            <PublicProvider>
                {children}
            </PublicProvider>
        </SiteSettingsProvider>
    )
}

export default AuthLayout