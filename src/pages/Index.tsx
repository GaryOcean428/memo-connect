
import React from "react";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-2xl animate-slide-up">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  Streamline your broker 
                  <span className="text-primary"> referral network</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Elegantly manage client referrals, track commissions, and grow your finance broker business with our intuitive platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full text-base"
                  onClick={() => navigate("/dashboard")}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full text-base"
                  onClick={() => navigate("/referrals")}
                >
                  View Referrals
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="glass rounded-2xl p-8 sm:p-12 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-background rounded-xl p-6 shadow-sm animate-float">
                    <BarChart className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-medium text-lg mb-1">Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Track performance and growth
                    </p>
                  </div>
                  <div className="bg-background rounded-xl p-6 shadow-sm animate-float" style={{ animationDelay: '0.2s' }}>
                    <Users className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-medium text-lg mb-1">Clients</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your client database
                    </p>
                  </div>
                  <div className="bg-background rounded-xl p-6 shadow-sm animate-float" style={{ animationDelay: '0.4s' }}>
                    <FileText className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-medium text-lg mb-1">Referrals</h3>
                    <p className="text-sm text-muted-foreground">
                      Track and manage referrals
                    </p>
                  </div>
                  <div className="bg-background rounded-xl p-6 shadow-sm animate-float" style={{ animationDelay: '0.6s' }}>
                    <svg className="h-8 w-8 text-primary mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V18M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className="font-medium text-lg mb-1">Commissions</h3>
                    <p className="text-sm text-muted-foreground">
                      Calculate earnings automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Designed for Finance Brokers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform simplifies referral management so you can focus on what matters most: your clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Referral Tracking",
                description: "Easily log and track referrals from various sources with comprehensive status updates.",
                icon: <FileText className="h-8 w-8 text-primary" />
              },
              {
                title: "Client Management",
                description: "Maintain detailed client records, communication history, and document storage.",
                icon: <Users className="h-8 w-8 text-primary" />
              },
              {
                title: "Performance Analytics",
                description: "Gain insights into your business with detailed reports and visualizations.",
                icon: <BarChart className="h-8 w-8 text-primary" />
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform" 
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <span className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white">
                FB
              </span>
              <span className="font-semibold">FinBroker</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FinBroker. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
