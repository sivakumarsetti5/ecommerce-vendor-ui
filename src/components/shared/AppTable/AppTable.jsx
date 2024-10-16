import React, { useState } from 'react'
import { Pagination } from './Pagination'

export const AppTable = ({ths,data,tds,handleEdit,handleDelete}) => {
    const perPage = 5;
    const [currPage, setCurrPage] = React.useState(1)
    const [currData, setCurrData] = useState([])

    React.useEffect(() => {
        const end = currPage * perPage;
        const start = end - perPage;
        setCurrData(data?.slice?.(start, end))
    }, [currPage, data])
  return (
    <div className='table-responsive'>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    {ths?.map((val,index)=>{
                        return <th key={`th ${index}`}>{val}</th>
                    })}
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {currData?.map((obj,index)=>{
                    return <tr key={`tr ${index}`}>
                        {tds?.map((val,index)=>{
                            return <td key={`td ${index}`}>{obj[val]}</td>
                        })}
                        <td><button onClick={()=>handleEdit(obj)}>Edit</button></td>
                        <td><button onClick={()=>handleDelete(obj)}>Delete</button></td>
                    </tr>
                })}
            </tbody>
        </table>
        <div>
        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={Math.ceil(data.length/perPage)} />
        </div>
    </div>
  )
}
