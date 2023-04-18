import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function search() {
    const router = useRouter();

    useEffect(() => {
        console.log(router.searchInfo); // Alerts 'Someone'
    }, [router.searchInfo]);
    return (
        <div>search</div>
    )
}
