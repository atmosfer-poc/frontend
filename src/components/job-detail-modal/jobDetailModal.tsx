import {Modal, Table} from "antd";
import styles from "@components/registerModal/eulaModal.module.scss";
import React, {useEffect, useState} from "react";
import {AdvertisementService} from "@api/advertisement";
import {ApplicationsService} from "@api/applications";
import {useSelector} from "react-redux";
import {RootStore} from "@redux/store";
import {ISso} from "@common/interfaces/sso";
import {Button as CustomButton} from "@components/button/button";
import {IApplications} from "@common/interfaces/applications";
import {ApplicationCommentModal} from "@components/application-comment-modal/applicationCommentModal";
import {Notifications} from "../../services/notifications";

export const JobDetailModal = (props: IProps) => {
    const [applications, setApplication] = useState<any[]>([]);
    const {data} = useSelector((state: RootStore) => state.currentUser);
    const [actionCommentModalVisible, setActionCommentModalVisible] = useState<boolean>(false);
    const [selectedApplication, setSelectedApplication] = useState<any>(null);
    const [selectedAction, setSelectedAction] = useState<any>(null);

    useEffect(() => {
        if (props.visible) {
            refreshApplications();
        }
    }, [props.visible]);

    const refreshApplications = () => {
        setApplication([]);
        AdvertisementService.applications(props.job.id).then(resp => {
            setApplication(resp);
        })
    }

    const downloadCV = (applicationId: number) => {
        ApplicationsService.downloadCV(applicationId).then((resp) => {
            resp.blob().then((blob) => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = data.userName + ' ' + data.userSurname + ".pdf";
                a.click();
            });
        });
    }

    const applicationTableColumns = [
        {
            title: "Ad Soyad",
            dataIndex: "id",
            render: (key, row) => (
                <span>{row.name + ' ' + row.surname}</span>
            )
        },
        {
            title: "TCKN",
            dataIndex: "tckn",
        },
        {
            title: "Şehir",
            dataIndex: "city",
        },
        {
            title: "Telefon Numarası",
            dataIndex: "phoneNumber",
        },
        {
            title: "Çalışma Şekli",
            dataIndex: "workType",
        },
        {
            title: "CV",
            dataIndex: "id",
            render: (key, row) => (
                <a onClick={() => downloadCV(row.id)}>{'İndir'}</a>
            )
        },
        {
            title: "Aksiyon",
            dataIndex: "id",
            render: (key, row) => {
                if (props.userRole === ISso.UserRole.HR && row.status === IApplications.ApplicationStatusType.PENDING_HR) {
                    return (
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CustomButton
                                label={"Onayla"}
                                color="black"
                                onClick={() => onApplicationAction(row, IApplications.ApplicationActionType.CONFIRM)}
                            />
                            <CustomButton
                                label={"Reddet"}
                                color="black"
                                onClick={() => onApplicationAction(row, IApplications.ApplicationActionType.REJECT)}
                            />
                        </div>
                    )
                } else if (props.userRole === ISso.UserRole.TECHNICAL && row.status === IApplications.ApplicationStatusType.PENDING_TECH) {
                    return (
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CustomButton
                                label={"Onayla"}
                                color="black"
                                onClick={() => onApplicationAction(row, IApplications.ApplicationActionType.CONFIRM)}
                            />
                            <CustomButton
                                label={"Reddet"}
                                color="black"
                                onClick={() => onApplicationAction(row, IApplications.ApplicationActionType.REJECT)}
                            />
                        </div>
                    )
                } else if (props.userRole === ISso.UserRole.FINANCE && row.status === IApplications.ApplicationStatusType.PENDING_FINANCE) {
                    return (
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CustomButton
                                label={"Teklif Ver"}
                                color="black"
                                onClick={() => onApplicationAction(row, IApplications.ApplicationActionType.CONFIRM)}
                            />
                        </div>
                    )
                }
            }
        }
    ]

    const onApplicationAction = (row: any, action: IApplications.ApplicationActionType) => {
        setSelectedApplication(row);
        setSelectedAction(action);
        setActionCommentModalVisible(true);
    }

    const onApplicationActionCancel = () => {
        setSelectedApplication(null);
        setSelectedAction(null);
        setActionCommentModalVisible(false);
    }

    const onApplicationActionConfirm = (e) => {
        ApplicationsService.action(selectedApplication.id, selectedAction, e.comment).then(resp => {
            Notifications.success("İşleminiz başarıyla tamamlandı.");
            onApplicationActionCancel();
            refreshApplications();
        })
    }

    return (
        <Modal width={'80%'} visible={props.visible} onCancel={props.onCancel} footer closable={true}>
            <ApplicationCommentModal
                visible={actionCommentModalVisible}
                onCancel={onApplicationActionCancel}
                onOk={onApplicationActionConfirm}
            />
            <div style={{marginTop: "20px"}} className={styles.grid6and6}>
                <h1>{props.job?.title}</h1>
                <img
                    width={'100%'}
                    height={'100%'}
                    src={"data:image/png;base64, " + props.job?.image}
                />
                <div style={{marginTop: '15px'}} dangerouslySetInnerHTML={{
                    __html: props.job?.content
                }}/>

                {applications.length > 0 && (
                    <div>
                        <h2>Başvurular</h2>

                        <Table
                            className="customTable"
                            columns={applicationTableColumns}
                            rowKey="id"
                            pagination={false}
                            dataSource={applications}
                            scroll={{x: true}}
                        />
                    </div>
                )}
            </div>
        </Modal>
    )
}

interface IProps {
    visible: boolean;
    job: any;
    userRole: ISso.UserRole;
    onCancel: () => void;
}
