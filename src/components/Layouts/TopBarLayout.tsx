import Header from "./Header"

function TopBarLayout({children,web3Handler,account}:any) {
    return (
        <div className='flex flex-col gap-2'>
            <section>
                <Header web3Handler={web3Handler} account={account}/>
            </section>
            {children}
        </div>
    )
}

export default TopBarLayout
