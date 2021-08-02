// eslint-disable-next-line
export const config = {
  autosize: {
    type: 'fit',
    contains: 'padding',
  },
  data: [
    {
      name: 'table',
      transform: [
        {
          type: 'joinaggregate',
          groupby: [
            'x',
          ],
          ops: [
            'sum',
          ],
          fields: [
            'y',
          ],
          as: [
            'total',
          ],
        },
        {
          type: 'stack',
          field: 'y',
          groupby: [
            'x',
          ],
          sort: {
            field: 'total',
            order: [
              'descending',
            ],
          },
        },
        {
          type: 'collect',
          sort: {
            field: 'total',
            order: [
              'descending',
            ],
          },
        },
      ],
      format: {
        type: 'json',
        property: 'data',
      },
      url: "https://api.resourcewatch.org/v1/query/9e1b3cad-db6f-44b0-b6fb-048df7b6c680?sql=SELECT%20area%20as%20x%20%2C%20item%20as%20color%20%2C%20avg(value)%20as%20y%20FROM%20foo_061_rw0_blue_food_supply_edit%20WHERE%20type%20IN%20('Ocean-Sourced%20Food')%20AND%20type%20IS%20NOT%20NULL%20AND%20element%20IN%20('Food%20supply%20(kcal%2Fcapita%2Fday)')%20AND%20element%20IS%20NOT%20NULL%20AND%20area%20NOT%20LIKE%20'World'%20AND%20area%20IS%20NOT%20NULL%20AND%20datetime%20%3D%20'2018-01-01T00%3A00%3A00.000Z'%20AND%20datetime%20IS%20NOT%20NULL%20GROUP%20BY%20x%2C%20color%20ORDER%20BY%20y%20desc%20LIMIT%2050&env=production&language=en&page[size]=999&rw=&env=production&language=en&page[size]=999&rw=&env=production&language=en&page[size]=999&rw=&env=production&language=en&page[size]=999&rw=&env=production&language=en&page[size]=999&rw=&env=production&language=en&page[size]=999&rw=&env=production&language=en&page[size]=999&rw=",
    },
    {
      name: 'filtered',
      source: 'table',
      transform: [
        {
          type: 'joinaggregate',
          groupby: [
            'x',
          ],
          ops: [
            'sum',
          ],
          fields: [
            'y',
          ],
          as: [
            'total',
          ],
        },
        {
          type: 'stack',
          field: 'y',
          groupby: [
            'x',
          ],
          sort: {
            field: 'color',
          },
        },
        {
          type: 'collect',
          sort: {
            field: 'total',
            order: [
              'descending',
            ],
          },
        },
      ],
    },
  ],
  legend: [
    {
      type: 'color',
      label: null,
      shape: 'square',
      values: [
        {
          label: 'Pelagic Fish',
          value: '#40B2CE',
          type: 'string',
        },
        {
          label: 'Fish, Body Oil',
          value: '#2E75AD',
          type: 'string',
        },
        {
          label: 'Demersal Fish',
          value: '#F9B746',
          type: 'string',
        },
        {
          label: 'Marine Fish, Other',
          value: '#ED4A4D',
          type: 'string',
        },
        {
          label: 'Aquatic Plants',
          value: '#68B631',
          type: 'string',
        },
      ],
    },
  ],
  config: {
    range: {
      dotSize: [
        20,
        250,
      ],
      category20: [
        '#40B2CE',
        '#2E75AD',
        '#F9B746',
        '#ED4A4D',
        '#68B631',
        '#C22E7A',
        '#F478B7',
        '#63D2B9',
        '#F0812D',
        '#9E1D0D',
        '#A7E9E3',
        '#BAD771',
        '#393F44',
        '#CACCD0',
        '#717171',
      ],
      ordinal: {
        scheme: 'greens',
      },
      ramp: {
        scheme: 'purples',
      },
    },
    axis: {
      labelFontSize: 13,
      labelFont: 'Lato',
      labelColor: '#717171',
      labelPadding: 10,
      ticks: true,
      tickSize: 8,
      tickColor: '#A9ABAD',
      tickOpacity: 0.5,
      tickExtra: false,
    },
    axisX: {
      bandPosition: 0.5,
      domainWidth: 1.2,
      domainColor: '#A9ABAD',
      labelAlign: 'center',
      labelBaseline: 'top',
    },
    axisY: {
      domain: false,
      labelAlign: 'left',
      labelBaseline: 'bottom',
      tickOpacity: 0.5,
      grid: true,
      ticks: false,
      gridColor: '#A9ABAD',
      gridOpacity: 0.5,
    },
    mark: {
      fill: '#40B2CE',
    },
    symbol: {
      fill: '#40B2CE',
      stroke: '#fff',
    },
    rect: {
      fill: '#40B2CE',
    },
    line: {
      interpolate: 'linear',
      stroke: '#40B2CE',
      fillOpacity: 0,
    },
    name: 'user-custom',
  },
  signals: [],
  scales: [
    {
      name: 'x',
      type: 'band',
      domain: {
        data: 'filtered',
        field: 'x',
      },
      range: 'width',
      padding: 0.05,
    },
    {
      name: 'y',
      type: 'linear',
      domain: {
        data: 'filtered',
        field: 'y1',
      },
      nice: true,
      zero: true,
      range: 'height',
    },
    {
      name: 'color',
      type: 'ordinal',
      domain: {
        data: 'table',
        field: 'color',
      },
      range: [
        '#40B2CE',
        '#2E75AD',
        '#F9B746',
        '#ED4A4D',
        '#68B631',
        '#C22E7A',
        '#F478B7',
        '#63D2B9',
        '#F0812D',
        '#9E1D0D',
        '#A7E9E3',
        '#BAD771',
        '#393F44',
        '#CACCD0',
        '#717171',
      ],
    },
  ],
  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      labelOverlap: 'parity',
      ticks: false,
      title: 'Country',
      encode: {
        labels: {
          update: {
            text: {
              signal: 'truncate(datum.value, 12)',
            },
            align: {
              signal: "width < 300 || data('table')[0].count > 10 ? 'right' : 'center'",
            },
            baseline: {
              signal: "width < 300 || data('table')[0].count > 10 ? 'middle' : 'top'",
            },
            angle: {
              signal: "width < 300 || data('table')[0].count > 10 ? -90 : 0",
            },
          },
        },
      },
    },
    {
      orient: 'left',
      scale: 'y',
      labelOverlap: 'parity',
      format: 's',
      titleLimit: {
        signal: 'height',
      },
      title: 'Value (avg)',
      encode: {
        labels: {
          update: {
            align: {
              value: 'right',
            },
            baseline: {
              value: 'bottom',
            },
          },
        },
      },
    },
  ],
  marks: [
    {
      type: 'rect',
      from: {
        data: 'filtered',
      },
      encode: {
        update: {
          opacity: {
            value: 1,
          },
          fill: {
            scale: 'color',
            field: 'color',
          },
          x: {
            scale: 'x',
            field: 'x',
          },
          width: {
            scale: 'x',
            band: 1,
          },
          y: {
            scale: 'y',
            field: 'y0',
          },
          y2: {
            scale: 'y',
            field: 'y1',
          },
        },
        hover: {
          opacity: {
            value: 0.8,
          },
        },
      },
    },
  ],
  interaction_config: [
    {
      name: 'tooltip',
      config: {
        fields: [
          {
            column: 'x',
            property: 'Country',
            type: 'string',
            format: '.2f',
          },
          {
            column: 'color',
            property: 'Food type',
            type: 'string',
            format: '.2f',
          },
          {
            column: 'y',
            property: 'Type value',
            type: 'number',
            format: '.2s',
          },
          {
            column: 'total',
            property: 'Total value',
            type: 'number',
            format: '.2s',
          },
        ],
      },
    },
  ],
};
