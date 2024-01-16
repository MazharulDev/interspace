"use client";

import { useDebounced } from "@/redux/hooks";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import ISTable from "@/components/ui/ISTable";
import BreadCrumb from "@/components/ui/Breadcrumb";
import Actionbar from "@/components/ui/ActionBar";
import { getUserInfo } from "@/services/auth.service";
import { useDeletefaqMutation, useFaqsQuery } from "@/redux/api/faqApi";
import ISModal from "@/components/ui/Modal/Modal";

const ManageFaq = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [faqId, setFaqId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data } = useFaqsQuery(undefined);
  const [deletefaq] = useDeletefaqMutation();
  const handleDelete = async (id: string) => {
    const res: any = await deletefaq(id).unwrap();

    if (res) {
      message.success("FAQ Deleted successfully");
      setOpen(false);
    }
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
    },
    {
      title: "Answer",
      dataIndex: "answer",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },

    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/${role}/manage-faq/view/${data}`}>
              <Button className="bg-blue-500" type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/${role}/manage-faq/edit/${data}`}>
              <Button type="primary" className="bg-blue-500 my-2">
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => {
                setOpen(true);
                setFaqId(data);
              }}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <BreadCrumb
          items={[
            {
              label: `${role}`,
              link: `/${role}`,
            },
            {
              label: "manage-faq",
              link: `/${role}/manage-faq`,
            },
          ]}
        />
        <Actionbar title="FAQ List">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div>
            <Link href={`/${role}/manage-faq/create`}>
              <Button className="bg-blue-500" type="primary">
                Create FAQ
              </Button>
            </Link>
          </div>
        </Actionbar>

        <ISTable columns={columns} dataSource={data} showSizeChanger={true} />
      </div>
      <ISModal
        title="Delete FAQ"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => handleDelete(faqId)}
      >
        <p className="my-5">Are you sure you want to publish this review?</p>
      </ISModal>
    </>
  );
};

export default ManageFaq;
