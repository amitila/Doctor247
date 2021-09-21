import React from 'react';
import './../../doctor/test/Profile.css';
import Calendar from './../../doctor/test/Calendar';
import CollapsibleTable from './../test/CollapsibleTable';
import { Grid } from '@material-ui/core';
import { Modal, Button, Space } from 'antd';

const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();

const config = {
    title: 'Use Hook!',
    content: (
        <React.Fragment>
            <ReachableContext.Consumer>{name => `Reachable: ${name}!`}</ReachableContext.Consumer>
            <br />
            <UnreachableContext.Consumer>{name => `Unreachable: ${name}!`}</UnreachableContext.Consumer>
        </React.Fragment>
    ),
};

function WorkPlan(props) {
    const [modal, contextHolder] = Modal.useModal();

    return (
        <React.Fragment>
            <div>
                <Grid container spacing={2}>
                    <Grid xs={8} md={8}>
                        <h3>Danh sách bệnh án</h3>
                        <div>
                            <Button
                                onClick={() => {
                                    modal.confirm(config);
                                }}
                            >
                                Confirm
                            </Button>
                            {contextHolder}
                            <UnreachableContext.Provider value="Bamboo" />
                        </div>
                        <CollapsibleTable/>
                    </Grid>
                    <Grid xs={4} md={4}>
                        <Calendar/>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default WorkPlan;