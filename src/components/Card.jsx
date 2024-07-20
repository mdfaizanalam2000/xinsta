import React from 'react'

const Card = (props) => {
    const date = new Date(props.user.string_list_data[0].timestamp * 1000);
    return (
        <>
            <div className="col-12 col-md-4 my-2">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Username: {props.user.string_list_data[0].value}</h6>
                        <p className="card-text text-muted">{props.cardMessage + date.toLocaleString()}</p>
                        <a target='_blank' rel='noreferrer' href={props.user.string_list_data[0].href} className="btn btn-warning">View Profile</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
