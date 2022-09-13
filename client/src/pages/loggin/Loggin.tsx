import { Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomTextField } from 'components/TextField';
import { useReduxDispatch } from "store";
import { setStatusMails } from "../mails/mailsSlice";
import { setLogged } from "./logginSlice";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { baseURL } from "api";

export interface LogginFormValues {
    username: string;
    password: string;
}
// export const baseURL = process.env.NODE_ENV === "development" ? "http://192.168.0.56:4000" :
//     process.env.VERCEL_URL;

export const Loggin: FC = () => {
    const dispatch = useReduxDispatch();
    const [openError, setOpenError] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const { handleSubmit, control } = useForm<LogginFormValues>({
        defaultValues: {
            username: "",
            password: ""
        }
    });
    const onValid: SubmitHandler<LogginFormValues> = ({ username, password }) => {
        dispatch(setStatusMails('pending'));
        axios("/login", {
            baseURL,
            auth: {
                username,
                password
            },
            withCredentials: true,
        })
            .then(resp => {
                console.log(resp);
                if (resp.data) {
                    dispatch(setLogged({ token: resp.data }));
                    setOpenError(false);
                } else {
                    // setOpenError(true);
                }
            })
            .catch(err => {
                console.error(err?.response);
                setOpenError(true);
            })
            .finally(() => dispatch(setStatusMails('iddle')));
    }
    return (
        <>
            <Typography
                children="Very advanced password is: 12345"
            />
            <form onSubmit={handleSubmit(onValid)} noValidate>
                <CustomTextField
                    name="username"
                    control={control}
                />
                <CustomTextField
                    name="password"
                    type={visible ? 'text' : 'password'}
                    control={control}
                    InputProps={{
                        endAdornment: <IconButton
                            children={visible ? <VisibilityOff /> : <Visibility />}
                            onClick={() => setVisible(prev => !prev)}
                        />
                    }}
                />
                <Button type="submit">accept</Button>
                {openError && <Typography
                    children="Uncorrect password or username, try again!"
                />}
            </form>
        </>

    )
}