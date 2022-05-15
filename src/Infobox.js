import { Card } from '@material-ui/core'
import React from 'react'

function Infobox(props) {

    return (
        <div>
            <Card>
                <h3>{props.title}</h3>
                <p><i><b>{props.number}</b></i></p>
            </Card>
        </div>
    )
}

export default Infobox
