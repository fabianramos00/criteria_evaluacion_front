import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { summary } from '../../../services/evaluation.services';
import { formatDate, getQualityInfo } from '../../../utils/common';
import './Summary.scss';
import Loading from '../../general/loading/Loading';
import { getRouteBySection, HOME_ROUTE, servicesRoute } from '../../../const/routes';

const CATEGORY_META = {
  visibility: {
    icon: 'visibility',
    description: 'Visibilidad'
  },
  policy: {
    icon: 'policy',
    description: 'Políticas'
  },
  legal_aspects: {
    icon: 'gavel',
    description: 'Aspectos legales'
  },
  metadata: {
    icon: 'source',
    description: 'Metadatos'
  },
  interoperability: {
    icon: 'account_tree',
    description: 'Interoperabilidad'
  },
  security: {
    icon: 'lock',
    description: 'Seguridad'
  },
  statistics: {
    icon: 'equalizer',
    description: 'Estadísticas'
  },
  services: {
    icon: 'miscellaneous_services',
    description: 'Servicios de valor añadido'
  },
};

function getCategoryMeta(itemName) {
  const lower = itemName.toLowerCase();
  for (const [key, meta] of Object.entries(CATEGORY_META)) {
    if (lower.includes(key)) return meta;
  }
  return { icon: 'folder_open', description: '' };
}

