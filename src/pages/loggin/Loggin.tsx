import { Button } from "@mui/material";
import axios from "axios";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomTextField } from '../../components/TextField';
import { useReduxDispatch } from "../../store";
import { setLogged } from "./logginSlice";

export interface LogginFormValues {
    username: string;
    password: string;
}

export const Loggin: FC = () => {
    const dispatch = useReduxDispatch();
    const { handleSubmit, control } = useForm<LogginFormValues>({
        defaultValues: {
            username: "",
            password: ""
        }
    });
    const onValid: SubmitHandler<LogginFormValues> = ({ username, password }) => {
        axios("https://eov92bojdx6pbz5.m.pipedream.net", {
            auth: {
                username,
                password
            }
        })
            .then(resp => {
                console.log(resp);
                if (resp.data) {
                    dispatch(setLogged({ token: resp.data }))
                } else {

                }
            })
    }
    return (
        <form onSubmit={handleSubmit(onValid)} noValidate>
            <CustomTextField
                name="username"
                control={control}
            />
            <CustomTextField
                name="password"
                type="password"
                control={control}
            />
            <Button type="submit">accept</Button>
        </form>
    )
}