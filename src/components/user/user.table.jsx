import { Space, Table, Tag, Popconfirm, notification } from 'antd';
// import { fetchAllUserAPI } from '../../services/axios.service';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateUserModal from '../../services/update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/axios.service';

const UserTable = (props) => {

    const { dataUsers, loadUser, 
            currentPage, pageSize, totalPage,
            setCurrentPage, setPageSize, setTotalPage  
        } = props

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (_, record, index) => {
                return (
                    <span>{(index + 1)+(currentPage-1)*pageSize}</span>
                )
            }
        },
        {
            title: "ID",
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#'
                    onClick={() => {
                        setDataDetail(record);
                        setIsDetailOpen(true);
                    }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <div style={{display: "flex", gap: "10px"}}>
                <EditOutlined
                    style={{cursor: "pointer", color: "orange"}}
                    onClick={() => {
                        setDataUpdate(record);
                        setIsModalUpdateOpen(true);
                    }}
                />
                <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn chắc chắn xóa user này ?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                </Popconfirm>
              </div>
            ),
        },
    ];

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id)
        if(res.data){
            notification.success({
                message: "Delete user",
                description: "Xóa user thành công"
            })
            await loadUser();
        }
        else{
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            })
        }
    }
    const onChange =  (pagination, filters, sorter, extra) => { 
        console.log('params', pagination);
        if(+pagination.current !== +currentPage){
            setCurrentPage(+pagination.current);
        }
        if(+pagination.pageSize !== +pageSize){
            setPageSize(+pagination.pageSize);
        }
        if(+pagination.total !== +totalPage){
            setTotalPage(+pagination.total);
        }
        console.log(">>> check pagination: ", {pagination, filters, sorter, extra});
     }

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={
                    {
                    current: currentPage,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: totalPage,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    } }
                onChange={onChange}
                    
            />
            <UpdateUserModal
                    isModalUpdateOpen={isModalUpdateOpen}
                    setIsModalUpdateOpen={setIsModalUpdateOpen}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetail = {dataDetail}
                setDataDetail = {setDataDetail}
                isDetailOpen = {isDetailOpen}
                setIsDetailOpen = {setIsDetailOpen}
                loadUser = {loadUser}
            />
        </>
        
    )
}

export default UserTable