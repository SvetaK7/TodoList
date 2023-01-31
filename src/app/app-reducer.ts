export type SetStatusType = ReturnType<typeof setStatus>;
export type GetErrorType = ReturnType<typeof getError>;
export type AppActionsType = SetStatusType | GetErrorType;

export type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}
type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type){
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/GET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const getError = (error: null | string) => ({type: 'APP/GET-ERROR', error} as const)

