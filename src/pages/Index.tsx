import { Users, Zap, Target, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "ممكنة",
      description: "دعم ومساندة جهود تمكين قطاع الجمعيات الأهلية",
      gradient: "var(--gradient-card-1)",
    },
    {
      icon: Zap,
      title: "حيوية",
      description: "مرونة عالية واستجابة سريعة في تنفيذ المبادرات والمشروعات",
      gradient: "var(--gradient-card-2)",
    },
    {
      icon: Target,
      title: "مؤثرة",
      description: "إيمان عميق بقضايا الجمعيات الأهلية ومسؤول توفير الدعم والموازنة",
      gradient: "var(--gradient-card-3)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background" dir="rtl">
      {/* Section Container */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-muted-foreground text-sm tracking-wider uppercase">
            شخصية المجلس
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            شخصية المجلس
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary"></div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </div>
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 card-hover group cursor-pointer"
              style={{
                background: feature.gradient,
                boxShadow: "var(--shadow-glow)",
              }}
            >
              {/* Arrow Icon */}
              <div className="absolute top-6 left-6 z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="white" opacity="0.5" />
                  </pattern>
                  <rect x="0" y="0" width="100" height="100" fill={`url(#pattern-${index})`} />
                </svg>
              </div>

              {/* Content */}
              <div className="relative p-8 flex flex-col items-center text-center min-h-[350px] justify-center">
                {/* Large Background Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <feature.icon className="w-48 h-48 text-white" strokeWidth={0.5} />
                </div>

                {/* Main Icon */}
                <div className="relative z-10 mb-8 icon-float">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-6">
                    <feature.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-white mb-4 transition-all duration-300 group-hover:scale-105">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-white/90 text-base md:text-lg leading-relaxed max-w-xs transition-all duration-300 group-hover:text-white">
                  {feature.description}
                </p>

                {/* Bottom Gradient Overlay on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
