import classes from "../styles/LoadingIndicator.module.css"

export default function LoadingIndicator(){
    return(
        <div className={classes["loading-container"]}>
            <div className={classes.loader}>
            </div>
        </div>
    )
}