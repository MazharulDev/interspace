"use client";

import { useDebounced } from "@/redux/hooks";
import { Button, Input } from "antd";
import { useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import ISTable from "@/components/ui/ISTable";
import BreadCrumb from "@/components/ui/Breadcrumb";
import Actionbar from "@/components/ui/ActionBar";
import { getUserInfo } from "@/services/auth.service";
import {
  useBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";

const BookingManagePage = () => {
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
  const { data, isLoading } = useBookingsQuery({ ...query });

  const [updateBooking] = useUpdateBookingMutation();

  const handleAccept = async (id: string) => {
    try {
      const res = await updateBooking({
        id,
        body: { status: "accepted" },
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  const handleReject = async (id: string) => {
    try {
      const res = await updateBooking({
        id,
        body: { status: "rejected" },
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const bookings = data?.bookings;
  const meta = data?.meta;
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
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },

    {
      title: "Action",
      //   dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            {data?.status !== "accepted" && (
              <Button
                onClick={() => handleAccept(data?._id)}
                type="primary"
                style={{
                  margin: "0px 5px",
                }}
              >
                accept
              </Button>
            )}
            {data?.status !== "rejected" && (
              <Button
                onClick={() => handleReject(data?._id)}
                type="primary"
                danger
              >
                reject
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
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "manage-booking",
            link: `/${role}/manage-booking`,
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
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default BookingManagePage;
