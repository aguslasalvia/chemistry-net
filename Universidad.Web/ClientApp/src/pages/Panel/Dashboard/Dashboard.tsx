import { useEffect, useState } from 'react';
import { Globe, FileText, User, Users } from 'lucide-react';
import DashboardCard from '@components/ui/DashboardCard/DashboardCard';
import ContentHistory from '@components/ui/ContentHistory/ContentHistory';
import { getContent } from '@services/content.service';
import type { Content } from '@models/content';

const DashboardHomePage = () => {
    const [recent, setRecent] = useState<Content[]>([]);

    useEffect(() => {
        getContent()
            .then((items) => {
                const sorted = [...items].sort(
                    (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
                );
                setRecent(sorted.slice(0, 5));
            })
            .catch(() => setRecent([]));
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <div className="mb-2 text-[13px] font-bold tracking-wide text-fq-primary-text uppercase">
                    Facultad de Química · UdelaR
                </div>
                <h1 className="mb-2 font-display text-3xl font-bold text-fq-text">
                    Panel de Administración
                </h1>
                <p className="text-fq-muted">
                    Desde aquí podés gestionar el contenido, los grupos y los usuarios de la facultad
                </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                <DashboardCard
                    icon={Globe}
                    title="Mis Grupos"
                    description="Ver los grupos a los que pertenecés"
                    href="/panel/groups"
                />
                <DashboardCard
                    icon={FileText}
                    title="Ver Todo el Contenido"
                    description="Ver todo el contenido del sitio"
                    href="/panel/content"
                />
                <DashboardCard
                    icon={User}
                    title="Mi Perfil"
                    description="Ver y editar tu información"
                    href="/panel/settings"
                />
                <DashboardCard
                    icon={Users}
                    title="Usuarios"
                    description="Gestionar usuarios del sistema"
                    href="/panel/users"
                />
            </div>

            <ContentHistory items={recent} />
        </div>
    );
};

export default DashboardHomePage;
