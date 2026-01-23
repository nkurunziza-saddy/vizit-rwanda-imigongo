import { motion } from "framer-motion";
import { Shield, CreditCard, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Partners",
    description: "Every listing is vetted by our team to ensure quality and authenticity.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "International payment processing with multi-currency support.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your travel needs.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you 10% off.",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-20 bg-gradient-safari text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Why Choose Vizit Africa
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            We're committed to making your Rwandan adventure seamless, 
            secure, and unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-primary-foreground/70 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
