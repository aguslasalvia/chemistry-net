import { Outlet } from 'react-router';
import SiteHeader from '@components/ui/site-header/site-header';
import SiteFooter from '@components/ui/site-footer/site-footer';

const MainLayout = () => {
    return (
        <div className="flex min-h-dvh flex-col bg-fq-bg text-fq-text">
            <SiteHeader />
            <main className="flex-1">
                <Outlet />
            </main>
            <SiteFooter />
        </div>
    );
};

export default MainLayout;
