import './Programs.css';

const programs = [
    { roman: 'I', title: 'Planes de estudio', description: 'Licenciaturas, ingenierías y profesorados de la facultad.' },
    { roman: 'II', title: 'Posgrados y Especializaciones', description: 'Maestrías, doctorados y programas de especialización.' },
    { roman: 'III', title: 'Educación Permanente', description: 'Cursos y formación continua para graduados y profesionales.' },
];

const Programs = () => (
    <section className="programs">
        <div className="programs-container">
            <p className="programs-eyebrow">Carreras y Programas</p>
            <h2 className="programs-title">Formación en todas las etapas</h2>

            <ol className="programs-list">
                {programs.map((p) => (
                    <li className="programs-item" key={p.roman}>
                        <span className="programs-item__roman">{p.roman}</span>
                        <div className="programs-item__body">
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export default Programs;
