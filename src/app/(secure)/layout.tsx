import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={ 'mt-20 max-w-[210mm] mx-auto' }>{ children }</div>
    );
}

export default Layout;