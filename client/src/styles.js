export const cardStyles = (table) => ({
    header: {
        backgroundColor: table.tables_available ? "#347B39" : "#BF0603",
        color: "#EFF1F3",
        border: "none",
    },

    body: {
        height: "80%",
        padding: "5% 8%",
    },
});

export const layoutHeaderStyle = {
    backgroundColor: "#202332",
    color: "white",
    fontSize: "24px",
    textAlign: "center",
    position: "sticky",
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
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "#202332",
    color: "white",
};
