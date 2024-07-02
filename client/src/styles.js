export const contentStyles = {
    padding: "50px",
    // backgroundColor: "#8BC6EC",
    // backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(135deg, #ffffff 0%, #8BC6EC 66%, #9599E2 100%)",
};

export const cardStyles = (table) => ({
    header: {
        backgroundColor: table.tables_available ? "#347B39" : "#BF0603",
        color: "#EFF1F3",
        border: "none",
        height: "6vh",
        // border: "transparent",
        // borderWidth: "0 0.1px 0 0.1px",
    },

    body: {
        height: "38vh",
        padding: "5% 8%",
        backgroundColor: "#fafafa",
        border: "none",
        // border: "solid",
        // borderColor: "#c4c4c4",
        // borderWidth: "0 0.1px 0.1px 0.1px",
        // borderColor: "#575757",
    },
});

export const layoutHeaderStyle = {
    backgroundColor: "#202332",
    color: "white",
    fontSize: "24px",
    textAlign: "center",

    top: 0,
    zIndex: 1,
};

export const floatButtonStyle = {
    backgroundColor: "#1890ff",
    borderColor: "#1890ff",
    width: "60px",
    height: "60px",
};

export const layoutFooterStyle = {
    height: "5vh",
    alignContent: "center",
    textAlign: "center",
    padding: "0",
    width: "100%",
    background: "#202332",
    color: "white",
};
