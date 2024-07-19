import "pepsico-ds/css";
import { TextInput, Button, Dropdown, Radio, Checkbox, Toggle, DataTable } from "pepsico-ds";
import { useState } from "react";
import '../App.css';

function BasicForm() {
    const [userRegistration, setUserRegistration] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
        skills: [],
        remembertheinfo:""

    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    });

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9]{1,10}$/;
        if (!regex.test(username)) {
            return false;
        }
        return true;
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!regex.test(email)) {
            return false;
        }
        return true;
    };

    const validatePassword = (password) => {
        const regex = /^(?!.*[@#].*[@#])[a-zA-Z\d@#]{8,12}$/;

        if (!regex.test(password)) {
            return false;
        }
        return true;
    };
    let textStyle={};
    const handleInput = (e) => {
        const { name, value } = e.target;
        let error = "";

        switch (name) {
            case "username":
                if (validateUsername(value)){
                    error = "";
                    textStyle={};
                }
                else{
                    error = "Username should be max 10 letters or numbers and should not contain any special characters!";
                    textStyle={borderColor:'red',backgroundColor:'grey'};
                }
                break;
            case "email":
                if (validateEmail(value)){
                    error = "";
                    textStyle="";
                }
                else{
                    error = "Email should be a valid gmail address ending with @gmail.com!";
                    textStyle=".field{border-color:red;background-color:grey;}";
                }
                break;
            case "password":
                if (validatePassword(value)){
                    error = "";
                    textStyle="";
                }
                else{
                    error = "Password should be between 8 to 12 characters including alphabets,numericals and only one @ or # special characters!";
                    textStyle=".field{border-color:red;background-color:grey;}";
                }
                break;
            default:
                break;
        }

        setErrors({ ...errors, [name]: error });
        setUserRegistration({ ...userRegistration, [name]: value });
        console.log(errors);
    };

    let setGenderValue = (gender) => {
        console.log(gender)
        if (gender && gender[0].id) {
            setUserRegistration({ ...userRegistration, gender: gender[0].displayText });
        } else {
            setUserRegistration({ ...userRegistration, gender: "" });
        }
    };

    const setAgeValue = (age) => {
        let ageRange = "";
        if (age === 0) {
            ageRange = "21-30";
        } else if (age === 1) {
            ageRange = "31-40";
        }
        setUserRegistration({ ...userRegistration, age: ageRange });
    };

    const setPythonSkillValue = (isSelected) => {
        if (isSelected) {
            setUserRegistration({ ...userRegistration, skills: [...userRegistration.skills, 'python'] });
        } else {
            setUserRegistration({ ...userRegistration, skills: userRegistration.skills.filter(skill => skill !== 'python') });
        }
    };

    const setCSkillValue = (isSelected) => {
        if (isSelected) {
            setUserRegistration({ ...userRegistration, skills: [...userRegistration.skills, 'c'] });
        } else {
            setUserRegistration({ ...userRegistration, skills: userRegistration.skills.filter(skill => skill !== 'c') });
        }
    };

    const setJavaSkillValue = (isSelected) => {
        if (isSelected) {
            setUserRegistration({ ...userRegistration, skills: [...userRegistration.skills, 'java'] });
        } else {
            setUserRegistration({ ...userRegistration, skills: userRegistration.skills.filter(skill => skill !== 'java') });
        }
    };

    const setOtherSkillValue = (isSelected) => {
        if (isSelected) {
            setUserRegistration({ ...userRegistration, skills: [...userRegistration.skills, 'others'] });
        } else {
            setUserRegistration({ ...userRegistration, skills: userRegistration.skills.filter(skill => skill !== 'others') });
        }
    };
    const setInfoValue = (isSelected) => {
        if (isSelected) {
            setUserRegistration({ ...userRegistration, rememberInfo: 'true' });
        } else {
            setUserRegistration({ ...userRegistration, rememberInfo: 'false' });
        }
    };
    const setSearchValue = ()=>{
        console.log("Search button is clicked");
    }

    // const handleInput = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setUserRegistration({ ...userRegistration, [name]: value });
    // };

    const genderList = [
        { displayText: 'select a gender', id: 0, isBadge: false },
        { displayText: 'Female', id: 1, isBadge: false },
        { displayText: 'Male', id: 2, isBadge: false }
    ];

    const ageList = [
        'Age should be between 21-30',
        'Age should be between 31-40'
    ];

    const [records, setRecords] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateUsername(userRegistration.username)&&validateEmail(userRegistration.email)&&validatePassword(userRegistration.password)&& 
            userRegistration.gender && userRegistration.age && userRegistration.skills.length > 0) {
            const newRecord = { ...userRegistration, id: new Date().getTime().toString() };
            setRecords([...records, newRecord]);
            setUserRegistration({ username: "", email: "", password: "", gender: "", age: "", skills: [] ,remembertheinfo: "false"});

        } else {
            alert("Please fill all the fields and select at least one skill");
        }
    };


    return (
        <> 
            <div className='form'>
            <h2>Sign In Form</h2>
            <form backgroundColor="primary" action="" onSubmit={handleSubmit}>
                <div>
                    <TextInput error={errors["username"]}  style={textStyle} label="Username" autoComplete="off" onChange={handleInput} name="username" value={userRegistration.username} placeholderText="Enter Your Name Here" required />
                    <TextInput error={errors["email"]}  style={textStyle} label="mail" autoComplete="off" onChange={handleInput} name="email" value={userRegistration.email} placeholderText="Enter Your Email" required />
                    <TextInput error={errors["password"]}  style={textStyle} label="Password" type="password" autoComplete="off" onChange={handleInput} name="password" value={userRegistration.password} placeholderText="Password" required />
                    <Dropdown
                        childList={genderList}
                        isRequired
                        label="Gender"
                        selection="single"
                        selectedValue=""
                        placeholder="select a gender"
                        setSelectedValue={function Qa(){}}
                        size="medium"
                        required
                    />
                    <Radio
                        items={ageList}
                        label="Age"
                        onUpdate={setAgeValue}
                        reference="radio button"
                        size="small"
                        required
                    />
                    <Checkbox
                        helperText="Select skills"
                        onUpdate={setPythonSkillValue}
                        text="Python"
                        required
                    />
                    <Checkbox
                        onUpdate={setCSkillValue}
                        text="c"
                        required
                    />
                    <Checkbox
                        onUpdate={setJavaSkillValue}
                        text="Java"
                        required
                    />
                    <Checkbox
                        onUpdate={setOtherSkillValue}
                        text="others"
                        required
                    />
                    <Toggle
                        label="Remember the info"
                        //onUpdate={setInfoValue}
                        onClick={setInfoValue}
                        size="medium"
                        name="remembertheinfo"
                        value={userRegistration.remembertheinfo}
                    />
                    <Button
                        type="submit"
                        iconLeadingVariant="outlined"
                        iconTrailingVariant="outlined"
                        size="large"
                        text="Submit"
                        variant="primary"
                        className="button"
                        required
                    />
                </div>
            </form>
            </div>
        </>
    );
}

export default BasicForm;
