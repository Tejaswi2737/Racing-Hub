import _ from 'lodash'
import { Table } from 'semantic-ui-react'

const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Other' },
  { name: 'Ben', age: 70, gender: 'Male' },
]

export default class TableExampleSortable extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
  }

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }



  const tableData = [
    { name: 'John', age: 15, gender: 'Male' },
    { name: 'Amber', age: 40, gender: 'Female' },
    { name: 'Leslie', age: 25, gender: 'Other' },
    { name: 'Ben', age: 70, gender: 'Male' },
  ]

const [column, setcolumn] = useState(null);
const [data, setdata] = useState(tableData);
const [direction, setdirection] = useState(null)

const  handleSort = (clickedColumn) => {

    if (column !== clickedColumn) {
        setcolumn(clickedColumn);
        setdata(_.sortBy(data, [clickedColumn]));
        setdirection('ascending')
      return
    }
    setdata(data.reverse);
    setdirection(direction === 'ascending' ? 'descending' : 'ascending')
  }


const showTable=(column, data, direction)=>{
    console.log(column)
    return(
        <Table sortable celled fixed>

        <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'name' ? direction : null}
            // onClick={handleSort('name')}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'age' ? direction : null}
            // onClick={handleSort('age')}
          >
            Age
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'gender' ? direction : null}
            // onClick={handleSort('gender')}
          >
            Gender
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(data, ({ age, gender, name }) => (
          <Table.Row key={name}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{age}</Table.Cell>
            <Table.Cell>{gender}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    )
    
}
  render() {
    const { column, data, direction } = this.state

    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('name')}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'age' ? direction : null}
              onClick={this.handleSort('age')}
            >
              Age
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'gender' ? direction : null}
              onClick={this.handleSort('gender')}
            >
              Gender
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ age, gender, name }) => (
            <Table.Row key={name}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{age}</Table.Cell>
              <Table.Cell>{gender}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}
