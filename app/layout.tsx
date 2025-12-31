import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import RootProvider from "@/provider/RootProvider";
import { APP_NAME, BASE_URL } from "@/constants/app.constants";


const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ]
})

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700"
  ]
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `Creative Design Agency for Branding, Web & Digital Growth | ${APP_NAME}`,
    template: `%s | ${APP_NAME}`,
  },
  description: "Mohsin Designs is a creative design agency delivering logo design, branding, websites, apps, SEO, and digital solutions that help brands grow with confidence.",
  keywords: [
    "creative design agency",
    "branding agency",
    "logo design agency",
    "web design agency",
    "digital design agency",
    "branding and web development",
    "creative agency for startups"
  ],
  openGraph: {
    title: `Creative Design Agency for Branding, Web & Digital Growth | ${APP_NAME}`,
    description: "Mohsin Designs is a creative design agency delivering logo design, branding, websites, apps, SEO, and digital solutions that help brands grow with confidence.",
    type: "website",
    url: "/",
    siteName: APP_NAME,
  },
  alternates: {
    canonical: "/",

  },
  robots: {
    index: true,
    follow: true,
  },



};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable} font-sans antialiased`}
      >
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
