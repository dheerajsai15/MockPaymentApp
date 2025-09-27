import { Button } from "./Button";

export function InputBox({label, placeholder, InputRef}){
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        
        <input ref={InputRef} type="text" placeholder={placeholder} className="border-1 border-gray-300 rounded w-full px-2 py-1"></input>
    </div>
}