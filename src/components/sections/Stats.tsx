export const Stats = () => {
  return (
    <section className="py-20 bg-gradient-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Números que Hablan</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Nuestra pasión por la excelencia se refleja en cada proyecto que emprendemos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center animate-fade-in">
            <div className="text-5xl font-bold mb-2">100+</div>
            <p className="text-white/90">Productos Disponibles</p>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-5xl font-bold mb-2">98%</div>
            <p className="text-white/90">Clientes Satisfechos</p>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl font-bold mb-2">24/7</div>
            <p className="text-white/90">Soporte Técnico</p>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-5xl font-bold mb-2">100%</div>
            <p className="text-white/90">Garantía de Calidad</p>
          </div>
        </div>
      </div>
    </section>
  );
}; 