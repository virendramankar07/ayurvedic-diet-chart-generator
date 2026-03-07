import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Database, FileText, Printer, ArrowRight, Leaf, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-ayurveda.jpg";

const features = [
  {
    icon: Users,
    title: "Patient Management",
    description: "Complete patient records with health history, allergies, and lifestyle tracking",
  },
  {
    icon: Database,
    title: "Food Database",
    description: "Comprehensive Ayurvedic food database with nutritional values and benefits",
  },
  {
    icon: FileText,
    title: "Automated Diet Charts",
    description: "Generate personalized diet plans based on disease and body constitution",
  },
  {
    icon: Printer,
    title: "Print / PDF Reports",
    description: "Export beautiful diet charts and nutrition reports for patients",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        {/* Floating Leaves Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Leaf className="absolute top-20 left-10 h-16 w-16 text-primary/10 animate-float" style={{ animationDelay: '0s' }} />
          <Leaf className="absolute top-40 right-20 h-12 w-12 text-primary/10 animate-float" style={{ animationDelay: '2s' }} />
          <Leaf className="absolute bottom-32 left-1/4 h-20 w-20 text-primary/10 animate-float" style={{ animationDelay: '4s' }} />
          <Leaf className="absolute top-1/3 right-1/3 h-14 w-14 text-accent/10 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-fade-in-up">
                <Sparkles className="h-4 w-4" />
                Ancient Wisdom, Modern Science
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-in-up stagger-1">
                Ayurvedic Diet
                <span className="block text-primary">Chart Generator</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in-up stagger-2">
                Generate personalized Ayurvedic diet charts combining traditional wisdom with modern nutrition science — in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up stagger-3">
                <Link to="/login">
                  <Button variant="default" size="lg" className="gap-2 w-full sm:w-auto">
                    Doctor Login
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in-up stagger-4">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={heroImage}
                  alt="Ayurvedic herbs and spices"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create personalized, science-backed Ayurvedic diet plans for your patients
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-background rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-leaf-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Leaf className="h-12 w-12 text-accent mx-auto" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              Start Creating Personalized Diet Plans Today
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Join healthcare professionals using Ayurvedic principles to improve patient outcomes
            </p>
            <Link to="/login">
              <Button variant="default" size="lg" className="mt-4">
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
