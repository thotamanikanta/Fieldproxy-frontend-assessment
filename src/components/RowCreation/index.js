import './index.css'

const RowCreation=(props)=>{
    const {columnType,id,onChangeInputEvent,rowValue,onChangeMultiEvent}=props
    let {multipleSelect}=props
    let inputType='text'
    console.log(columnType,inputType)
    if(columnType==='date'){
        inputType='date'
    }

    let renderRow=null
    let rowId=id
   let rowList=[]
   let inputValue
   rowList.push({[id]:''})
   for(let each of rowValue){
        if (rowId in each){
            inputValue=each[rowId]
        }
    }
    const onChangeInput=(event)=>{   
        let rowEl=document.getElementById(rowId)
        if(inputType!=='date'){
            if(!isNaN(rowEl.value)){
                onChangeInputEvent(rowId,event)
            }
            else{
                rowEl.value=''
                alert('Please provide valid number')
            }
        }
        
            
        onChangeInputEvent(rowId,event)    
    }
    const onChangeOption=(event)=>{
        onChangeMultiEvent(rowId,event)
    }
    if(columnType!=='multiSelect'){
         renderRow=(
            <td className="column-heading">
                    <input type={inputType} className="row-text" id={rowId} defaultValue={inputValue}  onBlur={onChangeInput}/>
                </td>
        )
    }
    else{
        const multiList=multipleSelect.split(',')
         renderRow=(
            <td className="column-heading">
                    <select className="multi-select" id={rowId} defaultValue={inputValue} onBlur={onChangeOption}>
                        <option>select</option>
                        {multiList.map((each)=>(
                            <option value={each}>{each}</option>
                        ))}
                    </select>
                </td>
        )
        multipleSelect=''
    }
   
    return (
        renderRow
    )
}

export default RowCreation