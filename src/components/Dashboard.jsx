import React from 'react'
import Card from './Card'

const Dashboard = (props) => {
    return (props.data.length === 0 ?
        <h5 className='text-center my-2'>No data found!</h5>
        : <div className='row mx-2'>
            <h5 className='text-center my-2'>Found {props.data.length} pending requests.</h5>
            {props.data.map((item, index) => {
                return <Card key={index} user={item} />
            })}</div>
    )
}

export default Dashboard
