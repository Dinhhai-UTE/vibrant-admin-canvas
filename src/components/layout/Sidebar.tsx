
import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, ChevronRight, Home, Package, ShoppingCart, Users, BarChart4,
  Settings, HelpCircle, LayoutDashboard, PanelLeft, Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface SidebarNavItemProps {
  title: string;
  icon: React.ElementType;
  path: string;
  isCollapsed: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ title, icon: Icon, path, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <NavLink
      to={path}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-2 py-2 px-3 text-sm rounded-md transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )
      }
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{title}</span>}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const { colorTheme, setColorTheme } = useTheme();
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const themeOptions = [
    { name: "Blue", value: "blue" },
    { name: "Red", value: "red" },
    { name: "Green", value: "green" },
    { name: "Yellow", value: "yellow" },
    { name: "Pink", value: "pink" },
    { name: "Purple", value: "purple" },
  ];

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-full bg-sidebar border-r shadow-sm transition-all duration-300 md:relative flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center h-16 px-3 justify-between border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
            <h1 className="text-lg font-semibold">AdminDash</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="ml-auto text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1 py-2 px-2">
        <nav className="space-y-1">
          <SidebarNavItem
            title="Dashboard"
            icon={LayoutDashboard}
            path="/"
            isCollapsed={isCollapsed}
          />
          <SidebarNavItem
            title="Products"
            icon={Package}
            path="/products"
            isCollapsed={isCollapsed}
          />
          <SidebarNavItem
            title="Orders"
            icon={ShoppingCart}
            path="/orders"
            isCollapsed={isCollapsed}
          />
          <SidebarNavItem
            title="Users"
            icon={Users}
            path="/users"
            isCollapsed={isCollapsed}
          />
          
          <Separator className="my-4" />
          
          <SidebarNavItem
            title="Analytics"
            icon={BarChart4}
            path="/analytics"
            isCollapsed={isCollapsed}
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size={isCollapsed ? "icon" : "default"}
                className={cn(
                  "w-full flex items-center justify-start gap-2 text-sm py-2 px-3 font-normal rounded-md",
                  "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Palette className="h-5 w-5" />
                {!isCollapsed && <span>Themes</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={isCollapsed ? "right" : "bottom"} className="w-36">
              {themeOptions.map((theme) => (
                <DropdownMenuItem
                  key={theme.value}
                  onClick={() => setColorTheme(theme.value as any)}
                  className={cn(
                    "cursor-pointer",
                    colorTheme === theme.value && "bg-muted"
                  )}
                >
                  <div className={`w-3 h-3 rounded-full bg-${theme.value}-400 mr-2`}></div>
                  {theme.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <SidebarNavItem
            title="Settings"
            icon={Settings}
            path="/settings"
            isCollapsed={isCollapsed}
          />
          <SidebarNavItem
            title="Help"
            icon={HelpCircle}
            path="/help"
            isCollapsed={isCollapsed}
          />
        </nav>
      </ScrollArea>
      
      <div className={cn(
        "flex flex-col p-3 gap-1 mt-auto border-t",
        isCollapsed ? "items-center" : "items-start"
      )}>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full flex items-center gap-2",
            isCollapsed && "justify-center px-2"
          )}
        >
          <PanelLeft className="h-4 w-4" />
          {!isCollapsed && <span>Collapse</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
