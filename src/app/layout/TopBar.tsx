import {useEffect, useState} from 'react';
import type {RefObject} from 'react';
import {BookType, Github, Menu, Moon, Search, Sun, X} from 'lucide-react';
import {Button} from '@/shared/components/ui/button';
import {Input} from '@/shared/components/ui/input';
import {NavLink, useLocation} from "react-router-dom";
import {useTheme} from "next-themes";
import {TypeTheoriesDropdown} from "@/features/editor/components/TypeTheoriesDropdown.tsx";
import {ActiveExtensionsBadges} from "@/features/editor/components/ActiveExtensionsBadges.tsx";
import {LayoutPresetsDropdown} from "@/features/workspace/components/LayoutPresetsDropdown.tsx";
import {ExamplesDropdown} from "@/features/editor/components/ExamplesDropdown.tsx";
import type {TextEditorHandle} from "@/features/editor/components/TextEditor.tsx";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";
import {setTermText} from "@/shared/ui-state/termSlice.ts";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  {label: 'Editor', href: '/main'},
  {label: 'Docs', href: '/docs'},
  {label: 'About', href: '/about'},
];

export interface TopbarProps {
  editorRef: RefObject<TextEditorHandle | null>;
}

export function Topbar({editorRef}: TopbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {setTheme} = useTheme()
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const isEditorPage = pathname === "/main";

  const onSelectExample = (code: string) => {
    editorRef.current?.setValue(code);
    dispatch(setTermText(code));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "dark");
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary shadow-lg hover:transform-y-1 transition-transform duration-200">
              <BookType className="w-6 h-6 text-primary-foreground"/>
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

          {/* Right: Examples, Type system extensions, Dark Mode, GitHub */}
          <div className="flex items-center space-x-3">
            {/* Examples */}
            <div className="hidden md:block">
              <ExamplesDropdown onSelect={onSelectExample} disabled={!isEditorPage} />
            </div>

            {/* Type System Extensions */}
            <div className="hidden md:block">
              <TypeTheoriesDropdown disabled={!isEditorPage} />
            </div>

            {/* Layout presets — panel arrangement is meaningless once the editor drops to its
                single-column tabbed layout, so this only shows once dockview is active (lg+). */}
            <div className="hidden lg:block">
              <LayoutPresetsDropdown disabled={!isEditorPage} />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-lg size-11 md:size-9"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5"/>
              ) : (
                <Moon className="w-5 h-5"/>
              )}
            </Button>


            <Button
              variant="ghost"
              size="icon"
              className="transition-all duration-200 size-11 md:size-9"
              aria-label="Open GitHub repository"
              onClick={() => {
                window.location.assign("https://github.com/vladyslav005/tt")
              }}
            >
              <Github className="h-4 w-4"/>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-lg size-11"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5"/>
              ) : (
                <Menu className="w-5 h-5"/>
              )}
            </Button>
          </div>
        </div>

         {/*Active extensions badges, pinned straddling the topbar's bottom edge */}
        <div className="hidden md:flex absolute -bottom-2.5 left-4 sm:left-6 lg:left-8 max-w-[60%] flex-wrap justify-start gap-1">
          <ActiveExtensionsBadges />
        </div>
      </div>

      {/* Mobile drawer backdrop — opaque and dimmed so page content never bleeds through, tap to close */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`
          md:hidden relative z-50 overflow-hidden transition-all duration-300 ease-in-out bg-background
          ${isMobileMenuOpen ? 'max-h-[calc(100dvh-4rem)] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 py-3 space-y-2 border-t">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 h-11"
            />
          </div>

          {/* Mobile Type System Extensions */}
          <div className="flex flex-col items-start gap-2 pb-2">
            <ExamplesDropdown onSelect={onSelectExample} disabled={!isEditorPage} />
            <TypeTheoriesDropdown disabled={!isEditorPage} />
            <ActiveExtensionsBadges />
          </div>

          {/* Mobile Nav Items */}
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({isActive}) => `w-full block text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 min-h-11 ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
