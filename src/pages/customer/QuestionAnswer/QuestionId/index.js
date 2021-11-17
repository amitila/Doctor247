import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import { Grid } from '@material-ui/core';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';

// const token = document.cookie.slice(6);

export default function Index({match}) {
    const [isHaveChange, setIsHaveChange] = useState(true);
    const [questions, setQuestions] = useState('');
    const id = match.params.id;
    
    useEffect(() => {
        if(isHaveChange) {
            const token = getToken();
            const questionList = [];
            APIService.getQuestion(
                token,
                (success, json) => {
                    if (success && json.result) {
                        json.result.map(item => {
                            return questionList.push(item);
                        })
                        questionList?.map(item => {
                            if(item.id === parseInt(id)) setQuestions({
                                id: item.id,
                                updatedAt: item.updatedAt,
                                title: item.title,
                                content: item.content,
                                images: item.images,
                                answers: item.answers,
                                questionLike: item._count.questionLike,
                                liked: item.liked,
                                saved: item.saved
                            })
                        })
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
                                questionList?.map(item => {
                                    if(item.id === parseInt(id)) setQuestions({
                                        id: item.id,
                                        updatedAt: item.updatedAt,
                                        title: item.title,
                                        content: item.content,
                                        images: item.images,
                                        answers: item.answers,
                                        questionLike: item._count.questionLike,
                                        liked: item.liked,
                                        saved: item.saved
                                    })
                                })
                                setIsHaveChange(false);
                                return console.log("Lấy câu hỏi thành công");
                            } else {
                                return console.log("Lỗi server !");
                            }
                        })
                    }
                })
        }
    },[id, isHaveChange])

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

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Câu hỏi về {questions.title}</h1>
                <br />
            </div>
            <div className="row">
                <Grid container spacing={2}>
                    <QuestionList
                        questions={questions}
                        onDelete={onDelete}
                        onSave={onSave}
                        onUpdateLike={onUpdateLike}
                    />
                </Grid>
            </div>
        </div>
    );
}