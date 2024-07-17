import { Home, TrendingUp } from "lucide-react";
import Index from "./pages/Index.jsx";
import MarketAnalysis from "./pages/MarketAnalysis.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Market Analysis",
    to: "/market-analysis",
    icon: <TrendingUp className="h-4 w-4" />,
    page: <MarketAnalysis />,
  },
];