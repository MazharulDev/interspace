"use client";

import { useDebounced } from "@/redux/hooks";
import { Button, Input, Tag, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { ReloadOutlined, SyncOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import ISTable from "@/components/ui/ISTable";
import BreadCrumb from "@/components/ui/Breadcrumb";
import Actionbar from "@/components/ui/ActionBar";
import { getUserInfo } from "@/services/auth.service";
import {
  useBookingByEmailQuery,
  useDeleteBookingMutation,
} from "@/redux/api/bookingApi";
import ISModal from "@/components/ui/Modal/Modal";

const MyBookingConnection = () => {
  const { role, userId } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [bookingId, setBookingId] = useState<string>("");
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
  const { data, isLoading } = useBookingByEmailQuery(userId);
  const [deleteBooking] = useDeleteBookingMutation();
  const handleDelete = async (id: string) => {
    const res: any = await deleteBooking(id).unwrap();

    if (res) {
      message.success("Booked canceled");
      setOpen(false);
    }
  };

  const bookings = data;

  const columns = [
    {
      title: "Package name",
      dataIndex: "packageName",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Connection Date",
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
            {data?.status === "pending" && (
              <div>
                <Button
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    setOpen(true);
                    setBookingId(data?._id);
                  }}
                  type="primary"
                  danger
                >
                  cancel
                </Button>
                <Tag icon={<SyncOutlined spin />} color="processing">
                  Wait for admin accept
                </Tag>
              </div>
            )}
            {data?.status === "accepted" && (
              <Link href={"/user/booking/pay"}>
                <Button className="bg-blue-500" type="primary">
                  Pay
                </Button>
              </Link>
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
              label: "booking",
              link: `/${role}/booking`,
            },
          ]}
        />
        <Actionbar title="Booking List">
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
          dataSource={bookings}
          pageSize={size}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
      <ISModal
        title="Cancel Booking"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => handleDelete(bookingId)}
      >
        <p className="my-5">Are you sure you want to Cencel this Booking?</p>
      </ISModal>
    </>
  );
};

export default MyBookingConnection;
