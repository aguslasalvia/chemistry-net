import Hero from '@components/sections/hero';
import Stats from '@components/sections/stats';
import QuickLinks from '@components/sections/quick-links';
import Institucion from '@components/sections/institucion';
import Carreras from '@components/sections/carreras';
import VideoSection from '@components/sections/video-section';
import Agenda from '@components/sections/agenda';
import Novedades from '@components/sections/novedades';
import Contacto from '@components/sections/contacto';

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
