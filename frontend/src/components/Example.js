const Example = () => {
 console.log(process.env)
    return (
        <div>
            {process.env.REACT_APP_BACKEND}
        </div>
    )
}

export default Example
