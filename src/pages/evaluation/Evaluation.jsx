import { useMemo, useContext } from 'react';
import { useParams, Switch, Route } from 'react-router-dom';
import Visibility from '../../components/evaluation/visibility/Visibility';
import Policies from '../../components/evaluation/policies/Policies';
import LegalAspects from '../../components/evaluation/legalAspects/LegalAspects';
import Safety from '../../components/evaluation/safety/Safety';
import Statistics from '../../components/evaluation/statistics/Statistics';
import Metadata from '../../components/evaluation/metadata/Metadata';
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
} from '../../const/routes';
import Menu from '../../components/general/menu/Menu';
import Interoperability from '../../components/evaluation/interoperability/Interoperability';
import ValueServices from '../../components/evaluation/valueServices/ValueServices';
import { TotalContext } from '../../context/context';
import './Evaluation.scss';

function Evaluation() {
  const { token } = useParams();
  const { repositoryName } = useContext(TotalContext);

  const items = useMemo(
    () => [
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
        text: 'Volver al inicio',
        path: HOME_ROUTE,
        icon: 'arrow_back_ios',
      },
    ],
    [token],
  );

  return (
    <section className='evaluation'>
      <Menu title={repositoryName} items={items} mode='dark' />
      <article className='content'>
        <Switch>
          <Route exact path={visibilityRoute()}>
            <Visibility />
          </Route>
          <Route exact path={policiesRoute()}>
            <Policies />
          </Route>
          <Route exact path={legalAspectsRoute()}>
            <LegalAspects />
          </Route>
          <Route exact path={metadataRoute()}>
            <Metadata />
          </Route>
          <Route exact path={interoperabilityRoute()}>
            <Interoperability />
          </Route>
          <Route exact path={securityRoute()}>
            <Safety />
          </Route>
          <Route exact path={statsRoute()}>
            <Statistics />
          </Route>
          <Route exact path={servicesRoute()}>
            <ValueServices />
          </Route>
        </Switch>
      </article>
    </section>
  );
}

export default Evaluation;
