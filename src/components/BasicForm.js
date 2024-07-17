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

    const setGenderValue = (gender) => {
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

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value });
    };

    const genderList = [
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
        if (userRegistration.username && userRegistration.email && userRegistration.password &&
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
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <TextInput label="Username" autoComplete="off" onChange={handleInput} name="username" value={userRegistration.username} placeholderText="Enter Your Name Here" required />
                    <TextInput label="mail" autoComplete="off" onChange={handleInput} name="email" value={userRegistration.email} placeholderText="Enter Your Email" required />
                    <TextInput label="Password" type="password" autoComplete="off" onChange={handleInput} name="password" value={userRegistration.password} placeholderText="Password" required />
                   
                    <Dropdown
                        childList={genderList}
                        isRequired
                        label="Gender"
                        selection="single"
                        setSelectedValue={setGenderValue}
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

            <DataTable
                columns={[
                    { columnKey: 'username', header: 'UserName' },
                    { columnKey: 'email', header: 'Email' },
                    { columnKey: 'password', header: 'Password' },
                    { columnKey: 'gender', header: 'Gender' },
                    { columnKey: 'age', header: 'Age' },
                    { columnKey: 'skills', header: 'Skills' },
                    { columnKey: 'remebertheinfo', header: 'RememberTheInfo' }
                ]}
                data={records.map(record => ({
                    username: record.username,
                    email: record.email,
                    password: record.password,
                    gender: record.gender,
                    age: record.age,
                    skills: record.skills,
                    remembertheinfo: record.rememberInfo ? 'True' : 'False'
                }))}
                headerAction={{
                    iconTrailing: 'arrow_forward',
                    onClick: () => { },
                    size: 'small',
                    text: 'Button',
                    variant: 'primary'
                }}
                pageIndex={0}
                pageSize={10}
                renderSubComponent={setSearchValue}
                selection="single"
                size="large"
            />
        </>
    );
}

export default BasicForm;
