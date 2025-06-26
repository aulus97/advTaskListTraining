import React, { Fragment, useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate, useParams } from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Divider, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ResponsiveTopBar } from "./TopBar";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 12;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const genderTypes = [
    'Female',
    'Male',
    'Nonbinary',
];


const gendersMap = {
    'None': 0,
    'Female': 1,
    'Male': 2,
    'Nonbinary': 3,
};

export const UserProfile = () => {
    const { userId } = useParams();
    const isLoading = useSubscribe("userProfile", userId);

    const user = useTracker(() => {
        if (!userId) return null;
        return Meteor.users.findOne(userId);
    }, [userId]);
    /*const user = useTracker(async() => {
        if (!userId) return null;
        return await Meteor.users.findOneAsync(userId);
    }, [userId]);*/

    const [newName, setNewName] = useState("");
    const [newMail, setNewMail] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newCompany, setNewCompany] = useState("");

    useEffect(() => {
        if (user?.profile) {
            setNewName(user.profile.name || "");
            setNewMail(user.profile.mail || "");
            setNewDate(user.profile.date || "");
            setNewGender(user.profile.gender || ""); //0 - not defined; 1 - Female; 2 - Male; 3 - Nonbinary
            setNewCompany(user.profile.company || "");
        }
    }, [user?.profile]);

    const navigate = useNavigate();  

    const submit = async (e) => {
        e.preventDefault();
        //setError(null); // Clear previous errors

        if(newName.trim() === "" || newMail.trim() === "" || newDate.trim() === "" || newCompany.trim() === "" ) {
            console.log("Title and text cannot be empty.");
            return;
        }

        try {
            await Meteor.callAsync("accounts.updateProfile", {
                name:newName,
                mail:newMail,
                date:newDate,
                gender:gendersMap[newGender],
                company:newCompany
            });
            console.log("Profile updated!");//changed from alert...
        } catch (err) {
            console.error("Profile update failed:", err);
            alert("Error: " + err.reason);
        }
    };

    const handleNameBlur = () => {
        if(newName.trim()==="" && user.profile)
        setNewName(user.profile.fullName || '');
    };
    const handleMailBlur = () => {
        if(newMail.trim()==="" && user.profile)
        setNewMail(user.profile.mail || '');
    };
    const handleDateBlur = () => {
        if(newDate.trim()==="" && user.profile)
        setNewDate(user.profile.birthdate || '');
    };
    const handleCompanyBlur = () => {
        if(newCompany.trim()==="" && user.profile)
        setNewCompany(user.profile.company || '');
    };
    
    //const theme = useTheme();

    if (isLoading()) {
        return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Button
            loading
            loadingPosition="end"
            variant="outlined"
            >
                Loading User Profile
            </Button>
        </Box>
        );
    }

    if (!userId) {
        return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h5" color="error">User profile not found or you are not authorized to view it.</Typography>
            <Button onClick={()=>history.back()} sx={{ mt: 2 }} variant="contained">Go Back to Tasks</Button>
        </Box>
        );
    }

    return (
        <Fragment>
        <ResponsiveTopBar />
        <Box
            component="form"
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', width:'70%'}}
            onSubmit={submit}
            autoComplete="off"
        >
            <Divider />
            <TextField
                required
                fullWidth
                id="outlined-basic" 
                label={newName} 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleNameBlur}
                variant="filled" 
            />

            <TextField
                required
                fullWidth
                id="outlined-basic" 
                label={newMail} 
                value={newMail}
                onChange={(e) => setNewMail(e.target.value)}
                onBlur={handleMailBlur}
                variant="filled" 
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    value={newDate ? dayjs(newDate) : null} 
                    onChange={(newDate)=> setNewDate(newDate?.format("YYYY-MM-DD") || "")} 
                    slotProps={ { textField: {onBlur: handleDateBlur} } }
                />
            </LocalizationProvider>

            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                    displayEmpty
                    value={newGender}
                    onChange={(e)=>setNewGender(e.target.value)}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>None</em>;
                        }
                        return selected;
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={newGender} >
                        None
                    </MenuItem>
                    {genderTypes.map((gender) => (
                        <MenuItem
                            key={gender}
                            value={gender}
                        >
                            {gender}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                required
                fullWidth
                id="outlined-basic" 
                label={newCompany} 
                value={newCompany}
                onChange={(e) => setNewGender(e.target.value)}
                onBlur={handleCompanyBlur}
                variant="filled" 
            />
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 2,
                }}
            >
            
            </Box>
            <Button type="submit" variant="contained" sx={{ height: '56px' }}>
                <Typography> Confirm edition </Typography>
            </Button>
            <Button onClick={()=>history.back()} variant="contained" sx={{ height: '56px' }}>
                <Typography> Cancel editing </Typography>
            </Button>
        </Box>
        </Fragment>
    );
};
