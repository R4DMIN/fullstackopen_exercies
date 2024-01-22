import "./Message.css"

const Message = ({ message, color }) => {
    return (
        <div className={"message " + color}>
            {message}
        </div>
    )
}

export default Message