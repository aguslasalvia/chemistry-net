import { Link } from "react-router"
import { Home, Search } from "lucide-react"
import "./NotFound.css"

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found-noise"></div>
      <div className="not-found-grid"></div>
      <div className="not-found-glow"></div>
      <div className="not-found-glow-2"></div>

      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-icon">
            <Search />
          </div>

          <h1 className="not-found-code">404</h1>

          <h2 className="not-found-title">Página no encontrada</h2>

          <p className="not-found-description">
            Esta página no ha sido encontrada o se encuentra en desarrollo.
          </p>

          <Link to="/" className="not-found-button">
            <Home />
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound