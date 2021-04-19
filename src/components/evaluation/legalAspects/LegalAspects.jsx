const LegalAspects = () => {
  return (
    <>
      {categories.map(cat => (
        <div key={`cat-${cat.id}`} role='radiogroup' aria-labelledby='group_label_1' id={cat.id}>
          <h5 id='group_label_1'>{cat.label}</h5>
          <div style={{ display: 'flex' }}>
            {cat.options.map(option => (
              <label
                key={`opt-${cat.id}-${option.id}`}
                className='radio'
                style={{ textAlign: 'center', margin: '0 10px', cursor: 'pointer' }}
              >
                {option.label}
                <input
                  type='radio'
                  name='answer'
                  value={option.value}
                  style={{ cursor: 'pointer' }}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
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
  // {
  //   id: 4,
  //   label: 'Inclusión de los derechos de autor en los metadatos de cada recurso',
  //   options: [
  //     { id: 1, label: 'Sí', value: 2 },
  //     { id: 2, label: 'No', value: 0 },
  //   ],
  // },
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
