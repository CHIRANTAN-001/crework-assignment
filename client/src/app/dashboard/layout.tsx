import SideBar from "@/components/Dashboard/SideBar"

const Layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <div className="flex">
                <SideBar />
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout