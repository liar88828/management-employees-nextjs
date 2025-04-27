'use client'
import toast from "react-hot-toast";
import useFormPersist from "react-hook-form-persist";
import { FormProvider, useForm } from "react-hook-form";
import { LetterFormSchema, LetterFormSchemaType } from "@/schema/send.valid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendStore } from "@/store/send";
import { letterEmployeeActionState } from "@/server/action/letter.action";
import { InputDate, InputText } from "@/app/components/form/state";
import { LoadingSpin } from "@/app/components/LoadingData";

export function SendFormStore(
    // { employees, letter }: { letter?: Letters, employees: EmployeeUserClient[] }
) {
    const methods = useForm<LetterFormSchemaType>({
        resolver: zodResolver(LetterFormSchema),
        // defaultValues: company

    });
    const { handleSubmit, watch, setValue, formState: { isLoading, errors }, reset } = methods
    const { clear } = useFormPersist("form-send", { watch, setValue });
    const store = useSendStore((state) => state.store)
    const onCreate = async (data: LetterFormSchemaType) => {
        const idToast = toast.loading('Loading...')
        try {
            const response = await letterEmployeeActionState(data, store.selectAll)
            console.log(response)
            clear()
            reset()
            toast.success("Successfully created.")

        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error creating letter form : ${ error.message }`)
            }
        } finally {
            toast.dismiss(idToast)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl card card-bordered bg-base-200 ">
                <FormProvider { ...methods }>
                    <form onSubmit={ handleSubmit(onCreate) } className="card-body">
                        <h2 className="card-title">Create Form letter</h2>
                        {/*{ letter?.id && <input type="hidden" value={ letter?.id } name={ 'id' } /> }*/ }
                        <div className="grid grid-cols-2 gap-5">

                            <InputText keys={ "signerName" } title={ "Signer Name" } />
                            <InputDate keys={ 'interviewDate' } title={ 'Interview Date' } />
                            <InputText keys={ "interviewLocation" } title={ "Interview Location" } />
                            <InputText keys={ "dressCode" } title={ "Dress Code" } />
                        </div>
                        <div className="card-actions">
                            <button
                                disabled={ isLoading }
                                type="submit"
                                className={ `btn btn-primary w-full ${ isLoading ? "btn-disabled" : "" } mt-5` }
                            >
                                { isLoading && <LoadingSpin /> }Create
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
