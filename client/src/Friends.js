import React from "react";

const Friends = (props) => {
  const { setChatWithFri, friends } = props;
  return (
    <div
      style={{
        width: "90%",
        margin: "10px auto",
      }}
    >
      <h1>Friends</h1>
      {friends.map((f) => (
        <h3
          onClick={() => setChatWithFri(f.id)}
          key={f.id}
          style={{
            margin: "10px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            cursor:'pointer'
          }}
        >
          <p
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              backgroundColor: "black",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",

            }}
          >
            {f.email.substring(0, 1).toUpperCase()}
          </p>
          {f.email}
        </h3>
      ))}
    </div>
  );
};

export default Friends;
