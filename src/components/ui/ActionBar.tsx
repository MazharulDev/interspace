import React from "react";

type ActionBarProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
};

const Actionbar = ({ title, children }: ActionBarProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold my-2">{title}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Actionbar;
