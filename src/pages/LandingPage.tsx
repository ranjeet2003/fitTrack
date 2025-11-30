import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Target, Brain, LineChart, Quote, Settings, BarChart2, Zap, ShieldCheck, Cloud, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const LandingPage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-up').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-text font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border rounded-full mb-6 shadow-sm">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-semibold text-textSecondary">AI-Powered Fitness Platform</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Transform Your Body,<br />Elevate Your Life
          </h1>
          
          <p className="text-xl md:text-2xl text-textSecondary mb-10 max-w-3xl mx-auto leading-relaxed">
            Your ultimate AI-powered companion for personalized fitness goals, nutrition tracking, and progress visualization
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button to="/auth" className="inline-flex items-center justify-center font-medium rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background py-2 px-5 text-base bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 focus:ring-primary px-3 py-1 text-sm">
              Start Your Journey
              <ArrowRight size={20} className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div className="fade-in-up delay-100">
              <div className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">10K+</div>
              <div className="text-sm text-textSecondary mt-1">Active Users</div>
            </div>
            <div className="fade-in-up delay-200">
              <div className="text-4xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">50K+</div>
              <div className="text-sm text-textSecondary mt-1">Goals Achieved</div>
            </div>
            <div className="fade-in-up delay-300">
              <div className="text-4xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">4.9★</div>
              <div className="text-sm text-textSecondary mt-1">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 container mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-bold text-primary">FEATURES</span>
          </div>
          <h2 className="text-4xl font-black mb-4 text-text">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-textSecondary max-w-2xl mx-auto">
            Powerful tools designed to help you reach your fitness goals faster
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-surface p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-border transition-all duration-300 hover:-translate-y-2 fade-in-up delay-100">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text">Personalized Goals</h3>
            <p className="text-textSecondary leading-relaxed">
              Define your fitness aspirations with AI-guided recommendations tailored to your body type and lifestyle
            </p>
          </div>

          <div className="group bg-surface p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-border transition-all duration-300 hover:-translate-y-2 fade-in-up delay-200">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text">AI-Powered Insights</h3>
            <p className="text-textSecondary leading-relaxed">
              Get intelligent recommendations for BMI, calorie intake, and personalized meal plans powered by advanced AI
            </p>
          </div>

          <div className="group bg-surface p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-border transition-all duration-300 hover:-translate-y-2 fade-in-up delay-300">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LineChart size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text">Progress Tracking</h3>
            <p className="text-textSecondary leading-relaxed">
              Visualize your journey with beautiful charts and detailed analytics to stay motivated every step of the way
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-surface">
        <div className="container mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
              <span className="text-sm font-bold text-secondary">HOW IT WORKS</span>
            </div>
            <h2 className="text-5xl font-black mb-4 text-text">
              Your Journey in 3 Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="relative fade-in-up delay-100">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                1
              </div>
              <div className="bg-background p-8 rounded-3xl shadow-lg border border-border pt-12">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Settings size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-text text-center">Set Your Goals</h3>
                <p className="text-textSecondary text-center leading-relaxed">
                  Define your fitness objectives and let AI create a personalized roadmap for success
                </p>
              </div>
            </div>

            <div className="relative fade-in-up delay-200">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                2
              </div>
              <div className="bg-background p-8 rounded-3xl shadow-lg border border-border pt-12">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <BarChart2 size={32} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-text text-center">Track & Analyze</h3>
                <p className="text-textSecondary text-center leading-relaxed">
                  Log your meals and workouts with real-time AI insights and intelligent adjustments
                </p>
              </div>
            </div>

            <div className="relative fade-in-up delay-300">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                3
              </div>
              <div className="bg-background p-8 rounded-3xl shadow-lg border border-border pt-12">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Zap size={32} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-text text-center">Achieve & Thrive</h3>
                <p className="text-textSecondary text-center leading-relaxed">
                  Watch your progress unfold and reach your health milestones faster than ever
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-block px-4 py-2 bg-success/10 rounded-full mb-4">
              <span className="text-sm font-bold text-success">TRUSTED BY THOUSANDS</span>
            </div>
            <h2 className="text-5xl font-black mb-4 text-text">
              Join Our Success Stories
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 fade-in-up delay-200">
            <div className="bg-surface p-6 rounded-2xl shadow-lg border border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-textSecondary mb-4">"FitTrack completely transformed my approach to fitness. The AI recommendations are spot-on!"</p>
              <p className="text-sm font-bold text-text">— Sarah K.</p>
            </div>
            <div className="bg-surface p-6 rounded-2xl shadow-lg border border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-textSecondary mb-4">"Lost 15kg in 3 months! The progress tracking keeps me motivated every single day."</p>
              <p className="text-sm font-bold text-text">— Michael R.</p>
            </div>
            <div className="bg-surface p-6 rounded-2xl shadow-lg border border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-textSecondary mb-4">"Best fitness app I've ever used. Simple, powerful, and incredibly effective!"</p>
              <p className="text-sm font-bold text-text">— Emma L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto text-center fade-in-up delay-400">
          <h2 className="text-5xl md:text-4xl font-black text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users achieving their fitness dreams with FitTrack. Start your journey today.
          </p>
          
          <Button to="/auth" className="inline-flex items-center justify-center font-medium rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background py-2 px-5 text-base bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 focus:ring-primary px-3 py-1 text-sm">
            Get Started Now
            <ArrowRight size={20} className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface py-12 px-4 text-center">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target size={24} className="text-primary" />
            <span className="text-2xl font-black text-text">FitTrack</span>
          </div>
          <p className="text-textSecondary mb-6">Transform your body, elevate your life</p>
          <p className="text-textSecondary/80 text-sm">&copy; {new Date().getFullYear()} FitTrack. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default LandingPage;