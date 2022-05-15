import React from 'react'
import './Table.css';

function Table(props) {
    let sortedData=props.tableData.sort((a,b)=>a.cases>b.cases?-1:1)
    return (
        <div className="table">
            
                {
                    sortedData.map((data)=>(
                        <tr key={data.id.toString()}>
                            
                            <td>{data.name}</td>
                            <td>{data.cases}</td>
                        </tr>
                    ))
                }
            
            
        </div>
    )
}

export default Table
