import { useState } from 'react';
import { Pencil, Trash2, Search, Files, ExternalLink } from 'lucide-react';
import type { Page } from '@models/page';

interface PageListProps {
    pages: Page[];
    onEdit: (page: Page) => void;
    onDelete: (page: Page) => void;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-UY', { day: 'numeric', month: 'short', year: 'numeric' });

const PageList: React.FC<PageListProps> = ({ pages, onEdit, onDelete }) => {
    const [query, setQuery] = useState('');

    const filtered = pages.filter((p) =>
        `${p.title} ${p.slug}`.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <div className="rounded-fq-lg border border-fq-border bg-white p-6">
            <div className="mb-5 flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-fq bg-fq-primary-tint text-fq-primary">
                    <Files size={20} />
                </div>
                <div>
                    <h2 className="font-display text-lg font-bold text-fq-text">Páginas Existentes</h2>
                    <p className="text-sm text-fq-muted">
                        {pages.length} página{pages.length === 1 ? '' : 's'} publicada
                        {pages.length === 1 ? '' : 's'}
                    </p>
                </div>
            </div>

            <div className="relative mb-5 flex items-start">
                <Search className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                <input
                    type="text"
                    placeholder="Buscar páginas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-fq-border text-xs font-bold tracking-wide text-fq-muted uppercase">
                            <th className="pb-3">Página</th>
                            <th className="pb-3">Grupo</th>
                            <th className="pb-3">Actualizada</th>
                            <th className="pb-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((page) => (
                            <tr key={page.id} className="border-b border-fq-border last:border-0">
                                <td className="py-4">
                                    <div>
                                        <div className="font-semibold text-fq-text">{page.title}</div>
                                        <a
                                            href={`/${page.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-fq-muted hover:text-fq-primary-hover"
                                        >
                                            /{page.slug}
                                            <ExternalLink size={11} />
                                        </a>
                                    </div>
                                </td>
                                <td className="py-4 text-fq-muted">{page.groupName}</td>
                                <td className="py-4 text-fq-muted">{formatDate(page.updatedDate)}</td>
                                <td className="py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(page)}
                                            title="Editar"
                                            className="flex size-9 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-primary hover:bg-fq-primary hover:text-white"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(page)}
                                            title="Eliminar"
                                            className="flex size-9 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-danger hover:bg-fq-danger hover:text-white"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-fq-muted">
                                    No se encontraron páginas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PageList;
