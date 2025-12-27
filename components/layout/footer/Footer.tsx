import FooterBottomBar from "./FooterBottomBar";
import FooterCTA from "./FooterCTA";
import FooterMainGrid from "./FooterMainGrid";

const Footer = () => {

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 py-24">

      {/* Footer CTA */}
        <FooterCTA />
       
        {/* Footer grid */}
       <FooterMainGrid />

        {/* Bottom bar */}
        <FooterBottomBar />
      </div>
    </footer>
  );
};

export default Footer;