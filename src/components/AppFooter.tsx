import { Footer } from 'antd/es/layout/layout'
import React from 'react'

export default function AppFooter() {
    return (
        <Footer
            style={{
                borderTop: "1px solid #e8e8e8",
                width: "100%",
                backgroundColor: "white",
                textAlign: "center",
            }}
        >
            ©{new Date().getFullYear()} Created by book shelf company
        </Footer>
    )
}
