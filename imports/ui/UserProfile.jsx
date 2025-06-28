import React, { Fragment, useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate, useParams } from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import axios from 'axios';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Divider, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress'; // or import { LinearProgress } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
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
    'None',
    'Female',
    'Male',
    'Nonbinary',
];


const gendersMap = {
    'None': 0,
    'Female': 1,
    'Male': 2,
    'Nonbinary': 3,
    '0' : 'None',
    '1' : 'Female',
    '2' : 'Male',
    '3' : 'Nonbinary',
};

const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

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
    const [newDate, setNewDate] = useState(null);
    const [newGender, setNewGender] = useState("");
    const [newCompany, setNewCompany] = useState("");
    const [fileImage, setFileImage] = useState(null);

    useEffect(() => {
        if (user?.profile) {
            setNewName(user.profile.name || "");
            setNewMail(user.profile.mail || "");
            setNewDate(user.profile.birthdate ? dayjs(user.profile.birthdate) : null);
            setNewGender(gendersMap[user.profile.gender] || "None"); //0 - not defined; 1 - Female; 2 - Male; 3 - Nonbinary
            setNewCompany(user.profile.company || "");
        }
    }, [user?.profile]);

    const navigate = useNavigate();  
    
    const submit = async (e) => {
        e.preventDefault();
        //setError(null); // Clear previous errors

        let imageBase64 = null;
        if (fileImage) {
            imageBase64 = await toBase64(fileImage);
        }

        try {
            await Meteor.callAsync("accounts.updateProfile", {
                name: newName,
                mail: newMail,
                date: newDate ? newDate.format("MM-DD-YYYY") : null,
                gender: gendersMap[newGender],
                company: newCompany,
                image: imageBase64,
            });
            console.log("Profile updated!");//changed from alert...
        } catch (err) {
            console.error("Profile update failed:");
            alert("Error: " + err.reason);
        }
    };

    if (isLoading()) {
        return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Button
            loading
            loadingPosition="end"
            variant="outlined"
            >
                Loading Profile
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
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '16px', mt:2}}
            onSubmit={submit}
            autoComplete="off"
        >
            <Box sx={{display:'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'baseline' , gap:'4px' }}  >
                <Typography sx={{ my: 2, color: 'white', fontSize: 40 }}>
                    Hello, {user.username} 
                </Typography>
                <Typography sx={{ my: 2, color: 'white', fontSize: 50 }}>👋🏾 </Typography>
            </Box>
            <Box sx={{display:'flex', flexWrap: 'wrap', gap:'16px', ml: 2}}  >
                <Typography sx={{ my: 2, color: 'white', display: 'block' }}>
                    Name: {user.profile?.fullName == "" ? "Not informed yet" : user.profile?.fullName }
                </Typography>
                <TextField
                    id="outlined-basic" 
                    label= "Provide your name" 
                    defaultValue={user.profile.fullName}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    sx={{display:'flex', width:'40%'}}
                    //onBlur={handleNameBlur}
                    variant="filled" 
                />
                <Divider />
            </Box>
            
            <Box sx={{display:'flex', flexWrap: 'wrap', gap:'16px', ml: 2}} >
                <Typography sx={{ my: 2, color: 'white', display: 'block' }}>
                    Email: {user.profile?.mail == "" ? "Not informed yet" : user.profile?.mail }
                </Typography>
                <TextField
                    id="outlined-basic" 
                    label= "Provide your email address" 
                    defaultValue={user.profile.mail}
                    value={newMail}
                    onChange={(e) => setNewMail(e.target.value)}
                    sx={{display:'flex', width:'40%'}}
                    //onBlur={handleMailBlur}
                    variant="filled" 
                />
                <Divider />
            </Box>
            
            <Box sx={{display:'flex', flexWrap: 'wrap', gap:'16px', ml: 2}} >
                <Typography sx={{ my: 2, color: 'white', display: 'block' }}>
                    Bithdate: {user.profile?.birthdate == null ? "Not informed yet" : user.profile?.birthdate }
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        defaultValue={user.profile.birthdate}
                        value={newDate} 
                        onChange={(date)=> setNewDate(date)} 
                        //slotProps={ { textField: {onBlur: handleDateBlur} } }
                    />
                </LocalizationProvider>
                <Divider />
            </Box>
            
            <Box sx={{display:'flex', flexWrap: 'wrap', gap:'16px', ml: 2}} >
                <Typography sx={{ my: 2, color: 'white', display: 'block' }}>
                    Gender: {user.profile?.gender == "" ? "Not informed yet" : gendersMap[user.profile?.gender] }
                </Typography>
                <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                    <Select
                        displayEmpty
                        value={newGender}
                        onChange={(e)=>setNewGender(e.target.value)}
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
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
                <Divider />
            </Box>
            
            <Box sx={{display:'flex', gap:'16px', ml: 2}} >
                <Typography sx={{ my: 2, color: 'white' }}>
                    Company: {user.profile?.company == "" ? "Not informed yet" : user.profile?.company }
                </Typography>
                <TextField
                    id="outlined-basic" 
                    label= "Provide your company's name" 
                    defaultValue={user.profile.company}
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    sx={{display:'flex', width:'40%'}}
                    //onBlur={handleCompanyBlur}
                    variant="filled" 
                />
                <Divider />
            </Box>

            <Box sx={{display:'flex', gap:'16px', ml: 2, my: 3}} >
                {user.profile?.photo && (
                    <img src={user.profile.photo} alt="Current profile photo" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                )}
                <Divider />
                <TextField
                    type="file"
                    variant="outlined"
                    margin="normal"
                >
                    <input type="file" accept="image/*" onChange={(e) => setFileImage(e.target.files[0])} />
                </TextField>
                <Button variant="contained" color="info" component="label" startIcon={ <CloudUploadIcon /> } >
                    Upload photo
                </Button>
            </Box>

            <Box sx={{display: 'flex', gap: 2, mb: 2, ml: 2}}>
                <Button type="submit" variant="contained" sx={{ height: '56px' }}>
                    <Typography> Confirm edition </Typography>
                </Button>
                <Button onClick={()=>history.back()} variant="contained" sx={{ height: '56px' }}>
                    <Typography> Cancel editing </Typography>
                </Button>
            </Box>
        </Box>
        </Fragment>
    );
};
/*
                <LinearProgress variant="determinate" value={uploadProgress} />
 */