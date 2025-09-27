import { useRef } from "react";
import { ButtomWarning } from "../components/ButtomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"

export default function Signup(){

    async function signup(){
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
            username: email,
            password: password,
            firstName,
            lastName
        })

        localStorage.setItem("token",response.data.token)
    }

    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    return <div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
        <div className="bg-white rounded-lg w-90 text-center p-3">
            <Heading label={"Sign Up"}></Heading>
            <SubHeading label={"Enter your information to create an account"}></SubHeading>
            <InputBox label={"First Name"} InputRef={firstNameRef} placeholder={"John"}></InputBox>
            <InputBox label={"Last Name"} InputRef={lastNameRef} placeholder={"Doe"}></InputBox>
            <InputBox label={"Email"} InputRef={emailRef} placeholder={"johndoe@example.com"}></InputBox>
            <InputBox label={"Password"} InputRef={passwordRef}></InputBox>
            <div className="mt-4">
                <Button label={"Sign Up"} onClick={signup}></Button>
            </div>
            <ButtomWarning label={"Already have an Account?"} buttomText={"Log In"} to={"/signin"}></ButtomWarning>
        </div>
    </div>
}