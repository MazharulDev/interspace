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
  useDeleteServiceMutation,
  useServicesQuery,
} from "@/redux/api/serviceApi";
import ISModal from "@/components/ui/Modal/Modal";

const ServicesPage = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [serviceId, setServiceId] = useState<string>("");
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
  const { data, isLoading } = useServicesQuery({ ...query });
  const [deleteService] = useDeleteServiceMutation();
  const handleDelete = async (id: string) => {
    const res: any = await deleteService(id).unwrap();

    if (res) {
      message.success("Service Deleted successfully");
      setOpen(false);
    }
  };

  const admins = data?.services;
  const meta = data?.meta;

  const columns = [
    {
      title: "Package Title",
      dataIndex: "title",
    },
    {
      title: "Price/Month",
      dataIndex: "price",
    },
    {
      title: "Speed/Mbps",
      dataIndex: "speed",
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
            <Link href={`/${role}/services/view/${data}`}>
              <Button className="bg-blue-500" type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/${role}/services/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
                className="bg-blue-500"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => {
                setOpen(true);
                setServiceId(data);
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
              label: "services",
              link: `/${role}/services`,
            },
          ]}
        />
        <Actionbar title="Services List">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div>
            <Link href={`/${role}/services/create`}>
              <Button className="bg-blue-500" type="primary">
                Create Service
              </Button>
            </Link>
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <Button
                style={{ margin: "0px 5px" }}
                type="primary"
                onClick={resetFilters}
                className="bg-blue-500"
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
        title="Delete Service"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => handleDelete(serviceId)}
      >
        <p className="my-5">Are you sure you want to delete this service?</p>
      </ISModal>
    </>
  );
};

export default ServicesPage;
