import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/axios.service';

const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadUser
    } = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    console.log(">>> check props: ", props);
    
    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return;
        }
        const file = event.target.files[0]
        // setSelectedFile(file)
        console.log(">>> check file: ", file);
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
        console.log(">>> check fileasd: ", preview);
    }

    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        console.log(">>> check resUpload: ", resUpload.data);
        if (resUpload.data) {
            // step 1: upload file
            const newAvatar = resUpload.data.fileUploaded;
            // step 2: update user
            const resUpdate = await updateUserAvatarAPI(
                newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
            console.log(">>> check resUpdate: ", resUpdate.data);
            if (resUpdate.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();
                notification.success({
                    message: "Upload avatar successful",
                    description: "Tải ảnh đại diện thành công"
                })
            }
            else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpdate.message)
                })
                return;
            }
        }
        else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    return (
        <Drawer title="Chi tiết User"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? <>
                <p>Id: {dataDetail._id}</p>
                <br />
                <p>Full name: {dataDetail.fullName}</p>
                <br />
                <p>Email: {dataDetail.email}</p>
                <br />
                <p>Phone number: {dataDetail.phone}</p>
                <br />
                <p>Avatar</p>
                <div
                    style={{
                        marginTop: "10px",
                        height: "100px", width: "150px",
                        border: "1px solid #ccc"
                    }} >
                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                        src={`${import.meta.env.VITE_BASE_URL}/images/avatar/${dataDetail.avatar}`} alt="" />
                </div>
                <div >
                    <label htmlFor="btnUpload" style={{
                        display: "block",
                        width: "fit-content",
                        marginTop: "15px",
                        padding: "5px 10px",
                        background: "orange",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}>
                        Upload Avatar
                    </label>
                    <input
                        type="file" hidden id='btnUpload'
                        onChange={(event) => handleOnchangeFile(event)}
                    />
                </div>
                {preview &&
                    <>
                        <div
                            style={{
                                marginTop: "10px",
                                height: "100px", width: "150px",
                                border: "1px solid #ccc"
                            }} >
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} alt="" />
                        </div>
                        <Button type='primary'
                            onClick={() => handleUpdateUserAvatar()}
                        >Save</Button>
                    </>
                }
            </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
        </Drawer>
    )
}

export default ViewUserDetail