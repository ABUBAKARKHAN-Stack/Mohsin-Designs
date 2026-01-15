"use client"

const FooterBottomBar = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
                © {currentYear} Mohsin Designs. All rights reserved.
            </p>
        </div>
    )
}

export default FooterBottomBar