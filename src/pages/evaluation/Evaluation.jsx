import './Evaluation.scss';
import Steps from '../../components/steps/Steps';
import AutomaticMessage from '../../components/automaticMessage/Automatic';
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
} from '../../const/routes';

const criteriaSteps = [
  { id: 1, label: 'Visibilidad', component: <Visibility />, path: visibilityRoute },
  { id: 2, label: 'Políticas', component: <Policies />, path: policiesRoute },
  {
    id: 3,
    label: 'Aspectos Legales',
    component: <LegalAspects />,
    path: legalAspectsRoute,
  },
  { id: 4, label: 'Metadatos', component: <Metadata />, path: metadataRoute },
  {
    id: 5,
    label: 'Interoperabilidad',
    component: <AutomaticMessage />,
    path: interoperabilityRoute,
  },
  { id: 6, label: 'Seguridad', component: <Safety />, path: securityRoute },
  { id: 7, label: 'Estadísticas', component: <Statistics />, path: statsRoute },
  {
    id: 8,
    label: 'Servicios de valor añadido',
    component: <AutomaticMessage />,
    path: servicesRoute,
  },
  // {
  //   id: 9,
  //   label: 'Opinión personal del evaluador',
  //   component: <RaterOpinion />,
  //   path: opinionRoute,
  // },
];

function Evaluation() {
  return (
    <div className='evaluation'>
      <h3 className='evaluation__title'>Evaluación del repositorio</h3>
      It is a long established fact that a reader will be distracted by the readable content of a
      page when looking at its layout.
      <Steps items={criteriaSteps} />
    </div>
  );
}

export default Evaluation;
