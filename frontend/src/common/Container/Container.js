import "./Container.css"

const Container = ({children}) => {

    return (
        <div className="component-container">
            {children}
        </div>
    )
}


export default Container;