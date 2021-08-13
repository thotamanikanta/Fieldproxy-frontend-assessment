import './index.css'

const TableCreation=(props)=>{
    const {columnName}=props
    return (
        <th>{columnName}</th>
    )
}

export default TableCreation