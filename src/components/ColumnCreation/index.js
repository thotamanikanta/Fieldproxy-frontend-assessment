import { Component } from 'react'
import TableCreation from '../TableCreation'
import RowCreation from '../RowCreation'
import './index.css'


let getRowsFromLocalStorage=()=>{
    let stringifiedRows = localStorage.getItem("rows");
    let parsedRows = JSON.parse(stringifiedRows);
    if (parsedRows === null) {
        return [];
    } else {
        return parsedRows;
    }
}
let rows=getRowsFromLocalStorage()
if(rows.length===0){
    rows=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
}

let getColumnListFromLocalStorage=()=>{
    let stringifiedTodoList = localStorage.getItem("columnList");
    let parsedColumnList = JSON.parse(stringifiedTodoList);
    if (parsedColumnList === null) {
        return [];
    } else {
        return parsedColumnList;
    }
}
let columnList=getColumnListFromLocalStorage()
console.log(columnList)

let getRowListFromLocalStorage=()=>{
    let stringifiedRowList = localStorage.getItem("rowList");
    let parsedRowList = JSON.parse(stringifiedRowList);
    if (parsedRowList === null) {
        return [];
    } else {
        return parsedRowList;
    }
}
let rowList=getRowListFromLocalStorage()
        
class ColumnCreation extends Component{
    state={columnName:'',columnType:'Text',multipleSelect:'',submitForm:false,rows:rows
}

    onChangeType = event => {
        this.setState({columnType:event.target.value})
    }

    onChangeName= event =>{
        
        this.setState({columnName:event.target.value})
        
    }

    onChangeMultiSelect=event=>{
        this.setState({multipleSelect:event.target.value})
    }

    onSubmitForm= event =>{
        event.preventDefault()
        let colName=document.getElementById("columnName")
        let colType=document.getElementById("colType")
        let multiSelectElement=document.getElementById("multiSelect")
        this.setState({submitForm:true})
        const {columnName,columnType,multipleSelect}=this.state
        if(colName.value===''){
          return  alert("Please provide Column Name")
        }
        if (colType.value==='multiSelect'){
            if(multiSelectElement.value===''){
                return alert("Please provide multiple columns text")
            }
        }
        
        columnList.push({columnName:columnName,columnType:columnType,multipleSelect:multipleSelect,id:columnList.length+1})
        colName.value=''
    }


    onSaving=()=>{
        const {rows}=this.state
        localStorage.setItem("columnList",JSON.stringify(columnList))
        localStorage.setItem("rowList",JSON.stringify(rowList))
        localStorage.setItem("rows",JSON.stringify(rows))
    }
    onChangeInputEvent=(id,event)=>{
        this.setState({[id]:event.target.value})
        rowList.push({[id]:event.target.value})

    }
    onAdd=()=>{
        const {rows}=this.state
        this.setState({rows:[...rows, rows.length+1]})
        
    }
    render(){
        const {columnType,rows}=this.state
        const multiSelect= columnType==="multiSelect" ? (
            <div className="input-container">
                        <label htmlFor="multiSelect" className="label">
                            Multiple Values: 
                        </label>
                        <input type="text" className="input" id="multiSelect" placeholder="eg., chennai,mumbai" onChange={this.onChangeMultiSelect}/>
                    </div>
        ):null
        let columnCount=columnList.length
        

        return (
            <div className="bg-container">
                <form className="my-form" onSubmit={this.onSubmitForm}>
                    <div className="input-container">
                        <label htmlFor="columnName" className="label">
                            Column Name: 
                        </label>
                        <input type="text" className="input" id="columnName" placeholder="enter column name" onChange={this.onChangeName} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="columnType" className="label">
                            Column Type: 
                        </label>
                        <select className="select" id="colType" onChange={this.onChangeType}>
                            <option className="option" value="text">Text</option>
                            <option className="option" value="date">Date</option>
                            <option className="option" value="multiSelect">Multi Select</option>
                        </select>
                    </div>
                    {multiSelect}
                    <button type="submit" className="button">Add Column</button>
                </form>
                <div className="table-container">
                    <table className="table-creation" cellpadding="0" cellspacing="0" border="0">
                        <tr className="table-row">
                            {columnList.map(eachList=>(
                                    <TableCreation columnName={eachList.columnName}  key={eachList.id} />
                                ))}
                        </tr>
                    </table>
                    <div className="tb-content">
                        <table className="tb-content">
                            {rows.map(eachRow=>(
                                <tr key={eachRow.id}>
                                    {columnList.map(eachList=>(
                                            <RowCreation  columnCount={columnCount} onChangeInputEvent={this.onChangeInputEvent} rowValue={rowList} id={(eachList.columnName)+String(eachRow)} key={(eachList.columnName)+String(eachRow)} multipleSelect={eachList.multipleSelect} />
                                        ))}
                                </tr>
                            ))}
                            
                        </table>
                    </div>
                    
                </div>
                <div className="btn-container">
                        <button type="button" onClick={this.onAdd}>Add Row</button>
                        <button type="button" onClick={this.onSaving}>Save</button>
                    </div>
            </div>
        )
    }
}

export default ColumnCreation