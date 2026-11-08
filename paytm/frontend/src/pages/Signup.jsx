import {BottomWarning} from "./components/BottomWarning";
import {Button} from "../components/Button"
import {Heading} from "../components/HeadingCompontes"
import {InputBox} from "../components/inputbox"
import {SubHeading} from "../components/subHeading"
import {axios} from "axios";

export const Signup = () => {
    const [firstName ,setFirstName] = usestate("");
    const [lastName ,setLastName] = usestate("");
    const [UserName ,setUserName] = usestate("");
    const [password ,setPassword] = usestate("");

    return <div className ="bg-slate-300 h-screen flex justify-centre">
        <div className = "flex flex-col justify-centere">
            <div>
                <Heading label={"Sign up"}/>
                <SubHeading  label ={"Enter your crediantial to Crete acc"}/>
                <InputBox onChange ={e=>{
                    setFirstName(e.taret.value)
                }} placeholder= "JOhn" label={"First Name"}/>
                <InputBox onChange = {e =>{
                    setLastName(e.target.value);
                }}
                 plcaholder ="Doe" label ={"Last Name"}/>
                <InputBox onChange ={e=>{
                    setUserName(e.taret.value)
                } placeholder= "kunal.shitole21@gmail.com" label={"Email"}/>
                <InputBox onChange ={e=>{
                    setPassword(e.taret.value)
                } plcaholder ="123456" label ="Password"/>
                <div>
                   <Button onClick ={
                    axios.post("https://localhost/api/vi/user/signup", {
                        username,
                        firstName,
                        lastName,
                        password
                    })
                   } label ={"Sign up"}/>
                </div>
                <BottomWarning label ={"Already have an account "} buttontext ={Sign in}/>

            </div>

            </div>
        </div>
}