import React from 'react';

function Notification(props) {
    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <div className="col-md-12 mt-1">
                        {/* BaseInfo */}
                        <div className="card mb-3 content">

                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h1 m-3 pt-3>Không có thông báo nào!</h1>
                                    </div>
                                    <div className="col-md-3">
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Notification;