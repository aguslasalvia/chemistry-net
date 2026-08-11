/** Turns "Institución" into "institucion" — lowercase, no accents, hyphens for spaces. */
export const slugify = (text: string): string =>
    text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // strip combining accent marks left over from NFD
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
