import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: "Promptio",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"></div>
                        <div className="app">
                            <Nav />
                            {children}
                        </div>
                    </div>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout