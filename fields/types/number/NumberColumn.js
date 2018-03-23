import React from 'react';
import numeral from 'numeral';
import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';

var NumberColumn = React.createClass({
  displayName: 'NumberColumn',
  propTypes  : {
    col : React.PropTypes.object,
    data: React.PropTypes.object,
    list: React.PropTypes.object
  },
  renderValue () {
    const value = this.props.data.fields[this.props.col.path];
    if (!value || isNaN(value)) return null;

    let formattedValue = value;

    if (this.props.col.type === 'money') {
      const currency = this.props.list.fields[this.props.col.path].currency || 'en-gb';
      const format = this.props.list.fields[this.props.col.path].format || '$0,0.00';

      if (currency) {
        try {
          numeral.language(currency, require('numeral/languages/' + currency));
          numeral.language(currency);
        } catch (err) {
          throw new Error('NumberColumn: currency failed to load.');
        }
      }

      if (format) {
        formattedValue = numeral(value).format(format);
      } else {
        formattedValue = numeral(value);
      }
    }

    return formattedValue;
  },
  render () {
    return (
        <ItemsTableCell>
          <ItemsTableValue field={this.props.col.type}>
            {this.renderValue()}
          </ItemsTableValue>
        </ItemsTableCell>
    );
  },
});

module.exports = NumberColumn;
