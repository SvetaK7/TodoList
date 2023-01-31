import {getError, GetErrorType, setStatus, SetStatusType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<GetErrorType | SetStatusType>, error: string) => {
    dispatch(getError(error))
    dispatch(setStatus('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<GetErrorType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(getError(data.messages[0]))
    } else {
        dispatch(getError('some error occurred'))
    }
}