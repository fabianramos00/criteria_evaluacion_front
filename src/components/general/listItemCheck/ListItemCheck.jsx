import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import './ListItemCheck.scss';
import DetailsModal from '../detailsModal/DetailsModal';


const ListItemCheck = ({ text = '', showResult = false, pass = false }) => {
  const [openDetails, setOpenDetails] = useState(false);

  const isChecked = typeof pass === 'object' ? pass.value : pass;
  const details = typeof pass === 'object' ? pass.details : [];

  const handleDetails = () => setOpenDetails(!openDetails);

  return (
    <li className={`list-item-check ${showResult ? 'evaluated' : ''}`}>
      {showResult && (
        <span className='wrapper'>
          {isChecked ? (
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
              close
            </span>
          )}
          <ReactTooltip backgroundColor='#636161' textColor='#e3e3e3' />
        </span>
      )}{' '}
      {details.length > 0 ? (
        <span className='details-link' onClick={handleDetails}>
          {text}
        </span>
      ) : (
        text
      )}
      <DetailsModal open={openDetails} onClose={handleDetails} text={text} links={details} />
    </li>
  );
};

ListItemCheck.propTypes = {
  text: PropTypes.string.isRequired,
  showResult: PropTypes.bool,
  pass: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      details: PropTypes.arrayOf(PropTypes.string),
      value: PropTypes.bool,
    }),
  ]),
};

export default ListItemCheck;
