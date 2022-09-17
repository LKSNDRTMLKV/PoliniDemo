import { Button, Modal, Box, TextField, Typography, Divider, InputAdornment, Select, FormControl, InputLabel, MenuItem, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { useContext, useState } from "react";
import Text from "./Text";


export const MyButton = ({
    text,
    variant,
    color,
    size,
    link,
    onClick,
    sx,
    section,
    element,
    disabled
}) => {

    return (
        <Button
            variant={variant}
            color={color ? color : "toggledPrimarySecondary"}
            size={size ? size : 'large'}
            onClick={onClick}
            sx={sx ? sx : { p: 1 }}
            disabled={disabled ? true : false}
        >
            {text ? text : <Text section={section} element={element} />}
        </Button>
    )
}

export const MyDivider = ({ sx, orientation }) => {
    return (
        <Divider
            orientation={orientation ? orientation : "horizontal"}
            sx={sx ? sx : { my: 2, width: "100%" }}
        />
    )
}

export const MyModal = ({ open }) => {
    const [openModal, setOpenModal] = useState(false);
    const toggleModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <Modal
            open={openModal}
            onClose={toggleModal}
        >
            <Box>
                It works
            </Box>
        </Modal>
    )
}

export const MyTextField = (props) => {


    const classes = {
        helperText: {
            position: 'absolute',
            bottom: -20
        }
    }

    let hasError = false;
    let message = "";

    let errorCollention = props.message || "";
    if (errorCollention !== null && errorCollention.length > 0) {
        let currentOption = errorCollention.find(x => x.id === props.id);
        if (currentOption !== null && currentOption !== undefined) {
            hasError = true;
            message = currentOption.message
        }
    }




    return (
        <TextField
            variant="outlined"
            fullWidth={!props.initialWidth ? true : false}
            id={props.id}
            placeholder={props.placeHolder}
            inputMode={props.inputMode}
            autoFocus={props.autoFocus}
            autoComplete={props.autoComplete}
            label={(props.label ? props.label : <Text section={props.section} element={props.element} />)}
            name={props.name}
            onChange={props.onChange}
            value={props.value || ""}
            error={hasError}
            required={props.required ? true : false}
            sx={props.sx ? props.sx : { my: 2, }}
            helperText={message || ""}
            multiline={props.multiline ? true : false}
            rows={props.multiline ? props.multiline : 1}
            contentEditable={props.onEdit}
            // color={props.color ? props.color : "toggledSuccess"}
            // defaultValue=""
            type={props.type || "text"}
            FormHelperTextProps={{
                className: classes.helperText
            }}
            // inputProps={props.inputProps}
           
            InputProps={props.inputProps ? props.inputProps :
                {
                    pattern: props.pattern,
                    inputProps: {
                        maxLength: props.maxLength,

                    },
                    startAdornment: (
                        <InputAdornment position='start'>
                            {props.icon}
                        </InputAdornment>
                    ),
                }
            }


        />
    );
};

export const MyTypography = (props) => (
    <Typography
        variant={props.variant}
        sx={props.sx ? props.sx : { my: 0.5 }}
    >
        {props.text ? props.text : <Text section={props.section} element={props.element} />}
    </Typography>
);

export const MySelect = (props) => {
    return (
        <FormControl fullWidth={props.fullWidth} sx={{}}>
            <InputLabel
                required={props.required}
                id={props.labelId}
                sx={props.labelsx ? props.labelsx : { mt: 2 }}>
                {props.label}
            </InputLabel>
            <Select
                variant="outlined"
                id={props.id}
                required={props.required}
                multiple={props.multiple}
                name={props.name}
                labelId={props.labelId}
                value={props.value}
            
                onChange={props.onChange}
                label={props.label}
                renderValue={props.renderValue && (selected => selected.join(', '))}
                sx={props.sx ? props.sx : { my: 2 }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight:"60vh"
                        }
                    }
                }}
            startAdornment={
                <InputAdornment position="start">
                    {props.icon}
                </InputAdornment>
            }
            >
            {props.menuItems?.map((item, idx) => (
                props.multiple ?
                    <MenuItem key={idx} value={item}>
                        <Checkbox onClick={props.onMenuItemsClick} checked={props.value.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                    </MenuItem>
                    :
                    <MenuItem
                        key={idx}
                        value={item}
                    >
                        <ListItemText secondary={item} />
                    </MenuItem>

            )
            )}

        </Select>
        </FormControl >
    )
}

