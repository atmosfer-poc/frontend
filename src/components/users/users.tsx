import React, {useEffect, useState} from "react"
import {UserClient} from "@api/user";
import {ColumnsType} from "antd/lib/table";
import {Button as CustomButton} from "@components/button/button";
import {ISso} from "@common/interfaces/sso";
import {LoadingOutlined} from "@ant-design/icons";
import {Table} from "antd";
import {RoleChangeModal} from "@components/role-change-modal/roleChangeModal";
import {Notifications} from "../../services/notifications";

export const Users = (props: IProps) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [roleModalVisible, setRoleModalVisible] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        setLoading(true);
        UserClient.getUsers().then(resp => {
            setData(resp);
        }).finally(() => {
            setLoading(false);
        })
    }

    const locale = {
        emptyText: "Veri Yok",
    };

    const changeRole = (row) => {
        setSelectedRow(row);
        setRoleModalVisible(true);
    }

    const columns: ColumnsType<any> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 150,
        },
        {
            title: "Ad",
            dataIndex: "name",
            width: 150,
        },
        {
            title: "Soyad",
            dataIndex: "surname",
            width: 175,
        },
        {
            title: "Email",
            dataIndex: "email",
            width: 175,
        },
        {
            title: "Telefon Numarası",
            dataIndex: "msisdn",
            width: 175,
        },
        {
            title: "Departman",
            dataIndex: "role",
            fixed: "right",
            width: 50,
            render: (key, row) => {
                if (key !== ISso.UserRole.UNASSIGNED) {
                    return (
                        <span>{key}</span>
                    )
                } else {
                    return (
                        <CustomButton
                            label={"Rol Belirle"}
                            color="black"
                            onClick={() => changeRole(row)}
                        />
                    )
                }
            }
        },
    ];

    const cancelRoleChange = () => {
        setSelectedRow(null);
        setRoleModalVisible(false);
    }

    const roleChangeConfirm = (e) => {
        selectedRow.role = e;
        UserClient.updateUser(selectedRow).then(resp => {
            setSelectedRow(null);
            setRoleModalVisible(false);
            Notifications.success("İşleminiz başarıyla gerçekleşti.");
            refresh()
        })
    }

    return (
        <div>
            <h1>Bayi Çalışanları</h1>
            <RoleChangeModal
                visible={roleModalVisible}
                onCancel={cancelRoleChange}
                onOk={roleChangeConfirm}/>
            <Table
                className="customTable"
                columns={columns}
                rowKey="id"
                pagination={false}
                dataSource={data}
                loading={{
                    spinning: loading,
                    children: <LoadingOutlined style={{fontSize: 50}} spin/>,
                }}
                scroll={{x: true}}
                locale={locale}
            />
        </div>
    )
}

interface IProps {

}
