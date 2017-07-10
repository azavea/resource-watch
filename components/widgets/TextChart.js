import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import { format } from 'd3-format';

// Components
import Spinner from 'components/ui/Spinner';

class TextChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      data: null
    };
  }

  componentDidMount() {
    this.getData();
  }

  /**
   * Fetch the data of the widget
   */
  getData() {
    this.setState({ loading: true });
    const url = this.props.widgetConfig.data.url;

    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.statusText);
      })
      .then(data => this.setState({ data: data.data[0], error: null }))
      .catch(err => this.setState({ error: err.message }))
      .then(() => this.setState({ loading: false }));
  }

  /**
   * Return the actual content of the widget
   */
  getContent() {
    const { template_config, template } = this.props.widgetConfig;

    return template_config.reduce((res, config) => {
      const key = config.key;
      const value = this.state.data[key];
      const suffix = config.suffix || '';
      const formatter = config.format && !isNaN(parseInt(value, 10))
        ? val => format(config.format)(parseInt(val, 10))
        : val => val;
      const substitution = (!isNaN(parseInt(value, 10)) || formatter(value).length)
        ? `<span class="token">${formatter(value)}${suffix}</span>`
        : '';

      return res.replace(new RegExp(`{{${key}}}`, 'g'), substitution);
    }, template);
  }

  render() {
    return (
      <div className="c-text-chart">
        <Spinner isLoading={this.state.loading} className="-light -small" />
        { this.state.error && <div className="error">Unable to load the widget <span>{this.state.error}</span></div> }
        { this.state.data
          && <div className="content" dangerouslySetInnerHTML={{ __html: this.getContent() }} />  // eslint-disable-line react/no-danger
        }
        { !this.state.data && !this.state.loading && !this.state.error
          && <div className="no-data">No data</div>
        }
      </div>
    );
  }

}

TextChart.propTypes = {
  widgetConfig: PropTypes.object.isRequired
};

export default TextChart;
