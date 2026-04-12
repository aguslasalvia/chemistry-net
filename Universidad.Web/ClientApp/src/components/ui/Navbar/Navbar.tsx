import './Navbar.css';
const Navbar = () => {
    return (
        <header className="header-floating">
            <nav className="navbar-floating">
                <a className="nav-brand" href="/">
                    <img src="/logo.png" alt="Facultad de Química" style={{ height: "60px", width: "auto" }} />
                </a>
                <ul className="nav-links">
                    <li>
                        <span>Facultad</span>
                        <ul className="dropdown-menu">
                            <li><a href="/Facultad/Institucion">Institución</a></li>
                            <li><a href="/Facultad/Departamentos">Departamentos</a></li>
                            <li><a href="/Facultad/Administracion">Administración</a></li>
                            <li><a href="/Facultad/Investigacion">Investigación</a></li>
                            <li><a href="/Facultad/Extension">Extensión</a></li>
                            <li><a href="/Facultad/Ensenanza">Enseñanza</a></li>
                        </ul>
                    </li>
                    <li>
                        <span>Estudiantes</span>
                        <ul className="dropdown-menu">
                            <li><a href="/Estudiantes/Bedelia">Bedelía</a></li>
                            <li><a href="/Estudiantes/Carreras">Carreras</a></li>
                            <li><a href="/Estudiantes/FuturosEstudiantes">Futuros estudiantes</a></li>
                            <li><a href="/Estudiantes/Pregrado">Estudiantes de pregrado</a></li>
                            <li><a href="/Estudiantes/Grado">Estudiantes de grado</a></li>
                            <li><a href="/Estudiantes/Posgrado">Estudiantes de posgrado</a></li>
                            <li><a href="/Estudiantes/AulasVirtuales">Aulas virtuales</a></li>
                            <li><a href="/Estudiantes/ApoyoEstudiante">Apoyo al estudiante</a></li>
                            <li><a href="/Estudiantes/EducacionPermanente">Educación permanente</a></li>
                        </ul>
                    </li>
                    <li>
                        <span>Funcionarios</span>
                        <ul className="dropdown-menu">
                            <li><a href="/Funcionarios/Docentes">Docentes</a></li>
                            <li><a href="/Funcionarios/FuncionariosTas">Funcionarios TAS</a></li>
                            <li><a href="/Funcionarios/Tramites">Trámites</a></li>
                        </ul>
                    </li>
                    <li>
                        <span>Egresados</span>
                        <ul className="dropdown-menu">
                            <li><a href="/Egresados/EducacionPermanente">Educación permanente</a></li>
                            <li><a href="/Egresados/InsercionLaboral">Unidad de inserción laboral</a></li>
                        </ul>
                    </li>
                    <li>
                        <span>Empresas</span>
                        <ul className="dropdown-menu">
                            <li><a href="/Empresas/EducacionPermanente">Educación permanente</a></li>
                            <li><a href="/Empresas/Asesoramiento">Asesoramiento</a></li>
                            <li><a href="/Empresas/InsercionLaboral">Unidad de inserción laboral</a></li>
                        </ul>
                    </li>
                    <li>
                        <a className="btn-cta" href="/Contacto">Contacto</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;