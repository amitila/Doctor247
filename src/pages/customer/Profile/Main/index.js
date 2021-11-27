import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';
import ProfileList from './ProfileList';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';

const getBirthdayVN = (value) => {
    var date = new Date();
    date.setDate(parseInt(value?.slice(8, 10)));
    date.setMonth(parseInt(value?.slice(5, 7)) - 1);
    date.setFullYear(parseInt(value?.slice(0, 4)));
    return date;
}
// const token = document.cookie.slice(6);

export default function Index(props) {
    const history = useHistory();
    // const flag = (localStorage && localStorage.getItem('profiles')) ? JSON.parse(localStorage.getItem('profiles')) : [];
    const [isHaveChange, setIsHaveChange] = useState(true);
    const [profiles, setProfiles] = useState([]);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [taskEditing, setTaskEditing] = useState(null);

    useEffect(() => {
        if (isHaveChange) {
            getGuardian()
        }
    }, [isHaveChange])

    const getGuardian = () => {
        const token = getToken();
        const profileList = [];
        APIService.getGuardian(
            token,
            (success, json) => {
                if (success && json.result) {
                    json.result.map(item => {
                        return profileList.push(item);
                    })
                    setProfiles(profileList?.map(item => {
                        return {
                            id: item.id,
                            userTwoId: item.userTwoId,
                            relationship: item.name,
                            email: '',
                            firstName: item.userTwo.firstName,
                            lastName: item.userTwo.lastName,
                            birthday: item.userTwo.birthday ? item.userTwo.birthday.slice(0, 10) : '',
                            birthdayVN: item.userTwo.birthday ? getBirthdayVN(item.userTwo.birthday) : '',
                            gender: item.userTwo.gender,
                            phoneNumber: item.userTwo.contactPhoneNumber,
                            bhyt: item.userTwo.healthInsuranceCode,
                            address: item.userTwo.address,
                            province: item.userTwo.province.name,
                            provinceId: item.userTwo.province.id,
                            avatar: item.userTwo.avatarURL,
                        }
                    }))
                    setIsHaveChange(false);
                    return console.log("thành công");
                } else {
                    return console.log(json.error);
                }
            }
        )
    }

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
        const token = getToken();
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
                        setIsHaveChange(true);
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
                // console.log(dataUrl)
                // console.log('fileData')
                // console.log(fileData)
                // console.log(typeof(fileData))
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
                            setIsHaveChange(true);
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

    const onDelete = (id, type) => {
        const token = getToken();
        APIService.getCodeVerifyGuardian(
            token,
            {
                id: id,
                type: type
            },
            (success, json) => {
                if (success && json.result) {
                    setIsHaveChange(true);
                    return alert(" Vui lòng kiểm tra mail/tin nhắn !");
                } else {
                    return alert(json.error);
                }
            }
        )
        onCloseForm();
    }

    const handleConfirmDelete = (id, code) => {
        const token = getToken();
        APIService.deleteGuardian(
            token,
            id,
            code,
            (success, json) => {
                if (success && json.result) {
                    setIsHaveChange(true);
                    return alert(" Xóa THÀNH CÔNG !");
                } else {
                    return alert(json.error);
                }
            }
        )
    }

    const verifyGuardianUser = (data) => {
        const token = getToken();
        // Send code verify
        APIService.verifyGuardianUser(
            token,
            {
                password: data.password,
                guardiantId: data.guardiantId,
                type: data.type,
                email: data.email,
                phoneNumber: data.phoneNumber
            },
            (success, json) => {
                if (success && json.result) {
                    return alert('Đã gửi code')
                } else {
                    return alert("Không gửi được!");
                }
            })
    }

    const handleConfirmGuardianUser = (data) => {
        const token = getToken();
        // Confirm create guardian user
        APIService.postGuardianUser(
            token,
            {
                password: data.password,
                guardiantId: data.guardiantId,
                type: data.type,
                email: data.email,
                phoneNumber: data.phoneNumber,
                code: data.code,
                guardiantPassword: data.guardiantPassword
            },
            (success, json) => {
                if (success && json.result) {
                    setIsHaveChange(true);
                    return alert('Xác nhận tạo user mới')
                } else {
                    return alert("Chuyển đổi THẤT BẠI!");
                }
            })
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
                                    handleConfirmDelete={handleConfirmDelete}
                                    verifyGuardianUser={verifyGuardianUser}
                                    handleConfirmGuardianUser={handleConfirmGuardianUser}
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
                                handleConfirmDelete={handleConfirmDelete}
                                verifyGuardianUser={verifyGuardianUser}
                                handleConfirmGuardianUser={handleConfirmGuardianUser}
                                onUpdate={onUpdate}
                            />
                        </Grid>
                    }
                </div>
                {
                    profiles.length ? null : 
                    <div className="text-center">          
                        <img src="empty.jpg" alt="Chưa có hoạt động" width="400" height="450"></img>  
                    </div>
                }
            </div>
        </div>
    );
}

