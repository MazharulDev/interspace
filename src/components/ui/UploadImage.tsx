"use client";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getImgbbAPI } from "@/helpers/config/envConfig";
import { useState } from "react";
import Image from "next/image";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { useFormContext } from "react-hook-form";

type ImageUploadProps = {
  name: string;
};

const UploadImage = ({ name }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const { setValue } = useFormContext();

  const imgbbApiKey = getImgbbAPI();
  const [imgUrl, setImgUrl] = useState<string>("");

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    const imageFile = info?.file;
    const formData = new FormData();

    //@ts-ignore
    formData.append("image", imageFile);
    const url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setImgUrl(result?.data?.display_url);
        setValue(name, result?.data?.display_url);
      });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        onChange={handleChange}
        name={name}
        action={imgUrl}
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={() => false}
      >
        {imgUrl ? (
          <Image
            width={100}
            height={100}
            src={imgUrl}
            alt="avatar"
            style={{ width: "100%", borderRadius: "50%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadImage;
