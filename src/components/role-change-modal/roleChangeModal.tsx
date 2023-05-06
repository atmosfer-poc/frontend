import {Modal} from "antd";
import styles from "@components/registerModal/eulaModal.module.scss";
import {getTranslateValue} from "@components/translate/Language";
import {Button as CustomButton} from "@components/button/button";
import React, {useEffect, useState} from "react";
import {FormInstance} from "antd/es/form";
import {SelectInput} from "@components/dashboard/selectInput/selectInput";
import {ISso} from "@common/interfaces/sso";

export const RoleChangeModal = (props: IProps) => {
    const [selectedRole, setSelectedRole] = useState<any>(null);
    const createFormRef = React.createRef<FormInstance>();
    const [roleOptions] = useState<any[]>([
        {
            value: ISso.UserRole.HR,
            label: "İnsan Kaynakları"
        },
        {
            value: ISso.UserRole.TECHNICAL,
            label: "Teknik"
        },
        {
            value: ISso.UserRole.FINANCE,
            label: "Ücretlendirme"
        }
    ])

    useEffect(() => {
        if (props.visible) {
            createFormRef.current?.resetFields();
        }
    }, [props.visible]);

    return (
        <Modal visible={props.visible} onCancel={props.onCancel} footer closable={true}>
            <div style={{marginTop: "20px"}} className={styles.grid6and6}>
                <SelectInput
                    label={''}
                    onChange={(value) => {
                        setSelectedRole(value);
                    }}
                    options={roleOptions}
                />
            </div>
            <div className={styles.itemCenter}>
                <CustomButton
                    label={getTranslateValue("save", "Kaydet")}
                    color="black"
                    onClick={() => {
                        if (selectedRole) {
                            props.onOk(selectedRole);
                        }
                    }}
                    type={"button"}
                />
            </div>
        </Modal>
    )
}

interface IProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (e) => void;
}
