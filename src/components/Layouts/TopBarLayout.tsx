import Header from "./Header"

function TopBarLayout({children}:{children: JSX.Element}) {
    return (
        <div className='flex flex-col gap-2'>
            <section>
                <Header/>
            </section>
            {children}
        </div>
    )
}

export default TopBarLayout
