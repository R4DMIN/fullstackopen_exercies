const Notification = ({message}) => {
    return(
        <div className={message.error ? "error" : "notification"}>
            {message.text}
        </div>
    )
}

export default Notification