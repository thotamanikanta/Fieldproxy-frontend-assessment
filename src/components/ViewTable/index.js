import './index.css'

const ViewTable=(props)=>{
    const {rowValue,id}=props
    let rowId=id
   let rowList=[]
   let inputValue=null
   rowList.push({[id]:''})
    for(let each of rowValue){
        if (rowId in each){
            inputValue=each[rowId]
        }
    }
   
    return (
        <td className="column-heading">
                    {inputValue}
                </td>
    )
}

export default ViewTable