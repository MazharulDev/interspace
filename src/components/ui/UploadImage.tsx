"use client";
import React, { useState, ChangeEvent } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getImgbbAPI } from "@/helpers/config/envConfig";

type ImageUploadProps = {
  name: string;
};

const UploadImage = ({ name }: ImageUploadProps) => {
  const imgbbApiKey = getImgbbAPI();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleChange = async (info: any) => {
    const img = info?.file;
    const formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        name = result?.data?.display_url;
        setFileList(result?.data?.display_url);
      });
  };

  return (
    <Upload
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={() => false}
    >
      <Button icon={<UploadOutlined />}>Upload Image</Button>
    </Upload>
  );
};

export default UploadImage;
