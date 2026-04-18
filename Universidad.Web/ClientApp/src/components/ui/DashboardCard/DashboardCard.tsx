import { User, FileText, Users, FolderOpen, Globe } from 'lucide-react';
import './DashboardCard.css';

interface DashboardCardProps {
    icon: 'user' | 'content' | 'users' | 'groups' | 'myGroups';
    title: string;
    description: string;
    href: string;
}

const iconMap = {
    user: User,
    content: FileText,
    users: Users,
    groups: FolderOpen,
    myGroups: Globe
};

const DashboardCard: React.FC<DashboardCardProps> = ({
    icon,
    title,
    description,
    href
}) => {
    const Icon = iconMap[icon];

    return (
        <a href={href} className="dashboard-card">
            <div className="dashboard-card__icon">
                <Icon size={32} />
            </div>
            <div className="dashboard-card__content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </a>
    );
};

export default DashboardCard;