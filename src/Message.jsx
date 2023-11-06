import './Styles/App.css';

const Message = ({message, isPositive}) => {


    let tyyli = ''

    if (isPositive)
    {
        tyyli = 'pos'
    }
    else
    {
        tyyli = 'neg'
    }

    return(
        <div className={tyyli}>
            <h4>{message}</h4>
        </div>
    )

}

export default Message