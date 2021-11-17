import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import QuestionControl from './QuestionControl';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';
import { Link } from 'react-router-dom';

// const token = document.cookie.slice(6);

export default function Index(props) {
    const history = useHistory();
    // const flag = (localStorage && localStorage.getItem('questions')) ? JSON.parse(localStorage.getItem('questions')) : [];
    const [isHaveChange, setIsHaveChange] = useState(true);
    const [specialized, setSpecialized] = useState([]);
    const [flag, setFlag] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [taskEditing, setTaskEditing] = useState(null);
    //const [filter, setFilter] = useState({name: '', status: -1});
    //const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState({ by: 'name', value: 1 });

    useEffect(() => {
        if (isHaveChange) {
            getQuestion()
            getSpecialized()
        }
    }, [isHaveChange])

    const getQuestion = () => {
        const token = getToken();
        const questionList = [];
        APIService.getQuestion(
            token,
            (success, json) => {
                if (success && json.result) {
                    json.result.map(item => {
                        return questionList.push(item);
                    })
                    setQuestions(questionList?.map(item => {
                        return {
                            id: item.id,
                            updatedAt: item.updatedAt,
                            title: item.title,
                            content: item.content,
                            images: item.images,
                            answers: item.answers,
                            questionLike: item._count.questionLike,
                            liked: item.liked,
                            saved: item.saved
                        }
                    }))
                    setFlag(questionList?.map(item => {
                        return {
                            id: item.id,
                            updatedAt: item.updatedAt,
                            title: item.title,
                            content: item.content,
                            images: item.images,
                            answers: item.answers,
                            questionLike: item._count.questionLike,
                            liked: item.liked,
                            saved: item.saved
                        }
                    }))
                    setIsHaveChange(false);
                    return console.log("Lấy câu hỏi thành công");
                } else {
                    APIService.getPublicQuestion(
                        {},
                        (success, json) => {
                        if (success && json.result) {
                            json.result.map(item => {
                                return questionList.push(item);
                            })
                            setQuestions(questionList?.map(item => {
                                return {
                                    id: item.id,
                                    updatedAt: item.updatedAt,
                                    title: item.title,
                                    content: item.content,
                                    images: item.images,
                                    answers: item.answers,
                                    questionLike: item._count.questionLike,
                                    liked: item.liked,
                                    saved: item.saved
                                }
                            }))
                            setFlag(questionList?.map(item => {
                                return {
                                    id: item.id,
                                    updatedAt: item.updatedAt,
                                    title: item.title,
                                    content: item.content,
                                    images: item.images,
                                    answers: item.answers,
                                    questionLike: item._count.questionLike,
                                    liked: item.liked,
                                    saved: item.saved
                                }
                            }))
                            setIsHaveChange(false);
                            return console.log("Lấy câu hỏi thành công");
                        } else {
                            return console.log("Lỗi server !");
                        }
                    })
                }
            })
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
        history.push("/question");
    }

    const onShowForm = (event) => {
        setIsDisplayForm(true);
    }

    const onSubmit = (data) => {
        const token = getToken();
        if (data.id === '') {
            APIService.postQuestion(
                token,
                {
                    title: data.title,
                    content: data.content,
                    images: data.images
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
            // const index = findIndex(data.id);
            // questions[index] = data;
            const deleteImgs =[];
            data.imagesView?.map(item => {
                deleteImgs.push(item);
                return 0;
            })
            APIService.putQuestionById(
                token,
                data.id,
                {
                    title: data.title,
                    content: data.content,
                    images: data.images,
                    deleteImgs: deleteImgs
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
        }
        setQuestions(questions);
        setTaskEditing(null);
        // localStorage.setItem('questions', JSON.stringify(questions));
    }

    const onUpdateStatus = (id) => {
        const index = findIndex(id);
        if (index !== -1) {
            questions[index].status = !questions[index].status;
            setQuestions(questions);
            localStorage.setItem('questions', JSON.stringify(questions));
        }
    }

    const findIndex = (id) => {
        let result = -1;
        questions.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    const onDelete = (id) => {
        const token = getToken();
        APIService.deleteQuestionById(
            token,
            id,
            (success, json) => {
                if (success && json.result) {
                    setIsHaveChange(true);
                    return alert("XÓA THÀNH CÔNG !");
                } else {
                    return alert("Xóa bài thất bại !");
                }
            })
        onCloseForm();
    }

    const onUpdate = (id) => {
        const index = findIndex(id);
        const taskEditing = questions[index];
        setTaskEditing(taskEditing);
        console.log(taskEditing);
        onShowForm();
    }

    const onSave = (id) => {
        const token = getToken();
        APIService.putQuestionSaveById(
            token,
            id,
            (success, json) => {
                if (success && json.result) {
                    setIsHaveChange(true);
                    return alert("LƯU THÀNH CÔNG !", id);
                } else {
                    return alert("Lưu bài thất bại !");
                }
            })
        onCloseForm();
    }

    const onUpdateLike = (mark, id) => {
        const token = getToken();
        if(mark === false) {
            APIService.putQuestionLikeById(
                token,
                id,
                (success, json) => {
                    if (success && json.result) {
                        setIsHaveChange(true);
                        return console.log("Like THÀNH CÔNG !");
                    } else {
                        return console.log("Like THẤT BẠI !");
                    }
                }
            )
        }
        else if(mark) {
            APIService.putQuestionUnLikeById(
                token,
                id,
                (success, json) => {
                    if (success && json.result) {
                        setIsHaveChange(true);
                        return console.log("UnLike THÀNH CÔNG !");
                    } else {
                        return console.log("UnLike THẤT BẠI !");
                    }
                }
            )
        }
        else{
            console.log("Lỗi like");
        }
    }

    const getSpecialized = () => {
        APIService.getSpecialized(
            {},
            (success, json) => {
                if (success && json.result) { 
                    setSpecialized(json.result.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                        }
                    }))
                    return console.log("Lấy chuyên khoa thành công");
                } else {
                    return console.log("lỗi server");
                }
            }
        )
    }
    
    const onFilter = (filterTitle, filterContent, filterSpecialist) => {

        let temp = flag.filter((task) => {
            return task.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.content.toLowerCase().indexOf(filterContent.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.title.toLowerCase().indexOf(filterSpecialist.toLowerCase()) !== -1 || task.content.toLowerCase().indexOf(filterSpecialist.toLowerCase()) !== -1;
        });

        setQuestions(temp);
    }

    const onSearch = (keyword) => {

        let temp = flag.filter((task) => {
            return task.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || task.content.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        setQuestions(temp);
    }

    const onSort = (sortBy, sortValue) => {
        setSort({
            by: sortBy,
            value: sortValue
        });

        if (sortBy === 'title') {
            const typeName = flag.sort((a, b) => {
                if (a.title < b.title) return sortValue;
                else if (a.title > b.title) return - sortValue;
                else return 0;
            });
            setQuestions(typeName);
        } else if (sortBy === 'questionLike') {
            const typeName = flag.sort((a, b) => {
                if (a.questionLike > b.questionLike) return sortValue;
                else if (a.questionLike < b.questionLike) return - sortValue;
                else return 0;
            });
            setQuestions(typeName);
        }
    }

    var elmTaskForm = isDisplayForm
        ? <QuestionForm
            onSubmit={onSubmit}
            onCloseForm={onCloseForm}
            task={taskEditing}
        /> : '';

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Bệnh nhân hỏi - Bác sĩ trả lời</h1>
                {
                    flag.map(item => {
                        return  <p key={item.id}>
                            <Link to={`/question/${item.id}`}></Link>
                        </p>
                    })
                }
                <br />
            </div>
            <div className="row">
                <div  >
                    {isDisplayForm ?
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                {elmTaskForm}
                            </Grid>
                            <Grid item xs={12} sm={8}>

                                {/* Search-Sort */}
                                <QuestionControl
                                    onSearch={onSearch}
                                    onSort={onSort}
                                    sortBy={sort.by}
                                    sortValue={sort.value}
                                />

                                 {/* List*/}
                                <QuestionList
                                    questions={questions}
                                    onUpdateStatus={onUpdateStatus}
                                    onDelete={onDelete}
                                    onUpdate={onUpdate}
                                    onSave={onSave}
                                    onUpdateLike={onUpdateLike}
                                    onFilter={onFilter}
                                    specialized={specialized}
                                />

                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2}>
                            {elmTaskForm}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3} >
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={onToggleForm}
                                    >
                                        <AddIcon />
                                        Thêm vấn đề bạn muốn hỏi
                                    </button>
                                </Grid>
                                <Grid item xs={12} sm={9} >
                                    {/* Search-Sort */}
                                    <QuestionControl
                                        onSearch={onSearch}
                                        onSort={onSort}
                                        sortBy={sort.by}
                                        sortValue={sort.value}
                                    />
                                </Grid>
                            </Grid>
                            {/* List*/}
                            <QuestionList
                                questions={questions}
                                onUpdateStatus={onUpdateStatus}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                                onSave={onSave}
                                onUpdateLike={onUpdateLike}
                                onFilter={onFilter}
                                specialized={specialized}
                            />
                        </Grid>
                    }
                </div>
            </div>
        </div>
    );
}