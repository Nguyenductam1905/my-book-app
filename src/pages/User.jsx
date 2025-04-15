import UserForm from "../components/user/user.form"
import UserTable from "../components/user/user.table"
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from "../services/axios.service";

const UserPages = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
// ======lift-up-state ======
    const [dataUsers, setDataUsers] = useState([])
    //empty array
    useEffect(()=>{
        loadUser()
    },[currentPage, pageSize, totalPage])

    const loadUser = async () => {
        const res = await fetchAllUserAPI(currentPage, pageSize);
        console.log(">>> check res: ", res);
        if(res.data){
            setDataUsers(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setCurrentPage(res.data.meta.current)
            setTotalPage(res.data.meta.total)
        }
    }
    

    return(
        <div style={{padding: "20px"}}>
            <UserForm
                loadUser = {loadUser}
            />
            <UserTable
                dataUsers = {dataUsers}
                loadUser = {loadUser}
                currentPage = {currentPage}
                pageSize = {pageSize}
                totalPage = {totalPage}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                setTotalPage={setTotalPage}
            />
        </div>
    )
}
export default UserPages