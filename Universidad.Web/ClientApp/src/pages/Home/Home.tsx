import Hero from '@components/sections/Hero';
import Stats from '@components/sections/Stats';
import Institucion from '@components/sections/Institucion';
import Carreras from '@components/sections/Carreras';
import Novedades from '@components/sections/Novedades';
import Contacto from '@components/sections/Contacto';

const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <Institucion />
            <Carreras />
            <Novedades />
            <Contacto />
        </>
    );
};

export default Home;
