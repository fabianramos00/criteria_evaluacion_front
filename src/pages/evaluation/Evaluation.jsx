import { useMemo, useContext } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import Visibility from '../../components/evaluation/visibility/Visibility';
import Policies from '../../components/evaluation/policies/Policies';
import LegalAspects from '../../components/evaluation/legalAspects/LegalAspects';
import Safety from '../../components/evaluation/safety/Safety';
import Statistics from '../../components/evaluation/statistics/Statistics';
import Metadata from '../../components/evaluation/metadata/Metadata';
import Summary from '../../components/evaluation/summary/Summary';
import {
  visibilityRoute,
  policiesRoute,
  legalAspectsRoute,
  metadataRoute,
  interoperabilityRoute,
  securityRoute,
  statsRoute,
  servicesRoute,
  HOME_ROUTE,
  summaryRoute,
} from '../../const/routes';
import Menu from '../../components/general/menu/Menu';
import Interoperability from '../../components/evaluation/interoperability/Interoperability';
import ValueServices from '../../components/evaluation/valueServices/ValueServices';
import { TotalContext } from '../../context/context';
import './Evaluation.scss';

function Evaluation() {
  const { token } = useParams();
  const { repositoryName } = useContext(TotalContext);

  const { mainItems, footerItems } = useMemo(() => {
    const list = [
      {
        text: 'Visibilidad',
        path: visibilityRoute(token),
        icon: 'visibility',
      },
      {
        text: 'Políticas',
        path: policiesRoute(token),
        icon: 'policy',
      },
      {
        text: 'Aspectos Legales',
        path: legalAspectsRoute(token),
        icon: 'gavel',
      },
      {
        text: 'Metadatos',
        path: metadataRoute(token),
        icon: 'source',
      },
      {
        text: 'Interoperabilidad',
        path: interoperabilityRoute(token),
        icon: 'account_tree',
      },
      {
        text: 'Seguridad',
        path: securityRoute(token),
        icon: 'lock',
      },
      {
        text: 'Estadísticas',
        path: statsRoute(token),
        icon: 'equalizer',
      },
      {
        text: 'Servicios de valor añadido',
        path: servicesRoute(token),
        icon: 'miscellaneous_services',
      },
      {
        text: 'Resumen',
        path: summaryRoute(token),
        icon: 'receipt',
      },
      {
        text: 'Volver al inicio',
        path: HOME_ROUTE,
        icon: 'arrow_back_ios',
      },
    ];

    return {
      mainItems: list.slice(0, -1),
      footerItems: list.slice(-1),
    };
  }, [token]);

  return (
    <section className='evaluation'>
      <Menu title={repositoryName} items={mainItems} footerItems={footerItems} mode='dark' />

      <article className='content'>
        <Routes>
          <Route index element={<Visibility />} />
          <Route path='policy' element={<Policies />} />
          <Route path='legal_aspects' element={<LegalAspects />} />
          <Route path='metadata' element={<Metadata />} />
          <Route path='interoperability' element={<Interoperability />} />
          <Route path='security' element={<Safety />} />
          <Route path='stats' element={<Statistics />} />
          <Route path='services' element={<ValueServices />} />
          <Route path='summary' element={<Summary />} />
        </Routes>
      </article>
    </section>
  );
}

export default Evaluation;
