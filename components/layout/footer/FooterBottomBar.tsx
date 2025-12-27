"use client"

const FooterBottomBar = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
                © {currentYear} Mohsin Designs. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
        </div>
    )
}

export default FooterBottomBar