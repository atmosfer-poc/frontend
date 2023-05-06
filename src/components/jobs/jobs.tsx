import React, {useEffect, useState} from "react"
import {AdvertisementService} from "@api/advertisement";
import {IAdvertisement} from "@common/interfaces/advertisement";
import {Table} from "antd";
import {ColumnsType} from "antd/lib/table";
import {Button as CustomButton} from "@components/button/button";
import {LoadingOutlined} from "@ant-design/icons";
import {NewAdvertisementModal} from "@components/new-advertisement-modal/NewAdvertisementModal";
import {Notifications} from "../../services/notifications";
import {ISso} from "@common/interfaces/sso";
import {JobDetailModal} from "@components/job-detail-modal/jobDetailModal";

export const Jobs = (props: IProps) => {
    const [data, setData] = useState<IAdvertisement.AdvertisementDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [newAdvertisementVisible, setNewAdvertisementVisible] = useState<boolean>(false)
    const [jobDetailVisible, setJobDetailVisible] = useState<boolean>(false)
    const [selectedJob, setSelectedJob] = useState<any>(null);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        setLoading(true);
        AdvertisementService.all().then(resp => {
            setData(resp);
        }).finally(() => {
            setLoading(false);
        })
    }

    const changeStatus = (row) => {
        if (row.status === IAdvertisement.AdvertisementStatus.OPEN) {
            row.status = IAdvertisement.AdvertisementStatus.CLOSED;
        } else {
            row.status = IAdvertisement.AdvertisementStatus.OPEN;
        }

        update(row);
    }

    const update = (data) => {
        data.image = null;
        setLoading(true);
        AdvertisementService.update(data).then(() => {
            Notifications.success("İşleminiz başarıyla gerçekleşti.");
            refresh();
        }).finally(() => {
            setLoading(false);
        })
    }

    const onClickJobDetail = (row) => {
        setSelectedJob(row);
        setJobDetailVisible(true);
    }

    const columns: ColumnsType<any> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 150,
        },
        {
            title: "Başlık",
            dataIndex: "title",
            width: 150,
            render: (key, row) => {
                if (props.userRole === ISso.UserRole.ADMIN) {
                    return (
                        <span>{key}</span>
                    );
                } else {
                    return (
                        <span>{key} - Başvuru Sayısı : {row.applicationCount}</span>
                    )
                }
            }
        },
        {
            title: "Durum",
            dataIndex: "status",
            width: 175,
        },
        {
            title: (props.userRole === ISso.UserRole.ADMIN) && (
                <CustomButton
                    label={"Yeni Oluştur"}
                    color="black"
                    onClick={() => setNewAdvertisementVisible(true)}
                />
            ),
            fixed: "right",
            width: 50,
            render: (key, row) => {
                if (props.userRole === ISso.UserRole.ADMIN) {
                    return (
                        <div>
                            <CustomButton
                                label={row.status === IAdvertisement.AdvertisementStatus.OPEN ? "Kapat" : "Aç"}
                                color="black"
                                onClick={() => changeStatus(row)}
                            />
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <CustomButton
                                label={"Detay"}
                                color="black"
                                onClick={() => onClickJobDetail(row)}
                            />
                        </div>
                    )
                }
            },
        },
    ];

    const locale = {
        emptyText: "Veri Yok",
    };

    const newAdvertisementCompleted = (data, file) => {
        AdvertisementService.save(data, file).then(resp => {
            setNewAdvertisementVisible(false);
            Notifications.success("İşleminiz başarıyla gerçekleşti.");
            refresh();
        });
    }

    const onCloseJobDetail = () => {
        setSelectedJob(null);
        setJobDetailVisible(false);
    }

    return (
        <div>
            <h1>İş İlanları</h1>
            <JobDetailModal
                visible={jobDetailVisible}
                job={selectedJob}
                userRole={props.userRole}
                onCancel={onCloseJobDetail}
            />
            <NewAdvertisementModal
                visible={newAdvertisementVisible}
                onCancel={() => setNewAdvertisementVisible(false)}
                onOk={newAdvertisementCompleted} />
            <Table
                className="customTable"
                columns={columns}
                rowKey="id"
                pagination={false}
                dataSource={data}
                loading={{
                    spinning: loading,
                    children: <LoadingOutlined style={{ fontSize: 50 }} spin />,
                }}
                scroll={{ x: true }}
                locale={locale}
            />
        </div>
    )
}

interface IProps {
    userRole: ISso.UserRole
}
