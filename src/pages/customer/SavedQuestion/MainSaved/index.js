import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionControl from './QuestionControl';
import { Grid } from '@material-ui/core';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';

// const token = document.cookie.slice(6);

export default function Index(props) {
    // const flag = (localStorage && localStorage.getItem('questions')) ? JSON.parse(localStorage.getItem('questions')) : [];
    const [questions, setQuestions] = useState([]);
    const [flag, setFlag] = useState([]);
    const [isHaveChange, setIsHaveChange] = useState(true);
    const [sort, setSort] = useState({ by: 'name', value: 1 });

    useEffect(() => {
        if (isHaveChange) {
            getQuestion()
        }
    }, [isHaveChange])

    const getQuestion = () => {
        const token = getToken();
        APIService.getSavedQuestion(
            token,
            (success, json) => {
                if (success && json.result) {
                    setQuestions(json.result.map(item => {
                        return {
                            id: item.question.id,
                            updatedAt: item.updatedAt,
                            title: item.question.title,
                            content: item.question.content,
                            images: item.question.images,
                            // answers: item.answers,
                            questionLike: item.question._count.questionLike,
                            liked: item.liked,
                            saved: item.saved,
                        }
                    }))
                    setFlag(json.result.map(item => {
                        return {
                            id: item.question.id,
                            updatedAt: item.updatedAt,
                            title: item.question.title,
                            content: item.question.content,
                            images: item.question.images,
                            // answers: item.answers,
                            questionLike: item.question._count.questionLike,
                            liked: item.liked,
                            saved: item.saved,
                        }
                    }))
                    setIsHaveChange(false);
                    return console.log("Lấy câu hỏi đã lưu thành công");
                } else {
                    return console.log("Lỗi server !");
                }
            }
        )
    }
    const onUnSave = (id) => {
        const token = getToken();
        APIService.putQuestionUnSaveById(
            token,
            id,
            (success, json) => {
                if (success && json.result) {
                    setIsHaveChange(true);
                    return alert("GỠ THÀNH CÔNG !");
                } else {
                    return alert("Gỡ thất bại !");
                }
            }
        )
    }

    const onUpdateLike = (mark, id) => {
        const token = getToken();
        if (mark === false) {
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
        else if (mark) {
            const token = getToken();
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
        else {
            console.log("Lỗi like");
        }
    }

    const onFilter = (filterTitle, filterContent) => {
        // setFilter({
        //     name : filterName,
        //     status : filterStatus
        // });

        let temp = flag.filter((task) => {
            return task.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.content.toLowerCase().indexOf(filterContent.toLowerCase()) !== -1;
        });

        // temp = temp.filter((task) => {
        //     if(filterStatus === '-1' || filterStatus === -1){
        //         return task;
        //     }else{
        //         return task.status === (parseInt(filterStatus, 10) === 1 ? true : false);
        //     }
        // });
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

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Bài viết đã lưu</h1>
                <br />
            </div>
            <div className="row">
                <div >
                    <Grid container spacing={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} >
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
                            onUnSave={onUnSave}
                            onUpdateLike={onUpdateLike}
                            onFilter={onFilter}
                        />
                    </Grid>
                </div>
            </div>
        </div>
    );
}