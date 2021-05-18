import { StepControls } from '../../steps/Steps';
import { policiesRoute, metadataRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import RadioGroup from '../../general/radioGroup/RadioGroup';

const LegalAspects = () => {
  const { token } = useParams();

  return (
    <>
      {categories.map(cat => (
        <RadioGroup key={`cat-${cat.id}`} text={cat.label} options={cat.options} />
      ))}
      <StepControls backRoute={policiesRoute(token)} nextRoute={metadataRoute(token)} />
    </>
  );
};

const categories = [
  {
    id: 1,
    label:
      'Exigencia al autor de reconocer que no está infringiendo ningún derecho de propiedad intelectua.',
    options: [
      { id: 1, label: 'Sí', value: 2 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 2,
    label: 'Exigencia al autor de la firma de una autorización para la distribución de su obra',
    options: [
      { id: 1, label: 'Sí', value: 2 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 3,
    label:
      'Mención de cómo puede hacer el autor para saber si su obra es depositable según política editorial (Sherpa/Romeo, Dulcinea, etc.)',
    options: [
      { id: 1, label: 'Sí', value: 2 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 5,
    label: 'Inclusión de los derechos de autor en cada recurso',
    options: [
      { id: 1, label: 'Sí', value: 2 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
];

export default LegalAspects;
