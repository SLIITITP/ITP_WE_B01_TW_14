const Spinner = ({splash = "Loading..."}) => {
    return (
    <div className="text-center mt-5" >
        <div
        className="spinner-border m-5"
        style={{width: "3rem", height: "3rem"}}
        role="status"
        >
            <span className="sr-only"></span>
        </div>
        <h3>{splash}</h3>
    </div>
    );
};


export default Spinner;