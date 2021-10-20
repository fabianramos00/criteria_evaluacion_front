import PropTypes from 'prop-types';
import './ListItemCheck.scss';
import ReactTooltip from 'react-tooltip';

const ListItemCheck = ({ text = '', showResult = false, pass = false }) => {
  return (
    <li className={`list-item-check ${showResult ? 'evaluated' : ''}`}>
      {showResult && (
        <span className='wrapper'>
          {pass ? (
            <span
              className='material-icons-outlined pass'
              data-tip='Criterio/atributo encontrado en todos los documentos evaluados'
            >
              check_circle_outline
            </span>
          ) : (
            <span
              className='material-icons-outlined fails'
              data-tip='Criterio/atributo no encontrado en todos los documentos evaluados'
            >
              cancel
            </span>
          )}
          <ReactTooltip backgroundColor='#636161' textColor='#e3e3e3' />
        </span>
      )}{' '}
      {text}
    </li>
  );
};

ListItemCheck.propTypes = {
  text: PropTypes.string.isRequired,
  showResult: PropTypes.bool,
  pass: PropTypes.bool,
};

export default ListItemCheck;
