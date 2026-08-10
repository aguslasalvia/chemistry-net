import './Events.css';

const events = [
    { day: '13', month: 'NOV', title: '8° Congreso Uruguayo de Química Analítica', time: '13 al 15 de noviembre' },
    { day: '13', month: 'NOV', title: '95° aniversario de Facultad de Química', time: '18:30 hs.' },
    { day: '31', month: 'OCT', title: 'Especialización en Comunicación de la Ciencia y la Tecnología', time: '' },
    { day: '05', month: 'OCT', title: 'Día del Patrimonio en Facultad de Química', time: '10:00 a 17:00 hs.' },
];

const Events = () => (
    <section className="events">
        <div className="events-container">
            <p className="events-eyebrow">Agenda</p>
            <h2 className="events-title">Próximos eventos</h2>

            <ul className="events-list">
                {events.map((e, i) => (
                    <li className="events-item" key={i}>
                        <div className="events-item__date">
                            <span className="events-item__day">{e.day}</span>
                            <span className="events-item__month">{e.month}</span>
                        </div>
                        <div className="events-item__body">
                            <h3>{e.title}</h3>
                            {e.time && <p>{e.time}</p>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Events;
