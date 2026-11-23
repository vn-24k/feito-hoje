function App() {
  return (
    <main className="feito-hoje" aria-labelledby="titulo-principal">
      <div className="feito-hoje__pagina">
        <header className="feito-hoje__cabecalho">
          <p className="feito-hoje__data">Um espaço para o presente</p>
          <h1 id="titulo-principal">Feito Hoje</h1>
          <p className="feito-hoje__proposito">
            Escolha uma ação possível. O que importa é o próximo passo, do seu jeito.
          </p>
        </header>

        <section className="feito-hoje__convite" aria-labelledby="convite-titulo">
          <p className="feito-hoje__marca" aria-hidden="true">Hoje</p>
          <div>
            <h2 id="convite-titulo">Por onde você quer começar?</h2>
            <p>
              Em poucos instantes, você poderá anotar uma ação pequena e guardar o que
              aconteceu.
            </p>
          </div>
        </section>

        <footer className="feito-hoje__rodape">
          <span className="feito-hoje__ponto" aria-hidden="true" />
          Seus registros ficam neste navegador.
        </footer>
      </div>
    </main>
  )
}

export default App
