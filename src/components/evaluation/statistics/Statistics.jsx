import { useParams } from 'react-router-dom';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import { StepControls } from '../../steps/Steps';
import { servicesRoute, securityRoute } from '../../../const/routes';

const Statistics = () => {
  const { token } = useParams();

  return (
    <>
      {categories.map(cat => (
        <RadioGroup key={`cat-${cat.id}`} text={cat.label} options={cat.options} />
      ))}
      <StepControls backRoute={securityRoute(token)} nextRoute={servicesRoute(token)} />
    </>
  );
};

const categories = [
  {
    id: 1,
    label: 'Disponibilidad de estadísticas públicas del RI en general',
    options: [
      { id: 1, label: 'Sí', value: 5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 2,
    label: 'Disponibilidad de estadísticas públicas de cada documento depositado en el RI',
    options: [
      { id: 1, label: 'Sí', value: 5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
];

export default Statistics;
