import PropTypes from 'prop-types';

const AutomaticMessage = ({ title }) => {
  return (
    <section>
      <h1>{title}</h1>
      <p>Los datos de esta sección son recolectados automáticamente.</p>
    </section>
  );
};

AutomaticMessage.propTypes = {
  title: PropTypes.string,
};

export default AutomaticMessage;
