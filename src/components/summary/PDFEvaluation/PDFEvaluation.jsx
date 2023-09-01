import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Fields as Visibility } from '../../evaluation/visibility/Visibility';
// import { Fields as Policies } from '../../evaluation/policies/Policies';
// import { Fields as LegalAspects } from '../../evaluation/legalAspects/LegalAspects';
// import { Fields as Metadata } from '../../evaluation/metadata/Metadata';
// import { Fields as Interoperability } from '../../evaluation/interoperability/Interoperability';
// import { Fields as Safety } from '../../evaluation/safety/Safety';
// import { Fields as Statistics } from '../../evaluation/statistics/Statistics';
// import { Fields as ValueServices } from '../../evaluation/valueServices/ValueServices';
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

// const ref = React.createRef();

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
