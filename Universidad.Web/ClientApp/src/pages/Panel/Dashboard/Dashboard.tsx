import DashboardCard from '../../../components/ui/DashboardCard/DashboardCard';
import ContentHistory from '../../../components/ui/ContentHistory/ContentHistory';
import './Dashboard.css';

const mockHistory = [
    {
        id: 1,
        groupName: 'News',
        contentType: 'news',
        title: 'Nueva jornada de puertas abiertas',
        modifiedAt: new Date('2026-04-17T14:30:00'),
        href: '/contenido/1'
    },
    {
        id: 2,
        groupName: 'Events',
        contentType: 'events',
        title: 'Conferencia de química cuántica',
        modifiedAt: new Date('2026-04-16T10:15:00'),
        href: '/contenido/2'
    },
    {
        id: 3,
        groupName: 'Academic',
        contentType: 'academic',
        title: 'Programa de posgrado 2026',
        modifiedAt: new Date('2026-04-15T09:00:00'),
        href: '/contenido/3'
    }
];

const DashboardHomePage = () => {
    return (
        <div className="dashboard">
            <div className="dashboard__welcome">
                <h1>Bienvenido al Panel de Administración</h1>
                <p>Desde aquí puedes gestionar el contenido de la facultad</p>
            </div>

            <div className="dashboard__actions">
                <DashboardCard
                    icon="myGroups"
                    title="Mis Grupos"
                    description="Ver los grupos a los que perteneces"
                    href="/mis-grupos"
                />
                <DashboardCard
                    icon="content"
                    title="Ver Todo el Contenido"
                    description="Ver todo el contenido del sitio"
                    href="/contenido"
                />
                <DashboardCard
                    icon="user"
                    title="Mi Perfil"
                    description="Ver y editar tu información"
                    href="/perfil"
                />
                <DashboardCard
                    icon="users"
                    title="Usuarios"
                    description="Gestionar usuarios del sistema"
                    href="/usuarios"
                />
                <DashboardCard
                    icon="groups"
                    title="Grupos"
                    description="Gestionar grupos del sistema"
                    href="/panel/groups"
                />
            </div>

            <ContentHistory items={mockHistory} />
        </div>
    );
};

export default DashboardHomePage;