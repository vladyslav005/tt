import {useEffect, useState} from 'react';
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Github, BookType
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {NavLink} from "react-router-dom";
import {useTheme} from "next-themes";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Editor', href: '/main' },
  { label: 'About', href: '/about' },
];

export function Topbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { setTheme } = useTheme()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setTheme( isDarkMode ? "light" : "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary shadow-lg hover:transform-y-1 transition-transform duration-200">
              <BookType className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">
                Type Theory
              </h1>
              <p className="text-xs text-muted-foreground">
                Type checking and interpreter
              </p>
            </div>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({isActive}) => `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: Search, Dark Mode, GitHub */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-lg"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>


            <Button
              variant="ghost"
              className="transition-all duration-200"
              onClick={() => {
                window.location.assign("https://github.com/vladyslav005/tt")
              }}
            >
              <Github className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 py-3 space-y-2 bg-muted/50 border-t">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>

          {/* Mobile Nav Items */}
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({isActive}) => `w-full block text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
