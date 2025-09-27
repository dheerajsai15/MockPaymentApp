import { Link } from "react-router-dom";

export function ButtomWarning({label, buttomText, to}){
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className="cursor-pointer underline pl-1" to={to}>
            {buttomText}
        </Link>
    </div>
}