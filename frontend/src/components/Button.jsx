export function Button({label, onClick}){
    return <button onClick={onClick} className="bg-black text-white rounded-md w-full p-2 cursor-pointer">{label}</button>
}