import './index.css'

const RowCreation=(props)=>{
    const {multipleSelect,id,onChangeInputEvent,rowValue}=props
    let renderRow=null
    let rowId=id
   let rowList=[]
   let inputValue=null
   rowList.push({[id]:''})
    console.log(rowValue,'hg',rowId)
    for(let each of rowValue){
        if (rowId in each){
            inputValue=each[rowId]
        }
    }
    const onChangeInput=(event)=>{
        onChangeInputEvent(rowId,event)
    }
    const onChangeOption=(event)=>{
        onChangeInputEvent(rowId,event)
    }
    if(multipleSelect===''){
         renderRow=(
            <td className="column-heading">
                    <input type="text" className="row-text" id={rowId} defaultValue={inputValue}  onBlur={onChangeInput}/>
                </td>
        )
    }
    else{
        const multiList=multipleSelect.split(',')
         renderRow=(
            <td className="column-heading">
                    <select className="multi-select" id={rowId} defaultValue={inputValue} onChange={onChangeOption}>
                        {multiList.map((each)=>(
                            <option value={each}>{each}</option>
                        ))}
                    </select>
                </td>
        )
    }
   
    return (
        renderRow
    )
}

export default RowCreation