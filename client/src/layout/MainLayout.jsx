import Header from '@/components/Header'
import { Outlet } from 'react-router'


/**
 * A basic layout component that wraps the header and the outlet.
 * This component should be used as the top-level component in the
 * application.
 *t'
 * **/

const MainLayout = () => {
    return (
        <div>
            {/* The header component */}
            <Header />
            {/* The main element of the layout */}
            <main>
                {/* The outlet element where the children are rendered */}
                <Outlet />
            </main>
        </div>
    )
}



export default MainLayout