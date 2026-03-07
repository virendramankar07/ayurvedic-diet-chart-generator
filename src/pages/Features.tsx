import { Users, Database, FileText, Printer, BarChart3, Shield, Sparkles, Clock } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Patient Management",
    description: "Comprehensive patient profiles with health history, allergies, medications, and lifestyle tracking. Easily manage and access patient records.",
  },
  {
    icon: Database,
    title: "Disease Database",
    description: "50+ diseases with detailed Ayurvedic dietary recommendations, including recommended foods, foods to avoid, and sample diet plans.",
  },
  {
    icon: FileText,
    title: "Automated Diet Charts",
    description: "Generate personalized diet plans based on patient's disease, body constitution, and Ayurvedic principles with just a few clicks.",
  },
  {
    icon: BarChart3,
    title: "Nutrition Analysis",
    description: "Visual charts and analytics showing calorie intake, macronutrient distribution, and nutritional balance for each diet plan.",
  },
  {
    icon: Printer,
    title: "Print & Export",
    description: "Export beautiful diet charts as PDFs or print directly. Perfect for sharing with patients during consultations.",
  },
  {
    icon: Shield,
    title: "Secure Access",
    description: "Role-based access control ensures patient data security. Only authorized healthcare professionals can access the system.",
  },
  {
    icon: Sparkles,
    title: "Ayurvedic Insights",
    description: "Each recommendation includes Ayurvedic perspectives like dosha balancing, dhatu nourishment, and traditional wisdom.",
  },
  {
    icon: Clock,
    title: "Quick Generation",
    description: "Create comprehensive diet charts in seconds, not hours. Save time while providing quality care to more patients.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Features
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed to help healthcare professionals deliver personalized 
            Ayurvedic dietary care efficiently
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-14 h-14 bg-leaf-light rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-primary rounded-3xl p-12 shadow-elevated animate-fade-in-up">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-5xl font-bold text-accent mb-2">50+</div>
              <div className="text-primary-foreground/80">Diseases Covered</div>
            </div>
            <div>
              <div className="font-display text-5xl font-bold text-accent mb-2">100%</div>
              <div className="text-primary-foreground/80">Ayurvedic Based</div>
            </div>
            <div>
              <div className="font-display text-5xl font-bold text-accent mb-2">Fast</div>
              <div className="text-primary-foreground/80">Instant Generation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
