import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, FileText, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const navItems = [{
  name: "Dashboard",
  path: "/dashboard",
  icon: LayoutDashboard
}, {
  name: "Referrals",
  path: "/referrals",
  icon: FileText
}, {
  name: "Clients",
  path: "/clients",
  icon: Users
}];
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    signOut
  } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "?";

    // Try to get from metadata first
    const fullName = user.user_metadata?.full_name;
    if (fullName) {
      return fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2);
    }

    // Fallback to email
    return user.email?.substring(0, 2).toUpperCase() || "?";
  };
  return <nav className={cn("fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-300", isScrolled ? "py-3 bg-background/80 backdrop-blur-lg border-b border-border shadow-sm" : "py-5 bg-transparent")}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-xl font-semibold flex items-center gap-2 text-primary">
          <span className="w-14 h-8 rounded-md bg-primary flex items-center justify-center text-white">MCF</span>
          <span className="hidden sm:inline-block">MemoConnect</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
          isActive
        }) => cn("px-4 py-2 rounded-lg flex items-center gap-2 smooth-transition", isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary text-foreground/80 hover:text-foreground")}>
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </NavLink>)}
        </div>

        {/* User Menu (Desktop) */}
        <div className="hidden md:flex items-center">
          {user ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-secondary">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden lg:inline-block">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <Button variant="ghost" onClick={() => navigate("/auth")} className="rounded-lg">
              Sign In
            </Button>}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-secondary smooth-transition" aria-label="Toggle menu">
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-md mt-1 py-2 md:hidden animate-fade-in">
            {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
          isActive
        }) => cn("px-4 py-3 flex items-center gap-3 smooth-transition", isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary text-foreground/80 hover:text-foreground")}>
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>)}
            
            {/* User options for mobile */}
            {user ? <>
                <div className="px-4 py-3 flex items-center gap-3 border-t border-border mt-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.user_metadata?.full_name || user.email}</span>
                </div>
                <button onClick={handleSignOut} className="px-4 py-3 flex items-center gap-3 w-full text-left hover:bg-secondary text-foreground/80 hover:text-foreground">
                  <LogOut className="w-5 h-5" />
                  <span>Sign out</span>
                </button>
              </> : <button onClick={() => navigate("/auth")} className="px-4 py-3 flex items-center gap-3 w-full text-left hover:bg-secondary text-foreground/80 hover:text-foreground">
                <User className="w-5 h-5" />
                <span>Sign in</span>
              </button>}
          </div>}
      </div>
    </nav>;
};