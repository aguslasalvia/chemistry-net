import { useEffect, useState } from 'react';
import Hero from '@components/sections/hero';
import Stats from '@components/sections/stats';
import QuickLinks from '@components/sections/quick-links';
import Institucion from '@components/sections/institucion';
import Carreras from '@components/sections/carreras';
import VideoSection from '@components/sections/video-section';
import Agenda from '@components/sections/agenda';
import Novedades from '@components/sections/novedades';
import Contacto from '@components/sections/contacto';
import { getContent } from '@services/content.service';
import type { Content } from '@models/content';

const Home = () => {
    const [content, setContent] = useState<Content[]>([]);

    useEffect(() => {
        // One request for the whole page — Carreras/Agenda/Novedades each just
        // filter this same list by type instead of fetching independently.
        getContent()
            .then(setContent)
            .catch(() => setContent([]));
    }, []);

    return (
        <>
            <Hero />
            <Stats />
            <QuickLinks />
            <Institucion />
            <Carreras items={content.filter((c) => c.type === 'Academic')} />
            <VideoSection />
            <Agenda items={content.filter((c) => c.type === 'Events')} />
            <Novedades items={content.filter((c) => c.type === 'News')} />
            <Contacto />
        </>
    );
};

export default Home;
