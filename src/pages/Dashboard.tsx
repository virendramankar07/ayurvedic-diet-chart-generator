import { useState } from "react";
import { 
  Users, 
  Search, 
  FileText, 
  BarChart3, 
  Home,
  Leaf,
  LogOut,
  Menu,
  X,
  ChevronRight,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import PatientManagement from "@/components/dashboard/PatientManagement";
import DiseaseSearch from "@/components/dashboard/DiseaseSearch";
import DietChartGenerator from "@/components/dashboard/DietChartGenerator";
import NutritionAnalytics from "@/components/dashboard/NutritionAnalytics";
import DashboardHome from "@/components/dashboard/DashboardHome";
import PatientHistory from "@/components/dashboard/PatientHistory";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  onLogout: () => void;
}

const menuItems = [
  { id: "home", label: "Dashboard", icon: Home },
  { id: "patients", label: "Patient Management", icon: Users },
  { id: "history", label: "Patient History", icon: History },
  { id: "search", label: "Disease Search", icon: Search },
  { id: "diet-chart", label: "Diet Chart Generator", icon: FileText },
  { id: "analytics", label: "Nutrition Analytics", icon: BarChart3 },
];

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome onNavigate={setActiveTab} />;
      case "patients":
        return <PatientManagement />;
      case "history":
        return <PatientHistory />;
      case "search":
        return <DiseaseSearch />;
      case "diet-chart":
        return <DietChartGenerator />;
      case "analytics":
        return <NutritionAnalytics />;
      default:
        return <DashboardHome onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "p-4 border-b border-sidebar-border flex items-center gap-3",
          !sidebarOpen && "lg:justify-center"
        )}>
          <Leaf className="h-8 w-8 text-sidebar-primary flex-shrink-0" />
          {sidebarOpen && (
            <span className="font-display text-lg font-bold text-sidebar-foreground">
              AYURVEDA
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                activeTab === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive transition-colors",
              !sidebarOpen && "lg:justify-center"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-soft">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5 text-muted-foreground" /> : <Menu className="h-5 w-5 text-muted-foreground" />}
            </button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Dashboard</span>
              {activeTab !== "home" && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground font-medium">
                    {menuItems.find(item => item.id === activeTab)?.label}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Dr. Welcome</p>
              <p className="text-xs text-muted-foreground">Ayurveda Specialist</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">D</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
