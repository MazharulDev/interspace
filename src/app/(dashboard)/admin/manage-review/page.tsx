"use client";

import { useDebounced } from "@/redux/hooks";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import ISTable from "@/components/ui/ISTable";
import BreadCrumb from "@/components/ui/Breadcrumb";
import Actionbar from "@/components/ui/ActionBar";
import { getUserInfo } from "@/services/auth.service";
import {
  useAllUserReviewQuery,
  useUpdateUserReviewMutation,
} from "@/redux/api/userReviewApi";
import ISModal from "@/components/ui/Modal/Modal";

const ManageReview = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [reviewId, setReviewId] = useState<string>("");
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
  const { data, isLoading } = useAllUserReviewQuery({ ...query });
  const [updateUserReview] = useUpdateUserReviewMutation();
  const handlePublish = async (id: string) => {
    const res: any = await updateUserReview({
      id,
      body: { status: "publish" },
    }).unwrap();
    if (res) {
      message.success("Review published");
      setOpen(false);
    }
  };

  const admins = data?.services;
  const meta = data?.meta;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
      render: function (data: any) {
        return (
          <>
            <Link
              href={`/${role}/manage-review/view/${data._id}`}
              style={{ margin: "0 5px" }}
            >
              <Button className="bg-blue-500" type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            {data.status === "pending" && (
              <Button
                className="bg-blue-500"
                onClick={() => {
                  setOpen(true);
                  setReviewId(data?._id);
                }}
                type="primary"
              >
                Publish
              </Button>
            )}
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
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
              label: "manage-review",
              link: `/${role}/manage-review`,
            },
          ]}
        />
        <Actionbar title="Review List">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div>
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <Button
                style={{ margin: "0px 5px" }}
                type="primary"
                onClick={resetFilters}
              >
                <ReloadOutlined />
              </Button>
            )}
          </div>
        </Actionbar>

        <ISTable
          loading={isLoading}
          columns={columns}
          dataSource={admins}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
      <ISModal
        title="Publish Review"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => handlePublish(reviewId)}
      >
        <p className="my-5">Are you sure you want to publish this review?</p>
      </ISModal>
    </>
  );
};

export default ManageReview;
