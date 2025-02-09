import React from 'react'
import { DeliveryFormClientAdmin } from "@/app/components/delivery/delivery.client";
import { deliveryExample } from '@/assets/deliveryExample'

export default function page() {
	return (
        <DeliveryFormClientAdmin
            defaultValues={ deliveryExample }
			method={'POST'}
			id={''}
		/>
	)
}
