export const cardHeaderStyle = (table) => ({
    header: {
        backgroundColor: table.tables_available ? '#306B34' : '#BF0603',
        color: '#EFF1F3'
    }
})

export const layoutHeaderStyle = ({
    backgroundColor: '#202332', color: "white", fontSize: "24px", textAlign: "center", position: 'sticky',
    top: 0,
    zIndex: 1
})

export const floatButtonStyle = ({
    backgroundColor: "#1890ff",
    borderColor: "#1890ff",
    width: "60px",
    height: "60px",
})

export const layoutFooterStyle = ({
    textAlign: "center",
    position: "fixed",
    bottom: 0, width: "100%",
    background: "#202332",
    color: "white"
})