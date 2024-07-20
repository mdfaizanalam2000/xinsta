import React from 'react'
import Card from './Card'

const Dashboard = (props) => {
    return (
        <div className='row'>
            <h6 className='text-center my-2'>{props.message}</h6>
            {props.data.map((item, index) => {
                return <Card key={index} user={item} cardMessage={props.cardMessage} />
            })}</div>
    )
}

export default Dashboard
