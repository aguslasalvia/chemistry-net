import { Link } from 'react-router';
import type { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, description, href }) => {
    return (
        <Link
            to={href}
            className="flex items-start gap-4 rounded-fq-lg border border-fq-border bg-white p-5 transition-[box-shadow,transform] hover:-translate-y-[2px] hover:shadow-fq-hover"
        >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-fq bg-fq-primary-tint text-fq-primary">
                <Icon size={22} />
            </div>
            <div>
                <h3 className="font-display text-base font-bold text-fq-text">{title}</h3>
                <p className="mt-1 text-sm text-fq-muted">{description}</p>
            </div>
        </Link>
    );
};

export default DashboardCard;
