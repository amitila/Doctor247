import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';
import Dialog from "react-native-dialog";

const SpecialityScreen = ({ navigation }) => {

    const [specialities, setSpecialities] = useState([
        {
            "avatar": "https://www.fvhospital.com/wp-content/uploads/2020/04/sars-cov-2.jpg",
            "name":"Covid-19",
            "introduce": 'COVID-19 là một loại virus (cụ thể hơn là virus Corona) được xác định là nguyên nhân gây ra dịch bệnh suy hô hấp được phát hiện ở thành phố Vũ Hán, Trung Quốc. Ngay từ những ngày đầu, nhiều bệnh nhân trong vụ dịch ở Vũ Hán, Trung Quốc được cho là có mối liên hệ với một chợ buôn bán hải sản và động vật lớn tại địa phương, điều đó cho thấy có sự lây lan từ động vật sang người. Sau đó, ngày càng nhiều bệnh nhân được báo cáo là không tiếp xúc với chợ hải sản, chứng minh thêm cho việc có sự lây lan từ người sang người. Tại thời điểm này, mức độ lây nhiễm dễ dàng và bền vững từ người sang người của chủng virus này vẫn chưa được xác định.',
            "symptom": `- Sốt
                        - Ho
                        - Khó thở
                        - Mệt mỏi
                        - Mất khứu giác`,
            "treatment": 'Đã có vacxin chích ngừa: Các loại vắc-xin được phê duyệt sử dung hiện nay gồm: AstraZeneca, Gam-COVID-Vac (tên khác là SPUTNIK V), Vero Cell, Comirnaty của Pfizer/BioNTech, Vắc xin Spikevax (Tên khác là Moderna), vắc-xin Janssen, vắc-xin Hayat-Vax và vắc-xin Abdala.',
            "related": 'Các biến chứng khi mắc covid 19 và khi chích ngừa covid 19 - đang cập nhập',
            "images": 'https://hcdc.vn/public/img/02bf8460bf0d6384849ca010eda38cf8e9dbc4c7/images/mod1/images/8-loai-vacxin-phong-covid19-da-duoc-cap-phep-tai-viet-nam/images/2109200858.jpg'
        },
        {
            "avatar": "https://vinmec-prod.s3.amazonaws.com/images/20181214_143113_171119_dd67d8b28387c137498.max-1800x1800.png",
            "name":"Răng - Hàm - Mặt",
            "introduce": 'Răng Hàm Mặt (RHM) là ngành học về kỹ thuật phục hình thẩm mỹ răng hàm mặt, chẩn đoán, điều trị và duy trì sức khỏe răng miệng. Các bác sĩ chuyên ngành Răng hàm mặt có kiến thức, chuyên môn lẫn kỹ năng nghề nghiệp về y khoa và nha khoa, trực tiếp tham gia công tác tư vấn, chẩn đoán, giải quyết các vấn đề và điều trị kịp thời các bệnh lý liên quan đến răng, hàm, mặt cho cá nhân, đáp ứng nhu cầu chăm sóc sức khoẻ răng miệng và thẩm mỹ cho mọi người.',
            "symptom": `– Khe hở môi
                        – Khe hở vòm miệng
                        – Các khe mặt…
                        – Phẫu thuật ghép xương ổ răng cho trẻ khe hở môi vòm miệng
                        – Phẫu thuật dính lưỡi, phanh môi, phanh má bằng Laser
                        – Phẫu thuật các đường dò bẩm sinh vùng hàm mặt`,
            "treatment": 'Đã có các hoạt động phẩu thuật định hình, trị liệu ngôn ngữ, phác đồ chữa trị cho từng loại bệnh',
            "related": 'Nha khoa cơ sở, Chẩn đoán hình ảnh Răng Hàm Mặt, Bệnh học miệng, Phẫu thuật miệng, Phẫu thuật hàm mặt, Cấy ghép nha khoa, Chỉnh hình răng mặt, Nha khoa trẻ em, Nha khoa công cộng, Nha chu, Chữa răng – Nội nha, Phục hình răng, Kỹ thuật phục hình răng, Điều dưỡng nha khoa',
            "images": 'https://image.thanhnien.vn/660x370/Uploaded/2021/livospwi/2021_09_30/tsbsvovannhane28093nguoidemnhakhoavietrathegioidanghuongdanthuchanhchosvranghammathiu1_kuff.jpg'
        },
        {
            "avatar": "https://www.hfh.com.vn/sites/default/files/inline-images/Phong-mo_service.jpg",
            "name":"Gây mê hồi sức",
            "introduce": 'Gây mê là chuyên khoa giúp cho người bệnh mất đi cảm giác đau trước khi tiến hành phẫu thuật, chăm sóc người bệnh trong phẫu thuật, đánh thức và đảm bảo người bệnh cảm thấy khỏe và không đau sau phẫu thuật. Giảm đau là việc làm mất đi cảm giác đau mà không làm mất ý thức ở người bệnh. Phương pháp này được thực hiện bằng cách tiêm thuốc gây tê vùng vào phần dịch não tủy xung quanh tủy sống (gây tê tủy sống) hoặc khoang trên màng cứng xung quanh dịch não tủy (gây tê ngoài màng cứng). Sau phẫu thuật hoặc ở người bệnh có đau mãn tính, người ta áp dụng kỹ thuật tương tự nhưng dùng các loại thuốc khác (như opioids) để giảm đau và làm cho người bệnh thấy thoải mái cũng như giúp họ phục hồi nhanh hơn.',
            "symptom": 'Bệnh liên quan tới việc cần gây mê để giảm đau cho bệnh nhân',
            "treatment": `Phẫu thuật ổ bụng
                        Phẫu thuật tiết niệu
                        Phẫu thuật chấn thương chỉnh hình
                        Phẫu thuật Tai-Mũi-Họng
                        Phẫu thuật sản & phụ khoa
                        Can thiệp nội soi (Tiêu hóa và Hô hấp)
                        Phẫu thuật thần kinh
                        Tim mạch can thiệp và Can thiệp mạch ngoại vi`,
            "related": 'Hồi sức ngoại khoa, Hồi sức nội khoa người lớn, Gây mê (các chuyên khoa trừ sơ sinh), Gây tê, Giảm đau cấp tính.',
            "images": 'https://vinmec-prod.s3.amazonaws.com/images/20200220_133628_392989_gay-me-2.max-1800x1800.png'
        },
        {
            "avatar": "https://vinmec-prod.s3.amazonaws.com/images/20190416_103208_362224_benh-tim-mach-chiaki.max-800x800.jpg",
            "name":"Tim mạch",
            "introduce": `Bệnh tim mạch là các tình trạng liên quan đến sức khỏe của trái tim, sự hoạt động của các mạch máu gây suy yếu khả năng làm việc của tim. Các bệnh tim mạch bao gồm: các bệnh mạch máu như bệnh động mạch vành, bệnh cơ tim, loạn nhịp tim và suy tim.
                            Bệnh tim mạch gây hẹp, xơ cứng và tắc nghẽn mạch máu, làm gián đoạn hoặc không cung cấp đủ Oxy đến não và các bộ phận khác trong cơ thể. Từ đó khiến các cơ quan bị ngừng trệ hoạt động, phá hủy từng bộ phận dẫn đến tử vong.
                            Bệnh tim mạch có thể xảy ra ở mọi độ tuổi, giới tính, nghề nghiệp. Bệnh không thể chữa khỏi hoàn toàn, đòi hỏi sự điều trị và theo dõi cẩn thận (thậm chí là suốt đời), tốn kém nhiều chi phí.`,
            "symptom": `Đau ngực 
                    Bệnh mạch vành 
                    Nhồi máu cơ tim
                    Tăng huyết áp
                    Rối loạn mỡ máu 
                    Bệnh van tim (Hẹp hở van tim)
                    Bệnh cơ tim.
                    Rối loạn nhịp tim
                    Chẩn đoán và theo dõi bệnh tim bẩm sinh ở người lớn
                    Dự phòng các bệnh tim mạch tiên phát và thứ phát
                    Phục hồi chức năng tim mạch`,
            "treatment": `Siêu âm tim (siêu âm màu Doppler cho người lớn và trẻ em)
                        Siêu âm tim qua thực quản, 
                        Điện tâm đồ gắng sức, 
                        Điện tâm đồ holter 24h, 
                        Theo dõi huyết áp lưu động 24h (MAPA)`,
            "related": 'Tim mạch can thiệp, Điều trị nội trú, Hồi sức tích cực',
            "images": 'https://yhocthuongthuc.net/wp-content/uploads/2019/07/heart-730x430.png'
        },
        {
            "avatar": "https://uploads-ssl.webflow.com/5c74ab0022531a20968576c7/5c74f20d1762f5e649b73488_5bf773ea512cb0133e10ea1e_mun-trung-ca.jpeg",
            "name":"Da liễu",
            "introduce": 'Bệnh da liễu là những bệnh có biểu hiện ngoài da do nhiều tác nhân gây nên, thông thường là do dị ứng, vi khuẩn, virus hoặc do cơ địa của người bệnh. Bệnh da liễu không gây nguy hiểm đến tính mạng nhưng lại ảnh hưởng nghiêm trọng đến sức khỏe cũng như tâm lý của người bệnh.',
            "symptom": `- Vẩy nến;
                        - Tổ đỉa móng hoặc gan bàn chân;
                        - Ra mồ hôi tay và chân;
                        - Eczema
                        - Bỏng
                        - Mày đay
                        - Trứng cá;
                        - Nhiễm trùng da (do vi khuẩn, vi rút, nấm…);
                        - U da;
                        - Dị ứng kết hợp với chuyên khoa hô hấp.
                        - Tổn thương mao mạch
                        - Trẻ hóa làn da, nám da, trứng ca, tổn thương mạch máu, triệt lông bằng laser`,
            "treatment": 'Áp dụng nhiều loại xét nghiệm, phương pháp điều trị và tư vấn về các bệnh lây qua đường tình dục.',
            "related": 'Đang cập nhật',
            "images": 'https://hcdc.vn/public/img/02bf8460bf0d6384849ca010eda38cf8e9dbc4c7/images/mod1/images/8-loai-vacxin-phong-covid19-da-duoc-cap-phep-tai-viet-nam/images/2109200858.jpg'
        },
        {
            "avatar": "https://tamduchearthospital.com/wp-content/uploads/2019/05/Gioi-thieu-1-1.jpg",
            "name":"Cấp cứu",
            "introduce": 'Một chuyên gia của Bộ Y tế cho biết theo quy chế chuyên môn, các trường hợp phải cấp cứu là khi bệnh nặng hiểm nghèo đe dọa tính mạng bệnh nhân hay các trường hợp sốt cao, chảy máu nhiều ảnh hưởng đến chức năng sống của cơ thể.',
            "symptom": 'Đang cập nhật',
            "treatment": 'Phương pháp đánh giá và đáp ứng yêu cầu chăm sóc bệnh nhân. Ban đầu người bệnh được nhân viên điều dưỡng phân loại ưu tiên cấp cứu theo mức độ nghiêm trọng của tình trạng cấp cứu, được bác sĩ cấp cứu thăm khám và đánh giá. Việc đánh giá người bệnh dựa vào tiền sử bệnh, tình trạng hiện tại, đánh giá lâm sàng kỹ càng và có thể tham vấn ý kiến của bác sĩ chuyên khoa khi cần.',
            "related": `- Cấp cứu khẩn cấp: Tình trạng ngừng tim phổi, sốc do nhiều nguyên nhân (tim, sốc nhiễm khuẩn, , xuất huyết), suy hô hấp cần thở máy, hội chứng liên quan đến đường thở như hít phải khói hoặc bỏng, trạng thái động kinh, cần bảo vệ đường thở và đặt nội khí quản, hạ đường huyết nghiêm trọng (Gluc<1.5mmol/L0, tình trạng có suy giảm ý thức (GCS<9), sốc phản vệ, chấn thương nghiêm trọng.
            - < 10 phút (tối khẩn cấp): Nhồi máu cơ tim  (Nhồi máu cơ tim ST chênh lên STEMI và nhồi máu cơ tim ST không chênh lên NSTEMI có đau dai dẳng), các vấn đề về hô hấp cấp tính, ho ra máu, nônra máu, đột quỵ  cấp trong thời gian cửa sổ điều trị tiêu sợi huyết, xuất huyết nội sọ, trạng thái sau cơn giật động kinh, sốt cao có cơn rét run, viêm màng não, mất ý thức do nhiễm trùng huyết, người bệnh loạn thần cấp, ngộ độc chất gây nghiện, hạ đường huyết, chứng ketoacydoza
            - < 30 phút: Đau thắt ngực không ổn định, nhồi máu cơ tim không nghiêm trọng (NSTEMI không có đau), đau bụng, xuất huyết đã ổn định, nôn liên tục, tắc mạch phổi (đã ổn định), cơn tăng huyết áp, tình trạng sau ngất, suy tim (ổn định),  sốt nhiễm trùng 
            - < 90 phút: Tình huống không thực sự khẩn cấp, tình trạng viêm nhiễm tự khỏi (ví dụ cảm lạnh)
            - <120 phút: Tình trạng không cấp thiết hoặc không phải là trường hợp cấp cứu`,
            "images": 'https://www.hfh.com.vn/sites/default/files/Services/AE_service.jpg'
        },
        {
            "avatar": "https://vinmec-prod.s3.amazonaws.com/images/20191004_070113_742989_he-noi-tiet.max-1800x1800.jpg",
            "name":"Nội tiết",
            "introduce": 'Nội tiết - đái tháo đường là một chuyên ngành thuộc hệ nội, chuyên chẩn đoán và điều trị các bệnh lý liên quan đến tình trạng rối loạn chức năng của hệ thống nội tiết và các hormone. Trong quá trình điều trị, các bác sĩ nội tiết của Bệnh viện luôn kết hợp chặt chẽ với những chuyên khoa khác nhằm đảm bảo chẩn đoán chính xác, từ đó, tìm ra phương pháp điều trị tốt nhất cho người bệnh.',
            "symptom": `Các bệnh lý do rối loạn cân bằng glucose máu`,
            "treatment": 'Tùy vào các loại bệnh mà các bác sĩ sẽ đưa ra hay kết hợp các phương pháp điều trị khác nhau phù hợp',
            "related": `- Bệnh lý tuyến giáp: 
                Bướu nhân, nang tuyến giáp, 
                Cường chức năng tuyến giáp và bệnh Basedow, 
                Giảm năng tuyến giáp (suy giáp), 
                Viêm tuyến giáp, 
                Bệnh lý tuyến thượng thận.
                - Suy tuyến thượng thận: 
                Hội chứng Conn, 
                Hội chứng Cushing, 
                U tủy thượng thận, 
                Bệnh lý tuyến yên.
                - Suy tuyến yên: 
                Đái tháo nhạt, 
                Rối loạn mỡ máu.`,
            "images": 'https://www.msdmanuals.com/-/media/manual/professional/images/e/n/d/end_pituitary_target_organs_vi.gif?thn=0&sc_lang=vi',
        },
        {
            "avatar": "http://benhviendongdo.com.vn/wp-content/uploads/2018/06/chuyen-khoa-co-xuong-khop-1.jpg",
            "name":"Nội Cơ-Xương-Khớp",
            "introduce": 'Chuyên khoa xương khớp chuyên điều trị nội khoa các bệnh về cơ xương khớp, tư vấn điều trị và theo dõi định kỳ. Bác sỹ chuyên khoa xương khớp thăm khám cho người bệnh ở các lứa tuổi khác nhau.',
            "symptom": `- Đau cơ
                        - Đau cột sống
                        - Viêm khớp
                        - Thoái hóa
                        - Mất cảm giác`,
            "treatment": 'Bác sỹ chuyên khoa cơ xương khớp thực hiện các thủ thuật chọc dò, tiêm khớp, tiêm bao gân… tại phòng vô khuẩn, thực hiện các kỹ thuật tiêm dưới hướng dẫn của siêu âm hoặc hướng dẫn của CT scanner tại khoa x quang trong điều kiện vô trùng.',
            "related": `Chuyên khoa xương khớp điều trị nhiều bệnh lý hay gặp như:
                - Bệnh gút; bệnh giả gút  (goutte, pseudogoutte)
                - Viêm khớp nhiễm khuẩn (arthrite infectieuse )
                - Viêm khớp phản ứng (arthrite resactive)
                - Viêm khớp dạng thấp ( Polyarthrite rhumatoïde)
                - Đau do xơ cơ (fibromyalgie)
                - Thoái hóa khớp (arthrose )
                - Viêm da cơ, viêm đa cơ (dermatomyosite, polymyosite), xơ cứng bì (sclérodermie)
                - Viêm cột sống dính khớp (spondylarthrite ankylosante )
                - Các bệnh lý về gân cơ: viêm quanh khớp vai (tendinite de l’epaule), viêm lồi cầu xương cánh tay (epicondylite), viêm mỏm châm quay ( syndrome de De Quervain), ngón tay lò xo (doigt a resort ), viêm gân cơ mông nhỡ (tendinite du moyen fessier), hội chứng đường hầm cổ tay, chân ( syndrome du canal carpien, canal tarsien) …
                - Hội chứng Morton, Felty, Sjogren, Elher- Danos, Raynaud…
                - Bệnh Lupus, Behcet, Still, Paget, Wegener…`,
            "images": 'http://nhtm.gov.vn/upload/2018/01/18/origin_editor/cac_khop_de_bi_ton_thuong.png'
        },
        {
            "avatar": "https://i-suckhoe.vnecdn.net/2018/11/06/162278519-w660-3814-1541502783.png",
            "name":"Dinh dưỡng",
            "introduce": 'Dinh dưỡng là lượng thực phẩm ăn vào, được tính dựa trên nhu cầu cần thiết của từng cá thể. Dinh dưỡng tốt - một chế độ dinh dưỡng đầy đủ, cân bằng kết hợp với hoạt động thể lực hàng ngày - là nền tảng của sức khỏe. Dinh dưỡng không hợp lý có thể làm giảm chức năng miễn dịch, giảm sự phát triển thể chất, tinh thần, giảm năng suất lao động và tăng khả năng mắc bệnh (WHO).',
            "symptom": `Đang cập nhật`,
            "treatment": 'Điều trị và chăm sóc dinh dưỡng hợp lý cho mọi đối tượng (trẻ em và người lớn); cung cấp dinh dưỡng hợp lý, dinh dưỡng đường tiêu hóa, dinh dưỡng tĩnh mạch cho người bệnh.',
            "related": `- Các bệnh mạn tính không lây liên quan đến dinh dưỡng như Thừa cân/Béo phì, Gày/Suy kiệt, Biếng ăn, Suy dinh dưỡng, Thấp còi, Tiểu đường, Mỡ máu, Tăng huyết áp, Gout, Loãng xương, Ung thư …
                - Xây dựng thực đơn hợp lý cho từng đối tượng theo từng loại bệnh và theo nhu cầu
                - Chăm sóc, phục hồi dinh dưỡng cho trẻ suy dinh dưỡng, người lớn bị suy kiệt, phụ nữ có thai, nuôi con bú, phụ nữ sau sinh
                - Hướng dẫn thực hành dinh dưỡng và cung cấp các sản phẩm dinh dưỡng phù hợp`,
            "images": 'https://bvdkbacninh.vn/UserContent/images/suat%20an.jpg'
        },
    ]);

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState({
        avatar: "",
        name:"",
        introduce: '',
        symptom: ``,
        treatment: '',
        related: ``,
        images: '',
    })

    const showDialog = (avatar, name, introduce, symptom, treatment, related, images) => {
        setVisible(true);
        setInfo({
            avatar: "",
            name:"",
            introduce: '',
            symptom: ``,
            treatment: '',
            related: ``,
            images: '',
        })
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleDelete = () => {
        setVisible(false);
    };

    return (
        <>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Thông tin chuyên khoa {info.name}</Dialog.Title>
                <Dialog.Description>
                    Amiiiiii
                </Dialog.Description>
                <Dialog.Button label="Hủy bỏ" onPress={handleCancel} />
                <Dialog.Button label="Đặt khám" onPress={handleDelete} />
            </Dialog.Container>
            <ScrollView>
                {
                    specialities.map((item, i) => {
                        return (
                            <Card key={i}>
                                <Card.Image key={i} source={{uri: item.avatar}} /> 
                                <Card.Title>
                                    <SafeAreaView style={styles.container}>
                                        <Text style={{marginTop: 10, fontSize: 20}}>
                                            Chuyên khoa {item.name}
                                        </Text>
                                    </SafeAreaView>
                                </Card.Title>
                                <Card.Divider />
                                <View>
                                    <View>
                                        <Button
                                            // icon={<Icon name='code' color='#ffffff' />}
                                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                            title='Tìm hiểu thêm'
                                            onPress={()=>showDialog(
                                                item.avatar,
                                                item.name,
                                                item.introduce,
                                                item.symptom,
                                                item.treatment,
                                                item.related,
                                                item.images
                                            )} />
                                    </View>
                                </View>
                            </Card>
                        );
                    })
                }
            </ScrollView>
        </>
    );
};

export default SpecialityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    containerView: {
		flex: 0.5,
		alignItems: 'flex-start',
		justifyContent: 'space-around',
		textAlign: 'center',
        display: 'flex',
        flexDirection: 'row'
	},
	buttonContainer: {
		flex: 0.5,
		// backgroundColor: 'gold',
		width: 110,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
});