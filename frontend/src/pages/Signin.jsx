import { ButtomWarning } from "../components/ButtomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export default function Signin(){
    return <div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
        <div className="bg-white rounded-lg w-90 text-center p-3">
            <Heading label={"Sign In"}></Heading>
            <SubHeading label={"Enter your Credentials to access your account"}></SubHeading>
            <InputBox label={"Email"} placeholder={"johndoe@example.com"}></InputBox>
            <InputBox label={"Password"}></InputBox>
            <div className="mt-4">
                <Button label={"Sign In"}></Button>
            </div>
            <ButtomWarning label={"Don't have an account?"} buttomText={"Sign Up"} to={"/signup"}></ButtomWarning>
        </div>
    </div>
}