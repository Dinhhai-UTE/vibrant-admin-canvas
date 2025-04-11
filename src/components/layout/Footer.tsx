
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t py-4 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>© 2025 AdminDash. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
          <a href="#" className="hover:text-foreground">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
