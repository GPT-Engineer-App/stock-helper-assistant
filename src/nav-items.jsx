import { Home, TrendingUp, BarChart2, PieChart, RefreshCw, GitCompare } from "lucide-react";
import Index from "./pages/Index.jsx";
import MarketAnalysis from "./pages/MarketAnalysis.jsx";
import RiskAssessment from "./pages/RiskAssessment.jsx";
import PortfolioDashboard from "./pages/PortfolioDashboard.jsx";
import AutomatedRebalancing from "./pages/AutomatedRebalancing.jsx";
import DerivativeComparison from "./pages/DerivativeComparison.jsx";

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
  {
    title: "Risk Assessment",
    to: "/risk-assessment",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <RiskAssessment />,
  },
  {
    title: "Portfolio Dashboard",
    to: "/portfolio-dashboard",
    icon: <PieChart className="h-4 w-4" />,
    page: <PortfolioDashboard />,
  },
  {
    title: "Automated Rebalancing",
    to: "/automated-rebalancing",
    icon: <RefreshCw className="h-4 w-4" />,
    page: <AutomatedRebalancing />,
  },
  {
    title: "Derivative Comparison",
    to: "/derivative-comparison",
    icon: <GitCompare className="h-4 w-4" />,
    page: <DerivativeComparison />,
  },
];