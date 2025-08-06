import { colors } from "@/lib/colors";

export const Stats = () => {
  return (
    <section className={`py-20 ${colors.primary.gradient} text-white`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Números que Hablan</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Nuestra pasión por la excelencia se refleja en cada proyecto que emprendemos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: "100+", label: "Productos Disponibles" },
            { number: "98%", label: "Clientes Satisfechos" },
            { number: "24/7", label: "Soporte Técnico" },
            { number: "100%", label: "Garantía de Calidad" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl font-bold mb-2">{stat.number}</div>
              <p className="text-white/90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 