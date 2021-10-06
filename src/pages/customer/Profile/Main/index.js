import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import ProfileList from './ProfileList';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';
import APIService from '../../../../utils/APIService';

// Lấy guardian từ db về 
const getBirthdayVN = (value) => {
    var date = new Date();
    date.setDate(parseInt(value?.slice(8, 10)));
    date.setMonth(parseInt(value?.slice(5, 7)) - 1);
    date.setFullYear(parseInt(value?.slice(0, 4)));
    return date;
}
const profileList = [];
const token = document.cookie.slice(6);
var flag = [];
APIService.getGuardian(
    token,
    (success, json) => {
        if (success && json.result) {
            json.result.map(item => {
                return profileList.push(item);
            })
            profileList?.map(item => {
                return flag.push({
                    id: item.id,
                    userTowId: item.userTwoId,
                    relationship: item.name,
                    email: 'ami@gmail.com',
                    firstName: item.userTwo.firstName,
                    lastName: item.userTwo.lastName,
                    birthday: item.userTwo.birthday.slice(0, 10),
                    birthdayVN: getBirthdayVN(item.userTwo.birthday),
                    gender: item.userTwo.gender,
                    phoneNumber: item.userTwo.phoneNumber,
                    bhyt: item.userTwo.healthInsuranceCode,
                    address: item.userTwo.address,
                    province: item.userTwo.province.name,
                    provinceId: item.userTwo.province.id,
                    avatar: item.userTwo.avatarURL,
                })
            })
            return console.log("thành công");
        } else {
            return alert("Lỗi server!");
        }
    }

)

export default function Index() {
    const history = useHistory();
    // const flag = (localStorage && localStorage.getItem('profiles')) ? JSON.parse(localStorage.getItem('profiles')) : [];
    const [profiles, setProfiles] = useState(flag);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [taskEditing, setTaskEditing] = useState(null);

    // ***Here is the code for converting "image source" (url) to "Base64".***
    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))

    // ***Here is code for converting "Base64" to javascript "File Object".***
    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const onToggleForm = (event) => {//Add task
        if (isDisplayForm && taskEditing !== null) {
            setIsDisplayForm(true);
            setTaskEditing(null);
        } else {
            setIsDisplayForm(!isDisplayForm);
            setTaskEditing(null);
        }
    }

    const onCloseForm = (event) => {
        setIsDisplayForm(false);
        history.push("/profile");
    }

    const onShowForm = (event) => {
        setIsDisplayForm(true);
    }

    const onSubmit = (data) => {
        if (data.id === '') {
            APIService.postGuardian(
                token,
                {
                    guardianName: data.relationship,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    birthday: data.birthdayVN,
                    avatar: data.avatar,
                    phoneNumber: data.phoneNumber,
                    provinceId: data.provinceId,
                    address: data.address
                },
                (success, json) => {
                    if (success && json.result) {
                        return alert("THÀNH CÔNG !");
                    } else {
                        return alert("Cập nhật thay đổi THẤT BẠI !");
                    }
                })
        } else {
            //Editing
            toDataURL(data.avatar ? data.avatar: "https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png")
            .then(dataUrl => {
                const fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                APIService.putGuardianById(
                    token,
                    data.id,
                    {
                        guardianName: data.relationship,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        gender: data.gender,
                        birthday: getBirthdayVN(data.birthday),
                        avatar: typeof(data.avatar) === "string" ? fileData : data.avatar,
                        phoneNumber: data.phoneNumber,
                        provinceId: data.provinceId,
                        address: data.address
                    },
                    (success, json) => {
                        if (success && json.result) {
                            return alert("Cập nhật THÀNH CÔNG !");
                        } else {
                            return alert("Cập nhật thay đổi THẤT BẠI !");
                        }
                    }
                )
            })
        }
        setProfiles(profiles);
        setTaskEditing(null);
    }

    const findIndex = (id) => {
        let result = -1;
        profiles.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    const onDelete = (id) => {
        const index = findIndex(id);
        if (index !== -1) {
            profiles.splice(index, 1);
            localStorage.setItem('profiles', JSON.stringify(profiles));
        }
        onCloseForm();
    }

    const onUpdate = (id) => {
        const index = findIndex(id);
        const taskEditing = profiles[index];
        setTaskEditing(taskEditing);
        onShowForm();
    }

    var elmTaskForm = isDisplayForm
        ? <ProfileForm
            onSubmit={onSubmit}
            onCloseForm={onCloseForm}
            task={taskEditing}
        /> : '';

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Hồ sơ gia đình</h1>
                <br />
            </div>
            <div className="row">
                <div  >
                    {isDisplayForm ?
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}>
                                {elmTaskForm}
                                {/* {isDisplayForm ? '' :   
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={onToggleForm}
                                    >
                                        <AddIcon />
                                        Thêm hồ sơ
                                    </button>
                                } */}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {/* List*/}
                                <ProfileList
                                    profiles={profiles}
                                    onDelete={onDelete}
                                    onUpdate={onUpdate}
                                />
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2}>
                            {elmTaskForm}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onToggleForm}
                            >
                                <AddIcon />
                                Thêm hồ sơ
                            </button>
                            {/* List*/}
                            <ProfileList
                                profiles={profiles}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        </Grid>
                    }
                </div>
            </div>
        </div>
    );
}

