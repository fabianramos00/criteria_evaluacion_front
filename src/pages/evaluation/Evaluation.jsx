import './Evaluation.scss';
import Steps from '../../components/steps/Steps';

const criteriaSteps = [
  { id: 1, label: 'Visibilidad', component: <div>Resultados del servidor</div> },
  { id: 2, label: 'Políticas', component: <div>Formulario de políticas</div> },
  { id: 3, label: 'Aspectos Legales', component: <div>Formulario Aspectos Legales</div> },
  { id: 4, label: 'Metadatos', component: <div>Metadatos</div> },
  { id: 5, label: 'Interoperabilidad', component: <div>Interoperabilidad</div> },
  { id: 6, label: 'Seguridas', component: <div>Seguridad</div> },
  { id: 7, label: 'Estadísticas', component: <div>Estadísticas</div> },
  { id: 8, label: 'Servicios de valor añadido', component: <div>Servicios de valor añadido</div> },
  {
    id: 9,
    label: 'Opinión personal del evaluador',
    component: <div>Opinión personal del evaluador</div>,
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
