import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, TrendingUp, Coins } from "lucide-react";

const steps = [
  {
    icon: Shield,
    title: "Overcollateralization",
    description: "Borrow up to 66% of your collateral value with a 150% collateral ratio. Your assets stay secure.",
  },
  {
    icon: TrendingUp,
    title: "Earn Competitive APY",
    description: "Lend your crypto assets and earn dynamic interest rates. Watch your portfolio grow automatically.",
  },
  {
    icon: Coins,
    title: "PROTO Rewards",
    description: "Earn governance tokens by participating in the protocol. Vote on proposals and shape the future.",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-radial">
      <Card className="max-w-2xl w-full p-8 md:p-12 bg-card border-primary/20 animate-fade-in">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="inline-flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center animate-float">
              <span className="text-4xl font-bold text-background">N</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-5xl font-bold">
              <span className="gradient-text">NovaLend</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Next-Generation DeFi Lending Protocol
            </p>
          </div>

          {/* Tutorial Steps */}
          <div className="py-8">
            <div className="flex items-center justify-center mb-8">
              <div className="p-6 rounded-2xl bg-primary/10 glow-primary">
                <CurrentIcon className="w-16 h-16 text-primary" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                {steps[currentStep].title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                {steps[currentStep].description}
              </p>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? "w-8 bg-primary glow-primary"
                      : "w-2 bg-secondary hover:bg-primary/30"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full md:w-auto px-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold text-lg"
          >
            {currentStep < steps.length - 1 ? "Next" : "Get Started"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Skip Option */}
          {currentStep < steps.length - 1 && (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Skip tutorial
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
