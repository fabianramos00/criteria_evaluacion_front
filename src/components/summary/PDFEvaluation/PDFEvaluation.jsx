import React from 'react';
import { useForm } from 'react-hook-form';
import { Fields as Visibility } from '../../evaluation/visibility/Visibility';
import { Fields as Policies } from '../../evaluation/policies/Policies';
import { Fields as LegalAspects } from '../../evaluation/legalAspects/LegalAspects';
import { Fields as Metadata } from '../../evaluation/metadata/Metadata';
import { Fields as Interoperability } from '../../evaluation/interoperability/Interoperability';
import { Fields as Safety } from '../../evaluation/safety/Safety';
import { Fields as Statistics } from '../../evaluation/statistics/Statistics';
import { Fields as ValueServices } from '../../evaluation/valueServices/ValueServices';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const ref = React.createRef();

const PDF = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div
        ref={ref}
        style={{
          textAlign: 'center',
          width: 1000,
          height: '100%',
          margin: '0 auto',
          padding: '1%',
          boxSizing: 'border-box',
        }}
      >
        <h2>Visibilidad</h2>
        <Visibility disabled errors={errors} control={control} register={register} data={{}} />
        <h2>Políticas</h2>
        <Policies disabled errors={errors} control={control} register={register} data={{}} />
        <h2>Aspectos legales</h2>
        <LegalAspects disabled errors={errors} control={control} register={register} data={{}} />
        <h2>Metadatos</h2>
        <Metadata disabled errors={errors} control={control} register={register} data={{}} />
        <h2>Interoperabilidad</h2>
        <Interoperability
          disabled
          errors={errors}
          control={control}
          register={register}
          data={{}}
        />
        <h2>Seguridad</h2>
        <Safety disabled errors={errors} control={control} register={register} data={{}} />
        <h2>Estadísticas</h2>
        <Statistics disabled errors={errors} control={control} register={register} data={{}} />
        <h2>Servicios de valor añadido</h2>
        <ValueServices disabled errors={errors} control={control} register={register} data={{}} />
      </div>
    </>
  );
};

const PDF2 = () => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

const PDFEvaluation = () => {
  return (
    <div>
      <PDFDownloadLink document={<PDF2 />} fileName='evaluación.pdf'>
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFEvaluation;
