import { Outlet } from 'react-router';
import SiteHeader from '@components/ui/SiteHeader/SiteHeader';
import SiteFooter from '@components/ui/SiteFooter/SiteFooter';

const MainLayout = () => {
    return (
        <div className="flex min-h-dvh flex-col overflow-x-hidden bg-fq-bg text-fq-text">
            <SiteHeader />
            <main className="flex-1">
                <Outlet />
            </main>
            <SiteFooter />
        </div>
    );
};

export default MainLayout;
