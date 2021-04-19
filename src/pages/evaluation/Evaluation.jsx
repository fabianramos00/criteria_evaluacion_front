import './Evaluation.scss';
import Steps from '../../components/steps/Steps';
import AutomaticMessage from '../../components/automaticMessage/Automatic';
import Visibility from '../../components/evaluation/visibility/Visibility';
import Policies from '../../components/evaluation/policies/Policies';
import LegalAspects from '../../components/evaluation/legalAspects/LegalAspects';
import Safety from '../../components/evaluation/safety/Safety';
import Statistics from '../../components/evaluation/statistics/Statistics';
import RaterOpinion from '../../components/evaluation/raterOpinion/RaterOpinion';

const criteriaSteps = [
  { id: 1, label: 'Visibilidad', component: <Visibility /> },
  { id: 2, label: 'Políticas', component: <Policies /> },
  { id: 3, label: 'Aspectos Legales', component: <LegalAspects /> },
  { id: 4, label: 'Metadatos', component: <AutomaticMessage /> },
  { id: 5, label: 'Interoperabilidad', component: <AutomaticMessage /> },
  { id: 6, label: 'Seguridad', component: <Safety /> },
  { id: 7, label: 'Estadísticas', component: <Statistics /> },
  { id: 8, label: 'Servicios de valor añadido', component: <AutomaticMessage /> },
  {
    id: 9,
    label: 'Opinión personal del evaluador',
    component: <RaterOpinion />,
  },
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
