import { connect } from 'react-redux';

// constants
import { getRWAdapter } from 'constants/widget-editor';

// component
import WidgetChart from './component';

export default connect(
  (state) => ({
    RWAdapter: getRWAdapter({ locale: state.common.locale }),
  }),
  null,
)(WidgetChart);