const Summary = () => {
  const [loading, setLoading] = useState(false);
  const [repositoryNames, setRepositoryNames] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const [exporting, setExporting] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    summary(token)
      .then(data => {
        const { repository_names, rating, summary: summaryItems, repository_url, max_rating, updated_at } = data;
        setRepositoryNames(repository_names);
        setScore(rating);
        setItems(summaryItems);
        setUrl(repository_url);
        setMaxScore(max_rating);
        setLastUpdate(updated_at);
      })
      .catch((e) => {
        // Errores de red (TypeError) no tienen .detail: se protege el acceso
        // y se evita llamar un route builder inexistente cuando falta e.next_item
        if (e?.detail === 'Invalid token') {
          navigate(HOME_ROUTE);
        } else if (e && typeof e === 'object' && !e.is_completed && getRouteBySection[e.next_item]) {
          navigate(getRouteBySection[e.next_item](token));
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  const scorePercent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const quality = getQualityInfo(score, maxScore);
  const repoName = repositoryNames[0] || '';
  const repoSubtitle = repositoryNames[1] || '';
  const lastUpdateFormatted = formatDate(lastUpdate);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toPDF = async () => {
    setExporting(true);
    let clone = null;
    try {
      const node = contentRef.current;
      if (!node) return;

      // Se clona el contenido para no mutar el DOM visible
      clone = node.cloneNode(true);
      // Se excluyen los controles de UI: botón "Anterior" y fila de acciones (Exportar/Compartir)
      clone.querySelector('.form-actions')?.remove();
      clone.querySelector('.summary-actions')?.remove();
      clone.style.position = 'fixed';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = '900px';
      clone.style.margin = '0';
      document.body.appendChild(clone);

      await document.fonts.ready;
      const canvas = await html2canvas(clone, { scale: 2, backgroundColor: '#f4f7f6' });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      let heightLeft = imgHeight;
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName =
        repoName
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || 'evaluacion';
      pdf.save(`informe-${fileName}.pdf`);
    } catch (e) {
      console.error('Error al exportar el reporte:', e);
    } finally {
      if (clone?.parentNode) clone.parentNode.removeChild(clone);
      setExporting(false);
    }
  };

  return (
    <section className="summary">
      <Loading loading={loading} />

      <div ref={contentRef} className="max-w-[900px] mx-auto p-6">
        <div className="bg-white rounded-[14px] shadow-sm p-5 flex gap-5 items-center">
          <div className="flex-1 basis-[65%] min-w-[200px] text-left space-y-2">
            <div>
              <h1
                className="m-0 font-bold text-[#1a202c] leading-tight text-left"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}
              >
                {repoName}
              </h1>
              {repoSubtitle && (
                <p className="m-0 mt-1 text-sm text-[#718096]">{repoSubtitle}</p>
              )}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-200 font-semibold text-[15px] no-underline break-all leading-snug"
              >
                <span className="material-icons-outlined text-[10px] flex-shrink-0">link</span>
                {url}
              </a>
            </div>
            <div className="mt-1 gap-2 flex">
              <span className="inline-flex items-center gap-1.5 bg-[#ecfdf5] text-[#009688] text-[11px] font-bold tracking-[0.07em] uppercase px-2.5 py-[3px] rounded-full border border-[rgba(0,150,136,0.2)] mb-2.5">
                <span className="material-icons-outlined flex-shrink-0" style={{ transform: 'scale(0.5)' }}>check_circle</span>
                ESTADO: COMPLETO
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#f5f5f5] text-[#009688] text-[11px] font-bold tracking-[0.07em] uppercase px-2.5 py-[3px] rounded-full border border-[rgba(0,150,136,0.2)] mb-2.5">
                <span className="material-icons-outlined flex-shrink-0" style={{ transform: 'scale(0.5)' }}>history</span>
                Actualización: {lastUpdateFormatted}
              </span>
            </div>
          </div>
          <div className="flex flex-col basis-[35%] min-w-[150px] gap-2">
            <div
              className={`rounded-[14px] p-5 flex basis-[35%] min-w-[150px] flex-col items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(0,150,136,0.35)] ${quality.className}`}
            >
              <p className="m-0 text-white text-[16px] font-bold tracking-[0.12em] uppercase">PUNTAJE TOTAL</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[50px] font-extrabold text-white leading-none">{score}</span>
                {maxScore > 0 && (
                  <span className="text-[35px] text-white font-medium">/{maxScore}</span>
                )}
              </div>
              <div className="w-full h-1 bg-[rgba(255,255,255,0.2)] rounded-full overflow-hidden">
                <div className="h-full bg-[rgba(255,255,255,0.85)] rounded-full" style={{ width: `${scorePercent}%` }} />
              </div>
              <span className="bg-[rgba(255,255,255,0.15)] text-white text-sm font-semibold px-2 py-[2px] rounded-full">
                Nivel de Calidad: {quality.label}
              </span>
            </div>
            <div className="flex gap-2.5 flex-shrink-0 summary-actions">
              <button
                onClick={toPDF}
                disabled={exporting}
                className="inline-flex items-center gap-1.5 bg-[#009688] text-white no-underline px-4 py-2 rounded-lg text-[13px] font-semibold shadow-[0_2px_8px_rgba(0,150,136,0.3)] cursor-pointer disabled:opacity-60 disabled:cursor-wait"
              >
                <span className="material-icons-outlined text-[15px] text-white">file_download</span>
                {exporting ? 'Exportando...' : 'Exportar Reporte'}
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 bg-white text-[#4a5568] border border-[#e2e8f0] px-4 py-2 rounded-lg text-[13px] font-semibold cursor-pointer shadow-sm"
              >
                <span className="material-icons-outlined text-[15px]">share</span>
                {copied ? '¡Copiado!' : 'Compartir'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[14px] shadow-sm overflow-hidden mt-3">
          <div className="flex justify-between items-center px-6 py-3.5 border-b  dark:border-white/5 bg-slate-50 dark:bg-black/5">
            <span className="text-[14px] font-bold text-[#718096] tracking-[0.08em] uppercase">
              CATEGORÍAS DE EVALUACIÓN
            </span>
          </div>

          {items.map(({ item, total, max_rating }, index) => {
            const meta = getCategoryMeta(item);
            const barWidth = Math.min((total / max_rating) * 100, 100);
            const quality = getQualityInfo(total, max_rating);
            return (
              <div
                key={index}
                className={`category flex items-center gap-7 px-6 py-4 ${index < items.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="w-10 h-10 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center">
                  <span className="material-icons-outlined text-[18px] text-gray-500">
                    {meta.icon}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="min-w-0">
                      <p className="m-0 font-bold text-[#1a202c] text-[15px] leading-tight">{meta.description}</p>
                    </div>
                    <span className="ml-4 flex-shrink-0 font-bold text-[15px] text-[#1a202c]">
                      {total} <span className="text-[#a0aec0] font-normal text-[13px] text-slate-400" >/ {max_rating}</span>
                    </span>
                  </div>
                  <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${quality.className}`} style={{ width: `${barWidth}%` }} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
        <div className="form-actions">
          <button
            className='cta'
            onClick={() => navigate(servicesRoute(token))}
            type='button'
          >
            Anterior
          </button>
        </div>
      </div>
    </section>
  );
};

export default Summary;
