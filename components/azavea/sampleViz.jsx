import Renderer from '@widget-editor/renderer';
import RwAdapter from '@widget-editor/rw-adapter';
import {config} from './customChart';

// Pending Qs

// 1) How to add endUserFilter with paramsConfig
// https://github.com/Vizzuality/widget-editor/wiki/Filters#end-user-filters
// 2) Are we able to use any of Vega's native event stream handling?
// https://vega.github.io/vega/docs/event-streams/
// 3) Any ways to join data from multiple RW sources using a lookup transform?
// https://vega.github.io/vega/docs/transforms/lookup/


export default function AzaveaSampleViz() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <div>
        There should be a chart rendered below.
      </div>
      <Renderer adapter={RwAdapter} widgetConfig={config} />
    </div>
  );
}

AzaveaSampleViz.propTypes = { };
