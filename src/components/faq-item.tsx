type FaqType = {
    icon:React.ReactNode;
    header:string;
    text:string
}

const FaqItem:React.FC<FaqType> = ({icon , header, text}) => {
    return(
        <div>
            <span>{icon}</span>
            <h3>{header}</h3>
            <p>{text}</p>
        </div>
    )
}

export default FaqItem