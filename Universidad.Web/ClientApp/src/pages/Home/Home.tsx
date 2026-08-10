import Hero from '@components/sections/Hero';
import Stats from '@components/sections/Stats';
import QuickLinks from '@components/sections/QuickLinks';
import Institucion from '@components/sections/Institucion';
import Carreras from '@components/sections/Carreras';
import VideoSection from '@components/sections/VideoSection';
import Agenda from '@components/sections/Agenda';
import Novedades from '@components/sections/Novedades';
import Contacto from '@components/sections/Contacto';

const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <QuickLinks />
            <Institucion />
            <Carreras />
            <VideoSection />
            <Agenda />
            <Novedades />
            <Contacto />
        </>
    );
};

export default Home;
