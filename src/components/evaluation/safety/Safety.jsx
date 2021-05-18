import RadioGroup from '../../general/radioGroup/RadioGroup';
import { StepControls } from '../../steps/Steps';
import { statsRoute, interoperabilityRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';

const Safety = () => {
  const { token } = useParams();

  return (
    <>
      {categories.map(cat => (
        <RadioGroup key={`cat-${cat.id}`} text={cat.label} options={cat.options} />
      ))}
      <StepControls backRoute={interoperabilityRoute(token)} nextRoute={statsRoute(token)} />
    </>
  );
};

const categories = [
  {
    id: 1,
    label: 'Mención en el sitio del RI de la realización de copias de seguridad',
    options: [
      { id: 1, label: 'Sí', value: 5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 2,
    label: 'Mención en el sitio del RI de la ejecución de sumas de verificación (checksum)',
    options: [
      { id: 1, label: 'Sí', value: 5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
];

export default Safety;
