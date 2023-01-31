import React, {ChangeEvent, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {RequestStatusType} from "../../app/app-reducer";


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    entityStatus?: RequestStatusType
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    // console.log('EditableSpan called');
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    // useEffect(() => {
    //     if (props.value !== title) {
    //         setTitle(props.value);
    //     }
    // }, [props.value])

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const disActivateViewMode = () => {
        setEditMode(false)
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    console.log(props.value)

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} disabled={props.entityStatus === 'loading'}/>
        : <span onDoubleClick={props.entityStatus === 'loading' ? disActivateViewMode : activateEditMode}
        style={{color: props.entityStatus === 'loading' ? 'gray' : 'black'}}>{props.value}</span>
});
