import { Link } from "react-router-dom";
import { Leaf, Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-accent" />
              <span className="font-display text-xl font-bold">AYURVEDA</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Personalized Ayurvedic diet charts combining ancient wisdom with modern nutrition science.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                  Doctor Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-accent">Services</h4>
            <ul className="space-y-2">
              <li className="text-primary-foreground/70 text-sm">Diet Chart Generation</li>
              <li className="text-primary-foreground/70 text-sm">Patient Management</li>
              <li className="text-primary-foreground/70 text-sm">Nutrition Analysis</li>
              <li className="text-primary-foreground/70 text-sm">Ayurvedic Consultations</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-accent">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Mail className="h-4 w-4 text-accent" />
                info@ayurveda.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Phone className="h-4 w-4 text-accent" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/70 text-sm">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                Ayurveda Health Center, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Ayurveda Diet Chart Generator. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
