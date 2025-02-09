'use client'
import useTrolleyStore from "@/store/trolley";
import { LoadingDataList, PageLoadingSpin } from "@/app/components/LoadingData";
import { PageEmptyData, PageErrorData } from "@/app/components/PageErrorData";
import { TrolleyCardPageUser, TrolleyDropDownPageUser } from "@/app/components/trolley/trolley.page";
import { toTotal } from "@/utils/toCalculate";
import { useRouter } from "next/navigation";
import { useTrolley } from "@/hook/useTrolley";

interface TrolleyCaseProps {
    isLogin: boolean
}

export function TrolleyCase() {
    const router = useRouter()
    const { getAll } = useTrolley()

    const { data, isError, isLoading } = getAll()
    if (isLoading || !data) return <PageLoadingSpin />
    if (isError) return <PageErrorData code={ 401 } msg={ 'Data is Not Found' } />

    return (
        <TrolleyDropDownPageUser
            total={ toTotal.subTotal(data.data) }
            count={ data.count }
            hrefAction={ () => router.push('/trolley') }
        />
    )
}

export function TrolleyCheckoutCaseUser() {
    const router = useRouter()
    const { onSelected, onTotalProduct } = useTrolleyStore()
    // console.log('TrolleyCheckoutCaseUser : ',onSelected)

    const onCheckout = () => {
        if (onSelected) {
            router.push('/checkout')
        }
    }

    return (
        <TrolleyDropDownPageUser
            total={ onTotalProduct }
            count={ onSelected.length }
            hrefAction={ () => onCheckout() }
        />
    )
}

export function TrolleyClientUser() {
    const { setSelected, isTrolleyIncluded, onIncrement, onDecrement, onSelected } = useTrolleyStore()
    const { getAll, increment, decrement, remove, } = useTrolley()
    const { data: stateTrolley, isError, isFetching } = getAll()

    if (isFetching) return <LoadingDataList />
    if (!stateTrolley || isError) return <PageErrorData />
    if (stateTrolley.data.length === 0) return <PageEmptyData page={ 'Trolley' } />
    console.log(onSelected)
    return stateTrolley.data.map((trolley) => (
            <TrolleyCardPageUser
                key={ trolley.id }
                trolley={ trolley }
                isTrolleyIncluded={ isTrolleyIncluded(trolley.id) }
                onSelectAction={ () => setSelected(trolley) }
                onRemoveAction={ () => remove.mutate({ idTrolley: trolley.id }) }
                onIncrementAction={ () => {
                    increment.mutate({ idTrolley: trolley.id })
                    onIncrement(trolley.id)
                } }
                onDecrementAction={ () => {
                    decrement.mutate({ idTrolley: trolley.id })
                    onDecrement(trolley.id)
                }
                }
            />
        )
    )
}
