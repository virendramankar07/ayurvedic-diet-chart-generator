import { Users, FileText, Search, Activity, TrendingUp, Calendar, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDiseasesCount } from "@/data/diseases";

interface DashboardHomeProps {
  onNavigate: (tab: string) => void;
}

const DashboardHome = ({ onNavigate }: DashboardHomeProps) => {
  const stats = [
    { label: "Total Patients", value: "1", icon: Users, color: "bg-primary", change: "+1 today" },
    { label: "Diseases Database", value: getDiseasesCount().toString(), icon: Activity, color: "bg-accent", change: "Full coverage" },
    { label: "Diet Charts Generated", value: "0", icon: FileText, color: "bg-primary", change: "Ready to create" },
    { label: "This Month", value: "Jan", icon: Calendar, color: "bg-accent", change: "2025" },
  ];

  const quickActions = [
    { label: "Add New Patient", icon: Users, tab: "patients", variant: "default" as const },
    { label: "Patient History", icon: History, tab: "history", variant: "outline" as const },
    { label: "Search Disease", icon: Search, tab: "search", variant: "outline" as const },
    { label: "Generate Diet Chart", icon: FileText, tab: "diet-chart", variant: "outline" as const },
    { label: "View Analytics", icon: TrendingUp, tab: "analytics", variant: "outline" as const },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-green rounded-2xl p-8 text-primary-foreground shadow-elevated">
        <h1 className="font-display text-3xl font-bold mb-2">Welcome to Ayurveda Dashboard</h1>
        <p className="text-primary-foreground/80 max-w-2xl">
          Manage patients, search disease-specific diets, and generate personalized Ayurvedic diet charts 
          with modern nutritional insights.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="shadow-card hover:shadow-elevated transition-shadow animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                  <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant}
                className="h-auto py-6 flex flex-col gap-2"
                onClick={() => onNavigate(action.tab)}
              >
                <action.icon className="h-6 w-6" />
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Tips */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-xl">Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-foreground">Add Patients</h4>
                <p className="text-sm text-muted-foreground">Start by adding patient details including health history and lifestyle.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-foreground">Search Diseases</h4>
                <p className="text-sm text-muted-foreground">Look up disease-specific Ayurvedic dietary recommendations.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-foreground">Generate Diet Charts</h4>
                <p className="text-sm text-muted-foreground">Create personalized diet plans for your patients.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-xl">Ayurvedic Tip of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-leaf-light rounded-xl p-6">
              <p className="text-primary font-display text-lg italic mb-4">
                "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need."
              </p>
              <p className="text-muted-foreground text-sm">— Ayurvedic Proverb</p>
            </div>
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-foreground">Today's Focus: Agni (Digestive Fire)</h4>
              <p className="text-sm text-muted-foreground">
                Strong Agni is essential for proper digestion and nutrient absorption. Recommend warm, 
                freshly cooked foods and avoid cold, raw foods for patients with weak digestion.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
