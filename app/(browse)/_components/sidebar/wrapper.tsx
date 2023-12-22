interface WrapperProps {
    children: React.ReactNode
}


export function Wrapper({children}: WrapperProps){

    return (
        <aside className="fixed left-0 flex-col w-60
        h-full bg-background border-r border-[#2D2E35]
        z-50">
            {children}
        </aside>
    )


}