export function InputBox({label,placeholder}){
    return <div>
        <div className ="text-sm font-medium text=left py-2">
            {label}
        </div>
        <input placeholder ={placehilder} className = "w-full px-2 py-1 border">
    </div>
}