import {Form, Modal, Table} from "antd";
import styles from "@components/registerModal/eulaModal.module.scss";
import React, {useEffect, useState} from "react";
import {AdvertisementService} from "@api/advertisement";
import {ApplicationsService} from "@api/applications";
import {useSelector} from "react-redux";
import {RootStore} from "@redux/store";
import {ISso} from "@common/interfaces/sso";
import {Button as CustomButton} from "@components/button/button";
import {IApplications} from "@common/interfaces/applications";
import {FormInstance} from "antd/es/form";
import {TextInput} from "@components/dashboard/textInput/textInput";
import TextArea from "antd/es/input/TextArea";

export const ApplicationCommentModal = (props: IProps) => {
    const createFormRef = React.createRef<FormInstance>();

    useEffect(() => {
        if (props.visible) {
            createFormRef.current?.resetFields();
        }
    }, [props.visible])

    return (
        <Modal visible={props.visible} onCancel={props.onCancel} footer closable={true}>
            <Form ref={createFormRef} name="control-ref" onFinish={props.onOk}>
                <div style={{marginTop: '20px'}} className={styles.grid6and6}>
                    <Form.Item name="comment">
                        <TextArea
                            name="comment"
                            placeholder={"Aksiyon yorumunu giriniz."}
                        />
                    </Form.Item>
                </div>
                <div className={styles.itemCenter}>
                    <CustomButton
                        label={"Onayla"}
                        color="black"
                        type={"submit"}
                    />
                </div>
            </Form>
        </Modal>
    );
}

interface IProps {
    visible: boolean;
    onOk: (string) => void;
    onCancel: () => void;
}
