import { Leaf, Heart, BookOpen, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen gradient-hero py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-10 w-10 text-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              About the Project
            </h1>
            <p className="text-lg text-muted-foreground">
              Bridging ancient Ayurvedic wisdom with modern healthcare technology
            </p>
          </div>

          {/* Content Cards */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 shadow-card animate-fade-in-up stagger-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-leaf-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                    Our Mission
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Ayurvedic Diet Chart Generator is designed to help healthcare professionals create personalized, 
                    scientifically-backed diet plans that incorporate the time-tested principles of Ayurveda. Our platform 
                    combines traditional knowledge with modern nutritional science to deliver holistic wellness solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card animate-fade-in-up stagger-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-leaf-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                    Ayurvedic Foundation
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Ayurveda, the ancient Indian system of medicine, emphasizes the importance of diet in maintaining health 
                    and treating diseases. Our system incorporates key Ayurvedic concepts including:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      <strong>Tridosha Theory:</strong> Balancing Vata, Pitta, and Kapha
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      <strong>Sapta Dhatu:</strong> Nourishing the seven body tissues
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      <strong>Agni:</strong> Optimizing digestive fire
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      <strong>Rasayana:</strong> Rejuvenation and immunity building
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card animate-fade-in-up stagger-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-leaf-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                    Modern Integration
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    While rooted in ancient wisdom, our platform leverages modern technology to provide accurate 
                    nutritional analysis, personalized recommendations, and easy-to-follow diet plans. We support 
                    healthcare professionals in delivering evidence-based care that honors traditional knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
