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
import { useDeleteUserMutation, useUsersQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { usePaymentFilterQuery } from "@/redux/api/paymentApi";

const PaymentShowPage = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
  const { data, isLoading } = usePaymentFilterQuery({ ...query });
  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async (id: string) => {
    const res: any = await deleteUser(id).unwrap();

    if (res?._id) {
      message.success("User Deleted successfully");
    }
  };

  const admins = data?.payments;
  const meta = data?.meta;

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Package",
      dataIndex: "packageName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Month",
      dataIndex: "month",
    },
    {
      title: "Year",
      dataIndex: "year",
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
      title: "Transaction Id",
      dataIndex: "transactionId",
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
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "payment",
            link: `/${role}/payments`,
          },
        ]}
      />
      <Actionbar title="Payment List">
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
  );
};

export default PaymentShowPage;
