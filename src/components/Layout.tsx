import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  handleLogout: () => void;
  isAuthenticated: boolean;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  handleLogout,
  isAuthenticated,
  children,
}) => {
  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <div className="container mx-auto mt-8">{children}</div>
    </div>
  );
};

export default Layout;
