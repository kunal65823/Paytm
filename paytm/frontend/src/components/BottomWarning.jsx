import {Link} from "reat-routs-dom"

export funtion BottomWarning({label,buttonText, to}){
    return <div>
      <div className ="py-2 text-sm flex justify-center">
        {label}
     </div>
     <Link className ="pointer underline pl-1 cursur-pointer" to ={to} >{buttonText</Link>
    
    </div>
}