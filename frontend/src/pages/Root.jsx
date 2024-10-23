import {Outlet} from "react-router-dom";
import classes from "../styles/Root.module.css";
export default function Root() {
    return (
        <div className={classes['root-layout']}>
            <Outlet/>
        </div>
    );
}