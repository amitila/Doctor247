import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 5px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    title: {
        fontWeight: 'bold',
    },
    info: {
        textAlign: "center",
    },
    link: {
        textDecoration: 'none',
        fontSize: '15px',
        color: theme.palette.info.dark,
        fontWeight: 'bold',
    },
    chat: {
        backgroundColor: "green",
    },
    book: {
        backgroundColor: "blue",
    },
    rate: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
    image: {
        width: "30%", 
        heigh: "30%"
    }
}));

export default function DoctorInfo(props) {
    const classes = useStyles();

    const { task } = props;

    return (
        <CardContent>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={3} className={classes.info}>
                        <Grid item >
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                            >
                                <Avatar className={classes.large} alt="Remy Sharp" src={task.person} />
                            </StyledBadge>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="h2">
                                Sở y tế thành phố HCM
                            </Typography>
                            <Typography paragraph>
                                <Button color="inherit">
                                    <Link className={classes.link} to="#">Thông tin thêm</Link>
                                </Button>
                            </Typography>
                            <Typography paragraph>
                                <Button color="inherit">
                                    <Link className={classes.link} to="#">Chia sẻ</Link>
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={9}>  
                        <Typography paragraph>
                            {`
                                Sở Y tế TP.HCM đã có đề xuất về điều kiện cấp “thẻ xanh COVID” nhằm áp dụng trong giai đoạn tới.

                                Thông tin từ Sở Y tế TP.HCM cho biết, Sở y tế, Sở TT-TT, Sở Kế hoạch và Đầu tư đã có buổi làm việc nhằm thống nhất quan điểm để tham mưu UBND TP.HCM về triển khai thí điểm áp dụng "Thẻ xanh COVID" trong giai đoạn phục hồi kinh tế trên địa bàn TP.HCM.
                                
                                Theo đó, "Thẻ xanh COVID" được xem là một hình thức công nhận cho một người đã có miễn dịch để bảo vệ cơ thể chống lại virus SARS-CoV-2 nhờ đã tiêm vaccine hoặc mắc COVID-19 đã khỏi và hoàn thành thời gian cách ly.
                                
                                Để được cấp "thẻ xanh COVID" phải đáp ứng một trong các điều kiện như: đã tiêm ít nhất 1 mũi vaccine (đối với loại vaccine phải tiêm 2 mũi) và ở thời điểm ít nhất 2 tuần sau tiêm hoặc đã mắc COVID-19 và có giấy công nhận.
                                
                                Tuy nhiên, người có "Thẻ xanh COVID" vẫn phải tuân thủ 5K và làm xét nghiệm định kỳ theo quy định của Bộ Y tế (tần suất xét nghiệm tùy thuộc vào mức độ nguy cơ của các lĩnh vực, ngành nghề).
                                
                                Về hình thức, Sở Y tế kiến nghị chỉ dùng một thuật ngữ "Thẻ xanh COVID" và thống nhất với Sở TT-TT và sẽ được tích hợp trên ứng dụng "Y tế HCM" nhằm tạo thuận lợi cho người dân khi cần khai báo đã tiêm vaccine, cùng với tích hợp kết quả xét nghiệm và khai báo y tế. Trên ứng dụng sẽ thể hiện rõ đã tiêm 1 mũi hay đã tiêm 2 mũi vaccine.
                                
                                Trước đó Trung tâm Kiểm soát bệnh tật TP.HCM (HCDC) cũng đã có văn bản gửi UBND và Trung tâm Y tế TP Thủ Đức, các quận huyện về việc hướng dẫn xác định người mắc COVID-19 đã khỏi bệnh. Theo đó, người đã tiêm vaccine COVID-19 hoặc người mắc COVID-19 đã khỏi bệnh và hoàn thành thời gian cách ly là đủ điều kiện có "Thẻ xanh COVID".
                                
                                Đối với các trường hợp tự làm xét nghiệm, tự cách ly tại nhà và được trạm y tế phường, xã, thị trấn hoặc tổ trưởng tổ dân phố, nhân dân hoặc các tổ y tế chăm sóc F0 tại nhà do các trường đại học y khoa hoặc các tổ chức thiện nguyện đảm trách xác nhận là đúng thì được xem như đã hoàn thành thời gian cách ly tại nhà.
                                
                                Nguồn: suckhoedoisong.vn
                            `}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </CardContent>
    )
}