'use client'
import toast from "react-hot-toast";
import useFormPersist from "react-hook-form-persist";
import { FormProvider, useForm } from "react-hook-form";
import { LetterFormSchema, LetterFormSchemaType } from "@/schema/send.valid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendStore } from "@/store/send";
import { sendEmployeeStoreAction } from "@/server/action/send.action";
import { InputDate, InputText } from "@/app/components/form/state";
import { LoadingSpin } from "@/app/components/LoadingData";
import { ReactNode } from "react";

export function SendFormStore(
    { children }: { children: ReactNode }
    // { employees, letter }: { letter?: Letters, employees: EmployeeUserClient[] }
) {
    const methods = useForm<LetterFormSchemaType>({
        resolver: zodResolver(LetterFormSchema),
        // defaultValues: {
        //     interviewDate: new Date()
        // }

    });
    const { handleSubmit, watch, setValue, formState: { isLoading, errors }, reset } = methods
    const { clear } = useFormPersist("form-send", { watch, setValue });
    const store = useSendStore()
    const onCreate = async (data: LetterFormSchemaType) => {
        store.setMessage(null)
        const idToast = toast.loading('Loading...')
        const response = await sendEmployeeStoreAction(data, store.store.selectAll)
        if (response.success) {
            // console.log(response)
            clear()
            reset()
            toast.success("Successfully created.")
        } else {
            if (response.errors === 'Store') {
                store.setMessage(response.message)

            }
            toast.error(`Error creating letter form : ${ response.message }`)
        }
        toast.dismiss(idToast)
    }
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl card card-bordered bg-base-200 sm:card-normal card-compact ">
                <FormProvider { ...methods }>
                    <div className="card-body">
                        <h2 className="card-title">Create Form letter</h2>
                        {/*{ letter?.id && <input type="hidden" value={ letter?.id } name={ 'id' } /> }*/ }
                        <div className="grid grid-cols-2 gap-5">
                            <InputText keys={ "signerName" } title={ "Signer Name" } />
                            <InputDate keys={ 'interviewDate' } title={ 'Interview Date' } now={ true } />
                            <InputText keys={ "interviewLocation" } title={ "Interview Location" } />
                            <InputText keys={ "dressCode" } title={ "Dress Code" } />
                        </div>

                        { children }
                        <div className="card-actions">
                            <button
                                disabled={ isLoading }
                                type="submit"
                                className={ `btn btn-primary w-full ${ isLoading ? "btn-disabled" : "" } mt-5` }
                                onClick={ handleSubmit(onCreate) }
                            >
                                { isLoading && <LoadingSpin /> } Create
                            </button>
                        </div>
                    </div>
                </FormProvider>
            </div>
        </div>
    );
}
