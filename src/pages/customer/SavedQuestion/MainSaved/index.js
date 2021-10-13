import React, { useState } from 'react';
import QuestionList from './QuestionList';
import QuestionControl from './QuestionControl';
import { Grid } from '@material-ui/core';
import APIService from '../../../../utils/APIService';

const token = document.cookie.slice(6);
var flag = [];
APIService.getSavedQuestion(
    token,
    (success, json) => {
        if (success && json.result) {
            json.result.map(item => {
                return flag.push({
                    id: item.id,
                    updatedAt: item.updatedAt,
                    title: item.question.title,
                    content: item.question.content,
                    images: item.question.images,
                    // answers: item.answers,
                    questionLike: item.question._count.questionLike,
                    liked: item.liked,
                    saved: item.saved,
                })
            })
            return console.log("Lấy câu hỏi đã lưu thành công");
        } else {
            return console.log("Lỗi server !");
        }
    }
)

export default function Index() {
    // const flag = (localStorage && localStorage.getItem('questions')) ? JSON.parse(localStorage.getItem('questions')) : [];
    const [questions, setQuestions] = useState(flag);
    const [sort, setSort] = useState({ by: 'name', value: 1 });

    const onUnSave = (id) => {
        console.log(id);
        APIService.putQuestionUnSaveById(
            token,
            id,
            (success, json) => {
                if (success && json.result) {
                    return alert("GỠ THÀNH CÔNG !");
                } else {
                    return alert("Gỡ thất bại !");
                }
            }
        )
    }

    const onUpdateLike = (mark, id) => {
        if(mark === false) {
            APIService.putQuestionLikeById(
                token,
                id,
                (success, json) => {
                    if (success && json.result) {
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
        //setKeyword(keyword);
        console.log(flag);
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
        } else {
            // const typeStatus = flag.sort((a, b) => {
            //     if(a.status > b.status) return -sortValue;
            //     else if(a.status < b.status) return sortValue;
            //     else return 0;
            // });
            // setQuestions(typeStatus);
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