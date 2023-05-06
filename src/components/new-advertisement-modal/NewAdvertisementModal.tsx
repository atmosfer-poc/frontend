import {Form, Modal, Upload, UploadProps} from "antd";
import styles from "@components/registerModal/eulaModal.module.scss";
import {TextInput} from "@components/dashboard/textInput/textInput";
import {getTranslateValue} from "@components/translate/Language";
import {Button as CustomButton} from "@components/button/button";
import React, {useEffect, useState} from "react";
import {FormInstance} from "antd/es/form";
import TextArea from "antd/es/input/TextArea";

export const NewAdvertisementModal = (props: IProps) => {
    const [file, setFile] = useState(null);
    const createFormRef = React.createRef<FormInstance>();

    useEffect(() => {
        if (props.visible) {
            createFormRef.current?.resetFields();
        }
    }, [props.visible]);

    const onFormComplete = (data) => {
        props.onOk(data, file);
    }

    const data: UploadProps = {
        name: "file",
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        onChange(info) {
            if (info.file.status !== "uploading") {
                setFile(info.file.originFileObj as any);
            }
            if (info.file.status === "done") {
                console.log(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
    };

    const removeFile = () => {
        setFile(null);
    }

    return (
        <Modal visible={props.visible} onCancel={props.onCancel} footer closable={true}>
            <Form ref={createFormRef} name="control-ref" onFinish={onFormComplete}>
                <div style={{marginTop: "20px"}} className={styles.grid6and6}>
                    <Form.Item name="title">
                        <TextInput
                            label={''}
                            name="title"
                            placeholder={'İlan başlığı giriniz.'}
                        />
                    </Form.Item>
                    <Form.Item name="content">
                        <TextArea
                            name="content"
                            placeholder={'İlan içeriği giriniz.'}
                        />
                    </Form.Item>
                </div>
                <div className={styles.grid6and6}>
                    <span>{"İlan Görseli"}</span>
                    <div>
                        <Upload accept={".png,.jpg"} {...data}>
                            <a>{getTranslateValue("profile-photo-change", "Değiştir")}</a> /
                        </Upload>{" "}
                        <a onClick={removeFile}>
                            {getTranslateValue("profile-photo-remove", "Kaldır")}
                        </a>
                    </div>
                </div>
                <div className={styles.itemCenter}>
                    <CustomButton
                        label={getTranslateValue("save", "Kaydet")}
                        color="black"
                        type={"submit"}
                    />
                </div>
            </Form>
        </Modal>
    )
}

interface IProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (formData, cv) => void;
}
