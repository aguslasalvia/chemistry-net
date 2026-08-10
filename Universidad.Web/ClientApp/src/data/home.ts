export interface Stat {
    value: string;
    label: string;
}

export interface Carrera {
    imgId: string;
    imgPlaceholder: string;
    name: string;
    duration: string;
    desc: string;
}

export interface Noticia {
    imgId: string;
    tag: string;
    title: string;
    body: string;
}

export const stats: Stat[] = [
    { value: '1908', label: 'Año de fundación' },
    { value: '6', label: 'Carreras de grado' },
    { value: '0$', label: 'Costo de matrícula' },
    { value: '100+', label: 'Años de investigación' }
];

export const carreras: Carrera[] = [
    {
        imgId: 'c-quimica',
        imgPlaceholder: 'Foto de laboratorio de Química',
        name: 'Química',
        duration: 'Grado · 5 años',
        desc: 'Formación científica de base para investigación y desarrollo en la industria química.'
    },
    {
        imgId: 'c-iq',
        imgPlaceholder: 'Foto de planta o proceso industrial',
        name: 'Ingeniería Química',
        duration: 'Grado · 5 años',
        desc: 'Diseño y operación de procesos industriales a escala.'
    },
    {
        imgId: 'c-ia',
        imgPlaceholder: 'Foto de producción de alimentos',
        name: 'Ingeniería de Alimentos',
        duration: 'Grado · 5 años',
        desc: 'Tecnología, calidad y seguridad en la producción de alimentos.'
    },
    {
        imgId: 'c-farmacia',
        imgPlaceholder: 'Foto de laboratorio farmacéutico',
        name: 'Farmacia',
        duration: 'Grado · 5 años',
        desc: 'Formación en medicamentos, análisis y atención farmacéutica.'
    },
    {
        imgId: 'c-enologia',
        imgPlaceholder: 'Foto de viñedo o bodega',
        name: 'Enología',
        duration: 'Grado · 4 años',
        desc: 'Ciencia y tecnología aplicadas a la elaboración de vinos.'
    },
    {
        imgId: 'c-tq',
        imgPlaceholder: 'Foto de estudiante en laboratorio',
        name: 'Tecnólogo Químico',
        duration: 'Corta · 3 años',
        desc: 'Carrera corta orientada a la práctica en laboratorio e industria.'
    }
];

export const noticias: Noticia[] = [
    {
        imgId: 'n-1',
        tag: 'Investigación',
        title: 'Kombuchas bajo la lupa',
        body: 'Un estudio caracterizó las marcas de kombucha del mercado uruguayo, encontrando niveles de alcohol no siempre declarados.'
    },
    {
        imgId: 'n-2',
        tag: 'Investigación',
        title: 'Microplásticos en leche humana',
        body: 'Un equipo interdisciplinario avanza en la primera investigación nacional sobre microplásticos en leche humana.'
    },
    {
        imgId: 'n-3',
        tag: 'Internacional',
        title: 'Rumbo a la Olimpiada de Química',
        body: 'Estudiantes y docentes representarán a Uruguay en la Olimpiada Internacional de Química 2026, en Tashkent.'
    },
    {
        imgId: 'n-4',
        tag: 'Enseñanza',
        title: 'Glosario accesible de Química',
        body: 'Una nueva herramienta digital busca facilitar el acceso al aprendizaje de la química para todas las personas.'
    }
];
