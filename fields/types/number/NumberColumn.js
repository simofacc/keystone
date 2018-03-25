import React from 'react';
import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';
import numeral from 'numeral';

numeral.register('locale', 'eur', {
  delimiters   : {
    thousands: ',',
    decimal  : '.'
  },
  abbreviations: {
    thousand: 'k',
    million : 'm',
    billion : 'b',
    trillion: 't'
  },
  ordinal      : function (number) {
    var b = number % 10;
    return (~~(number % 100 / 10) === 1) ? 'th' :
        (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
  },
  currency     : {
    symbol: '€'
  }
});

// switch between locales
numeral.locale('eur');

var NumberColumn = React.createClass({
  displayName: 'NumberColumn',
  propTypes  : {
    col : React.PropTypes.object,
    data: React.PropTypes.object,
    list: React.PropTypes.object
  },
  renderValue () {
    const value = this.props.data.fields[this.props.col.path];
    if ((!value || isNaN(value)) && value != 0) return null;

    let formattedValue = value;

    if (this.props.col.type === 'money') {
      const format = this.props.list.fields[this.props.col.path].formatString || '$ 0,0.00';

      formattedValue = numeral(value).format(format);
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
